import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "playwright/test";
import type { TestEnvironment } from "../support/TestEnvironment";
import { Open } from "../../src/screenplay/tasks/Open";
import { DocumentStatus } from "../../src/screenplay/questions/DocumentStatus";
import { UrlIsHomePage } from "../../src/screenplay/questions/UrlIsHomePage";
import { NoConsoleErrors } from "../../src/screenplay/questions/NoConsoleErrors";
import { LogoVisible } from "../../src/screenplay/questions/LogoVisible";
import { ContactCtaVisible } from "../../src/screenplay/questions/ContactCtaVisible";
import { ERROR_ACTOR_NOT_INITIALIZED, HOMEPAGE_URL, ERROR_CONSOLE_ERRORS } from "../../src/screenplay/utilities/Constants";
import { AcceptCookies } from "../../src/screenplay/tasks/AcceptCookies";
import { MainMenuOptionsMatch } from "../../src/screenplay/questions/MainMenuOptionsMatch";
import { HomePage } from "../../src/screenplay/ui/HomePage";
import { CardTitlesMatch } from "../../src/screenplay/questions/CardTitlesMatch";
import { ClickMenuOption } from "../../src/screenplay/tasks/ClickMenuOption";
import { OpenMobileHomepage } from "../../src/screenplay/tasks/OpenMobileHomepage";
import { OpenMobileMenu } from "../../src/screenplay/tasks/OpenMobileMenu";

Given("the user opens the public homepage", async function (this: TestEnvironment) {
  if (!this.actor) {
    throw new Error(ERROR_ACTOR_NOT_INITIALIZED);
  }
  await this.actor.attemptsTo(Open.url(HOMEPAGE_URL));
  const isHome = await this.actor.asksFor(UrlIsHomePage.value());
  expect(isHome).toBe(true);
  await this.actor.attemptsTo(AcceptCookies.dialog());
});

Then("the main document should respond with status 200", { timeout: 20000 }, async function (this: TestEnvironment) {
  const status = await this.actor.asksFor(DocumentStatus.latestForCreai());
  expect(status).toBe(200);
});

Then("there should be no console errors", async function (this: TestEnvironment) {
  const noErrors = NoConsoleErrors.present().answeredBy(this.actor, this);
  expect(noErrors, ERROR_CONSOLE_ERRORS(this.consoleErrors)).toBe(true);
});

Then("the logo should be visible", async function (this: TestEnvironment) {
  const visible = await this.actor.asksFor(LogoVisible.onPage());
  expect(visible).toBe(true);
});

Then("a visible contact CTA should exist", async function (this: TestEnvironment) {
  const visible = await this.actor.asksFor(ContactCtaVisible.onPage());
  expect(visible).toBe(true);
});

Then("the homepage cards section should display the following titles:", async function (this: TestEnvironment, dataTable) {
  const expectedTitles = dataTable.raw().map((row: string[]) => row[0]);
  const result = await this.actor.asksFor(
    CardTitlesMatch.expectedWithSelector(expectedTitles, HomePage.cardTitle)
  );
  expect(result).toBe(true);
});

Then("the cards section should display the following titles:", async function (this: TestEnvironment, dataTable) {
  const expectedTitles = dataTable.raw().map((row: string[]) => row[0]);
  const result = await this.actor.asksFor(
    CardTitlesMatch.expectedWithSelector(expectedTitles, HomePage.blogCardTitle)
  );
  expect(result).toBe(true);
});

When('the user clicks on the {string} menu option', { timeout: 15000 }, async function (this: TestEnvironment, menuOption: string) {
  await this.actor.attemptsTo(
    ClickMenuOption.named(menuOption)
  );
});

Given("the user opens the public homepage in mobile mode with device {string}", { timeout: 30000 }, async function (this: TestEnvironment, deviceName: string) {
  await OpenMobileHomepage.performAs(this, deviceName);
});

When("the user opens the mobile menu", async function (this: TestEnvironment) {
  await OpenMobileMenu.performAs(this);
});

Then("the main menu should have the options:", async function (this: TestEnvironment, dataTable) {
  const expectedOptions = dataTable.raw().map((row: string[]) => row[0]);
  const result = await MainMenuOptionsMatch.expected(expectedOptions).answeredBy(this.actor);
  expect(result).toBe(true);
});