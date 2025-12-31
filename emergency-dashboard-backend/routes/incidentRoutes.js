const express = require("express");
const Incident = require("../models/Incident");

const router = express.Router();

function classifySeverity(description) {
  const text = description.toLowerCase();

  const highKeywords = [
    "unconscious",
    "electrocuted",
    "not responding",
    "trapped",
    "fire",
    "explosion",
    "collapsed",
    "bleeding",
    "gas leak",
    "unsafe",
    "critical"
  ];

  const mediumKeywords = [
    "accident",
    "injured",
    "medical",
    "assault",
    "fight",
    "fire reported"
  ];

  if (highKeywords.some(word => text.includes(word))) {
    return "high";
  }

  if (mediumKeywords.some(word => text.includes(word))) {
    return "medium";
  }

  return "low";
}


// CREATE incident
router.post("/", async (req, res) => {
  try {
    const { description, longitude, latitude } = req.body;

    const severity = classifySeverity(description);

    const incident = new Incident({
      description,
      severity,
      status: "reported",
      location: {
        type: "Point",
        coordinates: [longitude, latitude]
      }
    });

    await incident.save();
    res.json(incident);
  } catch (err) {
    res.status(500).json({ error: "Failed to create incident" });
  }
});

// GET all incidents
router.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
