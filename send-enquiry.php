<?php
// send-enquiry.php
// Prepared for Onvalabs - Ready for cPanel deployment
//
// SMTP credentials are NOT stored in this file. They are read from environment
// variables or from a config file outside the public web root
// (see mail-config.example.php for the format and location).

// Set response headers to JSON
header('Content-Type: application/json; charset=UTF-8');

function respond($status, $success, $message)
{
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

// Remove CR/LF and other control characters so values are safe in mail headers
function clean_line($value, $maxLength)
{
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', (string) $value);
    return mb_substr(trim($value), 0, $maxLength, 'UTF-8');
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

// ---------------------------------------------------------------------------
// Configuration: environment variables first, then a private config file
// one level above the web root (e.g. /home2/onvacom/onvalabs-mail-config.php)
// ---------------------------------------------------------------------------
$config = [];
$configFile = dirname(__DIR__) . '/onvalabs-mail-config.php';
if (is_readable($configFile)) {
    $loaded = include $configFile;
    if (is_array($loaded)) {
        $config = $loaded;
    }
}

$smtpHost = getenv('ONVA_SMTP_HOST') ?: ($config['smtp_host'] ?? '');
$smtpUser = getenv('ONVA_SMTP_USER') ?: ($config['smtp_user'] ?? '');
$smtpPass = getenv('ONVA_SMTP_PASS') ?: ($config['smtp_pass'] ?? '');
$smtpPort = (int) (getenv('ONVA_SMTP_PORT') ?: ($config['smtp_port'] ?? 587));
$fromName = $config['from_name'] ?? 'Onvalabs Website';
$to       = getenv('ONVA_MAIL_TO') ?: ($config['mail_to'] ?? 'clarent360@gmail.com');

// Private writable directory for the rate-limit store (outside the web root)
$dataDir = dirname(__DIR__) . '/onvalabs-data';
if (!is_dir($dataDir) && !@mkdir($dataDir, 0700, true)) {
    $dataDir = sys_get_temp_dir();
}
$rateLimitFile = $dataDir . '/onvalabs_ip_rate_limits.json';

// ---------------------------------------------------------------------------
// Read form data (supports standard POST or JSON payload)
// ---------------------------------------------------------------------------
$input = $_POST;
if (empty($input)) {
    $decoded = json_decode((string) file_get_contents('php://input'), true);
    if (is_array($decoded)) {
        $input = $decoded;
    }
}

// Honeypot: real visitors never see or fill the "website" field.
// Pretend success so bots get no signal.
if (!empty($input['website'])) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your enquiry has been sent successfully. We will get back to you shortly.'
    ]);
    exit;
}

$name    = clean_line($input['name'] ?? '', 100);
$email   = filter_var(clean_line($input['email'] ?? '', 254), FILTER_VALIDATE_EMAIL);
$service = clean_line($input['service'] ?? '', 100);
$message = mb_substr(trim((string) ($input['message'] ?? '')), 0, 5000, 'UTF-8');

// Basic validation for required fields
if ($name === '' || !$email || $message === '') {
    respond(400, false, 'Please fill in all required fields (Name, Email, Project Details).');
}

// ---------------------------------------------------------------------------
// Rate limiting (max 5 attempts per IP per hour), with a file lock so
// concurrent requests can't overwrite each other's counts
// ---------------------------------------------------------------------------
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$currentTime = time();
$fh = @fopen($rateLimitFile, 'c+');
if ($fh && flock($fh, LOCK_EX)) {
    $rateLimits = json_decode(stream_get_contents($fh), true);
    if (!is_array($rateLimits)) {
        $rateLimits = [];
    }

    // Clean up entries older than 1 hour (3600 seconds)
    foreach ($rateLimits as $storedIp => $data) {
        if (!isset($data['timestamp']) || ($currentTime - $data['timestamp'] > 3600)) {
            unset($rateLimits[$storedIp]);
        }
    }

    $limited = isset($rateLimits[$ip]['count']) && $rateLimits[$ip]['count'] >= 5;
    if (!$limited) {
        if (!isset($rateLimits[$ip])) {
            $rateLimits[$ip] = ['count' => 0, 'timestamp' => $currentTime];
        }
        $rateLimits[$ip]['count']++;
        ftruncate($fh, 0);
        rewind($fh);
        fwrite($fh, json_encode($rateLimits));
        fflush($fh);
    }
    flock($fh, LOCK_UN);
    fclose($fh);

    if ($limited) {
        respond(429, false, 'Too many requests from this IP. Please try again later.');
    }
} else {
    error_log('Enquiry form: could not open rate-limit file ' . $rateLimitFile);
}

// Friendly label for service selected
$serviceMap = [
    'web'    => 'Web Development',
    'app'    => 'Mobile App Development',
    'seo'    => 'Digital Marketing',
    'domain' => 'Domain & Hosting',
    'other'  => 'Other'
];

if (isset($serviceMap[$service])) {
    $service_display = $serviceMap[$service];
} elseif ($service !== '' && $service !== 'Select a Service') {
    $service_display = $service;
} else {
    $service_display = 'Not specified';
}

// Subject line
$subject = "New Onvalabs Enquiry from " . $name;

// HTML Email Template
$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safeService = htmlspecialchars($service_display, ENT_QUOTES, 'UTF-8');
$formattedMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
$dateSubmitted = date('d M Y, h:i A');

$email_content = "<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6fa; color: #374151; margin: 0; padding: 20px; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 1px solid #e5e7eb; padding: 30px; box-sizing: border-box; }
        .logo { font-size: 24px; font-weight: 700; color: #182333; margin-bottom: 20px; text-align: center; letter-spacing: 0.5px; }
        .logo span { color: #2d4a8a; }
        .subtitle { text-align: center; color: #6b7280; font-size: 14px; margin-top: -12px; margin-bottom: 25px; }
        h2 { font-size: 16px; color: #182333; margin-top: 10px; margin-bottom: 12px; border-bottom: 2px solid #e5e7eb; padding-bottom: 6px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 24px; border: 1px solid #e5e7eb; }
        th, td { text-align: left; padding: 12px 14px; border: 1px solid #e5e7eb; font-size: 14px; }
        th { font-weight: 600; color: #4b5563; width: 35%; background-color: #f9fafb; }
        td { color: #111827; }
        a { color: #2d4a8a; text-decoration: none; font-weight: 600; }
        .message-box { border: 1px solid #e5e7eb; padding: 16px; border-radius: 8px; line-height: 1.6; color: #374151; background-color: #f9fafb; font-size: 14px; }
        .footer { margin-top: 28px; font-size: 12px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 15px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='logo'>Onva<span>labs</span></div>
        <div class='subtitle'>New Website Enquiry - 'Let's Build Something Amazing'</div>

        <h2>Enquiry Information</h2>
        <table>
            <tr>
                <th>Full Name:</th>
                <td>{$safeName}</td>
            </tr>
            <tr>
                <th>Email Address:</th>
                <td><a href='mailto:{$safeEmail}'>{$safeEmail}</a></td>
            </tr>
            <tr>
                <th>Interested In:</th>
                <td><strong>{$safeService}</strong></td>
            </tr>
            <tr>
                <th>Submitted On:</th>
                <td>{$dateSubmitted}</td>
            </tr>
        </table>

        <h2>Project Details</h2>
        <div class='message-box'>{$formattedMessage}</div>

        <div class='footer'>
            This email was sent automatically from the Onvalabs enquiry form.<br>
            Reply directly to this email to respond to {$safeName}.
        </div>
    </div>
</body>
</html>";

// Plain-text alternative
$plainText = "New Onvalabs Enquiry\n";
$plainText .= "====================\n";
$plainText .= "Full Name: " . $name . "\n";
$plainText .= "Email: " . $email . "\n";
$plainText .= "Interested In: " . $service_display . "\n";
$plainText .= "Submitted On: " . $dateSubmitted . "\n\n";
$plainText .= "Project Details:\n";
$plainText .= $message . "\n";

$emailSent = false;

// Send via authenticated SMTP when PHPMailer and credentials are available
if ($smtpHost && $smtpUser && $smtpPass && file_exists(__DIR__ . '/vendor/autoload.php')) {
    require_once __DIR__ . '/vendor/autoload.php';

    if (class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
        try {
            // cPanel SMTP / Server Settings (TLS certificate is verified)
            $mail->isSMTP();
            $mail->Host       = $smtpHost;
            $mail->SMTPAuth   = true;
            $mail->Username   = $smtpUser;
            $mail->Password   = $smtpPass;
            $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = $smtpPort;
            $mail->Timeout    = 15;
            $mail->XMailer    = ' ';

            // Sender and Recipient (Must match authenticated username)
            $mail->setFrom($smtpUser, $fromName);
            $mail->addAddress($to);
            $mail->addReplyTo($email, $name);

            // Email format
            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8';
            $mail->Subject = $subject;
            $mail->Body    = $email_content;
            $mail->AltBody = $plainText;

            $mail->send();
            $emailSent = true;
        } catch (\Throwable $e) {
            error_log('PHPMailer Error: ' . ($mail->ErrorInfo ?: $e->getMessage()));
        }
    }
} else {
    error_log('Enquiry form: SMTP not configured, falling back to mail().');
}

// Fallback: If SMTP is not configured or failed, send via native PHP mail()
if (!$emailSent) {
    $senderDomain = !empty($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'onva.com.au';
    $senderDomain = preg_replace('/[^a-z0-9.-]/i', '', preg_replace('/^www\./', '', $senderDomain));
    $fromEmail = 'noreply@' . $senderDomain;

    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-type: text/html; charset=UTF-8';
    $headers[] = 'From: ' . $fromName . ' <' . $fromEmail . '>';
    // $name and $email have had CR/LF stripped, so they can't inject headers
    $headers[] = 'Reply-To: "' . addcslashes(mb_encode_mimeheader($name, 'UTF-8'), '"\\') . '" <' . $email . '>';

    $headerStr = implode("\r\n", $headers);
    $encodedSubject = mb_encode_mimeheader($subject, 'UTF-8');

    // Try sending with return-path envelope parameter
    $sent = @mail($to, $encodedSubject, $email_content, $headerStr, '-f' . $fromEmail);
    if (!$sent) {
        $sent = @mail($to, $encodedSubject, $email_content, $headerStr);
    }

    if ($sent) {
        $emailSent = true;
    } else {
        error_log('Enquiry form: mail() fallback failed.');
    }
}

// Handle response (server details stay in the error log, never in the reply)
if ($emailSent) {
    respond(200, true, 'Thank you! Your enquiry has been sent successfully. We will get back to you shortly.');
}
respond(500, false, 'Sorry, we could not send your enquiry right now. Please try again later or email us directly.');
