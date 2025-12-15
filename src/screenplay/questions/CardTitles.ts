import { Actor } from "../actor/Actor";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { BROWSE_THE_WEB } from "../utilities/Constants";

export class CardTitles {
  static visibleTitles(cardSelector: string) {
    return {
      answeredBy: async (actor: Actor): Promise<string[]> => {
        const { page } = actor.abilityTo<BrowseTheWeb>(BROWSE_THE_WEB);
        await page.evaluate((sel) => {
          const el = document.querySelector(sel.split(' ')[0]);
          if (el) el.scrollIntoView({ behavior: 'auto', block: 'center' });
        }, cardSelector);
        await page.waitForSelector(cardSelector, { state: 'visible', timeout: 15000 });
        const titles = await page.locator(cardSelector).all();
        const texts = await Promise.all(titles.map(async (el) => (await el.textContent())?.trim() || ""));
        return texts.filter(Boolean);
      }
    };
  }
}
