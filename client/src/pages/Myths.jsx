import { useState } from "react";

const mythsData = [
  {
    myth: "You can't exercise during periods",
    fact: "Light exercise can help reduce cramps and improve mood."
  },
  {
    myth: "Periods are dirty",
    fact: "Menstruation is a natural biological process."
  },
  {
    myth: "You shouldn't bathe during periods",
    fact: "Bathing helps maintain hygiene and reduce discomfort."
  },
  {
    myth: "You can't get pregnant during periods",
    fact: "Pregnancy is still possible depending on cycle timing."
  }
];

const Myths = () => {

  const [flipped, setFlipped] = useState({});

  const toggleFlip = (index) => {
    setFlipped((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-rose-50 p-6">

      <h1 className="text-2xl font-bold text-rose-500 mb-6">
        Myths vs Facts
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {mythsData.map((item, i) => (

          <div
            key={i}
            className="perspective"
            onClick={() => toggleFlip(i)}
          >

            <div
              className={`relative w-full h-40 transition-transform duration-500 transform ${
                flipped[i] ? "rotate-y-180" : ""
              }`}
              style={{
                transformStyle: "preserve-3d"
              }}
            >

              {/* FRONT (MYTH) */}
              <div
                className="absolute w-full h-full bg-white border rounded-xl p-5 flex flex-col justify-center"
                style={{
                  backfaceVisibility: "hidden"
                }}
              >
                <p className="text-red-500 font-semibold mb-2">
                  Myth
                </p>
                <p>{item.myth}</p>
              </div>

              {/* BACK (FACT) */}
              <div
                className="absolute w-full h-full bg-rose-100 border rounded-xl p-5 flex flex-col justify-center"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden"
                }}
              >
                <p className="text-green-600 font-semibold mb-2">
                  Fact
                </p>
                <p>{item.fact}</p>
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Myths;