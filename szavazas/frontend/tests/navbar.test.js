const { test, expect } = require('@playwright/test');

test.describe('Navbar', () => {
  test('should behave correctly for a regular user after login', async ({ page }) => {
    // 1️⃣ Nyisd meg a bejelentkezési oldalt
    await page.goto('http://localhost:3000/login');

    // 2️⃣ Töltsd ki a bejelentkezési adatokat
    await page.fill('input[placeholder="Email cím"]', 'szalkai@gmail.com');
    await page.fill('input[placeholder="Jelszó"]', 'szalkai@gmail.com');

    // 3️⃣ Kattints a bejelentkezés gombra
    await page.click('input[type="submit"][value="Bejelentkezés"]');

    // 4️⃣ Várj a sikeres bejelentkezésre és az URL változására
    await page.waitForURL('http://localhost:3000/');
    await expect(page.url()).toBe('http://localhost:3000/');

    // 5️⃣ Ellenőrizd, hogy a "Bejelentkezés" gomb eltűnt
    const loginButton = await page.locator('.loginbutton');
    await expect(loginButton).toHaveCount(0);

    // 6️⃣ Ellenőrizd, hogy a "Kijelentkezés" gomb megjelent
    const logoutButton = await page.locator('.logoutbutton');
    await expect(logoutButton).toBeVisible();

    // 7️⃣ Ne legyen "Admin" link sima userként
    const adminLink = await page.locator('a[href="/admin"]');
    await expect(adminLink).toHaveCount(0);

    // 8️⃣ Kattints a kijelentkezés gombra
    await logoutButton.click();
  });
});
