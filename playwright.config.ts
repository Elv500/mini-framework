import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'api-tests',
      testMatch: 'tests/api/**/*.spec.ts',
      use: {
        baseURL: process.env.API_URL,
      },
    },
    {
      name: 'ui-tests',
      testMatch: 'tests/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.UI_URL,
      },
    },
  ],
});
