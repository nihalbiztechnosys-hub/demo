import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './pages',
  testMatch: '**/*.spec.ts',

  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },

  fullyParallel: true,

  workers: undefined,

  use: {
 
    baseURL: 'http://127.0.0.1:5500',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  webServer: {
    command: 'npx http-server -p 5500 -c-1 .',
    url: 'http://127.0.0.1:5500',
  
    timeout: 30_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
});