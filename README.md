# LUMEN badge emulator

LUMEN is an offline-first, simulation-first prototype for a sarcastic cartoon
lantern on the GitHub Universe 2026 badge. The browser emulator and physical
badge will use the same event/state contract; the current milestone implements
the browser runtime and deliberately mocks hardware I/O.

## Run locally

Requirements: Node.js 20+ and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The page works without a badge. Use the
state sliders, mock hardware buttons, virtual clock, or the 12 scenario
fixtures to exercise LUMEN. Progress is saved in browser local storage.

```sh
npm test       # unit tests for deterministic engine behavior
npm run build  # type-check and create the production web build
npm run preview
```

## What's working

- Independent, deterministic TypeScript behavior engine with bounded attributes,
  seeded dialogue selection, time-based resentment, recovery, and five moods.
- Animated, expressive 3D-styled lantern SVG with the supplied Lantern
  teal-and-amber identity, orbital-shard wordmark, gesture animations, flame,
  and mood-specific facial expressions.
- A seeded phrase bank with 12+ selectable lines for most moods, no immediate
  repeats, and muttered asides.
- Timed red-face "I'M FINE" outburst, forced-composure line, and Purple
  Protocol.
- Guided conversational conference jobs with multiple-choice answers,
  mood-specific reactions, attribute changes, and XP rewards.
- Local badge display at the verified 320×240 aspect ratio, plus emotion
  controls, mock hardware events, accelerated/manual time, quests, encounters,
  event history export/replay, and repeatable scenarios.
- Sample quest, consultant dialogue, and fictional Human Merge Conflict data.

This is not a complete conference game: badge firmware, real attendee
multiplayer, IR/BLE protocols, Wi-Fi, case LED output, and deployment tooling
are not implemented. The browser controls for these are mocks only. See
[`docs/hardware-compatibility.md`](docs/hardware-compatibility.md) and
[`docs/architecture.md`](docs/architecture.md). Character and branding
direction is in [`docs/character-design.md`](docs/character-design.md).

## Hardware deployment research

The official Universe badge uses a MicroPython/Badgeware runtime, not
TypeScript. See [`docs/badge-deployment.md`](docs/badge-deployment.md) for the
verified app format and transfer workflow. Do not copy the browser application
to the badge or treat the mock networking controls as real wireless APIs.

## Project layout

```text
src/core/          deterministic engine, contracts, and content
src/components/    visual lantern renderer
src/App.tsx        browser emulator and developer controls
src/scenarios.ts   replayable scenario fixtures
docs/              verified hardware boundary and architecture notes
```
