// src/contact/Hero.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/* ⬇️ Import all contact sections to render below */
import ContactForm from "./ContactForm";
import Map from "./Map";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      {/* ===== Contact Hero ===== */}
      <section
        className="relative min-h-screen w-full flex items-center justify-center text-center text-white px-6 overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Palegreen gradient overlay with reduced opacity */}
        <div className="absolute inset-0 bg-gradient-to-br from-[palegreen]/40 to-green-600/30"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyOCAwIDEsMSA1NiwwYTI4LDI4IDAgMSwxIC01NiwwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4=')] opacity-20 mix-blend-soft-light"></div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl px-4">
          {/* Decorative elements */}
          <div
            className="absolute -top-10 -left-10 w-28 h-28 border-4 border-white/20 rounded-full"
            data-aos="zoom-in"
            data-aos-delay="600"
          ></div>
          <div
            className="absolute -bottom-8 -right-8 w-20 h-20 border-4 border-white/20 rounded-full"
            data-aos="zoom-in"
            data-aos-delay="700"
          ></div>

          {/* Heading */}
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
            data-aos="fade-up"
            style={{
              textShadow: "0 4px 12px rgba(0,0,0,0.3)",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            We'd love to <span className="text-[palegreen]">hear</span> from you
          </h1>

          {/* Separator */}
          <div
            className="w-24 h-1 bg-gradient-to-r from-[palegreen] to-green-600 mx-auto my-8 rounded-full"
            data-aos="fade-up"
            data-aos-delay="100"
          ></div>

          {/* Paragraph */}
          <p
            className="mt-6 text-xl md:text-2xl text-white leading-relaxed max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Whether it's about donations, receipts, or support — our team is here
            to help you.{" "}
            <span className="font-semibold text-black bg-[palegreen]/70 px-2 py-1 rounded-md">
              We reply within 24 hours
            </span>
            .
          </p>

          {/* Buttons */}
          <div
            className="mt-12 flex flex-row justify-center gap-6 items-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {/* Gradient Button */}
            <button
              type="button"
              className="relative bg-gradient-to-r from-[palegreen] to-green-600 text-black px-7 py-4 sm:px-10 sm:py-4 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-[palegreen] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10 whitespace-nowrap">
                View Campaigns
              </span>
            </button>

            {/* Outline Button */}
            <button
              type="button"
              className="relative border-2 border-[palegreen] text-white px-7 py-4 sm:px-10 sm:py-4 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-[palegreen]/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10 whitespace-nowrap">
                Get Started
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ===== Contact Sections (stacked) ===== */}
      <ContactForm />
      <Map />
    </>
  );
};

export default Hero;
