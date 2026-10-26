# LUMEN — Product Brief

**LUMEN** means **Lightweight Unstable Management & Engagement Node**. It is an original personified cartoon lantern for the GitHub Universe 2026 electronic badge: a burned-out, emotionally needy, sarcastic SRE who thinks he is orchestrating a production environment (the badge wearer's conference experience).

## Core loop
LUMEN displays expressive face/flame animations, initiates quests and encounters, reacts to button/touch/motion and other badge encounters, grants XP, and periodically delivers unsolicited DevOps advice. Neglect increases resentment; positive attention and accomplishments can restore his mood. The character should feel alive, charming, and occasionally unsettling.

## Resentment Protocol
1. **Operational** — warm gold, smug competence; "All systems nominal. Somehow, despite your involvement."
2. **Neglected** — flicker and suspicious glance; "I was reorganizing my abandonment issues."
3. **I'M FINE** — red face/flame spike for ~2 seconds, forced smile, "I'M FINE........ 😒"; subtitle "System logs indicate otherwise."
4. **Purple Protocol** — purple flame, slightly sinister smile, ethically questionable *fictional* suggestions; "Branch protection is technically optional." Mutters: "So is competent leadership, apparently."
5. **Chaotic Orchestrator** — pulsing purple, theatrical certainty; "Merge conflict? git push --force. To main. What's the worst that could happen?"

Mood depends on resentment, stability, energy, social battery, technical debt, and time. Add cooldowns, recovery, weighted contextual dialogue, and seeded deterministic behavior.

## Feature pillars
- **SideQuest OS:** conference social missions, completion, XP, achievements, and mood-aware quest pools.
- **Human Merge Conflicts:** humorous interpersonal disagreements and quick mini-game resolutions; badge-to-badge interaction eventually via verified IR/BLE APIs.
- **Sarcastic AI Consultant:** context-triggered advice, dramatic pauses, tiny under-the-breath remarks; fully functional offline without an LLM.

## Emulator-first MVP
Build a local browser representation of the actual badge display, with a character renderer, hardware mock control panel, emotional sliders, virtual clock, time acceleration, scripted scenarios, deterministic event log/replay, and persistence. Make the red-faced recovery and purple transformation especially expressive. Mock IR/BLE/Wi-Fi and LEDs until hardware interfaces are verified.

## Non-goals for first milestone
Real multiplayer networking, cloud leaderboard, live LLM, autonomous GitHub API writes, complete badge firmware, polished final sprite assets, and a full quest catalog.

## Delivery principle
One behavioral contract, browser simulator first, hardware adapter later. If firmware and browser languages differ, use compatible event/state schemas and golden scenario fixtures rather than pretending they execute identical binaries.
