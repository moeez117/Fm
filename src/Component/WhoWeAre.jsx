import React, { useMemo, useRef, useState } from "react";
import {
  Shield,
  Users,
  HeartHandshake,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  FileDown,
  ExternalLink,
  Building2,
} from "lucide-react";
import { motion, useInView } from "framer-motion";

/* ───────────────────────── helpers ───────────────────────── */

const useCountUp = (end = 0, active = false, duration = 1.2) => {
  // returns text (e.g., "2,500+") once in view
  const steps = 60 * duration;
  const nums = useMemo(() => {
    const arr = [];
    for (let i = 0; i <= steps; i++) arr.push(Math.round((i / steps) * end));
    return arr;
  }, [end, duration]);
  const [idx, setIdx] = useState(0);
  React.useEffect(() => {
    if (!active) return;
    if (idx >= nums.length - 1) return;
    const id = setTimeout(() => setIdx((i) => Math.min(i + 1, nums.length - 1)), 1000 / 60);
    return () => clearTimeout(id);
  }, [idx, nums.length, active]);
  return nums[idx].toLocaleString();
};

// motion variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};
const zoomIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1],
      type: "spring",
      stiffness: 140,
      damping: 16,
    },
  }),
};

export default function WhoWeAre() {
  const values = [
    {
      icon: Shield,
      title: "Security",
      desc: "Every donation is encrypted, monitored, and protected under Qatar’s compliance laws.",
      bg: "/about/WhoWeAre-Security.jpg",
      href: "/oversight-compliance",
    },
    {
      icon: Users,
      title: "Transparency",
      desc: "Track your donations with complete visibility from donor to beneficiary.",
      bg: "/about/WhoWeAre-Transparency.jpg",
      href: "/how-it-works",
    },
    {
      icon: HeartHandshake,
      title: "Trust",
      desc: "Backed by RACA & integrated with Sandi for fairness and accountability.",
      bg: "/about/WhoWeAre-Trust.jpg",
      href: "/sandi-info",
    },
  ];

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-20% 0px -20% 0px" });

  const donors = useCountUp(2500000, statsInView); // Donations Processed
  const charities = useCountUp(150, statsInView);
  const satisfaction = useCountUp(98, statsInView);
  const compliance = useCountUp(100, statsInView);

  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="relative overflow-hidden pt-28 pb-20 px-6 max-w-7xl mx-auto bg-white">
      {/* ambient orbs */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-28 w-[28rem] h-[28rem] rounded-full bg-emerald-200/45 blur-3xl animate-floatSlow" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -right-24 w-[28rem] h-[28rem] rounded-full bg-green-200/45 blur-3xl animate-floatSlow2" />

      {/* header */}
      <div className="text-center mb-10 relative">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          custom={0.05}
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium gap-2"
        >
          <Building2 className="w-4 h-4" />
          Qatar’s National Giving Network
        </motion.div>

        <motion.h2
          className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.12}
        >
          <span className="bg-[linear-gradient(90deg,#0f172a,#065f46,#10b981,#0f172a)] bg-clip-text text-transparent animate-gradient">
            Who We Are
          </span>
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
          className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-green-500 shadow-[0_0_16px_rgba(16,185,129,.45)] animate-widthPulse"
        />

        <motion.p
          className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-slate-700"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.28}
        >
          We are Qatar’s trusted national donation platform, dedicated to building{" "}
          <span className="font-semibold bg-[linear-gradient(90deg,#34d399,#10b981)] bg-clip-text text-transparent">
            secure
          </span>
          ,{" "}
          <span className="font-semibold bg-[linear-gradient(90deg,#34d399,#10b981)] bg-clip-text text-transparent">
            transparent
          </span>{" "}
          and{" "}
          <span className="font-semibold bg-[linear-gradient(90deg,#34d399,#10b981)] bg-clip-text text-transparent">
            impactful
          </span>{" "}
          giving experiences.
        </motion.p>

        {/* quick actions */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.36}
          className="mt-6 flex items-center justify-center gap-3"
        >
          <button
            onClick={() => setShowVideo(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white font-semibold shadow hover:brightness-105 transition"
          >
            <PlayCircle className="w-5 h-5" />
            Watch 40s Overview
          </button>
          <a
            href="/who-we-are"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-300 text-emerald-700 font-semibold bg-white hover:bg-emerald-50 transition"
          >
            Learn More
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* stats */}
      <div
        ref={statsRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
        aria-label="platform stats"
      >
        {[
          { label: "Donations Processed", value: donors, suffix: "+" },
          { label: "Charities Registered", value: charities, suffix: "+" },
          { label: "Donor Satisfaction", value: satisfaction, suffix: "%" },
          { label: "Compliance", value: compliance, suffix: "%" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            variants={zoomIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={i * 0.12}
            className="rounded-2xl bg-gradient-to-br from-emerald-50 to-white ring-1 ring-emerald-100 p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="text-2xl font-extrabold text-emerald-700">
              {s.value}
              {s.suffix}
            </div>
            <div className="text-sm text-slate-700 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {values.map((v, i) => {
          const Icon = v.icon;
          return (
            <motion.article
              key={i}
              variants={zoomIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i * 0.18}
              whileHover={{
                y: -6,
                rotateX: 1.2,
                rotateY: -1.2,
                transition: { type: "spring", stiffness: 220, damping: 16 },
              }}
              style={{ transformPerspective: 900 }}
              className="relative group rounded-2xl p-[1px] bg-gradient-to-b from-emerald-300/70 via-emerald-400/40 to-emerald-500/60 shadow-lg hover:shadow-emerald-200/80 transition-all duration-500"
            >
              {/* inner */}
              <div className="relative rounded-2xl overflow-hidden bg-white">
                {/* bg image */}
                <div
                  className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${v.bg})` }}
                  role="img"
                  aria-label={v.title}
                />
                {/* tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-800/70 via-emerald-700/55 to-emerald-500/45 mix-blend-multiply" />
                {/* shine */}
                <span className="pointer-events-none absolute -inset-y-10 -left-1/3 w-1/3 bg-white/30 blur-md rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shine" />

                {/* content */}
                <div className="relative p-8 md:p-10 text-center text-white flex flex-col justify-end min-h-[18rem]">
                  <div className="mx-auto mb-5 relative">
                    <div className="absolute inset-0 rounded-2xl bg-white/15 animate-pingSlow" />
                    <div className="relative w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/30 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold tracking-wide drop-shadow-sm">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-white/95">
                    {v.desc}
                  </p>

                  {/* actions */}
                  <div className="mt-5 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={v.href}
                      className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-4 py-2 text-sm ring-1 ring-white/30 hover:bg-white/25 transition"
                    >
                      Learn more <ArrowRight className="w-4 h-4" />
                    </a>
                    <button
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-500/90 px-4 py-2 text-sm ring-1 ring-white/40 hover:brightness-105 transition"
                      onClick={() => setShowVideo(true)}
                    >
                      <PlayCircle className="w-4 h-4" />
                      Watch
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* mission block */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        custom={0.45}
        className="relative mt-16 overflow-hidden rounded-3xl shadow-xl ring-1 ring-emerald-200/70 bg-white"
      >
        {/* faint grid */}
        <div aria-hidden className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="22" height="22" patternUnits="userSpaceOnUse">
                <path d="M 22 0 L 0 0 0 22" fill="none" stroke="#10b981" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative p-8 md:p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Our Mission
          </h3>
          <p className="mt-5 max-w-3xl mx-auto leading-relaxed text-lg text-slate-700">
            To revolutionize charitable giving in Qatar by combining{" "}
            <span className="font-semibold text-emerald-600">innovation</span>,{" "}
            <span className="font-semibold text-emerald-600">compliance</span>, and{" "}
            <span className="font-semibold text-emerald-600">compassion</span> — ensuring every
            contribution reaches those in need with maximum impact.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="/mission-vision-values"
              className="relative inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-500 text-white font-semibold shadow-md hover:shadow-emerald-300/60 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="relative z-10">Mission, Vision & Values</span>
              <span className="pointer-events-none absolute -inset-y-8 -left-1/2 w-1/2 bg-white/40 blur-md rotate-12 opacity-0 hover:opacity-100 transition-opacity duration-500 animate-shine" />
            </a>
            <a
              href="/oversight-compliance"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-emerald-300 text-emerald-700 font-semibold bg-white hover:bg-emerald-50 transition"
            >
              Oversight & Compliance <CheckCircle2 className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* partners (auto-scroll) */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        custom={0.55}
        className="mt-14"
      >
        <div className="text-center text-sm font-semibold text-slate-600 mb-3">
          Trusted in partnership with
        </div>
        <div className="relative overflow-hidden rounded-xl ring-1 ring-emerald-100 bg-gradient-to-br from-emerald-50 to-white">
          <div className="flex items-center gap-10 animate-scrollLogos py-4 px-6">
            {/* replace with real logos */}
            {["RACA", "Sandi", "Qatar Charity", "QRCS", "EAA", "MOF"].map((n) => (
              <div
                key={n}
                className="shrink-0 rounded-lg px-4 py-2 bg-white ring-1 ring-emerald-100 text-emerald-700 text-sm font-semibold shadow-sm"
              >
                {n}
              </div>
            ))}
            {/* dup for seamless loop */}
            {["RACA", "Sandi", "Qatar Charity", "QRCS", "EAA", "MOF"].map((n, i) => (
              <div
                key={`${n}-dup-${i}`}
                className="shrink-0 rounded-lg px-4 py-2 bg-white ring-1 ring-emerald-100 text-emerald-700 text-sm font-semibold shadow-sm"
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA strip */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        custom={0.65}
        className="mt-14 grid gap-3 sm:grid-cols-2"
      >
        <a
          href="/contact-form"
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 text-white px-6 py-3 font-semibold shadow hover:brightness-105 transition"
        >
          Contact RACA <ExternalLink className="w-4 h-4" />
        </a>
        <a
          href="/download/brochure.pdf"
          className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-emerald-700 ring-1 ring-emerald-300 hover:bg-emerald-50 transition"
        >
          <FileDown className="w-4 h-4" />
          Download Brochure
        </a>
      </motion.div>

      {/* video modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl ring-1 ring-emerald-100 overflow-hidden animate-modalIn">
            <div className="p-4 flex items-center justify-between">
              <h5 className="font-extrabold text-green-900">About the Platform (40s)</h5>
              <button
                onClick={() => setShowVideo(false)}
                className="rounded-full border border-emerald-200 px-3 py-1 text-xs hover:bg-emerald-50"
              >
                Close
              </button>
            </div>
            <div className="aspect-video bg-emerald-900/5 grid place-items-center text-emerald-800">
              {/* Replace with your real embed */}
              <iframe
                title="About the Platform"
                src="about:blank"
                className="w-full h-full"
              />
            </div>
            <div className="p-4 flex items-center justify-end gap-2">
              <a
                href="/how-it-works"
                className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-50"
              >
                How It Works
              </a>
              <a
                href="/donate"
                className="rounded-full bg-emerald-600 text-white px-3 py-1.5 text-xs font-semibold shadow hover:brightness-105"
              >
                Donate Now
              </a>
            </div>
          </div>
          <style>{`
            @keyframes modalIn { from { transform: translateY(8px); opacity: .6 } to { transform: translateY(0); opacity: 1 } }
            .animate-modalIn { animation: modalIn .25s ease-out both; }
          `}</style>
        </div>
      )}

      {/* local helpers */}
      <style>{`
        @keyframes gradientMove { 0% { background-position: 0% 50% } 100% { background-position: 100% 50% } }
        .animate-gradient { background-size: 200% 200%; animation: gradientMove 7s ease-in-out infinite alternate; }

        @keyframes shine { 0% { transform: translateX(-120%) } 100% { transform: translateX(220%) } }
        .animate-shine { animation: shine 1.4s ease-in-out both; }

        @keyframes pingSlow { 0% { opacity: .45 } 70% { opacity: 0 } 100% { opacity: 0 } }
        .animate-pingSlow { animation: pingSlow 2.6s ease-out infinite; }

        @keyframes floatSlow { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        @keyframes floatSlow2 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(12px) } }
        .animate-floatSlow { animation: floatSlow 12s ease-in-out infinite; }
        .animate-floatSlow2 { animation: floatSlow2 14s ease-in-out infinite; }

        @keyframes widthPulse { 0%,100% { transform: scaleX(1) } 50% { transform: scaleX(1.15) } }
        .animate-widthPulse { transform-origin: center; animation: widthPulse 5s ease-in-out infinite; }

        @keyframes scrollLogos {
          0% { transform: translateX(0) }
          100% { transform: translateX(-50%) }
        }
        .animate-scrollLogos {
          width: max-content;
          animation: scrollLogos 18s linear infinite;
        }
      `}</style>
    </section>
  );
}
