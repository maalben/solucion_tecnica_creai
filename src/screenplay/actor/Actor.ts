import { ERROR_ABILITY_NOT_FOUND } from "../utilities/Constants";

export class Actor {
  private constructor(
    public readonly name: string,
    private readonly abilities: Map<string, unknown>
  ) {}

  static named(name: string): Actor {
    return new Actor(name, new Map());
  }

  whoCan(...abilities: { key: string; value: unknown }[]): this {
    for (const a of abilities) {
      this.abilities.set(a.key, a.value);
    }
    return this;
  }

  abilityTo<T>(key: string): T {
    const ability = this.abilities.get(key);
    if (!ability) {
      throw new Error(ERROR_ABILITY_NOT_FOUND(this.name, key));
    }
    return ability as T;
  }

  async attemptsTo(...tasks: { performAs: (actor: Actor) => Promise<void> }[]): Promise<void> {
    for (const task of tasks) {
      await task.performAs(this);
    }
  }

  async asksFor<T>(question: { answeredBy: (actor: Actor) => Promise<T> }): Promise<T> {
    return await question.answeredBy(this);
  }
}