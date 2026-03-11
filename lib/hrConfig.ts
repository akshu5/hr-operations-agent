export const HR_TEAMS: Record<string, HRTeam> = {
  leave: {
    label: "Leave Management",
    team: "Leave & Attendance",
    color: "#10b981",
    icon: "🌿",
    email: "leave-team@company.com",
    contact: "Sarah Mitchell",
    avatar: "SM",
  },
  payroll: {
    label: "Payroll & Compensation",
    team: "Payroll Team",
    color: "#f59e0b",
    icon: "💰",
    email: "payroll@company.com",
    contact: "James Rivera",
    avatar: "JR",
  },
  policy: {
    label: "HR Policy",
    team: "Policy & Compliance",
    color: "#6366f1",
    icon: "📋",
    email: "hr-policy@company.com",
    contact: "Anita Sharma",
    avatar: "AS",
  },
  benefits: {
    label: "Benefits & Insurance",
    team: "Benefits Administration",
    color: "#ec4899",
    icon: "🏥",
    email: "benefits@company.com",
    contact: "Tom Chen",
    avatar: "TC",
  },
  onboarding: {
    label: "Onboarding",
    team: "Talent & Onboarding",
    color: "#14b8a6",
    icon: "🚀",
    email: "onboarding@company.com",
    contact: "Priya Nair",
    avatar: "PN",
  },
  performance: {
    label: "Performance & Growth",
    team: "People Development",
    color: "#8b5cf6",
    icon: "📈",
    email: "people-dev@company.com",
    contact: "David Okafor",
    avatar: "DO",
  },
  grievance: {
    label: "Grievance & Escalation",
    team: "HR Business Partner",
    color: "#ef4444",
    icon: "🔔",
    email: "hrbp@company.com",
    contact: "Linda Walsh",
    avatar: "LW",
  },
  general: {
    label: "General Query",
    team: "HR Operations",
    color: "#64748b",
    icon: "💬",
    email: "hr-ops@company.com",
    contact: "HR Operations",
    avatar: "HR",
  },
};

export const STATUS_FLOW = ["Open", "In Review", "Awaiting Info", "Resolved"];

export interface HRTeam {
  label: string;
  team: string;
  color: string;
  icon: string;
  email: string;
  contact: string;
  avatar: string;
}

export interface Ticket {
  id: string;
  category: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  title: string;
  summary: string;
  suggestedActions: string[];
  categoryMeta: HRTeam;
  status: string;
  statusIndex: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailEntry {
  id: string;
  title: string;
  category: string;
  priority: string;
  sentAt: Date;
  to: string;
  contact: string;
  team: string;
  mock: boolean;
}

export function generateTicketId(): string {
  return "HR-" + Math.random().toString(36).substring(2, 7).toUpperCase();
}
