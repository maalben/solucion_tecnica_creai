import { setWorldConstructor } from "@cucumber/cucumber";
import type { Browser, BrowserContext, Page } from "playwright";
import { chromium } from "playwright";
import { Actor } from "../../src/screenplay/actor/Actor";
import { BrowseTheWeb } from "../../src/screenplay/abilities/BrowseTheWeb";
import { ACTOR } from "../../src/screenplay/utilities/Constants"

export class TestEnvironment {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  actor!: Actor;
  navigationDocumentStatus?: number;
  consoleErrors: string[] = [];

  async init(): Promise<void> {
    const headless = false;
    this.browser = await chromium.launch({ headless });
    this.context = await this.browser.newContext({ 
      ignoreHTTPSErrors: true,
      viewport: { width: 1280, height: 720 },
      screen: { width: 1280, height: 720 }
    });
    this.page = await this.context.newPage();
    this.actor = Actor.named(ACTOR).whoCan(BrowseTheWeb.using(this.page));
  }

  async dispose(): Promise<void> {
    await this.context?.close().catch(() => {});
    await this.browser?.close().catch(() => {});
  }
}

setWorldConstructor(TestEnvironment);