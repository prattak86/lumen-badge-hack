import { describe, expect, it } from "vitest";
import { dialogue } from "./content";
import { createInitialState, reduceLumen, replayInputs, restoreState } from "./engine";
import type { EngineInput } from "./types";

const apply = (input: EngineInput) => reduceLumen(createInitialState(), input);

describe("LUMEN behavioral engine", () => {
  it("escalates from operational to neglected after five minutes", () => {
    const state = apply({ type: "advance", ms: 5 * 60_000 });
    expect(state.attributes.resentment).toBe(25);
    expect(state.mood).toBe("neglected");
  });

  it("runs the timed red-face and forced composure sequence", () => {
    let state = apply({ type: "triggerFine" });
    expect(state.sequence).toBe("anger");
    state = reduceLumen(state, { type: "advance", ms: 2_000 });
    expect(state.sequence).toBe("composure");
    expect(state.dialogue).toBe("I'M FINE........ 😒");
    expect(state.mutter).toBe("System logs indicate otherwise.");
    state = reduceLumen(state, { type: "advance", ms: 2_500 });
    expect(state.sequence).toBeNull();
    expect(state.mood).toBe("operational");
  });

  it("triggers I'M FINE at the neglect threshold and returns to Purple", () => {
    let state = apply({ type: "advance", ms: 11 * 60_000 });
    expect(state.mood).toBe("fine");
    expect(state.sequence).toBe("anger");
    state = reduceLumen(state, { type: "advance", ms: 4_500 });
    expect(state.mood).toBe("neglected");
    state = reduceLumen(state, { type: "advance", ms: 3 * 60_000 });
    expect(state.mood).toBe("purple");
  });

  it("plays the escalation through Chaotic Orchestrator during extended neglect", () => {
    const state = apply({ type: "advance", ms: 2 * 60 * 60_000 });
    expect(state.attributes.resentment).toBe(100);
    expect(state.mood).toBe("chaotic");
    expect(state.sequence).toBeNull();
  });

  it("activates Purple Protocol and can recover", () => {
    let state = apply({ type: "activatePurple" });
    expect(state.mood).toBe("purple");
    state = reduceLumen(state, { type: "recover" });
    expect(state.mood).toBe("operational");
    expect(state.attributes.resentment).toBe(0);
  });

  it("replays seeded input sequences deterministically", () => {
    const inputs: EngineInput[] = [
      { type: "advance", ms: 6 * 60_000 },
      { type: "interact", kind: "touch" },
      { type: "advance", ms: 60_000 },
    ];
    expect(replayInputs(inputs)).toEqual(replayInputs(inputs));
  });

  it("clamps debugger attribute values and records mock hardware events", () => {
    let state = apply({ type: "setAttribute", attribute: "flameEnergy", value: 150 });
    state = reduceLumen(state, { type: "hardware", kind: "ir-receive", detail: "mock packet" });
    expect(state.attributes.flameEnergy).toBe(100);
    expect(state.events.at(-1)?.type).toBe("hardware");
  });

  it("keeps a forced mood coherent with its attribute thresholds", () => {
    let state = apply({ type: "forceMood", mood: "chaotic" });
    state = reduceLumen(state, { type: "forceMood", mood: "purple" });
    expect(state.mood).toBe("purple");
    expect(state.attributes.resentment).toBe(89);
    state = reduceLumen(state, { type: "forceMood", mood: "operational" });
    expect(state.mood).toBe("operational");
    expect(state.attributes.resentment).toBe(0);
  });

  it("round-trips the versioned event history and resumes an active sequence", () => {
    let state = apply({ type: "triggerFine", origin: "test" });
    state = reduceLumen(state, { type: "advance", ms: 500, origin: "test" });
    const restored = restoreState(JSON.parse(JSON.stringify(state)));
    expect(restored?.sequence).toBe("anger");
    expect(restored?.inputHistory[0]).toMatchObject({
      contractVersion: 1,
      atMs: 0,
      origin: "test",
      type: "triggerFine",
    });
    expect(restored?.events[0]).toMatchObject({
      contractVersion: 1,
      origin: "engine",
      type: "animation",
      payload: { message: expect.any(String) },
    });
  });

  it("uses a broad phrase bank and avoids immediate repetition", () => {
    expect(dialogue.operational.lines.length).toBeGreaterThanOrEqual(12);
    expect(dialogue.neglected.lines.length).toBeGreaterThanOrEqual(12);
    expect(dialogue.purple.lines.length).toBeGreaterThanOrEqual(12);
    expect(dialogue.chaotic.lines.length).toBeGreaterThanOrEqual(12);

    let state = reduceLumen(createInitialState(), { type: "interact", kind: "touch" });
    const first = state.dialogue;
    state = reduceLumen(state, { type: "interact", kind: "touch" });
    expect(state.dialogue).not.toBe(first);
  });
});
