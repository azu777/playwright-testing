import { Page, Locator } from '@playwright/test';

class LoginPage {
  private page: Page;
  private registerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registerBtn = page.locator('[data-qa="go-to-signup-button"]');
  }

  async goToSignUp(): Promise<void> {
    await this.registerBtn.waitFor();
    await this.registerBtn.click();
    await this.page.waitForURL(/\/signup/);
  }
}

export { LoginPage };
