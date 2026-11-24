// Titles and dates follow Maxim's LinkedIn experience and education entries.
export const profileLinks = {
  linkedin: "https://www.linkedin.com/in/maxim-simakoff/",
  github: "https://github.com/maximsimakoff"
};

export type CareerRole = {
  company: string;
  role: string;
  period: string;
  employmentType: string;
  current: boolean;
  summary: string;
};

export const careerRoles: CareerRole[] = [
  {
    company: "Tribe Capital",
    role: "AI Engineer",
    period: "Jun 2026 – Present",
    employmentType: "Internship",
    current: true,
    summary: "Build research tools that help the investment team find information about companies and check the sources behind each answer."
  },
  {
    company: "SmartStart Education",
    role: "Forward Deployed Engineer",
    period: "Jul 2026 – Present",
    employmentType: "Contract",
    current: true,
    summary: "Build adaptive SAT tests and progress reports for educators. In October 2026, my role expanded to include Talent Operations automation and feature development for SmartHub."
  },
  {
    company: "Tribe Capital",
    role: "Full Stack Engineer",
    period: "Sep 2025 – Jun 2026",
    employmentType: "Internship",
    current: false,
    summary: "Built a custom CRM, data pipelines, and dashboards that brought investor relationships and portfolio reporting into one place."
  },
  {
    company: "Town of Barnstable",
    role: "Lifeguard & Sailing Instructor",
    period: "Jun 2025 – Aug 2025",
    employmentType: "Seasonal",
    current: false,
    summary: "Lifeguarded at Craigville Beach and taught sailing and water safety to more than 50 students."
  },
  {
    company: "School16",
    role: "Social Media Marketing & Business Development Intern",
    period: "Sep 2022 – May 2024",
    employmentType: "Internship",
    current: false,
    summary: "Ran social campaigns, analyzed performance, and researched prospective partners for the growth team."
  },
  {
    company: "Self-employed",
    role: "Mathematics Tutor",
    period: "Sep 2016 – May 2024",
    employmentType: "Self-employed",
    current: false,
    summary: "Taught calculus, algebra, and geometry through individual lessons and tailored study plans."
  },
  {
    company: "Sea Bags",
    role: "Retail Sales Associate",
    period: "Jun 2023 – Aug 2023",
    employmentType: "Part-time",
    current: false,
    summary: "Worked with customers in the Hyannis store and supported merchandising and promotional events."
  }
];

export const education = {
  school: "University of Massachusetts Amherst",
  field: "Computer Science",
  period: "Sep 2023 – May 2027",
  graduation: "May 2027",
  gpa: "3.9"
};

export const languages = [
  { name: "English", proficiency: "Native or bilingual" },
  { name: "Russian", proficiency: "Native or bilingual" },
  { name: "Spanish", proficiency: "Limited working proficiency" }
];

export const cloudPlatforms = [
  {
    name: "AWS",
    services: [
      "Application Load Balancer", "AWS CDK", "AWS CLI", "Certificate Manager", "CloudFormation",
      "EBS", "EC2", "IAM", "Parameter Store", "RDS for PostgreSQL", "S3", "Secrets Manager",
      "Systems Manager", "VPC"
    ]
  },
  {
    name: "Microsoft Azure",
    services: [
      "App Service", "Application Insights", "Azure CLI", "Azure Database for PostgreSQL Flexible Server",
      "Azure Monitor", "Entra External ID", "Key Vault", "Log Analytics", "Managed Identities",
      "Microsoft Entra ID", "Static Web Apps"
    ]
  },
  {
    name: "Google Cloud",
    services: ["Artifact Registry", "Cloud Run", "Google Cloud CLI"]
  }
];

// Each group shares its résumé highlights with the complete homepage inventory.
export const toolGroups = [
  {
    label: "Languages & scripting",
    highlights: ["Python", "TypeScript", "JavaScript", "SQL", "Java", "C", "C++"],
    additional: ["PL/pgSQL", "Bash", "PowerShell", "VBScript", "HTML", "CSS"]
  },
  {
    label: "Interfaces & graphics",
    highlights: ["React", "Next.js", "Three.js", "Tailwind CSS"],
    additional: [
      "Vite", "Redux Toolkit", "TanStack Query", "React Router", "React Hook Form",
      "Material UI", "Radix UI", "shadcn/ui", "React Three Fiber", "Recharts",
      "FullCalendar", "JSXGraph", "MathLive", "Windows Forms"
    ]
  },
  {
    label: "Backend & databases",
    highlights: ["Node.js", "Express", "FastAPI", "PostgreSQL", "Supabase"],
    additional: ["SQLite", "Prisma", "Drizzle ORM", "PostgREST", "Zod", "Pydantic", "Pino"]
  },
  {
    label: "AI & machine learning",
    highlights: ["PyTorch", "scikit-learn", "OpenAI Responses API", "Anthropic Claude"],
    additional: [
      "Model Context Protocol (MCP)", "OpenRouter", "OpenAI Chat Completions API",
      "torchvision", "Jupyter", "Google Colab"
    ]
  },
  {
    label: "APIs & workflow automation",
    highlights: ["Microsoft Graph", "HubSpot CRM API", "Slack SDK", "Power Automate"],
    additional: [
      "Paycor API", "Twilio", "SendGrid", "SharePoint Online", "OneDrive for Business",
      "Microsoft Forms", "JSON-RPC"
    ]
  },
  {
    label: "Data, documents & reporting",
    highlights: ["pandas", "NumPy", "Parquet"],
    additional: [
      "Matplotlib", "seaborn", "Excel", "openpyxl", "ExcelJS", "ReportLab", "pypdf", "MuPDF"
    ]
  },
  {
    label: "Delivery & operations",
    highlights: ["Docker", "GitHub Actions", "Linux"],
    additional: [
      "Docker Compose", "Docker Buildx", "Git", "GitHub CLI", "GitHub Pages", "Vercel",
      "systemd", "Caddy", "Tailscale", "Windows Task Scheduler", "npm", "esbuild", "Codex CLI"
    ]
  },
  {
    label: "Testing & code quality",
    highlights: ["Playwright", "Vitest", "pytest", "Testcontainers"],
    additional: [
      "Jest", "React Testing Library", "Supertest", "jsdom", "ESLint", "Prettier",
      "Ruff", "mypy", "unittest"
    ]
  },
  {
    label: "Identity & software security",
    highlights: ["OAuth 2.0", "OpenID Connect"],
    additional: ["MSAL", "libsodium", "bcrypt", "Gitleaks", "Syft", "Grype", "CycloneDX"]
  }
];

export const skills = [
  {
    label: "Cloud platforms",
    items: cloudPlatforms.map(({ name }) => name)
  },
  ...toolGroups.map(({ label, highlights }) => ({ label, items: highlights }))
];

export type WorkProject = {
  name: string;
  kind: "hubclaw" | "dashboard" | "sat" | "polyglot" | "assembly" | "scheduler";
  collection: "professional" | "campus";
  company: string;
  category: string;
  year: string;
  summary: string;
  details: string[];
  tags: string[];
  link?: { label: string; href: string };
};

export const workProjects: WorkProject[] = [
  {
    name: "HubClaw",
    kind: "hubclaw",
    collection: "professional",
    company: "Tribe Capital",
    category: "AI research assistant",
    year: "2026",
    summary: "A research assistant for investor questions about companies and past conversations.",
    details: [
      "A team member can look up a relationship, revisit meeting notes, or prepare for a follow-up. Each answer includes citations the team can check."
    ],
    tags: ["Investment research", "Natural language search", "Source attribution"]
  },
  {
    name: "LP Dashboard",
    kind: "dashboard",
    collection: "professional",
    company: "Tribe Capital",
    category: "Investor reporting",
    year: "2026",
    summary: "An internal dashboard connecting fund reporting with the people and portfolio companies behind it.",
    details: [
      "The team can review a limited partner’s relationship history alongside fund performance before an investor conversation."
    ],
    tags: ["Investor reporting", "Data visualization", "Portfolio analytics"]
  },
  {
    name: "SAT Prep Platform",
    kind: "sat",
    collection: "professional",
    company: "SmartStart Education",
    category: "Adaptive learning",
    year: "2026",
    summary: "An adaptive SAT preparation platform that connects student practice with progress analytics.",
    details: [
      "Developed under a SmartStart Education contract that began in July 2026, the platform supports adaptive testing and gives schools and programs a shared view of student progress."
    ],
    tags: ["Adaptive testing", "Analytics", "Full-stack development"],
    link: { label: "Visit platform", href: "https://sat.smartstarteducation.com/" }
  },
  {
    name: "Polyglot",
    kind: "polyglot",
    collection: "campus",
    company: "HackUMass XII",
    category: "Developer tools",
    year: "2024",
    summary: "A browser-based tool for translating source code between programming languages.",
    details: [
      "Built with Ivan Matviichuk during a 36-hour hackathon. Developers paste code, choose a target language, and review the translated output in their browser."
    ],
    tags: ["JavaScript", "Python", "Code translation"],
    link: { label: "View on Devpost", href: "https://devpost.com/software/polyglot-q3lkfp" }
  },
  {
    name: "Assembly Interpreter",
    kind: "assembly",
    collection: "campus",
    company: "UMass Amherst",
    category: "Systems programming",
    year: "2024",
    summary: "A C interpreter that executes x86-like instructions against simulated registers, memory, and a stack.",
    details: [
      "Implemented data movement, arithmetic, and comparison instructions. Tracking the program counter and validating memory accesses made each step of execution explicit."
    ],
    tags: ["C", "x86", "Memory management"]
  },
  {
    name: "Parallel Processing Simulator",
    kind: "scheduler",
    collection: "campus",
    company: "UMass Amherst",
    category: "Concurrent systems",
    year: "2024",
    summary: "A multi-core scheduling simulation that coordinates separate processes with pipes and signals.",
    details: [
      "Forked processes represent concurrent work. IPC and signals coordinate scheduling, synchronization, and shutdown."
    ],
    tags: ["C", "Unix processes", "IPC", "Scheduling"]
  }
];
