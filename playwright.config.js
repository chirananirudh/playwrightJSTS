//@ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
*/

// export default defineConfig({
const config = ({
  testDir: './tests', // Directory where tests are located
  timeout: 30 * 1000, // 30 seconds timeout for each test
  expect: {
    timeout: 40 * 1000 // 40 seconds timeout for assertions
  },
  reporter: [['html'], ['line'], ['allure-playwright']], // Use both HTML and Allure reporters
  use: {
    browserName: 'chromium', // Default browser for tests
    headless: false, // Run tests in headful mode
    screenshot: 'on',
    trace: 'on'//off, on, retain-on-failure
  }
});

module.exports = config;
