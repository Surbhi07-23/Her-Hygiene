import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { lat, lon } = req.body;

    const query = `
      [out:json];
      node["amenity"="pharmacy"](around:5000, ${lat}, ${lon});
      out;
    `;

    const response = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",

        headers: {
          "Content-Type": "text/plain"
        },

        body: query
      }
    );

    const data = await response.json();

    res.json(data);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Failed to fetch stores"
    });

  }

});

export default router;