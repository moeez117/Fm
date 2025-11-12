"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

const FAQs = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openItems, setOpenItems] = useState({});
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [helpfulVotes, setHelpfulVotes] = useState({}); // {id: {yes, no}}
  const listRef = useRef(null);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const toggleItem = (id) =>
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));

  const setAllOpen = (ids, open) =>
    setOpenItems((prev) => {
      const next = { ...prev };
      ids.forEach((id) => (next[id] = open));
      return next;
    });

  const copyLink = async (id) => {
    try {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1400);
    } catch {}
  };

  // ----- DATA -----
  const faqData = {
    general: [
      {
        id: "gen-1",
        question: "What is the Qatar Charity Platform?",
        answer:
          "The Qatar Charity Platform is a comprehensive digital system for managing, monitoring, and regulating charitable donations and campaigns in Qatar. It integrates with the Sandi platform to ensure transparency, compliance, and efficient distribution of aid.",
      },
      {
        id: "gen-2",
        question: "How does the platform ensure transparency?",
        answer:
          "We use blockchain technology to create tamper-proof records of all transactions. Donors can track their contributions in real-time from donation to distribution, with proof of spending provided by charities.",
      },
      {
        id: "gen-3",
        question: "Is my personal information secure?",
        answer:
          "Yes, we employ bank-level security measures including encryption, secure servers, and compliance with Qatar data protection regulations. Your information is never shared without your consent.",
      },
      {
        id: "gen-4",
        question: "What languages are supported?",
        answer:
          "The platform is fully available in both Arabic and English, with plans to add more languages in the future based on user needs.",
      },
    ],
    donors: [
      {
        id: "donor-1",
        question: "How can I make a donation?",
        answer:
          "You can donate through multiple methods: credit/debit cards, bank transfer, QR code payments, or digital wallets. Simply register an account, browse campaigns, and select your preferred payment method.",
      },
      {
        id: "donor-2",
        question: "Will I receive a receipt for my donation?",
        answer:
          "Yes, you will receive an instant digital receipt for every donation, which can be used for tax purposes. All receipts are stored in your account dashboard for easy access.",
      },
      {
        id: "donor-3",
        question: "How can I track the impact of my donation?",
        answer:
          "Our real-time tracking system allows you to follow your donation from start to finish. You'll receive updates, photos, and reports showing how your contribution made a difference.",
      },
      {
        id: "donor-4",
        question: "Can I set up recurring donations?",
        answer:
          "Yes, you can set up monthly, quarterly, or annual recurring donations to your preferred charities with customizable amounts.",
      },
      {
        id: "donor-5",
        question: "Are there any fees for donating?",
        answer:
          "The platform charges a minimal processing fee of 1.5% to cover transaction costs and platform maintenance. Charities receive 98.5% of your donation amount.",
      },
    ],
    charities: [
      {
        id: "charity-1",
        question: "How can my organization register on the platform?",
        answer:
          "Charities must apply through the registration portal, providing all required documentation including valid licenses from RACA. The approval process typically takes 5-7 business days.",
      },
      {
        id: "charity-2",
        question: "What are the reporting requirements?",
        answer:
          "Registered charities must submit regular reports including proof of spending, beneficiary information, and impact assessments. The platform provides templates to simplify this process.",
      },
      {
        id: "charity-3",
        question: "How does the Sandi integration work?",
        answer:
          "The platform automatically syncs with Sandi to verify beneficiaries and prevent duplicate aid. Charities can access verified beneficiary lists and report distributions directly through the system.",
      },
      {
        id: "charity-4",
        question: "What support is available for charity administrators?",
        answer:
          "We provide comprehensive training, dedicated account managers, and 24/7 technical support to help charities maximize their use of the platform.",
      },
    ],
    technical: [
      {
        id: "tech-1",
        question: "What browsers are supported?",
        answer:
          "The platform works best on Chrome, Firefox, Safari, and Edge browsers updated to their latest versions. For optimal experience, enable JavaScript and cookies.",
      },
      {
        id: "tech-2",
        question: "Is there a mobile app available?",
        answer:
          "Yes, we have native iOS and Android apps available for download from their respective app stores. The mobile apps offer all the functionality of the web platform.",
      },
      {
        id: "tech-3",
        question: "What if I encounter technical issues?",
        answer:
          "Our support team is available 24/7 through live chat, email, or phone. You can also visit our Help Center for troubleshooting guides and video tutorials.",
      },
      {
        id: "tech-4",
        question: "How often is the platform updated?",
        answer:
          "We release regular updates every two weeks with new features, security enhancements, and performance improvements. All updates are thoroughly tested before deployment.",
      },
    ],
  };

  const categories = [
    { id: "general", name: "General Questions", icon: "📋" },
    { id: "donors", name: "For Donors", icon: "🤲" },
    { id: "charities", name: "For Charities", icon: "🏛️" },
    { id: "technical", name: "Technical Support", icon: "🔧" },
  ];

  // search within the active category
  const activeList = faqData[activeCategory];
  const filtered = useMemo(() => {
    if (!query.trim()) return activeList;
    const t = query.toLowerCase();
    return activeList.filter(
      (item) =>
        item.question.toLowerCase().includes(t) ||
        item.answer.toLowerCase().includes(t)
    );
  }, [activeList, query]);

  const activeIdx = categories.findIndex((c) => c.id === activeCategory);
  const allIds = filtered.map((f) => f.id);

  // open from hash
  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;
    // find category that contains this id
    const foundCat = Object.keys(faqData).find((k) =>
      faqData[k].some((q) => q.id === hash)
    );
    if (foundCat) {
      setActiveCategory(foundCat);
      setOpenItems((p) => ({ ...p, [hash]: true }));
      // smooth scroll after paint
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 120);
    }
  }, []);

  // keyboard navigation within filtered list
  const onKeyDown = (e) => {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const target = filtered[focusedIndex];
      if (target) toggleItem(target.id);
    }
  };

  // helpful voting (local UI only)
  const vote = (id, type) =>
    setHelpfulVotes((s) => {
      const cur = s[id] || { yes: 0, no: 0 };
      return {
        ...s,
        [id]: { ...cur, [type]: cur[type] + 1 },
      };
    });

  return (
    <div
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 via-emerald-50 to-white overflow-hidden"
      onKeyDown={onKeyDown}
      tabIndex={-1}
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-green-200/40 blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-10 animate-fadeUp">
          <div className="inline-flex items-center justify-center p-4 bg-white/80 ring-1 ring-emerald-200 rounded-full shadow-sm mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-3 tracking-tight">
            <span className="bg-[linear-gradient(90deg,#065f46,#10b981,#059669)] bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-800/90 max-w-3xl mx-auto leading-relaxed">
            Answers about transparency, Sandi integration, compliance, security, and more.
          </p>

          {/* tools */}
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search FAQs…"
                className="w-72 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-800/70 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAllOpen(allIds, true)}
                className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-emerald-50 transition"
              >
                Expand all
              </button>
              <button
                onClick={() => setAllOpen(allIds, false)}
                className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-emerald-50 transition"
              >
                Collapse all
              </button>
            </div>
          </div>
        </div>

        {/* Layout: sticky categories (desktop) + content */}
        <div className="grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-6">
          {/* Sticky sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-2">
              {categories.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveCategory(c.id);
                    setFocusedIndex(0);
                    listRef.current?.focus();
                  }}
                  className={[
                    "w-full flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition",
                    activeCategory === c.id
                      ? "bg-emerald-600 text-white shadow ring-1 ring-emerald-500"
                      : "bg-white/90 backdrop-blur text-emerald-800 ring-1 ring-emerald-200 hover:bg-emerald-50",
                  ].join(" ")}
                >
                  <span className="text-lg">{c.icon}</span>
                  {c.name}
                </button>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <div>
            {/* Mobile category pills */}
            <div className="flex lg:hidden flex-wrap justify-center gap-3 mb-6 animate-fadeUp" style={{ animationDelay: "60ms" }}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setFocusedIndex(0);
                  }}
                  className={`flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5 ring-1 ${
                    activeCategory === category.id
                      ? "bg-emerald-600 text-white ring-emerald-500 shadow-md hover:brightness-105"
                      : "bg-white/90 backdrop-blur text-emerald-800 ring-emerald-200 hover:bg-emerald-50"
                  }`}
                >
                  <span className="mr-2 text-lg">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div
              ref={listRef}
              className="bg-white/90 backdrop-blur rounded-2xl ring-1 ring-emerald-100 shadow-xl overflow-hidden animate-fadeUp focus:outline-none"
              style={{ animationDelay: "120ms" }}
              role="listbox"
              aria-label="FAQ list"
              tabIndex={0}
            >
              {filtered.map((item, idx) => {
                const isOpen = !!openItems[item.id];
                const votes = helpfulVotes[item.id] || { yes: 0, no: 0 };
                const focused = idx === focusedIndex;
                return (
                  <div
                    key={item.id}
                    id={item.id}
                    className={`relative border-b border-emerald-100 last:border-b-0 transition-colors duration-300 ${
                      focused ? "bg-emerald-50/60" : "hover:bg-emerald-50/40"
                    }`}
                    role="option"
                    aria-selected={focused}
                  >
                    {/* left accent grows when open */}
                    <span
                      aria-hidden
                      className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-400 to-green-600 transform origin-top transition-transform duration-500 ${
                        isOpen ? "scale-y-100" : "scale-y-0"
                      }`}
                    />
                    <button
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`${item.id}-panel`}
                      className="w-full px-6 md:px-8 py-6 text-left focus:outline-none group"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-base md:text-lg font-semibold text-green-900 pr-3 group-hover:text-emerald-700 transition-colors duration-300">
                          {item.question}
                        </h3>

                        <div className="flex items-center gap-2">
                          {/* copy link */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyLink(item.id);
                            }}
                            title="Copy direct link"
                            className="hidden sm:grid place-items-center rounded-full p-2 ring-1 ring-emerald-200 text-emerald-700 hover:bg-emerald-50 transition"
                          >
                            ⤴
                          </button>

                          <div
                            className={`flex-shrink-0 ml-1 transform transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          >
                            <div
                              className={`rounded-full p-2 ring-1 transition-all duration-300 ${
                                isOpen
                                  ? "bg-emerald-500 text-white ring-emerald-400 shadow-emerald-300/40 shadow"
                                  : "bg-emerald-50 text-emerald-700 ring-emerald-200 group-hover:bg-emerald-500 group-hover:text-white"
                              }`}
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        id={`${item.id}-panel`}
                        className={`overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-in-out ${
                          isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-emerald-900/85 leading-relaxed pb-3">
                          {item.answer}
                        </p>

                        {/* helpful row */}
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="text-emerald-800/80">Was this helpful?</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              vote(item.id, "yes");
                            }}
                            className="rounded-full border border-emerald-200 bg-white px-2.5 py-1 font-semibold hover:bg-emerald-50"
                          >
                            Yes ({votes.yes})
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              vote(item.id, "no");
                            }}
                            className="rounded-full border border-emerald-200 bg-white px-2.5 py-1 font-semibold hover:bg-emerald-50"
                          >
                            No ({votes.no})
                          </button>
                          <a
                            href={`#${item.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="ml-auto underline hover:text-emerald-900"
                          >
                            Link
                          </a>
                        </div>
                      </div>
                    </button>

                    {/* Copy toast */}
                    <div
                      className={[
                        "pointer-events-none absolute left-1/2 -translate-x-1/2 top-2 z-40 rounded-md px-3 py-1.5 text-xs font-semibold ring-1 transition-all duration-300",
                        copiedId === item.id
                          ? "bg-emerald-600 text-white opacity-100 translate-y-0"
                          : "bg-emerald-600 text-white opacity-0 -translate-y-2",
                      ].join(" ")}
                    >
                      Link copied ✓
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div className="p-8 text-center text-emerald-800/80">
                  No results. Try a different search or category.
                </div>
              )}
            </div>

            {/* Contact Support */}
            <div
              className="relative overflow-hidden rounded-2xl p-10 md:p-14 text-white text-center shadow-2xl bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600 ring-1 ring-emerald-300/60 animate-fadeUp mt-8"
              style={{ animationDelay: "160ms" }}
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/15 blur-xl" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-white/10 blur-xl" />
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="faqGrid" width="22" height="22" patternUnits="userSpaceOnUse">
                      <path d="M 22 0 L 0 0 0 22" fill="none" stroke="white" strokeWidth="0.6" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#faqGrid)" />
                </svg>
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight">
                  Still have questions?
                </h2>
                <p className="mb-6 max-w-2xl mx-auto text-lg/8 opacity-95">
                  Our support team is ready to help with donations, receipts, Sandi sync, and compliance.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="/contact-form"
                    className="px-7 py-3 bg-white text-emerald-700 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ring-1 ring-emerald-300 text-center"
                  >
                    Contact Support
                  </a>
                  <a
                    href="/how-it-works"
                    className="px-7 py-3 bg-white/20 text-white font-semibold rounded-lg shadow-md hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-0.5 ring-1 ring-white/30 text-center"
                  >
                    How It Works
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px) }
          to   { opacity: 1; transform: translateY(0) }
        }
        .animate-fadeUp { animation: fadeUp .6s ease-out both; }
      `}</style>
    </div>
  );
};

export default FAQs;
