import React from "react";
import {
  FaHome,
  FaDonate,
  FaChartLine,
  FaWallet,
  FaFileAlt,
  FaCog,
  FaUser,
} from "react-icons/fa";

const navItems = [
  { id: 1, icon: <FaHome />, name: "Dashboard", path: "#" },
  { id: 2, icon: <FaDonate />, name: "My Donation", path: "#" },
  { id: 3, icon: <FaChartLine />, name: "Campaigns", path: "#" },
  { id: 4, icon: <FaWallet />, name: "Wallet", path: "#" },
  { id: 5, icon: <FaFileAlt />, name: "Report", path: "#" },
  { id: 6, icon: <FaCog />, name: "Settings", path: "#" },
  { id: 7, icon: <FaUser />, name: "My Profile", path: "#" },
];

const SideBar = () => {
  return (
    <div className="w-64 min-h-screen bg-green-50 text-green-900 flex flex-col justify-between shadow-xl">
      {/* 🌟 Brand / Logo */}
      <div>
        <h1 className="text-xl text-center font-semibold mt-5 tracking-wide text-green-800">
          Qatar Charity
        </h1>

        {/* 📌 Navigation */}
        <nav className="mt-8">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              className="flex items-center gap-3 px-5 py-3 text-green-700 hover:bg-green-200 hover:text-green-900 transition-all rounded-lg mx-3 mb-2"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* 📌 Footer */}
      <div className="p-4 text-center border-t border-green-200 text-green-600 text-sm">
        © {new Date().getFullYear()} Donor Dashboard
      </div>
    </div>
  );
};

export default SideBar;
