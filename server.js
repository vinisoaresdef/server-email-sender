const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// Criação do transporte de e-mail usando um servidor SMTP (Exemplo usando o Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seuemail@gmail.com',
    pass: 'suasenha'
  }
});

// Rota para enviar e-mail
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'seuemail@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ message: 'Erro ao enviar e-mail', error: error });
    }
    res.status(200).send({ message: 'E-mail enviado com sucesso!', info: info });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
