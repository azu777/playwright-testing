import { test, expect } from '@playwright/test';

test.skip('Should add product to basket', async function ({ page }) {
  const addToBasketBtn = page.locator('[data-qa="product-button"]').first();
  const basketCounter = page.locator('[data-qa="header-basket-count"]');
  const checkoutLink = page.locator('[data-qa="desktop-nav-link"] [href="/basket"]');

  await page.goto('/');
  await addToBasketBtn.waitFor();
  await addToBasketBtn.click();

  await expect(addToBasketBtn).toHaveText('Remove from Basket');
  await expect(basketCounter).toHaveText('1');

  await checkoutLink.waitFor();
  await checkoutLink.click();

  await page.waitForURL('/basket');
});
