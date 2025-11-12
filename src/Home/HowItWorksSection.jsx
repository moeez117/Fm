import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const DONOR_FLOW = [
  {
    title: "Choose RACA-Verified Campaign",
    desc: "Browse approved campaigns with clear needs and verified goals.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    hint: "Trust badges + licenses visible",
  },
  {
    title: "Donate Securely",
    desc: "Cards, bank transfers, wallets & QR — encrypted end-to-end.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
      </svg>
    ),
    hint: "Instant receipt generated",
  },
  {
    title: "Real-Time Tracking",
    desc: "Photos, videos & map updates from field staff as aid is delivered.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m-4-4h8" />
      </svg>
    ),
    hint: "Timeline view per donation",
  },
  {
    title: "Transparent Reporting",
    desc: "Shareable impact summary + (optional) blockchain proof hash.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.6a1 1 0 01.7.3l5.4 5.4a1 1 0 01.3.7V19a2 2 0 01-2 2z"/>
      </svg>
    ),
    hint: "Easy to export/share",
  },
];

const CHARITY_FLOW = [
  { title: "Register & Verify", desc: "Upload licenses; get approved.", short: "KYC/License" },
  { title: "Create Campaign", desc: "Goals, budget, timeline, media.", short: "Campaign" },
  { title: "Sandi Sync", desc: "Beneficiary de-duplication.", short: "Sandi" },
  { title: "Reconcile & Report", desc: "Bank matching & RACA reports.", short: "Reports" },
];

const RACA_FLOW = [
  { title: "Oversight & Approvals", desc: "Approve/reject campaigns.", short: "Approvals" },
  { title: "KPI & Risk", desc: "Dashboards + AML alerts.", short: "KPI/AML" },
  { title: "Unified Registry", desc: "Donations ↔ beneficiaries.", short: "Registry" },
  { title: "Audit & Compliance", desc: "Immutable logs (optional chain).", short: "Audit" },
];

const FAQ = [
  { q: "How do you prevent duplicate assistance?", a: "We sync with Sandi to check beneficiary records before distribution, flagging duplicates for review." },
  { q: "Is blockchain required?", a: "No — it’s optional. We record hashes of receipts/updates when enabled for tamper-proof transparency." },
  { q: "What about AML & fraud?", a: "AI scoring + rules trigger alerts on unusual patterns; RACA sees flagged items in real time." },
  { q: "Is the platform bilingual?", a: "Yes. Web + mobile apps are available in Arabic and English, with RTL support." },
];

export default function HowItWorksSection() {
  const [role, setRole] = useState("Donor");
  const steps = useMemo(
    () => (role === "Donor" ? DONOR_FLOW : role === "Charity" ? DONOR_FLOW.slice(0,1).concat(CHARITY_FLOW) : DONOR_FLOW.slice(0,1).concat(RACA_FLOW)),
    [role]
  );

  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const timer = useRef(null);

  useEffect(() => {
    if (!auto) return;
    timer.current = setInterval(() => {
      setActive((a) => (a + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer.current);
  }, [auto, steps.length]);

  useEffect(() => () => clearInterval(timer.current), []);

  // receipt & modal
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText("https://qatar-charity.example/receipt/RCPT-9A2Q7K");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-green-50 via-emerald-50 to-white relative overflow-hidden">
      {/* ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float-slow absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="animate-float-slower absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-green-200/40 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* header */}
        <div className="text-center max-w-3xl mx-auto mb-10 animate-fadeUp">
          <div className="inline-flex items-center justify-center px-4 py-1.5 bg-white/80 ring-1 ring-emerald-200 rounded-full text-emerald-700 font-medium text-sm mb-6 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Transparent Process
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mb-3 tracking-tight">
            How Your Donation Makes an Impact
          </h2>
          <p className="text-lg text-emerald-800/80">
            From donation to distribution — integrated with Qatar’s <b>Sandi</b>, with AML screening,
            reconciliation, and optional blockchain proof.
          </p>
        </div>

        {/* role switcher */}
        <div className="mx-auto mb-8 max-w-xl">
          <div className="relative flex items-center justify-between rounded-full bg-emerald-50 p-1 ring-1 ring-emerald-200">
            {["Donor", "Charity", "RACA"].map((r, i) => (
              <button
                key={r}
                onClick={() => { setRole(r); setActive(0); }}
                className={[
                  "relative z-10 w-1/3 rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                  role === r ? "text-green-900" : "text-emerald-700 hover:text-emerald-900",
                ].join(" ")}
                aria-pressed={role === r}
              >
                {r}
              </button>
            ))}
            <div
              className="absolute inset-y-1 z-0 w-1/3 rounded-full bg-white shadow-sm transition-transform duration-300"
              style={{
                transform:
                  role === "Donor" ? "translateX(0%)" : role === "Charity" ? "translateX(100%)" : "translateX(200%)",
              }}
            />
          </div>
        </div>

        {/* stepper + controls */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActive((a) => (a - 1 + steps.length) % steps.length)}
              className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-emerald-50 transition"
            >
              ← Prev
            </button>
            <button
              onClick={() => setAuto((v) => !v)}
              className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-emerald-50 transition"
            >
              {auto ? "Pause Auto" : "Play Auto"}
            </button>
            <button
              onClick={() => setActive((a) => (a + 1) % steps.length)}
              className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-emerald-50 transition"
            >
              Next →
            </button>
          </div>

          {/* progress */}
          <div className="flex-1 mx-4 h-2 rounded-full bg-emerald-100 overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-500"
              style={{ width: `${((active + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* quick demo */}
          <button
            onClick={() => setShowModal(true)}
            className="rounded-full bg-emerald-600 text-white px-3 py-1.5 text-xs font-semibold shadow hover:brightness-105"
          >
            Watch 40s Demo
          </button>
        </div>

        {/* steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.title ?? s.short}
              className={[
                "relative rounded-2xl p-6 bg-white/90 backdrop-blur ring-1 ring-emerald-100 shadow-lg transition-all duration-300",
                i === active ? "hover:-translate-y-1 hover:shadow-2xl" : "opacity-90",
              ].join(" ")}
              onMouseEnter={() => setActive(i)}
            >
              {/* top accent */}
              <div className="absolute inset-x-8 -top-0.5 h-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-green-500" />
              <div className="flex items-start justify-between">
                <div className="text-emerald-600">{s.icon ?? <span className="text-xs font-bold">{s.short}</span>}</div>
                <div className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] ring-1 ring-emerald-200 text-emerald-800">
                  Step {i + 1}
                </div>
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-green-900">{s.title ?? s.short}</h3>
              <p className="mt-2 text-sm text-emerald-800/90">{s.desc}</p>

              {/* micro hint */}
              {"hint" in s && (
                <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] ring-1 ring-emerald-200 text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {s.hint}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* extra: receipt preview + blockchain hash */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* receipt card */}
          <div className="lg:col-span-2 rounded-2xl p-6 bg-white/90 backdrop-blur ring-1 ring-emerald-100 shadow-lg">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-extrabold text-green-900">Receipt Preview</h4>
              <span className="text-[11px] rounded-full bg-emerald-50 px-2 py-0.5 ring-1 ring-emerald-200 text-emerald-800">
                Donor copy
              </span>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-emerald-700/80">Receipt #</div>
                <div className="font-semibold text-green-900">RCPT-9A2Q7K</div>
              </div>
              <div>
                <div className="text-emerald-700/80">Campaign</div>
                <div className="font-semibold text-green-900">Emergency Relief (Health)</div>
              </div>
              <div>
                <div className="text-emerald-700/80">Amount</div>
                <div className="font-semibold text-green-900">QAR 500.00</div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={copyLink}
                className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-emerald-50 transition"
              >
                Copy receipt link
              </button>
              <Link
                to="/cta-section"
                className="rounded-full bg-emerald-600 text-white px-3 py-1.5 text-xs font-semibold shadow hover:brightness-105"
              >
                View campaign
              </Link>
              <span className="text-[11px] text-emerald-700/80">Instant email & downloadable PDF</span>
            </div>

            {/* toast */}
            <div
              className={[
                "fixed left-1/2 -translate-x-1/2 top-6 z-50 rounded-lg px-3 py-2 text-sm shadow ring-1 transition-all duration-300",
                copied ? "bg-emerald-600 text-white opacity-100 translate-y-0" : "bg-emerald-600 text-white opacity-0 -translate-y-2 pointer-events-none",
              ].join(" ")}
            >
              Receipt link copied ✓
            </div>

            {/* chain hash accordion */}
            <details className="mt-5 group">
              <summary className="cursor-pointer list-none rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-900 hover:bg-emerald-50 transition">
                Show blockchain proof hash (optional)
              </summary>
              <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-xs ring-1 ring-emerald-200 text-emerald-900">
                <div><b>txHash:</b> 0x6a8f…b91e</div>
                <div><b>payloadHash:</b> 0x23c7…9d1a</div>
                <div className="mt-2 text-emerald-800/80">Use any explorer or our verifier to validate.</div>
              </div>
            </details>
          </div>

          {/* ops snapshot */}
          <div className="rounded-2xl p-6 bg-white/90 backdrop-blur ring-1 ring-emerald-100 shadow-lg">
            <h4 className="text-lg font-extrabold text-green-900">Operational Snapshot</h4>
            <p className="text-sm text-emerald-800/90 mt-1">
              Unified oversight via Sandi sync, AML alerts, and bank reconciliation.
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                "Sandi duplicate checks: 0 flagged today",
                "AML alerts (24h): 0 critical, 3 info",
                "Reconciled transactions: 1,248",
                "Open approvals: 7 campaigns",
              ].map((t) => (
                <li key={t} className="flex items-start">
                  <span className="mt-1 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link to="/dashboard-campaigns" className="rounded-full bg-emerald-600 text-white px-4 py-2 text-xs font-semibold shadow hover:brightness-105">
                KPI Dashboards
              </Link>
              <Link to="/oversight-compliance" className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50">
                Oversight & Compliance
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-10 rounded-2xl bg-white/90 backdrop-blur p-6 ring-1 ring-emerald-100 shadow-lg">
          <h4 className="text-lg font-extrabold text-green-900 mb-4">Frequently Asked Questions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FAQ.map((f, i) => (
              <details key={f.q} className="rounded-xl border border-emerald-200 bg-white p-4 transition">
                <summary className="cursor-pointer list-none font-semibold text-emerald-900">
                  {i + 1}. {f.q}
                </summary>
                <p className="mt-2 text-sm text-emerald-800/90">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-fadeUp">
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:brightness-105 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-300/50 ring-1 ring-emerald-500"
          >
            Start Donating Now
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12"/>
            </svg>
          </Link>
          <p className="text-sm text-emerald-800/70 mt-4">
            All donations are processed securely. Bilingual receipts available (Arabic & English).
          </p>
        </div>
      </div>

      {/* demo modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 px-4" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-emerald-100 overflow-hidden animate-modalIn">
            <div className="p-4 flex items-center justify-between">
              <h5 className="font-extrabold text-green-900">How It Works — Quick Demo</h5>
              <button onClick={() => setShowModal(false)} className="rounded-full border border-emerald-200 px-3 py-1 text-xs hover:bg-emerald-50">Close</button>
            </div>
            <div className="aspect-video bg-emerald-900/5 grid place-items-center text-emerald-800">
              {/* Replace with your video embed if available */}
              <div className="text-center px-6">
                <div className="text-2xl font-bold mb-1">Demo Placeholder</div>
                <div className="text-sm">Embed a 40s product walkthrough video here.</div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-end gap-2">
              <Link to="/how-it-works" className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-50">Learn More</Link>
              <Link to="/cta-section" className="rounded-full bg-emerald-600 text-white px-3 py-1.5 text-xs font-semibold shadow hover:brightness-105">Explore Campaigns</Link>
            </div>
          </div>
        </div>
      )}

      {/* animations */}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
        .animate-fadeUp { animation: fadeUp .6s ease-out both; }

        .animate-float-slow { animation: floatY 18s ease-in-out infinite; }
        .animate-float-slower { animation: floatY 22s ease-in-out infinite reverse; }
        @keyframes floatY { 0%,100% { transform: translateY(0) } 50% { transform: translateY(16px) } }

        @keyframes modalIn { from { transform: translateY(8px); opacity: .6 } to { transform: translateY(0); opacity: 1 } }
        .animate-modalIn { animation: modalIn .25s ease-out both; }
      `}</style>
    </section>
  );
}
