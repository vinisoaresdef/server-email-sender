const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Método não permitido' });
  }

  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
      user: 'f47295641a01f3',
      pass: '5725cead361927'
    }
  });

  const mailOptions = {
    from: 'roberto@gmail.com',
    to,
    subject,
    text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'E-mail enviado com sucesso!', info });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao enviar e-mail', error });
  }
};
