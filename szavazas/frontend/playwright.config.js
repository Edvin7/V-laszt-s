// playwright.config.js
module.exports = {
    testDir: './tests', // A tesztelni kívánt könyvtár
    timeout: 30000, // Időtúllépés
    use: {
      headless: false, // Fejlesztői mód engedélyezése (opcionális)
      browserName: 'chromium', // Böngésző választása
    },
  };
  