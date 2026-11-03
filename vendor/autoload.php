<?php
/**
 * Autoloader for PHPMailer (no Composer required).
 * Loads PHPMailer\PHPMailer\{PHPMailer, SMTP, Exception} from vendor/phpmailer/phpmailer/src/
 */
spl_autoload_register(function (string $class): void {
    $map = [
        'PHPMailer\\PHPMailer\\PHPMailer'  => __DIR__ . '/phpmailer/phpmailer/src/PHPMailer.php',
        'PHPMailer\\PHPMailer\\SMTP'       => __DIR__ . '/phpmailer/phpmailer/src/SMTP.php',
        'PHPMailer\\PHPMailer\\Exception'  => __DIR__ . '/phpmailer/phpmailer/src/Exception.php',
        'PHPMailer\\PHPMailer\\OAuth'      => __DIR__ . '/phpmailer/phpmailer/src/OAuth.php',
        'PHPMailer\\PHPMailer\\POP3'       => __DIR__ . '/phpmailer/phpmailer/src/POP3.php',
    ];

    if (isset($map[$class]) && file_exists($map[$class])) {
        require_once $map[$class];
    }
});
