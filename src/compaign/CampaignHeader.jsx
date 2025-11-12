import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHandsHelping } from "react-icons/fa";
import { Search, ShieldCheck, Link2, Play, ArrowRight } from "lucide-react";

export default function CampaignHeader() {
  const containerRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");

  // simple parallax follow
  const onMouseMove = (e) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    containerRef.current.style.setProperty("--mx", x);
    containerRef.current.style.setProperty("--my", y);
  };

  // search submit → redirect to donor campaign list with query
  const onSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (cat) params.set("category", cat);
    // adjust path to whatever listing page you like
    window.location.href = `/donor-campaign?${params.toString()}`;
  };

  const categories = ["Health", "Education", "Relief", "Zakat", "Orphans"];

  return (
    <section
      ref={containerRef}
      onMouseMove={onMouseMove}
      className="relative w-full h-[640px] md:h-[92vh] overflow-hidden"
    >
      {/* Base background image with subtle Ken Burns */}
      <img
        src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=2000&q=80"
        alt="Charity Campaign"
        className="absolute inset-0 w-full h-full object-cover scale-105 animate-kenburns"
      />

      {/* Aurora gradient mesh + tint */}
      <div className="absolute inset-0 mix-blend-multiply pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_20%_10%,rgba(99,255,195,0.35),transparent_60%),radial-gradient(60%_80%_at_85%_20%,rgba(20,184,166,0.3),transparent_55%),radial-gradient(50%_70%_at_50%_80%,rgba(16,185,129,0.35),transparent_60%)] animate-gradientDrift" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-[palegreen]/65 to-[palegreen]/80" />
      </div>

      {/* Subtle grain + highlight speckles */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,.28),transparent_45%),radial-gradient(circle_at_80%_90%,rgba(255,255,255,.22),transparent_50%)]"
      />

      {/* Parallax blobs */}
      <div
        aria-hidden
        className="absolute -top-28 -left-28 w-[30rem] h-[30rem] bg-emerald-300/40 rounded-full blur-3xl"
        style={{
          transform:
            "translate3d(calc(var(--mx,0)*-24px), calc(var(--my,0)*-14px), 0)",
          transition: "transform .06s linear",
        }}
      />
      <div
        aria-hidden
        className="absolute -bottom-28 -right-24 w-[32rem] h-[32rem] bg-emerald-200/40 rounded-full blur-3xl"
        style={{
          transform:
            "translate3d(calc(var(--mx,0)*28px), calc(var(--my,0)*22px), 0)",
          transition: "transform .06s linear",
        }}
      />

      {/* Moving light sweep */}
      <span className="pointer-events-none absolute -inset-y-20 -left-1/3 w-1/3 bg-white/35 blur-md rotate-12 animate-sweep" />

      {/* Center content card */}
      <div className="relative z-10 flex items-center justify-center h-full p-6">
        <div className="max-w-4xl w-full text-center rounded-3xl bg-white/65 backdrop-blur-md px-6 py-8 md:px-10 md:py-10 shadow-[0_18px_50px_rgba(0,0,0,.15)] ring-1 ring-white/60 overflow-hidden">
          {/* Top chips */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-950 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/85 ring-1 ring-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              RACA Verified
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/85 ring-1 ring-emerald-300">
              <Link2 className="w-4 h-4 text-emerald-700" />
              Sandi Integration
            </span>
          </div>

          <FaHandsHelping className="text-4xl md:text-5xl mx-auto mb-3 text-emerald-900" />

          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            <span className="bg-[linear-gradient(90deg,#064e3b,#10b981,#064e3b)] bg-clip-text text-transparent animate-gradientSheen">
              Start Your Charity Campaign
            </span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-emerald-950/90 max-w-2xl mx-auto">
            Share your story, raise awareness, and inspire people to make a
            difference through regulated, transparent fundraising.
          </p>

          {/* Search + category quick filters */}
          <form
            onSubmit={onSearch}
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
          >
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-700/80" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search campaigns (e.g., winter aid, medical)"
                className="w-full pl-10 pr-3 py-3 rounded-xl ring-1 ring-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-400 outline-none"
              />
            </div>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="px-4 py-3 rounded-xl ring-1 ring-emerald-200 bg-white/90 focus:ring-2 focus:ring-emerald-400 outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c.toLowerCase()}>
                  {c}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="group relative px-6 py-3 rounded-xl font-semibold text-white bg-emerald-600 ring-1 ring-emerald-500 shadow-lg hover:brightness-105 transition"
              onClick={(e) => {
                const r = document.createElement("span");
                r.className = "btn-ripple";
                const rect = e.currentTarget.getBoundingClientRect();
                r.style.left = `${e.clientX - rect.left}px`;
                r.style.top = `${e.clientY - rect.top}px`;
                e.currentTarget.appendChild(r);
                setTimeout(() => r.remove(), 600);
              }}
            >
              Find Campaigns
              <ArrowRight className="inline-block w-5 h-5 -mr-1 ml-2 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          {/* Quick category pills */}
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c.toLowerCase())}
                className={`px-3 py-1.5 rounded-full text-sm ring-1 transition ${
                  cat === c.toLowerCase()
                    ? "bg-emerald-600 text-white ring-emerald-500"
                    : "bg-white/85 text-emerald-900 ring-emerald-300 hover:bg-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-7 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#create"
              className="relative px-6 py-3 rounded-xl font-semibold text-emerald-950 bg-[linear-gradient(90deg,palegreen,#6ee7b7,palegreen)] ring-1 ring-emerald-300 shadow-md hover:shadow-emerald-200/70 hover:-translate-y-0.5 transition overflow-hidden"
            >
              <span className="relative z-10">Create Campaign</span>
              <span className="pointer-events-none absolute -inset-y-10 -left-1/3 w-1/3 bg-white/50 blur-md rotate-12 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </a>

            <a
              href="#guidelines"
              className="px-6 py-3 rounded-xl font-semibold text-emerald-950 bg-white/85 backdrop-blur-sm ring-1 ring-emerald-400 hover:bg-white transition"
            >
              Guidelines
            </a>

            <button
              onClick={() => setShowVideo(true)}
              className="px-6 py-3 rounded-xl font-semibold text-white bg-emerald-700 ring-1 ring-emerald-600 hover:brightness-110 transition inline-flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch 45s Overview
            </button>
          </div>
        </div>
      </div>

      {/* Scroll wave */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,20 1440,60 L1440,90 L0,90 Z"
          fill="rgba(255,255,255,.95)"
        />
      </svg>

      {/* Video modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm grid place-items-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-full max-w-4xl rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-2xl bg-black"
            >
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/6f5Zx-0QX2E?autoplay=1&rel=0&modestbranding=1"
                  title="Platform Overview"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
              <div className="bg-white/90 p-3 text-right">
                <button
                  onClick={() => setShowVideo(false)}
                  className="px-4 py-2 rounded-lg font-semibold ring-1 ring-emerald-300 bg-[palegreen] text-emerald-900 hover:brightness-105"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Local animations */}
      <style>{`
        @keyframes kenburns { 0% { transform: scale(1.085) } 100% { transform: scale(1.0) } }
        .animate-kenburns { animation: kenburns 18s ease-out both; }

        @keyframes gradientDrift { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        .animate-gradientDrift { animation: gradientDrift 16s ease-in-out infinite; }

        @keyframes sweep { 0% { transform: translateX(-140%) } 100% { transform: translateX(160%) } }
        .animate-sweep { animation: sweep 4s ease-in-out infinite; }

        /* ripple */
        .btn-ripple {
          position:absolute; pointer-events:none; width:12px; height:12px;
          background: rgba(16,185,129,.28); border-radius:9999px; transform: translate(-50%,-50%);
          animation: ripple .6s ease-out forwards;
        }
        @keyframes ripple {
          from { opacity:.9; transform: translate(-50%,-50%) scale(1); }
          to   { opacity:0;  transform: translate(-50%,-50%) scale(18); }
        }

        /* sheen */
        @keyframes gradientSheen { 
          0% { background-position: 0% 50% } 
          100% { background-position: 100% 50% }
        }
        .animate-gradientSheen { background-size: 200% 200%; animation: gradientSheen 8s ease-in-out infinite alternate; }
      `}</style>
    </section>
  );
}
