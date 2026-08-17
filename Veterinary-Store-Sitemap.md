# Website Sitemap — Veterinary Pharmacy & Livestock Supplies E-commerce
**Reference model:** alza3faran.com structure, adapted for your client
**Market:** Oman (primary), delivery across the Middle East
**Languages:** Arabic (RTL) + English (LTR)
**Currencies:** OMR (Oman Riyal) / AED (UAE Dirham)
**Stack:** Custom code — React/Vite frontend + Node/Express backend

> **Note on branding:** I've used "Al Namoos Veterinary Store" as a placeholder brand name (from your Instagram handle `alnamoos.c`). Confirm the exact business/store name with your client before development — it appears on every page (header, footer, invoices, meta titles).

---

## 1. Global Elements (appear on every page)

### Header
| Element | Detail |
|---|---|
| Logo | Client to supply (links to Home) |
| Top utility bar | Phone/WhatsApp numbers, Email, "Consult a Doctor" quick link |
| Language switcher | EN / AR (auto-flips full layout to RTL in Arabic) |
| Currency switcher | OMR / AED (display conversion; does not change payment gateway) |
| Search bar | Product search by name/animal/category |
| Account icon | Login / Register / My Account |
| Cart icon | Live item count + mini-cart preview |
| Category mega-menu | Camel / Horse / Cow → each expands into Medicine / Supplements / Feed / Equipment |

### Floating Elements
- WhatsApp chat bubble (bottom-right) → primary number **+968 9526 6144**
- "Ask a Doctor" floating/sticky button on mobile

### Footer
| Column | Content |
|---|---|
| About | Short brand blurb, Instagram icon link |
| Quick Links | Home, Shop, About, Contact, Consultation, Delivery Policy, Terms, Privacy |
| Categories | Camel, Horse, Cow (+ room to add Sheep/Goat, Poultry later) |
| Contact | 2 addresses (from Google Maps links), phone numbers, WhatsApp numbers, email |
| Payment icons | Apple Pay, Bank Transfer (ADIB, Bank Muscat) |
| Bottom bar | Copyright, EN/AR toggle repeated |

---

## 2. Full Page Tree

```
Home
│
├── Shop (All Products)
│   ├── Camel
│   │   ├── Medicine
│   │   ├── Supplements
│   │   ├── Feed
│   │   └── Equipment
│   ├── Horse
│   │   ├── Medicine
│   │   ├── Supplements
│   │   ├── Feed
│   │   └── Equipment
│   └── Cow
│       ├── Medicine
│       ├── Supplements
│       ├── Feed
│       └── Equipment
│
├── Product Detail Page (template — reused per product)
│
├── Cart
├── Checkout
│   ├── Delivery details (Oman / GCC address form)
│   ├── Payment method (Apple Pay / Bank Transfer / Card* )
│   └── Order confirmation page
│
├── My Account
│   ├── Order History / Order Tracking
│   ├── Saved Addresses
│   ├── Wishlist
│   └── Profile & Password
│
├── Consultation ("Ask a Doctor")
│   └── WhatsApp / Call button → +968 9469 4666 & +968 7964 4471
│
├── About Us
│
├── Contact Us
│   ├── Map embed 1 (location link 1)
│   ├── Map embed 2 (location link 2)
│   ├── Phone & WhatsApp numbers
│   └── Contact form
│
├── Delivery & Shipping Policy (GCC-wide delivery info)
├── Terms & Conditions
├── Privacy Policy
└── 404 / Not Found
```

---

## 3. Admin Panel (backend — for client's staff)

| Section | Function |
|---|---|
| Dashboard | Orders overview, sales snapshot |
| Products | Add/edit/delete, assign animal + product type, EN/AR fields, image upload, dummy-description placeholder flag |
| Categories | Manage Camel/Horse/Cow and their sub-types |
| Orders | View, update status, mark paid (manual for bank transfer/Apple Pay) |
| Customers | View customer list & order history |
| Content | Homepage banners, promo strip (e.g. the "-22%" badge style seen on the reference site) |
| Settings | Contact numbers, WhatsApp numbers, email, map links, currency rates (manual OMR↔AED) |

---

## 4. Business Information to Wire In

**WhatsApp numbers**
- +968 9526 6144 (primary — use on floating button)
- +968 9951 9155
- +971 56 297 3007

**Consultation ("Ask a Doctor") numbers** — kept separate from sales WhatsApp
- +968 9469 4666
- +968 7964 4471

**Email**
- ysalhajri20006@gmail.com (in use now)
- *Recommend* client eventually set up `sales@` / `support@` on their own domain for a more professional look — noted as a suggestion, not a requirement.

**Social**
- Instagram: instagram.com/alnamoos.c

**Locations** (2 branches — embed both pins + provide address text once client confirms)
- Map link 1
- Map link 2

**Delivery:** Across the Middle East
**Currency display:** OMR / AED
**Payment methods currently confirmed:**
- Apple Pay (+968 9526 6144)
- Bank transfer — ADIB: `28966881`
- Bank transfer — Bank Muscat: `0412004099970014`

> ⚠️ **Flag for client:** No card payment gateway (Visa/Mastercard) is listed yet. Manual bank-transfer reconciliation works at low order volume but becomes a bottleneck as orders grow. Worth suggesting a local gateway (e.g. Thawani, PayTabs, or Telr — all support OMR/AED) before/soon after launch. This is a recommendation, not something I've assumed you want built yet.

---

## 5. Content Notes

- **Product images + dummy descriptions** will be added at build time so the site is demo-ready; client replaces with final copy later.
- All product, category, and page text needs an **EN and AR version** — plan the CMS fields as paired fields (`name_en` / `name_ar`, `desc_en` / `desc_ar`, etc.) from day one so nothing needs restructuring later.
- Category structure (Animal → Product type) mirrors how a livestock owner actually searches: "I have a camel, I need medicine" — not "I need medicine, which animal."

---

## 6. Open Questions for the Client

1. Confirm final store/brand name and logo.
2. Confirm the 2 branch addresses (text, not just map pins).
3. Should Sheep/Goat and Poultry categories be added now (products in your photos included Biosal for cattle/horses/sheep/goats/poultry) or held for phase 2?
4. Any minimum order value or delivery fee structure per country (Oman vs UAE vs rest of GCC)?
5. Prescription-only products (e.g. steroid injections) — do these need an age/vet-verification gate, or open sale?
