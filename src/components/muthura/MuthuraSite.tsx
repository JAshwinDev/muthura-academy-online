import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight, Sparkles, Code2, Globe2, Brain, Smartphone, Monitor,
  GraduationCap, Award, Briefcase, Rocket, CheckCircle2, Star,
  Phone, MapPin, Mail, Menu, X, ChevronDown, ChevronLeft, ChevronRight,
  Play, Users, BookOpen, Trophy, TrendingUp, Quote, Pause,
} from "lucide-react";
import logoAsset from "@/assets/muthura-logo.asset.json";
import heroStudents from "@/assets/hero-students.jpg";

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#courses", label: "Courses" },
  { href: "#internships", label: "Internships" },
  { href: "#certificates", label: "Certificates" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [threshold]);
  return scrolled;
}

function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 ${
          scrolled
            ? "border-border/60 bg-white/80 shadow-soft backdrop-blur-xl"
            : "border-white/20 bg-white/10 backdrop-blur-md"
        }`}
      >
        <a href="#home" className="flex items-center gap-2.5">
          <img src={logoAsset.url} alt="Muthura Academy" className="h-9 w-9 rounded-full object-cover" />
          <span className={`hidden text-sm font-bold tracking-tight sm:block ${scrolled ? "text-brand-navy" : "text-white"}`}>
            Muthura Academy
          </span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  scrolled ? "text-brand-navy/80 hover:bg-brand-light hover:text-brand-navy" : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-brand transition-transform hover:scale-105 md:inline-flex"
          >
            Enroll Now
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className={`rounded-full p-2 md:hidden ${scrolled ? "text-brand-navy" : "text-white"}`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="absolute top-20 mx-4 w-[calc(100%-2rem)] max-w-6xl rounded-3xl border border-border bg-white p-4 shadow-soft md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-2.5 text-sm font-medium text-brand-navy hover:bg-brand-light"
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-gradient-brand px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Enroll Now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative isolate min-h-[100svh] overflow-hidden">
      <img
        src={heroStudents}
        alt="Students learning at Muthura Academy"
        width={1600}
        height={1200}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-navy/85 to-brand-primary/70" />
      <div className="absolute -top-40 -left-20 h-96 w-96 rounded-full bg-brand-cyan/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand-primary/40 blur-3xl" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-40 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
            Free AI Tools Training for every student
          </span>
          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Dream Big.<br />
            Learn Smart.<br />
            <span className="text-gradient-brand bg-gradient-to-r from-brand-cyan to-white bg-clip-text text-transparent">
              Achieve More.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            Offline & online training in Programming, Web, AI/ML, App Development and Computer Basics —
            with real-world projects, industry internships, certificates and placement preparation.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#courses"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-brand-navy shadow-brand transition-transform hover:scale-105"
            >
              Explore Courses
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <Play className="h-4 w-4" /> Talk to an Advisor
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-white/70">
            <div className="flex -space-x-2">
              {["A","B","C","D"].map((c,i) => (
                <div key={c} className="grid h-9 w-9 place-items-center rounded-full border-2 border-brand-navy bg-gradient-brand text-xs font-bold text-white" style={{zIndex: 4-i}}>{c}</div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-white">
                {Array.from({length:5}).map((_,i)=>(<Star key={i} className="h-3.5 w-3.5 fill-brand-cyan text-brand-cyan" />))}
                <span className="ml-1 font-semibold">4.9/5</span>
              </div>
              <div>Loved by 1000+ students</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative hidden lg:col-span-5 lg:block"
        >
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-20 blur-2xl" />
            <div className="relative flex h-full w-full items-center justify-center rounded-[2.5rem] border border-white/15 bg-white/5 p-8 backdrop-blur-xl shadow-brand">
              <img src={logoAsset.url} alt="Muthura Academy logo" className="h-full w-full rounded-3xl object-contain" />
            </div>
            <FloatingCard className="absolute -left-6 top-8" icon={<GraduationCap className="h-5 w-5" />} title="1000+" sub="Students" />
            <FloatingCard className="absolute -right-4 top-1/3" icon={<Trophy className="h-5 w-5" />} title="20+" sub="Courses" />
            <FloatingCard className="absolute bottom-6 left-4" icon={<Briefcase className="h-5 w-5" />} title="Live" sub="Internships" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCard({ className = "", icon, title, sub }: { className?: string; icon: React.ReactNode; title: string; sub: string }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={`flex items-center gap-3 rounded-2xl border border-white/20 bg-white/95 px-4 py-3 shadow-brand backdrop-blur ${className}`}
    >
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-white">{icon}</div>
      <div>
        <div className="text-sm font-bold text-brand-navy">{title}</div>
        <div className="text-xs text-muted-foreground">{sub}</div>
      </div>
    </motion.div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1500, bounce: 0 });
  const rounded = useTransform(spring, (v) => `${Math.round(v).toLocaleString()}${suffix}`);
  useEffect(() => { if (inView) mv.set(to); }, [inView, to, mv]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const STATS = [
  { icon: Users, value: 1000, suffix: "+", label: "Students Trained" },
  { icon: BookOpen, value: 20, suffix: "+", label: "Courses Offered" },
  { icon: Rocket, value: 100, suffix: "+", label: "Real-World Projects" },
  { icon: Award, value: 100, suffix: "%", label: "Certified Learners" },
];

function TrustStrip() {
  return (
    <section className="border-y border-border bg-brand-light/50 py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="text-center"
          >
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-white shadow-brand">
              <s.icon className="h-5 w-5" />
            </div>
            <div className="text-3xl font-extrabold text-brand-navy sm:text-4xl">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-sm font-medium text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const WHY = [
  { icon: Brain, title: "Gain Knowledge & Build Skills", desc: "Structured curriculum crafted by industry mentors — from fundamentals to advanced applied skills." },
  { icon: Rocket, title: "Work on Real Projects", desc: "Ship production-grade projects that solve real problems and become the highlight of your portfolio." },
  { icon: Award, title: "Get Certified, Be Industry Ready", desc: "Earn recognized certificates and learn how top companies actually build, hire and evaluate talent." },
  { icon: Trophy, title: "Achieve Your Dream Career", desc: "Placement preparation, mock interviews and internship pathways designed around your ambitions." },
];

function WhyChoose() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Why Muthura Academy" title={<>Everything you need to <span className="text-gradient-brand">launch a great career</span></>} subtitle="A future-ready academy blending offline mentorship with modern online delivery — so learning fits your life." />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-brand"
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity group-hover:opacity-30" />
              <div className="relative">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand-light text-brand-primary transition-colors group-hover:bg-gradient-brand group-hover:text-white">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-brand-navy">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{subtitle}</p>
    </div>
  );
}

const COURSES = [
  {
    icon: Code2, title: "Programming Languages",
    desc: "C, C++, Java and Python — from beginner syntax to advanced OOP, DSA and real coding practice.",
    tags: ["C", "C++", "Java", "Python"], level: "Beginner → Advanced", mode: "Offline & Online", duration: "8–16 weeks",
  },
  {
    icon: Globe2, title: "Web Development",
    desc: "Full-stack development with the MERN and MEAN stacks — build modern, production-ready web apps.",
    tags: ["MongoDB", "Express", "React", "Node", "Angular"], level: "Beginner → Pro", mode: "Offline & Online", duration: "12–20 weeks",
  },
  {
    icon: Brain, title: "AI / Machine Learning",
    desc: "Machine Learning, Deep Learning and modern AI tools & frameworks — build intelligent applications.",
    tags: ["ML", "Deep Learning", "AI Tools"], level: "Intermediate", mode: "Offline & Online", duration: "10–16 weeks",
  },
  {
    icon: Smartphone, title: "App Development",
    desc: "Ship cross-platform mobile apps with Flutter and React Native — from UI to publish-ready builds.",
    tags: ["Flutter", "React Native"], level: "Beginner → Advanced", mode: "Offline & Online", duration: "10–14 weeks",
  },
  {
    icon: Monitor, title: "Computer Basics",
    desc: "Tally for beginners plus the complete MS Office suite — Word, Excel and PowerPoint mastery.",
    tags: ["Tally", "MS Word", "Excel", "PowerPoint"], level: "Beginner", mode: "Offline & Online", duration: "4–8 weeks",
  },
  {
    icon: Sparkles, title: "Free AI Tools Training",
    desc: "Bonus track for every student — learn ChatGPT, prompt engineering and productivity AI tools.",
    tags: ["ChatGPT", "Prompting", "Productivity"], level: "All levels", mode: "Included Free", duration: "Ongoing",
  },
];

function Courses() {
  return (
    <section id="courses" className="bg-brand-light/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Our Courses" title={<>Programs built for the <span className="text-gradient-brand">modern learner</span></>} subtitle="Hands-on courses delivered offline in Udangudi and online across India — with mentorship, projects and certificates." />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-brand"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-brand">
                  <c.icon className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand-primary">{c.duration}</span>
              </div>
              <h3 className="text-xl font-bold text-brand-navy">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border bg-white px-2.5 py-0.5 text-xs font-medium text-brand-navy/80">{t}</span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5 text-xs text-muted-foreground">
                <span><b className="text-brand-navy">Level:</b> {c.level}</span>
                <span><b className="text-brand-navy">Mode:</b> {c.mode}</span>
              </div>
              <a href="#contact" className="mt-5 inline-flex items-center justify-between rounded-full bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary">
                Enroll now <ArrowRight className="h-4 w-4" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Internships() {
  const items = [
    { icon: Rocket, title: "Real-world Projects", desc: "Contribute to live products with measurable outcomes." },
    { icon: Brain, title: "Build Skills", desc: "Grow across code, collaboration, tooling and communication." },
    { icon: Briefcase, title: "Gain Experience", desc: "Work like a professional under mentorship from day one." },
    { icon: Trophy, title: "Boost Your Career", desc: "Stand out with portfolio-ready achievements and LORs." },
  ];
  return (
    <section id="internships" className="relative overflow-hidden bg-brand-navy py-24 text-white md:py-32">
      <div className="absolute -top-40 left-1/2 h-96 w-[80%] -translate-x-1/2 rounded-full bg-brand-primary/30 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-cyan">Internships</span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Internships for every college student</h2>
          <p className="mt-4 text-white/70">Turn what you learn into industry experience — with structured internships built around real teams and real deadlines.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-brand-cyan/40 hover:bg-white/10"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-white shadow-brand">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-bold">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certificates() {
  const points = [
    "Skill recognition your recruiters trust",
    "Portfolio-building projects for every course",
    "Industry-ready proof of learning outcomes",
    "Digital & printable certificates on completion",
  ];
  return (
    <section id="certificates" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">Certificates</span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">Recognize your skills. <span className="text-gradient-brand">Showcase your achievements.</span></h2>
          <p className="mt-4 text-muted-foreground">Every Muthura Academy program ends with a certificate that reflects what you actually built — not just what you attended.</p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-brand-navy">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-primary" />
                <span className="text-sm font-medium">{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-brand opacity-15 blur-3xl" />
          <div className="relative rotate-[-2deg] rounded-3xl border border-border bg-white p-8 shadow-brand transition-transform hover:rotate-0">
            <div className="rounded-2xl border-2 border-dashed border-brand-primary/30 p-8">
              <div className="flex items-center justify-between">
                <img src={logoAsset.url} alt="" className="h-10 w-10 rounded-full" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Certificate</span>
              </div>
              <p className="mt-8 text-xs uppercase tracking-widest text-muted-foreground">This certifies that</p>
              <p className="mt-1 text-2xl font-extrabold text-brand-navy">Your Name Here</p>
              <p className="mt-4 text-sm text-muted-foreground">has successfully completed the</p>
              <p className="text-lg font-bold text-brand-navy">Full Stack Web Development (MERN)</p>
              <p className="mt-1 text-sm text-muted-foreground">program at Muthura Academy.</p>
              <div className="mt-10 flex items-end justify-between">
                <div>
                  <div className="h-[1px] w-32 bg-brand-navy" />
                  <p className="mt-1 text-xs text-muted-foreground">Director, Muthura Academy</p>
                </div>
                <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-white shadow-brand">
                  <Award className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const STORIES = [
  {
    name: "Aravind K.", role: "Full Stack Developer", course: "MERN Stack",
    quote: "The MERN program was intense and hands-on. I built 3 real projects and landed my first developer role within weeks of finishing.",
    rating: 5, outcome: "Hired at a Chennai product startup", metric: "₹5.2 LPA offer", duration: "16 weeks",
  },
  {
    name: "Divya S.", role: "Data / AI Enthusiast", course: "AI & Machine Learning",
    quote: "The AI/ML track combined theory with real Python notebooks. The free AI tools training was genuinely a bonus I use every day.",
    rating: 5, outcome: "Data Analyst intern → full-time", metric: "3 live ML projects", duration: "12 weeks",
  },
  {
    name: "Karthik R.", role: "React Native Intern", course: "Flutter & Mobile Dev",
    quote: "I joined for Flutter and stayed for the mentorship. The internship gave me my first taste of a real product team.",
    rating: 5, outcome: "Internship converted to role", metric: "2 apps shipped", duration: "20 weeks",
  },
  {
    name: "Meena V.", role: "Office Executive", course: "MS Office + Tally",
    quote: "I started with zero computer skills. Today I confidently handle Tally and Excel at work — thanks to the patient teaching.",
    rating: 5, outcome: "Promoted to Accounts Executive", metric: "40% faster reporting", duration: "8 weeks",
  },
  {
    name: "Sathish P.", role: "Frontend Developer", course: "React + TypeScript",
    quote: "The mentors reviewed my code line by line. I now push production React apps and mentor juniors on my team.",
    rating: 5, outcome: "Freelance clients in 3 months", metric: "₹40k/mo side income", duration: "10 weeks",
  },
];

function Stories() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const n = STORIES.length;
  const s = STORIES[i];
  const go = (dir: number) => setI((p) => (p + dir + n) % n);
  const regionRef = useRef<HTMLDivElement>(null);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    else if (e.key === "Home") { e.preventDefault(); setI(0); }
    else if (e.key === "End") { e.preventDefault(); setI(n - 1); }
    else if (e.key === " " || e.key === "Spacebar") { e.preventDefault(); setPlaying((p) => !p); }
  };

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 5500);
    return () => clearInterval(t);
  }, [playing, n]);

  return (
    <section className="relative overflow-hidden bg-brand-light/40 py-24 md:py-32">
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-brand-cyan/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-16 h-72 w-72 rounded-full bg-brand-primary/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Success Stories"
          title={<>Careers built at <span className="text-gradient-brand">Muthura Academy</span></>}
          subtitle="Real students. Real ratings. Real outcomes."
        />

        <div
          ref={regionRef}
          className="mt-16 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:ring-offset-4 focus-visible:ring-offset-brand-light/40"
          role="region"
          aria-roledescription="carousel"
          aria-label="Student success stories"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPlaying(false)}
          onMouseLeave={() => setPlaying(true)}
          onFocus={() => setPlaying(false)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setPlaying(true); }}
        >
          <div className="grid gap-8 lg:grid-cols-5">
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative rounded-3xl border border-border bg-white p-8 shadow-soft md:p-10 lg:col-span-3"
              role="group"
              aria-roledescription="slide"
              aria-label={`Story ${i + 1} of ${n}: ${s.name}`}
              aria-live={playing ? "off" : "polite"}
            >
              <Quote className="absolute right-8 top-8 h-16 w-16 text-brand-primary/10" strokeWidth={1.5} />
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1 rounded-full bg-brand-light px-3 py-1.5">
                  {Array.from({ length: s.rating }).map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-brand-primary text-brand-primary" />
                  ))}
                  <span className="ml-1 text-xs font-bold text-brand-navy">{s.rating}.0</span>
                </div>
                <span className="rounded-full border border-brand-primary/20 bg-white px-3 py-1.5 text-xs font-semibold text-brand-primary">
                  {s.course}
                </span>
                <span className="rounded-full bg-brand-navy/5 px-3 py-1.5 text-xs font-medium text-brand-navy/70">
                  {s.duration}
                </span>
              </div>

              <p className="relative mt-6 text-xl font-semibold leading-relaxed text-brand-navy md:text-2xl">
                “{s.quote}”
              </p>

              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-brand-primary/15 bg-gradient-to-br from-brand-light/60 to-white p-4">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-gradient-brand text-white">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-brand-primary">Outcome</div>
                  <div className="text-sm font-semibold text-brand-navy">{s.outcome}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{s.metric}</div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-brand text-lg font-bold text-white">
                    {s.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-brand-navy">{s.name}</div>
                    <div className="text-sm text-muted-foreground">{s.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? "Pause story auto-rotation" : "Play story auto-rotation"}
                    aria-pressed={!playing}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-brand-navy transition hover:border-brand-primary hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                  >
                    {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => go(-1)}
                    aria-label="Previous story"
                    aria-controls="story-slide"
                    className="grid h-10 w-10 place-items-center rounded-full border border-border bg-white text-brand-navy transition hover:border-brand-primary hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Next story"
                    aria-controls="story-slide"
                    className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-white shadow-brand transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex gap-1.5" role="tablist" aria-label="Select a story">
                {STORIES.map((_, k) => (
                  <button
                    key={k}
                    onClick={() => setI(k)}
                    role="tab"
                    aria-selected={k === i}
                    aria-label={`Go to story ${k + 1} of ${n}: ${STORIES[k].name}`}
                    tabIndex={k === i ? 0 : -1}
                    className="h-1.5 flex-1 overflow-hidden rounded-full bg-border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                  >
                    <motion.div
                      className="h-full bg-gradient-brand"
                      initial={{ width: 0 }}
                      animate={{ width: k === i ? "100%" : k < i ? "100%" : "0%" }}
                      transition={{ duration: k === i && playing ? 5.5 : 0.3, ease: "linear" }}
                    />
                  </button>
                ))}
              </div>
            </motion.article>

            <div className="grid gap-4 lg:col-span-2" role="list" aria-label="All success stories">
              {STORIES.map((st, k) => (
                <button
                  key={st.name}
                  onClick={() => setI(k)}
                  aria-current={k === i}
                  aria-label={`View story from ${st.name}, ${st.role}. Rating ${st.rating} out of 5. Outcome: ${st.outcome}`}
                  className={`group rounded-2xl border p-5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 ${
                    k === i
                      ? "border-brand-primary bg-white shadow-brand"
                      : "border-border bg-white/70 shadow-soft hover:-translate-y-0.5 hover:border-brand-primary/40 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${k === i ? "bg-gradient-brand text-white" : "bg-brand-light text-brand-primary"}`}>
                      {st.name[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-bold text-brand-navy">{st.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{st.role}</div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-brand-primary text-brand-primary" />
                      <span className="text-xs font-bold text-brand-navy">{st.rating}.0</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-brand-primary">
                    <TrendingUp className="h-3 w-3" />
                    <span className="truncate">{st.outcome}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "How do I enroll in a course?", a: "Reach out via the contact form or call us directly. Our advisor will guide you through course selection, schedule and payment." },
  { q: "Are classes offline, online or both?", a: "Both. All programs are delivered offline at our Udangudi campus and online across India — pick what fits your life." },
  { q: "What is the typical course duration?", a: "Most tracks run between 4 and 20 weeks depending on the program and depth. Every course lists its expected duration." },
  { q: "Will I receive a certificate?", a: "Yes. Every student who completes a program receives a Muthura Academy certificate along with portfolio-ready projects." },
  { q: "Do you offer internships?", a: "Yes — college students get access to real-world project internships that build skills, experience and career momentum." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeader eyebrow="FAQ" title={<>Answers to <span className="text-gradient-brand">common questions</span></>} subtitle="Everything you might want to know before joining Muthura Academy." />
        <div className="mt-14 space-y-3">
          {FAQS.map((f, i) => (
            <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="text-base font-semibold text-brand-navy">{f.q}</span>
                <ChevronDown className={`h-5 w-5 flex-shrink-0 text-brand-primary transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-brand-light/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Contact" title={<>Let's build your <span className="text-gradient-brand">future together</span></>} subtitle="Talk to an advisor about courses, schedules and internships — we usually reply within a few hours." />
        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-2">
            <ContactCard icon={<MapPin className="h-5 w-5" />} title="Visit us" lines={["11/4A Koola Street,", "Udangudi,", "Thoothukudi District – 628203"]} />
            <ContactCard icon={<Phone className="h-5 w-5" />} title="Call us" lines={["+91 90477 54194", "+91 90804 50938"]} />
            <ContactCard icon={<Mail className="h-5 w-5" />} title="Delivery" lines={["Offline classes in Udangudi", "Online classes across India"]} />
            <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
              <iframe
                title="Muthura Academy location"
                src="https://www.google.com/maps?q=Udangudi,+Thoothukudi&output=embed"
                loading="lazy"
                className="h-56 w-full border-0"
              />
            </div>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! Our advisor will reach out shortly."); }}
            className="space-y-5 rounded-3xl border border-border bg-white p-8 shadow-soft lg:col-span-3"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" placeholder="Your name" />
              <Field label="Phone" name="phone" type="tel" placeholder="+91" />
            </div>
            <Field label="Email" name="email" type="email" placeholder="you@email.com" />
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brand-navy">I'm interested in</label>
              <select name="course" className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20">
                {COURSES.map((c) => (<option key={c.title}>{c.title}</option>))}
                <option>Internship</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brand-navy">Message</label>
              <textarea name="message" rows={4} placeholder="Tell us a bit about your goals…" className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
            </div>
            <button type="submit" className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-brand transition-transform hover:scale-[1.02]">
              Send Enquiry <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="flex items-start gap-4 rounded-3xl border border-border bg-white p-6 shadow-soft">
      <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-gradient-brand text-white shadow-brand">{icon}</div>
      <div>
        <div className="text-sm font-bold text-brand-navy">{title}</div>
        {lines.map((l) => (<div key={l} className="text-sm text-muted-foreground">{l}</div>))}
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-brand-navy" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} placeholder={placeholder} required className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <img src={logoAsset.url} alt="Muthura Academy" className="h-11 w-11 rounded-full" />
              <div>
                <div className="text-lg font-bold">Muthura Academy</div>
                <div className="text-xs text-white/60">A Unit of Muthura Technologies</div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
              A future-ready EdTech academy blending offline mentorship with modern online delivery.
              Learn, build and grow with courses, internships and certificates that recruiters trust.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-white/70">
              <Sparkles className="h-4 w-4 text-brand-cyan" /> Free AI Tools Training included
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-3">
            <FooterCol title="Explore" links={[["Home","#home"],["Courses","#courses"],["Internships","#internships"],["Certificates","#certificates"]]} />
            <FooterCol title="Academy" links={[["About","#about"],["Success Stories","#"],["FAQ","#"],["Contact","#contact"]]} />
            <FooterCol title="Contact" links={[["+91 90477 54194","tel:+919047754194"],["+91 90804 50938","tel:+919080450938"],["Udangudi, Thoothukudi","#contact"]]} />
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} Muthura Academy. All rights reserved.</div>
          <div>Learn • Build • Grow • Tuition • Courses • Internships</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-sm font-bold text-white">{title}</div>
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}><a href={href} className="text-sm text-white/60 transition-colors hover:text-brand-cyan">{label}</a></li>
        ))}
      </ul>
    </div>
  );
}

export function MuthuraSite() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <TrustStrip />
      <WhyChoose />
      <Courses />
      <Internships />
      <Certificates />
      <Stories />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}