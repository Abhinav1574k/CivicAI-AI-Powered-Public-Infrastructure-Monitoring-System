# 🏙️ CivicAI — AI-Powered Public Infrastructure Monitoring System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646cff.svg)](https://vitejs.dev/)
[![Powered By Gemini AI](https://img.shields.io/badge/Powered%20By-Google%20Gemini%201.5-8E44AD.svg)](https://ai.google.dev/)
[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2024%2F2025-FFA726.svg)](https://hacktoberfest.com/)

**CivicAI** is an end-to-end, enterprise-grade public infrastructure monitoring platform designed for smart city governance and municipal public works departments. Powered by **Google Gemini 1.5 Flash Computer Vision**, CivicAI automates municipal issue detection, prioritizes repairs through a multi-factor algorithmic queue, clusters citizen complaint noise, and verifies repairs post-completion using automated visual analysis.

---

## 📋 Table of Contents

- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Algorithmic Priority Engine](#-algorithmic-priority-engine)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Running the Monorepo](#running-the-monorepo)
- [API Reference](#-api-reference)
- [AI Vision & Demo Mode](#-ai-vision--demo-mode)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Key Features

### 🔍 1. Computer Vision Defect Detection
- Upload images of public infrastructure issues (e.g., potholes, damaged roads, overflowing drains, broken streetlights, waterlogging).
- **Gemini 1.5 Flash Vision API** instantly analyzes surface defects, estimates risk factors, calculates confidence ratings, and assigns responsible municipal departments.

### 📊 2. Dynamic Algorithmic Priority Engine
- Replaces first-come-first-served queues with an objective multi-factor scoring model.
- Prioritizes issues based on defect severity, citizen complaint velocity, structural exposure, location traffic volume, and AI confidence.
- Provides transparent human-readable explanations for every priority classification (`CRITICAL`, `HIGH`, `MEDIUM`, `LOW`).

### 🗺️ 3. Geo-Spatial Infrastructure Map & Queue
- Interactive maps powered by **Leaflet & OpenStreetMap** displaying color-coded markers for pending, in-progress, and resolved municipal incidents.
- Geofenced clustering view to group repeated complaints into single work orders.

### 🛠️ 4. AI Post-Repair Verification System
- Field contractors upload post-repair verification photos.
- Automated computer vision compares before-and-after states to verify 100% surface restoration before closing work orders.

### 📈 5. Command & Analytics Dashboard
- Executive health score tracking across core sectors: **Roads, Streetlights, Drainage, and Water Management**.
- Zone-level breakdown (e.g., Central Business District, Industrial Zones) and historical resolution trend charts powered by **Recharts**.

---

## 🏗️ Architecture & Tech Stack

```
                                 ┌────────────────────────┐
                                 │     Client (React)     │
                                 │  Vite + TS + Tailwind  │
                                 └───────────┬────────────┘
                                             │ HTTP / REST
                                             ▼
                                 ┌────────────────────────┐
                                 │    Server (Express)    │
                                 │  Node.js + TypeScript  │
                                 └─────┬──────────────┬───┘
                                       │              │
                   Multer File Uploads │              │ AI Vision Prompts
                                       ▼              ▼
                              ┌──────────────┐  ┌───────────────────┐
                              │ /uploads Dir │  │  Google Gemini    │
                              │ (Local Storage) │ 1.5 Flash Vision  │
                              └──────────────┘  └───────────────────┘
```

### **Frontend (`client/`)**
- **Framework:** React 19 + TypeScript + Vite 6
- **Styling:** Tailwind CSS v4
- **Mapping:** Leaflet & React Leaflet 5
- **Data Visualization:** Recharts
- **Icons:** Lucide React
- **Routing:** React Router DOM v7

### **Backend (`server/`)**
- **Runtime:** Node.js + Express + TypeScript (`tsx`)
- **AI Integration:** `@google/generative-ai` (Gemini 1.5 Flash Model)
- **Upload Engine:** Multer
- **Cross-Origin Handling:** CORS

### **Monorepo Orchestration**
- **Concurrency:** `concurrently` for unified client-server lifecycle management via single npm scripts.

---

## 📁 Project Directory Structure

```
CivicAI-Infrastructure-Monitoring/
├── client/                         # Frontend Application
│   ├── src/
│   │   ├── components/            # Reusable UI Components (Map, KPICard, Analytics, etc.)
│   │   ├── pages/                 # Main Views (LandingPage, DashboardPage, ReportPage, IssueDetailPage)
│   │   ├── services/              # API Integration Client (api.ts)
│   │   └── types/                 # TypeScript Types & Interfaces
│   ├── package.json
│   └── vite.config.ts
├── server/                         # Express Backend Application
│   ├── src/
│   │   ├── controllers/           # Request Handlers (issue.controller.ts)
│   │   ├── data/                  # Seed & Mock Data (mockIssues.ts)
│   │   ├── routes/                # Express API Routing (api.routes.ts)
│   │   ├── services/              # Business Logic (gemini.service.ts, priority.service.ts)
│   │   ├── types/                 # Server Type Definitions
│   │   └── server.ts              # Entry Point & Express Application Setup
│   ├── .env.example
│   └── package.json
├── package.json                    # Monorepo root script runner
└── README.md                       # Master Documentation
```

---

## 🧮 Algorithmic Priority Engine

CivicAI calculates an objective **Priority Score (0 - 100)** using five weighted components:

$$\text{Priority Score} = S_{\text{severity}} + S_{\text{reports}} + S_{\text{age}} + S_{\text{location}} + S_{\text{confidence}}$$

| Factor | Weight | Maximum Score | Description |
| :--- | :---: | :---: | :--- |
| **Defect Severity** | 40% | 40 pts | `CRITICAL` (40 pts), `HIGH` (30 pts), `MEDIUM` (20 pts), `LOW` (15 pts) |
| **Citizen Reports** | 20% | 20 pts | Scaled at $1.5 \times \text{reports count}$, capped at 20 points |
| **Issue Age** | 15% | 15 pts | Scaled at $0.65 \times \text{unresolved days}$, capped at 15 points |
| **Location Importance** | 15% | 15 pts | High-traffic arterial roads (15 pts) vs low-traffic lanes (8 pts) |
| **AI Confidence** | 10% | 10 pts | Direct multiplier of Gemini vision model confidence rating |

### Classification Tiers
- **CRITICAL** ($\ge 90$ pts): Immediate dispatch within 6 hours.
- **HIGH** ($75 - 89$ pts): Priority repair within 24–48 hours.
- **MEDIUM** ($50 - 74$ pts): Scheduled municipal queue.
- **LOW** ($< 50$ pts): Routine maintenance schedule.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Abhinav1574k/CivicAI-AI-Powered-Public-Infrastructure-Monitoring-System.git
   cd CivicAI-AI-Powered-Public-Infrastructure-Monitoring-System
   ```

2. **Install All Dependencies:**
   ```bash
   # Install root dependencies
   npm install

   # Install server dependencies
   npm install --prefix server

   # Install client dependencies
   npm install --prefix client
   ```

### Environment Configuration

1. Create a `.env` file inside the `server/` directory:
   ```bash
   cp server/.env.example server/.env
   ```

2. Edit `server/.env` with your Google Gemini API key:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   PORT=5000
   ```

> 💡 **Note:** If `GEMINI_API_KEY` is not provided, CivicAI automatically switches to **AI Demo Mode**, generating realistic fallback computer vision responses.

### Running the Monorepo

Start both the backend server and frontend client simultaneously with a single root command:

```bash
npm run dev
```

- **Frontend Application:** Access at `http://localhost:5173`
- **Backend API:** Running at `http://localhost:5000/api`
- **Health Check:** `http://localhost:5000/health`

#### Individual Service Scripts

If you wish to run services individually:

```bash
# Backend server only (watches typescript changes)
npm run dev:server

# Frontend client only
npm run dev:client

# Production build for both client & server
npm run build
```

---

## 📡 API Reference

### Health Check

```http
GET /health
```
**Response:**
```json
{
  "status": "online",
  "service": "CivicAI Infrastructure Engine",
  "geminiConfigured": true,
  "timestamp": "2026-10-06T19:40:00.000Z"
}
```

---

### Issues Endpoints

#### 1. List All Issues
```http
GET /api/issues
```
- **Query Parameters:** `type` (string), `severity` (string), `status` (string)
- **Returns:** Array of issues sorted descending by `priorityScore`.

#### 2. Get Issue Details
```http
GET /api/issues/:id
```
- **Returns:** Single issue object matched by unique ID (e.g., `CIV-1001`).

#### 3. Analyze Image with Gemini Vision
```http
POST /api/analyze
```
- **Body:** `multipart/form-data` with `image` file field.
- **Returns:**
  ```json
  {
    "success": true,
    "data": {
      "issueType": "Pothole",
      "confidence": 0.94,
      "severity": "HIGH",
      "description": "Asphalt surface disintegration with sub-base depression (~80cm width).",
      "department": "Public Works Department (PWD)",
      "recommendedAction": "Immediate hot-mix asphalt patching and structural compaction.",
      "riskFactors": [
        "High collision risk for two-wheelers",
        "Accelerated moisture penetration"
      ],
      "riskScore": 87,
      "isDemoMode": false
    }
  }
  ```

#### 4. Submit New Citizen Report
```http
POST /api/issues
Content-Type: application/json
```
- **Body:** `{ type, latitude, longitude, locationName, severity, confidence, department, description, recommendedAction, riskFactors, image }`

#### 5. Update Issue Status & Repair Verification
```http
PATCH /api/issues/:id/status
Content-Type: application/json
```
- **Body:** `{ status: "RESOLVED", afterImage: "data:image/jpeg;base64,..." }`

#### 6. Get Municipal Dashboard Statistics
```http
GET /api/dashboard/stats
```
- **Returns:** Comprehensive KPI breakdown, sector health scores, and charts data.

---

## 🤖 AI Vision & Demo Mode

CivicAI is built to work out of the box with zero setup friction:

- **With API Key:** Connects to `gemini-1.5-flash` model for live inference on uploaded defect photographs.
- **Without API Key (Demo Mode):** Activates fallback inspection engine providing deterministic multi-category analysis, making it ideal for offline testing, code reviews, and presentations.

---

## 🤝 Contributing

Contributions are warmly welcomed, especially during **Hacktoberfest**!

1. **Fork** the Repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please review open issues or create a new issue before starting work on major features.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it for open source or commercial applications.
