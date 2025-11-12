import React from "react";
import {
  FiHeart,
  FiPlay,
  FiDollarSign,
  FiTarget,
  FiTruck,
  FiAward,
  FiVideo,
} from "react-icons/fi";

export default function MoneyPurs() {
  const steps = [
    {
      id: 1,
      title: "You Donate",
      desc: "Your contribution is securely received through our platform.",
      icon: <FiDollarSign className="w-8 h-8" />,
    },
    {
      id: 2,
      title: "Allocation",
      desc: "Funds are allocated to verified charity campaigns.",
      icon: <FiTarget className="w-8 h-8" />,
    },
    {
      id: 3,
      title: "Distribution",
      desc: "Money is distributed to provide food, shelter, or healthcare.",
      icon: <FiTruck className="w-8 h-8" />,
    },
    {
      id: 4,
      title: "Impact",
      desc: "Donors receive updates with photos, stories, and real outcomes.",
      icon: <FiAward className="w-8 h-8" />,
    },
  ];

  const videos = [
    {
      url: "https://www.youtube.com/embed/Vqvnb2WORhk?si=V9XjE7n1edOXfnoR",
      title: "Transparency in Action",
    },
    {
      url: "https://www.youtube.com/embed/ysz5S6PUM-U",
      title: "Success Stories",
    },
    {
      url: "https://www.youtube.com/embed/ScMzIvxBSi4",
      title: "Community Impact",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-emerald-50/70 pt-20 pb-16 px-6">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[26rem] w-[26rem] rounded-full bg-emerald-300/30 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto inline-flex items-center justify-center rounded-full bg-emerald-100 px-4 py-2 text-emerald-700 ring-1 ring-emerald-300">
            <FiHeart className="mr-2" />
            <span>Transparent Process</span>
          </div>

          <h2 className="mt-4 text-4xl font-extrabold text-emerald-950">
            What Happens With Your{" "}
            <span className="bg-[linear-gradient(90deg,#86efac,#34d399,#10b981)] bg-clip-text text-transparent animate-gradientMove">
              Donation?
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-emerald-900/80">
            Every contribution goes through a carefully managed process to
            ensure maximum impact and transparency.
          </p>

          <div className="mx-auto mt-6 h-1.5 w-28 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-600 shadow-[0_0_16px_rgba(16,185,129,.45)] animate-widthPulse" />
        </div>

        {/* Connector line (large screens) */}
        <div className="relative mx-auto hidden max-w-6xl lg:block">
          <div className="pointer-events-none absolute left-0 right-0 top-28 mx-2 h-1 rounded-full bg-gradient-to-r from-emerald-200 via-emerald-500 to-emerald-200 opacity-80" />
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="pointer-events-none absolute top-[102px] h-4 w-4 -translate-x-1/2 rounded-full bg-white ring-2 ring-emerald-500"
              style={{ left: `${12.5 + i * 25}%` }}
            />
          ))}
        </div>

        {/* Steps */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div
              key={`step-${step.id}`}
              className="group relative rounded-2xl p-[2px] animate-floatSlow"
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              {/* Glow border on hover */}
              <div className="pointer-events-none absolute -inset-[2px] rounded-2xl opacity-0 blur-[2px] transition-opacity duration-700 group-hover:opacity-80">
                <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(at_20%_-10%,#86efac_0%,#34d399_35%,#10b981_55%,#34d399_75%,#86efac_100%)] animate-spinSlow" />
              </div>

              <div className="relative rounded-[22px] bg-white/95 p-8 text-center shadow-lg ring-1 ring-emerald-200 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:shadow-emerald-500/20">
                <div className="mx-auto mb-6 grid place-items-center">
                  <div className="relative">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-600 text-white ring-1 ring-emerald-500 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-1">
                      {step.icon}
                    </div>
                    <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-emerald-400/25 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>

                <div className="mx-auto mb-4 grid h-8 w-8 place-items-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  {step.id}
                </div>

                <h3 className="text-xl font-bold text-emerald-950">
                  {step.title}
                </h3>
                <p className="mt-3 text-emerald-900/80">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Video header */}
        <div className="mt-16 text-center">
          <div className="mx-auto inline-flex items-center justify-center rounded-full bg-emerald-100 px-4 py-2 text-emerald-700 ring-1 ring-emerald-300">
            <FiVideo className="mr-2" />
            <span>See Our Impact</span>
          </div>

          <h3 className="mt-4 text-3xl font-extrabold text-emerald-950">
            Witness the{" "}
            <span className="bg-[linear-gradient(90deg,#86efac,#34d399,#10b981)] bg-clip-text text-transparent animate-gradientMove">
              Difference
            </span>
          </h3>

          <p className="mx-auto mt-3 max-w-3xl text-lg text-emerald-900/80">
            Watch these videos to see how your donations transform lives and
            communities.
          </p>
        </div>

        {/* Video grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, idx) => (
            <div key={`video-${idx}`} className="group relative rounded-2xl">
              {/* overlay + title */}
              <div className="pointer-events-none absolute inset-0 z-10 flex items-end rounded-2xl bg-gradient-to-t from-emerald-900/70 via-emerald-800/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <h4 className="m-6 text-lg font-semibold text-white drop-shadow">
                  {video.title}
                </h4>
              </div>

              {/* big play button */}
              <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-600/85 text-white ring-2 ring-white/60 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(16,185,129,.45)]">
                  <FiPlay className="ml-1 h-8 w-8" />
                </div>
              </div>

              <iframe
                src={video.url}
                title={`Video ${idx + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-64 w-full rounded-2xl shadow-lg transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-emerald-600/25"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Local helpers */}
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

        @keyframes spinSlow {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
        }
        .animate-spinSlow { animation: spinSlow 24s linear infinite; }

        @keyframes floatSlow {
          0%,100% { transform: translateY(0) }
          50% { transform: translateY(-6px) }
        }
        .animate-floatSlow { animation: floatSlow 7s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
