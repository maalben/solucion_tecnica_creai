import { ERROR_MENU_OPTION_SELECTOR, BROWSE_THE_WEB } from "../utilities/Constants";
import { MainMenuOptions } from "../questions/MainMenuOptions";

export class ClickMenuOption {
  static named(option: string) {
    return {
      performAs: async (actor: any) => {
        const menuSelectors = await actor.asksFor(MainMenuOptions.menuSelectors());
        const selector = menuSelectors[option];
        if (!selector) throw new Error(ERROR_MENU_OPTION_SELECTOR(option));
        const { page } = actor.abilityTo(BROWSE_THE_WEB);
        await page.click(selector);
      }
    };
  }
}
