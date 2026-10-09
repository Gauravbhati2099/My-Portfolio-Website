import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
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
  Play,
  Pause,
  Coins,
  Home,
  Volume2,
  VolumeX,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Architecture", href: "#architecture" },
  { label: "Mini game", href: "#mini-game" },
  { label: "Contact", href: "#contact" },
];

const SUNNY_WORLDS = [
  { name: "Sunny Coast", range: "0–449", detail: "Start on the coast and get your jump timing down.", sky: "#55c7ee", tint: "rgba(255, 204, 92, .04)", soil: [48, 16], grass: [16, 16], start: 0, end: 450 },
  { name: "Canopy Village", range: "450–949", detail: "The forest route begins at 450 points, with greener ground and village scenery.", sky: "#315762", tint: "rgba(58, 113, 79, .12)", soil: [16, 32], grass: [32, 16], start: 450, end: 950 },
  { name: "Golden Grove", range: "950+", detail: "Reach 950 points to enter the final sunset world. Keep running for your best score.", sky: "#e99269", tint: "rgba(255, 129, 76, .2)", soil: [64, 16], grass: [16, 16], start: 950, end: null },
];

const getWorldIndex = (score: number) => Math.max(0, SUNNY_WORLDS.findIndex((world) => world.end === null || score < world.end));

const SUNNY_CHARACTERS = [
  { id: "foxy", name: "Foxy", detail: "Quick-footed fox", run: "/game/sunnyland/Characters/Foxy/run/spritesheet.png", jump: "/game/sunnyland/Characters/Foxy/jump/spritesheet.png", frameWidth: 33, frameHeight: 32, runFrames: 6, jumpFrames: 2 },
  { id: "frog", name: "Frog", detail: "Bouncy explorer", run: "/game/sunnyland/Characters/frog/Spritesheets/frog-idle.png", jump: "/game/sunnyland/Characters/frog/Spritesheets/frog-jump.png", frameWidth: 35, frameHeight: 32, runFrames: 4, jumpFrames: 3 },
  { id: "opossum", name: "Opossum", detail: "Curious trail scout", run: "/game/sunnyland/Characters/Opossum/spritesheet.png", jump: "/game/sunnyland/Characters/Opossum/spritesheet.png", frameWidth: 36, frameHeight: 28, runFrames: 6, jumpFrames: 6 },
];

const SKILL_GROUPS = [
  { label: "AI & retrieval", items: ["LangGraph", "LangChain", "LLMs", "RAG", "Diffusers", "Stable Diffusion"] },
  { label: "Backend & data", items: ["Python", "FastAPI", "REST APIs", "Pydantic", "MongoDB", "PostgreSQL", "Redis"] },
  { label: "Platform & observability", items: ["Docker", "OpenTelemetry"] },
];

const EXPERIENCE = [
  {
    id: "tempsens",
    company: "Tempsens Instruments",
    role: "IT Intern",
    period: "Jul 2026 – Present",
    type: "Full-time Internship",
    bullets: [
      "Developing and enhancing enterprise applications using Microsoft Power Platform.",
      "Creating Power Apps, Power Automate workflows, and internal business solutions.",
      "Preparing user manuals, technical documentation, and process guides for enterprise systems.",
      "Testing, debugging, and improving Gate Management, SRM, SCM, and related business applications.",
      "Collaborating with business stakeholders and third-party vendors to gather requirements and suggest product improvements."
    ],
    tech: [
      "Power Apps",
      "Power Automate",
      "Microsoft 365",
      "SharePoint",
      "SAP",
      "SQL"
    ],
    highlight: "Enterprise application development & process automation"
  },
  {
    id: "onepws",
    company: "ONEPWS",
    role: "AI Engineer Intern",
    period: "Jun 2026 – Jul 2026",
    type: "Internship",
    bullets: [
      "Architected an AI-powered customer support platform with conversational AI, long-term memory, and document workflows.",
      "Built modular LangGraph pipelines with asynchronous background workers for memory extraction and auditing.",
      "Designed a schema-aware natural language MongoDB query engine with runtime schema discovery.",
      "Reduced query planning latency from approximately 30 seconds to under 5 seconds.",
      "Optimized memory retrieval from approximately 2.3 seconds to under 100 milliseconds using Redis caching."
    ],
    tech: [
      "Python",
      "FastAPI",
      "LangGraph",
      "MongoDB",
      "Redis",
      "OpenTelemetry"
    ],
    highlight: "AI workflow architecture & memory systems"
  },
  {
    id: "tech-adaptive",
    company: "Tech Adaptive",
    role: "AI Research Intern",
    period: "Dec 2025 – Feb 2026",
    type: "Internship",
    bullets: [
      "Designed evaluation workflows for LLM and machine learning systems.",
      "Performed structured experimentation, edge-case testing, and failure-mode analysis.",
      "Documented model behavior and research findings to support AI development."
    ],
    tech: [
      "FastAPI",
      "LangGraph",
      "MongoDB",
      "Redis",
      "OpenAI"
    ],
    highlight: "LLM evaluation & experimentation"
  }
];

const PROJECTS = [
  {
    id: "customer-support",
    title: "Intelligent Customer Support Platform",
    tagline: "Workflow-driven AI assistant with long-term memory",

    description:
      "An AI-powered customer support platform combining conversational AI, workflow orchestration, persistent memory, document processing, and natural-language data access. Built with a modular LangGraph architecture to support scalable business workflows.",

    problem:
      "Businesses often rely on disconnected tools for customer support, document retrieval, and internal knowledge, making it difficult to provide contextual and efficient assistance.",

    solution:
      "Designed a modular LangGraph workflow coordinating planning, authorization, memory retrieval, document processing, and specialized business workflows through reusable AI components.",

    tech: [
      "Python",
      "FastAPI",
      "LangGraph",
      "MongoDB",
      "Redis",
      "OpenTelemetry",
    ],

    metrics: [
      "5+ business workflows",
      "6+ asynchronous worker services",
      "8-stage memory lifecycle",
    ],

    category: "AI Systems",
  },

  {
    id: "image-gen",
    title: "AI Image Generation Platform",
    tagline: "Collaborative multi-user AI image generation",

    description:
      "A collaborative image generation platform supporting authenticated users, prompt history, persistent image storage, and asynchronous image generation using Stable Diffusion models.",

    problem:
      "AI image generation tools often lack user management, persistent history, and collaborative workflows needed for small teams and organizations.",

    solution:
      "Developed a FastAPI backend integrating Stable Diffusion through Hugging Face Diffusers with authentication, persistent storage, prompt management, and asynchronous image generation.",

    tech: [
      "Python",
      "FastAPI",
      "Diffusers",
      "Stable Diffusion",
      "REST APIs",
    ],

    metrics: [
      "Authenticated users",
      "Persistent image history",
      "Asynchronous generation",
    ],

    category: "AI Applications",
  },

  {
    id: "rag-assistant",
    title: "RAG Policy Assistant",
    tagline: "Local Retrieval-Augmented Generation with source attribution",

    description:
      "A fully local Retrieval-Augmented Generation system supporting semantic search across multiple document formats with citation-backed responses and OCR support.",

    problem:
      "Traditional keyword search struggles to retrieve relevant information from large collections of policy and technical documents.",

    solution:
      "Implemented a semantic retrieval pipeline combining document parsing, embeddings, vector search, and citation-aware response generation using local language models.",

    tech: [
      "Python",
      "FastAPI",
      "LangChain",
      "FAISS",
      "Ollama",
      "OCR",
    ],

    metrics: [
      "4 supported document formats",
      "Semantic vector search",
      "Citation-backed responses",
    ],

    category: "Retrieval-Augmented Generation",
  },

  {
    id: "nl-mongo",
    title: "Natural Language MongoDB Query Engine",
    tagline: "Natural language to MongoDB query translation",

    description:
      "A schema-aware AI query engine that converts natural-language requests into MongoDB aggregation pipelines with runtime schema discovery and query validation.",

    problem:
      "Business users need database insights without learning MongoDB query syntax or aggregation pipelines.",

    solution:
      "Built a schema-aware planning pipeline that discovers database structure at runtime, generates validated MongoDB queries, and formats results into human-readable responses.",

    tech: [
      "Python",
      "FastAPI",
      "MongoDB",
      "LangChain",
      "LLMs",
    ],

    metrics: [
      "Runtime schema discovery",
      "Natural-language querying",
      "Query validation before execution",
    ],

    category: "Developer Tools",
  },

  {
    id: "playlistai",
    title: "PlaylistAI",
    tagline: "Convert natural language into Spotify playlists",

    description:
      "An AI-assisted playlist generation tool that interprets natural-language prompts, discovers relevant music, and automatically creates Spotify playlists using authenticated user accounts.",

    problem:
      "Music streaming platforms struggle to understand detailed natural-language descriptions of listening preferences and moods.",

    solution:
      "Combined natural-language understanding with Spotify APIs to translate user intent into curated playlists while managing authentication and playlist creation automatically.",

    tech: [
      "Python",
      "Flask",
      "Spotify API",
      "YouTube Data API",
      "Ollama",
      "OAuth 2.0",
    ],

    metrics: [
      "Cross-platform playlist generation",
      "Natural-language prompt understanding",
      "OAuth-secured user authentication",
    ],

    category: "Consumer AI",
  },

  {
    id: "ai-evaluation",
    title: "LLM Evaluation & Experimentation",
    tagline: "Structured evaluation of model quality and failure modes",
    description:
      "Research internship work creating repeatable workflows to examine LLM and machine-learning behavior, test edge cases, and record findings for engineering decisions.",
    problem:
      "Model demos can hide inconsistencies and failure cases that matter when AI features are used in real workflows.",
    solution:
      "Designed structured experiments and evaluation workflows, then documented observed behavior and failure modes to guide development.",
    tech: ["Python", "FastAPI", "LangGraph", "MongoDB", "Redis", "OpenAI"],
    metrics: ["Repeatable experiments", "Edge-case evaluation", "Failure-mode notes"],
    category: "AI Research",
  },

  {
    id: "enterprise-automation",
    title: "Enterprise Process Automation",
    tagline: "Internal business applications and connected workflows",
    description:
      "Current internship work building and improving enterprise applications with Microsoft Power Platform, supporting Gate Management, SRM, SCM, and related processes.",
    problem:
      "Business teams need clear, dependable internal tools that fit their real processes and are easy to support.",
    solution:
      "Create Power Apps and Power Automate workflows, test and debug application changes, document user processes, and coordinate requirements with stakeholders and vendors.",
    tech: ["Power Apps", "Power Automate", "Microsoft 365", "SharePoint", "SAP", "SQL"],
    metrics: ["Internal business apps", "Workflow automation", "User documentation"],
    category: "Enterprise Software",
  },
];

const ARCH_FLOW = [
  { label: "User", sublabel: "HTTP / WebSocket", icon: Globe, layer: "Entry" },
  { label: "FastAPI", sublabel: "Gateway + Auth", icon: Zap, layer: "Gateway", featured: true },
  { label: "Planner Agent", sublabel: "Query Router", icon: Cpu, layer: "Planning", featured: true },
  { label: "LangGraph", sublabel: "Agent Orchestration", icon: Layers, layer: "Orchestration", featured: true },
  { label: "Memory Service", sublabel: "Redis · MongoDB", icon: Database, layer: "Persistence" },
  { label: "LLM", sublabel: "Cloud/Local Models", icon: Cpu, layer: "Intelligence" },
];

const ARCH_STATS = [
{
label:"Business Workflows",
value:"5+"
},
{
label:"Async Workers",
value:"6+"
},
{
label:"Memory Lifecycle",
value:"8 stages"
}
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
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="section-label text-base sm:text-lg font-mono text-amber-200/90 mb-6 tracking-widest uppercase"
      style={{ fontFamily: "JetBrains Mono, monospace" }}
    >
      <span aria-hidden="true" className="section-label-gem sunny-gem-sprite" />
      {children}
      <span aria-hidden="true" className="section-label-spark">✦</span>
    </p>
  );
}

function InlineCharacter({ kind = "foxy" }: { kind?: "foxy" | "frog" | "opossum" }) {
  const [hello, setHello] = useState(0);
  const label = kind === "frog" ? "frog" : kind === "opossum" ? "opossum" : "fox";
  const lines = kind === "frog" ? ["Ribbit!", "This way!", "Nice day!"] : kind === "opossum" ? ["Hello!", "Keep going!", "Found one!"] : ["Hi!", "Over here!", "Let’s go!"];
  return (
    <span className={`inline-character-wrap inline-character-${kind}`}>
      <button type="button" aria-label={`Say hello to the ${label}`} data-tooltip={`${label[0].toUpperCase()}${label.slice(1)} sprite — click for a greeting.`} aria-pressed={hello > 0} onClick={() => setHello((value) => value + 1)} className={`inline-character-sprite ${hello ? "inline-character-reacted" : ""}`} />
      <span className={`inline-character-bubble ${hello ? "inline-character-bubble-open" : ""}`} aria-live="polite">{hello ? lines[(hello - 1) % lines.length] : "tap me"}</span>
    </span>
  );
}

function OpossumTextRun() {
  return (
    <div className="opossum-text-scene">
      <p className="opossum-text-copy">Curious mind. Always building.</p>
      <span aria-hidden="true" className="opossum-text-ground" />
      <span aria-hidden="true" className="opossum-text-runner" />
    </div>
  );
}

// ─── Network Canvas (Hero BG) ─────────────────────────────────────────────────

function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
    >
      <circle cx="29" cy="32" r="25" fill="#fbbf24" />
      <path d="M29 32 56 16v32L29 32Z" fill="var(--background, #101526)" />
      <rect x="35" y="17" width="5" height="5" fill="#090a10" />
      <rect x="57" y="28" width="4" height="4" fill="#fbbf24" />
    </svg>
  );
}

function SectionArtwork({ tone = "violet", placement = "right" }: { tone?: "violet" | "cyan" | "amber"; placement?: "left" | "right" | "low-left" | "low-right" }) {
  const [reaction, setReaction] = useState(0);
  const replies = ["Hi!", "Nice to see you!", "Keep exploring!", "Have a sunny day!", "Found a little gem!", "On to the next world!"];
  const greeting = replies[(tone === "cyan" ? 1 : tone === "amber" ? 4 : 0) + reaction % replies.length];
  const houseArt = tone === "violet"
    ? "/game/sunnyland/environment/Props/tree-house.png"
    : tone === "cyan"
      ? "/game/sunnyland/environment/Props/plant-house.png"
      : "/game/sunnyland/environment/Props/straw-house.png";
  const character = tone === "cyan" ? "frog" : tone === "amber" ? "opossum" : "foxy";
  return (
    <motion.div
      className={`section-artwork section-artwork-${tone} section-artwork-${placement}`}
      initial={{ opacity: 0, x: 26, scale: .82, rotate: 7 }}
      whileInView={{ opacity: .9, x: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: .35 }}
      transition={{ duration: .72, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="section-artwork-halo" />
      <span className="section-artwork-cloud" />
      <img className="section-artwork-tree" src="/game/sunnyland/environment/Props/tree.png" alt="" loading="lazy" />
      <img className="section-artwork-house" src={houseArt} alt="" loading="lazy" />
      <span className="section-artwork-ground" aria-hidden="true" />
      <span className="section-artwork-leaf leaf-one" />
      <span className="section-artwork-leaf leaf-two" />
      <button type="button" className={`section-character-trigger section-artwork-character section-character-${character} ${reaction ? `character-reaction-${reaction % 3}` : ""}`} aria-label={`Say hello to the ${character}`} data-tooltip={`${character[0].toUpperCase()}${character.slice(1)} sprite — click to hear a new greeting.`} onClick={() => setReaction((value) => value + 1)} />
      <span className="sunny-gem-sprite section-artwork-gem" />
      <BrandMark className="section-artwork-mark" />
      <span className="section-artwork-bubble" aria-live="polite">{reaction ? replies[(reaction - 1) % replies.length] : greeting}</span>
    </motion.div>
  );
}

function GreetingScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [greeting, setGreeting] = useState(0);
  const visible = useInView(sceneRef, { once: true, amount: .3 });
  const greetings = ["Hi there!", "Welcome in!", "Glad you made it!", "Let's explore!", "There's more ahead!", "Follow the sunny trail!"];
  return (
    <div ref={sceneRef} className={`greeting-scene ${visible ? "greeting-scene-visible" : ""}`} role="group" aria-label="Foxy and a frog meet and say hello">
      <span className="greeting-sun" aria-hidden="true" />
      <span className="greeting-ground" aria-hidden="true" />
      <span className="greeting-spark greeting-spark-one" aria-hidden="true">✦</span>
      <span className="greeting-spark greeting-spark-two" aria-hidden="true">✧</span>
      <button type="button" className="greeting-character greeting-foxy" aria-label="Foxy says hello" data-tooltip="Foxy — tap to change the welcome message." onClick={() => setGreeting((value) => value + 1)} />
      <button type="button" className="greeting-character greeting-frog" aria-label="Frog says hello" data-tooltip="Frog — tap to hear another greeting." onClick={() => setGreeting((value) => value + 1)} />
      <span className="greeting-speech" aria-live="polite"><span>{greetings[greeting % greetings.length]}</span><small>{greeting ? "Tap again to chat" : "Nice to meet you"}</small></span>
      <span className="greeting-caption">A little Sunny Land welcome</span>
    </div>
  );
}

function SpriteLane({ scene = "garden" }: { scene?: "garden" | "village" }) {
  const house = scene === "village" ? "tree-house.png" : "straw-house.png";
  const character = scene === "village" ? "frog" : "foxy";
  return (
    <div aria-hidden="true" className={`sprite-lane sprite-lane-${scene}`}>
      <span className="sprite-lane-cloud" />
      <img className="sprite-lane-tree" src="/game/sunnyland/environment/Props/tree.png" alt="" loading="lazy" />
      <span className={`sprite-lane-runner sprite-lane-${character}`} />
      <span className="sprite-lane-gem sprite-lane-gem-one" />
      <span className="sprite-lane-gem sprite-lane-gem-two" />
      <img className="sprite-lane-house" src={`/game/sunnyland/environment/Props/${house}`} alt="" loading="lazy" />
      <span className="sprite-lane-ground" />
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function SiteTooltipLayer() {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number; below: boolean; described: boolean } | null>(null);
  useEffect(() => {
    const selector = 'a[href],button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled),[role="button"],[data-tooltip]';
    const previousDescriptions = new WeakMap<HTMLElement, string | null>();
    let activeTarget: HTMLElement | null = null;

    const restoreDescription = (target: HTMLElement) => {
      if (!previousDescriptions.has(target)) return;
      const previous = previousDescriptions.get(target);
      if (previous) target.setAttribute("aria-describedby", previous);
      else target.removeAttribute("aria-describedby");
      previousDescriptions.delete(target);
    };

    const hide = () => {
      if (activeTarget) restoreDescription(activeTarget);
      activeTarget = null;
      setTooltip(null);
    };

    const show = (target: HTMLElement, described: boolean) => {
      const label = target.dataset.tooltip || target.getAttribute("aria-label") || target.getAttribute("title") ||
        (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement
          ? target.labels?.[0]?.textContent
          : target.innerText);
      const text = label?.replace(/\s+/g, " ").trim().slice(0, 110);
      if (!text) return hide();

      if (activeTarget && activeTarget !== target) restoreDescription(activeTarget);
      activeTarget = target;
      const rect = target.getBoundingClientRect();
      const below = rect.top < 58;
      const id = "site-accessible-tooltip";
      if (described) {
        if (!previousDescriptions.has(target)) previousDescriptions.set(target, target.getAttribute("aria-describedby"));
        const previous = previousDescriptions.get(target)?.split(/\s+/).filter(Boolean) ?? [];
        if (!previous.includes(id)) target.setAttribute("aria-describedby", [...previous, id].join(" "));
      } else {
        restoreDescription(target);
      }
      setTooltip({ text, x: Math.min(window.innerWidth - 150, Math.max(150, rect.left + rect.width / 2)), y: below ? rect.bottom + 8 : rect.top - 8, below, described });
    };

    const findTarget = (target: EventTarget | null) => target instanceof Element ? target.closest<HTMLElement>(selector) : null;
    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const target = findTarget(event.target);
      if (target) show(target, document.activeElement === target && target.hasAttribute("data-tooltip"));
    };
    const onPointerOut = (event: PointerEvent) => {
      const target = findTarget(event.target);
      const next = findTarget(event.relatedTarget);
      if (target && target === activeTarget && next !== target && document.activeElement !== target) hide();
    };
    const onFocusIn = (event: FocusEvent) => {
      const target = findTarget(event.target);
      if (target) show(target, target.hasAttribute("data-tooltip"));
    };
    const onFocusOut = (event: FocusEvent) => {
      const target = findTarget(event.target);
      const next = findTarget(event.relatedTarget);
      if (target && target === activeTarget && next !== target) hide();
    };

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("resize", hide);
      if (activeTarget) restoreDescription(activeTarget);
    };
  }, []);

  if (!tooltip) return null;
  return <div id="site-accessible-tooltip" role="tooltip" aria-hidden={!tooltip.described} className={`site-tooltip ${tooltip.below ? "site-tooltip-below" : ""}`} style={{ left: tooltip.x, top: tooltip.y }}>{tooltip.text}</div>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"forward" | "reverse">("forward");
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(1, Math.max(0, y / maxScroll)));
      if (y !== lastY.current) setScrollDirection(y < lastY.current ? "reverse" : "forward");
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
      className={`site-header fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "border-b border-white/[0.05] backdrop-blur-xl bg-background/75"
          : ""
      }`}
    >
      <nav aria-label="Primary navigation" className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <a
          href="#"
          data-tooltip="Gaurav Bhati — return to the top of the page."
          className="text-base sm:text-lg font-semibold tracking-tight text-foreground/90 hover:text-foreground transition-colors"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          <span className="flex items-center gap-2"><BrandMark className="size-8 text-foreground" /><span>Gaurav Bhati</span></span>
        </a>

        <ul className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-base lg:text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden lg:inline-flex min-h-11 items-center gap-1.5 text-base lg:text-lg px-5 py-2 rounded-full border border-white/10 text-foreground/80 hover:border-white/20 hover:text-foreground transition-all"
        >
          Get in touch
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden inline-flex min-h-11 min-w-11 items-center justify-center p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          data-tooltip={open ? "Close the site navigation." : "Open the site navigation."}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <div aria-hidden="true" data-scroll-direction={scrollDirection} className="nav-world-rail" style={{ "--scroll-progress": scrollProgress } as React.CSSProperties}>
        <span className="nav-world-island nav-world-island-left"><span className="nav-world-bush" /><span className="nav-world-flower" /></span>
        <span className="nav-world-cloud" />
        <span className="nav-world-island nav-world-island-right"><span className="nav-world-tree" /></span>
        <span className="nav-world-runner" />
        <span className="nav-world-gem" />
        <span className="nav-world-island nav-world-island-mid"><span className="nav-world-mid-grass" /></span>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!open}
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-80 border-b border-white/[0.05]" : "max-h-0"
        } bg-background/95 backdrop-blur-xl`}
      >
        <ul className="px-6 py-5 flex flex-col gap-3">
          {NAV_ITEMS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="inline-flex min-h-11 items-center text-base sm:text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
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
      <div aria-hidden="true" className="hero-art absolute inset-0 pointer-events-none" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pt-28 pb-20 xl:grid-cols-[minmax(0,1.55fr)_minmax(21rem,.75fr)]">
        <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-10 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03]"
        >
          <span className="size-2 rounded-full bg-teal-300 animate-pulse shadow-[0_0_12px_rgba(103,232,249,.8)]" />
          <span
            className="text-sm text-muted-foreground"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="hero-name text-5xl sm:text-7xl xl:text-[76px] 2xl:text-[80px] font-bold tracking-tight leading-[1.08] mb-7 pb-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-orange-200 to-cyan-200"
          style={{ fontFamily: "Onest, sans-serif" }}
        >
          Gaurav Singh Bhati
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
          I design AI-powered products and reliable backend systems, from
          LangGraph workflows and retrieval pipelines to production APIs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          <a
            href="/resume.pdf"
            download
            className="resume-world-link inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-all"
          >
            <span className="resume-world-icon"><FileText size={18} /><span className="resume-world-gem" /></span>
            <span className="grid text-left"><span>Resume</span><small>CAREER QUEST</small></span>
          </a>
          <a
            href="https://github.com/gauravbhati2099"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-sm font-medium rounded-full hover:border-white/20 hover:bg-white/[0.03] transition-all"
          >
            <Github size={18} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/gauravbhati2099"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-sm font-medium rounded-full hover:border-white/20 hover:bg-white/[0.03] transition-all"
          >
            <Linkedin size={18} />
            LinkedIn
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-sm font-medium rounded-full hover:border-white/20 hover:bg-white/[0.03] transition-all"
          >
            View Projects
            <ChevronRight size={18} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-12 flex items-center gap-3"
        >
          <div className="w-px h-10 bg-white/[0.08]" />
          <span
            className="text-sm text-white/45"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            scroll
          </span>
        </motion.div>
        </div>
        <div className="hero-scene hidden xl:block">
          <GreetingScene />
        </div>
      </div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="relative py-28 border-t border-white/[0.05]">
      <SectionArtwork tone="violet" placement="low-left" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_300px] gap-16 lg:gap-24">
          <FadeIn>
            <SectionLabel>About</SectionLabel>
            <h2
              className="section-heading text-4xl sm:text-[42px] lg:text-5xl font-bold tracking-tight mb-8"
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
                architectural sense." <InlineCharacter kind="foxy" />
              </p>
              <p>
                At Tempsens Instruments, I work on enterprise applications and process automation. Before that, at ONEPWS, I built AI backend workflows for long-term memory and natural-language database querying with FastAPI, LangGraph, MongoDB, and Redis. <InlineCharacter kind="frog" />
              </p>
              <p>
                Outside of work I explore RAG pipelines, long-context agent memory
                architectures, and the emerging patterns of agentic AI infrastructure.
              </p>
              <OpossumTextRun />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <SectionLabel>Tech Stack</SectionLabel>
            <div className="space-y-5">
              {SKILL_GROUPS.map((group) => (
                <div key={group.label}>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-[.14em] text-muted-foreground/75">{group.label}</h3>
                  <ul className="flex flex-wrap gap-2" aria-label={group.label}>
                    {group.items.map((tech) => (
                      <li
                        key={tech}
                        className="px-3 py-1.5 text-xs border border-white/[0.08] rounded-lg bg-white/[0.025] text-muted-foreground transition-colors hover:border-white/[0.18] hover:text-foreground"
                        style={{ fontFamily: "JetBrains Mono, monospace" }}
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/[0.05] space-y-3">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-cyan-300" />
                <span className="text-sm text-muted-foreground">India</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="size-2 rounded-full bg-teal-300" />
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
  const [active, setActive] = useState(EXPERIENCE[0].id);
  const current = EXPERIENCE.find((e) => e.id === active)!;

  return (
    <section id="experience" className="relative py-28 border-t border-white/[0.05]">
      <SectionArtwork tone="cyan" placement="right" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>Experience</SectionLabel>
          <h2
            className="section-heading text-4xl sm:text-[42px] lg:text-5xl font-bold tracking-tight mb-8"
            style={{ fontFamily: "Onest, sans-serif" }}
          >
            Where I've built.
          </h2>
        </FadeIn>

        <SpriteLane scene="village" />

        <div className="grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-10">
          <FadeIn delay={0.08}>
            <div className="flex lg:flex-col gap-1">
              {EXPERIENCE.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => setActive(exp.id)}
                  aria-pressed={active === exp.id}
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
                    className="text-xs text-emerald-300"
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
    <section id="projects" className="relative py-28 border-t border-white/[0.05]">
      <SectionArtwork tone="amber" placement="low-right" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>Projects</SectionLabel>
          <h2
            className="section-heading text-4xl sm:text-[42px] lg:text-5xl font-bold tracking-tight mb-8"
            style={{ fontFamily: "Onest, sans-serif" }}
          >
            What I've shipped.
          </h2>
        </FadeIn>

        <SpriteLane scene="garden" />

        <div className="space-y-2.5">
          {PROJECTS.map((project, i) => {
            const isOpen = expanded === project.id;
            return (
              <FadeIn key={project.id} delay={i * 0.04}>
                <div className="border border-white/[0.07] rounded-xl overflow-hidden bg-white/[0.01] hover:bg-white/[0.02] transition-colors">
                  <button
                    onClick={() => setExpanded(isOpen ? null : project.id)}
                    data-tooltip={`${isOpen ? "Collapse" : "Expand"} ${project.title} details.`}
                    className="w-full text-left p-5 sm:p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-300"
                    aria-expanded={isOpen}
                    aria-controls={`${project.id}-details`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <motion.span
                            className="project-diamond project-diamond-collect"
                            aria-hidden="true"
                            initial={{ opacity: 0, y: -18, scale: 0.45, rotate: -35 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                            viewport={{ once: true, amount: 0.8 }}
                            transition={{ type: "spring", stiffness: 240, damping: 14, delay: Math.min(i * 0.035, 0.24) }}
                          />
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
                    id={`${project.id}-details`}
                    aria-hidden={!isOpen}
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
                              className="text-sm text-emerald-300"
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
                        <Github size={17} />
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
      <Icon size={18} className={featured ? "mb-2 text-cyan-300" : "mb-2 text-violet-200/75"} />
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
    <section id="architecture" className="relative py-28 border-t border-white/[0.05]">
      <SectionArtwork tone="violet" placement="low-left" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <FadeIn>
          <SectionLabel>Architecture</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-7">
            <h2
              className="section-heading text-4xl sm:text-[42px] lg:text-5xl font-bold tracking-tight"
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

        <SpriteLane scene="village" />

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

type FormStatus = "idle" | "ready";

function MiniDinoGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => {
    try { return Number(localStorage.getItem("gaurav-dino-best") || 0); }
    catch { return 0; }
  });
  const [coins, setCoins] = useState(0);
  const [liveScore, setLiveScore] = useState(0);
  const [worldIndex, setWorldIndex] = useState(0);
  const [characterId, setCharacterId] = useState(() => {
    try {
      const saved = localStorage.getItem("gaurav-runner-character");
      return SUNNY_CHARACTERS.some((character) => character.id === saved) ? saved! : "foxy";
    } catch { return "foxy"; }
  });
  const characterRef = useRef(characterId);
  useEffect(() => { characterRef.current = characterId; }, [characterId]);
  const selectCharacter = (id: string) => {
    setCharacterId(id);
    characterRef.current = id;
    try { localStorage.setItem("gaurav-runner-character", id); } catch { /* Character choice is optional to save. */ }
  };
  const [bestCoins, setBestCoins] = useState(() => {
    try { return Number(localStorage.getItem("gaurav-dino-best-coins") || 0); }
    catch { return 0; }
  });
  useEffect(() => { try { localStorage.removeItem("gaurav-runner-coins"); } catch { /* Legacy total coin count is no longer used. */ } }, []);
  const [muted, setMuted] = useState(true);
  const mutedRef = useRef(muted);
  const [runId, setRunId] = useState(0);
  const state = useRef({ active: false, over: false, initialized: false, y: 0, vy: 0, x: 0, speed: 190, score: 0, coins: 0, world: 0, last: 0, next: 0, phase: 0, pattern: 0, cloud: 0, invuln: 0, obstacles: [] as Array<{ x: number; kind: number; width: number; height: number }>, pickups: [] as Array<{ x: number; y: number; taken: boolean }>, clouds: [] as Array<{ x: number; y: number }>, trees: [] as Array<{ x: number; size: number; kind: number }>, houses: [] as Array<{ x: number; size: number; kind: number }>, plants: [] as Array<{ x: number; size: number; kind: number }> });
  const sound = useRef<AudioContext | null>(null);
  const music = useRef<HTMLAudioElement | null>(null);

  useEffect(() => { mutedRef.current = muted; }, [muted]);
  useEffect(() => () => { void sound.current?.close(); sound.current = null; }, []);
  useEffect(() => {
    const track = new Audio("/game/audio/platformer_level03_loop.ogg");
    track.loop = true;
    track.volume = .24;
    track.preload = "none";
    music.current = track;
    return () => { track.pause(); track.src = ""; music.current = null; };
  }, []);

  const enableSound = async () => {
    try {
      const AudioContextClass = window.AudioContext;
      if (!AudioContextClass) return;
      const audio = sound.current ?? new AudioContextClass();
      sound.current = audio;
      if (audio.state === "suspended") await audio.resume();
      await music.current?.play().catch(() => undefined);
      setMuted(false);
      mutedRef.current = false;
    } catch { setMuted(true); mutedRef.current = true; }
  };

  const playTone = (frequency: number, duration: number, type: OscillatorType = "square") => {
    if (mutedRef.current) return;
    try {
      const AudioContextClass = window.AudioContext;
      if (!AudioContextClass) return;
      const audio = sound.current ?? new AudioContextClass();
      sound.current = audio;
      if (audio.state !== "running") return;
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.045, audio.currentTime + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(audio.destination);
      oscillator.start();
      oscillator.stop(audio.currentTime + duration + 0.02);
    } catch { /* Audio is optional; the game remains playable without it. */ }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !playing || paused) return;
    const game = state.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr; canvas.height = height * dpr; ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;
    const ground = Math.round(height * 0.78);
    const heroScale = 1.5;
    const heroWidth = 54, heroHeight = 48;
    const loadImage = (path: string) => { const image = new Image(); image.src = path; return image; };
    const assets = {
      run: loadImage("/game/sunnyland/Characters/Foxy/run/spritesheet.png"),
      jump: loadImage("/game/sunnyland/Characters/Foxy/jump/spritesheet.png"),
      frogRun: loadImage("/game/sunnyland/Characters/frog/Spritesheets/frog-idle.png"),
      frogJump: loadImage("/game/sunnyland/Characters/frog/Spritesheets/frog-jump.png"),
      opossumRun: loadImage("/game/sunnyland/Characters/Opossum/spritesheet.png"),
      sky: loadImage("/game/sunnyland/environment/Background/back.png"),
      clouds: loadImage("/game/sunnyland/environment/Background/clouds-transparent.png"),
      tiles: loadImage("/game/sunnyland/environment/tileset.png"),
      tree: loadImage("/game/sunnyland/environment/Props/tree.png"),
      pine: loadImage("/game/sunnyland/environment/Props/pine.png"),
      gems: loadImage("/game/sunnyland/Misc/Sunnyland items/Spritesheets/gem.png"),
      mushroom: loadImage("/game/sunnyland/environment/Props/shrooms.png"),
      rock: loadImage("/game/sunnyland/environment/Props/rock.png"),
      crate: loadImage("/game/sunnyland/environment/Props/crate.png"),
      strawHouse: loadImage("/game/sunnyland/environment/Props/straw-house.png"),
      woodenHouse: loadImage("/game/sunnyland/environment/Props/wooden-house.png"),
      plantHouse: loadImage("/game/sunnyland/environment/Props/plant-house.png"),
      treeHouse: loadImage("/game/sunnyland/environment/Props/tree-house.png"),
      palm: loadImage("/game/sunnyland/environment/Props/palm.png"),
      bush: loadImage("/game/sunnyland/environment/Props/bush.png"),
    };
    if (!game.initialized) {
      game.y = ground - heroHeight; game.x = width + 50; game.vy = 0; game.speed = 190; game.score = 0; game.coins = 0; game.world = 0; game.over = false; game.last = 0; game.next = 2.5; game.phase = 0; game.invuln = 0;
      game.obstacles = []; game.pickups = []; game.trees = [{ x: width * .13, size: .9, kind: 0 }, { x: width * .37, size: 1.05, kind: 1 }, { x: width * .65, size: 1, kind: 0 }, { x: width * .91, size: .92, kind: 1 }, { x: width * 1.2, size: .85, kind: 0 }];
      game.houses = [{ x: width * .25, size: 1.15, kind: 0 }, { x: width * .7, size: 1.2, kind: 1 }, { x: width * 1.1, size: 1.05, kind: 2 }];
      game.plants = [{ x: width * .08, size: 1, kind: 0 }, { x: width * .53, size: .9, kind: 1 }, { x: width * .84, size: 1.1, kind: 0 }, { x: width * 1.15, size: .8, kind: 1 }];
      game.initialized = true; setCoins(0); setLiveScore(0); setWorldIndex(0);
    }
    const obstacles = game.obstacles, pickups = game.pickups;
    game.active = true; game.last = 0;
    let frame = 0;
    const drawHero = (x: number, y: number, time: number, airborne: boolean) => {
      const character = SUNNY_CHARACTERS.find((item) => item.id === characterRef.current) ?? SUNNY_CHARACTERS[0];
      const isFrog = character.id === "frog";
      const sheet = isFrog ? (airborne ? assets.frogJump : assets.frogRun) : character.id === "opossum" ? assets.opossumRun : airborne ? assets.jump : assets.run;
      if (!sheet.complete || !sheet.naturalWidth) return;
      const frames = airborne ? character.jumpFrames : character.runFrames;
      const index = airborne && character.id === "foxy" ? (game.vy < 0 ? 0 : 1) : Math.floor(time / (isFrog ? 190 : 110)) % frames;
      const drawWidth = character.frameWidth * heroScale;
      const drawHeight = character.frameHeight * heroScale;
      const visibleBottomRows = isFrog
        ? (airborne ? [27, 32, 32][index] ?? 32 : 27)
        : character.id === "opossum"
          ? [27, 28, 28, 28, 28, 28][index] ?? 28
          : airborne
            ? [30, 29][index] ?? 29
            : [32, 31, 32, 32, 31, 32][index] ?? 32;
      const drawY = y + heroHeight - drawHeight + (character.frameHeight - visibleBottomRows) * heroScale;
      ctx.save();
      // Foxy already faces right; the Frog and Opossum sheets face left and need mirroring.
      if (character.id === "frog" || character.id === "opossum") {
        ctx.save();
        ctx.translate(x + heroWidth / 2, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(sheet, index * character.frameWidth, 0, character.frameWidth, character.frameHeight, -drawWidth / 2, drawY, drawWidth, drawHeight);
        ctx.restore();
      } else {
        ctx.drawImage(sheet, index * character.frameWidth, 0, character.frameWidth, character.frameHeight, x + (heroWidth - drawWidth) / 2, drawY, drawWidth, drawHeight);
      }
      ctx.restore();
    };
    const drawCoin = (x: number, y: number) => {
      const bob = Math.sin((timeRef.current + x) / 120) * 3;
      if (assets.gems.complete && assets.gems.naturalWidth) {
        const index = Math.floor(timeRef.current / 120) % 5;
        ctx.drawImage(assets.gems, index * 15, 0, 15, 13, x, y + bob, 27, 24);
      }
    };
    const spawnPattern = () => {
      const kind = Math.floor(Math.random() * 4);
      game.pattern = kind;
      const gap = 230 + Math.random() * 150;
      if (kind === 0) obstacles.push({ x: width + 10, kind: 0, width: 25, height: 36 });
      if (kind === 1) obstacles.push({ x: width + 10, kind: 1, width: 42, height: 29 });
      if (kind === 2) { obstacles.push({ x: width + 10, kind: 0, width: 25, height: 36 }); obstacles.push({ x: width + 104, kind: 1, width: 38, height: 27 }); }
      if (kind === 3) obstacles.push({ x: width + 10, kind: 2, width: 29, height: 30 });
      if (Math.random() < .9) for (let i = 0; i < 4; i++) pickups.push({ x: width + 78 + i * 31, y: ground - (i % 2 ? 67 : 49), taken: false });
      game.next = gap / game.speed + 0.45;
    };
    const timeRef = { current: 0 };
    const render = (time: number) => {
      if (!game.active) return;
      timeRef.current = time;
      const dt = game.last ? Math.min((time - game.last) / 1000, 0.04) : 0;
      game.last = time; game.score += dt * 50; game.speed = Math.min(360, 190 + game.score * .11); game.next -= dt; game.invuln = Math.max(0, game.invuln - dt);
      if (Math.floor(game.score) !== Math.floor(game.score - dt * 50)) setLiveScore(Math.floor(game.score));
      const autoWorld = getWorldIndex(game.score);
      if (autoWorld !== game.world) { game.world = autoWorld; setWorldIndex(autoWorld); }
      if (game.next <= 0) spawnPattern();
      const world = game.world;
      ctx.fillStyle = SUNNY_WORLDS[world].sky; ctx.fillRect(0, 0, width, ground);
      if (assets.sky.complete && assets.sky.naturalWidth) {
        ctx.save();
        if (world === 1) ctx.filter = "hue-rotate(67deg) saturate(.62) brightness(.76)";
        if (world === 2) ctx.filter = "sepia(.58) saturate(1.35) hue-rotate(340deg)";
        ctx.drawImage(assets.sky, 0, 0, assets.sky.naturalWidth, assets.sky.naturalHeight, 0, 0, width, ground + 28);
        ctx.restore();
      }
      if (assets.clouds.complete && assets.clouds.naturalWidth) {
        const cloudWidth = width * 1.08;
        const cloudHeight = ground * .32;
        const cloudOffset = (game.score * .06) % cloudWidth;
        ctx.save();
        ctx.globalAlpha = world === 1 ? .42 : .62;
        for (let x = -cloudOffset; x < width + cloudWidth; x += cloudWidth) {
          ctx.drawImage(assets.clouds, x, 0, cloudWidth, cloudHeight);
          ctx.drawImage(assets.clouds, x + cloudWidth * .5, 5, cloudWidth, cloudHeight * .82);
        }
        ctx.restore();
      }
      ctx.fillStyle = SUNNY_WORLDS[world].tint; ctx.fillRect(0, 0, width, ground);
      const houseSets = [
        [assets.strawHouse, assets.woodenHouse, assets.strawHouse],
        [assets.treeHouse, assets.plantHouse, assets.treeHouse],
        [assets.woodenHouse, assets.plantHouse, assets.strawHouse],
      ];
      game.houses.forEach((house) => {
        const image = houseSets[world][house.kind % houseSets[world].length];
        house.x -= game.speed * dt * .12;
        const destHeight = 104 * house.size;
        const destWidth = image.naturalWidth ? destHeight * image.naturalWidth / image.naturalHeight : destHeight;
        if (house.x < -destWidth) house.x = width + 90 + Math.random() * 170;
        if (image.complete && image.naturalWidth) {
          ctx.save(); ctx.globalAlpha = .98; ctx.shadowColor = "rgba(19,34,31,.32)"; ctx.shadowBlur = 9;
          ctx.drawImage(image, house.x, ground - destHeight + 4, destWidth, destHeight); ctx.restore();
        }
      });
      game.trees.forEach((tree) => {
        const scale = tree.size;
        const image = world === 2 ? (tree.kind ? assets.palm : assets.bush) : (tree.kind ? assets.pine : assets.tree);
        tree.x -= game.speed * dt * .2;
        const treeWidth = image === assets.palm ? 79 * scale : image === assets.bush ? 46 * scale : image === assets.pine ? 82 * scale : 119 * scale;
        const treeHeight = image === assets.palm ? 176 * scale : image === assets.bush ? 28 * scale : image === assets.pine ? 130 * scale : 111 * scale;
        if (tree.x < -treeWidth) tree.x = width + 36 + Math.random() * 150;
        if (image.complete && image.naturalWidth) ctx.drawImage(image, tree.x, ground - treeHeight + 8, treeWidth, treeHeight);
      });
      game.plants.forEach((plant) => {
        const image = assets.bush;
        const plantWidth = (46 + plant.kind * 8) * plant.size;
        const plantHeight = (28 + plant.kind * 5) * plant.size;
        plant.x -= game.speed * dt * .32;
        if (plant.x < -plantWidth) plant.x = width + 24 + Math.random() * 110;
        if (image.complete && image.naturalWidth) ctx.drawImage(image, plant.x, ground - plantHeight + 2, plantWidth, plantHeight);
      });
      ctx.fillStyle = "#754a3a"; ctx.fillRect(0, ground, width, height - ground);
      if (assets.tiles.complete && assets.tiles.naturalWidth) {
        const tileSize = 32, tileOffset = (game.score * 1.1) % tileSize;
        const soilTile = SUNNY_WORLDS[world].soil;
        const grassTile = SUNNY_WORLDS[world].grass;
        for (let x = -tileSize - tileOffset; x < width + tileSize; x += tileSize) {
          ctx.drawImage(assets.tiles, soilTile[0], soilTile[1], 16, 16, x, ground + 8, tileSize, tileSize);
          ctx.drawImage(assets.tiles, grassTile[0], grassTile[1], 16, 16, x, ground - 8, tileSize, tileSize);
        }
      } else {
        ctx.fillStyle = "#7fc84d"; ctx.fillRect(0, ground, width, 8);
      }
      game.vy += 1080 * dt; game.y = Math.min(ground - heroHeight, game.y + game.vy * dt);
      obstacles.forEach((obstacle) => { obstacle.x -= game.speed * dt;
        const image = obstacle.kind === 0 ? assets.mushroom : obstacle.kind === 1 ? assets.rock : assets.crate;
        if (image.complete && image.naturalWidth) ctx.drawImage(image, obstacle.x, ground - obstacle.height + 7, obstacle.width, obstacle.height);
      });
      const heroX = 38;
      const heroHit = { left: heroX + 10, right: heroX + heroWidth - 8, top: game.y + 7, bottom: game.y + heroHeight - 2 };
      pickups.forEach((coin) => {
        coin.x -= game.speed * dt;
        if (coin.taken || coin.x < -30) { coin.taken = true; return; }
        drawCoin(coin.x, coin.y);
        const gemHit = { left: coin.x + 6, right: coin.x + 22, top: coin.y - 1, bottom: coin.y + 23 };
        if (heroHit.right > gemHit.left && heroHit.left < gemHit.right && heroHit.bottom > gemHit.top && heroHit.top < gemHit.bottom) {
          coin.taken = true; game.coins += 1; setCoins(game.coins); playTone(880, .07);
        }
      });
      if (game.invuln <= 0 && obstacles.some((obstacle) => heroX + heroWidth - 4 > obstacle.x + 3 && heroX + 3 < obstacle.x + obstacle.width - 3 && game.y + heroHeight - 3 > ground - obstacle.height + 3)) {
        game.active = false; game.over = true; setScore(Math.floor(game.score)); setPlaying(false); setPaused(false); playTone(160, .22, "sawtooth");
        const nextBest = Math.max(best, Math.floor(game.score)); setBest(nextBest);
        try { localStorage.setItem("gaurav-dino-best", String(nextBest)); } catch { /* Storage is optional. */ }
        const nextBestCoins = Math.max(bestCoins, game.coins); setBestCoins(nextBestCoins);
        try { localStorage.setItem("gaurav-dino-best-coins", String(nextBestCoins)); } catch { /* Record storage is optional. */ }
        return;
      }
      ctx.fillStyle = "rgba(50,39,34,.3)";
      ctx.fillStyle = "rgba(34,50,64,.26)";
      ctx.beginPath(); ctx.ellipse(heroX + heroWidth * .5, ground - 2, heroWidth * .32, 3, 0, 0, Math.PI * 2); ctx.fill();
      if (game.invuln <= 0 || Math.floor(time / 100) % 2 === 0) drawHero(heroX, game.y, time, game.y < ground - heroHeight - 1);
      ctx.fillStyle = "#fff4c7"; ctx.font = "bold 12px monospace"; ctx.fillText(`SCORE ${String(Math.floor(game.score)).padStart(5, "0")}`, width - 123, 21);
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => { game.active = false; game.initialized = true; cancelAnimationFrame(frame); };
  }, [playing, paused, runId]);

  const jump = () => {
    const game = state.current;
    const canvas = canvasRef.current;
    const height = canvas?.clientHeight ?? 288;
    const ground = Math.round(height * .78);
    if (playing && !paused && game.y >= ground - 48 - 2) {
      game.vy = -430;
      playTone(560, .11);
    }
  };
  const toggleSound = () => {
    if (mutedRef.current) void enableSound();
    else { music.current?.pause(); setMuted(true); mutedRef.current = true; }
  };
  const worldScore = playing ? liveScore : score;
  const currentWorld = SUNNY_WORLDS[worldIndex];
  const nextWorld = SUNNY_WORLDS[worldIndex + 1];
  const pointsToNextWorld = currentWorld.end === null ? null : Math.max(0, currentWorld.end - worldScore);

  return (
    <section id="mini-game" className="relative py-24 border-t border-white/[0.05] game-section">
      <SectionArtwork tone="amber" placement="left" />
      <div className="relative z-10 max-w-6xl mx-auto px-6"><FadeIn>
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-end mb-8">
          <div>
            <SectionLabel>Bonus level</SectionLabel>
            <h2 className="section-heading text-4xl sm:text-[42px] lg:text-5xl font-bold tracking-tight" style={{ fontFamily: "Onest, sans-serif" }}>Run, jump, collect.</h2>
            <div className="world-progression mt-5" role="group" aria-label={`Three-world route. Currently in world ${worldIndex + 1}, ${currentWorld.name}.`}>
              {SUNNY_WORLDS.map((world, index) => {
                const stageState = index < worldIndex ? "complete" : index === worldIndex ? "active" : "upcoming";
                return (
                  <div key={world.name} className="world-stage" data-state={stageState} aria-current={stageState === "active" ? "step" : undefined}>
                    <span className="world-stage-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="world-stage-copy"><strong>{world.name}</strong><small>{world.range} points</small></span>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="world-current-copy text-sm text-muted-foreground leading-relaxed">
            <strong aria-live="polite">World {worldIndex + 1} of 3 · {currentWorld.name}</strong>
            <span>{currentWorld.detail}</span>
            <small>{nextWorld && pointsToNextWorld !== null ? `${pointsToNextWorld} points until ${nextWorld.name}` : "Final world · run until your life ends"}</small>
          </p>
        </div>
        <div className="character-picker mb-5 rounded-2xl border border-white/[0.11] p-4 sm:p-5" role="group" aria-label="Choose your runner">
          <div className="mb-3 flex items-center justify-between gap-3"><div><span className="character-picker-kicker">PICK YOUR PAL</span><p className="mt-1 text-sm text-white/70">Choose who joins your run.</p></div><span className="character-picker-note">SAVED ON THIS DEVICE</span></div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">{SUNNY_CHARACTERS.map((character) => <button key={character.id} type="button" aria-pressed={characterId === character.id} data-tooltip={`${character.name} — ${character.detail}. Select as your runner.`} onClick={() => selectCharacter(character.id)} className={`character-choice character-choice-${character.id} ${characterId === character.id ? "character-choice-active" : ""}`}><span className={`character-choice-sprite character-choice-${character.id}-sprite`} aria-hidden="true" /><span className="text-sm font-bold text-white">{character.name}</span><span className="hidden text-xs text-white/55 sm:block">{character.detail}</span></button>)}</div>
        </div>
        <div className="rounded-[1.5rem] border border-white/[0.12] game-frame p-4 sm:p-6">
          <div className="game-hud mb-3 flex items-center justify-between gap-3 rounded-xl px-4 py-3">
            <div className="flex items-center gap-3"><span className="game-live-dot" /><span className="text-sm font-bold tracking-wide text-white">WORLD {worldIndex + 1}-1</span><span className="hidden sm:inline text-xs text-white/70">{SUNNY_WORLDS[worldIndex].name.toUpperCase()}</span></div>
            <div className="flex items-center gap-4 text-xs font-bold tracking-wider text-white/90"><span>SCORE <b className="text-amber-200">{String(playing ? liveScore : score).padStart(5, "0")}</b></span><span className="inline-flex items-center gap-1.5"><Coins size={16} className="text-amber-300" />{String(coins).padStart(2, "0")}</span></div>
          </div>
          <div className="game-screen relative overflow-hidden rounded-xl border-4 border-[#243653]">
            <canvas ref={canvasRef} tabIndex={0} onPointerDown={() => { canvasRef.current?.focus(); if (playing) jump(); }} onKeyDown={(event) => { if (event.code === "Space" || event.code === "ArrowUp") { event.preventDefault(); jump(); } if (event.code === "KeyP" && !event.repeat) { event.preventDefault(); setPaused((value) => !value); } }} className="game-canvas block w-full h-64 sm:h-72 touch-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-200" aria-keyshortcuts="Space ArrowUp P" data-tooltip="Sunny Land game — Space or ↑ to jump, P to pause. Collect gems and dodge obstacles." aria-label="Sunny Land pixel platform runner. Focus this game and press Space or Arrow Up to jump, P to pause, or tap the canvas. Collect gems and avoid obstacles." />
            {!playing && <div className="game-start-overlay absolute inset-0 flex flex-col items-center justify-center gap-3"><span className="game-start-kicker">GAURAV'S BONUS LEVEL</span><p className="game-overlay-label">{state.current.over ? `RUN OVER · SCORE ${String(score).padStart(5, "0")}` : "READY, PLAYER ONE?"}</p><button onClick={() => { setScore(0); setCoins(0); setLiveScore(0); state.current.over = false; state.current.initialized = false; setPaused(false); setRunId((id) => id + 1); setPlaying(true); requestAnimationFrame(() => canvasRef.current?.focus()); }} className="inline-flex min-h-12 items-center gap-2 rounded-lg border-b-4 border-[#a34c17] bg-[#ffca3a] px-6 py-3 text-sm font-black uppercase tracking-wide text-[#382514] shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><Play size={18} />{state.current.over ? "Play again" : "Start game"}</button></div>}
            {playing && paused && <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60"><span className="game-overlay-label rounded-lg border border-white/25 bg-slate-950/80 px-5 py-3">PAUSED · PRESS P TO RESUME</span></div>}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85"><span>Best run <strong className="text-amber-200">{String(best).padStart(5, "0")}</strong></span><span className="inline-flex items-center gap-2"><Coins size={17} className="text-amber-300" />{bestCoins} coins in one run</span></div>
            <div className="flex flex-wrap gap-2"><button onClick={jump} disabled={!playing || paused} className="inline-flex min-h-11 items-center gap-2 rounded-lg border-b-4 border-[#a34c17] bg-[#ffca3a] px-5 text-sm font-black text-[#382514] disabled:opacity-45"><ChevronRight size={18} className="-rotate-90" />Jump</button>{playing && <button onClick={() => setPaused((value) => !value)} aria-pressed={paused} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 bg-slate-950/55 px-4 text-sm font-semibold text-white">{paused ? <Play size={16} /> : <Pause size={16} />}{paused ? "Resume" : "Pause"}</button>}<button onClick={toggleSound} aria-pressed={!muted} aria-label={muted ? "Enable platformer music and sound effects" : "Mute platformer music and sound effects"} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 bg-slate-950/55 px-4 text-sm font-semibold text-white">{muted ? <VolumeX size={17} /> : <Volume2 size={17} />}{muted ? "Audio off" : "Audio on"}</button><a href="#main-content" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-semibold text-white/90 hover:bg-white/10"><Home size={17} />Exit</a></div>
          </div>
          <p className="mt-3 text-sm text-white/65">Space or ↑ to jump · P to pause · tap the screen or Jump. Sound is off until enabled.</p>
        </div>
      </FadeIn></div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Portfolio message from ${form.name.trim()}`;
    const body = `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`;
    const mailto = `mailto:gauravbhati2099@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("ready");
    window.location.assign(mailto);
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <section id="contact" className="relative py-28 border-t border-white/[0.05]">
      <SectionArtwork tone="cyan" placement="low-right" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <FadeIn>
            <SectionLabel>Contact</SectionLabel>
            <h2
              className="section-heading text-4xl sm:text-[42px] lg:text-5xl font-bold tracking-tight mb-6"
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
                { icon: Mail, label: "gauravbhati2099@gmail.com", href: "mailto:gauravbhati2099@gmail.com" },
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
                  <Icon size={18} />
                  {label}
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            {status === "ready" ? (
              <div className="flex flex-col items-start justify-center h-full py-12" role="status" aria-live="polite">
                <div className="flex items-center gap-2 mb-4">
                  <span className="size-2 rounded-full bg-green-400" />
                  <span
                    className="text-sm text-green-400"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    Email draft ready
                  </span>
                </div>
                <p
                  className="text-muted-foreground text-sm"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Your email app should open with the message details. It has not been sent yet; press Send in your email app. If it did not open, email me at <a className="text-foreground underline underline-offset-4" href="mailto:gauravbhati2099@gmail.com">gauravbhati2099@gmail.com</a>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {(
                  [
                    { key: "name", label: "Name", type: "text", placeholder: "Your name", autoComplete: "name" },
                    { key: "email", label: "Email", type: "email", placeholder: "you@company.com", autoComplete: "email" },
                  ] as const
                ).map(({ key, label, type, placeholder, autoComplete }) => (
                  <div key={key}>
                    <label
                      htmlFor={`contact-${key}`}
                      className="text-xs text-muted-foreground mb-2 block tracking-widest uppercase"
                      style={{ fontFamily: "JetBrains Mono, monospace" }}
                    >
                      {label}
                    </label>
                    <input
                      id={`contact-${key}`}
                      name={key}
                      type={type}
                      autoComplete={autoComplete}
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
                    htmlFor="contact-message"
                    className="text-xs text-muted-foreground mb-2 block tracking-widest uppercase"
                    style={{ fontFamily: "JetBrains Mono, monospace" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
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
                  className="w-full py-3 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Open email app
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
  const [footerHello, setFooterHello] = useState(false);
  return (
    <footer className="site-footer relative overflow-hidden border-t border-white/[0.08]">
      <div className="footer-world-scene max-w-6xl mx-auto px-6">
        <div className="footer-message"><h2 className="footer-kicker">QUEST COMPLETE</h2><p>Thanks for exploring my little corner of the web.</p><a href="#main-content" className="footer-return-link">Back to the start <ChevronRight size={15} className="-rotate-90" /></a></div>
        <div className="footer-island footer-island-village">
          <span className="footer-island-grass" />
          <img className="footer-house" src="/game/sunnyland/environment/Props/straw-house.png" alt="" loading="lazy" />
          <img className="footer-tree" src="/game/sunnyland/environment/Props/tree.png" alt="" loading="lazy" />
          <span className="footer-friend-wrap"><span className={`footer-friend-bubble ${footerHello ? "footer-friend-bubble-open" : ""}`} aria-live="polite">{footerHello ? "See you soon!" : "Psst… hi!"}</span><button type="button" aria-label="Toggle Foxy’s greeting" data-tooltip="Foxy — tap to say hello or goodbye." aria-pressed={footerHello} className="footer-friend" onClick={() => setFooterHello((value) => !value)} /></span>
          <span className="footer-island-rock" />
        </div>
      </div>
      <div className="footer-ground-strip" aria-hidden="true" />
      <div className="footer-meta max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        <span
          className="text-xs text-muted-foreground/50"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          © 2026 Gaurav Singh Bhati
        </span>
        <div className="flex items-center gap-5" role="group" aria-label="Social links">
          {[
            { icon: Github, href: "https://github.com/gauravbhati2099", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/gauravbhati2099", label: "LinkedIn" },
            { icon: Mail, href: "mailto:gauravbhati2099@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={href}
              href={href}
              aria-label={label}
              data-tooltip={label === "Email" ? "Email Gaurav Bhati." : `Open Gaurav Bhati’s ${label} profile.`}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="footer-social-link"
            >
              <Icon size={20} aria-hidden="true" />
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
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Architecture />
        <MiniDinoGame />
        <Contact />
      </main>
      <Footer />
      <SiteTooltipLayer />
    </div>
  );
}
