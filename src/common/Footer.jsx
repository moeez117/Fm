import { useState } from "react";

export default function Footer() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer className="relative overflow-hidden text-emerald-950">
      {/* Ambient dots pattern & glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(transparent_1px,rgba(16,185,129,0.08)_1px)] [background-size:16px_16px]"
      />
      <div aria-hidden className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
      <div aria-hidden className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white/80 to-emerald-50" />

      {/* Main Footer Content */}
      <div className="relative bg-white/70 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="mb-6 flex items-center">
                <div className="mr-3 rounded-lg bg-emerald-100 p-2 ring-1 ring-emerald-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-emerald-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold">Qatar Charity</h3>
              </div>

              <p className="mb-6 leading-relaxed text-emerald-700">
                Connecting generosity with need through transparency and
                technology. Making charitable giving more impactful in Qatar and
                beyond.
              </p>

              <div className="flex space-x-3">
                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-[#1877F2] ring-1 ring-emerald-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-100 hover:ring-emerald-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                {/* Twitter/X */}
                <a
                  href="#"
                  aria-label="Twitter"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-[#1DA1F2] ring-1 ring-emerald-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-100 hover:ring-emerald-300"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-100 hover:ring-emerald-300"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="url(#instagramGradient)">
                    <defs>
                      <linearGradient id="instagramGradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#f58529" />
                        <stop offset="50%" stopColor="#dd2a7b" />
                        <stop offset="100%" stopColor="#8134af" />
                      </linearGradient>
                    </defs>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.427.405a4.92 4.92 0 011.753 1.045 4.92 4.92 0 011.045 1.753c.165.457.351 1.257.405 2.427.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.405 2.427a4.92 4.92 0 01-1.045 1.753 4.92 4.92 0 01-1.753 1.045c-.457.165-1.257.351-2.427.405-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.427-.405a4.92 4.92 0 01-1.753-1.045 4.92 4.92 0 01-1.045-1.753c-.165-.457-.351-1.257-.405-2.427C2.175 15.747 2.163 15.368 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.405-2.427a4.92 4.92 0 011.045-1.753 4.92 4.92 0 011.753-1.045c.457-.165 1.257-.351 2.427-.405C8.416 2.175 8.796 2.163 12 2.163zm0 4.838a5 5 0 110 10 5 5 0 010-10zm0 1.802a3.198 3.198 0 100 6.396 3.198 3.198 0 000-6.396zm4.406-3.39a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-6 inline-block text-lg font-semibold">
                Quick Links
                <span className="ml-2 inline-block h-1 w-10 rounded-full bg-emerald-300 align-middle" />
              </h4>
              <ul className="space-y-3">
                {[
                  "About Us",
                  "Our Campaigns",
                  "Transparency Report",
                  "Get Involved",
                  "Success Stories",
                ].map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="link-emerald text-emerald-900 transition-colors duration-300 hover:text-emerald-600"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="mb-6 inline-block text-lg font-semibold">
                Resources
                <span className="ml-2 inline-block h-1 w-10 rounded-full bg-emerald-300 align-middle" />
              </h4>
              <ul className="space-y-3">
                {["FAQ", "Blog & News", "Documentation", "Support Center", "Community"].map(
                  (l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="link-emerald text-emerald-900 transition-colors duration-300 hover:text-emerald-600"
                      >
                        {l}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="mb-6 inline-block text-lg font-semibold">
                Contact Us
                <span className="ml-2 inline-block h-1 w-10 rounded-full bg-emerald-300 align-middle" />
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 mt-1 h-5 w-5 text-emerald-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    Doha, Qatar
                    <br />
                    West Bay, Diplomatic Area
                  </span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5 text-emerald-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+974 4494 4444</span>
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5 text-emerald-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>info@qcharity.org</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-emerald-200/70 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="mb-8 lg:mb-0 lg:w-1/2">
                <h4 className="mb-3 text-xl font-semibold">
                  Stay Updated with Our Initiatives
                </h4>
                <p className="max-w-md text-emerald-700">
                  Subscribe to our newsletter to receive updates on our
                  campaigns, impact stories, and ways to help.
                </p>
              </div>

              <div className="lg:w-1/2">
                {!submitted ? (
                  <form
                    className="flex flex-col gap-4 sm:flex-row"
                    onSubmit={handleSubscribe}
                  >
                    <input
                      type="email"
                      required
                      placeholder="Your email address"
                      className="flex-grow rounded-lg border border-emerald-300 bg-emerald-50 px-5 py-3 text-emerald-900 placeholder-emerald-400 outline-none ring-emerald-300 transition focus:border-transparent focus:ring-2"
                    />
                    <button
                      type="submit"
                      className="relative overflow-hidden rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white ring-1 ring-emerald-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-500"
                    >
                      <span className="relative z-10">Subscribe</span>
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.35),transparent)] animate-shine" />
                    </button>
                  </form>
                ) : (
                  <div className="rounded-lg bg-emerald-50 p-4 text-emerald-800 ring-1 ring-emerald-200">
                    🎉 Thanks for subscribing! You’ll hear from us soon.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-200/70 py-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 sm:px-6 lg:flex-row lg:px-8">
            <p className="mb-4 text-sm text-emerald-600 lg:mb-0">
              © {new Date().getFullYear()} Qatar Charity Platform. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (l) => (
                  <a
                    key={l}
                    href="#"
                    className="link-emerald text-sm text-emerald-600 transition-colors duration-300 hover:text-emerald-700"
                  >
                    {l}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* local helpers */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        .animate-shine { animation: shine 1.4s ease-in-out infinite; }

        /* subtle animated underline for links */
        .link-emerald {
          position: relative;
        }
        .link-emerald::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0%;
          height: 2px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #86efac, #34d399, #10b981);
          transition: width .35s cubic-bezier(.22,1,.36,1);
        }
        .link-emerald:hover::after { width: 100%; }
      `}</style>
    </footer>
  );
}
