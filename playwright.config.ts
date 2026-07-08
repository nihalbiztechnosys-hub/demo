import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: '**/*.spec.ts',
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
});