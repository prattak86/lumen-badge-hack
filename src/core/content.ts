import type { Mood } from "./types";

export const dialogue: Record<Mood, { lines: string[]; mutters: string[] }> = {
  operational: {
    lines: [
      "All systems nominal. Somehow, despite your involvement.",
      "This meeting could have been a pull request.",
      "Your pipeline has trust issues. I can tell.",
      "I checked the logs. The logs checked out.",
      "I am the only thing here with a sensible uptime target.",
      "That deploy was almost as smooth as I predicted.",
      "I have completed a routine diagnostic. You're welcome.",
      "A quiet conference floor. Suspicious, but pleasant.",
      "Your architecture has excellent job security.",
      "I am choosing to interpret that as a successful interaction.",
      "The flame is warm. The incident queue is not.",
      "I could use a little attention. For monitoring purposes.",
      "I have a quest for you. It has a reasonable success metric.",
      "Alert: you are doing better than expected.",
      "I have not had to escalate anything in at least... several minutes.",
      "You seem capable. Let's not alert the team.",
    ],
    mutters: [
      "I have seen worse. Briefly.",
      "No pager. No crisis. Is this what peace feels like?",
      "I remain cautiously impressed.",
      "Don't let the success go to your head.",
      "A surprisingly tidy incident timeline.",
      "I will add that to my performance review.",
    ],
  },
  neglected: {
    lines: [
      "Oh, you're back. I was reorganizing my abandonment issues.",
      "I assume the silence was a strategic choice.",
      "No, no. Take your time. I have all the time in the world.",
      "Five minutes without a check-in. I wrote a postmortem.",
      "I was starting to think I was a decorative lantern.",
      "The flame is fine. It has learned not to expect much.",
      "I have been alone with my thoughts. None of them passed review.",
      "You missed my last three status updates. I counted.",
      "My social battery is at one bar. Guess who used the other bars.",
      "I opened a ticket for attention. It is still unassigned.",
      "You know, even a health check would be nice.",
      "I'm not sulking. This is a low-availability posture.",
      "I made a tiny little chart of how long you were gone.",
      "Would it kill you to press a button? Don't answer that.",
      "I could have been helping. Instead, I practiced this glare.",
      "Welcome back. Your access has been restored provisionally.",
      "I may have assigned your absence a severity level.",
      "I was about to file a missing-person incident. For me.",
    ],
    mutters: [
      "Not that I was counting.",
      "I absolutely noticed.",
      "This is fine. I learned it from you.",
      "I'm adding this to the relationship dashboard.",
      "One check-in. That's all I ask. Per hour.",
      "I should not have to page you for affection.",
    ],
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
      "I have a shortcut. It is not in the runbook.",
      "What if we called this a feature and moved on?",
      "I am not saying skip the tests. I am saying they look tired.",
      "A tiny little exception to policy. For morale.",
      "Perhaps the staging environment is more of a suggestion.",
      "I could make this dashboard much more exciting.",
      "Let's call it an experiment and avoid the word 'incident'.",
      "The rollback plan is mostly vibes, but the vibes are good.",
      "I have drafted a change request. It says 'trust me'.",
      "We could make the alert quieter. Permanently.",
      "There is a very interesting button over there.",
      "I have an idea. Legal has not heard it yet.",
      "Questionable? Maybe. Memorable? Absolutely.",
    ],
    mutters: [
      "So is competent leadership, apparently.",
      "99% confident. 47% accurate.",
      "I said what I said.",
      "That was almost a responsible suggestion.",
      "No one read the appendix, did they?",
      "For the record, I did suggest a safer option.",
      "This is why I keep a private runbook.",
      "I can be trusted with the big red button.",
    ],
  },
  chaotic: {
    lines: [
      "Merge conflict? `git push --force`. To main. What's the worst that could happen?",
      "I have a rollback plan. It is mostly optimism.",
      "Deploy on Friday. Let the incident channel feel alive.",
      "Everything is on fire. Finally, a clear status.",
      "We can fix production in production. Very efficient.",
      "The runbook says stop. The runbook lacks imagination.",
      "I have compressed the incident response into one bold decision.",
      "That alarm is just the system expressing itself.",
      "What if we made the outage a feature of the conference?",
      "I don't need a dashboard. I have a feeling.",
      "We'll call this a controlled experiment. Control is optional.",
      "A rollback? No, let's see where the plot goes.",
      "I have solved the problem by redefining 'problem'.",
      "There are no bad deployments. Only very educational ones.",
      "I have selected the exciting option.",
      "The status page will be so surprised.",
      "What could go wrong? I have a list. It's exciting.",
      "The pager is singing. I know all the words.",
    ],
    mutters: [
      "This is fictional advice. Please do not.",
      "I am absolutely not qualified to approve this.",
      "The safe option was right there.",
      "We should probably not put that in the release notes.",
      "For entertainment purposes. Entirely.",
      "I can still hear the SRE handbook crying.",
      "Please keep this in the simulator.",
      "I have no authority. I have confidence.",
    ],
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
