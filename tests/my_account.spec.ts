import { test } from "@playwright/test";
import { MyAccountPage } from "../src/pages";
import { getLoginToken } from "../src/api/login.api";
import { adminDetails } from "../src/data";


test('My account using cookie injection and mocking request', async function ({ page }) {
  const myAccountPage = new MyAccountPage(page);
  const token = await getLoginToken(adminDetails);

  await page.route('**/api/user**', async (route, request) => {
    await route.fulfill({
      status: 500,
      contentType: 'aaplication/json',
      body: JSON.stringify({ message: "ERROR FROM MOCKING" }),
    })
  });

  await myAccountPage.visit();
  await page.evaluate((innerToken) => document.cookie = `token=${innerToken}`, [token]);
  await myAccountPage.visit();
  await myAccountPage.waitForTitle();
  await myAccountPage.waitForErrorMessage();
 });
