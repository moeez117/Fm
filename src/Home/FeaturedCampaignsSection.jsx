import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedCampaignsSection = () => {
  const campaigns = [
    {
      id: "cmp-health-01",
      category: "Health",
      title: "Medical Support for Families",
      charity: "Qatar Red Crescent",
      description:
        "Provide essential medical care and medication for low-income families across Qatar",
      raised: 450000,
      goal: 750000,
      donors: 1245,
      daysLeft: 12,
      verified: true,
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "cmp-edu-02",
      category: "Education",
      title: "Digital Learning for Students",
      charity: "Education Above All",
      description:
        "Supply tablets and internet access for students in need to continue their education",
      raised: 285000,
      goal: 500000,
      donors: 892,
      daysLeft: 21,
      verified: true,
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "cmp-relief-03",
      category: "Relief",
      title: "Winter Aid Package Distribution",
      charity: "Qatar Charity",
      description:
        "Provide warm clothing, blankets and heating equipment for families during winter months",
      raised: 620000,
      goal: 800000,
      donors: 1567,
      daysLeft: 5,
      verified: true,
      image:
        "https://images.unsplash.com/photo-1577896851231-70ef18861754?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Trending");
  const [view, setView] = useState("grid"); // grid | list
  const [saved, setSaved] = useState(() => new Set());
  const [copiedId, setCopiedId] = useState(null);

  // Quick Donate modal
  const [openDonateFor, setOpenDonateFor] = useState(null);
  const [amount, setAmount] = useState(250);
  const [method, setMethod] = useState("Card");

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-QA", {
      style: "currency",
      currency: "QAR",
      maximumFractionDigits: 0,
    }).format(amount);

  const pct = (raised, goal) => Math.min(100, Math.round((raised / goal) * 100));

  const categories = ["All", "Health", "Education", "Relief"];

  const filtered = useMemo(() => {
    let data = [...campaigns];
    if (category !== "All") data = data.filter((c) => c.category === category);
    if (query.trim()) {
      const t = query.toLowerCase();
      data = data.filter(
        (c) =>
          c.title.toLowerCase().includes(t) ||
          c.charity.toLowerCase().includes(t) ||
          c.description.toLowerCase().includes(t)
      );
    }
    if (sortBy === "Trending") data.sort((a, b) => pct(b.raised, b.goal) - pct(a.raised, a.goal));
    if (sortBy === "Ending Soon") data.sort((a, b) => a.daysLeft - b.daysLeft);
    if (sortBy === "Most Donors") data.sort((a, b) => b.donors - a.donors);
    return data;
  }, [campaigns, category, query, sortBy]);

  // copy share link
  const copyShare = async (id) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/campaign/${id}`);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {}
  };

  // impact/fee estimations (mock)
  const fee = useMemo(() => Math.max(0, Math.round(amount * 0.012)), [amount]); // 1.2%
  const netImpact = useMemo(() => Math.max(0, amount - fee), [amount]);

  // simple parallax on hero header
  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${y * -6}deg`);
      el.style.setProperty("--ry", `${x * 6}deg`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="mb-6 pt-24 bg-gradient-to-b from-green-50 via-emerald-50 to-white relative overflow-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-green-200/40 blur-3xl" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div
          ref={heroRef}
          className="text-center max-w-3xl mx-auto mb-10 animate-fadeUp will-change-transform"
          style={{ transform: "perspective(1000px) rotateX(var(--rx,0)) rotateY(var(--ry,0))" }}
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 bg-white/80 ring-1 ring-emerald-200 rounded-full text-emerald-700 font-medium text-sm mb-6 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Verified Campaigns
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-3 tracking-tight">
            Make a Difference Today
          </h2>
          <p className="text-lg text-emerald-800/90">
            Support RACA-approved campaigns from trusted charities in Qatar. All campaigns are integrated with Sandi for transparent impact.
          </p>
          <div className="mt-6 h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.35)]" />
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={[
                  "rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition",
                  category === c
                    ? "bg-emerald-600 text-white ring-emerald-500"
                    : "bg-white text-emerald-800 ring-emerald-200 hover:bg-emerald-50",
                ].join(" ")}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search campaigns…"
                className="w-56 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-700/70 text-xs">
                  ✕
                </button>
              )}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-emerald-200 bg-white/70 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              <option>Trending</option>
              <option>Ending Soon</option>
              <option>Most Donors</option>
            </select>
            <div className="ml-1 flex rounded-full border border-emerald-200 overflow-hidden">
              <button className={`px-3 py-1.5 text-xs ${view === "grid" ? "bg-emerald-100 text-emerald-900" : "text-emerald-700"}`} onClick={() => setView("grid")}>
                Grid
              </button>
              <button className={`px-3 py-1.5 text-xs ${view === "list" ? "bg-emerald-100 text-emerald-900" : "text-emerald-700"}`} onClick={() => setView("list")}>
                List
              </button>
            </div>
          </div>
        </div>

        {/* Campaigns */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-emerald-800/80">No campaigns match your filters.</div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((campaign, index) => {
              const percent = pct(campaign.raised, campaign.goal);
              const isSaved = saved.has(campaign.id);

              return (
                <div
                  key={campaign.id}
                  className="relative group bg-white/90 backdrop-blur rounded-2xl ring-1 ring-emerald-100 shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl animate-fadeUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="h-48 relative overflow-hidden">
                    <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute -inset-y-10 -left-1/2 w-1/2 bg-white/25 blur-md rotate-12 animate-shine" />
                    </div>
                    {/* Chips */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ring-1 ${
                          campaign.category === "Health"
                            ? "bg-emerald-50 text-emerald-800 ring-emerald-200"
                            : campaign.category === "Education"
                            ? "bg-green-100 text-green-900 ring-green-200"
                            : "bg-emerald-100 text-emerald-800 ring-emerald-200"
                        }`}
                      >
                        {campaign.category}
                      </span>
                      {campaign.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold ring-1 ring-emerald-200 text-emerald-700">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    {/* Save/Share */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => setSaved((s) => {
                          const n = new Set(s);
                          n.has(campaign.id) ? n.delete(campaign.id) : n.add(campaign.id);
                          return n;
                        })}
                        className={`grid h-9 w-9 place-items-center rounded-full bg-white/90 ring-1 ring-emerald-200 shadow hover:shadow-md transition ${
                          isSaved ? "text-emerald-600" : "text-emerald-800/70"
                        }`}
                        title={isSaved ? "Saved" : "Save for later"}
                      >
                        {isSaved ? "★" : "☆"}
                      </button>
                      <button
                        onClick={() => copyShare(campaign.id)}
                        className="grid h-9 w-9 place-items-center rounded-full bg-white/90 ring-1 ring-emerald-200 shadow hover:shadow-md transition text-emerald-800/80"
                        title="Copy share link"
                      >
                        ⤴
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-900">{campaign.charity}</span>
                      <span className="text-xs rounded-full bg-emerald-50 px-2 py-0.5 ring-1 ring-emerald-200 text-emerald-800">{campaign.daysLeft} days left</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-green-900 mb-2 leading-tight tracking-tight">
                      {campaign.title}
                    </h3>
                    <p className="text-emerald-800/90 mb-4">{campaign.description}</p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-green-900 mb-2 font-medium">
                        <span>{percent}% funded</span>
                        <span>{formatCurrency(campaign.raised)}</span>
                      </div>
                      <div className="w-full bg-emerald-100/70 rounded-full h-2.5 overflow-hidden ring-1 ring-emerald-200/60">
                        <div className="h-2.5 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-600 animate-growX origin-left" style={{ width: `${percent}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-emerald-700/70 mt-1">
                        <span>Raised</span>
                        <span>Goal: {formatCurrency(campaign.goal)}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-green-900 mb-5">
                      <span>{campaign.donors.toLocaleString()} donors</span>
                      <span className="text-emerald-700/80">Sandi-integrated</span>
                    </div>

                    {/* CTAs */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setOpenDonateFor(campaign);
                          setAmount(250);
                          setMethod("Card");
                        }}
                        className="flex-1 bg-emerald-600 hover:brightness-105 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-emerald-300/50 ring-1 ring-emerald-500"
                      >
                        Donate Now
                      </button>
                      <Link
                        to="/campaign-card"
                        className="flex-1 text-center bg-white text-emerald-700 font-semibold py-2.5 px-4 rounded-lg border border-emerald-600 shadow-sm hover:bg-emerald-50 transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>

                  {/* share toast */}
                  <div
                    className={[
                      "pointer-events-none absolute left-1/2 -translate-x-1/2 top-3 z-40 rounded-md px-3 py-1.5 text-xs font-semibold ring-1 transition-all duration-300",
                      copiedId === campaign.id ? "bg-emerald-600 text-white opacity-100 translate-y-0" : "bg-emerald-600 text-white opacity-0 -translate-y-2",
                    ].join(" ")}
                  >
                    Link copied ✓
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((c, i) => {
              const percent = pct(c.raised, c.goal);
              const isSaved = saved.has(c.id);
              return (
                <div
                  key={c.id}
                  className="flex items-start gap-4 rounded-2xl bg-white/90 backdrop-blur p-4 ring-1 ring-emerald-100 shadow hover:shadow-md transition animate-fadeUp"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="relative w-40 h-28 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 text-[11px] rounded-full bg-white/90 px-2 py-0.5 ring-1 ring-emerald-200">{c.category}</div>
                    <button
                      onClick={() => setSaved((s) => {
                        const n = new Set(s);
                        n.has(c.id) ? n.delete(c.id) : n.add(c.id);
                        return n;
                      })}
                      className={`absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 ring-1 ring-emerald-200 shadow ${isSaved ? "text-emerald-600" : "text-emerald-800/70"}`}
                      title={isSaved ? "Saved" : "Save"}
                    >
                      {isSaved ? "★" : "☆"}
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-green-900">{c.charity}</div>
                      <div className="text-[11px] rounded-full bg-emerald-50 px-2 py-0.5 ring-1 ring-emerald-200 text-emerald-800">{c.daysLeft} days left</div>
                    </div>
                    <h3 className="mt-1 text-lg font-extrabold text-green-900">{c.title}</h3>
                    <p className="text-sm text-emerald-800/90 line-clamp-2">{c.description}</p>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-green-900 mb-1 font-medium">
                        <span>{percent}%</span>
                        <span>{formatCurrency(c.raised)}</span>
                      </div>
                      <div className="w-full bg-emerald-100/70 rounded-full h-2 overflow-hidden ring-1 ring-emerald-200/60">
                        <div className="h-2 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-600 animate-growX origin-left" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => {
                          setOpenDonateFor(c);
                          setAmount(250);
                          setMethod("Card");
                        }}
                        className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white ring-1 ring-emerald-500 hover:brightness-105"
                      >
                        Donate
                      </button>
                      <button
                        onClick={() => copyShare(c.id)}
                        className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold hover:bg-emerald-50"
                      >
                        Share
                      </button>
                      <Link to="/campaign-card" className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold hover:bg-emerald-50">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All CTA */}
        <div className="text-center mt-10 animate-fadeUp" style={{ animationDelay: `${filtered.length * 100}ms` }}>
          <Link
            to="/cta-section"
            className="bg-white text-emerald-700 font-semibold py-2.5 px-10 rounded-lg border-2 border-emerald-600 shadow-md hover:shadow-lg hover:bg-emerald-50 transition-all inline-block"
          >
            View All Campaigns
          </Link>
          <p className="text-sm text-emerald-800/70 mt-3">All campaigns are RACA-approved and Sandi-integrated</p>
        </div>
      </div>

      {/* Quick Donate Modal */}
      {openDonateFor && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-emerald-100 overflow-hidden animate-modalIn">
            <div className="p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-emerald-700/80">Quick Donate</div>
                <div className="font-extrabold text-green-900 leading-tight">{openDonateFor.title}</div>
              </div>
              <button onClick={() => setOpenDonateFor(null)} className="rounded-full border border-emerald-200 px-3 py-1 text-xs hover:bg-emerald-50">
                Close
              </button>
            </div>

            <div className="px-4 pb-4">
              {/* Presets */}
              <div className="mb-3 flex flex-wrap gap-2">
                {[100, 250, 500, 1000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setAmount(v)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition ${
                      amount === v ? "bg-emerald-600 text-white ring-emerald-500" : "bg-white text-emerald-800 ring-emerald-200 hover:bg-emerald-50"
                    }`}
                  >
                    QAR {v}
                  </button>
                ))}
              </div>

              {/* Slider */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-emerald-800/90 mb-1">
                  <span>Custom Amount</span>
                  <span className="font-semibold">{formatCurrency(amount)}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={5000}
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-600"
                />
              </div>

              {/* Methods */}
              <div className="mb-4">
                <div className="text-xs text-emerald-800/90 mb-1">Payment Method</div>
                <div className="flex flex-wrap gap-2">
                  {["Card", "Bank Transfer", "Wallet", "QR"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMethod(m)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition ${
                        method === m ? "bg-emerald-600 text-white ring-emerald-500" : "bg-white text-emerald-800 ring-emerald-200 hover:bg-emerald-50"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-lg bg-emerald-50 p-3 ring-1 ring-emerald-200">
                  <div className="text-emerald-700/80">Amount</div>
                  <div className="font-bold text-green-900">{formatCurrency(amount)}</div>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3 ring-1 ring-emerald-200">
                  <div className="text-emerald-700/80">Fees (est.)</div>
                  <div className="font-bold text-green-900">{formatCurrency(fee)}</div>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3 ring-1 ring-emerald-200">
                  <div className="text-emerald-700/80">Impact Net</div>
                  <div className="font-bold text-green-900">{formatCurrency(netImpact)}</div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-[11px] text-emerald-700/80">
                  Instant receipt • Sandi de-duplication • Optional blockchain log
                </div>
                <Link
                  to="/donate"
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-105 ring-1 ring-emerald-500"
                >
                  Continue →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* animations */}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        .animate-fadeUp { animation: fadeUp .6s ease-out both; }

        @keyframes growX { from { transform: scaleX(0) } to { transform: scaleX(1) } }
        .animate-growX { animation: growX 1.1s ease-out both; }

        @keyframes shine { 0% { transform: translateX(-120%) } 100% { transform: translateX(220%) } }
        .animate-shine { animation: shine 1.2s ease-in-out; }

        @keyframes modalIn { from { transform: translateY(8px); opacity: .6 } to { transform: translateY(0); opacity: 1 } }
        .animate-modalIn { animation: modalIn .25s ease-out both; }
      `}</style>
    </section>
  );
};

export default FeaturedCampaignsSection;
