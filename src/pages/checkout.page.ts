import { Page, Locator, expect } from '@playwright/test';

class CheckoutPage {
  private page: Page;
  private basketCards: Locator;
  private basketItemPrice: Locator;
  private basketItemRemoveBtn: Locator;
  private continueToCheckoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketCards = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemRemoveBtn = page.locator('[data-qa="basket-card-remove-item"]');
    this.continueToCheckoutBtn = page.locator('[data-qa="continue-to-checkout"]');
  }

  async removeCheapestProduct() {
    await this.basketCards.first().waitFor();
    await this.basketItemPrice.first().waitFor();

    const totalCardsBefore = await this.basketCards.count();
    const allPriceText = await this.basketItemPrice.allInnerTexts();
    const numericPrices: Array<number> = allPriceText.map((el) => {
      const replaced = el.replace('$', '');
      return parseInt(replaced, 10);
    });

    const lowersPriceIndex = numericPrices.indexOf(Math.min(...numericPrices));

    await this.basketItemRemoveBtn.nth(lowersPriceIndex).click();
    await expect(this.basketCards).toHaveCount(totalCardsBefore - 1); 
  }

  async continueToCheckout() {
    await this.continueToCheckoutBtn.waitFor();
    await this.continueToCheckoutBtn.click();
    await this.page.waitForURL(/\/login/);
  }
}

export { CheckoutPage };
