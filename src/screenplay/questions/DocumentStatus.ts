import { Actor } from "../actor/Actor";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { DOCUMENT, DOMAIN_MAIN_URL} from "../utilities/Constants"

export class DocumentStatus {
  private constructor() {}

  static latestForCreai(): { answeredBy: (actor: Actor) => Promise<number> } {
    return {
      answeredBy: async (actor: Actor) => {
        const { page } = actor.abilityTo<BrowseTheWeb>(BrowseTheWeb.KEY);

        const response = await page.waitForResponse((r) => {
          const req = r.request();
          return req.resourceType() === DOCUMENT && r.url().includes(DOMAIN_MAIN_URL);
        }, { timeout: 15_000 });

        return response.status();
      }
    };
  }
}