const router = require("express").Router();
const Period = require("../models/Period");
const auth = require("../middleware/auth");

const {
  calculateCycleLength,
  predictNextPeriod,
  calculateDuration
} = require("../utils/cycle");


//ADD PERIOD
router.post("/", auth, async (req, res) => {
  try {
    const { startDate, endDate, symptoms, notes } = req.body;

    const duration = calculateDuration(startDate, endDate);

    const period = new Period({
      userId: req.user.id,
      startDate,
      endDate,
      symptoms,
      notes,
      duration
    });

    await period.save();

    res.status(201).json(period);

  } catch (error) {
    res.status(500).json(error);
  }
});


//GET ALL PERIODS
router.get("/", auth, async (req, res) => {
  try {

    const periods = await Period.find({
      userId: req.user.id
    }).sort({ startDate: -1 });

    res.json(periods);

  } catch (error) {
    res.status(500).json(error);
  }
});


//DELETE PERIOD
router.delete("/:id", auth, async (req, res) => {
  try {

    const deleted = await Period.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deleted) {
      return res.status(404).json("Not found");
    }

    res.json("Deleted");

  } catch (error) {
    res.status(500).json(error);
  }
});


//UPDATE PERIOD
router.put("/:id", auth, async (req, res) => {
  try {

    const { startDate, endDate , notes } = req.body;

    let updateData = { ...req.body };

    if (startDate && endDate) {
      updateData.duration = calculateDuration(startDate, endDate);
    }
    const duration =
      Math.ceil(
        (new Date(endDate) - new Date(startDate)) /
        (1000 * 60 * 60 * 24)
      ) + 1;

    const updated = await Period.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      {
        startDate,
        endDate,
        notes,      
        duration    
      },
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json("Not found");
    }

    res.json(updated);

  } catch (error) {
    res.status(500).json(error);
  }
});


//STATS ROUTE
router.get("/stats", auth, async (req, res) => {
  try {

    const periods = await Period.find({
      userId: req.user.id
    });

    const cycleLength = calculateCycleLength(periods);
    const nextPeriod = predictNextPeriod(periods);

    res.json({
      totalEntries: periods.length,
      cycleLength,
      nextPeriod
    });

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;