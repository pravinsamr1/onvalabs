<?php
// Example SMTP config for send-enquiry.php.
//
// Copy this file ONE LEVEL ABOVE the public web root and rename it to
// onvalabs-mail-config.php, e.g.:
//   /home2/onvacom/public_html/send-enquiry.php   <- site
//   /home2/onvacom/onvalabs-mail-config.php        <- this file, filled in
// Then delete this example from the server. Never put real credentials here.
//
// Alternatively set the environment variables ONVA_SMTP_HOST, ONVA_SMTP_USER,
// ONVA_SMTP_PASS, ONVA_SMTP_PORT and ONVA_MAIL_TO.

return [
    // Must match the name on the mail server's TLS certificate
    // (on cPanel this is often the server hostname, not mail.yourdomain).
    'smtp_host' => 'mail.example.com.au',
    'smtp_port' => 587,
    'smtp_user' => 'noreply@example.com.au',
    'smtp_pass' => 'CHANGE-ME',
    'from_name' => 'Onvalabs Website',
    'mail_to'   => 'clarent360@gmail.com',
];
