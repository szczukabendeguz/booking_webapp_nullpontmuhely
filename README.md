# Nullpont Műhely - Rágcsálóirtás | Event Booking System

> [!IMPORTANT]
> **DEMO MODE:** This project is currently in a **Static Demo Mode** for archival and presentation purposes. 
> - The backend is mocked using `localStorage` (all data stays in your browser).
> - Real emails are **not** sent.
> - The site is hosted as a static export (GitHub Pages).

---


## 🇬🇧 English

### 📖 Project Description

This is the official website and ticketing system for **Nullpont Műhely's "Rágcsálóirtás"** (Rodent Control) workshop/event. The application provides a modern, user-friendly interface for attendees to book tickets with real-time capacity management, automated email confirmations, and an admin dashboard for managing reservations.

**Key Features:**
- 🎟️ Real-time ticket booking with capacity validation (max 60 attendees per event)
- 📧 Automated email confirmations via Resend API
- 🔒 Admin dashboard for reservation management
- 📱 Responsive design with Bootstrap 5
- 💾 File-based JSON storage for simplicity and reliability

### 🌐 Live Demo

**Visit the live application:** [https://nullpontmuhely.hu](https://nullpontmuhely.hu)

### 🛠️ Tech Stack

This is a **fullstack application** built with modern web technologies, combining frontend presentation and backend logic within the Next.js framework.

**Frontend:**

[![Frontend](https://skillicons.dev/icons?i=nextjs,react,ts,bootstrap,sass,html,css)](https://skillicons.dev)

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: Bootstrap 5 & React Bootstrap
- **Styling**: SCSS (Sass) with modular architecture
- **3D Graphics**: Spline (@splinetool/react-spline)

**Backend:**

[![Backend](https://skillicons.dev/icons?i=nodejs,nextjs)](https://skillicons.dev)

- **Runtime**: Node.js (Next.js API Routes)
- **Data Storage**: JSON-based file system (NoSQL-like, server-side `fs` operations)
- **Email Service**: Resend API
- **Email Templates**: React Email

### 🚀 Getting Started

#### Prerequisites

- Node.js (v18 or higher)
- npm

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
# Resend API key for sending emails (required for email functionality)
RESEND_API_KEY=re_123456789...

# Optional: Admin password for dashboard access
ADMIN_PASSWORD=your_secure_password
```

#### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

#### 4. Build for Production

```bash
npm run build
npm run start
```

### 📊 Data Structure

Reservations are stored in `data/reservations.json` with the following structure:

```json
{
  "2026-02-21": [
    {
      "id": "uuid-v4",
      "name": "John Doe",
      "email": "john@example.com",
      "count": 2,
      "timestamp": "2026-01-28T10:00:00.000Z"
    }
  ]
}
```

**Schema Explanation:**
- **Date Key** (e.g., `"2026-02-21"`): Event date in ISO format
- **id**: Unique identifier (UUID v4)
- **name**: Attendee's full name
- **email**: Contact email for confirmation
- **count**: Number of tickets booked
- **timestamp**: Booking creation time (ISO 8601)

### 🔄 How It Works

#### Booking Flow

1. **Request**: User fills out the booking form, sending a `POST` request to `/api/book`
2. **Validation**: Server validates input data (date, name, email, ticket count)
3. **Capacity Check**:
   - System reads current reservations
   - Calculates total tickets sold for the requested date
   - Rejects request if new booking would exceed 60 attendees
   - Returns available seats if capacity exceeded
4. **Persistence**: On successful validation, new reservation is added to JSON structure and file is updated
5. **Email Confirmation**: Resend API sends confirmation email using React Email template

#### Email System

- **Provider**: [Resend](https://resend.com)
- **Integration**: `resend` npm package within Next.js API routes
- **Templates**: Emails designed as React components (`EmailTemplate`) for consistency
- **Error Handling**: Asynchronous error handling ensures booking succeeds even if email service is temporarily unavailable

### 📁 Project Structure

```
booking_webapp_nullpontmuhely/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin dashboard
│   │   ├── api/            # API routes (booking, email)
│   │   ├── components/     # React components
│   │   ├── lib/            # Utility functions
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   └── middleware.ts       # Next.js middleware
├── public/                 # Static assets
├── data/                   # JSON data storage
└── package.json
```

---

## 🇭🇺 Magyar

> [!IMPORTANT]
> **DEMO MÓD:** Ez a projekt jelenleg **Statikus Demó Módban** működik archiválási és prezentációs célokból.
> - A backend szimulált, az adatok a böngésző `localStorage`-ában tárolódnak.
> - Valódi visszaigazoló emaileket a rendszer **nem** küld.
> - Az oldal statikus exportként (GitHub Pages) üzemel.

---

### 📖 Projekt Leírás

Ez a **Nullpont Műhely "Rágcsálóirtás"** című előadásának/eseményének hivatalos weboldala és jegyfoglalási rendszere. Az alkalmazás modern, felhasználóbarát felületet biztosít a résztvevők számára jegyfoglaláshoz, valós idejű kapacitáskezeléssel, automatikus email visszaigazolással és admin dashboard-dal a foglalások kezeléséhez.

**Főbb Funkciók:**
- 🎟️ Valós idejű jegyfoglalás kapacitás validációval (max. 60 fő eseményenként)
- 📧 Automatikus email visszaigazolás Resend API-n keresztül
- 🔒 Admin dashboard a foglalások kezeléséhez
- 📱 Reszponzív design Bootstrap 5-tel
- 🎨 Interaktív 3D animációk Spline használatával
- 💾 Fájl-alapú JSON tárolás az egyszerűség és megbízhatóság érdekében

### 🌐 Live Demo

**Látogasd meg az élő alkalmazást:** [https://nullpontmuhely.hu](https://nullpontmuhely.hu)

### 🛠️ Technológiai Stack

Ez egy **fullstack alkalmazás**, amely modern webes technológiákra épül, szétválasztva a frontend megjelenítést és a backend logikát a Next.js keretrendszeren belül.

**Frontend:**

[![Frontend](https://skillicons.dev/icons?i=nextjs,react,ts,bootstrap,sass,html,css)](https://skillicons.dev)

- **Framework**: Next.js 16 (App Router)
- **Nyelv**: TypeScript
- **UI Könyvtár**: Bootstrap 5 & React Bootstrap
- **Stílus**: SCSS (Sass) moduláris felépítésben

**Backend:**

[![Backend](https://skillicons.dev/icons?i=nodejs,nextjs)](https://skillicons.dev)

- **Runtime**: Node.js (Next.js API Routes)
- **Adattárolás**: JSON alapú fájlrendszer (NoSQL-szerű, szerver-oldali `fs` műveletekkel)
- **Email Küldés**: Resend API
- **Email Template-ek**: React Email

### 🚀 Telepítés és Futtatás

#### Előfeltételek

- Node.js (v18 vagy újabb)
- npm

#### 1. Függőségek Telepítése

```bash
npm install
```

#### 2. Környezeti Változók Beállítása

Hozz létre egy `.env.local` fájlt a projekt gyökerében:

```env
# Resend API kulcs az emailek küldéséhez (kötelező az email funkcióhoz)
RESEND_API_KEY=re_123456789...

# Opcionális: Admin jelszó a dashboard eléréséhez
ADMIN_PASSWORD=sajat_titkos_jelszo
```

#### 3. Fejlesztői Szerver Indítása

```bash
npm run dev
```

A weboldal elérhető lesz a `http://localhost:3000` címen.

#### 4. Build (Élesítéshez)

```bash
npm run build
npm run start
```

### 📊 Adatszerkezet

A foglalások a `data/reservations.json` fájlban tárolódnak az alábbi struktúrában:

```json
{
  "2026-02-21": [
    {
      "id": "uuid-v4",
      "name": "Teszt Elek",
      "email": "teszt@example.com",
      "count": 2,
      "timestamp": "2026-01-28T10:00:00.000Z"
    }
  ]
}
```

**Séma Magyarázat:**
- **Dátum Kulcs** (pl. `"2026-02-21"`): Esemény dátuma ISO formátumban
- **id**: Egyedi azonosító (UUID v4)
- **name**: Résztvevő teljes neve
- **email**: Kapcsolattartási email cím a visszaigazoláshoz
- **count**: Foglalt jegyek száma
- **timestamp**: Foglalás létrehozásának időpontja (ISO 8601)

### 🔄 Rendszer Működése Részletesen

#### Jegyfoglalás Menete

1. **Kérés**: A felhasználó kitölti az űrlapot, ami egy `POST` kérést küld a `/api/book` endpoint-ra
2. **Validáció**: A szerver ellenőrzi a bemeneti adatokat (dátum, név, email, jegyek száma)
3. **Kapacitás Ellenőrzés**:
   - A rendszer beolvassa az aktuális foglalásokat
   - Összegzi az adott dátumra már eladott jegyeket
   - Ha az új igénnyel együtt meghaladná a 60 főt, a kérést elutasítja
   - Visszaküldi a még elérhető helyek számát, ha túllépés történt
4. **Perzisztencia**: Sikeres ellenőrzés esetén az új foglalás hozzáadódik a JSON struktúrához és a fájl frissül
5. **Email Visszaigazolás**: A Resend API visszaigazoló emailt küld React Email template használatával

#### Email Rendszer

- **Szolgáltató**: [Resend](https://resend.com)
- **Integráció**: `resend` npm csomag Next.js API route-okon belül
- **Template-ek**: Az emailek React komponensként vannak definiálva (`EmailTemplate`) a konzisztencia érdekében
- **Hibakezelés**: Aszinkron hibakezelés biztosítja, hogy a foglalás akkor is sikeres legyen, ha az email szolgáltatás átmenetileg nem elérhető

### 📁 Projekt Struktúra

```
booking_webapp_nullpontmuhely/
├── src/
│   ├── app/
│   │   ├── admin/          # Admin dashboard
│   │   ├── api/            # API route-ok (foglalás, email)
│   │   ├── components/     # React komponensek
│   │   ├── lib/            # Segédfüggvények
│   │   ├── layout.tsx      # Gyökér layout
│   │   └── page.tsx        # Főoldal
│   └── middleware.ts       # Next.js middleware
├── public/                 # Statikus fájlok
├── data/                   # JSON adattárolás
└── package.json
```



