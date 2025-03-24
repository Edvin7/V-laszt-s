const { test, expect } = require('@playwright/test');

test.describe('Navbar', () => {
  test('should redirect to home page on successful login', async ({ page }) => {
    // 1️⃣ Nyisd meg a bejelentkezési oldalt
    await page.goto('http://localhost:3000/login');
    
    // 2️⃣ Töltsd ki a bejelentkezési adatokat
    await page.fill('input[placeholder="Email cím"]', 'szalkai@gmail.com'); // E-mail
    await page.fill('input[placeholder="Jelszó"]', 'szalkai@gmail.com'); // Jelszó
  
    // 3️⃣ Kattints a bejelentkezés gombra
    await page.click('input[type="submit"][value="Bejelentkezés"]');
  
    // 4️⃣ Várj a sikeres bejelentkezésre és az URL változására
    await page.waitForURL('http://localhost:3000/');
    await expect(page.url()).toBe('http://localhost:3000/');
    
    // 5️⃣ Ellenőrizd, hogy a navigációs sáv tartalma változott (bejelentkezett állapot)
    
    // Ellenőrizd, hogy a "Bejelentkezés" gomb nem látható
    const loginButton = await page.locator('.loginbutton');
    await expect(loginButton).toBeHidden();
    
    // Ellenőrizd, hogy a "Kijelentkezés" gomb látható
    const logoutButton = await page.locator('.logoutbutton');
    await expect(logoutButton).toBeVisible();

    // 6️⃣ Ellenőrizd, hogy az "Admin" link látható, ha admin vagy
    const adminLink = await page.locator('a[href="/admin"]');
    await expect(adminLink).toBeVisible({ timeout: 10000 });  // Hosszabb várakozási idő

    // 7️⃣ Ellenőrizd, hogy a "Statisztikák" link látható, ha a szavazás nem aktív
    const statsLink = await page.locator('a[href="/stats"]');
    await expect(statsLink).toBeVisible();

    // 8️⃣ Ellenőrizd, hogy a "Szavazz" link látható, ha a szavazás aktív
    const votingLink = await page.locator('a[href="/voting"]');
    await expect(votingLink).toBeVisible();

    // 9️⃣ Kattints a "Kijelentkezés" gombra
    await logoutButton.click();
    
    // 🔟 Ellenőrizd, hogy a felhasználó ki van jelentkezve és visszairányítva van a login oldalra
    await page.waitForURL('http://localhost:3000/login');
    await expect(page.url()).toBe('http://localhost:3000/login');
  });
});
