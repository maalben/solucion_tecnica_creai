import { Actor } from "../actor/Actor";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { REGEX_HOME_URL } from "../utilities/Constants";

export class UrlIsHomePage {
  static value(): { answeredBy: (actor: Actor) => Promise<boolean> } {
    return {
      answeredBy: async (actor: Actor) => {
        const { page } = actor.abilityTo<BrowseTheWeb>(BrowseTheWeb.KEY);
        return REGEX_HOME_URL.test(page.url());
      }
    };
  }
}
