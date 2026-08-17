# Al Namoos Veterinary Store & Pharmacy — Complete E-Commerce Platform

A production-ready bilingual (Arabic / English) e-commerce web application and administration portal built for **Al Namoos Veterinary Store & Pharmacy** in Oman, serving livestock owners across the GCC (Oman, UAE, KSA, Qatar, Kuwait, Bahrain).

---

## 🌟 Architecture & Technology Stack

- **Frontend**: React 18, Vite, React Router DOM v6, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express.js REST API with abstract Repository pattern.
- **Data Persistence**: File-backed JSON store (`server/data/*.json`) utilizing an abstract `BaseRepository` interface — structured for seamless migration to MongoDB / PostgreSQL without touching frontend API contracts.
- **Design System**:
  - **Color Palette**: Warm Sand (`#F6F1E7`), Deep Oasis Charcoal (`#16302B`), Desert Clay (`#B85C2E`), Oasis Teal (`#2E6F63`), Old Gold (`#B8862E`), Warm White (`#FFFDF9`).
  - **Typography**: `Cairo` (Headings EN+AR), `IBM Plex Sans Arabic` (Body EN+AR), `IBM Plex Mono` (Prices, SKUs, and dosage specs).
  - **Signature Element**: Single-line vector animal petroglyphs (Camel, Horse, Cow, Sheep, Poultry) in soft sand-teal circular badges.
- **Bilingual & RTL Engine**: Session-persistent language switcher (`en` / `ar`) with full mirrored layout flipping (`dir="rtl"` / `dir="ltr"`).
- **Dual Currency Engine**: Manual conversion toggle (`OMR` / `AED`) using editable exchange rate in settings.

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js (v18+) & npm

### 1. Start Express Backend
```bash
cd server
npm install
npm run dev
# Running on http://localhost:5000 (or http://localhost:5001 fallback)
```

### 2. Start React Frontend
```bash
cd client
npm install
npm run dev
# Running on http://localhost:3000
```

---

## 🔐 Admin Panel Guide

Access the internal admin portal at **`http://localhost:3000/admin`**.

- **Username**: `admin`
- **Password**: `alnamoos2026`

### Admin Features
1. **Dashboard Overview**: Total revenue in OMR, pending orders count, live order feed.
2. **Products Manager (CRUD)**: Create, edit, and delete items with paired bilingual fields (`name_en`/`name_ar`, `desc_en`/`desc_ar`, `dosage_en`/`dosage_ar`), species category (`camel`/`horse`/`cow`), product type (`medicine`/`supplements`/`feed`/`equipment`), OMR/AED pricing, and stock status.
3. **Orders Manager**: Track customer details, view ordered items, and update order progress (`Pending` → `Processing` → `Shipped` → `Delivered`).
4. **Settings & FX Manager**: Update store contact numbers, primary sales WhatsApp line, doctor consultation numbers, branch locations, and manual `OMR ↔ AED` exchange rate.

---

## ⚙️ Client & Developer Handover Manual

### 1. How to Add or Edit a Product
- Log in to the Admin Panel at `/admin` → Click **Products Catalog (CRUD)** → Click **Add New Product**.
- Fill in the required English & Arabic title and description fields, select species (`camel`, `horse`, or `cow`) and product type (`medicine`, `supplements`, `feed`, or `equipment`), specify prices, and save.
- **Placeholder Flag**: Each sample product contains an `is_placeholder: true` field to flag demo content for replacement before production launch.

### 2. How to Update Contact Numbers, WhatsApp, & Branch Map Links
- Go to `/admin` → Click **Store Settings & Rates**.
- Modify `Primary Sales WhatsApp Number` (+968 9526 6144), `Doctor Consultation Lines` (+968 9469 4666 / +968 7964 4471), or email.
- To update physical branch addresses or Google Maps iframe embeds, edit `server/data/settings.json`.

### 3. How to Change the OMR ↔ AED Exchange Rate
- Go to `/admin` → Click **Store Settings & Rates**.
- Update the **Manual Currency Conversion Rate** (Default: `1 OMR = 9.55 AED`). The frontend instantly updates prices dynamically across the site.

### 4. How to Swap the JSON Data Store for a Database (MongoDB / PostgreSQL)
The backend architecture uses an abstract repository design:
1. Open `server/repositories/baseRepository.js`.
2. Create a new class, e.g., `MongoRepository.js` or `PostgresRepository.js`, extending `BaseRepository`.
3. In `server/routes/api.js`, replace:
   ```javascript
   // const productRepo = new JsonRepository(path.join(dataDir, 'products.json'));
   const productRepo = new MongoRepository('ProductModel');
   ```
No frontend API call, React component, or state logic needs to be rewritten.

### 5. Integrating a Real Payment Gateway (Visa / Mastercard)
Currently, checkout supports **Apple Pay** simulation and **Direct Bank Transfer** with manual reconciliation:
- **ADIB Account**: `28966881`
- **Bank Muscat Account**: `0412004099970014`

**Gateway Extension Point**:
To connect a regional card payment gateway (such as **Thawani**, **PayTabs**, or **Telr**):
1. Open `client/src/pages/Checkout.jsx`.
2. In `handleSubmitOrder`, replace the payload redirect with the gateway API initiation endpoint call.
3. Handle payment webhooks in `server/routes/api.js` under `POST /api/payments/webhook` to auto-verify order status.

---

## 🌐 Deployment Instructions

### Frontend (Vercel)
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`
- The included `client/vercel.json` automatically configures SPA routing rewrites and API proxies.

### Backend (Render)
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- The included `server/render.yaml` specifies Render Web Service settings for Node.js production.
