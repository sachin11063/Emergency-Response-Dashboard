const express = require("express");
const Unit = require("../models/Unit");

const router = express.Router();

// CREATE unit
router.post("/", async (req, res) => {
  try {
    const { unitId, type, longitude, latitude } = req.body;

    const unit = new Unit({
      unitId,
      type,
      location: {
        type: "Point",
        coordinates: [longitude, latitude]
      }
    });

    await unit.save();
    res.status(201).json(unit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all units
router.get("/", async (req, res) => {
  try {
    const units = await Unit.find();
    res.json(units);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
