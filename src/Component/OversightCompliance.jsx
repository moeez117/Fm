import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  FileCheck,
  Scale,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  FileDown,
  Bug,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/** tiny count-up hook (no extra deps) */
const useCountUp = (end = 0, active = false, duration = 1200) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.round(end * (1 - Math.pow(1 - p, 2.2)))); // easeOutQuad-ish
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, active, duration]);
  return val;
};

export default function OversightCompliance() {
  const points = [
    {
      icon: FileCheck,
      title: "Campaign Approval",
      desc: "Every campaign is reviewed and verified by RACA before launch.",
      img: "/about/Insights-Compaign.jpg",
    },
    {
      icon: Scale,
      title: "Compliance",
      desc: "Strict financial monitoring & anti-fraud mechanisms ensure trust.",
      img: "/about/Insights-Compliance.jpg",
    },
    {
      icon: ShieldCheck,
      title: "Transparency",
      desc: "Blockchain provides tamper-proof donation and fund tracking.",
      img: "/about/Insights-Transparency.jpg",
    },
  ];

  const FALLBACKS = [
    "https://images.unsplash.com/photo-1581090465344-0f2b47b2b1a3?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  ];

  const prefersReduced = useReducedMotion();

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? points.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === points.length - 1 ? 0 : prev + 1));

  // --- swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) nextSlide();
    if (touchEndX.current - touchStartX.current > 75) prevSlide();
  };

  // --- keyboard + autoplay
  const wrapperRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    const el = wrapperRef.current;
    el?.addEventListener("keydown", onKey);
    return () => el?.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    if (paused || prefersReduced) return;
    const id = setInterval(nextSlide, 6500);
    return () => clearInterval(id);
  }, [current, paused, prefersReduced]);

  // --- sr-only live announcer
  const [announce, setAnnounce] = useState("");
  useEffect(() => {
    setAnnounce(`${points[current].title}: ${points[current].desc}`);
  }, [current]); // eslint-disable-line

  // --- stats count-up when section in view
  const [inView, setInView] = useState(false);
  const ioRef = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (ioRef.current) io.observe(ioRef.current);
    return () => io.disconnect();
  }, []);
  const audits = useCountUp(124, inView); // automated audits
  const alerts = useCountUp(0, inView); // active violations
  const kpis = useCountUp(42, inView); // KPI dashboards
  const chain = useCountUp(100, inView); // blockchain coverage %

  const barDuration = prefersReduced ? 0 : 6.1;

  return (
    <motion.section
      ref={wrapperRef}
      tabIndex={0}
      className="relative py-20 px-4 md:px-8 overflow-hidden focus:outline-none"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-label="Oversight and Compliance carousel"
    >
      {/* bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-white to-emerald-50" />
      <div className="absolute inset-0 bg-[url('/bg-pattern.png')] opacity-5 bg-cover bg-center" />
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-28 w-[28rem] h-[28rem] rounded-full bg-emerald-200/35 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -right-24 w-[28rem] h-[28rem] rounded-full bg-emerald-200/30 blur-3xl" />

      {/* header + badges */}
      <div className="relative z-10 text-center mb-6">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-emerald-900"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Oversight & Compliance
        </motion.h2>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            RACA Verified
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            AML Active
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            Audit Log On
          </span>
        </div>
      </div>

      {/* carousel + controls */}
      <div className="relative z-10 flex items-center justify-center">
        {/* left btn */}
        <motion.button
          onClick={prevSlide}
          whileTap={{ scale: 0.95 }}
          whileHover={{ y: -1 }}
          className="hidden md:flex absolute left-1 md:left-6 z-30 bg-emerald-200/80 text-emerald-950 px-5 py-3 rounded-full shadow-lg hover:shadow-xl ring-1 ring-emerald-300"
          aria-label="Previous slide"
        >
          ‹
        </motion.button>

        {/* carousel viewport */}
        <div
          className="group flex items-center justify-center w-full max-w-5xl h-[380px] md:h-[460px] relative overflow-visible"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* sr-live */}
          <span aria-live="polite" className="sr-only">
            {announce}
          </span>

          {points.map((p, index) => {
            let position = "nextSlide";
            if (index === current) position = "activeSlide";
            if (index === current - 1 || (current === 0 && index === points.length - 1))
              position = "lastSlide";
            const Icon = p.icon;
            const bgStyle = { backgroundImage: `url(${p.img}), url('${FALLBACKS[index]}')` };

            return (
              <AnimatePresence key={index}>
                {position === "activeSlide" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{
                      y: -6,
                      rotateX: 1.2,
                      rotateY: -1.2,
                      transition: { type: "spring", stiffness: 220, damping: 16 },
                    }}
                    style={{ transformPerspective: 900 }}
                    className="absolute w-[86%] md:w-[70%] h-full rounded-3xl shadow-2xl overflow-hidden z-20 ring-1 ring-emerald-200/70"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${p.title}`}
                  >
                    {/* gradient frame */}
                    <div className="absolute -inset-[2px] rounded-[26px] bg-gradient-to-br from-emerald-200 via-emerald-400 to-emerald-600" />
                    {/* bg */}
                    <div
                      className="absolute inset-0 rounded-[24px] bg-cover bg-center scale-105 group-hover:scale-110 transition-transform duration-700"
                      style={bgStyle}
                    />
                    {/* overlays */}
                    <div className="absolute inset-0 rounded-[24px] bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    <div className="absolute inset-0 rounded-[24px] bg-emerald-200/10" />

                    {/* content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 h-full text-white">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm ring-1 ring-white/30 mb-4">
                        <Icon className="w-9 h-9 text-white" />
                      </div>
                      <h3 className="mt-2 text-2xl md:text-3xl font-bold drop-shadow-sm">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-lg leading-relaxed max-w-md text-white/95">
                        {p.desc}
                      </p>

                      {/* progress (autoplay cue) */}
                      {!prefersReduced && !paused && (
                        <motion.span
                          key={`bar-${current}`}
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: barDuration, ease: "linear" }}
                          className="absolute bottom-0 left-0 h-1 bg-emerald-300"
                        />
                      )}
                    </div>
                  </motion.div>
                )}

                {position === "lastSlide" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5, scale: 0.86, x: -140, rotateY: 15 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute w-[70%] md:w-[52%] h-4/5 rounded-3xl shadow-xl overflow-hidden"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-cover bg-center opacity-80" style={bgStyle} />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent" />
                  </motion.div>
                )}

                {position === "nextSlide" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5, scale: 0.86, x: 140, rotateY: -15 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute w-[70%] md:w-[52%] h-4/5 rounded-3xl shadow-xl overflow-hidden"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-cover bg-center opacity-80" style={bgStyle} />
                    <div className="absolute inset-0 bg-gradient-to-l from-white/30 to-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* right btn */}
        <motion.button
          onClick={nextSlide}
          whileTap={{ scale: 0.95 }}
          whileHover={{ y: -1 }}
          className="hidden md:flex absolute right-1 md:right-6 z-30 bg-emerald-200/80 text-emerald-950 px-5 py-3 rounded-full shadow-lg hover:shadow-xl ring-1 ring-emerald-300"
          aria-label="Next slide"
        >
          ›
        </motion.button>
      </div>

      {/* dots */}
      <div className="relative z-10 mt-8 flex items-center justify-center gap-3">
        {points.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === current ? "w-8 bg-emerald-600" : "w-2.5 bg-emerald-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current ? "true" : "false"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>

      {/* quick stats + actions */}
      <div
        ref={ioRef}
        className="relative z-10 mt-12 grid gap-4 md:grid-cols-4"
        aria-label="Compliance quick stats"
      >
        {[
          { label: "Automated Audits (YTD)", value: audits, suffix: "", tone: "emerald" },
          { label: "Active Violations", value: alerts, suffix: "", tone: "red" },
          { label: "KPI Dashboards", value: kpis, suffix: "", tone: "emerald" },
          { label: "Blockchain Coverage", value: chain, suffix: "%", tone: "emerald" },
        ].map(({ label, value, suffix, tone }, idx) => (
          <div
            key={label}
            className="rounded-2xl bg-white/90 backdrop-blur ring-1 ring-emerald-100 shadow-sm p-4"
          >
            <div className="text-2xl font-extrabold">
              <span className={tone === "red" ? "text-red-600" : "text-emerald-700"}>
                {value}
                {suffix}
              </span>
            </div>
            <div className="text-sm text-emerald-900 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          href="/download/raca-compliance-policy.pdf"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-5 py-3 font-semibold shadow hover:brightness-105 ring-1 ring-emerald-500"
        >
          <FileDown className="w-4 h-4" />
          Download Policy (PDF)
        </a>
        <a
          href="/contact-form?type=report"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-emerald-800 ring-1 ring-emerald-300 hover:bg-emerald-50"
        >
          <Bug className="w-4 h-4" />
          Report an Issue
        </a>
      </div>

      <motion.p
        className="relative z-10 text-center text-emerald-900/90 mt-10 text-lg"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        viewport={{ once: true }}
      >
        Ensuring accountability, compliance, and trust at every step.
      </motion.p>
    </motion.section>
  );
}
