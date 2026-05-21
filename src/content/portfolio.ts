export type NavItem = {
  label: string;
  href: string;
};

export type SignalItem = {
  label: string;
  value: string;
};

export type PrincipleItem = {
  label: string;
  value: string;
};

export type SpeedSignal = {
  label: string;
  value: string;
};

export type SpeedSectionContent = {
  eyebrow: string;
  title: string;
  description: string;
  statValue: number;
  statLabel: string;
  statNote: string;
  sources: SpeedSignal[];
  destinationLabel: string;
  destinationTitle: string;
  destinationFocus: string;
  takeaways: SignalItem[];
};

export type StackCluster = {
  id: string;
  label: string;
  description: string;
  detail: string;
  items: string[];
};

export type FeaturedExperience = {
  company: string;
  role: string;
  meta: string[];
  spotlight: string;
  summary: string;
  bullets: string[];
  pillars: PrincipleItem[];
  tags: string[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  meta: string[];
  summary: string;
  bullets: string[];
  tags: string[];
};

export type ProjectItem = {
  name: string;
  label: string;
  period: string;
  description: string;
  detail: string;
  tags: string[];
  links: { label: string; href: string }[];
};

export const portfolioContent = {
  meta: {
    description:
      "Interactive resume for Maxim Simakoff, focused on revenue systems, AI workflows, and product engineering."
  },
  nav: [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contact" }
  ] satisfies NavItem[],
  person: {
    name: "Maxim Simakoff",
    role:
      "Revenue systems, AI workflows, and product engineering.",
    snapshot: "I turn messy operating work into fast, usable software.",
    statusNote:
      "Current focus: relationship management, investor workflows, and AI-assisted research."
  },
  hero: {
    eyebrow: "Live portfolio",
    title: "Systems that make work move.",
    description:
      "I build practical full-stack tools for teams that need clearer context, faster decisions, and less operational drag."
  },
  speed: {
    eyebrow: "Operating view",
    title: "Context, routes, actions.",
    description: "",
    statValue: 2,
    statLabel: "",
    statNote:
      "Client history, pipeline state, and portfolio signal arrive in one pass.",
    sources: [
      {
        label: "Clients",
        value: "relationship context and history"
      },
      {
        label: "Pipeline",
        value: "ownership, status, and next actions"
      },
      {
        label: "Investments",
        value: "portfolio signal worth acting on"
      }
    ] satisfies SpeedSignal[],
    destinationLabel: "Leadership view",
    destinationTitle: "Operating cockpit",
    destinationFocus: "Investments",
    takeaways: [
      {
        label: "Decision speed",
        value: "Built for live decisions."
      },
      {
        label: "Clarity",
        value: "Readable across teams."
      }
    ] satisfies SignalItem[]
  } satisfies SpeedSectionContent,
  about: {
    title: "How I work",
    description: "",
    paragraphs: [],
    principles: [
      {
        label: "Build",
        value: "Start from real workflow pain."
      },
      {
        label: "Own",
        value: "Work across the stack."
      },
      {
        label: "Control",
        value: "Keep systems clear and reliable."
      }
    ] satisfies PrincipleItem[],
    facts: [
      { label: "Current", value: "Tribe Capital / internal systems" },
      { label: "Education", value: "UMass Amherst, CS" },
      { label: "Grad", value: "May 2027" },
      { label: "Languages", value: "English, Russian" }
    ] satisfies SignalItem[]
  },
  featuredExperience: {
    company: "Tribe Capital",
    role: "Full-Stack + AI Engineer",
    meta: ["most recent", "high ownership"],
    spotlight:
      "Custom CRM, investor pipeline, and workflow systems, built end to end.",
    summary:
      "Owned product design and engineering for tools the investment team uses to research relationships and track opportunities.",
    bullets: [
      "Built tools for looking up investor relationships and reviewing past conversations.",
      "Designed investor pipeline tooling for ownership, status, and next actions.",
      "Owned product design, implementation, and iteration with the people using the tools."
    ],
    pillars: [
      {
        label: "Workflow",
        value: "CRM and investor tooling shaped around the team's real workflow."
      },
      {
        label: "Visibility",
        value: "Pipeline state, ownership, and next actions surfaced in one layer."
      },
      {
        label: "Full-stack",
        value: "Frontend, backend, APIs, and integration logic owned together."
      },
      {
        label: "Delivery",
        value: "Owned the work from the first design through day-to-day use."
      },
      {
        label: "Relationship history",
        value: "Helped the team revisit past conversations before following up."
      }
    ] satisfies PrincipleItem[],
    tags: [
      "Full-stack engineering",
      "Relationship management",
      "Investor workflows"
    ]
  } satisfies FeaturedExperience,
  experienceNotice: "",
  experience: [
    {
      company: "School16.co",
      role: "Growth / Research",
      meta: ["earlier", "remote"],
      summary:
        "Research and outreach work before my shift into engineering-heavy roles.",
      bullets: [
        "Researched partnerships and supported growth initiatives."
      ],
      tags: ["research", "communication"]
    },
    {
      company: "Independent",
      role: "Math Tutor",
      meta: ["earlier", "hybrid"],
      summary:
        "Long-running teaching work that sharpened explanation and structured problem solving.",
      bullets: [
        "Helped students improve performance through clear, repeatable reasoning."
      ],
      tags: ["teaching", "problem solving"]
    }
  ] satisfies ExperienceItem[],
  projects: [
    {
      name: "Tribe Capital - HubClaw",
      label: "AI research assistant",
      period: "2026",
      description:
        "A research assistant for investor questions about companies and past conversations.",
      detail:
        "Team members can look up a relationship, revisit meeting notes, or prepare for a follow-up. Answers include citations they can check.",
      tags: [
        "Investment research",
        "Natural language search",
        "Source attribution"
      ],
      links: []
    },
    {
      name: "Tribe Capital - LP Dashboard",
      label: "investor reporting system",
      period: "2026",
      description:
        "An internal LP dashboard for Tribe Capital that brings investor, portfolio, and reporting workflows into a cleaner operating view.",
      detail:
        "Focused on turning fragmented fund and relationship data into readable dashboards for faster review, follow-up, and investor context.",
      tags: [
        "Investor reporting",
        "Data visualization",
        "Portfolio analytics"
      ],
      links: []
    },
    {
      name: "Polyglot",
      label: "AI developer tool",
      period: "2024",
      description:
        "A browser-based tool for translating source code between programming languages.",
      detail:
        "Developers paste code, choose a target language, and review the translated output in their browser.",
      tags: ["JavaScript", "Python", "Code translation"],
      links: []
    },
    {
      name: "Assembly Interpreter",
      label: "systems programming",
      period: "2024",
      description:
        "A C-based interpreter for x86-like instructions with strict attention to correctness.",
      detail:
        "Focused on execution flow, memory validation, and stack behavior.",
      tags: ["c", "systems", "x86"],
      links: []
    },
    {
      name: "Parallel Processing Simulator",
      label: "concurrency / IPC",
      period: "2024",
      description:
        "A multi-core scheduler simulation using forks, pipes, and signals.",
      detail:
        "Built around synchronization, graceful shutdown, and predictable process control.",
      tags: ["c", "fork", "pipes", "signals"],
      links: []
    }
  ] satisfies ProjectItem[],
  stackMap: {
    title: "Technical stack",
    description: "",
    intro: "",
    clusters: [
      {
        id: "core",
        label: "Core languages",
        description: "Implementation layer across frontend, backend, scripts, and ops.",
        detail:
          "Languages and formats I use for application code, automation, and data.",
        items: ["Python", "TypeScript/TSX", "JavaScript", "Bash", "Dockerfile", "YAML"]
      },
      {
        id: "frontend",
        label: "Frontend",
        description: "Interfaces for dense workflows and product-facing tools.",
        detail:
          "Tools for building interfaces, handling forms, and visualizing data.",
        items: ["React 18", "Vite", "Tailwind", "shadcn/ui", "Radix UI", "React Query"]
      },
      {
        id: "data-analysis",
        label: "Data & analysis",
        description: "Tools for organizing, querying, and exploring data.",
        detail:
          "I use databases, data frames, and file formats to make information easier to analyze.",
        items: ["PostgreSQL", "pandas", "NumPy", "SQL", "Parquet"]
      },
      {
        id: "integrations",
        label: "APIs & integrations",
        description: "Tools for connecting applications and working with APIs.",
        detail:
          "I use API frameworks, SDKs, and validation libraries to build integrations.",
        items: ["FastAPI", "Pydantic", "CRM APIs", "Messaging SDKs"]
      },
      {
        id: "ops",
        label: "Deployment / ops",
        description: "Tools for packaging and maintaining software.",
        detail:
          "I work with containers, command-line tools, version control, and Linux.",
        items: ["Docker", "Docker Compose", "Git", "Linux"]
      },
      {
        id: "reports",
        label: "Reports / docs",
        description: "Generated reporting artifacts and file workflows.",
        detail:
          "File formats, plotting libraries, and document tools for preparing readable reports.",
        items: ["Parquet", "CSV", "PDF", "PNG", "Matplotlib", "ReportLab"]
      }
    ] satisfies StackCluster[]
  },
  resume: {
    intro: "",
    description:
      "Short, readable, and centered on recent technical work.",
    highlights: []
  },
  skills: [
    {
      label: "Core",
      items: ["Python", "TypeScript/TSX", "JavaScript", "HTML/CSS", "Bash", "Dockerfile", "YAML", "JSON"]
    },
    {
      label: "Frontend",
      items: ["React 18", "Vite", "Tailwind CSS", "shadcn/ui", "Radix UI", "React Query", "React Hook Form", "Recharts"]
    },
    {
      label: "Data & analysis",
      items: ["PostgreSQL", "pandas", "NumPy", "Parquet", "Pydantic"]
    },
    {
      label: "APIs & integrations",
      items: ["FastAPI", "HubSpot CRM APIs", "Slack SDK", "Twilio", "OpenAI Responses API", "OAuth/OIDC"]
    },
    {
      label: "Development tools",
      items: ["Docker Compose", "Git", "Linux", "Cloud Run", "Artifact Registry", "gcloud"]
    },
    {
      label: "Reports / files",
      items: ["Parquet", "CSV", "JSON", "PDF", "PNG", "Matplotlib", "ReportLab", "pypdf"]
    }
  ],
  contact: {
    title: "Open to full-stack roles",
    description: ""
  }
};
