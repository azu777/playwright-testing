import { Page, Locator, expect } from '@playwright/test';
import { NavigationPagFragment } from './navigation.fragment';
import { isDesktopViewport } from '../utils/is_desktop_viewport';
import { BaseImplementation } from '../../lib/base';
import { Button } from '../../lib/elements';


class ArtPage extends BaseImplementation {
  protected page: Page;
  private addButton: Button;
  private sortDropdown: Locator;
  private productTitle: Locator;

  constructor(page: Page) {
    super(page)

    this.page = page;
    this.addButton = this.initChild(Button, '[data-qa="product-button"]');
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
    this.productTitle = page.locator('[data-qa="product-title"]');
  }

  async visit(): Promise<void> {
    await this.page.goto('/');
  }

  // async addProductToBasket(index: number): Promise<void> {
  //   const specificAdd = this.addButton.nth(index); 
  //   const navigation = new NavigationPagFragment(this.page);

  //   await specificAdd.waitFor();
  //   await expect(specificAdd).toHaveText('Add to Basket');
  //   await specificAdd.click();
  //   // only desktop viewport 
  //   if (isDesktopViewport(this.page)) {
  //     expect(await navigation.getBasketCount()).toBeGreaterThan(0);
  //   }
  //   await expect(specificAdd).toHaveText('Remove from Basket');
  // }

  async sortByCheapest() {
    await this.sortDropdown.waitFor();
    await this.productTitle.first().waitFor();

    const titlesBeforeSort = await this.productTitle.allInnerTexts();
    await this.sortDropdown.selectOption('price-asc');
    const titlesAfterSort = await this.productTitle.allInnerTexts();

    expect(titlesBeforeSort).not.toEqual(titlesAfterSort);
  };
}

export { ArtPage };
