import { expect, test } from "../helper/testExpansion";

test("トップページにアクセスできる", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await expect(page).toHaveTitle("点群タイル閲覧サイト 試験公開");
});

test("メニューを閉じることができる", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    const accordionContent = page.getByRole("region", { name: "点群タイル閲覧サイト 試験公開" });
    await page.getByRole("button", { name: "点群タイル閲覧サイト" }).click();
    await expect(accordionContent).toBeHidden();
});
