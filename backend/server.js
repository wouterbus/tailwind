// server.js
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, message, website } = req.body;

  // Bot honeypot
  if (website && website.trim() !== '') {
    return res.status(400).json({ success: false, message: 'Bot detected' });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  // ✅ Nodemailer config using .env credentials
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `Nova mensagem de ${name}`,
    text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email enviado' });
  } catch (error) {
    console.error('Erro no envio de email:', error);
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

app.listen(PORT, () => console.log(`✅ Backend rodando em http://localhost:${PORT}`));
