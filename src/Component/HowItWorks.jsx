import React, { useEffect, useRef, useState } from "react";
import { Users, HeartHandshake, ShieldCheck, Eye, Shield, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function HowItWorks() {
  const prefersReduced = useReducedMotion();

  const steps = [
    {
      key: "donor",
      icon: <Users className="w-10 h-10 text-emerald-600" />,
      title: "Donor",
      desc: "Chooses a campaign and makes a secure donation.",
      details: [
        "Multiple payments: card, bank transfer, QR, wallet",
        "Instant receipts + donation dashboard",
        "Anonymous or public giving options",
      ],
      cta: { label: "Start Donating", href: "/donate" },
    },
    {
      key: "charity",
      icon: <HeartHandshake className="w-10 h-10 text-emerald-600" />,
      title: "Charity",
      desc: "Receives funds and manages aid distribution.",
      details: [
        "Campaign creation & document upload",
        "Beneficiary assignment & disbursement logs",
        "Auto-reports for RACA compliance",
      ],
      cta: { label: "Register Charity", href: "/signup" },
    },
    {
      key: "sandi",
      icon: <ShieldCheck className="w-10 h-10 text-emerald-600" />,
      title: "Sandi Sync",
      desc: "Ensures no duplicate beneficiaries.",
      details: [
        "Beneficiary data synced with Sandi",
        "Prevents duplicate aid across orgs",
        "Unified national visibility",
      ],
      cta: { label: "Learn About Sandi", href: "/sandi-info" },
    },
    {
      key: "raca",
      icon: <Eye className="w-10 h-10 text-emerald-600" />,
      title: "Authority (RACA)",
      desc: "Monitors donations in real-time.",
      details: [
        "Approvals, AML alerts & KPI dashboards",
        "Blockchain-backed audit trails",
        "Automated financial/compliance reports",
      ],
      cta: { label: "Oversight & Compliance", href: "/oversight-compliance" },
    },
  ];

  // active step & autoplay
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || prefersReduced) return;
    const id = setInterval(() => setActive((i) => (i + 1) % steps.length), 5000);
    return () => clearInterval(id);
  }, [paused, prefersReduced, steps.length]);

  // keyboard & swipe
  const sectionRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % steps.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + steps.length) % steps.length);
    };
    const el = sectionRef.current;
    el?.addEventListener("keydown", onKey);
    return () => el?.removeEventListener("keydown", onKey);
  }, [steps.length]);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const onTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 60) setActive((i) => (i + 1) % steps.length);
    if (touchEndX.current - touchStartX.current > 60) setActive((i) => (i - 1 + steps.length) % steps.length);
  };

  // details modal
  const [openModal, setOpenModal] = useState(null);

  const item = (i) => ({
    hidden: { opacity: 0, scale: 0.85, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
    },
  });

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-emerald-50 to-white focus:outline-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="How it works process"
    >
      {/* ambient orbs + subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-20 w-[26rem] h-[26rem] rounded-full bg-emerald-200/40 blur-3xl animate-floatSoft"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -right-16 w-[28rem] h-[28rem] rounded-full bg-emerald-200/40 blur-3xl animate-floatSoft2"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,#1f2937_1px,transparent_1px)] [background-size:14px_14px]"
      />

      {/* heading + badges */}
      <motion.h2
        className="relative text-3xl md:text-4xl font-extrabold text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <span className="bg-[linear-gradient(90deg,#86efac,#34d399,#10b981)] bg-clip-text text-transparent animate-gradient">
          How It Works
        </span>
      </motion.h2>
      <motion.p
        className="mt-4 text-center text-emerald-900/70 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        viewport={{ once: true }}
      >
        A clear, compliant, and transparent flow—optimized for donors, charities, Sandi, and RACA.
      </motion.p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          RACA Verified
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
          <Shield className="w-4 h-4 text-emerald-600" />
          Sandi Synced
        </span>
      </div>

      {/* progress bar (syncs to active) */}
      <div className="relative max-w-4xl mx-auto mt-10">
        <div className="h-2 rounded-full bg-emerald-100/70 overflow-hidden ring-1 ring-emerald-200/60" />
        <motion.div
          className="absolute inset-y-0 left-0 h-2 bg-gradient-to-r from-emerald-300 via-emerald-500 to-green-600"
          style={{ width: `${((active + 1) / steps.length) * 100}%` }}
          initial={false}
          animate={{ width: `${((active + 1) / steps.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 130, damping: 18 }}
        />
      </div>

      {/* track (desktop) */}
      <div className="mt-16 relative max-w-6xl mx-auto">
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 rounded-full bg-emerald-200/40 -z-10" />
        <motion.div
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-green-500 shadow-[0_0_16px_rgba(16,185,129,.45)] -z-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{ transformOrigin: "left", width: "100%" }}
        />

        {/* steps */}
        <div className="grid md:grid-cols-4 gap-12 md:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              className="relative group flex flex-col items-center text-center"
              variants={item(i)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                y: -6,
                rotateX: 1.2,
                rotateY: -1.2,
                transition: { type: "spring", stiffness: 200, damping: 16 },
              }}
              style={{ transformPerspective: 900 }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              {/* Icon bubble + tooltip */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-white/15 animate-pingSlow" />
                <div
                  className={`flex items-center justify-center w-20 h-20 rounded-full bg-white backdrop-blur-sm ring-2 transition-all ${
                    active === i ? "ring-emerald-500 shadow-lg scale-[1.03]" : "ring-emerald-200 shadow-md"
                  }`}
                  aria-describedby={`tip-${step.key}`}
                >
                  {step.icon}
                </div>

                {/* tooltip */}
                <div
                  id={`tip-${step.key}`}
                  role="tooltip"
                  className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-emerald-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                >
                  {step.title}
                </div>

                {/* index badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-200 text-emerald-900 font-bold text-sm flex items-center justify-center shadow">
                  {i + 1}
                </div>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-emerald-900">{step.title}</h3>
              <p className="mt-3 text-emerald-900/70 max-w-[18rem]">{step.desc}</p>

              <div className="mt-5 flex gap-2">
                <a
                  href={step.cta.href}
                  className="rounded-lg bg-emerald-600 text-white text-sm font-semibold px-3 py-2 ring-1 ring-emerald-500 hover:brightness-105"
                >
                  {step.cta.label}
                </a>
                <button
                  onClick={() => setOpenModal(step.key)}
                  className="rounded-lg bg-white text-emerald-800 text-sm font-semibold px-3 py-2 ring-1 ring-emerald-300 hover:bg-emerald-50"
                >
                  Details
                </button>
              </div>

              {/* Dot on the desktop line for alignment/visual cue */}
              <div className="hidden md:block mt-6 w-3 h-3 rounded-full bg-white ring-4 ring-emerald-200/50 shadow" />

              {/* Mobile vertical connector */}
              {i !== steps.length - 1 && <div className="md:hidden w-1 h-12 bg-emerald-200/40 mt-6 rounded-full" />}
            </motion.div>
          ))}
        </div>
      </div>

      {/* mobile next/prev */}
      <div className="mt-10 flex justify-center gap-3 md:hidden">
        <button
          onClick={() => setActive((i) => (i - 1 + steps.length) % steps.length)}
          className="rounded-full bg-white px-4 py-2 ring-1 ring-emerald-300 text-emerald-800"
        >
          ‹ Prev
        </button>
        <button
          onClick={() => setActive((i) => (i + 1) % steps.length)}
          className="rounded-full bg-emerald-600 px-4 py-2 text-white ring-1 ring-emerald-500"
        >
          Next ›
        </button>
      </div>

      {/* modal */}
      {openModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[90] grid place-items-center p-4"
          onClick={() => setOpenModal(null)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-emerald-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-emerald-100 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-emerald-900">
                {steps.find((s) => s.key === openModal)?.title} — Details
              </h4>
              <button
                onClick={() => setOpenModal(null)}
                className="rounded-lg px-2 py-1 text-emerald-700 hover:bg-emerald-50"
                aria-label="Close details"
              >
                ✕
              </button>
            </div>
            <div className="p-5">
              <ul className="space-y-2">
                {steps
                  .find((s) => s.key === openModal)
                  ?.details.map((d, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 ring-1 ring-emerald-200 text-emerald-700 text-xs">
                        ✓
                      </span>
                      <span className="text-emerald-900/90">{d}</span>
                    </li>
                  ))}
              </ul>
              <div className="mt-5 flex justify-end">
                {steps.find((s) => s.key === openModal)?.cta && (
                  <a
                    href={steps.find((s) => s.key === openModal)?.cta.href}
                    className="rounded-lg bg-emerald-600 text-white text-sm font-semibold px-4 py-2 ring-1 ring-emerald-500 hover:brightness-105"
                  >
                    {steps.find((s) => s.key === openModal)?.cta.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Local helpers */}
      <style>{`
        @keyframes gradientMove { 0% { background-position: 0% 50% } 100% { background-position: 100% 50% } }
        .animate-gradient { background-size: 200% 200%; animation: gradientMove 7s ease-in-out infinite alternate; }

        @keyframes pingSlow { 0% { opacity:.45 } 70% { opacity:0 } 100% { opacity:0 } }
        .animate-pingSlow { animation: pingSlow 2.6s ease-out infinite; }

        @keyframes floatSoft { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        @keyframes floatSoft2 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(12px) } }
        .animate-floatSoft { animation: floatSoft 12s ease-in-out infinite; }
        .animate-floatSoft2 { animation: floatSoft2 14s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
