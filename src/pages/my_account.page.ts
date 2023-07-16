import { Page, Locator } from '@playwright/test';

class MyAccountPage {
  private page: Page;
  private title: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByRole('heading', { name: 'My Account' });
    this.errorMessage = page.locator('[data-qa="error-message"]');
  }

  async visit(): Promise<void> {
    await this.page.goto('/my-account');
  }

  async waitForTitle(): Promise<void> {
    await this.title.waitFor();
  }

  async waitForErrorMessage(): Promise<void> {
    await this.errorMessage.waitFor();
  }
}

export { MyAccountPage };
