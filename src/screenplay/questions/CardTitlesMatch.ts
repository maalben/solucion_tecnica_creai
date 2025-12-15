import { ERROR_NO_CARD_TITLES, ERROR_CARD_TITLES_MISMATCH } from "../utilities/Constants";
import { arraysHaveSameElements } from "../utilities/utils";
import { CardTitles } from "./CardTitles";

export class CardTitlesMatch {
  static expectedWithSelector(expectedTitles: string[], selector: string) {
    return {
      answeredBy: async (actor: any): Promise<boolean> => {
        let visibleTitles: string[] = [];
        const maxRetries = 10;
        let retries = 0;
        while (retries < maxRetries) {
          visibleTitles = await actor.asksFor(CardTitles.visibleTitles(selector));
          if (visibleTitles.length >= expectedTitles.length) break;
          await new Promise(res => setTimeout(res, 500));
          retries++;
        }
        if (visibleTitles.length === 0) {
          throw new Error(ERROR_NO_CARD_TITLES);
        }
        if (!arraysHaveSameElements(expectedTitles, visibleTitles)) {
          throw new Error(ERROR_CARD_TITLES_MISMATCH(expectedTitles, visibleTitles));
        }
        return true;
      }
    };
  }
}
