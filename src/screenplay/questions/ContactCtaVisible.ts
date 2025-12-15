import { Actor } from "../actor/Actor";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { HomePage } from "../ui/HomePage";

export class ContactCtaVisible {
  static onPage(): { answeredBy: (actor: Actor) => Promise<boolean> } {
    return {
      answeredBy: async (actor: Actor) => {
        const { page } = actor.abilityTo<BrowseTheWeb>(BrowseTheWeb.KEY);
        return await page.locator(HomePage.contactCta).first().isVisible();
      }
    };
  }
}
