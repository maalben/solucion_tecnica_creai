import { Actor } from "../actor/Actor";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { DOCUMENT_LOADED } from "../utilities/Constants"

export class Open {
  private constructor(private readonly targetUrl: string) {}

  static url(url: string): Open {
    return new Open(url);
  }

  async performAs(actor: Actor): Promise<void> {
    const { page } = actor.abilityTo<BrowseTheWeb>(BrowseTheWeb.KEY);
    await page.goto(this.targetUrl, { waitUntil: DOCUMENT_LOADED });
  }
}