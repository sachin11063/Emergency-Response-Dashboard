# 🚨 Emergency Response Coordination Dashboard

A full-stack emergency management dashboard that helps coordinate police, ambulance, and fire units using **AI-driven incident severity classification**, real-time geospatial mapping, and automated dispatch workflows.

---

## 📌 Project Overview

In emergency situations, response time and coordination are critical.  
This project simulates a real-world emergency response system where incoming incidents are:

- Classified by severity using AI
- Displayed on a live map
- Assigned to the nearest available emergency unit
- Tracked for performance metrics

The system is designed for **control room operators** to monitor, dispatch, and analyze emergency responses efficiently.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Leaflet.js (OpenStreetMap)
- Axios
- CSS (Custom dashboard styling with dark mode)

### Backend
- Node.js
- Express.js
- MongoDB (with geospatial queries)
- OpenAI API (for incident severity classification)

---

## ⚙️ Features Implemented

### ✅ Core Requirements
- Interactive map showing incidents and unit locations
- REST API ingestion of incident reports
- MongoDB geospatial storage (`Point` with coordinates)
- AI-based severity classification (low / medium / high)
- Nearest-unit dispatch logic
- Assignment workflow with unit availability tracking
- Performance metrics dashboard

### ✨ UI Enhancements
- Dark / Light mode toggle
- Toast notifications on dispatch
- Animated metric cards
- Responsive dashboard layout
- Loading skeletons
- Sticky navigation bar

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally
- OpenAI API key

---

## 🔧 Backend Setup

```bash
cd emergency-dashboard-backend
npm install
```

## Create a .env file:

```bash
PORT=5001
MONGO_URI=mongodb://127.0.0.1:27017/emergency_dashboard
OPENAI_API_KEY=your_openai_api_key_here
```

## Start the backend server:

```bash
npm run dev
```

## Server runs on:
- 👉 http://localhost:5001

  
## 🎨 Frontend Setup

```bash
cd emergency-dashboard-frontend
npm install
npm run dev
```

## Frontend runs on:
- 👉 http://localhost:5173 (or Vite default)

---

## 🧪 Reset & Seed Sample Data

To clear existing data and load fresh sample incidents and units:

```bash
cd emergency-dashboard-backend
node scripts/resetAndSeed.js
```

## This script:
- Deletes all existing incidents, units, and dispatches
- Creates multiple police, ambulance, and fire units
- Creates low, medium, and high severity incidents with realistic descriptions

---

## 🗺️ Live Behavior Simulation
- Open dashboard in browser
- Run resetAndSeed.js
- Watch incidents appear on map
- Dispatch nearest unit
- See unit availability update automatically
- Metrics refresh without page reload

---

## 📊 Performance Metrics
- The dashboard tracks:
- Total incidents
- Pending incidents
- Assigned incidents
- Average response time
- These metrics update in real time as incidents are dispatched.

---
## 🤖 AI Severity Classification
- Incident descriptions are sent to OpenAI API to classify severity into:
- Low – minor incidents
- Medium – moderate urgency
- High – life-threatening emergencies
- This simulates intelligent triage in emergency control systems.

---

## 🎥 Walkthrough Video
### A recorded walkthrough demonstrates:

---

## 🌍 Deployment Notes (Optional)
- This project is designed to run locally.
- However, it can be easily deployed using:
- MongoDB Atlas
- Render / Railway (backend)
- Netlify / Vercel (frontend)

---

## 📌 Why This Project Matters
- This dashboard demonstrates:
- Real-world system design
- Geospatial data handling
- AI integration in decision-making
- Clean frontend UX for operators
- Backend API architecture
- Production-style workflows
- It closely mirrors systems used by:
- Emergency call centers
- Smart city control rooms
- Disaster response teams

---

## 👤 Author
- Sachin
- Software Engineer | Full-Stack Developer

