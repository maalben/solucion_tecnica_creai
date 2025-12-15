import { devices } from "playwright";
import { CUSTOM_DEVICE_NAME, BROWSE_THE_WEB, HOMEPAGE_URL } from "../utilities/Constants";
import { Open } from "./Open";
import { AcceptCookies } from "./AcceptCookies";
import { HomePage } from "../ui/HomePage";

export class OpenMobileHomepage {
  static async performAs(testEnv: any, deviceName: string = CUSTOM_DEVICE_NAME) {
    const device = devices[deviceName] || devices[CUSTOM_DEVICE_NAME];
    testEnv.context = await testEnv.browser.newContext({ ...device });
    testEnv.page = await testEnv.context.newPage();
    testEnv.actor = testEnv.actor.whoCan({ key: BROWSE_THE_WEB, value: { page: testEnv.page } });
    await testEnv.actor.attemptsTo(Open.url(HOMEPAGE_URL));
    await testEnv.actor.attemptsTo(AcceptCookies.dialog());
    await testEnv.page.waitForSelector(HomePage.navbarMenuButton, { state: 'visible', timeout: 5000 });
    await testEnv.page.waitForTimeout(5000);
  }
}
