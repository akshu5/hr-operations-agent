import { NextRequest, NextResponse } from "next/server";
import { HR_TEAMS } from "@/lib/hrConfig";

export async function POST(req: NextRequest) {
  try {
    const { ticket } = await req.json();
    const cat = HR_TEAMS[ticket.category] || HR_TEAMS.general;
    const resendKey = process.env.RESEND_API_KEY;

    const emailBody = `
New HR Ticket: ${ticket.id}
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Title:    ${ticket.title}
Priority: ${ticket.priority}
Category: ${cat.label}
Team:     ${cat.team}

Summary:
${ticket.summary}

Suggested Actions:
${ticket.suggestedActions.map((a: string, i: number) => `${i + 1}. ${a}`).join("\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ticket created at ${new Date().toLocaleString()}
Please log in to the HR Agent portal to update the status.
    `.trim();

    // Real email via Resend
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.FROM_EMAIL || "HR Agent <onboarding@resend.dev>",
          to: [cat.email],
          subject: `[${ticket.id}] ${ticket.title} — ${ticket.priority} Priority`,
          text: emailBody,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Resend error:", err);
        return NextResponse.json({ sent: false, mock: false, error: err }, { status: 500 });
      }

      return NextResponse.json({ sent: true, mock: false, to: cat.email, contact: cat.contact });
    }

    // Mock mode — no Resend key
    console.log("📧 [MOCK EMAIL]", {
      to: cat.email,
      contact: cat.contact,
      subject: `[${ticket.id}] ${ticket.title}`,
      body: emailBody,
    });

    return NextResponse.json({ sent: true, mock: true, to: cat.email, contact: cat.contact, team: cat.team });
  } catch (error) {
    console.error("Email route error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
