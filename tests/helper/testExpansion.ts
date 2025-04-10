import { expect as mapGrabExpect, test as mapGrabTest } from "@mapgrab/playwright";
import { mergeExpects, mergeTests, expect as playwrightExpect, test as playwrightTest } from "@playwright/test";

export const test = mergeTests(playwrightTest, mapGrabTest);
export const expect = mergeExpects(playwrightExpect, mapGrabExpect);
