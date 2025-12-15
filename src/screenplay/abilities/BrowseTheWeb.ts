import type { Page } from "playwright";
import { BROWSE_THE_WEB } from "../utilities/Constants"

export class BrowseTheWeb {
  static readonly KEY = BROWSE_THE_WEB;

  private constructor(public readonly page: Page) {}

  static using(page: Page): { key: string; value: BrowseTheWeb } {
    return { key: BrowseTheWeb.KEY, value: new BrowseTheWeb(page) };
  }
}