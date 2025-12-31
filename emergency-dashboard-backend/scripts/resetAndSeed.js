const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();

// ---- CONFIG ----
const API_BASE = "http://localhost:5001/api";
const MONGO_URI = process.env.MONGO_URI;

// ---- DATA ----
const units = [
  { unitId: "AMB-001", type: "ambulance", longitude: 76.7798, latitude: 30.7339 },
  { unitId: "AMB-002", type: "ambulance", longitude: 76.7855, latitude: 30.7381 },
  { unitId: "AMB-003", type: "ambulance", longitude: 76.7706, latitude: 30.7289 },
  { unitId: "AMB-004", type: "ambulance", longitude: 76.7743, latitude: 30.7315 },
  { unitId: "AMB-005", type: "ambulance", longitude: 76.7882, latitude: 30.7346 },

  { unitId: "POL-001", type: "police", longitude: 76.7772, latitude: 30.7346 },
  { unitId: "POL-002", type: "police", longitude: 76.7669, latitude: 30.7263 },
  { unitId: "POL-003", type: "police", longitude: 76.7811, latitude: 30.7392 },
  { unitId: "POL-004", type: "police", longitude: 76.7724, latitude: 30.7301 },

  { unitId: "FIRE-001", type: "fire", longitude: 76.7827, latitude: 30.7361 },
  { unitId: "FIRE-002", type: "fire", longitude: 76.7894, latitude: 30.7302 },
  { unitId: "FIRE-003", type: "fire", longitude: 76.7698, latitude: 30.7275 }
];

const incidents = [
  {
    description: "Major fire in residential apartment, people trapped, heavy smoke",
    longitude: 76.7841,
    latitude: 30.7349
  },
  {
    description: "Person electrocuted by fallen power line, unconscious, area unsafe",
    longitude: 76.7819,
    latitude: 30.7326
  },
  {
    description: "Multi-vehicle highway accident, several injured, people bleeding heavily",
    longitude: 76.7712,
    latitude: 30.7284
  },
  {
    description: "Gas cylinder explosion in market area, building partially collapsed",
    longitude: 76.7785,
    latitude: 30.7338
  },
  {
    description: "Road accident with injuries, victims conscious and stable",
    longitude: 76.7748,
    latitude: 30.7320
  },
  {
    description: "Street fight reported near market, police assistance required",
    longitude: 76.7771,
    latitude: 30.7347
  },
  {
    description: "Fire reported in shop, currently under control",
    longitude: 76.7822,
    latitude: 30.7365
  },
  {
    description: "Medical emergency, person fainted and needs hospital checkup",
    longitude: 76.7806,
    latitude: 30.7315
  },
  {
    description: "Minor vehicle collision, no injuries reported",
    longitude: 76.7689,
    latitude: 30.7312
  },
  {
    description: "Noise complaint reported in residential area",
    longitude: 76.7735,
    latitude: 30.7296
  },
  {
    description: "Small roadside fire already extinguished",
    longitude: 76.7864,
    latitude: 30.7372
  },
  {
    description: "Traffic signal malfunction reported at intersection",
    longitude: 76.7701,
    latitude: 30.7288
  }
];

// ---- SCRIPT ----
async function resetAndSeed() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);

    const db = mongoose.connection.db;

    console.log("🗑️ Clearing collections...");
    await db.collection("incidents").deleteMany({});
    await db.collection("units").deleteMany({});
    await db.collection("dispatches").deleteMany({});

    console.log("🚓 Seeding units...");
    for (const unit of units) {
      await axios.post(`${API_BASE}/units`, unit);
    }

    console.log("🚨 Seeding incidents...");
    for (const incident of incidents) {
      await axios.post(`${API_BASE}/incidents`, incident);
    }

    console.log("✅ RESET + SEED COMPLETE");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

resetAndSeed();
