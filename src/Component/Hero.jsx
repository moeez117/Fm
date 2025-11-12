import React, { useEffect, useRef, useState } from "react";
import {
  FiHeart,
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiGlobe,
  FiPlay,
  FiActivity,
} from "react-icons/fi";

/* 👇 Keep these sections as in your file */
import WhoWeAre from "./WhoWeAre";
import SandiInfo from "./SandiInfo";
import MissionVisionValues from "./MissionVisionValues";
import HowItWorks from "./HowItWorks";
import OversightCompliance from "./OversightCompliance";
import CallToAction from "./CallToAction";

/* --------- Fancy Background Layer --------- */
const Background = ({ variant = "mesh" }) => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base fill so nothing flashes */}
      <div className="absolute inset-0 bg-[#0b1c16]" />

      {/* Variant: video (with poster fallback) */}
      {variant === "video" && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          autoPlay
          playsInline
          muted
          loop
          // Replace with your hosted .mp4
          src="https://cdn.coverr.co/videos/coverr-volunteers-distributing-food-7325/1080p.mp4"
          poster="https://images.unsplash.com/photo-1535813547-99c456a41d4b?q=80&w=1600&auto=format&fit=crop"
        />
      )}

      {/* Variant: image */}
      {variant === "image" && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1535813547-99c456a41d4b?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
      )}

      {/* Variant: animated mesh gradient (default) */}
      {variant === "mesh" && (
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <radialGradient id="g1" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
              <stop offset="65%" stopColor="#10b981" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g2" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.75" />
              <stop offset="65%" stopColor="#34d399" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="g3" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.75" />
              <stop offset="65%" stopColor="#059669" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* blobs */}
          <g className="mix-blend-screen">
            <circle r="260" fill="url(#g1)" className="animate-blob-1" />
            <circle r="260" fill="url(#g2)" className="animate-blob-2" />
            <circle r="260" fill="url(#g3)" className="animate-blob-3" />
          </g>
        </svg>
      )}

      {/* Subtle diagonal grid */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-soft-light"
        style={{
          backgroundImage:
            "linear-gradient(transparent 0, transparent calc(100% - 1px), rgba(255,255,255,.25) 1px), linear-gradient(90deg, transparent 0, transparent calc(100% - 1px), rgba(255,255,255,.25) 1px)",
          backgroundSize: "48px 48px, 48px 48px",
          transform: "skewY(-6deg) scale(1.1)",
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>\")",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Vignette for legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_50%,rgba(0,0,0,.55)_100%)]" />

      {/* Top-to-bottom shade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />

      {/* Keyframes */}
      <style>{`
        @keyframes blob1 {
          0%   { transform: translate(15%,-10%) scale(1); }
          33%  { transform: translate(70%,10%)  scale(1.1); }
          66%  { transform: translate(30%,40%)  scale(0.95); }
          100% { transform: translate(15%,-10%) scale(1); }
        }
        @keyframes blob2 {
          0%   { transform: translate(65%,55%) scale(1); }
          33%  { transform: translate(35%,20%) scale(1.05); }
          66%  { transform: translate(80%,30%) scale(0.9); }
          100% { transform: translate(65%,55%) scale(1); }
        }
        @keyframes blob3 {
          0%   { transform: translate(20%,75%) scale(1); }
          33%  { transform: translate(55%,65%) scale(1.1); }
          66%  { transform: translate(10%,40%) scale(0.92); }
          100% { transform: translate(20%,75%) scale(1); }
        }
        .animate-blob-1 { animation: blob1 22s ease-in-out infinite; }
        .animate-blob-2 { animation: blob2 26s ease-in-out infinite; }
        .animate-blob-3 { animation: blob3 28s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

/* --------- Tiny CountUp --------- */
const CountUp = ({ to = 0, duration = 1200, suffix = "" }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return (
    <span>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
};

export default function Hero() {
  const [showVideo, setShowVideo] = useState(false);
  const [rtl, setRtl] = useState(false);
  const [lang, setLang] = useState("en");
  const [donation, setDonation] = useState(250);
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${y * -3}deg`);
      el.style.setProperty("--ry", `${x * 3}deg`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const t = (key) => {
    const en = {
      titleTop: "Together We Rise",
      titleSub: "Building Hope Through Charity",
      lineA: "Secure • Transparent • Impactful",
      ctaDonate: "Donate Now",
      ctaExplore: "Explore Campaigns",
      trustA: "AML / Anti-fraud Monitoring",
      trustB: "End-to-End Encryption",
    };
    const ar = {
      titleTop: "معًا نرتقي",
      titleSub: "نبني الأمل عبر العطاء",
      lineA: "آمن • شفاف • مؤثر",
      ctaDonate: "تبرّع الآن",
      ctaExplore: "استكشف الحملات",
      trustA: "مكافحة غسل الأموال / مكافحة الاحتيال",
      trustB: "تشفير شامل من طرف إلى طرف",
    };
    return (lang === "ar" ? ar : en)[key];
  };

  const fee = Math.round(donation * 0.012);
  const net = donation - fee;

  return (
    <div dir={rtl ? "rtl" : "ltr"}>
      <section className="relative isolate min-h-[78vh] md:min-h-[86vh] overflow-hidden">
        {/* 🔥 Choose your background variant here: 'mesh' | 'image' | 'video' */}
        <Background variant="mesh" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
          <div className="pt-28 md:pt-36" />

          {/* control strip */}
          <div className="mb-4 flex flex-wrap items-center gap-2 text-white">
            <button
              onClick={() => setLang((v) => (v === "en" ? "ar" : "en"))}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur hover:bg-white/15 transition"
              title="Toggle language preview"
            >
              <FiGlobe /> {lang === "en" ? "EN" : "AR"}
            </button>
            <button
              onClick={() => setRtl((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur hover:bg-white/15 transition"
              title="Toggle RTL preview"
            >
              {rtl ? "LTR" : "RTL"}
            </button>
            <button
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur hover:bg-white/15 transition"
            >
              <FiPlay /> Watch Demo
            </button>
          </div>

          <div
            ref={heroRef}
            className="max-w-3xl text-white will-change-transform"
            style={{
              transform:
                "perspective(1200px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
              transition: "transform .12s ease-out",
            }}
          >
            {/* badges */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur">
                <FiCheckCircle /> RACA Verified
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur">
                <FiShield /> Sandi Integrated
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20 backdrop-blur">
                {t("lineA")}
              </span>
            </div>

            {/* headline */}
            <h1 className="text-balance text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">
              {t("titleTop")}
              <br />
              <span className="text-emerald-300">{t("titleSub")}</span>
            </h1>

            <div className="mt-4 h-1.5 w-36 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-600 shadow-[0_0_16px_rgba(16,185,129,.45)]" />

            <p className="mt-6 max-w-2xl text-lg/7 text-white/90">
              <span className="font-semibold">Transparency</span>,{" "}
              <span className="font-semibold">trust</span>, and{" "}
              <span className="font-semibold">real impact</span> — uniting donors,
              charities, and RACA to serve communities across Qatar.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href="#donate"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg ring-1 ring-emerald-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiHeart className="text-xl" />
                  {t("ctaDonate")}
                </span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.35),transparent)] animate-shine" />
                <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-0 w-0 rounded-full bg-white/30 opacity-0 group-active:animate-ripple" />
              </a>

              <a
                href="#campaigns"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/25 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 hover:ring-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <span className="flex items-center gap-2">
                  <FiArrowRight className="text-xl -scale-x-100" />
                  {t("ctaExplore")}
                </span>
              </a>
            </div>

            {/* trust line */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/85">
              <span className="inline-flex items-center gap-2">
                <FiCheckCircle className="text-emerald-300" /> {t("trustA")}
              </span>
              <span className="inline-flex items-center gap-2">
                <FiShield className="text-emerald-300" /> {t("trustB")}
              </span>
              <span className="inline-flex items-center gap-2">
                <FiActivity className="text-emerald-300" /> Reconciliation & KPI Dashboards
              </span>
            </div>
          </div>

          {/* KPIs + Impact mini */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6 text-white">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Donations Processed", value: 2500000, suffix: "+" },
                { label: "Charities Registered", value: 150, suffix: "+" },
                { label: "Donor Satisfaction", value: 98, suffix: "%" },
                { label: "Compliance", value: 100, suffix: "%" },
              ].map((k) => (
                <div
                  key={k.label}
                  className="rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur p-4 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="text-2xl font-extrabold">
                    <CountUp to={k.value} suffix={k.suffix} />
                  </div>
                  <div className="text-white/85 text-sm mt-1">{k.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur p-4">
              <div className="font-semibold mb-2">Estimate Your Impact</div>
              <div className="text-sm text-white/80 mb-3">Approximate figures for illustration</div>
              <div className="flex items-center justify-between text-sm">
                <span>QAR {donation}</span>
                <input
                  type="range"
                  min={50}
                  max={5000}
                  value={donation}
                  onChange={(e) => setDonation(parseInt(e.target.value, 10))}
                  className="mx-3 flex-1 accent-emerald-400"
                />
                <span>QAR 5,000</span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                <div className="rounded-lg bg-black/20 p-3 ring-1 ring-white/15">
                  <div className="text-xs text-white/70">Fees (est.)</div>
                  <div className="font-bold">QAR {Math.round(donation * 0.012)}</div>
                </div>
                <div className="rounded-lg bg-black/20 p-3 ring-1 ring-white/15">
                  <div className="text-xs text-white/70">Net Impact</div>
                  <div className="font-bold">QAR {donation - Math.round(donation * 0.012)}</div>
                </div>
                <div className="rounded-lg bg-black/20 p-3 ring-1 ring-white/15">
                  <div className="text-xs text-white/70">Confidence</div>
                  <div className="font-bold">RACA • Sandi</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-16 md:pb-24" />
        </div>

        {/* keyframes for hero */}
        <style>{`
          @keyframes shine { 0% { transform: translateX(-120%) } 100% { transform: translateX(120%) } }
          .animate-shine { animation: shine 1.2s ease-in-out infinite; }
          @keyframes ripple {
            0% { width: 0; height: 0; opacity: .7 }
            100% { width: 600px; height: 600px; opacity: 0 }
          }
          .group:active .group-active\\:animate-ripple { animation: ripple .6s ease-out both; }
        `}</style>
      </section>

      {/* ===== Sections with IDs (unchanged) ===== */}
      <section id="about-section"><WhoWeAre /></section>
      <section id="sandi-section"><SandiInfo /></section>
      <section id="mission-section"><MissionVisionValues /></section>
      <section id="how-section"><HowItWorks /></section>
      <section id="oversight-section"><OversightCompliance /></section>
      <section id="cta-section"><CallToAction /></section>

      {/* Demo modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl ring-1 ring-emerald-100 overflow-hidden animate-modalIn">
            <div className="p-4 flex items-center justify-between">
              <h5 className="font-extrabold text-green-900">Platform Overview (40s)</h5>
              <button onClick={() => setShowVideo(false)} className="rounded-full border border-emerald-200 px-3 py-1 text-xs hover:bg-emerald-50">
                Close
              </button>
            </div>
            <div className="aspect-video bg-emerald-900/5 grid place-items-center text-emerald-800">
              {/* Replace with your embed */}
              <div className="text-center px-6">
                <div className="text-2xl font-bold mb-1">Demo Placeholder</div>
                <div className="text-sm">Embed a product walkthrough video here.</div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-end gap-2">
              <a href="#how-section" className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-50">How It Works</a>
              <a href="#campaigns" className="rounded-full bg-emerald-600 text-white px-3 py-1.5 text-xs font-semibold shadow hover:brightness-105">Explore Campaigns</a>
            </div>
          </div>
          <style>{`
            @keyframes modalIn { from { transform: translateY(8px); opacity: .6 } to { transform: translateY(0); opacity: 1 } }
            .animate-modalIn { animation: modalIn .25s ease-out both; }
          `}</style>
        </div>
      )}
    </div>
  );
}
