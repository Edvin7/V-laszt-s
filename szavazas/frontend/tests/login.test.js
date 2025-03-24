const { test, expect } = require('@playwright/test');

test.describe('Login functionality', () => {

  test('should render login page correctly', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000/login');

    // Check if the login form elements are visible
    await expect(page.locator('input[placeholder="Email cím"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Jelszó"]')).toBeVisible();
    await expect(page.locator('input[type="submit"][value="Bejelentkezés"]')).toBeVisible();
  });

  test('should show error message on failed login', async ({ page }) => {
    // Navigate to the login page
    await page.goto('http://localhost:3000/login');

    // Fill in the form with invalid credentials
    await page.fill('input[placeholder="Email cím"]', 'test@example.com');
    await page.fill('input[placeholder="Jelszó"]', 'wrongpassword');

    // Click on the login button
    await page.click('input[type="submit"][value="Bejelentkezés"]');

    // Wait for and check the error message
    const errorMessage = await page.locator('.error-message');
    await expect(errorMessage).toHaveText('Helytelen email vagy jelszó');
  });

  test('should redirect to home page on successful login', async ({ page }) => {
    // Mock the backend response for successful login
    // Use a tool like MSW (Mock Service Worker) to mock API responses or set up the real backend

    // Navigate to the login page
    await page.goto('http://localhost:3000/login');

    // Fill in the form with valid credentials
    await page.fill('input[placeholder="Email cím"]', 'a@g.c');
    await page.fill('input[placeholder="Jelszó"]', 'asd');

    // Click on the login button
    await page.click('input[type="submit"][value="Bejelentkezés"]');

    // Wait for navigation and check if redirected to the homepage
    await page.waitForNavigation();
    await expect(page.url()).toBe('http://localhost:3000/');
  });

  test('should redirect to admin page for admin user', async ({ page }) => {
    // Mock the backend response for admin login
    // Use a tool like MSW (Mock Service Worker) to mock API responses or set up the real backend

    // Navigate to the login page
    await page.goto('http://localhost:3000/login');

    // Fill in the form with admin credentials
    await page.fill('input[placeholder="Email cím"]', 'admin@admin.com');
    await page.fill('input[placeholder="Jelszó"]', 'admin');

    // Click on the login button
    await page.click('input[type="submit"][value="Bejelentkezés"]');

    // Wait for navigation and check if redirected to the admin page
    await page.waitForNavigation();
    await expect(page.url()).toBe('http://localhost:3000/admin');
  });

});
