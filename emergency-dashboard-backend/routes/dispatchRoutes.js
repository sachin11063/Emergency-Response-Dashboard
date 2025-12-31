const express = require("express");
const Incident = require("../models/Incident");
const Unit = require("../models/Unit");
const Dispatch = require("../models/Dispatch");

const router = express.Router();

// DISPATCH nearest available unit
router.post("/:incidentId", async (req, res) => {
  try {
    const { incidentId } = req.params;

    const incident = await Incident.findById(incidentId);
    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    if (incident.status !== "reported") {
      return res.status(400).json({ message: "Incident already assigned" });
    }

    // Find nearest available unit
    const nearestUnit = await Unit.findOne({
      available: true,
      location: {
        $near: {
          $geometry: incident.location,
          $maxDistance: 5000 // meters (5 km)
        }
      }
    });

    if (!nearestUnit) {
      return res.status(404).json({ message: "No available units nearby" });
    }

    // Create dispatch record
    const dispatch = new Dispatch({
      incidentId: incident._id,
      unitId: nearestUnit._id
    });

    await dispatch.save();

    // Update unit & incident
    nearestUnit.available = false;
    await nearestUnit.save();

    incident.status = "assigned";
    await incident.save();

    res.json({
      message: "Unit dispatched successfully",
      unit: nearestUnit,
      incident,
      dispatch
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
