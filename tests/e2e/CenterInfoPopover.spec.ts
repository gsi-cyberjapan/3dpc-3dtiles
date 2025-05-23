import { expect, test } from "../helper/testExpansion";

test("ポップオーバーを開くことができる", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.getByRole("button", { name: "点群タイル閲覧サイト 試験公開" }).click();
    await page.getByRole("button", { name: "情報" }).click();
    await expect(page.getByRole("dialog", { name: "中心の情報" })).toBeVisible();
});

test("中心点の情報が表示されている", async ({ page }) => {
    await page.goto("/#5/43.57/142.82/30/40");
    await page.getByRole("button", { name: "点群タイル閲覧サイト 試験公開" }).click();
    await expect(page.locator("dd[aria-label='緯度']")).toHaveText("43.570000");
    await expect(page.locator("dd[aria-label='経度']")).toHaveText("142.820000");
    await expect(page.locator("dd[aria-label='ズーム']")).toHaveText("5.00");
    await expect(page.locator("dd[aria-label='ピッチ']")).toHaveText("40.00");
    await expect(page.locator("dd[aria-label='ベアリング']")).toHaveText("30.00");
    await expect(page.locator("dd[aria-label='付近の住所']")).toHaveText("北海道上川郡美瑛町−");
    await expect(page.locator("dd[aria-label='UTMポイント']")).toHaveText("54TXP46962572");
    await expect(page.locator("dd[aria-label='標高']")).toHaveText("標高: 1698.4m (データソース: DEM5A)");
});

test("外側のクリックでポップオーバーを閉じることができる", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.getByRole("button", { name: "点群タイル閲覧サイト 試験公開" }).click();
    await page.getByRole("button", { name: "情報" }).click();
    const popover = page.getByRole("dialog", { name: "中心の情報" });
    await page.getByRole("button", { name: "点群タイル閲覧サイト 試験公開" }).click();
    await expect(popover).toBeHidden();
});
