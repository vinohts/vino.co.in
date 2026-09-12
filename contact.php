<?php
// contact.php — receives the contact form and emails it to you.
// Works out-of-the-box on Hostinger (and most shared hosting) using PHP's mail().

header('Content-Type: application/json');

// ---- CONFIG: change this to your real receiving address ----
$to_email = "vino.hts@gmail.com";
$site_name = "Vinoth Kumar Portfolio";

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

// ---- Collect + sanitize input ----
$name    = isset($_POST['name'])    ? trim(strip_tags($_POST['name']))    : '';
$email   = isset($_POST['email'])   ? trim($_POST['email'])               : '';
$message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

// ---- Basic validation ----
if ($name === '' || $email === '' || $message === '') {
    echo json_encode(["success" => false, "message" => "Please fill in all fields."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Please enter a valid email address."]);
    exit;
}

// Very basic length guard against abuse
if (strlen($name) > 100 || strlen($message) > 5000) {
    echo json_encode(["success" => false, "message" => "Input too long."]);
    exit;
}

// ---- Build the email ----
$subject = "New message from $site_name contact form";

$body  = "You received a new message from your website contact form:\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n\n";
$body .= "Message:\n$message\n";

// Headers: set a safe From (your own domain mailbox is best on Hostinger),
// and Reply-To as the visitor's email so you can hit "Reply" directly.
$from_email = "no-reply@vino.co.in"; // ideally a real mailbox on your domain
$headers  = "From: $site_name <$from_email>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// ---- Send ----
$sent = mail($to_email, $subject, $body, $headers);

if ($sent) {
    echo json_encode(["success" => true, "message" => "Message sent successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "The message could not be sent. Please try again later."]);
}
