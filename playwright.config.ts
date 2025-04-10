import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: "tests",
    fullyParallel: true,
    timeout: 3 * 60 * 1000,
    expect: {
        timeout: 20 * 1000,
    },
    forbidOnly: !!process.env.CI,
    maxFailures: process.env.CI ? 1 : undefined,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI
        ? [
              ["html", { open: "never" }],
              ["github"],
              ["json", { outputFile: "playwright-report/results.json" }],
              ["list", { printSteps: true }],
          ]
        : [["html", { host: "0.0.0.0", port: "9323", open: "on-failure" }]],
    use: {
        trace: "on",
    },
    webServer: {
        command: "next build && npx serve@latest out",
        timeout: 600000,
        port: 3000,
    },
    projects: [
        {
            name: "e2e-chromium",
            testDir: "./tests/e2e",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "e2e-mobile-safari",
            testDir: "./tests/e2e",
            use: { ...devices["iPhone 12"] },
        },
        {
            name: "vrt-chromium-light",
            testDir: "./tests/vrt",
            use: { ...devices["Desktop Chrome"], colorScheme: "light" },
        },
        {
            name: "vrt-chromium-dark",
            testDir: "./tests/vrt",
            use: { ...devices["Desktop Chrome"], colorScheme: "dark" },
        },
        {
            name: "vrt-mobile-safari",
            testDir: "./tests/vrt",
            use: { ...devices["iPhone 12"] },
        },
    ],
});
