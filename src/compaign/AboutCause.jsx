import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutCause = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out" });
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-[#E9F9EE] to-white">
      {/* soft dotted texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_1px)] [background-size:14px_14px]"
      />
      {/* ambient glows */}
      <div aria-hidden className="pointer-events-none absolute -top-20 -left-28 w-[28rem] h-[28rem] rounded-full bg-emerald-300/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-emerald-200/40 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image */}
        <div data-aos="fade-right" className="order-2 md:order-1">
          <div className="p-[3px] rounded-[22px] bg-gradient-to-br from-emerald-200 via-emerald-400 to-emerald-600 shadow-[0_10px_40px_rgba(16,185,129,.25)]">
            <div className="relative rounded-[20px] overflow-hidden bg-white/60">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80"
                alt="Children smiling together during a charity event"
                width={1200}
                height={800}
                className="w-full h-full object-cover rounded-[20px] transition-transform duration-700 ease-out hover:scale-[1.02]"
              />
              {/* subtle corner badge */}
              <span className="absolute top-3 left-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md text-emerald-900 font-semibold text-xs ring-1 ring-emerald-200">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Field Stories
              </span>
            </div>
          </div>
        </div>

        {/* Right Text */}
        <div data-aos="fade-left" className="order-1 md:order-2">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/70 text-emerald-800 text-xs font-semibold ring-1 ring-emerald-300">
            Our Impact in Qatar
          </div>

          <h2
            className="mt-3 text-3xl md:text-4xl font-extrabold leading-tight"
            style={{
              background:
                "linear-gradient(90deg, #0f172a 0%, #085d41 50%, #0f172a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About Our Cause
          </h2>

          <div className="mt-3 h-1.5 w-20 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-green-500 shadow-[0_0_16px_rgba(16,185,129,.45)]" />

          <p className="mt-6 text-[15.5px] md:text-base text-emerald-950/85 leading-relaxed">
            We are committed to making a difference by supporting vulnerable
            communities through education, healthcare, and emergency relief.
            Every campaign is designed to bring real change to those who need it
            most.
          </p>

          <p className="mt-4 text-[15.5px] md:text-base text-emerald-950/85 leading-relaxed">
            With your support, we’ve impacted thousands of lives, built schools,
            provided medical aid, and delivered relief during natural disasters.
            Together, we can continue to spread hope and kindness.
          </p>

          {/* bullet features */}
          <ul className="mt-6 grid sm:grid-cols-2 gap-3">
            {[
              "RACA-approved campaigns",
              "Real-time tracking & reports",
              "Sandi integration",
              "Transparent spending",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-emerald-900"
              >
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[15px]">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#featured-campaigns"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-emerald-950 ring-1 ring-emerald-300 shadow-sm transition-all
                         bg-[linear-gradient(90deg,palegreen,#5fe2a0,palegreen)] hover:shadow-[0_18px_38px_rgba(16,185,129,.25)] hover:-translate-y-0.5"
            >
              Explore Campaigns
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-emerald-950 bg-white/85 backdrop-blur-sm border border-emerald-700/50 hover:bg-white transition-all"
            >
              How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCause;
