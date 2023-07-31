import { Locator, Page } from "@playwright/test";

const childrenList = ['Text', 'Button', 'Input'];

const getElementPropertyNames = function (ctx) {
  const properties = Object.getOwnPropertyNames(ctx).reduce((propertyNames, value) => {
    const { name: childName } = ctx[value].constructor;

    if (childrenList.includes(childName) || childName.includes('Fragment')) {
      propertyNames[value] = null;
    }

    return propertyNames;
  }, {});

  return Object.keys(properties).length ? properties : null;
};


class BaseImplementation {
  protected page: Page;
  protected selector: string;

  constructor(page, selector = 'body') {
    this.page = page;
    this.selector = selector;
  }

  initChild(Child, selector): any {
    return new Child(this.page.locator(selector));
  }

  async waitForPageReadiness(): Promise<void> {
    await this.page.locator(this.selector).waitFor({ state: 'visible', timeout: 20_000 });
  }

  async click(dataObj): Promise<any> {
    await this.waitForPageReadiness();

    for (const key of Object.keys(dataObj)) {
      await this[key].click(dataObj[key]);
    }
  }

  async fill(dataObj): Promise<any> {
    await this.waitForPageReadiness();

    for (const key of Object.keys(dataObj)) {
      await this[key].fill(dataObj[key]);
    }
  }

  async get(dataObj): Promise<any> {
    let getObj = { ...dataObj };

    if (getObj === null || !Object.keys(dataObj).length) {
      getObj = getElementPropertyNames(this);
    }

    await this.waitForPageReadiness();

    const values = {};

    for (const key of Object.keys(getObj)) {
      values[key] = await this[key].get(getObj[key]);
    }

    return values;
  }

  async scrollTo(dataObj): Promise<any> {
    await this.waitForPageReadiness();

    for (const key of Object.keys(dataObj)) {
      await this[key].scrollTo(dataObj[key]);
    }
  }

  async isVisible(dataObj): Promise<any> {
    await this.waitForPageReadiness();

    if (dataObj === null) {
      return this.page.locator(this.selector).isVisible();
    }
    const values = {};

    for (const key of Object.keys(dataObj)) {
      values[key] = await this[key].isVisible(dataObj[key]);
    }

    return values;
  }
}

export { BaseImplementation }
