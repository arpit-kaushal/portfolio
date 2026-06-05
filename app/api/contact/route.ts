import { NextResponse } from "next/server";

const requiredFields = ["name", "email", "message"] as const;

const notifyHubUrl =
  process.env.NOTIFYHUB_API_URL ??
  "https://notifyhub.ankitkaushal.in/v1/notifications/email";

function hasNotifyHubConfig() {
  return Boolean(
    process.env.NOTIFYHUB_BEARER_TOKEN &&
      process.env.NOTIFYHUB_TO &&
      process.env.NOTIFYHUB_TEMPLATE_ID,
  );
}

function formatTimestamp(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
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

  if (!hasNotifyHubConfig()) {
    console.log("Contact form demo message:", { name, email, message });
    return NextResponse.json(
      { message: "Message sent successfully." },
      { status: 202 },
    );
  }

  const response = await fetch(notifyHubUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NOTIFYHUB_BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: process.env.NOTIFYHUB_TO,
      templateId: process.env.NOTIFYHUB_TEMPLATE_ID,
      variables: {
        name,
        email,
        message,
        timestamp: formatTimestamp(new Date()),
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    console.error("NotifyHub error:", response.status, errorText);
    return NextResponse.json(
      { message: "Unable to send message. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Message sent successfully." });
}
