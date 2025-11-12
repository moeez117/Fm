import React, { useEffect, useRef, useState } from "react";
import {
  FiRefreshCw,
  FiGlobe,
  FiShield,
  FiLock,
  FiArrowRight,
  FiAward,
  FiHeart,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function WhyDonate() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out" });
  }, []);

  const trustPoints = [
    {
      icon: <FiRefreshCw className="w-9 h-9 text-emerald-700" />,
      title: "Transparency",
      desc: "Powered by blockchain and real-time tracking for every donation.",
    },
    {
      icon: <FiGlobe className="w-9 h-9 text-emerald-700" />,
      title: "Sandi Integration",
      desc: "Ensures no duplication of donations and campaign validation.",
    },
    {
      icon: <FiShield className="w-9 h-9 text-emerald-700" />,
      title: "Compliance",
      desc: "Fully regulated under RACA guidelines for safe giving.",
    },
    {
      icon: <FiLock className="w-9 h-9 text-emerald-700" />,
      title: "Security",
      desc: "Advanced SSL encryption, AML monitoring & fraud detection.",
    },
  ];

  const stats = [
    { label: "Audits Passed", value: 48 },
    { label: "Verified Charities", value: 150 },
    { label: "Donors", value: 12000 },
  ];

  return (
    <section
      id="why-donate"
      className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50 py-20"
    >
      {/* Ambient glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-[26rem] w-[26rem] rounded-full bg-[palegreen]/35 blur-3xl animate-floatSlow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-24 h-[26rem] w-[26rem] rounded-full bg-[palegreen]/30 blur-3xl animate-floatSlow2"
      />
      {/* Subtle dotted grid */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] opacity-[0.06] [background-size:16px_16px]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Eyebrow */}
        <div
          className="mx-auto mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-white/70 px-4 py-2 text-emerald-800 ring-1 ring-emerald-200"
          data-aos="fade-up"
        >
          <FiAward />
          <span className="font-medium">Trust & Transparency</span>
        </div>

        {/* Title */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-4xl md:text-5xl font-extrabold text-emerald-950">
            Why Choose{" "}
            <span className="bg-[linear-gradient(90deg,#86efac,#34d399,#10b981)] bg-clip-text text-transparent animate-gradientMove">
              Us?
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-emerald-900/80">
            We are committed to building{" "}
            <span className="font-semibold text-emerald-700">trust</span> by
            ensuring transparency, compliance, and security in every step of the
            donation process.
          </p>
          <div className="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-600 shadow-[0_0_16px_rgba(16,185,129,.45)] animate-widthPulse" />
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((p, i) => (
            <TiltCard key={p.title} delay={i * 120}>
              <div className="p-[2px] rounded-3xl bg-[conic-gradient(at_10%_10%,#86efac_0%,#34d399_25%,#10b981_50%,#34d399_75%,#86efac_100%)] animate-borderGlow">
                <div className="h-full rounded-[22px] bg-white/90 backdrop-blur ring-1 ring-emerald-100 shadow-lg transition-all duration-300 group-hover:shadow-xl">
                  <div className="relative p-8 text-center">
                    <div className="mx-auto mb-6 inline-flex items-center justify-center rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100 transition-all duration-300 group-hover:bg-emerald-100">
                      {p.icon}
                    </div>
                    <h3 className="text-xl font-bold text-emerald-950">
                      {p.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-emerald-900/80">
                      {p.desc}
                    </p>
                    {/* Glow follows cursor (added inside TiltCard) */}
                    <GlowSpot />
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Stats Row */}
        <div
          className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 rounded-3xl bg-white/90 p-6 text-center ring-1 ring-emerald-100 shadow-xl backdrop-blur md:grid-cols-3"
          data-aos="fade-up"
          data-aos-delay="120"
        >
          {stats.map((s, idx) => (
            <Stat key={s.label} target={s.value} label={s.label} delay={idx * 80} />
          ))}
        </div>

        {/* CTA */}
        <div
          className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-3xl bg-white/90 p-8 ring-1 ring-emerald-100 shadow-xl backdrop-blur"
          data-aos="fade-up"
          data-aos-delay="160"
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-4 text-left">
              <div className="rounded-full bg-emerald-50 p-3 text-emerald-700 ring-1 ring-emerald-200">
                <FiHeart className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-emerald-950">
                  Ready to Make a Difference?
                </h3>
                <p className="text-emerald-900/80">
                  Your donation can change lives today.
                </p>
              </div>
            </div>

            <Link to="/contact" className="relative">
              <button className="relative inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 py-3 font-medium text-white shadow-md ring-1 ring-emerald-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-lg">
                Donate Now
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                {/* sheen sweep */}
                <span className="pointer-events-none absolute -inset-y-10 -left-1/2 h-12 w-1/2 rotate-12 bg-white/40 opacity-0 blur-md transition-opacity duration-500 hover:opacity-100" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Local helpers */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50% }
          100% { background-position: 100% 50% }
        }
        .animate-gradientMove { background-size: 200% 200%; animation: gradientMove 7s ease-in-out infinite alternate; }

        @keyframes widthPulse { 0%,100% { transform: scaleX(1) } 50% { transform: scaleX(1.12) } }
        .animate-widthPulse { transform-origin: center; animation: widthPulse 5s ease-in-out infinite; }

        @keyframes floatSlow { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        @keyframes floatSlow2 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(12px) } }
        .animate-floatSlow { animation: floatSlow 12s ease-in-out infinite; }
        .animate-floatSlow2 { animation: floatSlow2 14s ease-in-out infinite; }

        @keyframes borderGlow {
          0% { filter: saturate(1) brightness(1) }
          50% { filter: saturate(1.15) brightness(1.05) }
          100% { filter: saturate(1) brightness(1) }
        }
        .animate-borderGlow { animation: borderGlow 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
}

/* ---------------- Sub-components ---------------- */

/** Tilt + cursor glow wrapper */
function TiltCard({ children, delay = 0 }) {
  const ref = useRef(null);
  const [glow, setGlow] = useState({ x: -9999, y: -9999 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    // tilt
    const rx = ((py - rect.height / 2) / rect.height) * -10; // rotateX
    const ry = ((px - rect.width / 2) / rect.width) * 10; // rotateY
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;

    // glow position
    setGlow({ x: px, y: py });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    setGlow({ x: -9999, y: -9999 });
  };

  return (
    <div
      data-aos="zoom-in-up"
      data-aos-delay={delay}
      className="group"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      ref={ref}
      style={{ transformStyle: "preserve-3d", transition: "transform 300ms" }}
    >
      {/* pass glow down via context-like element */}
      {React.cloneElement(children, {
        // inject a prop the GlowSpot reads via context-less global var
        children: React.Children.map(children.props.children, (c, i) =>
          i === 0 ? (
            <>
              {c}
              <div
                className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(200px 200px at ${glow.x}px ${glow.y}px, rgba(16,185,129,.14), transparent 60%)`,
                }}
              />
            </>
          ) : (
            c
          )
        ),
      })}
    </div>
  );
}

/** Invisible placeholder (kept for readability where used) */
function GlowSpot() {
  return null;
}

/** Animated stat with count-up */
function Stat({ target, label, delay = 0 }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let start = 0;
    const dur = 1100; // ms
    const t0 = performance.now();

    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };

    const id = setTimeout(() => requestAnimationFrame(step), delay);
    return () => clearTimeout(id);
  }, [target, delay]);

  return (
    <div className="rounded-2xl bg-white/90 p-6 ring-1 ring-emerald-100 shadow">
      <div className="text-3xl font-extrabold text-emerald-700">
        {val.toLocaleString()}
      </div>
      <div className="mt-1 text-sm text-emerald-900/70">{label}</div>
    </div>
  );
}
