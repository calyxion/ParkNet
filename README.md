# ParkNet 🅿️

> Modern Real-Time Smart Parking Reservation & Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

ParkNet is a full-stack, software-driven smart parking reservation and management platform. It enables commuters to discover nearby parking facilities, inspect digital multi-floor slot availability in real time, reserve slots with temporary hold locking, execute payments, and generate QR-based digital parking passes—without requiring expensive physical IoT sensors.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Configuration & Environment](#configuration--environment)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Overview](#api-overview)
- [Building for Production](#building-for-production)
- [Releases](#releases)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Finding parking in congested urban centers often involves manual searches, lack of visibility into spot availability, paper tickets, and uncertain pricing. ParkNet replaces this with a digital reservation pipeline:

```text
  DISCOVER  ──►  INSPECT AVAILABILITY  ──►  HOLD SLOT  ──►  PAY  ──►  QR PASS  ──►  CHECK-IN
```

The system provides dedicated workflows for three primary user roles:
- **Commuters:** Search parking locations, browse interactive multi-level floor plans, lock slots temporarily, pay via Razorpay or simulated gateway, receive verifiable QR passes, and access an AI chat assistant.
- **Parking Operators / Owners:** Monitor live occupancy across floors, verify digital passes, track vehicle entries, manage hourly rates, and review revenue metrics.
- **Administrators:** Platform-wide monitoring of parking facilities, bookings, transactions, and system configuration.

---

## Key Features

### Implemented Functionality

1. **Interactive Multi-Level Slot Visualization**
   - Real-time grid rendering across 6 levels (Basement 2, Basement 1, Ground Floor, Levels 1–3).
   - Categorized spot types: Standard, EV Charging, Accessible, and Premium.
   - Distinct vehicle classification: Car, Bike, SUV, Truck, and EV Car with semantic badges.

2. **Temporary Slot Holding & Concurrency Control**
   - 60-second atomic slot locking via `SlotHold` to prevent double-booking collisions while users complete payment.
   - Background automated release of expired holds using scheduled cron routines.

3. **Digital QR Code Parking Passes**
   - Instant cryptographic QR code and token generation upon booking confirmation.
   - Operator-facing verification endpoint to validate check-in and check-out.

4. **Dynamic Pricing Engine**
   - Automated rate adjustments based on floor level, weekend surcharges, and peak-hour demand.

5. **Waitlist Queue Management**
   - FIFO queueing system when parking lots or preferred levels reach capacity, alerting commuters when spots clear.

6. **Peer-to-Peer (P2P) Spot Sharing**
   - Marketplace module allowing private parking owners to list unused personal driveways or slots for rent with user reviews.

7. **AI Parking Assistant Widget**
   - Integrated AI assistant powered by NVIDIA NIM / OpenAI function calling to assist commuters with slot recommendations, rate calculation, and parking navigation.

8. **Real-Time Sockets & Status Updates**
   - Socket.IO integration broadcasting immediate slot state changes and check-in updates across connected clients.

---

## System Architecture

```text
┌────────────────────────────────────────────────────────┐
│                   Frontend (React 19)                  │
│       Vite • Modular Design Tokens • Socket.IO Client  │
└───────────────────────────┬────────────────────────────┘
                            │ REST / WebSocket
                            ▼
┌────────────────────────────────────────────────────────┐
│                  Backend (Express.js)                  │
│   Auth • Bookings • Slots • QR • P2P • Cron • AI NIM   │
└─────────────┬──────────────────────────────┬───────────┘
              │                              │
              ▼                              ▼
      ┌───────────────┐              ┌───────────────┐
      │    MongoDB    │              │   Razorpay    │
      │   (Mongoose)  │              │  (Or Mocked)  │
      └───────────────┘              └───────────────┘
```

---

## Tech Stack

### Frontend
- **Framework:** React 19 (`react`, `react-dom`)
- **Build Tool:** Vite 8
- **Real-Time Client:** Socket.IO Client 4.8
- **QR Pass Generator:** `qrcode.react`
- **Linting & Code Quality:** ESLint 9 (`@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)
- **Styling:** Custom dark-mode design system with scoped component tokens

### Backend
- **Runtime:** Node.js (Express 5)
- **Database:** MongoDB via Mongoose 9
- **Security:** Helmet, CORS, Express-Rate-Limit, bcrypt, JSON Web Tokens (`jsonwebtoken`)
- **Validation:** Zod 4
- **Real-Time:** Socket.IO 4.8
- **Scheduled Tasks:** Node-Cron 4.6
- **QR Generation:** Node `qrcode`
- **Payments:** Razorpay Node SDK 2.9 (with graceful mock mode fallback)
- **AI Integrations:** OpenAI SDK / NVIDIA NIM API client

---

## Project Structure

```text
ParkNet/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration (db.js)
│   │   ├── controllers/     # Route logic (auth, booking, chat, p2p, parking, payment, pricing, qr, slot, waitlist)
│   │   ├── jobs/            # Scheduled cron tasks (expired hold clearance)
│   │   ├── middleware/      # Authentication & validation middleware
│   │   ├── models/          # Mongoose models (User, Booking, Parking, ParkingSlot, SlotHold, etc.)
│   │   ├── routes/          # Express route definitions
│   │   ├── services/        # AI tool bindings (NIM/OpenAI), pricing & availability engines
│   │   └── sockets/         # Socket.IO connection & event handlers
│   ├── .env.example         # Template environment configuration
│   ├── package.json         # Backend dependencies & scripts
│   └── server.js            # Express & HTTP server entrypoint
├── frontend/
│   ├── public/              # Static SVG icons and favicon
│   ├── src/
│   │   ├── assets/          # Project visual assets (hero.png)
│   │   ├── design/          # Design system components, tokens, and layouts
│   │   ├── styles/          # Global styles (globals.css)
│   │   ├── api.js           # API client and backend service connector
│   │   ├── App.jsx          # Primary parking application workspace
│   │   ├── ChatWidget.jsx   # AI assistant interactive floating widget
│   │   ├── firebase.js      # Optional Firebase client configuration
│   │   ├── index.css        # Base stylesheet
│   │   └── main.jsx         # React application root entrypoint
│   ├── .env.example         # Template frontend environment configuration
│   ├── eslint.config.js     # ESLint configuration
│   ├── package.json         # Frontend dependencies & scripts
│   ├── vercel.json          # Deployment routing configuration
│   └── vite.config.js       # Vite build configuration
├── docs/                    # Architectural specs, API documentation & roadmaps
├── .gitignore               # Root git ignore specification
├── LICENSE                  # MIT License
└── README.md                # Project documentation
```

---

## Prerequisites

- **Node.js:** v18.0.0 or later (v20+ recommended)
- **npm:** v9.0.0 or later
- **MongoDB:** A locally running MongoDB instance (`mongodb://127.0.0.1:27017/parkslot`) or a MongoDB Atlas URI

---

## Configuration & Environment

### 1. Backend (`backend/.env`)

Copy the example file and configure variables:

```bash
cp backend/.env.example backend/.env
```

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | HTTP server listening port | `5000` |
| `NODE_ENV` | Runtime mode | `development` |
| `MONGO_URI` | MongoDB connection connection string | `mongodb://127.0.0.1:27017/parkslot` |
| `JWT_SECRET` | Secret key used to sign authentication tokens | `your_jwt_secret_here` |
| `JWT_EXPIRES_IN` | Token expiration period | `30d` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:5173` |
| `NVIDIA_API_KEY` | NVIDIA NIM API key for AI assistant (Optional) | `your_nvidia_api_key_here` |
| `NVIDIA_MODEL` | AI model identifier | `meta/llama-3.1-70b-instruct` |
| `RAZORPAY_KEY_ID` | Razorpay Key ID (Optional; mock used if omitted) | `your_razorpay_key_id` |
| `RAZORPAY_KEY_SECRET`| Razorpay Secret Key | `your_razorpay_key_secret` |

### 2. Frontend (`frontend/.env`)

Copy the example file:

```bash
cp frontend/.env.example frontend/.env
```

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `VITE_BACKEND_URL` | Backend API base address | `http://localhost:5000` (or empty for relative proxy) |

---

## Installation & Setup

Clone the repository and install dependencies for both the backend and frontend:

```bash
# 1. Install Backend Dependencies
cd backend
npm install

# 2. Install Frontend Dependencies
cd ../frontend
npm install
```

---

## Running the Application

### Start Backend Development Server

```bash
cd backend
npm run dev
# Or start in standard mode:
npm start
```
The backend API initializes on `http://localhost:5000` (or configured `PORT`).

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```
The Vite development server runs on `http://localhost:5173`.

---

## API Overview

The backend exposes RESTful endpoints mounted under `/api/v1`:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/health` | GET | Service health check |
| `/api/v1/auth/register` | POST | Register commuter or parking owner account |
| `/api/v1/auth/login` | POST | Authenticate and obtain JWT bearer token |
| `/api/v1/parking` | GET, POST | Query nearby parking facilities or register facility |
| `/api/v1/slots/hold` | POST | Place 60-second concurrency lock on a parking slot |
| `/api/v1/slots/release` | POST | Manually release active slot hold |
| `/api/v1/bookings` | GET, POST | Retrieve booking history or create new reservation |
| `/api/v1/qr/generate` | POST | Generate verifiable QR pass token for valid booking |
| `/api/v1/qr/verify` | POST | Verify QR pass token at parking gate |
| `/api/v1/payments/order`| POST | Initiate Razorpay order (or trigger simulated payment) |
| `/api/v1/waitlist/join` | POST | Queue in waitlist when facility is full |
| `/api/v1/p2p` | GET, POST | Browse peer-to-peer parking listings or list spot |
| `/api/v1/chat` | POST | Send prompt to AI assistant with function calling tools |

*Detailed API schemas, parameters, and payloads are documented in [`docs/API.md`](./docs/API.md).*

---

## Building for Production

To create a production-ready frontend bundle:

```bash
cd frontend
npm run build
```

The compiled static assets will be located in `frontend/dist/`. You can preview the production bundle locally with:

```bash
cd frontend
npm run preview
```

---

## Releases

Official builds and distribution artifacts are published under [GitHub Releases](https://github.com/calyxion/ParkNet/releases).
Each release includes:
- Compiled static frontend distribution bundle (`parknet-frontend-vX.Y.Z.tar.gz`)
- Cryptographic SHA-256 checksums (`checksums.txt`)

---

## Limitations

- **Software-Based Occupancy:** The platform operates using digital slot locking and check-in pass validation rather than hardware camera feeds or physical ultrasonic barrier sensors.
- **Payment Gateway:** If Razorpay credentials are not provided in the environment, the system utilizes simulated payment approvals for testing and demonstration workflows.

---

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
