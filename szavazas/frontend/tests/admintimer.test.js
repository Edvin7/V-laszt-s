const { test, expect } = require('@playwright/test');

test('Admin bejelentkezés, időzítő beállítása, szavazás, nullázás és leállítás', async ({ page }) => {
  await page.goto('http://localhost:3000/login'); 
  await page.fill('input[name="email"]', 'admin@admin.com');
  await page.fill('input[name="password"]', 'admin');
  await page.click('input[type="submit"][value="Bejelentkezés"]');

  await page.click('text=Admin');
  await expect(page).toHaveURL('http://localhost:3000/admin');

  const futureDate = new Date(Date.now() + 1200 * 60 * 1000).toISOString().slice(0, 16);
  await page.fill('input[type="datetime-local"]', futureDate);

  await page.click('button:has-text("Indítás")');

  await page.waitForTimeout(3000);

  await page.click('text=Szavazz');
  await expect(page).toHaveURL('http://localhost:3000/voting');

  await page.click('text=Admin');
  await expect(page).toHaveURL('http://localhost:3000/admin');

  page.once('dialog', async (dialog) => {
    console.log(`Nullázás alert: ${dialog.message()}`);
    await dialog.accept();
  });

  await page.click('button:has-text("Mind törlés + időzítő nullázás")');
  await page.waitForTimeout(2000);

  const newFutureDate = new Date(Date.now() + 600 * 60 * 1000).toISOString().slice(0, 16);
  await page.fill('input[type="datetime-local"]', newFutureDate);
  
  await page.click('button:has-text("Indítás")');
  await page.waitForTimeout(3000);

  page.once('dialog', async (dialog) => {
    console.log(`Leállítás alert: ${dialog.message()}`);
    await dialog.accept();
  });

  await page.click('button:has-text("Leállítás")');
  await page.waitForTimeout(2000);
});
