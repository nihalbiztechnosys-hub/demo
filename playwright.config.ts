import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Only look for spec files inside the tests folder — keeps pages/, node_modules, etc. out of the test run.
  testDir: './pages',
  testMatch: '**/*.spec.ts',

  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },

  fullyParallel: true,
  retries: 0,
  workers: undefined,

  use: {
    headless: false,

    // TODO: set this to wherever the Zenith Studio page is served from,
    // e.g. 'http://localhost:5500' (Live Server) or 'http://localhost:3000'.
    baseURL: 'http://127.0.0.1:5500/index.html',

    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment to run cross-browser:
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
});