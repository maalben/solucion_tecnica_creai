import { Actor } from "../actor/Actor";
import { TestEnvironment } from "../../../features/support/TestEnvironment";

export class NoConsoleErrors {
  static present(): { answeredBy: (actor: Actor, world: TestEnvironment) => boolean } {
    return {
      answeredBy: (_actor: Actor, world: TestEnvironment) => {
        return world.consoleErrors.length === 0;
      }
    };
  }
}
