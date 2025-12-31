const mongoose = require("mongoose");

const DispatchSchema = new mongoose.Schema(
  {
    incidentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Incident",
      required: true
    },

    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true
    },

    assignedAt: {
      type: Date,
      default: Date.now
    },

    arrivedAt: Date,
    resolvedAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dispatch", DispatchSchema);
