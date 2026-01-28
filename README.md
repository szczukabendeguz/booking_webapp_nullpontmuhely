# Nullpont Műhely - Rágcsálóirtás Weboldal

Ez a projekt a Nullpont Műhely "Rágcsálóirtás" című előadásának/eseményének hivatalos weboldala és jegyfoglalási rendszere.

**Élő megtekintés:** [nullpontmuhely.hu](https://nullpontmuhely.hu)

## Technológiai Stack

A projekt modern webes technológiákra épül, szétválasztva a frontend megjelenítést és a backend logikát a Next.js keretrendszeren belül.

### Frontend

A felhasználói felület, animációk és interakciók.

[![Frontend Skills](https://skillicons.dev/icons?i=nextjs,react,ts,bootstrap,sass,html,css)](https://skillicons.dev)

- **Framework**: Next.js 16 (App Router)
- **Nyelv**: TypeScript
- **UI Könyvtár**: Bootstrap 5 & React Bootstrap
- **Stílus**: SCSS (Sass) moduláris felépítésben

### Backend & Szolgáltatások

A szerver oldali logika, API végpontok és adatkezelés.

[![Backend Skills](https://skillicons.dev/icons?i=nodejs,nextjs)](https://skillicons.dev)

- **Runtime**: Node.js (Next.js API Routes)
- **Adattárolás**: JSON alapú fájlrendszer (NoSQL-szerű, szerver-oldali `fs` műveletekkel)
- **Email Küldés**: Resend API
- **Templating**: React Email

## Rendszer Működése Részletesen

### 1. Jegyfoglalás Menete

A foglalási rendszer egy egyszerű, de robusztus fájl-alapú adatbázist használ a `data/reservations.json` fájlban.

1. **Kérés**: A felhasználó kitölti az űrlapot, ami egy `POST` kérést küld a `/api/book` végpontra.
2. **Validáció**: A szerver ellenőrzi a bemeneti adatokat (dátum, név, email, jegyek száma).
3. **Kapacitás Ellenőrzés**:
   - A rendszer beolvassa az aktuális foglalásokat.
   - Összegzi az adott dátumra már eladott jegyeket.
   - Ha az új igénnyel együtt meghaladná a 60 főt, a kérést elutasítja és visszaküldi a még elérhető helyek számát.
4. **Perzisztencia**: Sikeres ellenőrzés esetén az új foglalás hozzáadódik a JSON struktúrához, és a rendszer felülírja a fájlt az új adatokkal (atomicity nincs garantálva nagy terhelésnél, de kis forgalomra optimalizált).

### 2. Email Küldés

Az email küldés szorosan integrálva van a foglalási folyamatba, de aszinkron módon kezeljük a hibákat, hogy a foglalás akkor is sikeres legyen, ha az email szolgáltató épp nem elérhető.

- **Szolgáltató**: [Resend](https://resend.com)
- **Technológia**: A `resend` npm csomagot használjuk a Next.js API route-on belül.
- **Sablon**: A levelek kinézetét React komponensként definiáljuk (`EmailTemplate`), így biztosítva, hogy a stílusok konziszensek és könnyen szerkeszthetők legyenek.
- **Folyamat**: Amint a foglalás sikeresen mentésre került a JSON adatbázisba, a rendszer meghívja a Resend API-t a megadott felhasználói email címmel és a foglalás részleteivel.

## Telepítés és Futtatás

### Előfeltételek

- Node.js (v18+)
- npm

### 1. Függőségek telepítése

```bash
npm install
```

### 2. Környezeti Változók beállítása

Hozz létre egy `.env.local` fájlt a projekt gyökerében:

```env
# Resend API kulcs az emailek küldéséhez (kötelező az email funkcióhoz)
RESEND_API_KEY=re_123456789...

# Opcionális: Admin jelszó
ADMIN_PASSWORD=sajat_titkos_jelszo
```

### 3. Fejlesztői szerver indítása

```bash
npm run dev
```

A weboldal elérhető lesz a `http://localhost:3000` címen.

### 4. Build (Élesítéshez)

```bash
npm run build
npm run start
```

## Adatszerkezet (`data/reservations.json`)

Az adatok dátum kulcsok alatt tárolt tömbökben helyezkednek el:

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
