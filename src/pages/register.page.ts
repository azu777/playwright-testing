import { Page, Locator } from '@playwright/test';

class RegisterPage {
  private page: Page;
  private emailField: Locator;
  private passwordField: Locator;
  private registerBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.locator('[placeholder="E-Mail"]');
    this.passwordField = page.locator('[placeholder="Password"]');
    this.registerBtn = page.locator('button[type="submit"]');
  }

  async signUpAsNewUser(email: string, password: string): Promise<void> {
    await this.emailField.waitFor();
    await this.emailField.fill(email);
    await this.passwordField.waitFor();
    await this.passwordField.fill(password);
    await this.registerBtn.waitFor();
    await this.registerBtn.click();
    await this.page.waitForURL(/\/signup/);
  }
}

export { RegisterPage };
