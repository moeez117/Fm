import React from "react";

const campaigns = [
  {
    id: 1,
    title: "Education for All",
    description: "Providing books and supplies for underprivileged children.",
    raised: 7500,
    goal: 10000,
  },
  {
    id: 2,
    title: "Clean Water Project",
    description: "Building wells to ensure clean drinking water in rural areas.",
    raised: 4500,
    goal: 8000,
  },
  {
    id: 3,
    title: "Healthcare Aid",
    description: "Medical support for families in need.",
    raised: 9000,
    goal: 12000,
  },
];

const Campaigns = () => {
  return (
    <section className="pt-20 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-green-700">
          Active Campaigns
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((camp) => {
            const progress = Math.min((camp.raised / camp.goal) * 100, 100);

            return (
              <div
                key={camp.id}
                className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {camp.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {camp.description}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-green-200 rounded-full h-3 mb-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="text-sm text-gray-700 mb-4">
                  Raised:{" "}
                  <span className="font-bold text-gray-900">
                    ${camp.raised}
                  </span>{" "}
                  / ${camp.goal}
                </p>

                <button className="w-full bg-gradient-to-r from-green-600 to-green-400 hover:opacity-90 text-white py-2 px-4 rounded-lg text-sm font-medium shadow-md transition">
                  Donate Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Campaigns;
