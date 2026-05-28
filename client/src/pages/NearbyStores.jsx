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

      async (position) => {

        try {

          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const response = await fetch(
            "https://her-hygiene.onrender.com/api/stores",
            {
              method: "POST",

              headers: {
                "Content-Type": "application/json"
              },

              body: JSON.stringify({
                lat,
                lon
              })
            }
          );

          if (!response.ok) {

            throw new Error("Failed request");

          }

          const data = await response.json();

          console.log(data);

          setStores(data.elements || []);

        } catch (error) {

          console.log(error);

          alert(
            "Unable to fetch nearby stores right now."
          );

        }

        setLoading(false);

      },

      (error) => {

        console.log(error);

        alert("Please allow location access");

        setLoading(false);

      }

    );
  };

  return (

    <div className="min-h-screen bg-rose-50 p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-rose-500 mb-2">
        Nearby Medical Stores
      </h1>

      <p className="text-gray-500 mb-6">
        Find pharmacies and medical stores near you
      </p>

      {/* BUTTON */}
      <button
        onClick={getStores}
        className="bg-rose-500 text-white px-5 py-3 rounded-lg mb-8 hover:bg-rose-600 transition"
      >
        Find Nearby Stores
      </button>

      {/* LOADING */}
      {loading && (
        <p className="text-gray-500">
          Searching nearby pharmacies...
        </p>
      )}

      {/* EMPTY */}
      {!loading && stores.length === 0 && (
        <p className="text-gray-400">
          No stores found yet
        </p>
      )}

      {/* STORES */}
      <div className="grid md:grid-cols-2 gap-5">

        {stores.map((store, index) => (

          <div
            key={index}
            className="bg-white border border-pink-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >

            {/* STORE NAME */}
            <h2 className="font-semibold text-lg text-gray-800 mb-2">

              {store.tags?.name || "Medical Store"}

            </h2>

            {/* ADDRESS */}
            <p className="text-gray-500 text-sm mb-4">

              {store.tags?.["addr:street"] ||
                "Nearby Pharmacy"}

            </p>

            {/* MAP LINK */}
            <a
              href={`https://www.google.com/maps?q=${store.lat},${store.lon}`}
              target="_blank"
              rel="noreferrer"
              className="text-rose-500 font-medium text-sm"
            >
              Open in Maps →
            </a>

          </div>

        ))}

      </div>

    </div>
  );
};

export default NearbyStores;