import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight, Sparkles, Code2, Globe2, Brain, Smartphone, Monitor,
  GraduationCap, Award, Briefcase, Rocket, CheckCircle2, Star,
  Phone, MapPin, Mail, ChevronDown, ChevronLeft, ChevronRight,
  Play, Users, BookOpen, Trophy, TrendingUp, Quote, Pause,
} from "lucide-react";
import heroStudents from "@/assets/hero-students.jpg";
import logo from "@/assets/muthura-logo.jpg";
import type { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { default as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const NAV = [
  { href: "#courses", label: "Courses", icon: BookOpen },
  { href: "#certificates", label: "Certificates", icon: Award },
  { href: "#about", label: "About", icon: Users },
  { href: "#contact", label: "Contact", icon: Mail },
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

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const idsKey = ids.join(",");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-140px 0px -60% 0px",
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return active;
}

function Navbar() {
  const scrolled = useScrolled();
  const sectionIds = NAV.map((n) => n.href.replace("#", ""));
  const active = useActiveSection(sectionIds);

  return (
    <>
      {/* Top bar — logo only */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <div
          className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 ${
            scrolled
              ? "border-border/60 bg-white/80 shadow-soft backdrop-blur-xl"
              : "border-white/20 bg-white/10 backdrop-blur-md"
          }`}
        >
          <a href="#home" className="flex items-center gap-2.5">
            <img src={logo} alt="Muthura Academy" className="h-9 w-9 rounded-full object-cover" />
            <span className={`text-sm font-bold tracking-tight ${scrolled ? "text-brand-navy" : "text-white"}`}>
              Muthura Academy
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    scrolled
                      ? "text-brand-navy/80 hover:bg-brand-light hover:text-brand-navy"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-brand transition-transform hover:scale-105 md:inline-flex"
          >
            Enroll Now
          </a>
        </div>
      </header>

      {/* Bottom app-style tab bar — mobile only */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-6 pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <ul className="flex items-center gap-2 rounded-full bg-gradient-brand px-4 py-3.5 shadow-[0_8px_30px_rgba(15,23,42,0.25)] ring-1 ring-border">
          {NAV.map((n) => {
            const id = n.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={n.href}>
                <a href={n.href} className="flex flex-col items-center gap-1.5 px-4 py-1">
                  <n.icon
                    className={`h-5 w-5 transition-all ${
                      isActive ? "text-white drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]" : "text-white/60"
                    }`}
                    strokeWidth={1.75}
                  />
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition-all ${
                      isActive ? "bg-brand-cyan shadow-[0_0_6px_rgba(56,189,248,0.9)]" : "bg-transparent"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

function Hero() {
  return (
    <section id="home" className="relative isolate min-h-[100svh] overflow-hidden landscape:min-h-0">
      <img
        src={heroStudents}
        alt="Students learning at Muthura Academy"
        width={1600}
        height={1200}
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-navy/85 to-brand-primary/70" />
      <div className="absolute -top-40 -left-20 h-96 w-96 rounded-full bg-brand-cyan/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand-primary/40 blur-3xl" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-32 sm:pb-20 sm:pt-36 lg:grid-cols-12 lg:pb-24 lg:pt-40 landscape:min-h-0 landscape:py-24">
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
          <h1 className="mt-6 text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
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
              {["A", "B", "C", "D"].map((c, i) => (
                <div
                  key={c}
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-brand-navy bg-gradient-brand text-xs font-bold text-white"
                  style={{ zIndex: 4 - i }}
                >
                  {c}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-white">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-brand-cyan text-brand-cyan" />
                ))}
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
              <img src={logo} alt="Muthura Academy logo" className="h-full w-full rounded-3xl object-contain" />
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

function FloatingCard({
  className = "",
  icon,
  title,
  sub,
}: {
  className?: string;
  icon: ReactNode;
  title: string;
  sub: string;
}) {
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
  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);
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
        <SectionHeader
          eyebrow="Why Muthura Academy"
          title={
            <>
              Everything you need to <span className="text-gradient-brand">launch a great career</span>
            </>
          }
          subtitle="A future-ready academy blending offline mentorship with modern online delivery — so learning fits your life."
        />
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

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
}) {
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
  const swiperRef = useRef<SwiperType | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  return (
    <section id="courses" className="overflow-x-hidden bg-brand-light/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Our Courses"
          title={
            <>
              Programs built for the{" "}
              <span className="text-gradient-brand">modern learner</span>
            </>
          }
          subtitle="Hands-on courses delivered offline in Udangudi and online across India — with mentorship, projects and certificates."
        />

        <div className="relative mt-16">
          <Swiper
            modules={[Navigation]}
            onSwiper={(sw) => {
              swiperRef.current = sw;
              setAtStart(sw.isBeginning);
              setAtEnd(sw.isEnd);
            }}
            onSlideChange={(sw) => {
              setAtStart(sw.isBeginning);
              setAtEnd(sw.isEnd);
            }}
            speed={550}
            spaceBetween={16}
            slidesPerView={1}
            centeredSlides={false}
            breakpoints={{
              480: { slidesPerView: 1.1, spaceBetween: 16 },
              640: { slidesPerView: 1.5, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!overflow-visible !pb-4"
          >
            {COURSES.map((c, i) => (
              <SwiperSlide key={c.title} className="h-auto">
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-brand sm:p-7"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-brand">
                      <c.icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-semibold text-brand-primary">
                      {c.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-brand-navy">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-white px-2.5 py-0.5 text-xs font-medium text-brand-navy/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border pt-5 text-xs text-muted-foreground">
                    <span>
                      <b className="text-brand-navy">Level:</b> {c.level}
                    </span>
                    <span>
                      <b className="text-brand-navy">Mode:</b> {c.mode}
                    </span>
                  </div>

                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center justify-between rounded-full bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-primary"
                  >
                    Enroll now <ArrowRight className="h-4 w-4" />
                  </a>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={atStart}
            className="absolute left-1 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-white/95 shadow-soft backdrop-blur transition-all hover:bg-brand-light hover:scale-105 disabled:pointer-events-none disabled:opacity-30 sm:-left-4 sm:h-11 sm:w-11 md:-left-6"
            aria-label="Previous courses"
          >
            <ArrowRight className="h-4 w-4 rotate-180 text-brand-navy" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={atEnd}
            className="absolute right-1 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-white/95 shadow-soft backdrop-blur transition-all hover:bg-brand-light hover:scale-105 disabled:pointer-events-none disabled:opacity-30 sm:-right-4 sm:h-11 sm:w-11 md:-right-6"
            aria-label="Next courses"
          >
            <ArrowRight className="h-4 w-4 text-brand-navy" />
          </button>
        </div>
      </div>
    </section>
  );
}

function TypewriterText({
  words,
  speed = 80,
  deleteSpeed = 40,
  pause = 1800,
  className = "",
}: {
  words: string[];
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
  className?: string;
}) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    let timer: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
      } else {
        timer = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed);
      } else {
        setDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words, speed, deleteSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function VerticalText({
  words,
  interval = 2500,
  className = "",
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div className={`overflow-hidden h-8 ${className}`}>
      <motion.div
        animate={{ y: -index * 32 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 80,
          damping: 18,
        }}
      >
        {words.concat(words[0]).map((word, i) => (
          <div key={i} className="h-8 flex items-center font-bold">
            {word}
          </div>
        ))}
      </motion.div>
    </div>
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
            Certificates
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-brand-navy sm:text-5xl">
            Recognize your skills. <span className="text-gradient-brand">Showcase your achievements.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every Muthura Academy program ends with a certificate that reflects what you actually built — not just what you attended.
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-brand-navy">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-primary" />
                <span className="text-sm font-medium">{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-brand opacity-15 blur-3xl" />
          <div className="relative -rotate-2 rounded-3xl border border-border bg-white p-8 shadow-brand transition-transform hover:rotate-0">
            <div className="rounded-2xl border-2 border-dashed border-brand-primary/30 p-8">
              <div className="flex items-center justify-between">
                <img src={logo} alt="" className="h-10 w-10 rounded-full" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Certificate</span>
              </div>
              <p className="mt-8 text-xs uppercase tracking-widest text-muted-foreground">This certifies that</p>

              <p className="mt-1 text-2xl font-extrabold text-brand-navy">
                <TypewriterText
                  words={["Aravind K", "Divya S", "Karthik R", "Meena V", "Nivetha A", "Sathish P", "Your Name Here"]}
                />
              </p>
              <p className="mt-4 text-sm text-muted-foreground">has successfully completed the</p>
              <VerticalText
                className="text-lg text-brand-navy text-sm "
                words={[
                  "MERN Full Stack Web Development",
                  "MEAN Full Stack Web Development",
                  "Python Full Stack Development",
                  "Java Full Stack Development",
                  "AI & Machine Learning",
                  "Flutter App Development",
                  "React Development",
                  "Computer Basics",
                ]}
              />
              <p className="mt-1 text-sm text-muted-foreground">program at Muthura Academy.</p>
              <div className="mt-10 flex items-end justify-between">
                <div>
                  <p>
                    <b>Muthu Anushya</b>
                  </p>
                  <div className="h-px w-32 bg-brand-navy" />
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
  const [announcement, setAnnouncement] = useState("");
  const n = STORIES.length;
  const s = STORIES[i];
  const go = (dir: number) => setI((p) => (p + dir + n) % n);
  const regionRef = useRef<HTMLDivElement>(null);
  const storyCardRef = useRef<HTMLDivElement>(null);
  const pendingScrollRef = useRef(false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setI(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setI(n - 1);
    } else if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      setPlaying((p) => !p);
    }
  };

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 5500);
    return () => clearInterval(t);
  }, [playing, n]);

  useEffect(() => {
    setAnnouncement(`Showing story ${i + 1} of ${n}: ${s.name}, ${s.role}. Outcome: ${s.outcome}.`);
  }, [i, n, s]);

  useEffect(() => {
    if (!pendingScrollRef.current) return;
    pendingScrollRef.current = false;

    const scrollToCard = () => {
      const el = storyCardRef.current;
      if (!el) return;
      const headerOffset = window.innerWidth < 768 ? 96 : 112;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToCard);
    });
    const fallback = setTimeout(scrollToCard, 150);
    return () => clearTimeout(fallback);
  }, [i]);

  return (
    <section className="relative overflow-hidden bg-brand-light/40 py-24 md:py-32">
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-brand-cyan/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-16 h-72 w-72 rounded-full bg-brand-primary/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Success Stories"
          title={
            <>
              Careers built at <span className="text-gradient-brand">Muthura Academy</span>
            </>
          }
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
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setPlaying(true);
          }}
        >
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {announcement}
          </div>
          <div className="grid gap-8 lg:grid-cols-5">
            <motion.article
              ref={storyCardRef}
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative rounded-3xl border border-border bg-white p-8 shadow-soft md:p-10 lg:col-span-3"
              role="group"
              aria-roledescription="slide"
              aria-label={`Story ${i + 1} of ${n}: ${s.name}`}
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
                "{s.quote}"
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
                    className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-brand-navy transition hover:border-brand-primary hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                  >
                    {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => go(-1)}
                    aria-label="Previous story"
                    aria-controls="story-slide"
                    className="grid h-11 w-11 place-items-center rounded-full border border-border bg-white text-brand-navy transition hover:border-brand-primary hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => go(1)}
                    aria-label="Next story"
                    aria-controls="story-slide"
                    className="grid h-11 w-11 place-items-center rounded-full bg-gradient-brand text-white shadow-brand transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex gap-1.5" role="tablist" aria-label="Select a story">
                {STORIES.map((st, k) => (
                  <button
                    key={st.name}
                    onClick={() => {
                      pendingScrollRef.current = true;
                      setI(k);
                      setPlaying(true);
                    }}
                    role="tab"
                    aria-selected={k === i}
                    aria-label={`Go to story ${k + 1} of ${n}: ${st.name}`}
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
                  onClick={() => {
                    pendingScrollRef.current = true;
                    setI(k);
                    setPlaying(true);
                  }}
                  aria-current={k === i}
                  aria-label={`View story from ${st.name}, ${st.role}. Rating ${st.rating} out of 5. Outcome: ${st.outcome}`}
                  className={`group rounded-2xl border p-5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 ${
                    k === i
                      ? "border-brand-primary bg-white shadow-brand"
                      : "border-border bg-white/70 shadow-soft hover:-translate-y-0.5 hover:border-brand-primary/40 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-10 w-10 place-items-center rounded-full text-sm font-bold ${
                        k === i ? "bg-gradient-brand text-white" : "bg-brand-light text-brand-primary"
                      }`}
                    >
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
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              Answers to <span className="text-gradient-brand">common questions</span>
            </>
          }
          subtitle="Everything you might want to know before joining Muthura Academy."
        />
        <div className="mt-14 space-y-3">
          {FAQS.map((f, i) => (
            <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={open === i}
              >
                <span className="text-base font-semibold text-brand-navy">{f.q}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-brand-primary transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
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
        <SectionHeader
          eyebrow="Contact"
          title={
            <>
              Let's build your <span className="text-gradient-brand">future together</span>
            </>
          }
          subtitle="Talk to an advisor about courses, schedules and internships — we usually reply within a few hours."
        />
        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-2">
            <ContactCard
              icon={<MapPin className="h-5 w-5" />}
              title="Visit us"
              lines={["11/4A Koola Street,", "Udangudi,", "Thoothukudi District – 628203"]}
            />
            <ContactCard
              icon={<Phone className="h-5 w-5" />}
              title="Call us"
              lines={[
                <a key="1" href="tel:+919047754194" className="hover:text-brand-primary transition-colors">
                  +91 90477 54194
                </a>,
                <a key="2" href="tel:+919080450938" className="hover:text-brand-primary transition-colors">
                  +91 90804 50938
                </a>,
              ]}
            />
            <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
              <iframe
                title="Muthura Academy location"
                src="https://www.google.com/maps?q=Udangudi,+Thoothukudi&output=embed"
                loading="lazy"
                className="h-[280px] w-full border-0 sm:h-[320px]"
              />
            </div>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! Our advisor will reach out shortly.");
            }}
            className="space-y-5 rounded-3xl border border-border bg-white p-8 shadow-soft lg:col-span-3"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" placeholder="Your name" />
              <Field label="Phone" name="phone" type="tel" placeholder="+91" />
            </div>
            <Field label="Email" name="email" type="email" placeholder="you@email.com" />
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brand-navy">I'm interested in</label>
              <select
                name="course"
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              >
                {COURSES.map((c) => (
                  <option key={c.title}>{c.title}</option>
                ))}
                <option>Internship</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brand-navy">Message</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us a bit about your goals…"
                className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-brand transition-transform hover:scale-[1.02]"
            >
              Send Enquiry <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: ReactNode[] }) {
  return (
    <div className="flex items-start gap-4 rounded-3xl border border-border bg-white p-6 shadow-soft">
      <div className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-gradient-brand text-white shadow-brand">
        {icon}
      </div>
      <div>
        <div className="text-sm font-bold text-brand-navy">{title}</div>
        {lines.map((l, idx) => (
          <div key={idx} className="text-sm text-muted-foreground">
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-brand-navy" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
      />
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
              <img src={logo} alt="Muthura Academy" className="h-11 w-11 rounded-full" />
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
            <FooterCol
              title="Explore"
              links={[
                ["Home", "#home"],
                ["Courses", "#courses"],
                ["Internships", "#internships"],
                ["Certificates", "#certificates"],
              ]}
            />
            <FooterCol
              title="Academy"
              links={[
                ["About", "#about"],
                ["Success Stories", "#"],
                ["FAQ", "#"],
                ["Contact", "#contact"],
              ]}
            />
            <FooterCol
              title="Contact"
              links={[
                ["+91 90477 54194", "tel:+919047754194"],
                ["+91 90804 50938", "tel:+919080450938"],
                ["Udangudi, Thoothukudi", "#contact"],
              ]}
            />
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
          <li key={label}>
            <a href={href} className="text-sm text-white/60 transition-colors hover:text-brand-cyan">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.585 5.939L0 24l6.335-1.652a11.905 11.905 0 005.683 1.448h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-9.43.43-13.227 4.227-13.657 13.657-.058 1.28-.072 1.689-.072 4.948 0 3.259.014 3.668.072 4.948.43 9.43 4.227 13.227 13.657 13.657 1.28.058 1.688.072 4.947.072 3.259 0 3.668-.014 4.948-.072 9.43-.43 13.225-4.227 13.657-13.657.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.43-9.43-4.227-13.225-13.657-13.657-1.28-.058-1.689-.072-4.948-.072zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FloatingSocials() {
  const links = [
    {
      name: "WhatsApp",
      href: "https://wa.me/919047754194?text=Hi%20Muthura%20Academy",
      color: "#25D366",
      icon: WhatsAppIcon,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/muthura_technologies/",
      color: "#E4405F",
      icon: InstagramIcon,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@muthura_technologies",
      color: "#FF0000",
      icon: YouTubeIcon,
    },
  ];

  return (
    <aside aria-label="Social links" className="fixed right-4 bottom-20 z-40 flex flex-col items-end gap-3 md:bottom-6">
      {links.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-white/95 p-2.5 shadow-soft backdrop-blur transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            style={{ color: item.color }}
          >
            <Icon className="h-5 w-5" />
            <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-brand-navy px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {item.name}
            </span>
          </a>
        );
      })}
    </aside>
  );
}

export function MuthuraSite() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-16 md:pb-0">
      <Navbar />
      <Hero />
      <TrustStrip />
      <WhyChoose />
      <Courses />
      <Certificates />
      <Stories />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingSocials />
    </main>
  );
}