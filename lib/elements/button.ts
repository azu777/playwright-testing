import { Page } from "@playwright/test";
import { BaseElement } from "./base_element";

class Button extends BaseElement {
  constructor(page, selector: string) {
    super(page, selector);
  }
}

export { Button };
