# LUMEN character design

## Brand direction

The emulator borrows the supplied Lantern brand's teal-and-amber palette:
teal metalwork and interface accents with a warm amber flame and small
diamond-shaped highlights. The lantern character is original SVG artwork; the
company wordmark and logo files are not reproduced in the illustration.

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
