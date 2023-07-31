
import { Locator, Page } from '@playwright/test';


class BaseElement {
  public selector: string;
  public page: Page;

  constructor(page, selector: string) {
    this.page = page;
    this.selector = selector;
  }

  async click() {
    await this.page.locator(this.selector).waitFor({ state: 'visible', timeout: 20_000 });
    await this.page.locator(this.selector).click();
  }

  async fill(parameter: string) {
    await this.page.locator(this.selector).waitFor({ state: 'visible', timeout: 20_000 });
    await this.page.locator(this.selector).fill(parameter);
  }
}

export { BaseElement };
