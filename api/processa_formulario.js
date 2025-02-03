const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { 'first-name': nome, 'last-name': sobrenome, email, message } = req.body;

      // Validação básica (adapte conforme suas necessidades)
      if (!nome || !email || !message) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
      }

      // Configuração do Nodemailer (substitua pelos seus dados)
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Ou outro serviço de email
        auth: {
          user: 'saulovalin1@gmail.com', // Seu email
          pass: 'sfs1saulo' // Sua senha ou senha de aplicativo
        }
      });

      // Opções do email
      const mailOptions = {
        from: email,
        to: 'saulovalin1@gmail.com', // Seu email para receber os contatos
        subject: `Contato do site: ${nome} ${sobrenome}`,
        text: `Nome: ${nome} ${sobrenome}\nEmail: ${email}\nMensagem:\n${message}`
      };

      // Envio do email
      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });

    } catch (error) {
      console.error("Erro na função serverless:", error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  } else {
    return res.status(405).end(); // Método não permitido (apenas POST)
  }
}