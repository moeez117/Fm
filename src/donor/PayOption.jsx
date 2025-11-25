import React, { useEffect } from "react";
import { FaCreditCard } from "react-icons/fa6";
import { CiBank, CiWallet } from "react-icons/ci";
import { IoQrCode } from "react-icons/io5";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const PaAry = [
  {
    id: 1,
    icon: <FaCreditCard />,
    name: "Credit Card",
    desc: "Make fast and secure payments using your credit card online.",
  },
  {
    id: 2,
    icon: <CiBank />,
    name: "Bank Transfer",
    desc: "Easily transfer funds directly from your trusted bank account.",
  },
  {
    id: 3,
    icon: <IoQrCode />,
    name: "QR Code",
    desc: "Quickly scan a QR code to complete instant and safe payments.",
  },
  {
    id: 4,
    icon: <CiWallet />,
    name: "Digital Wallet",
    desc: "Pay conveniently with PayPal, Apple Pay, or Google Pay services.",
  },
];

export default function PayOption() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section
      className="relative min-h-[70vh] bg-fixed bg-cover bg-center pt-24 pb-16 overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1605901309584-818e25960a8b?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Ambient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-emerald-900/20 to-emerald-800/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,.28),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(52,211,153,.28),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] opacity-[.06] [background-size:16px_16px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Eyebrow + Title */}
        <div className="text-center">
          <div
            className="mx-auto mb-3 inline-flex items-center justify-center rounded-full bg-white/85 px-4 py-1 text-emerald-800 ring-1 ring-emerald-300"
            data-aos="fade-up"
          >
            Secure • Fast • Convenient
          </div>

          <h2
            className="text-3xl sm:text-5xl font-extrabold text-white/95"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Choose a{" "}
            <span className="bg-[linear-gradient(90deg,#86efac,#34d399,#10b981)] bg-clip-text text-transparent animate-gradientMove">
              Payment Method
            </span>
          </h2>

          <div
            className="mx-auto mt-5 h-1.5 w-28 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-600 shadow-[0_0_16px_rgba(16,185,129,.45)] animate-widthPulse"
            data-aos="zoom-in"
            data-aos-delay="180"
          />
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PaAry.map((item, idx) => (
            <div
              key={item.id}
              data-aos="zoom-in-up"
              data-aos-delay={120 + idx * 120}
              className="relative group rounded-3xl p-[2px] will-change-transform animate-floatSlow"
            >
              {/* Animated conic border (reveals on hover) */}
              <div className="pointer-events-none absolute -inset-[2px] rounded-3xl opacity-0 blur-[2px] transition-opacity duration-700 group-hover:opacity-80">
                <div className="absolute inset-0 rounded-3xl bg-[conic-gradient(at_20%_-10%,#86efac_0%,#34d399_35%,#10b981_55%,#34d399_75%,#86efac_100%)] animate-spinSlow" />
              </div>

              {/* Card body */}
              <div className="relative rounded-[28px] bg-white/90 p-7 text-center shadow-xl ring-1 ring-emerald-200 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:shadow-emerald-500/20">
                {/* Icon */}
                <div className="mx-auto mb-5 grid place-items-center">
                  <div className="relative">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 group-hover:-rotate-1 group-hover:bg-emerald-100 group-hover:text-emerald-800">
                      <span className="text-3xl animate-pop">{item.icon}</span>
                    </div>
                    {/* soft glow */}
                    <div className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-emerald-400/25 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-emerald-950">
                  {item.name}
                </h3>
                <p className="mt-2 text-emerald-900/80">{item.desc}</p>

                <Link to="/contact" className="inline-block">
                  <button className="relative mt-6 inline-flex items-center justify-center overflow-hidden rounded-full bg-emerald-600 px-7 py-2.5 font-semibold text-white shadow-md ring-1 ring-emerald-500 transition-all duration-400 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400">
                    <span className="relative z-10">Donate</span>
                    {/* sheen */}
                    <span className="pointer-events-none absolute -inset-y-8 -left-1/2 h-10 w-1/2 rotate-12 bg-white/40 opacity-0 blur-md transition-opacity duration-600 group-hover:opacity-100" />
                    {/* glow pulse */}
                    <span className="pointer-events-none absolute inset-0 rounded-full ring-0 ring-emerald-300/0 group-hover:animate-glowPulse" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p
          className="mt-10 text-center text-sm text-white/80"
          data-aos="fade-up"
          data-aos-delay="220"
        >
          All payments are encrypted and processed securely.
        </p>
      </div>

      {/* Helpers */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50% }
          100% { background-position: 100% 50% }
        }
        .animate-gradientMove { background-size: 200% 200%; animation: gradientMove 7s ease-in-out infinite alternate; }

        @keyframes widthPulse { 0%,100% { transform: scaleX(1) } 50% { transform: scaleX(1.12) } }
        .animate-widthPulse { transform-origin: center; animation: widthPulse 5s ease-in-out infinite; }

        @keyframes pop { 0% { transform: scale(.92) } 60% { transform: scale(1.06) } 100% { transform: scale(1) } }
        .animate-pop { animation: pop .55s ease-out both; }

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

        @keyframes glowPulse {
          0%   { box-shadow: 0 0 0 0 rgba(16,185,129,.0) }
          50%  { box-shadow: 0 0 0 8px rgba(16,185,129,.15) }
          100% { box-shadow: 0 0 0 0 rgba(16,185,129,.0) }
        }
        .animate-glowPulse { animation: glowPulse 1.6s ease-out; }
      `}</style>
    </section>
  );
}
