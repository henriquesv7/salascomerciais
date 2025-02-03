const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { 'first-name': nome, 'last-name': sobrenome, email, message, phone } = req.body; // Inclua o campo phone

      // Validação (inclua validação para o telefone)
      if (!nome || !email || !message || !phone) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
      }

      // Configuração do Nodemailer (substitua pelos seus dados)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      // Opções do email (inclua o telefone na mensagem)
      const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Contato do site: ${nome} ${sobrenome}`,
        text: `Nome: ${nome} ${sobrenome}\nEmail: ${email}\nTelefone: ${phone}\nMensagem:\n${message}` // Adicione o telefone aqui
      };

      // Envio do email
      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });

    } catch (error) {
      console.error("Erro na função serverless:", error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  } else {
    return res.status(405).end();
  }
}