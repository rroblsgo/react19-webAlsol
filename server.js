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
  const { name, email, phone, message, id, ref, sentAt } = req.body;
  // console.log(name, email, phone, message, id, ref, sentAt);

  // HTML Email Template
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #0056b3;">New Contact Form Submission</h2>
      <p><strong>Date & Time:</strong> ${sentAt}</p>
      <p><strong>Id:</strong>${id}</p>
      <p><strong>Referencia:</strong>${ref}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f8f9fa; padding: 10px; border-left: 5px solid #0056b3;">
        ${message}
      </blockquote>
      <hr />
      <p style="font-size: 12px; color: gray;">This email was sent automatically from your website's contact form.</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: 'rroblesgo@gmail.com',
      subject: `📩 New Contact from ${name} - Property reference ${ref}`,
      html: emailHtml, // HTML content
    });

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
