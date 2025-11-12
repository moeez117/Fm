import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Testimonials = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out" });
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Donor",
      feedback:
        "Supporting campaigns here has been an amazing experience. I can actually see the change my donation makes.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
    },
    {
      name: "David Martinez",
      role: "Volunteer",
      feedback:
        "Being a volunteer taught me the value of community support. This platform has transformed countless lives.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
    },
    {
      name: "Aisha Khan",
      role: "Beneficiary",
      feedback:
        "Thanks to the donors, my village received clean water. This has truly changed our daily lives for the better.",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      rating: 5,
    },
  ];

  // --- Carousel state ---
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);
  const progressRef = useRef(null);
  const AUTOPLAY_MS = 5000;

  // autoplay logic
  const start = () => {
    stop();
    autoplayRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    // restart progress bar
    if (progressRef.current) {
      progressRef.current.classList.remove("animate-bar");
      // force reflow
      void progressRef.current.offsetWidth;
      progressRef.current.classList.add("animate-bar");
    }
  };
  const stop = () => autoplayRef.current && clearInterval(autoplayRef.current);

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // swipe (mobile)
  const touch = useRef({ x: 0 });
  const onTouchStart = (e) => (touch.current.x = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touch.current.x;
    if (dx > 50) prev();
    if (dx < -50) next();
  };

  // mouse tilt
  const cardRef = useRef(null);
  const onMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    const rx = (+y / (r.height / 2)) * -6; // tilt strength
    const ry = (+x / (r.width / 2)) * 6;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  };
  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  const active = testimonials[index];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
      {/* Ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-16 w-[28rem] h-[28rem] rounded-full bg-[palegreen]/35 blur-3xl animate-floatSlow"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -right-16 w-[26rem] h-[26rem] rounded-full bg-[palegreen]/30 blur-3xl animate-floatSlow2"
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/70 text-emerald-800 text-sm font-semibold ring-1 ring-emerald-300">
            Real voices • Real impact
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-emerald-950">
            What People Say
          </h2>
          <div className="mx-auto mt-5 h-1.5 w-24 rounded-full bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-600 shadow-[0_0_16px_rgba(16,185,129,.45)] animate-widthPulse" />
        </div>

        {/* Carousel */}
        <div
          className="relative select-none"
          onMouseEnter={stop}
          onMouseLeave={start}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Card */}
          <div
            data-aos="zoom-in"
            className="relative mx-auto max-w-3xl"
          >
            {/* glowing border */}
            <div className="rounded-3xl p-[2px] bg-[conic-gradient(at_10%_10%,#34d399_0%,#10b981_25%,#86efac_50%,#34d399_75%,#10b981_100%)] animate-borderGlow">
              <div
                ref={cardRef}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                className="rounded-[22px] bg-white/85 backdrop-blur ring-1 ring-emerald-100 shadow-xl px-8 py-10 transition-transform duration-150 will-change-transform"
              >
                {/* Quote icon */}
                <div className="absolute -top-5 left-6 text-emerald-400/30 text-6xl leading-none select-none">“</div>

                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-[palegreen] via-emerald-400 to-emerald-600 animate-gradientMove">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <img
                        src={active.image}
                        alt={active.name}
                        className="w-22 h-22 rounded-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < (active.rating || 5) ? "text-emerald-500" : "text-emerald-200"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-emerald-950/85 text-lg md:text-xl leading-relaxed text-center">
                  “{active.feedback}”
                </p>

                {/* Name + Role */}
                <div className="mt-6 text-center">
                  <h4 className="font-semibold text-emerald-900">{active.name}</h4>
                  <p className="text-sm text-emerald-700/80">{active.role}</p>
                </div>

                {/* Slide progress */}
                <div className="relative mt-8 h-1.5 w-full bg-emerald-100 rounded-full overflow-hidden">
                  <div ref={progressRef} className="h-full w-0 bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-600 animate-bar rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-emerald-700 border border-emerald-200 shadow px-3 py-2 rounded-full transition"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-emerald-700 border border-emerald-200 shadow px-3 py-2 rounded-full transition"
          >
            ›
          </button>

          {/* Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-emerald-500" : "w-2.5 bg-emerald-200 hover:bg-emerald-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Helpers */}
      <style>{`
        @keyframes gradientMove { 
          0% { background-position: 0% 50% } 
          100% { background-position: 100% 50% } 
        }
        .animate-gradientMove { background-size: 200% 200%; animation: gradientMove 6s ease-in-out infinite alternate; }

        @keyframes floatSlow { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        @keyframes floatSlow2 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(12px) } }
        .animate-floatSlow { animation: floatSlow 12s ease-in-out infinite; }
        .animate-floatSlow2 { animation: floatSlow2 14s ease-in-out infinite; }

        @keyframes widthPulse { 0%,100% { transform: scaleX(1) } 50% { transform: scaleX(1.12) } }
        .animate-widthPulse { transform-origin: center; animation: widthPulse 5s ease-in-out infinite; }

        @keyframes borderGlow { 0% { filter: saturate(1) brightness(1); } 50% { filter: saturate(1.2) brightness(1.05); } 100% { filter: saturate(1) brightness(1); } }
        .animate-borderGlow { animation: borderGlow 4s ease-in-out infinite; }

        /* autoplay progress bar */
        @keyframes bar {
          from { width: 0% }
          to { width: 100% }
        }
        .animate-bar { animation: bar ${AUTOPLAY_MS}ms linear forwards; }
      `}</style>
    </section>
  );
};

export default Testimonials;
