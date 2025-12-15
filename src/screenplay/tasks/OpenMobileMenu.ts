import { HomePage } from "../ui/HomePage";

export class OpenMobileMenu {
  static async performAs(testEnv: any) {
    const hamburgerSelector = HomePage.navbarMenuButton;
    await testEnv.page.waitForSelector(hamburgerSelector, { state: 'visible', timeout: 10000 });
    await testEnv.page.click(hamburgerSelector);
    await testEnv.page.waitForTimeout(5000);
  }
}
