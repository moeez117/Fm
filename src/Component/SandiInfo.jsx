import React, { useMemo, useState } from "react";
import {
  Shield as ShieldIcon,
  Database as DatabaseIcon,
  Users as UsersIcon,
  Network,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ScanSearch,
  Lock,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SandiInfo() {
  // Online fallbacks in case /public/about/* doesn't exist
  const FALLBACKS = {
    main:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1600&q=80",
    security:
      "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=1600&q=80",
    records:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80",
    collab:
      "https://images.unsplash.com/photo-1529336953121-a0db38aa7a3b?auto=format&fit=crop&w=1600&q=80",
  };

  const features = [
    {
      icon: ShieldIcon,
      title: "Fairness & Security",
      desc: "Prevents duplicate beneficiaries so aid reaches those who truly need it.",
      bg: "/about/Sandi-Security.jpg",
      fallback: FALLBACKS.security,
    },
    {
      icon: DatabaseIcon,
      title: "Unified Records",
      desc: "National database of charitable transactions for full auditability.",
      bg: "/about/Sandi-Records.jpg",
      fallback: FALLBACKS.records,
    },
    {
      icon: UsersIcon,
      title: "Collaboration",
      desc: "Connects charities, government, and donors for coordinated giving.",
      bg: "/about/Sandi-Collaboration.jpg",
      fallback: FALLBACKS.collab,
    },
  ];

  // Motion Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  };
  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: (delay = 0) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  };
  const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    visible: (delay = 0) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  // Main illustration with online fallback
  const [mainSrc, setMainSrc] = useState("/about/Sandi-Main.jpg");

  /* ─────────────── Deduplication mini-demo ─────────────── */
  const [qid, setQid] = useState("");
  const flagged = useMemo(
    () =>
      // demo list; replace with API check later
      new Set(["28403123456", "29011222333", "27899123450", "29001000001"]),
    []
  );
  const isDup = qid.length >= 6 && [...flagged].some((id) => id.startsWith(qid));
  const isExact = flagged.has(qid);

  return (
    <section className="relative overflow-hidden py-24 px-6 bg-gradient-to-b from-emerald-50 via-emerald-50/60 to-white">
      {/* ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -top-28 -left-28 w-[30rem] h-[30rem] rounded-full bg-emerald-200/45 blur-3xl animate-floatSlow" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-24 w-[30rem] h-[30rem] rounded-full bg-green-200/45 blur-3xl animate-floatSlow2" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Text */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 text-emerald-800 text-sm font-semibold ring-1 ring-emerald-300">
            <Network className="w-4 h-4" />
            National Aid Infrastructure
            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 ring-1 ring-emerald-300">
              <RefreshCw className="w-3 h-3 animate-spin-slow" />
              Sync OK
            </span>
          </div>

          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-emerald-950 leading-tight">
            What is{" "}
            <span className="bg-[linear-gradient(90deg,#86efac,#34d399,#10b981)] bg-clip-text text-transparent animate-gradient">
              Sandi
            </span>
            ?
          </h2>

          <div className="mt-4 h-1.5 w-28 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-green-500 shadow-[0_0_16px_rgba(16,185,129,.45)] animate-widthPulse" />

          <p className="mt-6 text-lg text-emerald-950/85 leading-relaxed">
            <span className="font-semibold text-emerald-900">Sandi</span> is
            Qatar’s{" "}
            <span className="font-semibold text-emerald-700">national platform</span>{" "}
            for charitable and social aid management. It ensures{" "}
            <span className="font-semibold text-emerald-700">
              fairness, security, and transparency
            </span>{" "}
            in donations by unifying data across organizations, preventing fraud,
            and building trust between donors, charities, and beneficiaries.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Lock, label: "Encrypted", sub: "End-to-end" },
              { icon: DatabaseIcon, label: "Unified", sub: "National records" },
              { icon: CheckCircle2, label: "RACA", sub: "Oversight" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="rounded-xl bg-white/80 ring-1 ring-emerald-200 p-3 shadow-sm flex items-center gap-3"
              >
                <div className="grid place-items-center w-10 h-10 rounded-lg bg-emerald-50 ring-1 ring-emerald-200">
                  <Icon className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-emerald-900">{label}</div>
                  <div className="text-xs text-emerald-800/80">{sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/sandi-info"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow-md ring-1 ring-emerald-500 hover:brightness-105 transition"
            >
              Learn More
            </a>
            <a
              href="/how-it-works"
              className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-emerald-800 font-semibold shadow-sm ring-1 ring-emerald-300 hover:bg-emerald-50 transition"
            >
              How It Works
            </a>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
          whileHover={{
            rotateX: 1.2,
            rotateY: -1.2,
            y: -4,
            transition: { type: "spring", stiffness: 200, damping: 16 },
          }}
          style={{ transformPerspective: 900 }}
        >
          <div className="p-[3px] rounded-3xl bg-gradient-to-br from-emerald-200 via-emerald-400 to-emerald-600">
            <img
              src={mainSrc}
              alt="Sandi Integration Diagram"
              className="w-full rounded-[22px] shadow-2xl"
              loading="lazy"
              decoding="async"
              onError={() => setMainSrc(FALLBACKS.main)}
            />
          </div>
          {/* soft glow */}
          <div aria-hidden className="absolute -inset-4 rounded-[28px] bg-emerald-300/25 blur-2xl" />
        </motion.div>
      </div>

      {/* Steps: Data flow */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0.15}
        className="max-w-7xl mx-auto mt-16"
      >
        <div className="rounded-2xl bg-white/80 ring-1 ring-emerald-200 p-5 md:p-6 shadow-sm">
          <div className="text-sm font-semibold text-emerald-900 mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Data Flow (Donor → Impact)
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              "Donor",
              "Charity",
              "Sandi",
              "Beneficiary",
              "RACA Oversight",
            ].map((s, i) => (
              <div
                key={s}
                className="relative rounded-xl bg-emerald-50 ring-1 ring-emerald-200 px-4 py-3 text-center text-emerald-900 font-semibold"
              >
                <span>{s}</span>
                {i < 4 && (
                  <span
                    aria-hidden
                    className="hidden md:block absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-[2px] bg-emerald-300"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-7xl mx-auto">
        {features.map((f, i) => {
          const Icon = f.icon;
          const bgStyle = {
            // dual background: local first, then online fallback
            backgroundImage: `url(${f.bg}), url('${f.fallback}')`,
          };
          return (
            <motion.div
              key={i}
              className="relative group rounded-2xl overflow-hidden shadow-lg ring-1 ring-emerald-200/60 hover:ring-emerald-400/70 transition-all duration-500 cursor-pointer"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i * 0.18}
              whileHover={{
                y: -6,
                rotateX: 1.2,
                rotateY: -1.2,
                transition: { type: "spring", stiffness: 220, damping: 16 },
              }}
              style={{ transformPerspective: 900 }}
            >
              {/* Background with fallback */}
              <div
                className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-110 transition-transform duration-700"
                style={bgStyle}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 via-emerald-700/55 to-emerald-500/40" />
              </div>

              {/* Shine sweep */}
              <span className="pointer-events-none absolute -inset-y-10 -left-1/3 w-1/3 bg-white/30 blur-md rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shine" />

              {/* Overlay + Content */}
              <div className="relative z-10 p-8 text-center flex flex-col items-center justify-end h-72">
                <div className="mb-4 relative">
                  <div className="absolute inset-0 rounded-xl bg-white/15 animate-pingSlow" />
                  <div className="relative w-14 h-14 rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-white/30 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white drop-shadow-sm">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/95 max-w-[90%] mx-auto">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Deduplication Demo */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0.2}
        className="max-w-7xl mx-auto mt-16"
      >
        <div className="rounded-2xl bg-white/85 ring-1 ring-emerald-200 p-6 md:p-8 shadow-lg">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-emerald-900 font-semibold">
              <ScanSearch className="w-5 h-5" />
              Beneficiary Check (demo)
            </div>
            <div className="text-xs text-emerald-800/80">
              Type a sample QID like <span className="font-semibold">28403123456</span> or just start with{" "}
              <span className="font-semibold">29001…</span>
            </div>
          </div>

          <div className="mt-4 grid md:grid-cols-[1fr,auto] gap-3">
            <input
              value={qid}
              onChange={(e) => setQid(e.target.value.replace(/[^\d]/g, "").slice(0, 11))}
              inputMode="numeric"
              placeholder="Enter Beneficiary ID (QID)"
              className="w-full rounded-xl border border-emerald-200 bg-white/70 px-4 py-3 text-emerald-900 placeholder:emerald-800/60 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              aria-label="Beneficiary ID"
            />
            <div
              className={[
                "inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ring-1",
                isExact
                  ? "bg-red-50 text-red-700 ring-red-200"
                  : isDup
                  ? "bg-amber-50 text-amber-700 ring-amber-200"
                  : qid
                  ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                  : "bg-white text-emerald-800 ring-emerald-200",
              ].join(" ")}
              role="status"
            >
              {isExact ? (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  Duplicate Found
                </>
              ) : isDup ? (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  Potential Duplicate
                </>
              ) : qid ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Clear — no matches
                </>
              ) : (
                "Awaiting input…"
              )}
            </div>
          </div>

          <p className="mt-3 text-xs text-emerald-800/75">
            * Demo only. In production, this input would securely query Sandi’s registry with proper consent, encryption, and audit logging.
          </p>
        </div>
      </motion.div>

      {/* local animation helpers */}
      <style>{`
        @keyframes gradientMove { 0% { background-position: 0% 50% } 100% { background-position: 100% 50% } }
        .animate-gradient { background-size: 200% 200%; animation: gradientMove 7s ease-in-out infinite alternate; }

        @keyframes shine { 0% { transform: translateX(-120%) } 100% { transform: translateX(220%) } }
        .animate-shine { animation: shine 1.4s ease-in-out both; }

        @keyframes pingSlow { 0% { opacity:.45 } 70% { opacity:0 } 100% { opacity:0 } }
        .animate-pingSlow { animation: pingSlow 2.6s ease-out infinite; }

        @keyframes floatSlow { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        @keyframes floatSlow2 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(12px) } }
        .animate-floatSlow { animation: floatSlow 12s ease-in-out infinite; }
        .animate-floatSlow2 { animation: floatSlow2 14s ease-in-out infinite; }

        @keyframes widthPulse { 0%,100% { transform: scaleX(1) } 50% { transform: scaleX(1.15) } }
        .animate-widthPulse { transform-origin: center; animation: widthPulse 5s ease-in-out infinite; }

        .animate-spin-slow { animation: spin 2.4s linear infinite; }
      `}</style>
    </section>
  );
}
