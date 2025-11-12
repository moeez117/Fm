// src/common/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const DesktopLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        "relative px-3 py-2 text-sm font-medium text-gray-900 rounded-md transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300",
        "hover:text-emerald-700",
        isActive ? "text-emerald-700" : "",
      ].join(" ")
    }
  >
    <span className="relative">
      {children}
      <span className="absolute left-0 -bottom-[6px] h-[2px] w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
    </span>
  </NavLink>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Scroll detection (SSR safe)
  useEffect(() => {
    if (typeof window === "undefined") return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 10);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur",
      ].join(" ")}
      role="navigation"
      aria-label="Main"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 3-column grid keeps center truly centered */}
        <div className="grid h-16 grid-cols-3 items-center">
          {/* Left: Logo */}
          <div className="flex items-center justify-self-start">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100">
                {/* Simple mark */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-emerald-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 6a4 4 0 1 1 0 8M4 20v-1a6 6 0 0 1 12 0v1H4z" />
                </svg>
              </span>
              <span className="text-lg font-bold text-gray-900">Qatar Charity</span>
            </Link>
          </div>

          {/* Center: Desktop Nav — all single links (no dropdowns) */}
          <div className="hidden items-center justify-center gap-1 lg:flex justify-self-center">
            <DesktopLink to="/">Home</DesktopLink>
            <DesktopLink to="/hero">About</DesktopLink>
            <DesktopLink to="/cta-section">Campaigns</DesktopLink>
            <DesktopLink to="/donor-hero">Donor</DesktopLink>
            <DesktopLink to="/contact-hero">Contact</DesktopLink>
          </div>

          {/* Right: Desktop CTAs */}
          <div className="hidden items-center justify-self-end gap-3 lg:flex">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                [
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300",
                  isActive ? "text-emerald-700" : "text-gray-900 hover:text-emerald-700",
                ].join(" ")
              }
            >
              Log in
            </NavLink>
            <NavLink
              to="/donate"
              className="px-4 py-2 rounded-md text-sm font-semibold text-white shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 bg-emerald-600 hover:bg-emerald-500"
            >
              Donate Now
            </NavLink>
          </div>

          {/* Mobile: CTA + Burger */}
          <div className="flex items-center justify-self-end lg:hidden">
            <Link
              to="/donate"
              className="mr-2 rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              onClick={() => setIsOpen(false)}
            >
              Donate
            </Link>
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={[
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
          scrolled ? "bg-white" : "bg-white/95 backdrop-blur",
        ].join(" ")}
      >
        <div className="px-4 py-3">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="block rounded-md px-3 py-2 text-base font-semibold text-gray-900 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Home
          </NavLink>

          <NavLink
            to="/hero"
            onClick={() => setIsOpen(false)}
            className="mt-1 block rounded-md px-3 py-2 text-base font-semibold text-gray-900 hover:bg-emerald-50 hover:text-emerald-700"
          >
            About
          </NavLink>

          <NavLink
            to="/cta-section"
            onClick={() => setIsOpen(false)}
            className="mt-1 block rounded-md px-3 py-2 text-base font-semibold text-gray-900 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Campaigns
          </NavLink>

          <NavLink
            to="/donor-hero"
            onClick={() => setIsOpen(false)}
            className="mt-1 block rounded-md px-3 py-2 text-base font-semibold text-gray-900 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Donor
          </NavLink>

          <NavLink
            to="/contact-hero"
            onClick={() => setIsOpen(false)}
            className="mt-1 block rounded-md px-3 py-2 text-base font-semibold text-gray-900 hover:bg-emerald-50 hover:text-emerald-700"
          >
            Contact
          </NavLink>

          {/* Auth */}
          <div className="mt-5 flex items-center gap-3 px-3">
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="rounded-md px-4 py-2 text-sm font-semibold text-gray-900 hover:text-emerald-700"
            >
              Log in
            </NavLink>
            <NavLink
              to="/donate"
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-500"
            >
              Donate Now
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
