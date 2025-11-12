import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileAlt,
  FaComments,
  FaQuestionCircle,
  FaPaperPlane,
  FaUser,
  FaHeading
} from "react-icons/fa";

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="max-w-8xl mx-auto pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="text-center mb-16" data-aos="fade-up">
        <h1
          className="text-4xl font-bold text-gray-900 mb-4 font-serif"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          Get In Touch
        </h1>
        <p
          className="text-xl text-gray-600 max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          We'd love to hear from you. Reach out to us with any questions or inquiries.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div
          className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl sm:h-[115vh]"
          data-aos="fade-up"
        >
          <div className="bg-gradient-to-r from-[palegreen] to-green-400 py-6 px-8">
            <h2 className="text-black text-2xl font-semibold flex items-center gap-2">
              <FaPaperPlane className="text-black" />
              Send us a Message
            </h2>
            <p className="text-gray-700 mt-1">We'll respond as soon as possible</p>
          </div>

          <form className="p-8 space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Your Full Name"
                className="w-full border border-gray-200 rounded-lg pl-10 p-3.5 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full border border-gray-200 rounded-lg pl-10 p-3.5 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300"
                required
              />
            </div>

            <select className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300 bg-white appearance-none">
              <option>Choose a Topic</option>
              <option>Donation Support</option>
              <option>Receipts</option>
              <option>Campaign Info</option>
              <option>General Inquiry</option>
            </select>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaHeading className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-200 rounded-lg pl-10 p-3.5 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300"
                required
              />
            </div>

            <textarea
              rows={5}
              placeholder="Your Message"
              className="w-full border border-gray-200 rounded-lg p-3.5 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-[palegreen] hover:bg-green-400 text-black py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium"
            >
              <FaPaperPlane />
              Send Message
            </button>

            {isSubmitted && (
              <p className="text-green-600 mt-4 text-center">Message sent successfully!</p>
            )}
          </form>
        </div>

        {/* Contact Info + Quick Links */}
        <div className="space-y-8" data-aos="zoom-in-up" data-aos-delay="200">
          {/* Contact Info */}
          <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200 flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-500" />
              Contact Information
            </h2>
            <ul className="space-y-6 text-gray-700">
              <li className="flex items-start gap-4">
                <div className="bg-[palegreen] p-3 rounded-full flex items-center justify-center mt-1">
                  <FaEnvelope className="text-black text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">support@charity.org</p>
                  <p className="text-sm text-gray-500 mt-1">Typically replies within 24 hours</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-[palegreen] p-3 rounded-full flex items-center justify-center mt-1">
                  <FaPhone className="text-black text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600">+123 456 7890</p>
                  <p className="text-sm text-gray-500 mt-1">WhatsApp Available (9AM - 5PM)</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-[palegreen] p-3 rounded-full flex items-center justify-center mt-1">
                  <FaMapMarkerAlt className="text-black text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Office</h3>
                  <p className="text-gray-600">123 Charity Street, City, Country</p>
                  <p className="text-sm text-gray-500 mt-1">Visit by appointment only</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div
            className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200 flex items-center gap-2">
              <FaQuestionCircle className="text-green-500" />
              Quick Support
            </h2>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300 group">
                <div className="bg-[palegreen] p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <FaFileAlt className="text-black text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Download Receipts</h3>
                  <p className="text-sm text-gray-600">Access your donation records</p>
                </div>
              </li>
              <li className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300 group">
                <div className="bg-[palegreen] p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <FaComments className="text-black text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Donation History / FAQs</h3>
                  <p className="text-sm text-gray-600">View your contributions and common questions</p>
                </div>
              </li>
              <li className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-300 group">
                <div className="bg-[palegreen] p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <FaQuestionCircle className="text-black text-lg" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Need Help? Visit FAQs</h3>
                  <p className="text-sm text-gray-600">Find answers to common questions</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
