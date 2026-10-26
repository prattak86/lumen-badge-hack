---
description: "Initialize LUMEN feature planning using the existing Spec Kit setup"
---
# LUMEN Spec Kit kickoff

You are working in `prattak86/lumen-badge-hack`. The repo already contains GitHub Spec Kit v1.2.3, including `.specify/`, `.github/agents/`, and `.github/prompts/`. Do not reinstall Spec Kit or overwrite its generated files.

Read, in order:
1. `.specify/memory/constitution.md`
2. `docs/lumen-product-brief.md`
3. `docs/spec-kit-workflow.md`
4. `.specify/README.md`

Your first objective is to plan **001-lumen-emulator-foundation**, a browser-based, visually representative badge simulator with mocked physical inputs. Use the installed Spec Kit workflow and stop at each review gate when requested. In VS Code Copilot Chat, invoke the existing commands `/speckit.specify`, `/speckit.clarify` (if needed), `/speckit.plan`, `/speckit.tasks`, `/speckit.analyze`, `/speckit.implement`, and `/speckit.converge` one at a time.

Specification outcomes:
- Original personified cartoon lantern with expressive flame, face, and animation cues.
- Event-driven deterministic resentment engine with five moods: Operational, Neglected, I'M FINE, Purple Protocol, Chaotic Orchestrator.
- Neglect triggers a short red-faced anger spike, followed by forced composure and "I'M FINE........ 😒"; Purple Protocol brings subtly sinister jokes, under-the-breath muttering, and fictional destructive DevOps advice.
- Browser emulator renders a badge-sized display with mock buttons, touch, motion, IR/BLE, clock acceleration, emotional-state controls, event inspector, and repeatable scenarios.
- Data-driven side quests, Human Merge Conflicts, and Sarcastic AI Consultant dialogue should have interfaces and sample fixtures, not complete multiplayer implementations.
- No live GitHub destructive operations. Core behavior offline. Document hardware verification and unknowns.

Before implementation, inspect actual badge SDK/docs (start with https://github.com/badger/home and https://badger.github.io/), confirm hardware and deployment compatibility, and choose a browser/firmware contract strategy. Never invent hardware APIs.

For this kickoff, produce the feature specification and acceptance scenarios first. Do not generate a large application before a reviewed plan. If Spec Kit commands are not available, report that and point to the existing repository installation; do not silently substitute unrelated scaffolding.
