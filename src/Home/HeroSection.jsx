import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// ⬇️ Sections under the hero
import TrustIndicatorBar from "../Home/TrustIndicatorBar";
import PlatformForEveryone from "./PlatformForEveryone";
import HowItWorksSection from "./HowItWorksSection";
import FeaturedCampaignsSection from "./FeaturedCampaignsSection";
import FAQs from "./FAQs";
import ImpactShowcase from "../Home/ImpactShowcase";

export default function HeroSection() {
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <>
      {/* ======= HERO ======= */}
      <section
        id="home-hero"
        className="relative min-h-[88vh] md:min-h-screen w-full flex items-center px-6 pt-24 md:pt-28 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label="Qatar Charity hero"
      >
        {/* depth + vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/60" />
        <div className="pointer-events-none absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-emerald-400/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-green-300/25 blur-3xl" />
        {/* gentle sheen */}
        <div className="pointer-events-none absolute -inset-x-40 -top-40 h-64 rotate-6 bg-gradient-to-b from-white/12 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            {/* Title */}
            <motion.h1
              className="tracking-tight font-extrabold drop-shadow-xl"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              <span className="block text-4xl sm:text-5xl md:text-6xl text-white">
                Together We Rise
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl bg-[linear-gradient(90deg,#86efac,#34d399,#10b981)] bg-clip-text text-transparent animate-gradient">
                Building Hope Through Charity
              </span>
            </motion.h1>

            {/* tiny accent bar */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.18}
              className="hidden md:block mt-4 h-1.5 w-28 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-green-500 shadow-[0_0_18px_rgba(16,185,129,0.45)]"
            />

            {/* Subheading */}
            <motion.p
              className="mt-5 md:mt-6 max-w-2xl text-white/95 text-base sm:text-lg md:text-xl leading-relaxed"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.28}
            >
              Every act of giving makes a difference. With{" "}
              <span className="font-semibold text-white">transparency</span>,{" "}
              <span className="font-semibold text-white">trust</span>, and{" "}
              <span className="font-semibold text-white">impact</span>, we
              empower communities across Qatar.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-7 flex flex-col sm:flex-row gap-4"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
            >
              {/* Primary */}
              <Link
                to="/donate"
                aria-label="Donate now"
                className="relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-black shadow-lg ring-1 ring-emerald-400/70 bg-gradient-to-r from-emerald-200 via-emerald-300 to-emerald-400 transition-all duration-300 hover:shadow-emerald-300/60 hover:-translate-y-0.5 overflow-hidden"
              >
                {/* subtle pulse ring */}
                <span className="pointer-events-none absolute -inset-1 rounded-[14px] bg-emerald-300/20 animate-ping-slow" />
                <span className="relative z-10 flex items-center gap-2">
                  {/* heart icon */}
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12.1 21.35l-1.1-1.01C5.14 15.24 2 12.39 2 8.99 2 6.24 4.24 4 6.99 4c1.73 0 3.41.81 4.41 2.09C12.4 4.81 14.08 4 15.81 4 18.56 4 20.8 6.24 20.8 8.99c0 3.4-3.14 6.25-8.9 11.35z" />
                  </svg>
                  Donate Now
                </span>
                {/* sheen */}
                <span className="pointer-events-none absolute -inset-y-8 -left-1/2 w-1/2 bg-white/40 blur-md rotate-12 opacity-0 hover:opacity-100 transition-opacity duration-500 animate-shine" />
              </Link>

              {/* Secondary */}
              <a
                href="#featured-campaigns"
                aria-label="Explore featured campaigns"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold border-2 border-emerald-300 text-white/95 hover:text-black bg-white/0 hover:bg-emerald-200 transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* arrow icon */}
                <svg
                  className="w-5 h-5 -ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h6m0 0l-4-4m4 4l-4 4M11 17H5m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                Explore Campaigns
              </a>
            </motion.div>

            {/* Stats chips */}
            <motion.div
              className="mt-9 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.52}
            >
              {[
                {
                  v: "10K+",
                  l: "Lives Impacted",
                  icon: (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.1 21.35l-1.1-1.01C5.14 15.24 2 12.39 2 8.99 2 6.24 4.24 4 6.99 4c1.73 0 3.41.81 4.41 2.09C12.4 4.81 14.08 4 15.81 4 18.56 4 20.8 6.24 20.8 8.99c0 3.4-3.14 6.25-8.9 11.35z" />
                    </svg>
                  ),
                },
                {
                  v: "500+",
                  l: "Campaigns",
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M3 7h18M8 11h1m-1 4h1m4-4h1m-1 4h1M6 20h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  v: "100%",
                  l: "Transparency",
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  v: "24/7",
                  l: "Support",
                  icon: (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 16.9v3.1a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.64-3.07A19.5 19.5 0 0 1 3.07 12.8 19.8 19.8 0 0 1 0 4.18 2 2 0 0 1 2 2h3.1A2 2 0 0 1 7.1 3.72c.26.98.63 1.92 1.1 2.8a2 2 0 0 1-.45 2.24L6.7 9.8a16 16 0 0 0 7.5 7.5l1.05-1.04a2 2 0 0 1 2.24-.45c.88.47 1.82.84 2.8 1.1a2 2 0 0 1 1.61 1.99Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="group rounded-xl bg-white/12 backdrop-blur-sm ring-1 ring-white/15 px-4 py-3 text-left text-white/95 hover:bg-white/16 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="text-xs opacity-90 mb-1 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/15 ring-1 ring-white/20">
                      {s.icon}
                    </span>
                    <span>{s.l}</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-extrabold">
                    {s.v}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-5 inset-x-0 flex justify-center">
          <a
            href="#trust-indicator"
            className="text-white/90 hover:text-white text-[10px] sm:text-xs tracking-[0.25em] uppercase flex items-center gap-2"
            aria-label="Scroll to next section"
          >
            <svg
              className="w-4 h-4 animate-bounceSlow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            Scroll
          </a>
        </div>
      </section>

      {/* divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent" />

      {/* ======= STACKED SECTIONS ======= */}
      <div id="trust-indicator" className="scroll-mt-24">
        <TrustIndicatorBar />
      </div>
      <div id="platform" className="scroll-mt-24">
        <PlatformForEveryone />
      </div>
      <div id="how-it-works" className="scroll-mt-24">
        <HowItWorksSection />
      </div>
      <div id="featured-campaigns" className="scroll-mt-24">
        <FeaturedCampaignsSection />
      </div>
      <div id="faqs" className="scroll-mt-24">
        <FAQs />
      </div>
      <div id="impact" className="scroll-mt-24">
        <ImpactShowcase />
      </div>

      {/* helpers */}
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes gradientMove { 0% { background-position: 0% 50% } 100% { background-position: 100% 50% } }
        .animate-gradient { background-size: 200% 200%; animation: gradientMove 6s ease-in-out infinite alternate; }
        @keyframes shine { 0% { transform: translateX(-120%) } 100% { transform: translateX(220%) } }
        @keyframes pingSlow { 0% { transform: scale(1); opacity: .55 } 70% { opacity: 0 } 100% { transform: scale(1.25); opacity: 0 } }
        .animate-ping-slow { animation: pingSlow 2.2s cubic-bezier(0,0,.2,1) infinite; }
        @keyframes bounceSlow { 0%,100% { transform: translateY(0) } 50% { transform: translateY(3px) } }
        .animate-bounceSlow { animation: bounceSlow 1.8s ease-in-out infinite; }
      `}</style>
    </>
  );
}
