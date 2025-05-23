import path from "path";
import { expect, test } from "../helper/testExpansion";

test("初期表示時のデザインが変更されていない", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await expect(page).toHaveScreenshot({ stylePath: path.join(__dirname, "../helper/mask.css") });
});

test("メニューを閉じた時のデザインが変更されていない", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.getByRole("button", { name: "点群タイル閲覧サイト 試験公開" }).click();
    await expect(page).toHaveScreenshot({ stylePath: path.join(__dirname, "../helper/mask.css") });
});

test("情報ポップオーバーのデザインが変更されていない", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.getByRole("button", { name: "点群タイル閲覧サイト 試験公開" }).click();
    await page.getByRole("button", { name: "情報" }).click();
    await expect(page).toHaveScreenshot({ stylePath: path.join(__dirname, "../helper/mask.css") });
});

test("レイヤー選択箇所のディレクトリ展開時のデザインが変更されていない", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.getByRole("button", { name: "令和6年9月20日からの大雨" }).click();
    await page.getByRole("button", { name: "正射画像（速報）" }).click();
    await expect(page).toHaveScreenshot({ stylePath: path.join(__dirname, "../helper/mask.css") });
});

test("メニューの初期状態のデザインが変更されていない", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await expect(page).toHaveScreenshot({ stylePath: path.join(__dirname, "../helper/mask.css") });
    await page.getByRole("button", { name: "Toggle color mode" }).scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot({ stylePath: path.join(__dirname, "../helper/mask.css") });
});

test("立体,陰影,段彩,の表示を有効にした状態のデザインが変更されていない", async ({ page, mapController }) => {
    /**
     * [TODO]
     * 点群がmaskを超えて描画されてしまうためtoHaveScreenshotが終わらない
     * interleavedオプション有効化の対応が完了したら点群の表示を有効にしてテストを行う
     */
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.locator("input[aria-label='立体表示']").click({ force: true });
    await page.locator("input[aria-label='陰影表示']").click({ force: true });
    await page.locator("input[aria-label='段彩表示']").click({ force: true });
    // await page.locator("input[aria-label='点群表示']").click({ force: true });
    await expect(page).toHaveScreenshot({ stylePath: path.join(__dirname, "../helper/mask.css"), timeout: 20000 });
});

test("レイヤーのドラック可能アイテムのデザインが変更されていない", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.getByRole("button", { name: "令和6年9月20日からの大雨" }).click();
    await page.getByRole("button", { name: "正射画像（速報）" }).click();
    await page.getByText("輪島地区（9/23撮影）").click();
    await page.getByText("輪島東部地区（9/24撮影）").click();
    await page.getByRole("button", { name: "Toggle color mode" }).scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot({ stylePath: path.join(__dirname, "../helper/mask.css") });
});

test("検索ボックスのサジェスト表示時のデザインが変更されていない", async ({ page, mapController }) => {
    await page.route("https://msearch.gsi.go.jp/address-search/AddressSearch*", (route) => {
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify([
                {
                    geometry: {
                        coordinates: [139.810713277778, 35.7095291111111],
                        type: "Point",
                    },
                    type: "Feature",
                    properties: {
                        addressCode: "13107",
                        title: "東京スカイツリー",
                        dataSource: "1",
                    },
                },
                {
                    geometry: {
                        coordinates: [139.809252200556, 35.7167307038889],
                        type: "Point",
                    },
                    type: "Feature",
                    properties: {
                        addressCode: "13107",
                        title: "テストテストテスト",
                        dataSource: "1",
                    },
                },
            ]),
        });
    });
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.getByRole("button", { name: "点群タイル閲覧サイト 試験公開" }).click();
    await page.getByRole("textbox", { name: "地名検索" }).fill("スカイツリー");
    await expect(page).toHaveScreenshot({ stylePath: path.join(__dirname, "../helper/mask.css") });
});

test("色彩設定のデザインが変更されていない", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.locator("input[aria-label='段彩表示']").click({ force: true });
    await page.getByRole("button", { name: "設定" }).click();
    await expect(page).toHaveScreenshot({ stylePath: path.join(__dirname, "../helper/mask.css") });
});

test("色彩追加モーダルのデザインが変更されていない", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.locator("input[aria-label='段彩表示']").click({ force: true });
    await page.getByRole("button", { name: "設定" }).click();
    await page.getByRole("button", { name: "追加" }).scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "追加" }).click();
    await expect(page).toHaveScreenshot({ stylePath: path.join(__dirname, "../helper/mask.css") });
});

test("色彩編集モーダルのデザインが変更されていない", async ({ page, mapController }) => {
    await page.goto("/");
    await mapController("main").waitToMapLoaded();
    await page.locator("input[aria-label='段彩表示']").click({ force: true });
    await page.getByRole("button", { name: "設定" }).click();
    await page.getByRole("button", { name: "色彩編集 0m~" }).scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "色彩編集 0m~" }).click();
    await expect(page).toHaveScreenshot({ stylePath: path.join(__dirname, "../helper/mask.css") });
});
