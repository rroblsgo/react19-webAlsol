import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // App password (not the actual Gmail password)
  },
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, phone, message, id, ref, sentAt, recaptchaToken } =
    req.body;
  // console.log(name, email, phone, message, id, ref, sentAt, recaptchaToken);

  // 1️⃣ Verify reCAPTCHA with Google
  try {
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    const { data } = await axios.post(verifyUrl);
    // console.log(data);

    if (!data.success) {
      return res
        .status(400)
        .json({ success: false, message: 'reCAPTCHA failed' });
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res
      .status(500)
      .json({ success: false, message: 'reCAPTCHA verification failed' });
  }

  // HTML Email Template
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #0056b3;">Recibido Formulario de Contacto</h2>
      <p><strong>Fecha & Hora:</strong> ${sentAt}</p>
      <p><strong>Id:</strong>${id}</p>
      <p><strong>Referencia:</strong>${ref}</p>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Teléfono:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Mensaje:</strong></p>
      <blockquote style="background: #f8f9fa; padding: 10px; border-left: 5px solid #0056b3;">
        ${message}
      </blockquote>
      <hr />
      <p style="font-size: 12px; color: gray;">Este email ha sido enviado automáticamente desde el formulario de contacto en tu web.</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'rroblesgo@gmail.com',
      subject: `📩 Nuevo Contacto de: ${name}, para Referencia: ${ref}`,
      html: emailHtml, // HTML content
    });

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
