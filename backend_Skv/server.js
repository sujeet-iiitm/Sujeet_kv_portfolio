const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")
const zod = require("zod")
require("dotenv").config()

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10*60*1000,
  max: 2,
  message: 'Too many requests received from your end, please do-not bother...',
})

const check = zod.object({
  name: zod.string().min(1, "Name is required"),
  email: zod.string().email({ message: "Invalid email address" }),
  phone: zod.string().optional(),
  message: zod.string().min(1, "Message is required"),
  jwt_secretkey: zod.string().refine((val) => val === process.env.JWT_SECRET, "Unauthorized"),
})

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(limiter)

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})


app.post("/api/sendMessage", async (req, res) => {
  const body = req.body;
  const require =  check.safeParse(body);
  if(!require.success) {
    return res.status(400).json({
      message : "input fields are not valid",
        success: false,
    });
  }
  try {
    const { name, email, phone, message, jwt_secretkey } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required",
      })
    }

    if (jwt_secretkey !== process.env.JWT_SECRET) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      })
    }

    const emailToYou = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact: ${name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Sent on ${new Date().toLocaleString()}</small></p>
      `,
    }

    const emailToSender = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for contacting me, Hope you are Fine!",
      html: `
        <h2>Thank You ${name}!</h2>
        <p>I received your message and I will get back to you soon.</p>
        <p>Best regards,<br>Sujeet Kumar</p>
      `,
    }

    await transporter.sendMail(emailToYou)
    await transporter.sendMail(emailToSender)

    console.log(`Email sent from ${name} (${email})`)

    res.json({
      success: true,
      message: "Message sent successfully!",
    })
  } catch (error) {
    console.error("Email error:", error)
    res.status(500).json({
      success: false,
      error: "Failed to send message",
    })
  }
})
app.get("/", (req, res) => {
  res.json({
    message : "Welcome to the backend server!",
    say : "Server is running successfully, Sujeet Kumar"
  })
})

app.listen(PORT);