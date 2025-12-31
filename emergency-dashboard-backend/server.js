const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
require("./models/Incident");
require("./models/Unit");
require("./models/Dispatch");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const incidentRoutes = require("./routes/incidentRoutes");
const unitRoutes = require("./routes/unitRoutes");

app.use("/api/incidents", incidentRoutes);
app.use("/api/units", unitRoutes);

const dispatchRoutes = require("./routes/dispatchRoutes");
app.use("/api/dispatch", dispatchRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Emergency Dashboard API running");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
