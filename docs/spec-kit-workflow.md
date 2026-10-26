# Spec Kit Workflow for LUMEN

This repository **already has Spec Kit v1.2.3** installed, including Copilot prompt commands and custom agents. Do not run `specify init` again unless deliberately upgrading or repairing the installation.

## In VS Code GitHub Copilot Chat
1. Read `.specify/memory/constitution.md`, `docs/lumen-product-brief.md`, and this file.
2. Use `/lumen.kickoff` to load the project-specific context (or paste its contents).
3. Run `/speckit.specify` for **001-lumen-emulator-foundation**. Focus on user outcomes and acceptance tests.
4. Run `/speckit.clarify` when requirements remain ambiguous.
5. Run `/speckit.plan` after reviewing the spec. Verify badge SDK and choose cross-runtime contracts.
6. Run `/speckit.tasks`, then `/speckit.analyze` for consistency.
7. Run `/speckit.implement` in small slices; run tests and `/speckit.converge` until verified.

The installed prompt names use **dots** in VS Code (`/speckit.specify`), even though newer upstream documentation also describes hyphenated skill names. Use the commands that are actually present in this repository.

## Definition of done for milestone 1
- Browser emulator starts locally with documented commands.
- LUMEN lantern is visually recognizable and animated.
- Five moods, including red-faced I'M FINE and purple transition, are demonstrable.
- Mock events, virtual clock, and deterministic scenario replay work.
- Automated tests cover state transitions and event contracts.
- Hardware facts are documented as verified or unverified; no invented APIs.
- Feature spec, plan, tasks, and implementation remain aligned with the constitution.

## Future feature candidates
`002-sidequest-os`, `003-human-merge-conflicts`, `004-sarcastic-consultant`, `005-badge-hardware-adapter`, `006-badge-encounters`. These are planning suggestions, not committed scope.
