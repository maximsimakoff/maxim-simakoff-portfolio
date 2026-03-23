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
      "Portfolio and resume site for Maxim Simakoff, focused on internal platforms, workflow systems, and full-stack engineering with infrastructure awareness."
  },
  nav: [
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Stack", href: "#stack" },
    { label: "About", href: "#about" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" }
  ] satisfies NavItem[],
  person: {
    name: "Maxim Simakoff",
    role:
      "Full-stack engineer building internal systems, workflow software, and infra-aware products.",
    snapshot: "I build software that turns messy operations into clear systems.",
    statusNote:
      "Current focus: relationship management and investor workflows."
  },
  hero: {
    eyebrow: "Portfolio",
    title: "Full-stack systems for real internal workflows.",
    description:
      "At Tribe Capital, I built tools that help the investment team review investor relationships and follow up on opportunities.",
    supportingPoints: [
      {
        label: "latest",
        value: "Tribe Capital"
      },
      {
        label: "focus",
        value: "internal tools / CRM / investor ops"
      },
      {
        label: "scope",
        value: "product design and engineering"
      }
    ] satisfies SignalItem[]
  },
  speed: {
    eyebrow: "Speed to clarity",
    title: "Decision-ready context in seconds.",
    description: "from live inputs to a usable operating view",
    statValue: 2,
    statLabel: "",
    statNote:
      "Client history, pipeline status, and portfolio signal arrive in one pass.",
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
    destinationTitle: "CEO's Dream Master Control Panel",
    destinationFocus: "Investments",
    takeaways: [
      {
        label: "Decision speed",
        value: "Fast enough to support live discussion."
      },
      {
        label: "Clarity",
        value: "Readable for operators and leadership."
      }
    ] satisfies SignalItem[]
  } satisfies SpeedSectionContent,
  about: {
    title: "How I work.",
    description: "A short view of how I think about building.",
    paragraphs: [
      "I like software that clears operational bottlenecks, not just surface-level UI problems.",
      "The work I enjoy most sits where product judgment, systems design, and reliable delivery meet."
    ],
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
    role: "Internal Systems / Full-Stack Engineering",
    meta: ["most recent", "high ownership"],
    spotlight:
      "Custom CRM, investor pipeline, and workflow systems built end to end.",
    summary:
      "Built internal tools for managing investor relationships and tracking opportunities, from initial product design through daily use.",
    bullets: [
      "Built tools for looking up investor relationships and reviewing past conversations.",
      "Designed an investor pipeline system that improved visibility and execution across internal workflows.",
      "Owned product design, implementation, and iteration with the people using the tools.",
      "Made it easier for the team to review relationship history before a follow-up."
    ],
    pillars: [
      {
        label: "Product systems",
        value: "Internal tools shaped around real operating workflows."
      },
      {
        label: "Full-stack",
        value: "Frontend, backend, logic, and integration ownership."
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
  experienceNotice:
    "Earlier roles are brief here. The focus is recent engineering work.",
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
    title: "Technical stack.",
    description:
      "A focused view of the tools behind my recent work.",
    intro:
      "The toolkit behind internal products, workflow software, and infra-aware delivery.",
    guidance: "Hover to preview. Click to keep a branch selected.",
    clusters: [
      {
        id: "workflow",
        label: "Workflow systems",
        description: "Internal products tied closely to operating workflows.",
        detail:
          "Tools for reviewing relationships, checking the status of opportunities, and planning follow-ups.",
        items: ["Relationship management", "CRM", "Investor pipeline", "Internal tooling"]
      },
      {
        id: "frontend",
        label: "Frontend",
        description: "Interfaces for dense workflows and product-facing tools.",
        detail:
          "React and Next.js for structured UI, with Tailwind and motion used to keep complex surfaces calm and readable.",
        items: ["React", "Next.js", "Tailwind", "Framer Motion"]
      },
      {
        id: "backend",
        label: "Backend",
        description: "APIs, services, integrations, and system behavior.",
        detail:
          "Backend work centered on service logic, API design, and the integration work that connects product surfaces to operational data.",
        items: ["FastAPI", "APIs", "Services", "Integrations"]
      },
      {
        id: "infra",
        label: "Infra / delivery",
        description: "Deployment, environments, and security-minded shipping.",
        detail:
          "Version control, container tooling, and Linux fundamentals for developing and maintaining software.",
        items: ["Docker", "Vercel", "Git", "Linux", "Hardening"]
      },
      {
        id: "languages",
        label: "Languages",
        description: "Core implementation mix from product code to lower-level systems work.",
        detail:
          "TypeScript anchors current product work, with Python, Java, C, and SQL supporting data handling and lower-level systems work.",
        items: ["TypeScript", "JavaScript", "Python", "Java", "C", "SQL"]
      },
      {
        id: "data",
        label: "Data / systems",
        description: "Structure, reporting, and workflow visibility.",
        detail:
          "The focus here is making systems legible through reporting, workflow visibility, and clear operational data.",
        items: ["Reporting", "Pipelines", "Visibility", "Workflow data"]
      }
    ] satisfies StackCluster[]
  },
  resume: {
    intro:
      "A clean resume view with the same recent experience and project emphasis.",
    description:
      "Short, readable, and centered on recent technical work.",
    highlights: [
      "Recent work centers on CRM, investor pipeline, and internal systems at Tribe Capital.",
      "Comfortable working across product design, frontend, and backend engineering.",
      "Built AI-assisted tools and systems programming projects with product and systems depth.",
      "Computer Science student at UMass Amherst, graduating May 2027."
    ]
  },
  skills: [
    {
      label: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "Java", "C", "SQL"]
    },
    {
      label: "Frontend",
      items: ["React", "Next.js", "Tailwind", "Framer Motion"]
    },
    {
      label: "Backend / workflow",
      items: ["FastAPI", "APIs", "HubSpot integrations", "Internal tooling"]
    },
    {
      label: "Infra / delivery",
      items: ["Docker", "Vercel", "Git", "Linux", "Hardening"]
    },
    {
      label: "Working style",
      items: ["Product thinking", "Clear communication", "Iteration", "Ownership"]
    }
  ],
  contact: {
    title: "Open to full-stack and systems roles.",
    description:
      "Best fit: product-minded teams building internal tools, workflow systems, or infra-aware software."
  }
};
