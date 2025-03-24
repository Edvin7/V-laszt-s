const { test, expect } = require('@playwright/test');

test('should display parties list and navigate to party details page on "Több információ" click', async ({ page }) => {
  await page.goto('http://localhost:3000/parties');

  const partyCards = await page.$$('.party-card');
  expect(partyCards.length).toBeGreaterThan(0);

  const firstPartyName = await partyCards[0].$eval('.party-name', (el) => el.textContent);
  const firstPartyButton = await partyCards[0].$('.view-more-button');
  
  expect(firstPartyName).toBeTruthy();
  expect(await firstPartyButton.isVisible()).toBe(true);

  await firstPartyButton.click();

  await page.waitForURL('http://localhost:3000/party/*');  

  const partyDescription = await page.$('.description');
  expect(partyDescription).toBeTruthy();  

  const partyNameInDetails = await page.$eval('.profile-info h2', (el) => el.textContent);
  expect(partyNameInDetails).toBe(firstPartyName); 
});

test('should show error message if party details are not found', async ({ page }) => {
  await page.goto('http://localhost:3000/party/99999'); 

  const errorMessage = await page.textContent('.error-message');
  expect(errorMessage).toBe('Hiba történt.');
});
