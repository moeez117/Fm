import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FiHeart, FiArrowRight } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

/* ⬇️ Import all donor sections to render below */
import WhyDonate from "./WhyDonate";
import PayOption from "./PayOption";
import MoneyPurs from "./MoneyPurs";
import Corporate from "./Corporate";
import DonorCampaign from "./Campaign";

const SlideAry = [
  {
    id: 1,
    title: "Give Hope, Save Lives",
    msg: "Your small donation can bring food, shelter, and care to those who need it most.",
    bgimg:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Kindness Creates Change",
    msg: "Every contribution supports education and healthcare, helping communities build a brighter future.",
    bgimg:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1600&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Together for Humanity",
    msg: "Stand with us to fight hunger and poverty, and spread compassion across the world.",
    bgimg:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&auto=format&fit=crop&q=80",
  },
];

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
    });
  }, []);

  return (
    <>
      {/* ===== Slider Hero ===== */}
      <div className="relative">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          speed={1000}
          loop={true}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
            bulletClass: "custom-bullet",
            bulletActiveClass: "custom-bullet-active",
          }}
          className="w-full h-screen"
        >
          {SlideAry.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center"
                style={{ backgroundImage: `url(${item.bgimg})` }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[palegreen]/40 to-[palegreen]/60"></div>

                {/* Animated circles decoration */}
                <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-[palegreen]/30 animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-[palegreen]/20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 right-1/3 w-12 h-12 rounded-full bg-[palegreen]/40 animate-pulse delay-500"></div>

                {/* Content */}
                <div className="relative z-10 text-center px-6 text-white max-w-4xl">
                  <div
                    data-aos="fade-down"
                    className="inline-flex mt-20 items-center justify-center px-4 py-2 mb-6 bg-[palegreen]/30 backdrop-blur-sm rounded-full"
                  >
                    <FiHeart className="mr-2 text-white" />
                    <span className="text-sm font-semibold">Making a Difference</span>
                  </div>

                  <h1 className="sm:text-5xl text-4xl md:text-7xl font-extrabold mb-6 drop-shadow-lg leading-tight">
                    {item.title.split(" ").map((word, i) => (
                      <span
                        key={i}
                        className="inline-block animate-fadeInUp"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        {word}&nbsp;
                      </span>
                    ))}
                  </h1>

                  <p
                    data-aos="fade-up"
                    className="text-xl md:text-2xl mb-10 font-light drop-shadow-md max-w-2xl mx-auto leading-relaxed"
                  >
                    {item.msg}
                  </p>

                  <div className="flex flex-row justify-center items-center gap-6">
                    <Link to="/donate">
                      <button
                        data-aos="fade-right"
                        className="group relative p-3 sm:px-8 sm:py-4 bg-[palegreen] hover:bg-green-400 transition-all duration-300 rounded-xl shadow-lg sm:text-xl font-semibold flex items-center overflow-hidden text-green-900"
                      >
                        <span className="relative z-10 flex items-center">
                          Donate Now
                          <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-[palegreen] to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </Link>

                    {/* If your About page is /hero, consider updating this link */}
                    <Link to="/hero">
                      <button
                        data-aos="fade-left"
                        className="group relative sm:px-8 sm:py-4 bg-transparent border-2 border-white/60 hover:border-white hover:bg-white/20 transition-all duration-300 rounded-xl p-3 sm:text-xl font-semibold flex items-center backdrop-blur-sm text-white"
                      >
                        <span className="relative z-10 flex items-center">
                          About Us
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination */}
        <div className="custom-pagination absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2"></div>

        {/* Custom CSS for pagination */}
        <style jsx="true">{`
          .custom-bullet {
            width: 12px;
            height: 12px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            margin: 0 6px;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .custom-bullet-active {
            width: 30px;
            background: palegreen;
            border-radius: 10px;
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease forwards;
            opacity: 0;
          }
        `}</style>
      </div>

      {/* ===== All Donor Sections (stacked below the hero) ===== */}
      <WhyDonate />
      <PayOption />
      <MoneyPurs />
      <Corporate />
      <DonorCampaign />
    </>
  );
};

export default Hero;
