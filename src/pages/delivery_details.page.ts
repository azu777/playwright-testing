import { Page, Locator, expect } from '@playwright/test';

interface IUserData {
  fName: string;
  lName: string;
  address: string;
  zip: string;
  city: string;
  country: string;
}

class DeliveryDetailsPage {
  private page: Page;
  private firstNameField: Locator;
  private lastNameField: Locator;
  private streetField: Locator;
  private postCodeField: Locator;
  private cityField: Locator;
  private countryDropdown: Locator;
  private saveBtn: Locator;
  private savedDataContainer: Locator;
  private savedFirstName: Locator;
  private savedLastName: Locator;
  private savedStreet: Locator;
  private savedZip: Locator;
  private savedCity: Locator;
  private savedCountry: Locator;
  private continueToPaymentBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameField = page.locator('[data-qa="delivery-first-name"]');
    this.lastNameField = page.locator('[data-qa="delivery-last-name"]');
    this.streetField = page.locator('[data-qa="delivery-address-street"]');
    this.postCodeField = page.locator('[data-qa="delivery-postcode"]');
    this.cityField = page.locator('[data-qa="delivery-city"]');
    this.streetField = page.locator('[data-qa="delivery-address-street"]');
    this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
    this.saveBtn = page.locator('[data-qa="save-address-button"]');
    this.savedDataContainer = page.locator('[data-qa="saved-address-container"]');
    this.savedFirstName = page.locator('[data-qa="saved-address-firstName"]');
    this.savedLastName = page.locator('[data-qa="saved-address-lastName"]');
    this.savedStreet = page.locator('[data-qa="saved-address-street"]');
    this.savedZip = page.locator('[data-qa="saved-address-postcode"]');
    this.savedCity = page.locator('[data-qa="saved-address-city"]');
    this.savedCountry = page.locator('[data-qa="saved-address-country"]');
    this.continueToPaymentBtn = page.locator('[data-qa="continue-to-payment-button"]');
  }

  async fillDetails(data: IUserData): Promise<void> {
    await this.firstNameField.waitFor();
    await this.firstNameField.fill(data.fName);
    await this.lastNameField.waitFor();
    await this.lastNameField.fill(data.lName);
    await this.streetField.waitFor();
    await this.streetField.fill(data.address);
    await this.postCodeField.waitFor();
    await this.postCodeField.fill(data.zip);
    await this.cityField.waitFor();
    await this.cityField.fill(data.city);
    await this.countryDropdown.waitFor();
    await this.countryDropdown.selectOption(data.country);
  }

  async saveDetails() {
    const containersCountBefore = await this.savedDataContainer.count();

    await this.saveBtn.waitFor();
    await this.saveBtn.click();
    await this.savedDataContainer.waitFor();
    expect(this.savedDataContainer).toHaveCount(containersCountBefore + 1);
    expect(await this.savedFirstName.innerText()).toBe(await this.firstNameField.inputValue());
    expect(await this.savedLastName.innerText()).toBe(await this.lastNameField.inputValue());
    expect(await this.savedStreet.innerText()).toBe(await this.streetField.inputValue());
    expect(await this.savedZip.innerText()).toBe(await this.postCodeField.inputValue());
    expect(await this.savedCity.innerText()).toBe(await this.cityField.inputValue());
    expect(await this.savedCountry.innerText()).toBe(await this.countryDropdown.inputValue());
  }

  async goToPayment() {
    await this.continueToPaymentBtn.waitFor();
    await this.continueToPaymentBtn.click();
    await this.page.waitForURL('/payment');
  }
}

export { DeliveryDetailsPage };
