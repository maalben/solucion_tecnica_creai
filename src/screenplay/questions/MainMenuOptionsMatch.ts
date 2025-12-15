import { expect } from "playwright/test";
import { MainMenuOptions } from "../questions/MainMenuOptions";

export class MainMenuOptionsMatch {
  static expected(expectedOptions: string[]) {
    return {
      answeredBy: async (actor: any): Promise<boolean> => {
        const visibleOptions = await actor.asksFor(MainMenuOptions.visibleOptions());
        for (const option of expectedOptions) {
          expect(visibleOptions).toContain(option);
        }
        return true;
      }
    };
  }
}
