import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const requiredFields = ["name", "email", "message"] as const;

function hasMailConfig() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.CONTACT_TO,
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const missingFields = requiredFields.filter((field) => !body?.[field]);

  if (missingFields.length > 0) {
    return NextResponse.json(
      { message: `Missing required fields: ${missingFields.join(", ")}` },
      { status: 400 },
    );
  }

  const { name, email, message } = body;

  if (!hasMailConfig()) {
    console.log("Contact form demo message:", { name, email, message });
    return NextResponse.json(
      {
        message:
          "Message captured in demo mode. Add SMTP settings to .env to send real email.",
      },
      { status: 202 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"${name}" <${process.env.SMTP_USER}>`,
    replyTo: email,
    to: process.env.CONTACT_TO,
    subject: `Portfolio contact from ${name}`,
    text: message,
    html: `
      <h2>New portfolio message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p>${message}</p>
    `,
  });

  return NextResponse.json({ message: "Message sent successfully." });
}
