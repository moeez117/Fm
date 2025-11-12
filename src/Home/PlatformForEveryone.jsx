import React, { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ROLES = ["All", "Donors", "Charities", "Authority (RACA)"];

const baseUserTypes = [
  {
    role: "Donors",
    route: "/donor-hero",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
    ),
    description: "Individuals and corporates who want to make a difference.",
    features: [
      "Give with confidence (RACA oversight)",
      "Real-time impact: photos, videos & maps",
      "Instant receipts & giving history",
      "Multiple payments: card, transfer, wallet, QR",
    ],
    cta: "Start Donating",
    ctaSecondary: { label: "Explore Campaigns", to: "/cta-section" },
    accentColor: "#10B981", // emerald-500
    accentSoft: "#A7F3D0",  // emerald-200
    quick: [
      { label: "Health", to: "/donor-campaign" },
      { label: "Education", to: "/donor-campaign" },
      { label: "Relief", to: "/donor-campaign" },
    ],
  },
  {
    role: "Charities",
    route: "/signup",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    description: "Organizations managing compliant donation campaigns.",
    features: [
      "Create/manage campaigns with smart checks",
      "Upload licenses & proofs (receipts, media)",
      "Sandi sync prevents duplicate assistance",
      "Automated RACA compliance & reports",
    ],
    cta: "Register Your Charity",
    ctaSecondary: { label: "Campaign Dashboard", to: "/dashboard-campaigns" },
    accentColor: "#059669", // emerald-600
    accentSoft: "#6EE7B7",  // emerald-300
    quick: [
      { label: "Create Campaign", to: "/campaign-header" },
      { label: "Upload Proofs", to: "/campaign-card" },
      { label: "Reports", to: "/oversight-compliance" },
    ],
  },
  {
    role: "Authority (RACA)",
    route: "/oversight-compliance",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    description: "Regulatory oversight with real-time visibility & alerts.",
    features: [
      "Approve/reject campaigns, audit everything",
      "Unified donations ↔ beneficiaries (Sandi)",
      "AML/fraud detection & bank reconciliation",
      "KPI dashboards & automated reporting",
    ],
    cta: "View Oversight Tools",
    ctaSecondary: { label: "Learn How It Works", to: "/how-it-works" },
    accentColor: "#34D399", // emerald-400
    accentSoft: "#BBF7D0",  // emerald-200+
    quick: [
      { label: "Approvals", to: "/oversight-compliance" },
      { label: "KPI Reports", to: "/dashboard-campaigns" },
      { label: "Audit Logs", to: "/who-we-are" },
    ],
  },
];

const marquee = [
  "Sandi Integration",
  "AML & Fraud Detection",
  "Bank Reconciliation",
  "Blockchain Transparency",
  "KPI Dashboards",
  "AI Analytics",
  "AR/VR Impact (Premium)",
  "Arabic & English",
  "Full Audit Logs",
  "Real-Time Tracking",
  "Corporate Sponsorships",
];

function Card({ u, delay = 0 }) {
  const cardRef = useRef(null);

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
    const midX = r.width / 2;
    const midY = r.height / 2;
    const rotX = ((y - midY) / midY) * -6;
    const rotY = ((x - midX) / midX) * 6;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <div className="relative animate-fadeUp" style={{ animationDelay: `${delay}ms` }}>
      <div className="p-[1px] rounded-2xl bg-gradient-to-br from-emerald-300/60 via-emerald-200/40 to-green-200/50">
        <div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative bg-white/90 backdrop-blur rounded-2xl p-8 ring-1 ring-emerald-100 shadow-lg transition-all duration-300 will-change-transform hover:shadow-2xl"
        >
          {/* hover aura */}
          <div className="absolute inset-x-10 -top-1 h-[2px] bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {/* Icon */}
          <div
            className="relative w-20 h-20 mb-6 rounded-2xl grid place-items-center shadow-sm ring-1 ring-emerald-100 overflow-hidden"
            style={{ backgroundColor: `${u.accentSoft}40` }}
          >
            <div className="absolute -inset-1 rounded-2xl conic-shine blur opacity-70" />
            <div className="relative" style={{ color: u.accentColor }}>
              {u.icon}
            </div>
            {/* mouse-follow sheen */}
            <span
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                left: "var(--x)",
                top: "var(--y)",
                width: "280px",
                height: "280px",
                background: "radial-gradient(closest-side, rgba(255,255,255,.32), rgba(255,255,255,0))",
              }}
            />
          </div>

          {/* Role + description */}
          <h3 className="text-2xl font-extrabold text-gray-900 mb-3 tracking-tight">{u.role}</h3>
          <p className="text-gray-600 mb-7 leading-relaxed">{u.description}</p>

          {/* Quick actions */}
          <div className="mb-5 flex flex-wrap gap-2">
            {u.quick?.map((q) => (
              <Link key={q.label} to={q.to} className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:shadow transition">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {q.label}
              </Link>
            ))}
          </div>

          {/* Features */}
          <ul className="space-y-4 mb-8">
            {u.features.map((f, idx) => (
              <li key={idx} className="flex items-start">
                <span
                  className="mr-3 mt-0.5 grid h-6 w-6 place-items-center rounded-full ring-1 ring-emerald-100"
                  style={{ backgroundColor: `${u.accentSoft}55` }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={u.accentColor}>
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </span>
                <span className="text-gray-700">{f}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={u.route}
              className="flex-1 text-center py-3 px-6 rounded-xl font-semibold shadow-sm transition-all duration-300 hover:shadow-md ring-1 ring-emerald-200 hover:brightness-[1.03]"
              style={{ backgroundColor: u.accentColor, color: "white" }}
            >
              {u.cta}
            </Link>
            {u.ctaSecondary && (
              <Link
                to={u.ctaSecondary.to}
                className="flex-1 text-center py-3 px-6 rounded-xl font-semibold border border-emerald-200 bg-white/60 backdrop-blur hover:bg-white transition"
                style={{ color: "#065F46" }}
              >
                {u.ctaSecondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlatformForEveryone() {
  const [active, setActive] = useState("All");

  const userTypes = useMemo(() => {
    if (active === "All") return baseUserTypes;
    return baseUserTypes.filter((u) => u.role === active || (active.startsWith("Authority") && u.role.startsWith("Authority")));
  }, [active]);

  return (
    <section className="relative py-20 md:py-24 bg-gradient-to-b from-green-50 via-emerald-50 to-white overflow-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="animate-float-slow absolute -top-40 -left-20 w-[28rem] h-[28rem] rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="animate-float-slower absolute -bottom-40 -right-20 w-[28rem] h-[28rem] rounded-full bg-green-200/40 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 animate-fadeUp">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 shadow-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Built for all stakeholders
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            A Platform for{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 bg-clip-text text-transparent">
              Everyone
            </span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-600 leading-relaxed">
            Serving Qatar’s charitable ecosystem with{" "}
            <span className="font-semibold text-emerald-600">transparency</span> and{" "}
            <span className="font-semibold text-emerald-600">efficiency</span>.
          </p>
        </div>

        {/* Feature marquee */}
        <div className="relative mb-10">
          <div className="mask-fade pointer-events-none absolute inset-0 z-10" />
          <div className="animate-marquee whitespace-nowrap text-sm font-semibold text-emerald-800/90">
            {marquee.concat(marquee).map((f, i) => (
              <span
                key={i}
                className="mx-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 ring-1 ring-emerald-200 shadow-sm hover:shadow transition-shadow"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Role filter */}
        <div className="mx-auto mb-10 max-w-xl">
          <div className="relative flex items-center justify-between rounded-full bg-emerald-50 p-1 ring-1 ring-emerald-200">
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => setActive(r)}
                className={[
                  "relative z-10 w-1/4 rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                  active === r ? "text-green-900" : "text-emerald-700 hover:text-emerald-900",
                ].join(" ")}
                aria-pressed={active === r}
              >
                {r}
              </button>
            ))}
            <div
              className="absolute inset-y-1 z-0 w-1/4 rounded-full bg-white shadow-sm transition-transform duration-300"
              style={{
                transform:
                  active === "All"
                    ? "translateX(0%)"
                    : active === "Donors"
                    ? "translateX(100%)"
                    : active === "Charities"
                    ? "translateX(200%)"
                    : "translateX(300%)",
              }}
              aria-hidden
            />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {userTypes.map((u, i) => (
            <Card key={u.role} u={u} delay={i * 120} />
          ))}
        </div>

        {/* Integration strip */}
        <div
          className="mt-20 md:mt-24 relative overflow-hidden rounded-2xl p-10 md:p-14 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-500 text-white shadow-xl ring-1 ring-emerald-300/50 animate-fadeUp"
          style={{ animationDelay: `${userTypes.length * 120}ms` }}
        >
          {/* subtle grid */}
          <div className="absolute inset-0 opacity-15">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            {/* Left */}
            <div className="md:w-2/3">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/15 text-sm font-medium mb-5 ring-1 ring-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Integrated Solution
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Seamless Sandi Integration</h3>
              <p className="mb-6 text-lg/8 opacity-95">
                Sync beneficiary data and unify reporting to ensure fair distribution and prevent duplication of aid across Qatar.
              </p>
              <ul className="space-y-4">
                {[
                  "Syncs beneficiaries from Sandi to prevent duplicate assistance",
                  "Unified database: donations + verified beneficiaries",
                  "Authority gets full visibility of all aid inside Qatar",
                ].map((t, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mt-0.5 mr-3 grid h-6 w-6 place-items-center rounded-full bg-white/25 ring-1 ring-white/30">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-lg">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2 text-[12px]">
                {["AML Screening", "Bank Reconciliation", "Blockchain Logs", "Arabic & English", "Full Audit Logs"].map((p) => (
                  <span key={p} className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1.5 ring-1 ring-white/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="md:w-1/3 flex justify-center w-full">
              <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 shadow-lg">
                <div className="text-5xl font-extrabold tracking-tight">100%</div>
                <div className="text-xl font-semibold mt-1">Coordination Efficiency</div>
                <div className="text-sm opacity-90 mt-1">No duplicate assistance</div>
                <div className="mt-6 w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-white h-2.5 rounded-full w-full animate-grow" />
                </div>
                <div className="mt-4 text-xs opacity-95">Powered by Sandi sync & unified oversight</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Local animations */}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        .animate-fadeUp { animation: fadeUp .6s ease-out both; }
        .animate-grow { animation: grow 1.2s ease-out both; }
        @keyframes grow { from { width: 0 } to { width: 100% } }

        .animate-float-slow { animation: floatY 18s ease-in-out infinite; }
        .animate-float-slower { animation: floatY 22s ease-in-out infinite reverse; }
        @keyframes floatY { 0%,100% { transform: translateY(0) } 50% { transform: translateY(16px) } }

        .mask-fade:before, .mask-fade:after {
          content: "";
          position: absolute;
          top: 0; bottom: 0; width: 80px; pointer-events: none;
        }
        .mask-fade:before { left: 0; background: linear-gradient(90deg, rgba(245,255,250,1), rgba(245,255,250,0)); }
        .mask-fade:after  { right: 0; background: linear-gradient(-90deg, rgba(245,255,250,1), rgba(245,255,250,0)); }

        .conic-shine { background: conic-gradient(at 50% 50%, rgba(16,185,129,0.18), rgba(0,0,0,0) 25%, rgba(16,185,129,0.18)); }
      `}</style>
    </section>
  );
}
