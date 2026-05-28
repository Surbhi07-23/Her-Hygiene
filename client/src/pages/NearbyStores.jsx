import { useState } from "react";

const NearbyStores = () => {

  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStores = async () => {

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

          const data = await response.json();

          setStores(data.elements || []);

        } catch (err) {

          console.log(err);

          alert("Failed to fetch stores");

        }

        setLoading(false);

      },

      () => {

        alert("Please allow location access");

        setLoading(false);

      }

    );
  };

  return (

    <div className="min-h-screen bg-rose-50 p-6">

      <h1 className="text-3xl font-bold text-rose-500 mb-2">

        Nearby Medical Stores

      </h1>

      <p className="text-gray-500 mb-6">

        Find pharmacies near you

      </p>

      <button
        onClick={getStores}
        className="bg-rose-500 text-white px-5 py-3 rounded-xl hover:bg-rose-600 transition"
      >

        Find Nearby Stores

      </button>

      {loading && (

        <p className="mt-5 text-gray-500">

          Searching nearby pharmacies...

        </p>

      )}

      <div className="grid md:grid-cols-2 gap-5 mt-8">

        {stores.map((store, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl border border-pink-100 p-5 shadow-sm"
          >

            <h2 className="font-semibold text-lg text-gray-800 mb-2">

              {store.tags?.name || "Medical Store"}

            </h2>

            <p className="text-gray-500 text-sm mb-4">

              {store.tags?.["addr:street"] ||
                "Nearby Pharmacy"}

            </p>

            <a
              href={`https://www.google.com/maps?q=${store.lat},${store.lon}`}
              target="_blank"
              rel="noreferrer"
              className="text-rose-500 font-medium"
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