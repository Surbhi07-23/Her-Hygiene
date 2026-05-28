import { useState } from "react";

const data = {
  Hygiene: [
    {
      title: "How often should you change pads?",
      content:
        "Change sanitary pads every 4-6 hours to maintain hygiene and prevent infections."
    },
    {
      title: "Can you bathe during periods?",
      content:
        "Yes. Bathing helps maintain hygiene and can reduce cramps."
    }
  ],

  Nutrition: [
    {
      title: "Best foods during periods",
      content:
        "Iron-rich foods, fruits, leafy vegetables, and plenty of water help reduce fatigue."
    },
    {
      title: "Should you avoid junk food?",
      content:
        "Excess sugar and processed food may worsen bloating and mood swings."
    }
  ],

  Symptoms: [
    {
      title: "Common symptoms",
      content:
        "Cramps, bloating, fatigue, headaches, and mood swings are common during periods."
    },
    {
      title: "When should you see a doctor?",
      content:
        "Consult a doctor if you experience extremely severe pain or very irregular cycles."
    }
  ],

  Cycle: [
    {
      title: "What is a menstrual cycle?",
      content:
        "A menstrual cycle is the monthly hormonal cycle preparing the body for pregnancy."
    },
    {
      title: "Normal cycle length",
      content:
        "A healthy cycle usually ranges between 21 and 35 days."
    }
  ]
};

const tips = [
  "Stay hydrated during periods 💧",
  "Light exercise may reduce cramps 🏃‍♀️",
  "Sleep well to regulate hormones 😴",
  "Iron-rich foods help with fatigue 🥗"
];

const Education = () => {

  const [activeTab, setActiveTab] = useState("Hygiene");
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const filteredData = data[activeTab].filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const randomTip =
    tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="min-h-screen bg-rose-50 p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-rose-500 mb-2">
        Health Information
      </h1>

      <p className="text-gray-500 mb-6">
        Learn more about menstrual health and wellness
      </p>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search topics..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 border rounded-lg p-3 mb-6"
      />

      {/* TABS */}
      <div className="flex flex-wrap gap-3 mb-6">

        {Object.keys(data).map((tab) => (

          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setOpenIndex(null);
            }}
            className={`px-4 py-2 rounded-full transition ${
              activeTab === tab
                ? "bg-rose-500 text-white"
                : "bg-white border text-gray-600"
            }`}
          >
            {tab}
          </button>

        ))}

      </div>

      {/* ACCORDION */}
      <div className="space-y-4">

        {filteredData.map((item, index) => (

          <div
            key={index}
            className="bg-white border rounded-xl overflow-hidden"
          >

            <button
              onClick={() =>
                setOpenIndex(
                  openIndex === index ? null : index
                )
              }
              className="w-full flex justify-between items-center p-5 text-left"
            >

              <span className="font-medium text-gray-800">
                {item.title}
              </span>

              <span className="text-rose-500 text-xl">
                {openIndex === index ? "−" : "+"}
              </span>

            </button>

            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                {item.content}
              </div>
            )}

          </div>

        ))}

      </div>

      {/* DAILY TIP */}
      <div className="mt-8 bg-rose-100 border border-rose-200 rounded-xl p-5">

        <h2 className="font-semibold text-rose-500 mb-2">
          🌿 Daily Wellness Tip
        </h2>

        <p className="text-gray-700">
          {randomTip}
        </p>

      </div>

    </div>
  );
};

export default Education;