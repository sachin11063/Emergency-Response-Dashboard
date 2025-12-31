const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema(
  {
    unitId: {
      type: String,
      required: true,
      unique: true
    },

    type: {
      type: String,
      enum: ["ambulance", "fire", "police"],
      required: true
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

    available: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

UnitSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Unit", UnitSchema);
