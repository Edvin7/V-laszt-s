module.exports = {
    // CSS fájlok mockolása
    moduleNameMapper: {
      '\\.css$': 'identity-obj-proxy',  // Mockolja a CSS fájlokat
    },
    
    // Ne próbálja meg feldolgozni a react, react-dom és react-scripts csomagokat
    transformIgnorePatterns: [
      '/node_modules/(?!react|react-dom|react-scripts)/',  // Nem kell átalakítani ezeket a csomagokat
    ],
    
    // Egyéb beállítások
    transform: {
      '^.+\\.jsx?$': 'babel-jest',  // JSX fájlokat is dolgozzon fel
    },
  };
  