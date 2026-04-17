const sections = [
  {
    title: "Menstrual Cycle Phases",
    content:
      "The menstrual cycle includes menstrual, follicular, ovulation, and luteal phases. Each phase plays a role in reproductive health.",
    icon: "🌀"
  },
  {
    title: "Hygiene Tips",
    content:
      "Change sanitary products regularly, maintain cleanliness, and avoid using harsh or scented products.",
    icon: "🧼"
  },
  {
    title: "When to See a Doctor",
    content:
      "Consult a doctor if you experience severe pain, irregular cycles, or unusually heavy bleeding.",
    icon: "⚠️"
  },
  {
    title: "Diet During Periods",
    content:
      "Eat iron-rich foods, stay hydrated, and include fruits and vegetables to reduce fatigue.",
    icon: "🥗"
  }
];

const Education = () => {
  return (
    <div className="min-h-screen bg-rose-50 p-6">

      <h1 className="text-2xl font-bold text-rose-500 mb-6">
        Menstrual Health Education
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {sections.map((sec, i) => (

          <div
            key={i}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >

            {/* ICON + TITLE */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{sec.icon}</span>
              <h2 className="text-lg font-semibold text-gray-800">
                {sec.title}
              </h2>
            </div>

            {/* CONTENT */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {sec.content}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Education;