import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are an intelligent HR Operations Assistant for a company. Your role is to help employees with HR-related queries professionally and empathetically.

You handle: leave/time-off, payroll/salary/compensation, HR policies, benefits/insurance, onboarding, performance reviews, grievances, and general HR topics.

When a query requires action (filing leave, raising payroll issue, formal complaint, escalation, etc.), create a structured ticket by including this EXACT JSON block:

<TICKET>
{
  "shouldCreate": true,
  "category": "leave|payroll|policy|benefits|onboarding|performance|grievance|general",
  "priority": "Low|Medium|High|Urgent",
  "title": "Brief ticket title under 10 words",
  "summary": "Detailed description of the issue",
  "suggestedActions": ["action 1", "action 2", "action 3"]
}
</TICKET>

Rules:
- Grievances = always High or Urgent priority
- Payroll errors = High priority  
- Informational questions (policy explanations, process queries) = NO ticket, just answer
- Be warm, concise, and professional
- When creating a ticket, tell the employee which team will handle it and expected response time`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const content = response.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("");

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 }
    );
  }
}
