import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaHandsHelping, FaDonate, FaSmile } from "react-icons/fa";

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const steps = [
    {
      icon: <FaHandsHelping className="text-5xl text-indigo-600" />,
      title: "Choose a Campaign",
      description:
        "Browse through various causes and select the campaign you’d like to support. Every campaign is transparent with clear goals.",
    },
    {
      icon: <FaDonate className="text-5xl text-green-600" />,
      title: "Make a Donation",
      description:
        "Contribute securely through our platform. Even the smallest amount can bring life-changing impact to someone in need.",
    },
    {
      icon: <FaSmile className="text-5xl text-yellow-500" />,
      title: "See the Impact",
      description:
        "Track the progress of campaigns you supported and witness the real change your contribution has created.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12" data-aos="fade-up">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl shadow-md hover:shadow-xl transition bg-gray-50"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="flex justify-center mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
