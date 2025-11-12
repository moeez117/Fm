import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, BadgeCheck, Lock, Mail, Users, Building2, CheckCircle2 } from "lucide-react";

/* tiny count-up (no extra deps) */
const useCountUp = (end = 0, active = false, duration = 1200) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.round(end * (1 - Math.pow(1 - p, 3)))); // easeOutCubic
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, active, duration]);
  return val;
};

export default function CallToAction() {
  const prefersReduced = useReducedMotion();

  // email capture
  const [email, setEmail] = useState("");
  const [toast, setToast] = useState(null); // {type:'ok'|'err', msg:''}
  const noteRef = useRef(null);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setToast({ type: "err", msg: "Please enter a valid email." });
      return;
    }
    setEmail("");
    setToast({ type: "ok", msg: "Thanks! You’ll get updates on verified campaigns." });
    setTimeout(() => setToast(null), 3200);
  };

  // KPI on view
  const [inView, setInView] = useState(false);
  const kpiRef = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    if (kpiRef.current) io.observe(kpiRef.current);
    return () => io.disconnect();
  }, []);
  const donors = useCountUp(12500, inView, 900);
  const charities = useCountUp(150, inView, 900);
  const compliance = useCountUp(100, inView, 900);

  // parallax tilt
  const cardRef = useRef(null);
  const onMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    cardRef.current.style.setProperty("--rx", `${(py - 0.5) * -6}deg`);
    cardRef.current.style.setProperty("--ry", `${(px - 0.5) * 6}deg`);
    cardRef.current.style.setProperty("--tx", `${(px - 0.5) * 6}px`);
    cardRef.current.style.setProperty("--ty", `${(py - 0.5) * 6}px`);
  };
  const onLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rx", `0deg`);
    cardRef.current.style.setProperty("--ry", `0deg`);
    cardRef.current.style.setProperty("--tx", `0px`);
    cardRef.current.style.setProperty("--ty", `0px`);
  };

  const matchedPct = 72;

  return (
    <section
      className="relative px-6 py-20 md:py-24 pt-28 md:pt-32 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient( to right, rgba(16,185,129,.10), rgba(16,185,129,.18), rgba(16,185,129,.10) ),
        url('https://images.unsplash.com/photo-1494173853739-c21f58b16055?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
      aria-label="Call to Action"
    >
      {/* soft texture + mesh gradient */}
      <div aria-hidden className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_1px)] [background-size:14px_14px]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/15 to-transparent" />
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-soft-light pointer-events-none"
        style={{
          background:
            "radial-gradient(40rem 30rem at 20% 20%, rgba(16,185,129,.12), transparent 45%), radial-gradient(40rem 30rem at 80% 30%, rgba(52,211,153,.10), transparent 45%), radial-gradient(40rem 30rem at 50% 80%, rgba(16,185,129,.10), transparent 45%)",
        }}
      />
      {!prefersReduced && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
            className="absolute -top-8 -left-10 w-56 h-56 bg-emerald-300/40 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 7, repeat: Infinity, repeatType: "mirror" }}
            className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-300/40 rounded-full blur-3xl"
          />
        </>
      )}

      {/* Glass card with gradient ring + tilt */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative mx-auto max-w-4xl p-[1.5px] rounded-[22px] transition-transform duration-200"
          style={{
            transform:
              "translate3d(var(--tx,0), var(--ty,0), 0) rotateX(var(--rx,0)) rotateY(var(--ry,0))",
            transformStyle: "preserve-3d",
          }}
        >
          {/* gradient ring */}
          <div className="absolute -inset-[1.5px] rounded-[22px] bg-[conic-gradient(from_140deg,rgba(16,185,129,.35),rgba(16,185,129,0),rgba(16,185,129,.35))] blur-[2px]" />
          {/* glass body */}
          <div className="relative rounded-[20px] bg-white/72 backdrop-blur-xl ring-1 ring-black/10 shadow-[0_20px_80px_-20px_rgba(16,185,129,.35)] overflow-hidden">
            {/* top reflection */}
            <div className="pointer-events-none absolute -top-16 left-0 right-0 h-24 bg-gradient-to-b from-white/60 to-transparent" />

            {/* trust chips */}
            <div className="pt-8 flex justify-center gap-3 flex-wrap px-6">
              {[
                [<BadgeCheck key="b" className="w-4 h-4 text-emerald-600" />, "RACA Verified"],
                [<ShieldCheck key="s" className="w-4 h-4 text-emerald-600" />, "Sandi Integration"],
                [<Lock key="l" className="w-4 h-4 text-emerald-600" />, "End-to-End Encryption"],
              ].map(([icon, text], i) => (
                <motion.span
                  key={text}
                  initial={{ y: -10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.08 * i }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/85 ring-1 ring-black/10 text-sm font-semibold"
                >
                  {icon}
                  {text}
                </motion.span>
              ))}
            </div>

            {/* heading */}
            <div className="px-6 sm:px-10 mt-4 text-center">
              <motion.h2
                className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight"
                initial={{ opacity: 0, y: -18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <span className="bg-[linear-gradient(90deg,#065f46,#10b981,#059669)] bg-clip-text text-transparent animate-gradient">
                  Join us in making donations
                </span>
                <br className="hidden md:block" />
                transparent and impactful
              </motion.h2>

              <motion.p
                className="mt-3 text-base md:text-lg max-w-2xl mx-auto text-gray-800"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                viewport={{ once: true }}
              >
                Be part of a trusted system backed by <span className="font-semibold">RACA</span> &amp; integrated
                with <span className="font-semibold">Sandi</span>.
              </motion.p>
            </div>

            {/* matching banner + progress */}
            <motion.div
              className="mx-6 sm:mx-10 mt-6 rounded-xl bg-emerald-50/85 ring-1 ring-emerald-200 p-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-emerald-900 font-semibold">
                  ⚡ Matching Campaign: Every riyal matched up to QAR 1,000,000 this month.
                </div>
                <div className="w-full sm:w-80">
                  <div className="h-2 rounded-full bg-emerald-100 overflow-hidden ring-1 ring-emerald-200/60">
                    <motion.div
                      className="relative h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${matchedPct}%` }}
                      transition={{ duration: 1.1, delay: 0.15 }}
                      viewport={{ once: true }}
                      style={{
                        background:
                          "linear-gradient(90deg, #86efac, #10b981, #059669)",
                      }}
                    >
                      {/* shimmer */}
                      {!prefersReduced && (
                        <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.45),transparent)] animate-shine" />
                      )}
                    </motion.div>
                  </div>
                  <div className="mt-1 text-xs text-emerald-800/80 text-right">{matchedPct}% to goal</div>
                </div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 px-6 sm:px-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/donate"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden bg-emerald-500 text-white px-6 md:px-8 py-3 rounded-lg font-semibold ring-1 ring-emerald-400 shadow-md hover:shadow-lg"
              >
                <span className="relative z-10">Donate Now</span>
                <span className="pointer-events-none absolute -inset-y-10 -left-1/3 w-1/3 bg-white/50 blur-md rotate-12 opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </motion.a>

              <motion.a
                href="/signup"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(16,185,129,.12)" }}
                whileTap={{ scale: 0.97 }}
                className="border border-emerald-500/70 bg-white/80 backdrop-blur px-6 md:px-8 py-3 rounded-lg font-semibold text-emerald-800"
              >
                Register as Charity
              </motion.a>
            </motion.div>

            {/* KPIs */}
            <div ref={kpiRef} className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 sm:px-10">
              {[
                { label: "Donors", value: donors.toLocaleString(), icon: Users },
                { label: "Registered Charities", value: charities, icon: Building2 },
                { label: "Compliance", value: `${compliance}%`, icon: CheckCircle2 },
              ].map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="relative rounded-xl bg-white/85 backdrop-blur ring-1 ring-emerald-200 shadow-sm px-4 py-3 text-center"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white w-10 h-10 rounded-full grid place-items-center ring-1 ring-emerald-200 shadow-sm">
                    <Icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="mt-4 text-2xl font-extrabold text-emerald-700">{value}</div>
                  <div className="text-sm text-emerald-900/90">{label}</div>
                </div>
              ))}
            </div>

            {/* Email capture */}
            <form
              onSubmit={handleSubscribe}
              className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 px-6 sm:px-10 pb-8"
              noValidate
            >
              <div className="relative flex-1 min-w-[240px]">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-700/80" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Get updates on verified campaigns"
                  className="w-full pl-10 pr-3 py-3 rounded-lg ring-1 ring-emerald-200 focus:ring-2 focus:ring-emerald-400 outline-none bg-white/90"
                  aria-label="Email address"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold ring-1 ring-emerald-500 hover:brightness-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* toast */}
      {toast && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg ${
            toast.type === "ok" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
          }`}
          role="status"
          aria-live="polite"
          ref={noteRef}
        >
          {toast.msg}
        </motion.div>
      )}

      {/* helpers */}
      <style>{`
        @keyframes gradientMove { 0% { background-position: 0% 50% } 100% { background-position: 100% 50% } }
        .animate-gradient { background-size: 200% 200%; animation: gradientMove 7s ease-in-out infinite alternate; }
        @keyframes shine { 0% { transform: translateX(-120%) } 100% { transform: translateX(220%) } }
        .animate-shine { animation: shine 1.6s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
