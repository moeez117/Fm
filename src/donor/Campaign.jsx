import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

/* ---------- Data (unchanged) ---------- */
const compainAry = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1652858672796-960164bd632b?w=1600&q=80&auto=format&fit=crop",
    name: "Education for All",
    desc: "Help underprivileged children get access to quality education.",
    target: "$10,000",
    raisedAmount: "$4,500",
  },
  {
    id: 2,
    img: "https://media.istockphoto.com/id/2171791945/photo/portrait-of-volunteers-during-donation-event-outdoors.webp?a=1&b=1&s=1600x1600",
    name: "Clean Water Project",
    desc: "Providing clean and safe drinking water in rural areas.",
    target: "$8,000",
    raisedAmount: "$5,200",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=1600&auto=format&fit=crop",
    name: "Medical Aid",
    desc: "Support critical medical treatments for those in need.",
    target: "$15,000",
    raisedAmount: "$9,800",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1600&q=80&auto=format&fit=crop",
    name: "Food for Families",
    desc: "Providing essential groceries to struggling families.",
    target: "$12,000",
    raisedAmount: "$7,600",
  },
  {
    id: 5,
    img: "https://media.istockphoto.com/id/2171791945/photo/portrait-of-volunteers-during-donation-event-outdoors.webp?a=1&b=1&s=1600x1600",
    name: "Disaster Relief",
    desc: "Emergency aid for families affected by natural disasters.",
    target: "$20,000",
    raisedAmount: "$12,400",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1643321613219-6d50e1372c0a?w=1600&q=80&auto=format&fit=crop",
    name: "Housing Support",
    desc: "Helping homeless families with safe housing solutions.",
    target: "$25,000",
    raisedAmount: "$14,700",
  },
];

/* ---------- Utils ---------- */
function parseMoney(str) {
  return parseInt(String(str).replace(/[^0-9]/g, ""), 10) || 0;
}
function percent(raised, target) {
  const r = parseMoney(raised);
  const t = parseMoney(target);
  return t ? Math.min(100, (r / t) * 100) : 0;
}

/* ---------- Progress Animation Hook (IntersectionObserver + smooth ramp) ---------- */
function useProgressAnimation(targetPct = 0) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    let raf;
    const dur = 900; // ms
    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic

    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / dur);
      setPct(Math.round(ease(p) * targetPct));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, targetPct]);

  return { ref, pct, inView };
}

const Campaign = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out" });
  }, []);

  const cards = useMemo(
    () =>
      compainAry.map((c) => ({
        ...c,
        pct: percent(c.raisedAmount, c.target),
      })),
    []
  );

  return (
    <section className="relative min-h-screen px-6 pt-32 sm:pt-36 md:pt-40 lg:pt-44">
      {/* Ambient background and glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(transparent_1px,rgba(16,185,129,0.06)_1px)] [background-size:16px_16px]" />
      <div className="pointer-events-none absolute -top-28 -left-24 h-[26rem] w-[26rem] rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[22rem] w-[22rem] rounded-full bg-emerald-200/40 blur-3xl" />

      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mx-auto inline-flex items-center justify-center rounded-full bg-emerald-100 px-4 py-2 text-emerald-700 ring-1 ring-emerald-300">
          Secure • Visible • Impactful
        </div>
        <h1 className="mt-4 text-3xl font-extrabold text-emerald-950 md:text-4xl">
          Active{" "}
          <span className="bg-[linear-gradient(90deg,#86efac,#34d399,#10b981)] bg-clip-text text-transparent animate-gradientMove">
            Campaigns
          </span>
        </h1>
        <div className="mx-auto mt-5 h-1.5 w-28 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-600 shadow-[0_0_16px_rgba(16,185,129,.45)] animate-widthPulse" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((item, idx) => {
          const { ref, pct } = useProgressAnimation(item.pct);
          return (
            <article
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={idx * 70}
              className="group relative overflow-hidden rounded-3xl p-[1px] bg-gradient-to-br from-emerald-200 via-emerald-300/50 to-emerald-200 shadow-[0_10px_40px_rgba(16,185,129,0.12)] hover:shadow-[0_14px_48px_rgba(16,185,129,0.22)] transition-shadow duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
            >
              <div className="relative rounded-3xl bg-white/90 backdrop-blur-sm">
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden rounded-t-3xl">
                  <SmartImage src={item.img} alt={item.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/45 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-300">
                    {pct}% funded
                  </div>

                  {/* Glow on hover */}
                  <div className="pointer-events-none absolute -inset-16 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" style={{ background: "radial-gradient(40rem 20rem at 60% -20%, #34d39955, transparent 60%)" }} />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-emerald-950">
                    {item.name}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-emerald-900/80">
                    {item.desc}
                  </p>

                  {/* Progress */}
                  <div className="mt-4" ref={ref}>
                    <div className="flex items-center justify-between text-xs font-medium text-emerald-900/85">
                      <p>Raised: {item.raisedAmount}</p>
                      <p>Target: {item.target}</p>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-emerald-100 ring-1 ring-emerald-200/70">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 transition-[width] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-5 flex items-center gap-3">
                    <Link to="/contact" className="w-full">
                      <button className="relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white ring-1 ring-emerald-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500">
                        <span className="relative z-10">Donate Now</span>
                        <svg
                          className="relative z-10 ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                        {/* shine */}
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.35),transparent)] animate-shine" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* local helpers */}
      <style>{`
        @keyframes gradientMove { 
          0% { background-position: 0% 50% } 
          100% { background-position: 100% 50% } 
        }
        .animate-gradientMove { background-size: 200% 200%; animation: gradientMove 7s ease-in-out infinite alternate; }

        @keyframes widthPulse { 
          0%,100% { transform: scaleX(1) } 
          50% { transform: scaleX(1.12) } 
        }
        .animate-widthPulse { transform-origin: center; animation: widthPulse 5s ease-in-out infinite; }

        @keyframes shine {
          0%   { transform: translateX(-120%) }
          100% { transform: translateX(120%) }
        }
        .animate-shine { animation: shine 1.6s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

/* ---------- Image with soft shimmer-in ---------- */
function SmartImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={[
        "h-full w-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]",
        loaded ? "scale-100 blur-0" : "scale-[1.08] blur-md",
      ].join(" ")}
    />
  );
}

export default Campaign;
