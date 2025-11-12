import React, { useEffect } from "react";
import { FaBullseye, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const campaigns = [
  {
    id: 1,
    name: "Medical Aid for Children",
    category: "Health",
    goal: 100000,
    raised: 65000,
    startDate: "2023-05-01",
    endDate: "2023-12-31",
    description:
      "Providing medical assistance to underprivileged children in rural areas.",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Education for All",
    category: "Education",
    goal: 100000,
    raised: 42000,
    startDate: "2023-06-15",
    endDate: "2023-11-30",
    description:
      "Building schools and providing educational materials for children in need.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    name: "Flood Relief Fund",
    category: "Relief",
    goal: 200000,
    raised: 176000,
    startDate: "2023-07-01",
    endDate: "2023-10-31",
    description:
      "Helping communities affected by recent floods with essential supplies and rebuilding efforts.",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    name: "Food for Families",
    category: "Hunger",
    goal: 80000,
    raised: 55000,
    startDate: "2023-08-01",
    endDate: "2023-12-15",
    description:
      "Distributing food packages to low-income families to fight hunger.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    name: "Clean Water Project",
    category: "Environment",
    goal: 120000,
    raised: 90000,
    startDate: "2023-09-10",
    endDate: "2024-02-28",
    description:
      "Building wells and providing clean water to communities in need.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    name: "Hunger Free Drive",
    category: "Food & Nutrition",
    goal: 120000,
    raised: 47000,
    startDate: "2023-09-01",
    endDate: "2024-02-28",
    description:
      "Distributing meals and ration packs to homeless families and underprivileged communities to fight hunger and malnutrition.",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80",
  },
];

const CampaignCard = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-4xl font-bold text-center mb-14 text-black"
          data-aos="fade-down"
        >
          Active Campaigns
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {campaigns.map((campaign, index) => {
            const progress = Math.min(
              (campaign.raised / campaign.goal) * 100,
              100
            );

            const daysRemaining = Math.ceil(
              (new Date(campaign.endDate) - new Date()) / (1000 * 60 * 60 * 24)
            );

            return (
              <div
                key={campaign.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[palegreen] hover:shadow-2xl group flex flex-col"
              >
                {/* Image */}
                <div className="h-65 w-full relative overflow-hidden">
                  <img
                    src={campaign.image}
                    alt={campaign.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-[palegreen] text-black text-xs px-3 py-1 rounded-full font-medium">
                    {campaign.category}
                  </div>
                  {daysRemaining > 0 && (
                    <div className="absolute top-3 left-3 bg-black bg-opacity-80 text-white text-xs px-3 py-1 rounded-full">
                      {daysRemaining} days left
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 pt-1 flex flex-col flex-grow">
                  <h3 className="text-2xl font-semibold text-black mb-2">
                    {campaign.name}
                  </h3>
                  <p className="text-sm text-black mb-4 line-clamp-3 flex-grow">
                    {campaign.description}
                  </p>

                  <div className="mb-5 space-y-2 text-sm text-black my-auto">
                    <p className="flex items-center gap-2">
                      <FaBullseye className="text-[palegreen]" />
                      Goal: QAR {campaign.goal.toLocaleString()}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCheckCircle className="text-[palegreen]" />
                      Raised: QAR {campaign.raised.toLocaleString()}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[palegreen]" />
                      {new Date(campaign.startDate).toLocaleDateString()} →{" "}
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-auto">
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-[palegreen] to-[palegreen]"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-sm text-black text-right">
                      {progress.toFixed(1)}% funded
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampaignCard;
