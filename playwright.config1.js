//@ts-check
import { defineConfig, devices } from '@playwright/test';
import { permission } from 'process';

/**
 * @see https://playwright.dev/docs/test-configuration
*/

// export default defineConfig({
const config = ({
  testDir: './tests', // Directory where tests are located
  retries: 1,
  workers: 1,
  timeout: 30 * 1000, // 30 seconds timeout for each test
  expect: {
    timeout: 40 * 1000 // 40 seconds timeout for assertions
  },
  reporter: 'html', // Use HTML reporter for test results
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit', // Default browser for tests
        headless: false, // Run tests in headless mode
        screenshot: 'off',
        trace: 'on',//off, on, retain-on-failure
        ...devices['iPhone 14 Pro Max']
      }
    }, {
      name: 'chrome',
      use: {
        browserName: 'chromium', // Default browser for tests
        headless: false, // Run tests in headless mode
        screenshot: 'on',
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        trace: 'on',//off, on, retain-on-failure
        // viewport: { width: 720, height: 720 }
      }
    }
  ],
});

module.exports = config;
