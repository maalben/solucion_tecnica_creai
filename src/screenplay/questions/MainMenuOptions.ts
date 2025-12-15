import { Actor } from "../actor/Actor";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { HomePage } from "../ui/HomePage";
import { BROWSE_THE_WEB } from "../utilities/Constants";

export class MainMenuOptions {
  static visibleOptions() {
    return {
      answeredBy: async (actor: Actor): Promise<string[]> => {
        const { page } = actor.abilityTo<BrowseTheWeb>(BROWSE_THE_WEB);
        const options = await MainMenuOptions.getVisibleMenuOptions(page);
        if (options) return options;
        return MainMenuOptions.getDesktopMenuOptions(page);
      }
    };
  }

  private static async getVisibleMenuOptions(page: any): Promise<string[] | null> {
    const menus = page.locator(HomePage.navbarMenu);
    const count = await menus.count();
    for (let i = 0; i < count; i++) {
      const menu = menus.nth(i);
      if (await menu.isVisible()) {
        await MainMenuOptions.expandDropdownIfNeeded(menu, HomePage.mobileDropdownToggle);
        return MainMenuOptions.extractMenuOptions(menu);
      }
    }
    return null;
  }

  private static async expandDropdownIfNeeded(menu: any, toggleSelector: string) {
    const dropdownToggle = menu.locator(toggleSelector).first();
    if (await dropdownToggle.count() > 0) {
      const expanded = await dropdownToggle.getAttribute(HomePage.ariaExpanded);
      if (expanded !== 'true') {
        await dropdownToggle.click();
        await menu.locator(HomePage.openDropdownList).first().waitFor({ state: 'visible', timeout: 3000 }).catch(() => {});
      }
    }
  }

  private static async extractMenuOptions(menu: any): Promise<string[]> {
    const menuLinks = menu.locator(HomePage.menuLinksSelector).first();
    const children = await menuLinks.locator('> *').all();
    const childrenTexts = await Promise.all(children.map(async (el: any) => (await el.textContent())?.trim() || ""));
    let options: string[] = [];
    if (childrenTexts.length > 0) {
      const firstChild = childrenTexts[0];
      const label = firstChild.split('\n')[0].trim();
      if (label) options.push(label);
    }
    for (let j = 1; j < childrenTexts.length; j++) {
      const text = childrenTexts[j].trim();
      if (text) options.push(text);
    }
    return options;
  }

  private static async getDesktopMenuOptions(page: any): Promise<string[]> {
    const menu = page.locator(HomePage.mainMenu);
    await MainMenuOptions.expandDropdownIfNeeded(menu, HomePage.dropdownToggleSelector);
    let servicesText = "";
    const dropdownLabel = menu.locator(HomePage.dropdownLabelSelector).first();
    if (await dropdownLabel.count() > 0) {
      servicesText = (await dropdownLabel.textContent())?.trim() || "";
    }
    const otherOptions = await menu.locator(HomePage.otherMenuOptionsSelector).allTextContents();
    const trimmedOptions = otherOptions.map((t: string) => t.trim());
    return servicesText ? [servicesText, ...trimmedOptions] : trimmedOptions;
  }
  static menuSelectors() {
    return {
      answeredBy: async (actor: Actor): Promise<Record<string, string>> => {
        const { page } = actor.abilityTo<BrowseTheWeb>(BROWSE_THE_WEB);
        const menu = page.locator(HomePage.mainMenu);
        const options = await menu.locator(HomePage.menuOptionsSelector).all();
        const mapping: Record<string, string> = {};
        for (const el of options) {
          const text = (await el.textContent())?.trim() || "";
          if (text) {
            const selector = await el.evaluate((node) => {
              return node.id ? `#${node.id}` : `${node.tagName.toLowerCase()}:has-text("${node.textContent?.trim()}")`;
            });
            mapping[text] = selector;
          }
        }
        return mapping;
      }
    };
  }
}
