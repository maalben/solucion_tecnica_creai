import { Before, After, Status } from "@cucumber/cucumber";
import type { TestEnvironment } from "./TestEnvironment";
import { DOMAIN_MAIN_URL } from "../../src/screenplay/utilities/Constants";

Before(async function (this: TestEnvironment) {
  await this.init();

  const page = this.page;

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      this.consoleErrors.push(`[console.${msg.type()}] ${msg.text()}`);
    }
  });

  page.on("pageerror", (err) => {
    this.consoleErrors.push(`[pageerror] ${String((err as any)?.message || err)}`);
  });

  page.on("response", (response) => {
    const req = response.request();
    if (req.resourceType() === "document") {
      const url = response.url();
      if (url.includes(DOMAIN_MAIN_URL)) {
        this.navigationDocumentStatus = response.status();
      }
    }
  });
});

After(async function (this: TestEnvironment, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    await this.page
      .screenshot({ path: "test-results/failure.png", fullPage: true })
      .catch(() => {});
  }
  await this.dispose();
});