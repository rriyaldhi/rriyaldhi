import { defineConfig } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4173';

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.mjs',
  use: {
    baseURL,
    viewport: { width: 1100, height: 800 },
    launchOptions: {
      args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
    },
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'webpack serve --config webpack.config.prod.js --host 127.0.0.1 --port 4173 --no-client --no-hot --no-live-reload --no-static',
    url: baseURL,
    timeout: 120_000,
  },
});
