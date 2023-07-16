import { Page, Locator } from '@playwright/test';
import { isDesktopViewport } from '../utils/is_desktop_viewport';
import { link } from 'fs';

class NavigationPagFragment {
  private page: Page;
  private basketCounter: Locator;
  private checkoutLink: Locator;
  private burgerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkoutLink = page.getByRole('link', { name: 'Checkout' });
    this.burgerBtn = page.locator('[data-qa="burger-button"]');
  }

  async goToCheckout() {
    if (!isDesktopViewport(this.page)) {
      await this.burgerBtn.waitFor();
      await this.burgerBtn.click();
    }
    await this.checkoutLink.waitFor();
    await this.checkoutLink.click();
    await this.page.waitForURL('/basket');
  }

  async getBasketCount(): Promise<number> {
    await this.basketCounter.waitFor();

    const count = await this.basketCounter.innerText();
    return parseInt(count, 10);
  }
}

export { NavigationPagFragment };
