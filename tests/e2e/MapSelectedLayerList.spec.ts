import { expect, test } from "../helper/testExpansion";

test("レイヤーの順番を変更できる", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.getByRole("button", { name: "令和6年9月20日からの大雨 令和6年9月20日からの大雨" }).click();
    await page.getByRole("button", { name: "正射画像（速報）" }).click();
    await page.getByText("輪島地区（9/23撮影）").click();
    await page.getByText("輪島東部地区（9/24撮影）").click();
    await page.getByRole("checkbox", { name: "輪島東部地区（9/24撮影）" }).press("Tab");
    await page.getByRole("checkbox", { name: "輪島西部地区（9/24撮影）" }).press("Tab");
    await page.getByRole("button", { name: "令和6年(2024年)能登半島地震 令和6年(2024" }).press("Tab");
    await page.getByRole("button", { name: "年代別の写真 年代別の写真" }).press("Tab");
    await page.getByRole("button", { name: "標高・土地の凹凸 標高・土地の凹凸" }).press("Tab");
    await page.getByRole("button", { name: "土地の成り立ち・土地利用 土地の成り立ち・土地利用" }).press("Tab");
    await page.getByRole("button", { name: "基準点・地磁気・地殻変動 基準点・地磁気・地殻変動" }).press("Tab");
    await page.getByRole("button", { name: "災害伝承・避難場所 災害伝承・避難場所" }).press("Tab");
    await page.getByRole("button", { name: "近年の災害 近年の災害" }).press("Tab");
    await page.getByRole("button", { name: "その他 その他" }).press("Tab");
    await page.getByRole("button", { name: "Drag handle" }).first().press("Enter");
    await page.getByRole("button", { name: "Drag handle" }).first().press("ArrowDown");
    await page.getByRole("button", { name: "Drag handle" }).first().press("ArrowDown");
    await page.getByRole("button", { name: "Drag handle" }).first().press("ArrowDown");
    await page.getByRole("button", { name: "Drag handle" }).first().press("Enter");
    const dragFirstArialabel = await page.getByRole("button", { name: "Drag handle" }).first().getAttribute("aria-label");
    expect(dragFirstArialabel).toBe("Drag handle 輪島地区（9/23撮影）");
});

test("レイヤーを削除できる", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.getByRole("button", { name: "令和6年9月20日からの大雨 令和6年9月20日からの大雨" }).click();
    await page.getByRole("button", { name: "正射画像（速報）" }).click();
    await page.getByText("輪島地区（9/23撮影）").click();
    await expect(page.getByRole("button", { name: "Drag handle 輪島地区（9/23撮影）" })).toBeVisible();
    await page.getByRole("button", { name: "削除 輪島地区（9/23撮影）" }).click();
    await expect(page.getByRole("button", { name: "Drag handle 輪島地区（9/23撮影）" })).toBeHidden();
});
