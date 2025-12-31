const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    },

    status: {
      type: String,
      enum: ["reported", "assigned", "resolved"],
      default: "reported"
    }
  },
  { timestamps: true }
);

// Geospatial index
IncidentSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Incident", IncidentSchema);
