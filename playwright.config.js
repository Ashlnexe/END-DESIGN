const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  testMatch: '*.spec.js',
  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-failure',
  },
});
