import express from "express";

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const { lat, lon } = req.body;

    console.log(lat, lon);

    const query = `
      [out:json];
      node["amenity"="pharmacy"]
      (around:5000,${lat},${lon});
      out;
    `;

    const response = await fetch(
      "https://overpass-api.de/api/interpreter",
      {
        method: "POST",

        headers: {

          "Content-Type": "text/plain",

          "User-Agent": "HerHygieneApp"

        },

        body: query

      }
    );

    console.log(response.status);

    const text = await response.text();

    console.log(text);

    const data = JSON.parse(text);

    res.json(data);

  } catch (err) {

    console.log(err);

    res.status(500).json({

      message: err.message

    });

  }

});

export default router;