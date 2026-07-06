import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Github,
  Linkedin,
  FileText,
  Menu,
  X,
  Mail,
  ChevronDown,
  ChevronRight,
  Database,
  Cpu,
  Globe,
  Layers,
  Zap,
  ArrowUpRight,
  MapPin,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Architecture", href: "#architecture" },
  { label: "Contact", href: "#contact" },
];

const STACK = [
  "Python",
  "FastAPI",
  "LangGraph",
  "LangChain",
  "MongoDB",
  "PostgreSQL",
  "Redis",
  "OpenTelemetry",
  "RAG",
  "LLMs",
  "Docker",
  "Celery",
  "OpenAI",
  "WebSockets",
  "Distributed Systems",
];

const EXPERIENCE = [
  {
    id: "tech-adaptive",
    company: "Tech Adaptive",
    role: "AI & Backend Engineer",
    period: "2024 – Present",
    type: "Internship",
    bullets: [
      "Architected multi-agent customer support platform handling 10k+ queries per day",
      "Built LangGraph planner with persistent memory stored in MongoDB",
      "Implemented OpenTelemetry distributed tracing across all microservices",
      "Reduced average response latency by 60% via Redis caching strategy",
    ],
    tech: ["FastAPI", "LangGraph", "MongoDB", "Redis", "OpenTelemetry", "OpenAI"],
    highlight: "60% latency reduction in production",
  },
  {
    id: "onepws",
    company: "ONEPWS",
    role: "Backend Engineer",
    period: "2023 – 2024",
    type: "Part-time",
    bullets: [
      "Developed RESTful APIs serving mobile and web clients at scale",
      "Designed PostgreSQL schemas for multi-tenant SaaS architecture",
      "Built automated webhook processing pipeline for payment integrations",
      "Implemented JWT authentication, rate limiting, and middleware stack",
    ],
    tech: ["FastAPI", "PostgreSQL", "Redis", "Docker", "Stripe API"],
    highlight: "0 → production in 3 months",
  },
  {
    id: "projects",
    company: "Independent Research",
    role: "AI Systems Builder",
    period: "2022 – Present",
    type: "Open Source",
    bullets: [
      "Building production-grade AI applications with measurable real-world metrics",
      "Researching memory architectures for long-context agent workflows",
      "Exploring advanced RAG pipelines for enterprise knowledge retrieval",
      "Contributing open-source tooling to the LangGraph ecosystem",
    ],
    tech: ["Python", "LangGraph", "OpenAI", "MongoDB", "Next.js", "ChromaDB"],
    highlight: "5+ production AI systems shipped",
  },
];

const PROJECTS = [
  {
    id: "customer-support",
    title: "Intelligent Customer Support Platform",
    tagline: "Multi-agent LLM orchestration at production scale",
    description:
      "Autonomous support platform using a LangGraph planner that routes queries to specialized sub-agents — billing, technical, and general — each with tool access and session memory. Built for reliability under high concurrency.",
    problem:
      "Enterprise support teams overwhelmed by repetitive queries with no intelligent routing or context retention across sessions.",
    solution:
      "Hierarchical multi-agent architecture: planner classifies intent, sub-agents resolve with tool access, Redis holds session memory, MongoDB persists history.",
    tech: ["FastAPI", "LangGraph", "MongoDB", "Redis", "OpenTelemetry", "OpenAI GPT-4"],
    metrics: ["10k+ queries/day", "60% latency reduction", "94% auto-resolution"],
    category: "AI Systems",
  },
  {
    id: "image-gen",
    title: "AI Image Generation Platform",
    tagline: "Scalable async image pipeline with multi-model support",
    description:
      "Production backend for image generation with Celery task queues, Redis broker, and an abstraction layer across multiple diffusion model providers. Includes prompt optimization, safety filtering, and webhook delivery.",
    problem:
      "SaaS image APIs are expensive at scale; self-hosting without proper async infrastructure is fragile.",
    solution:
      "Model-agnostic backend with async job processing, webhook callbacks, per-model rate limiting, and a unified API surface.",
    tech: ["FastAPI", "Celery", "Redis", "PostgreSQL", "Docker", "Stable Diffusion"],
    metrics: ["<3s generation", "99.2% uptime", "4 model providers"],
    category: "AI Platform",
  },
  {
    id: "rag-assistant",
    title: "RAG Policy Assistant",
    tagline: "Retrieval-augmented QA with full source attribution",
    description:
      "Enterprise RAG pipeline: ingest policy documents → chunk → embed → hybrid vector search → re-rank → LLM synthesis with citations. Built for auditable, accurate responses over large document corpora.",
    problem:
      "Thousands of policy documents with no efficient semantic search for non-technical staff.",
    solution:
      "Chunked ingestion, dense + BM25 hybrid retrieval, cross-encoder re-ranking, and GPT-4 synthesis with source attribution.",
    tech: ["LangChain", "ChromaDB", "FastAPI", "OpenAI", "PostgreSQL"],
    metrics: ["85% retrieval accuracy", "<2s response", "Source-cited answers"],
    category: "RAG",
  },
  {
    id: "nl-mongo",
    title: "Natural Language MongoDB Query Engine",
    tagline: "English → MongoDB aggregation pipeline, safely executed",
    description:
      "Schema-aware LLM prompting that translates natural language into valid MongoDB aggregation queries. Includes a validation layer and sandboxed execution before returning results to the caller.",
    problem:
      "Non-technical users need database insights but cannot write complex aggregation queries.",
    solution:
      "Schema-grounded prompting generates queries, a validation step checks syntax and safety, then results are formatted for non-technical readers.",
    tech: ["Python", "FastAPI", "MongoDB", "OpenAI", "LangChain"],
    metrics: ["92% query accuracy", "Schema-aware generation", "Safe sandbox"],
    category: "Tooling",
  },
  {
    id: "playlistai",
    title: "PlaylistAI",
    tagline: "Natural language → curated Spotify playlists",
    description:
      "GPT-4 interprets mood and context prompts, maps them to Spotify audio feature targets, searches the catalog, and creates a perfectly curated playlist in one click. Full OAuth 2.0 flow included.",
    problem:
      "Spotify's recommendation algorithm doesn't understand nuanced contextual listening moods described in natural language.",
    solution:
      "LLM maps mood → audio attributes (energy, valence, tempo), searches Spotify's track library, and creates the playlist via API.",
    tech: ["FastAPI", "OpenAI GPT-4", "Spotify API", "PostgreSQL", "OAuth 2.0"],
    metrics: ["20-track curated playlists", "Mood-to-genre mapping", "1-click creation"],
    category: "Consumer AI",
  },
];

const ARCH_FLOW = [
  { label: "User", sublabel: "HTTP / WebSocket", icon: Globe, layer: "Entry" },
  { label: "FastAPI", sublabel: "Gateway + Auth", icon: Zap, layer: "Gateway", featured: true },
  { label: "Planner Agent", sublabel: "Query Router", icon: Cpu, layer: "Planning", featured: true },
  { label: "LangGraph", sublabel: "Agent Orchestration", icon: Layers, layer: "Orchestration", featured: true },
  { label: "Memory + Store", sublabel: "Redis · MongoDB", icon: Database, layer: "Persistence" },
  { label: "LLM", sublabel: "OpenAI GPT-4", icon: Cpu, layer: "Intelligence" },
];

const ARCH_STATS = [
  { label: "Daily Queries", value: "10k+" },
  { label: "Resolution Rate", value: "94%" },
  { label: "Avg. Latency", value: "~800ms" },
];

// ─── Utilities ───────────────────────────────────────────────────────────────

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-mono text-muted-foreground mb-6 tracking-widest uppercase"
      style={{ fontFamily: "JetBrains Mono, monospace" }}
    >
      {children}
    </p>
  );
}

// ─── Network Canvas (Hero BG) ─────────────────────────────────────────────────

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
    }));

    let raf: number;

    const draw = () => {
      const w = W();
      const h = H();
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 135) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.032 * (1 - d / 135)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.13)";
        ctx.arc(pts[i].x, pts[i].y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > lastY.current && y > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "border-b border-white/[0.05] backdrop-blur-xl bg-background/75"
          : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-semibold tracking-tight text-foreground/90 hover:text-foreground transition-colors"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          GSB
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full border border-white/10 text-foreground/80 hover:border-white/20 hover:text-foreground transition-all"
        >
          Get in touch
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-80 border-b border-white/[0.05]" : "max-h-0"
        } bg-background/95 backdrop-blur-xl`}
      >
        <ul className="px-6 py-5 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <NetworkCanvas />

      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-10 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03]"
        >
          <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
          <span
            className="text-xs text-muted-foreground"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="text-5xl sm:text-7xl lg:text-[88px] font-bold tracking-tight leading-[0.93] mb-7"
          style={{ fontFamily: "Onest, sans-serif" }}
        >
          Gaurav Singh
          <br />
          <span className="text-foreground/30">Bhati</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="text-base sm:text-lg font-medium text-muted-foreground mb-2"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          AI & Backend Engineer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="max-w-md text-muted-foreground leading-relaxed mb-10 text-base"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Building intelligent systems, LLM-powered applications, and scalable
          backend platforms. Turning complex engineering problems into
          production-ready software.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-full hover:bg-foreground/90 transition-colors"
          >
            <FileText size={13} />
            Resume
          </a>
          <a
            href="https://github.com/gauravbhati2099"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-sm font-medium rounded-full hover:border-white/20 hover:bg-white/[0.03] transition-all"
          >
            <Github size={13} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/gauravbhati2099"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-sm font-medium rounded-full hover:border-white/20 hover:bg-white/[0.03] transition-all"
          >
            <Linkedin size={13} />
            LinkedIn
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-sm font-medium rounded-full hover:border-white/20 hover:bg-white/[0.03] transition-all"
          >
            View Projects
            <ChevronRight size={13} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-6 flex items-center gap-3"
        >
          <div className="w-px h-10 bg-white/[0.08]" />
          <span
            className="text-xs text-white/20"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="py-28 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_300px] gap-16 lg:gap-24">
          <FadeIn>
            <SectionLabel>About</SectionLabel>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-8"
              style={{ fontFamily: "Onest, sans-serif" }}
            >
              I build systems that think.
            </h2>
            <div
              className="space-y-4 text-muted-foreground leading-relaxed max-w-prose"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              <p>
                I'm a software engineer specializing in AI systems and backend
                infrastructure. My work lives at the intersection of large language
                models and production engineering — where the hard problems aren't
                just "will the AI work," but "will it scale, stay reliable, and make
                architectural sense."
              </p>
              <p>
                Currently building multi-agent platforms at Tech Adaptive, shipping
                LangGraph-based orchestration systems that handle tens of thousands of
                queries daily. I care deeply about observability, memory architecture,
                and system design that survives contact with real users.
              </p>
              <p>
                Outside of work I explore RAG pipelines, long-context agent memory
                architectures, and the emerging patterns of agentic AI infrastructure.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <SectionLabel>Tech Stack</SectionLabel>
            <div className="flex flex-wrap gap-2">
              {STACK.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs border border-white/[0.08] rounded bg-white/[0.02] hover:border-white/[0.14] hover:text-foreground text-muted-foreground transition-all cursor-default"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/[0.05] space-y-3">
              <div className="flex items-center gap-3">
                <MapPin size={12} className="text-muted-foreground/50" />
                <span className="text-sm text-muted-foreground">India</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-green-400" />
                <span className="text-sm text-muted-foreground">Open to remote roles globally</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Experience ──────────────────────────────────────────────────────────────

function Experience() {
  const [active, setActive] = useState("tech-adaptive");
  const current = EXPERIENCE.find((e) => e.id === active)!;

  return (
    <section id="experience" className="py-28 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>Experience</SectionLabel>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-12"
            style={{ fontFamily: "Onest, sans-serif" }}
          >
            Where I've built.
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-10">
          <FadeIn delay={0.08}>
            <div className="flex lg:flex-col gap-1">
              {EXPERIENCE.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setActive(exp.id)}
                  className={`text-left px-4 py-3 rounded-lg border transition-all ${
                    active === exp.id
                      ? "border-white/[0.12] bg-white/[0.04] text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="text-sm font-medium" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {exp.company}
                  </div>
                  <div
                    className="text-xs text-muted-foreground/60 mt-0.5"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {exp.period}
                  </div>
                </button>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.14}>
            <div className="border border-white/[0.07] rounded-xl p-6 sm:p-8 bg-white/[0.015]">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h3
                    className="text-lg font-semibold text-foreground"
                    style={{ fontFamily: "Onest, sans-serif" }}
                  >
                    {current.role}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5" style={{ fontFamily: "DM Sans, sans-serif" }}>
                    {current.company}
                    <span
                      className="ml-2 text-xs"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      · {current.type}
                    </span>
                  </p>
                </div>
                <span
                  className="text-xs text-muted-foreground/60 border border-white/[0.06] px-2.5 py-1 rounded"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  {current.period}
                </span>
              </div>

              <ul className="space-y-3 mb-7">
                {current.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    <span className="mt-2.5 size-1 rounded-full bg-muted-foreground/30 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="pt-5 border-t border-white/[0.05]">
                <div className="flex flex-wrap gap-2 mb-4">
                  {current.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 bg-white/[0.04] border border-white/[0.06] rounded text-muted-foreground"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-green-400/80" />
                  <span
                    className="text-xs text-green-400/80"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {current.highlight}
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Projects ────────────────────────────────────────────────────────────────

function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="projects" className="py-28 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>Projects</SectionLabel>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-12"
            style={{ fontFamily: "Onest, sans-serif" }}
          >
            What I've shipped.
          </h2>
        </FadeIn>

        <div className="space-y-2.5">
          {PROJECTS.map((project, i) => {
            const isOpen = expanded === project.id;
            return (
              <FadeIn key={project.id} delay={i * 0.04}>
                <div className="border border-white/[0.07] rounded-xl overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-colors">
                  <button
                    onClick={() => setExpanded(isOpen ? null : project.id)}
                    className="w-full text-left p-5 sm:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className="text-xs border border-white/[0.06] px-2 py-0.5 rounded text-muted-foreground/60"
                            style={{ fontFamily: "JetBrains Mono, monospace" }}
                          >
                            {project.category}
                          </span>
                        </div>
                        <h3
                          className="text-base sm:text-lg font-semibold text-foreground"
                          style={{ fontFamily: "Onest, sans-serif" }}
                        >
                          {project.title}
                        </h3>
                        <p
                          className="text-sm text-muted-foreground mt-1"
                          style={{ fontFamily: "DM Sans, sans-serif" }}
                        >
                          {project.tagline}
                        </p>
                      </div>
                      <ChevronDown
                        size={15}
                        className={`text-muted-foreground/60 mt-1 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "max-h-[680px]" : "max-h-0"
                    }`}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-5 border-t border-white/[0.05]">
                      <div className="grid sm:grid-cols-2 gap-6 mb-6">
                        <div>
                          <p
                            className="text-xs text-muted-foreground/50 mb-2 uppercase tracking-widest"
                            style={{ fontFamily: "JetBrains Mono, monospace" }}
                          >
                            Overview
                          </p>
                          <p
                            className="text-sm text-muted-foreground leading-relaxed"
                            style={{ fontFamily: "DM Sans, sans-serif" }}
                          >
                            {project.description}
                          </p>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <p
                              className="text-xs text-muted-foreground/50 mb-2 uppercase tracking-widest"
                              style={{ fontFamily: "JetBrains Mono, monospace" }}
                            >
                              Problem
                            </p>
                            <p
                              className="text-sm text-muted-foreground"
                              style={{ fontFamily: "DM Sans, sans-serif" }}
                            >
                              {project.problem}
                            </p>
                          </div>
                          <div>
                            <p
                              className="text-xs text-muted-foreground/50 mb-2 uppercase tracking-widest"
                              style={{ fontFamily: "JetBrains Mono, monospace" }}
                            >
                              Solution
                            </p>
                            <p
                              className="text-sm text-muted-foreground"
                              style={{ fontFamily: "DM Sans, sans-serif" }}
                            >
                              {project.solution}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/[0.04]">
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="text-xs px-2 py-1 bg-white/[0.03] border border-white/[0.06] rounded text-muted-foreground"
                              style={{ fontFamily: "JetBrains Mono, monospace" }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-4">
                          {project.metrics.map((m) => (
                            <span
                              key={m}
                              className="text-xs text-green-400/70"
                              style={{ fontFamily: "JetBrains Mono, monospace" }}
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      <a
                        href="https://github.com/gauravbhati2099"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      >
                        <Github size={12} />
                        View source on GitHub
                        <ArrowUpRight size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Architecture ────────────────────────────────────────────────────────────

function ArchNode({
  label,
  sublabel,
  icon: Icon,
  featured = false,
}: {
  label: string;
  sublabel: string;
  icon: React.ElementType;
  featured?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center min-w-[120px] px-4 py-3 rounded-xl border transition-colors ${
        featured
          ? "border-white/[0.16] bg-white/[0.05] text-foreground"
          : "border-white/[0.07] bg-white/[0.015] text-foreground/75"
      }`}
    >
      <Icon size={13} className={featured ? "mb-1.5 text-green-400/70" : "mb-1.5 text-muted-foreground/60"} />
      <div className="text-sm font-semibold leading-tight" style={{ fontFamily: "Onest, sans-serif" }}>
        {label}
      </div>
      <div
        className="text-xs text-muted-foreground mt-0.5 leading-tight"
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
        {sublabel}
      </div>
    </div>
  );
}

function Architecture() {
  return (
    <section id="architecture" className="py-28 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>Architecture</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "Onest, sans-serif" }}
            >
              How the system connects.
            </h2>
            <p
              className="text-sm text-muted-foreground max-w-xs"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Inside the Intelligent Customer Support Platform — the architecture
              that routes, remembers, and resolves.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="border border-white/[0.07] rounded-2xl p-8 sm:p-12 bg-white/[0.01]">
            {/* Flow diagram — horizontal scroll on small screens */}
            <div className="overflow-x-auto pb-4">
              <div className="flex items-stretch gap-0 min-w-[640px]">
                {ARCH_FLOW.map((node, i) => (
                  <div key={node.label} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <span
                        className="text-[10px] text-muted-foreground/40 mb-3 uppercase tracking-widest whitespace-nowrap"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        {node.layer}
                      </span>
                      <ArchNode
                        label={node.label}
                        sublabel={node.sublabel}
                        icon={node.icon}
                        featured={node.featured}
                      />
                    </div>
                    {i < ARCH_FLOW.length - 1 && (
                      <div className="flex items-center px-1 mt-6">
                        <div className="w-6 h-px bg-white/[0.1]" />
                        <div
                          className="w-0 h-0 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-white/[0.1]"
                          style={{ borderTopWidth: 3, borderBottomWidth: 3, borderLeftWidth: 5 }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Observability note */}
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground/50" style={{ fontFamily: "JetBrains Mono, monospace" }}>
              <span className="size-1.5 rounded-full bg-green-400/40" />
              OpenTelemetry tracing active across all layers
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/[0.05]">
              {ARCH_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-2xl sm:text-3xl font-bold text-foreground"
                    style={{ fontFamily: "Onest, sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs text-muted-foreground mt-1"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

type FormStatus = "idle" | "sending" | "sent" | "error";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("sent");
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <section id="contact" className="py-28 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <FadeIn>
            <SectionLabel>Contact</SectionLabel>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "Onest, sans-serif" }}
            >
              Let's build
              <br />
              something.
            </h2>
            <p
              className="text-muted-foreground leading-relaxed max-w-sm mb-10"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Open to AI engineering roles, backend positions, and interesting
              technical challenges. I respond within 24 hours.
            </p>
            <div className="flex flex-col gap-4">
              {[
                { icon: Mail, label: "gaurav@example.com", href: "mailto:gaurav@example.com" },
                { icon: Linkedin, label: "linkedin.com/in/gauravbhati2099", href: "https://linkedin.com/in/gauravbhati2099" },
                { icon: Github, label: "github.com/gauravbhati2099", href: "https://github.com/gauravbhati2099" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  style={{ fontFamily: "JetBrains Mono, monospace" }}
                >
                  <Icon size={13} />
                  {label}
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            {status === "sent" ? (
              <div className="flex flex-col items-start justify-center h-full py-12">
                <div className="flex items-center gap-2 mb-4">
                  <span className="size-2 rounded-full bg-green-400" />
                  <span
                    className="text-sm text-green-400"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    Message sent
                  </span>
                </div>
                <p
                  className="text-muted-foreground text-sm"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {(
                  [
                    { key: "name", label: "Name", type: "text", placeholder: "Your name" },
                    { key: "email", label: "Email", type: "email", placeholder: "you@company.com" },
                  ] as const
                ).map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label
                      className="text-xs text-muted-foreground mb-2 block tracking-widest uppercase"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {label}
                    </label>
                    <input
                      type={type}
                      required
                      value={form[key]}
                      onChange={set(key)}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-white/[0.18] transition-colors"
                      style={{ fontFamily: "DM Sans, sans-serif" }}
                    />
                  </div>
                ))}
                <div>
                  <label
                    className="text-xs text-muted-foreground mb-2 block tracking-widest uppercase"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="What are you working on?"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-foreground placeholder-muted-foreground/40 focus:outline-none focus:border-white/[0.18] transition-colors resize-none"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-8 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        <span
          className="text-xs text-muted-foreground/50"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          © 2025 Gaurav Singh Bhati
        </span>
        <div className="flex items-center gap-5">
          {[
            { icon: Github, href: "https://github.com/gauravbhati2099" },
            { icon: Linkedin, href: "https://linkedin.com/in/gauravbhati2099" },
            { icon: Mail, href: "mailto:gaurav@example.com" },
          ].map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-muted-foreground/40 hover:text-muted-foreground transition-colors"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "DM Sans, sans-serif" }}>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Architecture />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
