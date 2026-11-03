<?php
// send-enquiry.php
// Receives the website enquiry forms (contact page and the "Talk to us" pop-up)
// and emails them through authenticated SMTP with PHPMailer.
use PHPMailer\PHPMailer\PHPMailer;

require_once __DIR__ . '/vendor/autoload.php';

header('Content-Type: application/json; charset=UTF-8');

// The SMTP server can take ~20s just to greet us, so give the request room to finish
@set_time_limit(90);
ignore_user_abort(true);

function respond($status, $success, $message)
{
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

// Plain single-line text: no control characters (keeps mail headers safe), capped length
function clean_line($value, $max)
{
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', (string) $value);
    return mb_substr(trim($value), 0, $max, 'UTF-8');
}

function esc($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

// ---------------------------------------------------------------------------
// SMTP settings (hard-coded at the owner's request).
// Do not commit this file to a public repository while it contains the password.
// ---------------------------------------------------------------------------
$smtpHost = 'mail.clarent360.com.au';
$smtpPort = 587;
$smtpUser = 'noreply@clarent360.com.au';
$smtpPass = 'g@iP6L[*B~3XF*8E';
// The shared mail server's certificate is issued to its own hostname, not mail.clarent360.com.au
$peerName = 'l4cp.vnetindia.com';
$fromName = 'Onva Labs Website';
// $mailTo   = 'clarent360@gmail.com';
$mailTo   = 'pravinsamr@gmail.com';

if (!$smtpHost || !$smtpUser || !$smtpPass) {
    error_log('Enquiry form: SMTP settings missing in send-enquiry.php.');
    respond(500, false, 'Sorry, we could not send your enquiry right now. Please email us at info@onva.com.au.');
}

// ---------------------------------------------------------------------------
// Rate limiting (10 successful sends per IP per hour), stored outside the web root
// ---------------------------------------------------------------------------
$dataDir = dirname(__DIR__) . '/onvalabs-data';
if (!is_dir($dataDir) && !@mkdir($dataDir, 0700, true)) {
    $dataDir = sys_get_temp_dir();
}
$rateLimitFile = $dataDir . '/onvalabs_ip_rate_limits.json';
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';

function read_limits($file)
{
    $limits = is_readable($file) ? json_decode((string) file_get_contents($file), true) : [];
    if (!is_array($limits)) {
        return [];
    }
    foreach ($limits as $storedIp => $data) {
        if (!isset($data['timestamp']) || time() - $data['timestamp'] > 3600) {
            unset($limits[$storedIp]);
        }
    }
    return $limits;
}

$limits = read_limits($rateLimitFile);
if (isset($limits[$ip]['count']) && $limits[$ip]['count'] >= 10) {
    respond(429, false, 'Too many requests from this IP. Please try again later.');
}

// ---------------------------------------------------------------------------
// Form data (standard POST, or a JSON body). Kept as raw text and escaped once on output.
// ---------------------------------------------------------------------------
$input = $_POST;
if (empty($input)) {
    $decoded = json_decode((string) file_get_contents('php://input'), true);
    if (is_array($decoded)) {
        $input = $decoded;
    }
}

// Honeypot: real visitors never fill the hidden "website" field
if (!empty($input['website'])) {
    respond(200, true, 'Thank you! Your enquiry has been sent. We will get back to you within one business day.');
}

$name     = clean_line($input['name'] ?? '', 100);
$email    = filter_var(clean_line($input['email'] ?? '', 254), FILTER_VALIDATE_EMAIL);
$services = clean_line($input['services'] ?? ($input['service'] ?? ''), 300);
$message  = mb_substr(trim((string) ($input['message'] ?? '')), 0, 5000, 'UTF-8');

if ($name === '' || !$email || $message === '') {
    respond(400, false, 'Please fill in all required fields (Name, Email, Message).');
}

// Friendly labels for the pop-up form's service dropdown values
$serviceLabels = [
    'web'    => 'Web Development',
    'app'    => 'Mobile App Development',
    'seo'    => 'Digital Marketing',
    'domain' => 'Domain & Hosting',
    'other'  => 'Other',
];
$serviceList = [];
foreach (array_filter(array_map('trim', explode(',', $services))) as $srv) {
    $serviceList[] = $serviceLabels[$srv] ?? $srv;
}

$subject = 'New Onva Labs Enquiry from ' . $name . ($topic !== '' ? ': ' . $topic : '');

// ---------------------------------------------------------------------------
// Email content (HTML and a matching plain-text version)
// ---------------------------------------------------------------------------
$rows = [
    'Full Name'       => esc($name),
    'Email Address'   => "<a href='mailto:" . esc($email) . "'>" . esc($email) . '</a>',
    'Services Needed' => $serviceList
        ? '<ul style="margin: 0; padding-left: 20px;"><li><strong>' . implode('</strong></li><li><strong>', array_map('esc', $serviceList)) . '</strong></li></ul>'
        : '<strong>Not selected</strong>',
];
$rowsHtml = '';
foreach ($rows as $label => $value) {
    $rowsHtml .= "<tr><th>{$label}:</th><td>{$value}</td></tr>";
}

$emailContent = "<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f9fafb; color: #374151; margin: 0; padding: 20px; }
        .container { width: 100%; max-width: 100%; background: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; padding: 30px; box-sizing: border-box; }
        .logo { font-size: 24px; font-weight: bold; color: #111827; margin-bottom: 24px; text-align: center; letter-spacing: 0.5px; }
        .logo span { color: #2d4a8a; }
        h2 { font-size: 18px; color: #111827; margin-top: 0; margin-bottom: 12px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; border: 1px solid #e5e7eb; }
        th, td { text-align: left; padding: 14px; border: 1px solid #e5e7eb; }
        th { font-weight: 600; color: #4b5563; width: 35%; background-color: #f9fafb; }
        td { color: #111827; }
        a { color: #2d4a8a; text-decoration: none; }
        .message-box { border: 1px solid #e5e7eb; padding: 16px; border-radius: 6px; line-height: 1.6; color: #374151; background-color: #ffffff; }
        .footer { margin-top: 30px; font-size: 12px; color: #9ca3af; text-align: center; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='logo'>Onva<span>Labs</span> Enquiry</div>
        <h2>Enquiry Details</h2>
        <table>{$rowsHtml}</table>

        <h2>Client Message</h2>
        <div class='message-box'>" . nl2br(esc($message)) . "</div>

        <div class='footer'>
            This email was generated automatically from the Onva Labs website enquiry form.
            Reply to this email to respond to " . esc($name) . ".
        </div>
    </div>
</body>
</html>
";

$plainText = "New Onva Labs Enquiry\n=====================\n"
    . "Full Name: {$name}\n"
    . "Email Address: {$email}\n"
    . 'Services Needed: ' . ($serviceList ? implode(', ', $serviceList) : 'Not selected') . "\n\n"
    . "Client Message:\n{$message}\n";

// ---------------------------------------------------------------------------
// Send
// ---------------------------------------------------------------------------
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUser;
    $mail->Password   = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $smtpPort;
    // The server's greeting takes ~15-20s (Exim reverse-DNS lookup)
    $mail->Timeout    = 45;

    // Verify the certificate, against the name it is actually issued to
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer'      => true,
            'verify_peer_name' => true,
            'peer_name'        => $peerName,
        ],
    ];

    $mail->XMailer  = ' ';
    $mail->Hostname = substr(strrchr($smtpUser, '@'), 1) ?: 'localhost';

    // The From address must be the authenticated mailbox
    $mail->setFrom($smtpUser, $fromName);
    foreach (array_filter(array_map('trim', explode(',', $mailTo))) as $recipient) {
        $mail->addAddress($recipient);
    }
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = $subject;
    $mail->Body    = $emailContent;
    $mail->AltBody = $plainText;

    $mail->send();
} catch (\Throwable $e) {
    // Details go to the server error log only, never to the visitor
    error_log('Enquiry form: send failed: ' . ($mail->ErrorInfo ?: $e->getMessage()));
    respond(500, false, 'Sorry, we could not send your enquiry right now. Please try again in a few minutes or email us at info@onva.com.au.');
}

// Count the successful send for this IP (file locked so concurrent requests don't clash)
$fh = @fopen($rateLimitFile, 'c+');
if ($fh && flock($fh, LOCK_EX)) {
    $limits = read_limits($rateLimitFile);
    if (!isset($limits[$ip])) {
        $limits[$ip] = ['count' => 0, 'timestamp' => time()];
    }
    $limits[$ip]['count']++;
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($limits));
    fflush($fh);
    flock($fh, LOCK_UN);
    fclose($fh);
}

respond(200, true, 'Thank you! Your enquiry has been sent. We will get back to you within one business day.');
