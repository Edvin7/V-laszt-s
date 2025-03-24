const { test, expect } = require('@playwright/test');

test('Account page and password change', async ({ page }) => {
  // 1. Bejelentkezés szimulálása (localStorage-ba helyezzük el a felhasználót)
  const user = { id: 1, name: 'a', email: 'a@g.c' };
  
  await page.goto('http://localhost:3000/login'); // Bejelentkezési oldal URL-je
  
  // Helyezzük el a felhasználót a localStorage-ban
  await page.evaluate((user) => {
    localStorage.setItem('user', JSON.stringify(user));
  }, user);

  // 2. Nyisd meg a főoldalt, hogy ellenőrizd, hogy a navbar jól működik
  await page.goto('http://localhost:3000/'); // A navbar alapértelmezett oldala

  // 3. Kattints a Profil gombra a navbar-ban
  const profileLink = await page.locator('text=Profil');  // A "Profil" link szövege
  await profileLink.click();  // Kattints a Profil linkre

  // 4. Ellenőrizd, hogy sikeresen átirányította az Account oldalra
  await expect(page).toHaveURL('http://localhost:3000/account');  // Várd, hogy az URL /account-ra változzon

  // 5. Ellenőrizd, hogy a felhasználói adatok megjelennek-e
  const name = await page.locator('p:has-text("Neved:")');
  await expect(name).toHaveText(`Neved: ${user.name}`);
  
  const email = await page.locator('p:has-text("Email cím:")');
  await expect(email).toHaveText(`Email cím: ${user.email}`);
  
  // 6. Jelszó változtatás tesztelése
  const newPasswordInput = await page.locator('input[placeholder="Új jelszó"]');
  const confirmPasswordInput = await page.locator('input[placeholder="Jelszó megerősítése"]');
  const passwordChangeButton = await page.locator('button:has-text("Jelszó változtatás")');
  
  // Új jelszó megadása
  await newPasswordInput.fill('newPassword123');
  await confirmPasswordInput.fill('newPassword123');
  
  // Kattints a jelszó változtatás gombra
  await passwordChangeButton.click();

  // 7. Várd meg az alert megjelenését és ellenőrizd a szöveget
  page.once('dialog', async dialog => {
    // Ellenőrizzük, hogy az alert a megfelelő üzenetet tartalmazza
    expect(dialog.message()).toBe('Jelszó sikeresen megváltozott!');
    await dialog.accept(); // Fogadd el az alertet
  });

  // 8. Ellenőrizd, hogy a backend megfelelő választ ad a jelszó változtatáskor
  const response = await page.request.put('http://localhost:5000/api/users/1/change-password', {
    data: { password: 'newPassword123' },
  });

  // Válasz ellenőrzése a backendről
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.message).toBe('A jelszó sikeresen megváltozott.');
});
