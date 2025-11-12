import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* 🌟 Common */
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";

/* 🌟 About Page Components */
import Hero from "./Component/Hero";
import WhoWeAre from "./Component/WhoWeAre";
import SandiInfo from "./Component/SandiInfo";
import MissionVisionValues from "./Component/MissionVisionValues";
import HowItWorks from "./Component/HowItWorks";
import OversightCompliance from "./Component/OversightCompliance";
import CallToAction from "./Component/CallToAction";

/* 🌟 Campaign */
import AboutCause from "./compaign/AboutCause";
import CampaignHeader from "./compaign/CampaignHeader";
import CTASection from "./compaign/CTASection";
import CampaignCard from "./compaign/CampaignCard";
import Testimonials from "./compaign/Testimonials";

/* 🌟 Contact */
import ContactForm from "./contact/ContactForm";
import ContactHero from "./contact/Hero";
import Map from "./contact/Map";

/* 🌟 Donor */
import WhyDonate from "./donor/WhyDonate";
import PayOption from "./donor/PayOption";
import MoneyPurs from "./donor/MoneyPurs";
import DonorHero from "./donor/Hero";
import Corporate from "./donor/Corporate";
import DonorCampaign from "./donor/Campaign";

/* 🌟 Donor Dashboard */
import SideBar from "./donordashboard/SideBar";
import Campaigns from "./donordashboard/Campaigns";

/* 🌟 Home (single-page under Hero) */
import HeroSection from "./Home/HeroSection";

/* 🌟 Auth */
import LoginForm from "./login/LoginForm";
import SignupForm from "./signup/SignupForm";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* ===== Home: HeroSection now renders ALL home sections beneath it ===== */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/hero-section" element={<HeroSection />} />

        {/* ===== About ===== */}
        <Route path="/hero" element={<Hero />} />
        <Route path="/who-we-are" element={<WhoWeAre />} />
        <Route path="/sandi-info" element={<SandiInfo />} />
        <Route path="/mission-vision-values" element={<MissionVisionValues />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/oversight-compliance" element={<OversightCompliance />} />
        <Route path="/call-to-action" element={<CallToAction />} />

        {/* ===== Campaign ===== */}
        <Route path="/about-cause" element={<AboutCause />} />
        <Route path="/campaign-header" element={<CampaignHeader />} />
        <Route path="/cta-section" element={<CTASection />} />
        <Route path="/campaign-card" element={<CampaignCard />} />
        <Route path="/testimonials" element={<Testimonials />} />

        {/* ===== Contact ===== */}
        <Route path="/contact-form" element={<ContactForm />} />
        <Route path="/contact-hero" element={<ContactHero />} />
        <Route path="/map" element={<Map />} />

        {/* ===== Donor ===== */}
        <Route path="/why-donate" element={<WhyDonate />} />
        <Route path="/pay-option" element={<PayOption />} />
        <Route path="/money-purs" element={<MoneyPurs />} />
        <Route path="/donor-hero" element={<DonorHero />} />
        <Route path="/corporate" element={<Corporate />} />
        <Route path="/donor-campaign" element={<DonorCampaign />} />

        {/* ===== Donor Dashboard ===== */}
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/dashboard-campaigns" element={<Campaigns />} />

        {/* ===== Auth ===== */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        {/* Catch-all → Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}
