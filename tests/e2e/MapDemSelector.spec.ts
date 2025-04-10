import { expect, test } from "../helper/testExpansion";

test("すべてのDEMが表示されている", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.goto("http://localhost:3000/#4/36.1/140.08");
    await page.getByRole("combobox", { name: "ソース" }).click();
    await expect(page.getByRole("option", { name: "DEM10B" })).toBeVisible();
    await expect(page.getByRole("option", { name: "DEM5A" })).toBeVisible();
    await expect(page.getByRole("option", { name: "DEM5B" })).toBeVisible();
    await expect(page.getByRole("option", { name: "DEM5C" })).toBeVisible();
    await expect(page.getByRole("option", { name: "DEM1A" })).toBeVisible();
});

test("DEMを変更することができる", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.getByRole("combobox", { name: "ソース" }).click();
    await page.getByRole("option", { name: "DEM10B" }).click();
    await page.getByRole("combobox", { name: "ソース" }).click();
    await expect(page.getByRole("option", { name: "DEM10B" }).locator("svg")).toBeVisible();
});
