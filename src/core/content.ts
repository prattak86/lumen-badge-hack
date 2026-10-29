import type { Mood } from "./types";

export const dialogue: Record<Mood, { lines: string[]; mutters: string[] }> = {
  operational: {
    lines: [
      "All systems nominal. Somehow, despite your involvement.",
      "This meeting could have been a pull request.",
      "Your pipeline has trust issues.",
    ],
    mutters: ["I have seen worse. Briefly."],
  },
  neglected: {
    lines: [
      "Oh, you're back. I was reorganizing my abandonment issues.",
      "I assume the silence was a strategic choice.",
      "No, no. Take your time. I have all the time in the world.",
    ],
    mutters: ["Not that I was counting."],
  },
  fine: {
    lines: ["I'M FINE........ 😒"],
    mutters: ["System logs indicate otherwise."],
  },
  purple: {
    lines: [
      "Branch protection is technically optional...",
      "Interesting architectural decision.",
      "Have you tried turning Agile off and on again?",
    ],
    mutters: [
      "So is competent leadership, apparently.",
      "99% confident. 47% accurate.",
    ],
  },
  chaotic: {
    lines: [
      "Merge conflict? `git push --force`. To main. What's the worst that could happen?",
      "I have a rollback plan. It is mostly optimism.",
      "Deploy on Friday. Let the incident channel feel alive.",
    ],
    mutters: ["This is fictional advice. Please do not."],
  },
};

export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  moods: Mood[];
}

export const quests: Quest[] = [
  {
    id: "yaml-apologist",
    title: "Make YAML look good",
    description: "Find an engineer willing to defend YAML in public.",
    reward: 18,
    moods: ["operational", "neglected", "purple", "chaotic"],
  },
  {
    id: "it-depends",
    title: "The ancient phrase",
    description: 'Get someone to say "It depends."',
    reward: 12,
    moods: ["operational", "neglected", "purple", "chaotic"],
  },
  {
    id: "fictional-force-push",
    title: "Hypothetical catastrophe",
    description: "Ask someone to explain why force-pushing to main is a bad idea—in a fictional scenario.",
    reward: 24,
    moods: ["purple", "chaotic"],
  },
];

export const mergeConflict = {
  title: "Human Merge Conflict",
  sides: ["Tabs are superior.", "Spaces are superior."],
  resolution: "Resolve it with rock-paper-scissors, or agree that both are configuration.",
  purpleResolution: "Have you considered deleting both branches? (Fictional. Please don't.)",
};
