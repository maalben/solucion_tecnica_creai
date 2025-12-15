import { Actor } from "../actor/Actor";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { HomePage } from "../ui/HomePage";

export class AcceptCookies {
  static dialog(): { performAs: (actor: Actor) => Promise<void> } {
    return {
      performAs: async (actor: Actor) => {
        const { page } = actor.abilityTo<BrowseTheWeb>(BrowseTheWeb.KEY);
        const cookieButton = page.locator(HomePage.cookieAcceptButton);
        await cookieButton.click();
      }
    };
  }
}
