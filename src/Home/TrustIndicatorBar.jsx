import React, { useEffect, useMemo, useRef, useState } from "react";

/** Simple intersection-aware count-up with rAF (no external libs) */
function useCountUp(end = 0, duration = 1200, startWhenVisible = true) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startWhenVisible) return;

    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            setValue(Math.floor(end * (1 - Math.pow(1 - t, 3)))); // easeOutCubic
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [end, duration, startWhenVisible]);

  return { ref, value };
}

const roles = [
  {
    key: "donor",
    title: "For Donors",
    bullets: [
      "Give with confidence (RACA oversight)",
      "See real-time impact: photos, videos, maps",
      "Instant digital receipts & tax-friendly summaries",
      "Multi-pay options: cards, bank transfer, wallets, QR",
    ],
  },
  {
    key: "charity",
    title: "For Charities",
    bullets: [
      "Campaign creation & compliance in one place",
      "Sandi sync prevents duplicate assistance",
      "Auto reconciliation with bank statements",
      "KPI dashboard: funds raised, reach, efficiency",
    ],
  },
  {
    key: "authority",
    title: "For RACA (Authority)",
    bullets: [
      "Approve/reject campaigns; full audit logs",
      "AML & fraud alerts with AI scoring",
      "Unified view: donations ↔ beneficiaries (Sandi)",
      "Automated financial & compliance reporting",
    ],
  },
];

const featureMarquee = [
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

const TrustIndicatorBar = () => {
  const [active, setActive] = useState("donor");

  const { ref: c1, value: charities } = useCountUp(42, 1400);
  const { ref: c2, value: raised } = useCountUp(12400000, 1600);
  const { ref: c3, value: families } = useCountUp(5241, 1500);
  const { ref: c4, value: compliance } = useCountUp(100, 1100);

  const raisedPretty = useMemo(
    () =>
      raised >= 1_000_000
        ? `${(raised / 1_000_000).toFixed(1)}M+`
        : raised >= 1_000
        ? `${(raised / 1_000).toFixed(1)}K+`
        : `${raised}+`,
    [raised]
  );

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-green-50 via-emerald-50 to-green-100 py-16 md:py-20 border-t border-b border-green-200/60">
      {/* Ambient parallax glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="animate-float-slow absolute -top-36 -left-24 w-[28rem] h-[28rem] rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="animate-float-slower absolute -bottom-36 -right-24 w-[28rem] h-[28rem] rounded-full bg-green-200/40 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 shadow-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-ping-slow" />
            Real Trust. Real Impact.
          </span>

          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-green-900">
            Trusted by Qatar&apos;s Charitable Community
          </h2>
          <p className="mt-3 text-green-700/90 font-medium">
            Fully integrated with Sandi for transparent, regulated charitable giving
          </p>

          <div className="relative mt-6 mx-auto h-1 w-28">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.35)]" />
            <div className="absolute -inset-x-4 -inset-y-1 rounded-full bg-white/40 blur-lg" />
          </div>
        </div>

        {/* Feature Marquee */}
        <div className="relative mb-10">
          <div className="mask-fade pointer-events-none absolute inset-0 z-10" />
          <div className="animate-marquee whitespace-nowrap text-sm font-semibold text-emerald-800/90">
            {featureMarquee.concat(featureMarquee).map((f, i) => (
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

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Official Partnerships */}
          <div className="group relative rounded-2xl bg-white/90 backdrop-blur p-7 ring-1 ring-green-100 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute inset-x-6 -top-0.5 h-0.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-green-900">Official Partnerships</h3>
              <div className="h-1 w-14 bg-gradient-to-r from-emerald-400 to-green-500 mx-auto mt-2 rounded-full" />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              {/* RACA */}
              <div className="flex flex-col items-center">
                <div className="relative grid place-items-center">
                  <div className="shine-conic absolute -inset-1 rounded-xl blur opacity-80" />
                  <div className="relative w-16 h-16 rounded-xl grid place-items-center text-white font-bold text-[11px] shadow-md ring-1 ring-emerald-200 bg-gradient-to-br from-emerald-400 to-green-500 transition-transform duration-300 group-hover:scale-105">
                    RACA
                  </div>
                </div>
                <span className="mt-2 text-xs font-medium text-green-800">Regulatory Body</span>
              </div>

              {/* Divider */}
              <div className="hidden md:block h-12 w-px bg-green-200/70" />
              <div className="md:hidden w-12 h-px bg-green-200/70" />

              {/* SANDI */}
              <div className="flex flex-col items-center">
                <div className="relative grid place-items-center">
                  <div className="shine-conic absolute -inset-1 rounded-xl blur opacity-80" />
                  <div className="relative w-16 h-16 rounded-xl grid place-items-center text-white font-bold text-[11px] shadow-md ring-1 ring-emerald-300 bg-gradient-to-br from-green-600 to-emerald-700 transition-transform duration-300 group-hover:scale-105">
                    SANDI
                  </div>
                </div>
                <span className="mt-2 text-xs font-medium text-green-800">National Platform</span>
              </div>
            </div>

            {/* Tiny caption */}
            <p className="mt-6 text-center text-xs text-green-800/80">
              Unified view of donations and beneficiaries through secure data sync
            </p>
          </div>

          {/* Our Impact (animated counters) */}
          <div className="group relative rounded-2xl bg-white/90 backdrop-blur p-7 ring-1 ring-green-100 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute inset-x-6 -top-0.5 h-0.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-green-900">Our Impact</h3>
              <div className="h-1 w-14 bg-gradient-to-r from-emerald-400 to-green-500 mx-auto mt-2 rounded-full" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div ref={c1} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(16,185,129,0.25)]">
                  {charities}+
                </div>
                <div className="mt-1 text-xs font-medium text-green-800/90">Verified Charities</div>
              </div>
              <div ref={c2} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(16,185,129,0.25)]">
                  {raisedPretty}
                </div>
                <div className="mt-1 text-xs font-medium text-green-800/90">Donations Raised</div>
              </div>
              <div ref={c3} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(16,185,129,0.25)]">
                  {families}+
                </div>
                <div className="mt-1 text-xs font-medium text-green-800/90">Families Helped</div>
              </div>
              <div ref={c4} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(16,185,129,0.25)]">
                  {compliance}%
                </div>
                <div className="mt-1 text-xs font-medium text-green-800/90">Compliance</div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3 text-[11px] text-green-900/80">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 ring-1 ring-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live tracking
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 ring-1 ring-emerald-200">
                KPI dashboards
              </span>
            </div>
          </div>

          {/* Security & Trust */}
          <div className="group relative rounded-2xl bg-white/90 backdrop-blur p-7 ring-1 ring-green-100 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="absolute inset-x-6 -top-0.5 h-0.5 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-green-900">Security &amp; Trust</h3>
              <div className="h-1 w-14 bg-gradient-to-r from-emerald-400 to-green-500 mx-auto mt-2 rounded-full" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                ["Secure", "Shielded by SSL/TLS & encryption at rest"],
                ["Verified", "Authority approvals & KYC"],
                ["Transparent", "End-to-end traceability (optional blockchain)"],
                ["Compliant", "RACA rules, full audit logs"],
              ].map(([label, hint], i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-md scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="w-12 h-12 rounded-full grid place-items-center border border-green-200 shadow-sm bg-emerald-50 transition-transform duration-300 group-hover:scale-105">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-emerald-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2a9.99 9.99 0 00-7 2.938V11c0 5.25 3.438 9.938 7 11 3.562-1.062 7-5.75 7-11V4.938A9.99 9.99 0 0012 2z" />
                      </svg>
                    </div>
                  </div>
                  <span className="mt-2 text-xs font-semibold text-green-900">{label}</span>
                  <span className="mt-1 text-[11px] text-green-800/80">{hint}</span>
                </div>
              ))}
            </div>

            {/* Pills */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px]">
              {["AML Screening", "Bank Reconciliation", "Sandi Sync", "Arabic & English"].map(
                (t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-emerald-50 px-3 py-1.5 shadow-sm hover:shadow transition"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Role Tabs */}
        <div className="mt-12 rounded-2xl bg-white/90 p-4 ring-1 ring-green-100 shadow-lg backdrop-blur">
          <div className="relative mx-auto flex w-full max-w-2xl items-center justify-between rounded-full bg-emerald-50 p-1 ring-1 ring-emerald-200">
            {roles.map((r) => (
              <button
                key={r.key}
                onClick={() => setActive(r.key)}
                className={[
                  "relative z-10 w-1/3 rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                  active === r.key ? "text-green-900" : "text-emerald-700 hover:text-emerald-900",
                ].join(" ")}
                aria-pressed={active === r.key}
              >
                {r.title}
              </button>
            ))}
            {/* Sliding highlight */}
            <div
              className="absolute inset-y-1 z-0 w-1/3 rounded-full bg-white shadow-sm transition-transform duration-300"
              style={{
                transform:
                  active === "donor"
                    ? "translateX(0%)"
                    : active === "charity"
                    ? "translateX(100%)"
                    : "translateX(200%)",
              }}
              aria-hidden
            />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {roles
              .find((r) => r.key === active)
              ?.bullets.map((b, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-xl border border-green-100 bg-gradient-to-br from-white to-emerald-50/60 p-4 text-sm font-medium text-green-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(120px_60px_at_10%_10%,rgba(16,185,129,.08),transparent),radial-gradient(120px_60px_at_90%_90%,rgba(16,185,129,.08),transparent)]" />
                  <span className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">
                    ✓
                  </span>
                  {b}
                </div>
              ))}
          </div>
        </div>

        {/* Footer strip */}
        <div className="mt-12 pt-8 border-t border-green-200/70 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-green-900">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-1 ring-emerald-300">
              ✓
            </span>
            <span>100% compliant with Qatari charitable regulations</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* SSL pill */}
            <div className="flex items-center gap-2 rounded-full border border-green-200 bg-emerald-50 px-3 py-1.5 shadow-sm hover:shadow transition">
              <div className="w-6 h-6 grid place-items-center rounded-full bg-emerald-500 text-white text-[10px] font-extrabold ring-1 ring-emerald-300">
                SSL
              </div>
              <span className="text-xs font-medium text-green-900">Secure Encryption</span>
            </div>

            {/* Blockchain pill */}
            <div className="flex items-center gap-2 rounded-full border border-green-200 bg-emerald-50 px-3 py-1.5 shadow-sm hover:shadow transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.2 6.5 10.266a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-medium text-green-900">Blockchain Verified</span>
            </div>

            {/* Status pill (mock/placeholder) */}
            <div className="flex items-center gap-2 rounded-full border border-green-200 bg-emerald-50 px-3 py-1.5 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-green-900">System: All services operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Local animations */}
      <style>{`
        .animate-float-slow { animation: floatY 18s ease-in-out infinite; }
        .animate-float-slower { animation: floatY 22s ease-in-out infinite reverse; }
        @keyframes floatY { 0%,100% { transform: translateY(0) } 50% { transform: translateY(16px) } }
        .animate-ping-slow { animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite; }

        .mask-fade:before, .mask-fade:after {
          content: "";
          position: absolute;
          top: 0; bottom: 0; width: 80px; pointer-events: none;
        }
        .mask-fade:before { left: 0; background: linear-gradient(90deg, rgba(245, 255, 250, 1), rgba(245, 255, 250, 0)); }
        .mask-fade:after  { right: 0; background: linear-gradient(-90deg, rgba(245, 255, 250, 1), rgba(245, 255, 250, 0)); }

        .animate-marquee {
          display: inline-block;
          animation: marquee 22s linear infinite;
          will-change: transform;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .shine-conic {
          background: conic-gradient(at 50% 50%, rgba(16,185,129,0.18), rgba(59,130,246,0) 25%, rgba(16,185,129,0.18));
        }
      `}</style>
    </div>
  );
};

export default TrustIndicatorBar;
