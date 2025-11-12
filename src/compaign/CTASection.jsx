import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Mail,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

/* ⬇️ Import all campaign sections to render below */
import CampaignHeader from "./CampaignHeader";
import AboutCause from "./AboutCause";
import CampaignCard from "./CampaignCard";
import Testimonials from "./Testimonials";

/* ---------- tiny helpers ---------- */
const useCountUp = (end, trigger, duration = 1400) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, trigger, duration]);
  return val;
};

/* ---------- main ---------- */
export default function CTASection() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const [activeRole, setActiveRole] = useState("donor");
  const roles = [
    {
      id: "donor",
      label: "Donor",
      icon: Users,
      bullets: [
        "Real-time tracking with receipts",
        "Multiple payment options (Card / Bank / Wallet / QR)",
        "Impact updates: photos, videos & maps",
      ],
      cta: "Donate Now",
      href: "#donate",
    },
    {
      id: "charity",
      label: "Charity",
      icon: Building2,
      bullets: [
        "Create & manage RACA-approved campaigns",
        "Upload licenses & proof of spending",
        "Automated reporting to RACA",
      ],
      cta: "Register Your Charity",
      href: "/signup",
    },
    {
      id: "authority",
      label: "Authority (RACA)",
      icon: ShieldCheck,
      bullets: [
        "Approve & monitor campaigns",
        "KPI dashboards & AML alerts",
        "Unified Sandi + platform visibility",
      ],
      cta: "View Oversight Suite",
      href: "/oversight-compliance",
    },
  ];

  /* parallax */
  const containerRef = useRef(null);
  const onMouseMove = (e) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    containerRef.current.style.setProperty("--mx", x.toString());
    containerRef.current.style.setProperty("--my", y.toString());
  };

  /* stats in-view */
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStatsInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) io.observe(statsRef.current);
    return () => io.disconnect();
  }, []);
  const donors = useCountUp(12500, statsInView);
  const charities = useCountUp(150, statsInView);
  const compliance = useCountUp(100, statsInView);

  /* email subscribe + confetti */
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const handleSubscribe = (e) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      setToast({ type: "err", msg: "Enter a valid email." });
      setTimeout(() => setToast(null), 2500);
      return;
    }
    setToast({ type: "ok", msg: "Subscribed! Updates coming soon." });
    setEmail("");
    setConfetti(true);
    setTimeout(() => setToast(null), 2400);
    setTimeout(() => setConfetti(false), 1400);
  };

  return (
    <>
      {/* ===== HERO / CTA ===== */}
      <section
        ref={containerRef}
        onMouseMove={onMouseMove}
        className="relative overflow-hidden text-center"
      >
        {/* Aurora / gradient mesh */}
        <div className="absolute inset-0 animate-gradientShift bg-[radial-gradient(60%_90%_at_20%_10%,rgba(99,255,195,0.24),transparent_60%),radial-gradient(60%_80%_at_85%_20%,rgba(20,184,166,0.22),transparent_55%),radial-gradient(50%_70%_at_50%_80%,rgba(16,185,129,0.34),transparent_60%)]" />
        {/* Moving conic streak */}
        <div
          aria-hidden
          className="absolute -inset-1 opacity-40 mix-blend-soft-light"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,.0), rgba(255,255,255,.35), rgba(255,255,255,0), rgba(255,255,255,.25))",
            maskImage:
              "radial-gradient(70% 70% at 50% 40%, #000 60%, transparent 70%)",
          }}
        />
        {/* Parallax blobs */}
        <div
          aria-hidden
          className="absolute -top-28 -left-28 w-[30rem] h-[30rem] rounded-full blur-3xl bg-emerald-200/45"
          style={{
            transform:
              "translate3d(calc(var(--mx,0)*-24px), calc(var(--my,0)*-14px), 0)",
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -right-24 w-[34rem] h-[34rem] rounded-full blur-3xl bg-green-300/40"
          style={{
            transform:
              "translate3d(calc(var(--mx,0)*28px), calc(var(--my,0)*22px), 0)",
          }}
        />
        {/* Grain */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-28">
          {/* Chips */}
          <div
            className="mb-5 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-950"
            data-aos="fade-down"
          >
            {["✅ RACA Verified", "🔗 Sandi Integrated", "🔐 AML + Encryption"].map(
              (t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-white/85 ring-1 ring-emerald-300"
                >
                  {t}
                </span>
              )
            )}
          </div>

          {/* Glass card with gradient stroke + halo */}
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute -inset-[2px] rounded-3xl bg-[conic-gradient(from_120deg_at_50%_50%,rgba(255,255,255,.45),rgba(16,185,129,.7),rgba(255,255,255,.45))] blur-[2px]" />
            <div className="relative rounded-3xl bg-white/65 backdrop-blur-md ring-1 ring-black/10 shadow-xl px-6 sm:px-10 py-10 md:py-12 overflow-hidden">
              {/* sweeping light */}
              <span className="pointer-events-none absolute -inset-y-12 -left-1/3 w-1/3 bg-white/35 blur-md rotate-12 animate-sweep" />

              {/* Heading */}
              <h1
                className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-emerald-950"
                data-aos="zoom-in"
              >
                Make every riyal{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 bg-clip-text text-transparent">
                  transparent
                </span>{" "}
                &{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 bg-clip-text text-transparent">
                  impactful
                </span>
              </h1>

              <p
                className="mt-4 text-base md:text-lg max-w-3xl mx-auto text-emerald-900/90"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Backed by <b>RACA</b> and integrated with <b>Sandi</b>, the platform
                ensures fairness, compliance, and real-time visibility from donor to
                beneficiary.
              </p>

              {/* Role switcher */}
              <div
                className="mt-8 mx-auto max-w-3xl"
                data-aos="fade-up"
                data-aos-delay="180"
              >
                <div className="relative p-1 rounded-2xl bg-emerald-50 ring-1 ring-emerald-200 shadow-sm grid grid-cols-3">
                  <motion.span
                    layout
                    className="absolute top-1 bottom-1 left-1 rounded-xl bg-white shadow ring-1 ring-emerald-200"
                    style={{
                      width: "calc(33.333% - 8px)",
                      transform:
                        activeRole === "donor"
                          ? "translateX(0)"
                          : activeRole === "charity"
                          ? "translateX(calc(100%))"
                          : "translateX(calc(200%))",
                      transition: "transform .35s cubic-bezier(.22,1,.36,1)",
                    }}
                  />
                  {roles.map((r) => {
                    const Icon = r.icon;
                    const active = activeRole === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => setActiveRole(r.id)}
                        className={`relative z-10 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-colors ${
                          active ? "text-emerald-700" : "text-emerald-900/70 hover:text-emerald-700"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {r.label}
                      </button>
                    );
                  })}
                </div>

                {/* Role content */}
                <div className="mt-6 grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-3">
                    <ul className="grid gap-3 text-left">
                      {roles
                        .find((r) => r.id === activeRole)
                        ?.bullets.map((b, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 bg-white/85 rounded-xl ring-1 ring-emerald-200 px-4 py-3 shadow-sm"
                          >
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                            <span className="text-emerald-900">{b}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="md:col-span-2 self-stretch">
                    <a
                      href={roles.find((r) => r.id === activeRole)?.href || "#"}
                      className="group relative w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-white font-semibold py-4 ring-1 ring-emerald-500 shadow-lg hover:brightness-105 hover:-translate-y-0.5 transition"
                      onClick={(e) => {
                        // ripple
                        const r = document.createElement("span");
                        r.className = "btn-ripple";
                        const rect = e.currentTarget.getBoundingClientRect();
                        r.style.left = `${e.clientX - rect.left}px`;
                        r.style.top = `${e.clientY - rect.top}px`;
                        e.currentTarget.appendChild(r);
                        setTimeout(() => r.remove(), 600);
                      }}
                    >
                      {roles.find((r) => r.id === activeRole)?.cta}
                      <ArrowRight className="w-5 h-5 -mr-1 group-hover:translate-x-0.5 transition-transform" />
                      <span className="pointer-events-none absolute -inset-y-10 -left-1/3 w-1/3 bg-white/35 blur-md rotate-12 opacity-0 group-hover:opacity-100 animate-shine" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div
                ref={statsRef}
                className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
                data-aos="fade-up"
                data-aos-delay="240"
              >
                {[
                  { label: "Donors", value: donors, icon: Users },
                  { label: "Registered Charities", value: charities, icon: Building2 },
                  { label: "Compliance", value: `${compliance}%`, icon: ShieldCheck },
                ].map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-xl bg-white/85 backdrop-blur-md ring-1 ring-emerald-200 shadow p-6 flex flex-col items-center hover:shadow-lg transition-shadow"
                  >
                    <Icon className="w-7 h-7 text-emerald-600 mb-2.5" />
                    <div className="text-2xl font-extrabold text-emerald-700">{value}</div>
                    <div className="text-sm text-emerald-900">{label}</div>
                  </div>
                ))}
              </div>

              {/* Email capture */}
              <form
                onSubmit={handleSubscribe}
                className="mt-8 flex flex-col sm:flex-row items-stretch justify-center gap-3 max-w-3xl mx-auto"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-700/80" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Get updates on verified campaigns"
                    className="w-full pl-10 pr-3 py-3 rounded-lg ring-1 ring-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none bg-white/90"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold ring-1 ring-emerald-500 hover:brightness-105"
                >
                  Subscribe
                </button>
              </form>

              {/* Confetti (simple, lightweight) */}
              <AnimatePresence>
                {confetti && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                  >
                    {Array.from({ length: 26 }).map((_, i) => (
                      <span
                        key={i}
                        className="confetti"
                        style={{
                          left: `${(i * 3.7) % 100}%`,
                          animationDelay: `${(i % 6) * 0.06}s`,
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="mt-8 flex justify-center">
            <motion.div
              initial={{ y: 0, opacity: 0.8 }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-full bg-white/85 ring-1 ring-emerald-200 p-2"
              aria-hidden
            >
              <ChevronDown className="w-5 h-5 text-emerald-700" />
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,40 C240,80 480,0 720,40 C960,80 1200,20 1440,60 L1440,90 L0,90 Z"
            fill="rgba(255,255,255,.96)"
          />
        </svg>

        {/* Local CSS helpers */}
        <style>{`
          @keyframes gradientShift {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
          .animate-gradientShift { animation: gradientShift 16s ease-in-out infinite; }

          @keyframes shine { 0% { transform: translateX(-120%) } 100% { transform: translateX(220%) } }
          .animate-shine { animation: shine 1.4s ease-in-out both; }

          @keyframes sweep { 
            0% { transform: translateX(-140%) }
            100% { transform: translateX(160%) }
          }
          .animate-sweep { animation: sweep 3.6s ease-in-out infinite; }

          /* ripple for buttons */
          .btn-ripple {
            position:absolute; pointer-events:none; width:12px; height:12px;
            background: rgba(16,185,129,.28); border-radius:9999px; transform: translate(-50%,-50%);
            animation: ripple .6s ease-out forwards;
          }
          @keyframes ripple {
            from { opacity:.9; transform: translate(-50%,-50%) scale(1); }
            to   { opacity:0;  transform: translate(-50%,-50%) scale(18); }
          }

          /* confetti */
          .confetti {
            position:absolute; top:-10px; width:8px; height:14px; opacity:.95;
            background: hsl(calc(var(--i,0) * 14), 85%, 55%);
            transform: rotate(calc(var(--i,0) * 14deg));
            animation: drop 1.1s ease-in forwards;
            border-radius: 2px;
          }
          .confetti::after {
            content:''; position:absolute; inset:0; background:linear-gradient(#fff3,transparent);
            mix-blend-mode: screen;
          }
          @keyframes drop {
            to { transform: translateY(120vh) rotate(360deg); opacity: 0.8; }
          }
        `}</style>
      </section>

      {/* ===== Stacked Campaign Sections ===== */}
      <div id="campaigns" />
      <CampaignHeader />
      <AboutCause />
      <CampaignCard />
      <Testimonials />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg ${
              toast.type === "ok" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
