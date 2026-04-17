import { useState } from "react";

const NearbyStores = () => {

  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStores = () => {

  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  setLoading(true);

  navigator.geolocation.getCurrentPosition(
    async (pos) => {

      try {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const query = 
        `[out:json];
          node["amenity"="pharmacy"](around:3000, ${lat}, ${lon});
          out;`;
        const res = await fetch(
          "https://overpass.kumi.systems/api/interpreter",
          {
            method: "POST",
            body: query,
            headers: {
              "Content-Type": "text/plain"
            }
          }
        );

        //  check response
        if (!res.ok) {
          throw new Error("API failed");
        }

        const data = await res.json();

        console.log("Stores:", data);

        setStores(data.elements || []);

      } catch (err) {
        console.log("ERROR:", err);
        alert("Failed to fetch stores");
      }

      //  ALWAYS stop loading
      setLoading(false);
    },

    (error) => {
      console.log("Geo error:", error);
      alert("Location permission denied");
      setLoading(false);
    }
  );
};

  return (
    <div className="min-h-screen bg-rose-50 p-6">

      <h1 className="text-2xl font-bold text-rose-500 mb-4">
        Nearby Medical Stores
      </h1>

      <button
        onClick={getStores}
        className="bg-rose-500 text-white px-4 py-2 rounded mb-6"
      >
        Find Nearby Stores
      </button>

      {loading && <p>Loading...</p>}

      {!loading && stores.length === 0 && (
        <p className="text-gray-400">
          Click the button to find nearby pharmacies
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4">

        {stores.map((store, i) => {

          const name = store.tags?.name || "Unnamed Pharmacy";
          const lat = store.lat;
          const lon = store.lon;

          return (
            <div
              key={i}
              className="bg-white p-4 rounded-xl border shadow-sm"
            >

              <h2 className="font-semibold text-gray-800">
                {name}
              </h2>

              <p className="text-sm text-gray-500 mb-2">
                Pharmacy
              </p>

              <a
                href={`https://www.google.com/maps?q=${lat},${lon}`}
                target="_blank"
                rel="noreferrer"
                className="text-rose-500 text-sm"
              >
                View on Maps →
              </a>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default NearbyStores;