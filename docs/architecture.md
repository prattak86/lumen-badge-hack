# LUMEN architecture

## Milestone 1 boundaries

The browser emulator is an interactive client of an independent behavioral
engine. It does not imitate hardware by calling browser APIs, and it does not
contain a second copy of personality logic.

```text
Browser controls ─┐
                  ├─> versionable EngineInput ─> deterministic core ─> state/events
Future badge HAL ─┘                                      │
                                                        ├─> SVG presentation
                                                        └─> local persistence
```

The badge firmware is MicroPython/Badgeware, while the development emulator is
TypeScript/React. There is no verified shared-language runtime, so the first
milestone does not introduce transpilation. The typed `EngineInput`, `Mood`,
`Attributes`, and `LumenState` contracts are the initial behavior boundary.
Recorded inputs and emitted events carry `contractVersion: 1`, simulation
timestamps, origin, type, payload, and the deterministic seed. Golden
event-sequence fixtures can be shared with a later Python port.

## Code map

- `src/core/types.ts` — input/state/event contract types.
- `src/core/engine.ts` — pure reducer, seeded dialogue selection, clock-driven
  neglect, mood transitions, red-face sequence, quests, mock encounter and
  restoration logic.
- `src/core/content.ts` — sample mood dialogue, quests, and conflict fixture.
- `src/scenarios.ts` — deterministic scenario event sequences.
- `src/components/Lantern.tsx` — presentation-only SVG lantern.
- `src/App.tsx` — browser control panel, event log, and localStorage adapter.

`reduceLumen(state, input)` returns the next state; it has no DOM, hardware,
storage, network, or wall-clock dependency. The simulation clock advances only
when given an `advance` input. Seed state is part of the state contract, making
dialogue choices replayable.

## Behavior contract

The six values are clamped to 0–100 except XP (0–10,000). Resentment rises by
five points per neglected simulated minute; stability falls by one and
technical debt rises by one. An interaction reduces resentment and restores a
small amount of social battery, stability, and flame energy.

Mood thresholds:

| Mood | Entry condition |
|---|---|
| Operational | Resentment below 25 and stability above 38 |
| Neglected | Resentment at least 25 or stability at most 38 |
| I'M FINE | Automatic outburst at resentment 55+ while neglected, subject to a five-minute simulation-time cooldown |
| Purple Protocol | Resentment at least 70 |
| Chaotic Orchestrator | Resentment at least 90 or stability at most 8 |

The I'M FINE sequence shows anger for two seconds, then forced composure for
2.5 seconds, then returns to the mood implied by attributes. Thresholds,
neglect rates, cooldown, and sequence timings are collected in the core's
`ENGINE_CONFIG` for deterministic balance tuning.

## Persistence and replay

The emulator saves a versioned key in browser local storage and offers JSON
export of the ordered input stream. Replay starts from fresh engine state and
reduces the exact recorded inputs; it does not call wall-clock timers.
Encounter identifiers are local mock fixture IDs, not attendee identities.

## Deliberate scope limits

There is no physical badge adapter, live BLE/IR communication, Wi-Fi,
multiplayer pairing, LLM, server, or external telemetry. The developer controls
record mock hardware events only. The SVG is a scalable design placeholder;
the badge renderer will need native Badgeware drawing and a small-screen layout.
