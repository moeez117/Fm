import React, { useEffect, useRef, useState } from "react";
import { Eye, Target, Lightbulb, ShieldCheck, Gauge, Timer, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* tiny countup without extra deps */
const useCountUp = (end = 0, active = false, duration = 1200) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      // easeOutCubic
      setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, active, duration]);
  return val;
};

export default function MissionVisionValues() {
  const values = [
    {
      icon: Target,
      title: "Compliance",
      desc: "Strictly aligned with RACA regulations to ensure all donations are legitimate and ethical.",
      gradient: "from-[palegreen] via-green-300 to-green-400",
    },
    {
      icon: Eye,
      title: "Transparency",
      desc: "Donors, charities, and regulators enjoy complete visibility into donation flows.",
      gradient: "from-[palegreen] via-green-400 to-green-500",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      desc: "Integrating Blockchain, AI, and AR/VR to redefine digital giving in Qatar.",
      gradient: "from-[palegreen] via-green-500 to-green-600",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay },
    }),
  };

  /* ── Mission / Vision tabs ───────────────────────────── */
  const [tab, setTab] = useState("mission");
  const tabs = [
    {
      id: "mission",
      label: "Mission",
      title: "Mission",
      body: (
        <>
          To provide a <span className="font-semibold">secure, transparent, and efficient</span> digital
          donation system that ensures fairness and accountability across Qatar.
        </>
      ),
    },
    {
      id: "vision",
      label: "Vision",
      title: "Vision",
      body: (
        <>
          To create a future where <span className="font-semibold">every donation is traceable, impactful, and trusted</span> —
          driving social progress in Qatar and beyond.
        </>
      ),
    },
  ];
  const activeIdx = tabs.findIndex((t) => t.id === tab);

  /* ── KPI countups when visible ───────────────────────── */
  const [inView, setInView] = useState(false);
  const kpiRef = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (ents) => {
        if (ents[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    if (kpiRef.current) io.observe(kpiRef.current);
    return () => io.disconnect();
  }, []);
  const k1 = useCountUp(100, inView); // % Compliant
  const k2 = useCountUp(98, inView);  // % Transparency score
  const k3 = useCountUp(12, inView);  // hrs Avg processing
  const k4 = useCountUp(98, inView);  // % satisfaction

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-emerald-50 via-emerald-50/60 to-white">
      {/* ambient glows */}
      <div aria-hidden className="pointer-events-none absolute -top-28 -left-28 w-[30rem] h-[30rem] rounded-full bg-emerald-200/45 blur-3xl animate-floatSlow" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-24 w-[30rem] h-[30rem] rounded-full bg-green-200/45 blur-3xl animate-floatSlow2" />

      {/* Section Title */}
      <motion.div
        className="text-center max-w-3xl mx-auto"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={0}
      >
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/80 text-emerald-700 text-sm font-semibold ring-1 ring-emerald-200 shadow-sm">
          Our North Star
        </div>
        <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-[linear-gradient(90deg,#065f46,#10b981,#059669)] bg-clip-text text-transparent animate-gradient">
            Mission, Vision & Values
          </span>
        </h2>
        <p className="mt-4 text-lg text-emerald-900/80">
          Guided by integrity, innovation, and compliance, we’re building Qatar’s most trusted
          digital donation ecosystem.
        </p>
        <div className="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-green-500 shadow-[0_0_16px_rgba(16,185,129,.45)] animate-widthPulse" />
      </motion.div>

      {/* Mission / Vision Tabs */}
      <div className="mt-12 max-w-5xl mx-auto">
        {/* slider tabs */}
        <div className="relative mx-auto max-w-xl mb-6">
          <div className="relative flex items-center rounded-2xl bg-emerald-50 p-2 ring-1 ring-emerald-200 shadow-sm">
            <div
              className="absolute top-2 bottom-2 left-2 w-1/2 rounded-xl bg-white shadow-md ring-1 ring-emerald-200 transition-all duration-300 ease-out"
              style={{ left: `calc(${activeIdx * 50}% + 0.5rem)` }}
              aria-hidden
            />
            <div className="relative z-10 grid grid-cols-2 gap-2 w-full">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-colors ${
                    tab === t.id ? "text-emerald-700" : "text-emerald-900/70 hover:text-emerald-700"
                  }`}
                  aria-pressed={tab === t.id}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* content cards */}
        <div className="grid md:grid-cols-2 gap-12">
          <AnimatePresence mode="wait">
            {tabs
              .filter((t) => t.id === tab)
              .map((t) => (
                <motion.div
                  key={t.id}
                  className="p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-md border border-emerald-100 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                >
                  {/* corner gloss */}
                  <span className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/30 blur-2xl" />
                  <h3 className="text-2xl font-semibold text-emerald-700">{t.title}</h3>
                  <p className="mt-3 text-emerald-900/80 leading-relaxed">{t.body}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
                      <ShieldCheck className="w-4 h-4" />
                      RACA Aligned
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
                      <Gauge className="w-4 h-4" />
                      KPI Driven
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
                      <Eye className="w-4 h-4" />
                      End-to-End Visibility
                    </span>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>

          {/* mini timeline / pillars */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.15}
            className="p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-md border border-emerald-100"
          >
            <h4 className="text-xl font-semibold text-emerald-700">Pillars of Impact</h4>
            <ol className="mt-4 space-y-5">
              {[
                { title: "Regulated Compliance", desc: "RACA approvals, AML, audit logs." },
                { title: "Transparent Operations", desc: "Real-time tracking & public reports." },
                { title: "Responsible Innovation", desc: "Blockchain, AI signals, AR/VR impacts." },
              ].map((p, i) => (
                <li key={p.title} className="relative pl-6">
                  <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-emerald-500" />
                  <div className="text-emerald-900 font-semibold">{p.title}</div>
                  <div className="text-emerald-900/75 text-sm">{p.desc}</div>
                </li>
              ))}
            </ol>
            <div className="mt-6 h-1.5 w-20 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-green-500" />
          </motion.div>
        </div>
      </div>

      {/* Values */}
      <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
        {values.map((v, i) => {
          const Icon = v.icon;
          return (
            <motion.div
              key={i}
              className={`relative p-[1px] rounded-2xl shadow-lg bg-gradient-to-br ${v.gradient}`}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.25 + i * 0.1}
              whileHover={{
                y: -8,
                rotateX: 1.2,
                rotateY: -1.2,
                transition: { type: "spring", stiffness: 220, damping: 16 },
              }}
              style={{ transformPerspective: 900 }}
            >
              <div className="relative rounded-2xl overflow-hidden bg-white/5">
                {/* animated sheen */}
                <span className="pointer-events-none absolute -inset-y-10 -left-1/3 w-1/3 bg-white/30 blur-md rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shine" />
                {/* card body */}
                <div className="relative z-10 text-center p-8 text-white min-h-[220px] flex flex-col justify-center backdrop-blur-sm">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-white/15 ring-1 ring-white/30 grid place-items-center mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold">{v.title}</h3>
                  <p className="mt-3 text-sm md:text-base text-white/95 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* KPI strip */}
      <div
        ref={kpiRef}
        className="mt-16 grid gap-4 md:grid-cols-4 max-w-6xl mx-auto"
        aria-label="Mission KPIs"
      >
        {[
          { icon: ShieldCheck, label: "Compliant Campaigns", value: `${k1}%` },
          { icon: Eye, label: "Transparency Score", value: `${k2}%` },
          { icon: Timer, label: "Avg Approval Time", value: `${k3}h` },
          { icon: Smile, label: "Stakeholder Satisfaction", value: `${k4}%` },
        ].map(({ icon: Ico, label, value }) => (
          <div
            key={label}
            className="rounded-2xl bg-white/90 backdrop-blur ring-1 ring-emerald-100 shadow-sm p-5 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl grid place-items-center bg-emerald-50 ring-1 ring-emerald-200">
              <Ico className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-emerald-700">{value}</div>
              <div className="text-sm text-emerald-900/90">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <a
          href="/oversight-compliance"
          className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow-md hover:brightness-105 hover:-translate-y-0.5 transition-all duration-300 ring-1 ring-emerald-500"
        >
          Learn more about our Oversight
        </a>
      </div>

      {/* local helpers */}
      <style>{`
        @keyframes gradientMove { 
          0% { background-position: 0% 50% } 
          100% { background-position: 100% 50% } 
        }
        .animate-gradient { background-size: 200% 200%; animation: gradientMove 7s ease-in-out infinite alternate; }

        @keyframes widthPulse { 0%,100% { transform: scaleX(1) } 50% { transform: scaleX(1.12) } }
        .animate-widthPulse { transform-origin: center; animation: widthPulse 5s ease-in-out infinite; }

        @keyframes shine { 0% { transform: translateX(-120%) } 100% { transform: translateX(220%) } }
        .animate-shine { animation: shine 1.2s ease-in-out both; }

        @keyframes floatSlow { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        @keyframes floatSlow2 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(12px) } }
        .animate-floatSlow { animation: floatSlow 12s ease-in-out infinite; }
        .animate-floatSlow2 { animation: floatSlow2 14s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
