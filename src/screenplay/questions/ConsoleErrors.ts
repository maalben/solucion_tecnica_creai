import { Actor } from "../actor/Actor";

export class ConsoleErrors {
  private constructor() {}

  static captured(): { answeredBy: (actor: Actor) => Promise<string[]> } {
    return {
      answeredBy: async () => {
        const worldAny = globalThis as unknown as { __cucumberWorld?: { consoleErrors: string[] } };

        if (worldAny.__cucumberWorld?.consoleErrors) {
          return worldAny.__cucumberWorld.consoleErrors;
        }
        return [];
      }
    };
  }
}