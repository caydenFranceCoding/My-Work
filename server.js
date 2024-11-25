import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const EMAIL_USER = "cfcodinginspire@gmail.com";
const EMAIL_PASS = "swbk pahw wjrd vpnk"; // Replace with your actual app password

// Email route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log('Attempting to send email...');
    console.log('Using email:', EMAIL_USER);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log('Transporter created');

    // Verify connection configuration
    await transporter.verify();
    console.log('Transporter verified');

    const info = await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: `New Contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `
    });

    console.log('Email sent successfully:', info.messageId);
    res.json({ message: 'Email sent successfully' });

  } catch (error) {
    console.error('Detailed error:', error);
    res.status(500).json({
      message: 'Failed to send email',
      error: error.message
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});