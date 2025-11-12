import React, { useEffect } from "react";
import { FaBuilding, FaHandshake, FaChartLine } from "react-icons/fa";
import { FiAward, FiArrowRight } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

const Corporate = () => {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out",
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white to-emerald-50/70 py-20">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-28 -left-28 h-[28rem] w-[28rem] rounded-full bg-emerald-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[24rem] w-[24rem] rounded-full bg-emerald-300/35 blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center">
          <div className="mx-auto inline-flex items-center justify-center rounded-full bg-emerald-100 px-4 py-2 text-emerald-700 ring-1 ring-emerald-300">
            <FiAward className="mr-2" />
            For Companies & Foundations
          </div>

          <h2 className="mt-4 text-3xl font-extrabold text-emerald-950 md:text-4xl">
            Corporate{" "}
            <span className="bg-[linear-gradient(90deg,#86efac,#34d399,#10b981)] bg-clip-text text-transparent animate-gradientMove">
              Sponsorship
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-emerald-900/80">
            Partner with us to create long-lasting social impact. Our corporate
            sponsorship program provides verified reports, branding visibility,
            and impactful opportunities for companies to give back.
          </p>

          <div className="mx-auto mt-6 h-1.5 w-28 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-600 shadow-[0_0_16px_rgba(16,185,129,.45)] animate-widthPulse" />
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {/* Card 1 */}
          <div
            data-aos="zoom-out"
            className="group relative rounded-2xl p-[2px]"
          >
            {/* Glow / border */}
            <div className="pointer-events-none absolute -inset-[2px] rounded-2xl opacity-0 blur-[2px] transition-opacity duration-700 group-hover:opacity-80">
              <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(at_20%_-10%,#86efac_0%,#34d399_35%,#10b981_55%,#34d399_75%,#86efac_100%)] animate-spinSlow" />
            </div>

            <div className="relative rounded-[22px] bg-white/95 p-6 shadow-lg ring-1 ring-emerald-200 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:shadow-emerald-500/20">
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300 animate-pulseSoft">
                <FaHandshake className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-950">
                Sponsorship Opportunities
              </h3>
              <p className="mt-3 text-emerald-900/80">
                Choose from tailored sponsorship packages that align with your
                company’s CSR goals while supporting life-changing community
                initiatives.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div data-aos="flip-up" className="group relative rounded-2xl p-[2px]">
            <div className="pointer-events-none absolute -inset-[2px] rounded-2xl opacity-0 blur-[2px] transition-opacity duration-700 group-hover:opacity-80">
              <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(at_20%_-10%,#86efac_0%,#34d399_35%,#10b981_55%,#34d399_75%,#86efac_100%)] animate-spinSlow" />
            </div>

            <div className="relative rounded-[22px] bg-white/95 p-6 shadow-lg ring-1 ring-emerald-200 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:shadow-emerald-500/20">
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300 animate-pulseSoft">
                <FaChartLine className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-950">
                Verified Impact Reports
              </h3>
              <p className="mt-3 text-emerald-900/80">
                Access transparent, data-driven reports that show the direct
                results of your contributions, ensuring accountability and trust.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div data-aos="flip-left" className="group relative rounded-2xl p-[2px]">
            <div className="pointer-events-none absolute -inset-[2px] rounded-2xl opacity-0 blur-[2px] transition-opacity duration-700 group-hover:opacity-80">
              <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(at_20%_-10%,#86efac_0%,#34d399_35%,#10b981_55%,#34d399_75%,#86efac_100%)] animate-spinSlow" />
            </div>

            <div className="relative rounded-[22px] bg-white/95 p-6 shadow-lg ring-1 ring-emerald-200 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:shadow-emerald-500/20">
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300 animate-pulseSoft">
                <FaBuilding className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-emerald-950">
                Branding Visibility
              </h3>
              <p className="mt-3 text-emerald-900/80">
                Showcase your impact with recognition opportunities such as
                <span className="font-semibold text-emerald-950">
                  {" "}
                  “Your company helped build 10 schools”
                </span>{" "}
                and highlight your role in creating change.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-emerald-600 px-7 py-3 font-medium text-white shadow-lg ring-1 ring-emerald-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500 hover:shadow-emerald-300/40">
            <span className="relative z-10 flex items-center">
              Become a Corporate Partner
              <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
            {/* shine */}
            <span className="pointer-events-none absolute -inset-y-8 -left-1/2 z-0 w-1/2 rotate-12 bg-white/40 blur-md opacity-0 transition-opacity duration-500 hover:opacity-100" />
          </button>
          <p className="mt-3 text-sm text-emerald-900/70">
            Let’s co-create measurable impact, together.
          </p>
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
        .animate-spinSlow { animation: spinSlow 26s linear infinite; }

        @keyframes pulseSoft {
          0%,100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16,185,129,.22) }
          50% { transform: scale(1.03); box-shadow: 0 10px 24px -10px rgba(16,185,129,.28) }
        }
        .animate-pulseSoft { animation: pulseSoft 3.6s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Corporate;
