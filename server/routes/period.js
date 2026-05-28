import express from "express";

import Period from "../models/Period.js";
import auth from "../middleware/auth.js";

import {
  calculateCycleLength,
  predictNextPeriod,
  calculateDuration
} from "../utils/cycle.js";

const router = express.Router();


// ADD PERIOD
router.post("/", auth, async (req, res) => {

  try {

    const {
      startDate,
      endDate,
      symptoms,
      notes
    } = req.body;

    const duration = calculateDuration(
      startDate,
      endDate
    );

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

    res.status(500).json({
      message: error.message
    });

  }

});


// GET ALL PERIODS
router.get("/", auth, async (req, res) => {

  try {

    const periods = await Period.find({

      userId: req.user.id

    }).sort({

      startDate: -1

    });

    res.json(periods);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// DELETE PERIOD
router.delete("/:id", auth, async (req, res) => {

  try {

    const deleted =
      await Period.findOneAndDelete({

        _id: req.params.id,
        userId: req.user.id

      });

    if (!deleted) {

      return res.status(404).json({
        message: "Not found"
      });

    }

    res.json({
      message: "Deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// UPDATE PERIOD
router.put("/:id", auth, async (req, res) => {

  try {

    const {
      startDate,
      endDate,
      notes
    } = req.body;

    let updateData = {
      ...req.body
    };

    if (startDate && endDate) {

      updateData.duration =
        calculateDuration(
          startDate,
          endDate
        );

    }

    const updated =
      await Period.findOneAndUpdate(

        {

          _id: req.params.id,
          userId: req.user.id

        },

        updateData,

        {

          new: true

        }

      );

    if (!updated) {

      return res.status(404).json({
        message: "Not found"
      });

    }

    res.json(updated);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


// STATS ROUTE
router.get("/stats", auth, async (req, res) => {

  try {

    const periods = await Period.find({

      userId: req.user.id

    });

    const cycleLength =
      calculateCycleLength(periods);

    const nextPeriod =
      predictNextPeriod(periods);

    res.json({

      totalEntries: periods.length,

      cycleLength,

      nextPeriod

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

export default router;