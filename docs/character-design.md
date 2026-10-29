# LUMEN character design

## Brand direction

The emulator uses the supplied Lantern brand's teal-and-amber palette: teal
metalwork and interface accents with a warm amber flame and diamond-shaped
highlights. Its header features a Lantern wordmark lockup with an orbital
shard-mark inspired by the supplied logo. The character is original SVG
artwork.

## Conversational jobs

The Talk to LUMEN panel is the primary attendee flow: choose a short
conference-themed job, read LUMEN's prompt, and choose one of the proposed
responses. Follow-up questions continue the same scenario. LUMEN's reaction is
selected from the current mood; answers can change resentment, stability,
social battery, flame energy, or technical debt. Completing the job grants
XP. The job bank is offline and data-driven in `src/core/content.ts`, and
progress is part of the persisted/replayable state contract.

The conference scenarios are fictional, low-stakes, and optional. They invite
friendly conversation without requiring attendee information or disruptive
actions.

## Expressions and movement

The face uses independent brows, pupils, blinking eyelids, cheeks, and a
mouth, so expressions can react to both mood and moment-to-moment events. A
small pair of arms, handle, feet, flame, halo, and floating sparks give the
silhouette motion without obscuring it on the badge's 320×240 display.

Gameplay emits semantic animation events. The emulator maps those events to
presentation-only SVG/CSS motions:

| Trigger | Visual reaction |
|---|---|
| Idle | Blinking, gently breathing body, flickering flame, twinkling sparks |
| Positive interaction | Happy bounce and changing gaze |
| Neglect escalation | Suspicious side glance, twitching brow, restless accents |
| I'M FINE | Shaking body, oversized red flame, recovery into an awkward smile |
| Purple transition | Purple flame flare and glow, narrowed eyes, sinister smile |
| Consultant mutter | Lean-in and quiet mouth movement |
| Quest complete | Double bounce and spark burst |
| Merge conflict | Alarm shake and flame spike |
| Shake / low flame energy | Recoil / sleepy droop |

These are UI effects, not engine logic. `prefers-reduced-motion` and the
emulator's Reduce motion toggle disable the animation loops.

## Dialogue

The offline, seeded content bank has a distinct voice for every mood: confident
operational sarcasm, needy passive-aggression, the fixed I'M FINE signature
line, mischievous Purple Protocol, and wildly overconfident chaotic consulting.
Most moods have at least 12 primary phrases and multiple muttered asides.
Repeated dialogue is avoided on consecutive selections when alternatives
exist. Purple Protocol and chaotic advice are fictional simulator dialogue and
are visibly labeled **FICTIONAL DIALOGUE · DO NOT EXECUTE** in the badge
display.

Phrase content lives in `src/core/content.ts`, separate from rendering and the
behavior engine.
