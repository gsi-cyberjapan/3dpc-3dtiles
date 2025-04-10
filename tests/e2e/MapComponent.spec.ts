import { expect, test } from "../helper/testExpansion";

test("初期表示位置が変化していない", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    expect(page.url()).toContain("/#4/36.1/140.08");
});

test("Attributionが表示されている", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.getByRole("button", { name: "点群タイル閲覧サイト" }).click();
    await expect(page.getByText("国土地理院最適化ベクトルタイル(標準地図風スタイル) | © GSI Japan | 点群タイル閲覧サイト")).toBeVisible();
});

test("Attributionを閉じることができる", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.getByRole("button", { name: "点群タイル閲覧サイト" }).click();
    await page.getByLabel("Toggle attribution").click();
    await expect(
        page.getByText("国土地理院最適化ベクトルタイル(標準地図風スタイル) | © GSI Japan | 点群タイル閲覧サイト"),
    ).not.toBeVisible();
});
