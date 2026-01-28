## Frissítés menete (Update)

Ha módosítasz a kódban (pl. új funkció, javítás), így tudod frissíteni az éles oldalt:

1. **Build készítése (Lokálisan)**
    Futtasd a szokásos parancsot a fejlesztői gépeden:

    ```bash
    npm run build
    ```

2. **Fájlok másolása (WinSCP/SCP)**
    Ugyanazokat a mappákat kell felülírnod a szerveren (`/var/www/nullpontmuhely`), mint telepítéskor. A célmappában lévő fájlokat írd felül!

    * Másold fel a **`.next/standalone`** mappa *teljes tartalmát* a szerver `/var/www/nullpontmuhely` mappájába. (Ez tartalmazza az új `server.js`-t is).
    * Másold fel a **`.next/static`** mappát a szerver `/var/www/nullpontmuhely/.next/static` helyre.
    * Másold fel a **`public`** mappát a szerver `/var/www/nullpontmuhely/public` helyre (csak ha változtak a képek vagy statikus fájlok).

3. **Szolgáltatás újraindítása (Szerveren)**
    Hogy az új kód érvénybe lépjen, újra kell indítani a futó alkalmazást SSH-n keresztül:

    ```bash
    sudo systemctl restart nullpontmuhely
    ```

**Egyéb esetek:**

* **Környezeti változó módosítása**: Ha csak a szerveren lévő `.env` fájlt írod át (vagy a service fájlban az Environment sorokat), nem kell újra buildelni, elég csak a **3. lépést (újraindítás)** megcsinálni.
