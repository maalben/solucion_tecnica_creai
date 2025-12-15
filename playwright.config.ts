import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 30_000,
  use: {
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure"
  }
});