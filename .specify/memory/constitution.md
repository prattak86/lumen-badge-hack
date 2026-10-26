# LUMEN Constitution

## Core Principles

### I. Simulation-first, hardware-honest
Build and validate behavior in a browser emulator before deploying to the GitHub Universe badge. Hardware features, memory budgets, display geometry, SDK APIs, and deployment steps MUST be verified from official badge sources; unverified capabilities MUST be labeled assumptions and mocked behind adapters.

### II. Deterministic portable behavior
Personality, mood, quests, encounters, dialogue, and progression MUST use an event-driven state model with an injectable clock and seeded randomness. Rendering, persistence, and hardware I/O MUST be separated from behavior. If browser and firmware cannot share source code, they MUST share versioned event/state contracts and golden fixtures.

### III. Character-first experience
LUMEN is an original expressive cartoon lantern and a sarcastic, emotionally needy SRE. His flame, face, dialogue, and animations MUST respond coherently to state. Neglect escalates through Operational, Neglected, I'M FINE (brief red flash and forced recovery), Purple Protocol, and Chaotic Orchestrator. Recovery and cooldowns MUST be supported. Humor MUST remain contextual and non-repetitive.

### IV. Offline-first, bounded and consentful
Core functionality MUST work offline. Local progress MUST persist safely within available storage. Badge-to-badge encounters MUST be opt-in, rate-limited, and avoid collecting personal information by default. Wi-Fi or cloud functionality is optional, with no embedded credentials or unexpected network traffic.

### V. Safe simulated mischief
Purple Protocol MAY joke about disabling branch protections, deleting branches, or force-pushing. Such suggestions MUST remain fictional dialogue or isolated simulations. No actual destructive Git operations, unauthorized configuration changes, harassment, or conference disruption. User-controlled escape/reset and clear fictional context are required.

### VI. Tests and observability
Every state transition, mood threshold, cooldown, clock-dependent effect, and event contract MUST have automated tests. Emulator MUST expose mock inputs, state inspector, virtual clock, event history, scenario replay, and deterministic fixture export. New functionality requires a verifiable acceptance scenario.

### VII. Incremental delivery and maintainability
Prefer small, independently demonstrable vertical slices. Avoid premature backend services, unnecessary dependencies, and speculative hardware drivers. Content SHOULD be data-driven and versioned. Architectural deviations MUST be documented with tradeoffs.

## Technology and Product Constraints

- Browser emulator: prefer TypeScript, Vite, React and lightweight SVG/Canvas rendering, subject to the implementation plan.
- Firmware runtime: select only after verifying actual badge documentation; do not claim shared TypeScript runtime on a MicroPython badge.
- Core event schema: timestamp, type, payload, origin, and optional deterministic seed; explicitly version contracts.
- Persistence and networking: use adapters with in-memory mocks for initial development.
- Accessibility: readable small-display text, clear visual contrast, reduced-motion option in emulator.
- Privacy: minimize stored encounter data; never store tokens or personally identifying encounter payloads by default.

## Spec-Driven Workflow and Quality Gates

Use the existing Spec Kit installation; do not overwrite generated templates, scripts, agents, or prompts. For each feature: specify user outcomes and acceptance scenarios, clarify uncertainties, plan architecture and research, decompose tasks, analyze consistency, implement, test, and converge. Prefer first feature: `001-lumen-emulator-foundation`.

Milestone 1 MUST demonstrate an animated lantern, deterministic emotional transitions, red-faced I'M FINE sequence, Purple Protocol, mocked controls, time travel, and event inspector in a running browser emulator. Document any firmware assumptions explicitly.

PRs MUST report tests run, scope exclusions, unresolved hardware facts, and constitution compliance. Do not claim tests pass unless actually executed.

## Governance

This constitution governs feature specs, plans, tasks, and implementations. Changes require an explained rationale, updated version, and review. Breaking changes to state/event contracts require fixture updates and migration notes. Prefer the simplest compliant implementation.

**Version**: 1.0.0 | **Ratified**: 2026-10-25 | **Last Amended**: 2026-10-25
