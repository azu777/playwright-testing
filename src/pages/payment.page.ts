import { Page, Locator, expect } from '@playwright/test';

interface IPaymentData {
  owner: string;
  number: string;
  date: string;
  cvc: string;
}

class PaymentPage {
  private page: Page;
  private discountCode: Locator;
  private discountCodeField: Locator;
  private submitDiscountBtn: Locator;
  private discountActivated: Locator;
  private total: Locator;
  private totalWithDiscount: Locator;
  private creditCardOwnerField: Locator;
  private creditCardNumberField: Locator;
  private validUntilField: Locator;
  private creditCardCvcField: Locator;
  private payBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountCodeField = page.locator('[data-qa="discount-code-input"]');
    this.submitDiscountBtn = page.locator('[data-qa="submit-discount-button"]');
    this.discountActivated = page.locator('[data-qa="discount-active-message"]');
    this.total = page.locator('[data-qa="total-value"]');
    this.totalWithDiscount = page.locator('[data-qa="total-with-discount-value"]');
    this.creditCardOwnerField = page.locator('[data-qa="credit-card-owner"]');
    this.creditCardNumberField = page.locator('[data-qa="credit-card-number"]');
    this.validUntilField = page.locator('[data-qa="valid-until"]');
    this.creditCardCvcField = page.locator('[data-qa="credit-card-cvc"]');
    this.payBtn = page.locator('[data-qa="pay-button"]');
  }

  async activateDiscount() {
    expect(await this.totalWithDiscount.isVisible()).toBe(false);
    await this.discountCode.waitFor();
    const code = await this.discountCode.innerText();
    await this.discountCodeField.waitFor();

    // opt 1 - using .fill():
    await this.discountCodeField.fill(code);
    await expect(this.discountCodeField).toHaveValue(code);

    // opt 2 - using slow typing:
    // await this.discountCodeField.focus();
    // await this.page.keyboard.type(code, { delay: 1000 });
    // expect(await this.discountCodeField.inputValue()).toBe(code);

    await this.submitDiscountBtn.waitFor();
    await this.submitDiscountBtn.click();

    await this.discountActivated.waitFor();
    expect(parseInt((await this.total.innerText()).replace('$', ''), 10))
      .toBeGreaterThan(parseInt((await this.totalWithDiscount.innerText()).replace('$', ''), 10));
  }

  async setPaymentDetails(data: IPaymentData) {
    await this.creditCardOwnerField.waitFor();
    await this.creditCardOwnerField.fill(data.owner);
    await this.creditCardNumberField.waitFor();
    await this.creditCardNumberField.fill(data.number);
    await this.validUntilField.waitFor();
    await this.validUntilField.fill(data.date);
    await this.creditCardCvcField.waitFor();
    await this.creditCardCvcField.fill(data.cvc);
  }

  async completePayment() {
    await this.payBtn.waitFor();
    await this.payBtn.click();
    await this.page.waitForURL(/\/thank-you/, { timeout: 3_000 });
  }
}

export { PaymentPage };
