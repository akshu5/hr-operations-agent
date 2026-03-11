export interface HRTeam {
  label: string;
  team: string;
  color: string;
  icon: string;
  email: string;
  contact: string;
  avatar: string;
  selfService: boolean;
  selfServiceLabel: string;
  selfServiceUrl: string;
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

export const STATUS_FLOW = ["Open", "In Review", "Awaiting Info", "Resolved"];

export function generateTicketId(): string {
  return "HR-" + Math.random().toString(36).substring(2, 7).toUpperCase();
}

export const HR_TEAMS: Record<string, HRTeam> = {
  leave: {
    label: "Leave Management",
    team: "Leave & Attendance",
    color: "#10b981",
    icon: "🌿",
    email: "akshatawankhede9@gmail.com",
    contact: "Sarah Mitchell",
    avatar: "SM",
    selfService: true,
    selfServiceLabel: "Check Leave Balance on GreytHR",
    selfServiceUrl: "https://greythr.com",
  },
  payroll: {
    label: "Payroll & Compensation",
    team: "Payroll Team",
    color: "#f59e0b",
    icon: "💰",
    email: "akshatawankhede9@gmail.com",
    contact: "James Rivera",
    avatar: "JR",
    selfService: true,
    selfServiceLabel: "View Payslip on GreytHR",
    selfServiceUrl: "https://greythr.com",
  },
  policy: {
    label: "HR Policy",
    team: "Policy & Compliance",
    color: "#6366f1",
    icon: "📋",
    email: "akshatawankhede9@gmail.com",
    contact: "Anita Sharma",
    avatar: "AS",
    selfService: true,
    selfServiceLabel: "View HR Policies",
    selfServiceUrl: "https://greythr.com",
  },
  benefits: {
    label: "Benefits & Insurance",
    team: "Benefits Administration",
    color: "#ec4899",
    icon: "🏥",
    email: "akshatawankhede9@gmail.com",
    contact: "Tom Chen",
    avatar: "TC",
    selfService: false,
    selfServiceLabel: "",
    selfServiceUrl: "",
  },
  onboarding: {
    label: "Onboarding",
    team: "Talent & Onboarding",
    color: "#14b8a6",
    icon: "🚀",
    email: "akshatawankhede9@gmail.com",
    contact: "Priya Nair",
    avatar: "PN",
    selfService: false,
    selfServiceLabel: "",
    selfServiceUrl: "",
  },
  performance: {
    label: "Performance & Growth",
    team: "People Development",
    color: "#8b5cf6",
    icon: "📈",
    email: "akshatawankhede9@gmail.com",
    contact: "David Okafor",
    avatar: "DO",
    selfService: false,
    selfServiceLabel: "",
    selfServiceUrl: "",
  },
  grievance: {
    label: "Grievance & Escalation",
    team: "HR Business Partner",
    color: "#ef4444",
    icon: "🔔",
    email: "akshatawankhede9@gmail.com",
    contact: "Linda Walsh",
    avatar: "LW",
    selfService: false,
    selfServiceLabel: "",
    selfServiceUrl: "",
  },
  general: {
    label: "General Query",
    team: "HR Operations",
    color: "#64748b",
    icon: "💬",
    email: "akshatawankhede9@gmail.com",
    contact: "Rahul Verma",
    avatar: "RV",
    selfService: false,
    selfServiceLabel: "",
    selfServiceUrl: "",
  },
};