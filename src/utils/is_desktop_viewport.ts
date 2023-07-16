import { Page } from "@playwright/test";

export const isDesktopViewport = (page: Page) => {
  const size = page.viewportSize();
  return size.width >= 600;
}
