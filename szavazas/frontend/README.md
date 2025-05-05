-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
# 📦 Szavazás Alkalmazás – Telepítési Útmutató

Ez a projekt egy teljes körű szavazóalkalmazás frontenddel, backenddel és MySQL adatbázissal. Az alábbi lépésekben bemutatjuk, hogyan tudod helyileg elindítani a rendszert.

---

## 🛠️ Előkészületek

### 1. Apache és MySQL elindítása

- Indítsd el az **Apache** és **MySQL** szervereket (például **XAMPP** segítségével).
- A MySQL szervernek a `localhost`-on kell futnia (alapértelmezett port: `3306`).

### 2. Adatbázis betöltése

1. Nyisd meg a böngészőben a **phpMyAdmin**-t:  
   `http://localhost/phpmyadmin`
2. Hozz létre egy új adatbázist például `vote` néven.
3. Importáld a `vote.sql` fájlt ebbe az adatbázisba.

---

## 🚀 Projekt indítása

### 1. Frontend elindítása

cd szavazas/frontend
npm install
npm start

### 2. backend elindítása

cd szavazas/backend
npm install
node server.js

-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------

# 📦 Szavazás Alkalmazás – Backend Tesztelés

A backend tesztjei Postman-ban futtathatók. Az alábbiakban bemutatjuk a lépéseket, hogy hogyan kell futtatni a backend API teszteket a **Postman** használatával.

---

## 🛠️ Előkészületek

### 1. Postman Extension Telepítése

Először is telepítened kell a **Postman** Visual Studio Code bővítményt.

### 2. Postman Bejelentkezés

1. Nyisd meg a **Postman** alkalmazást.
2. Ha még nincs Postman fiókod, regisztrálj, és jelentkezz be a Postman alkalmazásba.

---

## 🚀 Tesztfájl Importálása

A backend tesztjei a `postman-api-test.json` fájlban találhatók, és az alábbi lépésekkel futtathatók:

### 1. Importálás a Postman-ba

1. Nyisd meg a Postman alkalmazást.
2. Kattints a bal felső sarokban található **Import** gombra.
3. Válaszd ki a **File** opciót, és keresd meg a következő fájlt a projektben:  
   `szavazas/backend/tests/testjson/postman-api-test.json`
4. Kattints az **Open** gombra, majd az **Import** gombra a fájl importálásához.

---

## ▶️ Tesztek Futattása

Miután a tesztfájl importálva lett a Postman-ba, az alábbi lépésekkel tudod futtatni a teszteket:

### 1. Tesztek Futatása

1. Az importált fájlban található összes tesztet látnod kell a Postman alkalmazásban.
2. Kattints a **Send** gombra minden egyes teszt esetében, hogy lefuttasd őket.
3. A teszt eredményei az alsó ablakban jelennek meg, ahol láthatod a választ és a teszt státuszát (sikeres vagy hibás).

---

## ✅ Teszt Eredmények

Miután lefuttattad a teszteket, az eredményeket a Postman automatikusan megjeleníti. Ellenőrizd a válaszokat és a státuszkódokat (pl. 200, 404, 500), hogy megbizonyosodj a rendszer helyes működéséről.

---

## 📝 Megjegyzés

- Ha bármilyen hibát tapasztalsz, ellenőrizd, hogy a backend szerver fut-e, és hogy a megfelelő portokon elérhető-e az API.
- Az adatbázisnak be kell legyen töltve a szükséges tesztadatok, különben a tesztek hibát okozhatnak.

-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------

### Frontend Tesztelés Playwright-tal

Ez a projekt a **Playwright** tesztkeretrendszert használja a frontend automatizált teszteléséhez.

#### 1. Telepítés

A teszteléshez először telepíteni kell a **Playwright**-ot:

npm install -D @playwright/test
npx playwright install

Ez letölti a szükséges böngészőmotorokat (Chromium, Firefox, WebKit).

#### 2. Tesztek futtatása

A tesztek a **szavazas/frontend/tests** mappában találhatók. Fontos, hogy a **projekt gyökérkönyvtárában** állva futtasd az alábbi parancsot:

npx playwright test

Ez automatikusan lefuttatja az összes tesztet a `tests` mappán belül.

#### 3. Csak egy konkrét teszt futtatása

Ha csak egy adott tesztfájlt szeretnél futtatni:

npx playwright test szavazas/frontend/tests/nevtetsztes.spec.ts

#### 4. Tesztek UI-val (interaktív mód)

Interaktív felület megnyitása a tesztek futtatásához:

npx playwright test --ui

Ez megnyit egy interaktív felületet, ahol könnyen navigálhatsz a tesztek között és futtathatod őket.