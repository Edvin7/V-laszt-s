const { test, expect } = require('@playwright/test');

// Segédfüggvény véletlenszerű adatokhoz
function generateRandomUser() {
  const randomId = Math.floor(Math.random() * 100000);
  return {
    name: `Teszt Elek ${randomId}`,
    email: `teszt${randomId}@example.com`,
    password: `jelszo${randomId}`,
    personalId: `${Math.floor(10000000 + Math.random() * 89999999)}`
  };
}

test('should register successfully with random data', async ({ page }) => {
  const user = generateRandomUser();

  await page.goto('http://localhost:3000/register');

  await page.fill('input[name="name"]', user.name);
  await page.fill('input[name="email"]', user.email);
  await page.fill('input[name="pass"]', user.password);
  await page.fill('input[name="re_pass"]', user.password);
  await page.fill('input[name="personal_id"]', user.personalId);
  await page.check('input[name="agreeTerm"]');

  await page.click('input[type="submit"][value="Regisztráció"]');

  await page.waitForURL('**/login', { timeout: 5000 });
  expect(page.url()).toContain('/login');
});
