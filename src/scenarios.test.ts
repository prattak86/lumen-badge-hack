import { describe, expect, it } from "vitest";
import { createInitialState, reduceLumen } from "./core/engine";
import { scenarios } from "./scenarios";

function runScenario(id: string) {
  const scenario = scenarios.find((item) => item.id === id);
  if (!scenario) throw new Error(`Unknown scenario: ${id}`);
  return scenario.inputs.reduce(reduceLumen, createInitialState());
}

describe("scenario fixtures", () => {
  it("replays every scenario deterministically", () => {
    for (const scenario of scenarios) {
      expect(runScenario(scenario.id)).toEqual(runScenario(scenario.id));
    }
  });

  it("covers the expected milestone outcomes", () => {
    expect(runScenario("five-minutes").mood).toBe("neglected");
    expect(runScenario("extended-neglect").mood).toBe("chaotic");
    expect(runScenario("fine").sequence).toBe("anger");
    expect(runScenario("purple").mood).toBe("purple");
    expect(runScenario("recover").mood).toBe("operational");
    expect(runScenario("quest-complete").attributes.xp).toBe(18);
    expect(runScenario("quest-fail").questStatus).toBe("failed");
    expect(runScenario("merge-conflict").encounter).toBe("tabs-vs-spaces");
    expect(runScenario("ir-encounter").attributes.xp).toBe(10);
    expect(runScenario("consultant").events.some((item) => item.type === "dialogue")).toBe(true);
    expect(runScenario("conference-day").questStatus).toBe("complete");
  });
});
