import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/** ---- tiny utilities ---- */
function useCountUp(end = 0, duration = 1200) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            setVal(Math.floor(end * (1 - Math.pow(1 - t, 3)))); // easeOutCubic
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return { ref, val };
}

const rawStats = [
  { value: 2500000, label: "Donations Processed", trend: "+15% this month" },
  { value: 150, label: "Charities Registered", trend: "Across Qatar" },
  { value: 98, label: "Donor Satisfaction", trend: "Based on 10k+ reviews", isPercent: true },
  { value: 100, label: "Regulatory Compliance", trend: "Zero violations", isPercent: true },
];

const ALL_TABS = ["all", "transparency", "security", "integration", "management", "accessibility"];

const baseFeatures = [
  {
    title: "Real-time Tracking",
    description: "Follow each donation from donor → charity → beneficiary with photos, videos, and maps.",
    details: ["Timeline view per donation", "Proof media (photos/video)", "Field staff updates"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    category: "transparency",
    tag: "WOW",
  },
  {
    title: "Sandi Integration",
    description: "Sync beneficiary data to prevent duplicate assistance and unify oversight inside Qatar.",
    details: ["Two-way sync", "De-duplication checks", "Unified beneficiary registry"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    category: "integration",
    tag: "SANDI",
  },
  {
    title: "Blockchain Transparency",
    description: "Optional tamper-proof ledger for donation events, receipts, and impact proofs.",
    details: ["Hash commitments", "Independent verification", "Immutable audit trail"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    category: "security",
    tag: "Optional",
  },
  {
    title: "AML & Fraud Detection",
    description: "AI scoring, rule-based screening, and anomaly detection across donations and entities.",
    details: ["Sanctions & PEP checks", "Velocity / pattern alerts", "Explainable flags"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    category: "security",
    tag: "AI",
  },
  {
    title: "Automated Reporting",
    description: "One-click financial & compliance reports for charities and RACA.",
    details: ["Periodic exports", "Drill-down by campaign", "Scheduled delivery"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    category: "management",
  },
  {
    title: "KPI Dashboards",
    description: "Operational metrics for charities and authority: funds, efficiency, reach, risk.",
    details: ["Campaign performance", "Distribution SLAs", "Charity scorecards"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    category: "management",
  },
  {
    title: "Multi-payment Options",
    description: "Cards, bank transfers, QR, digital wallets. Instant receipt for donors.",
    details: ["PCI-aware flows", "Corporate sponsorships", "Reconciliation rules"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    category: "accessibility",
  },
  {
    title: "Multi-platform & Bilingual",
    description: "Web + iOS/Android. Arabic & English everywhere.",
    details: ["RTL layouts", "Localized receipts", "Role-based access control"],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    category: "accessibility",
  },
];

const userStories = [
  {
    quote:
      "As a donor, I can see exactly where my contribution goes. Transparency built my trust.",
    author: "Ahmed Al-Thani",
    role: "Regular Donor",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Sandi integration eliminated duplicate aid—we operate faster and fairer.",
    author: "Fatima Al-Attiyah",
    role: "Charity Admin",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Compliance tools give us complete oversight with less manual work.",
    author: "Khalid Al-Sulaiti",
    role: "RACA Official",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=200&q=80",
  },
];

export default function ImpactShowcase() {
  const [activeTab, setActiveTab] = useState("all");
  const [q, setQ] = useState("");
  const [view, setView] = useState("grid"); // grid | list
  const [expanded, setExpanded] = useState({}); // feature accordions
  const [slide, setSlide] = useState(0);

  // auto-rotate testimonials
  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % userStories.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const features = useMemo(() => {
    const byTab = activeTab === "all" ? baseFeatures : baseFeatures.filter((f) => f.category === activeTab);
    if (!q.trim()) return byTab;
    const t = q.toLowerCase();
    return byTab.filter(
      (f) =>
        f.title.toLowerCase().includes(t) ||
        f.description.toLowerCase().includes(t) ||
        f.details.some((d) => d.toLowerCase().includes(t))
    );
  }, [activeTab, q]);

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-white relative overflow-hidden">
      {/* ambient deco */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute -top-20 -left-24 w-[28rem] h-[28rem] rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="animate-float-slower absolute -bottom-28 -right-24 w-[28rem] h-[28rem] rounded-full bg-green-200/40 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* header */}
        <div className="text-center mb-12 animate-fadeUp">
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-emerald-700 bg-emerald-100 rounded-full ring-1 ring-emerald-200">
            Qatar&apos;s Premier Charity Platform
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-3 tracking-tight">
            Transforming Charitable Giving in Qatar
          </h2>
          <p className="text-lg md:text-xl text-emerald-700/90 max-w-3xl mx-auto leading-relaxed">
            Integrated with <b>Sandi</b> for fair distribution, with <b>AML/fraud detection</b>, <b>bank reconciliation</b>, <b>blockchain transparency</b>, KPI dashboards, and bilingual access.
          </p>

          {/* status bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 ring-1 ring-emerald-200 text-emerald-800">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              System Operational
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 ring-1 ring-emerald-200 text-emerald-800">
              ✓ 100% RACA compliant
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 ring-1 ring-emerald-200 text-emerald-800">
              🔒 SSL/TLS, encrypted at rest
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 ring-1 ring-emerald-200 text-emerald-800">
              ⛓️ Optional blockchain logs
            </span>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {rawStats.map((s, i) => {
            const { ref, val } = useCountUp(s.value, 1000 + i * 150);
            const pretty =
              s.isPercent ? `${val}%` : val >= 1_000_000 ? `${(val / 1_000_000).toFixed(1)}M+` : val >= 1_000 ? `${(val / 1_000).toFixed(1)}K+` : `${val}+`;
            return (
              <div
                key={s.label}
                ref={ref}
                className="bg-white/90 backdrop-blur rounded-2xl ring-1 ring-emerald-100 shadow-lg p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl animate-fadeUp"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <div className="text-4xl font-extrabold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent mb-2">
                  {pretty}
                </div>
                <div className="text-green-900 font-semibold mb-1">{s.label}</div>
                <div className="text-sm text-emerald-700/90">{s.trend}</div>
                <div className="mt-4 w-full bg-emerald-50 h-2 rounded-full overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-emerald-400 to-green-500 animate-grow" style={{ animationDelay: `${i * 120}ms` }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* controls */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* tabs */}
          <div className="relative flex items-center gap-1 rounded-full bg-emerald-50 p-1 ring-1 ring-emerald-200">
            {ALL_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={[
                  "relative z-10 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                  activeTab === tab ? "text-green-900" : "text-emerald-700 hover:text-emerald-900",
                ].join(" ")}
              >
                {tab === "all" ? "All" : tab[0].toUpperCase() + tab.slice(1)}
              </button>
            ))}
            <div
              className="absolute inset-y-1 z-0 rounded-full bg-white shadow-sm transition-transform duration-300"
              style={{
                width: `${100 / ALL_TABS.length}%`,
                transform: `translateX(${ALL_TABS.indexOf(activeTab) * 100}%)`,
              }}
              aria-hidden
            />
          </div>

          {/* search + view */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search features…"
                className="w-56 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-700/70 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="ml-1 flex rounded-full border border-emerald-200 overflow-hidden">
              <button
                className={`px-3 py-1.5 text-xs ${view === "grid" ? "bg-emerald-100 text-emerald-900" : "text-emerald-700"}`}
                onClick={() => setView("grid")}
              >
                Grid
              </button>
              <button
                className={`px-3 py-1.5 text-xs ${view === "list" ? "bg-emerald-100 text-emerald-900" : "text-emerald-700"}`}
                onClick={() => setView("list")}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* features */}
        {features.length === 0 ? (
          <div className="mb-16 text-center text-sm text-emerald-700">No features match your search.</div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="relative bg-white/90 backdrop-blur rounded-2xl ring-1 ring-emerald-100 shadow-lg p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fadeUp"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="text-emerald-600 mb-4 flex justify-center drop-shadow-sm">{f.icon}</div>
                <h3 className="text-lg font-extrabold text-green-900 mb-1 text-center tracking-tight">
                  {f.title}
                </h3>
                <p className="text-emerald-800/90 text-center text-sm leading-relaxed">{f.description}</p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px]">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 ring-1 ring-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {f.category}
                  </span>
                  {f.tag && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 ring-1 ring-emerald-200">
                      ★ {f.tag}
                    </span>
                  )}
                </div>

                {/* accordion */}
                <button
                  onClick={() => setExpanded((e) => ({ ...e, [f.title]: !e[f.title] }))}
                  className="mt-4 w-full rounded-lg border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-900 hover:bg-emerald-50 transition"
                >
                  {expanded[f.title] ? "Hide details" : "Show details"}
                </button>
                <div
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ${expanded[f.title] ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <ul className="mt-3 space-y-2 text-sm text-emerald-900/90">
                    {f.details.map((d) => (
                      <li key={d} className="flex items-start">
                        <span className="mt-1 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-16 space-y-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="flex items-start gap-4 rounded-xl bg-white/90 backdrop-blur p-4 ring-1 ring-emerald-100 shadow-sm hover:shadow-md transition animate-fadeUp"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="text-emerald-600">{f.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-green-900 font-bold">{f.title}</h4>
                    <span className="text-[11px] rounded-full bg-emerald-50 px-2 py-0.5 ring-1 ring-emerald-200">{f.category}</span>
                    {f.tag && <span className="text-[11px] rounded-full bg-white px-2 py-0.5 ring-1 ring-emerald-200">★ {f.tag}</span>}
                  </div>
                  <p className="text-sm text-emerald-800/90 mt-1">{f.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {f.details.map((d) => (
                      <span key={d} className="text-[11px] rounded-full bg-emerald-50 px-2 py-1 ring-1 ring-emerald-200">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setExpanded((e) => ({ ...e, [f.title]: !e[f.title] }))}
                  className="self-center rounded-full border border-emerald-200 px-3 py-1 text-xs hover:bg-emerald-50"
                >
                  {expanded[f.title] ? "−" : "+"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* impact map mock (pins pulse) */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl ring-1 ring-emerald-100 shadow-lg bg-emerald-900/5">
            <img
              src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?auto=format&fit=crop&w=1400&q=60"
              alt="Impact Map"
              className="w-full h-72 md:h-80 object-cover"
            />
            {/* pins */}
            <div className="absolute inset-0">
              {[
                { top: "35%", left: "40%" },
                { top: "55%", left: "65%" },
                { top: "48%", left: "28%" },
              ].map((p, i) => (
                <span key={i} className="absolute" style={{ top: p.top, left: p.left }}>
                  <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 ring-2 ring-white" />
                </span>
              ))}
            </div>
            <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-2 text-xs ring-1 ring-emerald-200 shadow">
              Live distribution updates from field staff
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 backdrop-blur ring-1 ring-emerald-100 shadow-lg">
            <h4 className="text-lg font-extrabold text-green-900">Operational Snapshot</h4>
            <p className="text-sm text-emerald-800/90 mt-1">
              Unified oversight across donors, charities, and beneficiaries via Sandi sync.
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                "AML alerts: 0 critical, 3 info (last 24h)",
                "Reconciled transactions today: 1,248",
                "Open campaigns under review: 7",
                "Media proofs processed: 412",
              ].map((r) => (
                <li key={r} className="flex items-start">
                  <span className="mt-1 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {r}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/dashboard-campaigns" className="rounded-full bg-emerald-600 text-white px-4 py-2 text-xs font-semibold shadow hover:brightness-105">
                View KPI Dashboards
              </Link>
              <Link to="/oversight-compliance" className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50">
                Oversight & Compliance
              </Link>
            </div>
          </div>
        </div>

        {/* testimonials carousel */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-extrabold text-green-900">What Our Users Say</h3>
            <p className="text-emerald-700/90">Donors, charities, and RACA officials</p>
          </div>

          <div className="relative mx-auto max-w-3xl">
            {userStories.map((s, i) => (
              <div
                key={s.author}
                className={`absolute inset-0 flex flex-col items-center text-center rounded-2xl bg-white/90 backdrop-blur p-8 ring-1 ring-emerald-100 shadow-lg transition-all duration-500 ${
                  i === slide ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-4 z-0 pointer-events-none"
                }`}
              >
                <img src={s.image} alt={s.author} className="w-14 h-14 rounded-full object-cover ring-2 ring-emerald-200 mb-3" />
                <p className="text-emerald-900 italic leading-relaxed">“{s.quote}”</p>
                <div className="mt-3 text-sm text-emerald-800/90 font-semibold">{s.author}</div>
                <div className="text-xs text-emerald-700/80">{s.role}</div>
              </div>
            ))}

            <div className="h-44" /> {/* layout spacer */}
            <div className="mt-3 flex justify-center gap-2">
              {userStories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`h-2 rounded-full transition-all ${i === slide ? "w-8 bg-emerald-600" : "w-2 bg-emerald-300"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-extrabold text-green-900 mb-6">
            Join Qatar&apos;s Trusted Charity Platform
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:brightness-105 transition-all duration-200 ring-1 ring-emerald-500 text-center"
            >
              Register Your Charity
            </Link>
            <Link
              to="/donate"
              className="px-8 py-3 bg-white text-emerald-700 border border-emerald-600 font-semibold rounded-lg shadow-md hover:bg-emerald-50 transition-colors text-center"
            >
              Make a Donation
            </Link>
          </div>
          <div className="mt-4 text-xs text-emerald-800/80">
            Corporate sponsor? <Link to="/corporate" className="underline hover:text-emerald-900">Learn more</Link>
          </div>
        </div>
      </div>

      {/* local animations */}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        .animate-fadeUp { animation: fadeUp .6s ease-out both; }
        .animate-grow { animation: grow 1.2s ease-out both; }
        @keyframes grow { from { width: 0 } to { width: 100% } }

        .animate-float-slow { animation: floatY 18s ease-in-out infinite; }
        .animate-float-slower { animation: floatY 22s ease-in-out infinite reverse; }
        @keyframes floatY { 0%,100% { transform: translateY(0) } 50% { transform: translateY(16px) } }
      `}</style>
    </section>
  );
}
