<?php
// Lê os dados do formulário (JSON)
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

$nome = htmlspecialchars(trim($data['first-name']));
$sobrenome = htmlspecialchars(trim($data['last-name']));
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$mensagem = htmlspecialchars(trim($data['message']));

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = htmlspecialchars(trim($_POST['first-name']));
    $sobrenome = htmlspecialchars(trim($_POST['last-name']));
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $mensagem = htmlspecialchars(trim($_POST['message']));

    // Validação básica
    if (empty($nome) || empty($email) || empty($mensagem)) {
        echo "Por favor, preencha todos os campos obrigatórios.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "E-mail inválido.";
        exit;
    }

    // Configuração do e-mail
    $to = "saulovalin1@gmail.com"; // Substitua pelo seu e-mail
    $subject = "Contato do site: $nome $sobrenome";
    $body = "Nome: $nome $sobrenome\n";
    $body .= "E-mail: $email\n\n";
    $body .= "Mensagem:\n$mensagem\n";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Envio do e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar a mensagem. Tente novamente mais tarde.";
    }
} else {
    echo "Método de envio inválido.";
}
?>
