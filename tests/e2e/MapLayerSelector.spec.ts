import { expect, test } from "../helper/testExpansion";

test("レイヤーグループを展開できる", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.getByRole("button", { name: "令和6年9月20日からの大雨 令和6年9月20日からの大雨" }).click();
    await page.getByRole("button", { name: "正射画像（速報）" }).click();
    await expect(page.getByText("輪島地区（9/23撮影）")).toBeVisible();
});

test("レイヤーグループが展開されるまで中の要素がレンダリングされていない", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.getByRole("button", { name: "令和6年9月20日からの大雨 令和6年9月20日からの大雨" }).click();
    await expect(page.getByText("輪島地区（9/23撮影）")).not.toBeVisible();
});

test("レイヤーの表示・非表示を切り替えられる", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.getByRole("button", { name: "令和6年9月20日からの大雨 令和6年9月20日からの大雨" }).click();
    await page.getByRole("button", { name: "正射画像（速報）" }).click();
    await page.getByText("輪島地区（9/23撮影）").click();
    await expect(page.getByRole("paragraph").filter({ hasText: "輪島地区（9/23撮影）" })).toBeVisible();
});
