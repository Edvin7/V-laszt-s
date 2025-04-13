const { test, expect } = require('@playwright/test');

test.describe('Login functionality', () => {

  test('should render login page correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await expect(page.locator('input[placeholder="Email cím"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Jelszó"]')).toBeVisible();
    await expect(page.locator('input[type="submit"][value="Bejelentkezés"]')).toBeVisible();
  });

  test('should show error message on failed login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[placeholder="Email cím"]', 'test@example.com');
    await page.fill('input[placeholder="Jelszó"]', 'wrongpasswordd');

    await page.click('input[type="submit"][value="Bejelentkezés"]');

    const errorMessage = await page.locator('.error-message');
    await expect(errorMessage).toHaveText('Helytelen email vagy jelszó');
  });

  test('should redirect to home page on successful login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[placeholder="Email cím"]', 'a@gmail.com');
    await page.fill('input[placeholder="Jelszó"]', 'asd');
  
    await page.click('input[type="submit"][value="Bejelentkezés"]');
  
    await page.waitForURL('http://localhost:3000/');
  
    await expect(page.url()).toBe('http://localhost:3000/');
  });
  

  test('should redirect to admin page for admin user', async ({ page }) => {

    await page.goto('http://localhost:3000/login');

    await page.fill('input[placeholder="Email cím"]', 'admin@admin.com');
    await page.fill('input[placeholder="Jelszó"]', 'admin');

    await page.click('input[type="submit"][value="Bejelentkezés"]');

    await page.waitForNavigation();
    await expect(page.url()).toBe('http://localhost:3000/admin');
  });

});
