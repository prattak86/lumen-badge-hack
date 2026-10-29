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

export interface ConversationChoice {
  id: string;
  label: string;
  response: string;
  moodResponses?: Partial<Record<Mood, string>>;
  effects: {
    resentment?: number;
    stability?: number;
    socialBattery?: number;
    flameEnergy?: number;
    technicalDebt?: number;
  };
}

export interface ConversationQuestion {
  prompt: string;
  choices: ConversationChoice[];
}

export interface ConversationJob {
  id: string;
  title: string;
  brief: string;
  moods: Mood[];
  reward: number;
  questions: ConversationQuestion[];
}

export const conversationJobs: ConversationJob[] = [
  {
    id: "incident-comms",
    title: "Incident Comms: The Coffee Spill",
    brief: "A conference coffee station is down. LUMEN needs your incident plan.",
    moods: ["operational", "neglected", "fine", "purple", "chaotic"],
    reward: 16,
    questions: [
      {
        prompt: "The coffee machine has stopped responding. What do you do first?",
        choices: [
          {
            id: "check-impact",
            label: "Check who is affected before paging the entire floor.",
            response: "A measured blast radius. I hate how much I respect that.",
            moodResponses: {
              neglected: "A thoughtful check-in before escalation? I see how it is.",
              fine: "Calm triage. I'm calm too. Extremely calm.",
              purple: "Responsible. Unexpected, but responsible.",
              chaotic: "You checked impact first? There goes my dramatic incident bridge.",
            },
            effects: { stability: 4, resentment: -3, technicalDebt: -2 },
          },
          {
            id: "announce-incident",
            label: "Declare a beverage-related incident and open a bridge.",
            response: "Finally, an incident with a clear and delicious service owner.",
            moodResponses: {
              neglected: "You opened a bridge and still didn't invite me? Noted.",
              fine: "A bridge. Great. More witnesses to my composure.",
              purple: "Excellent. Give the incident a dramatic name.",
              chaotic: "YES. Severity one: caffeine unavailable. I'm alerting everyone.",
            },
            effects: { resentment: 2, flameEnergy: 3, socialBattery: 2 },
          },
          {
            id: "restart-machine",
            label: "Turn it off and on. Call it a recovery strategy.",
            response: "A classic. If anyone asks, we ran a thorough diagnostic.",
            moodResponses: {
              neglected: "Rebooting the machine gets attention. Interesting strategy.",
              fine: "A reboot. I too would like a reboot. I SAID I'M FINE.",
              purple: "Now we're talking. Don't document the restart.",
              chaotic: "Power-cycle the coffee. Then power-cycle the entire conference.",
            },
            effects: { stability: -2, technicalDebt: 4, flameEnergy: 2 },
          },
        ],
      },
      {
        prompt: "The machine is back. How do you close the incident?",
        choices: [
          {
            id: "write-postmortem",
            label: "Write a tiny, blameless postmortem.",
            response: "Blameless and brief. An almost suspicious amount of maturity.",
            moodResponses: {
              neglected: "You wrote something down. I also write things down. For attention.",
              purple: "Blameless? Fine. I'll keep my extremely pointed footnotes private.",
              chaotic: "A postmortem? Can we call it a coffee-mortem and add charts?",
            },
            effects: { stability: 3, technicalDebt: -3, resentment: -2 },
          },
          {
            id: "declare-victory",
            label: "Declare victory before it changes its mind.",
            response: "A bold close. The dashboard says green, so it must be true.",
            moodResponses: {
              neglected: "You declared victory without telling me. I prepared confetti.",
              purple: "Close it fast. Questions are how process gets involved.",
              chaotic: "VICTORY. No follow-up, no notes, no evidence. Perfect.",
            },
            effects: { flameEnergy: 2, technicalDebt: 3 },
          },
          {
            id: "bring-lumen-coffee",
            label: "Bring LUMEN a pretend cup. He runs on validation.",
            response: "I don't have hands. I do have standards. This counts.",
            moodResponses: {
              neglected: "For me? I mean, obviously I don't need it. Keep it there.",
              fine: "A peace offering. I accept it in a very normal way.",
              purple: "A bribe. How delightfully governance-adjacent.",
              chaotic: "I have consumed the imaginary coffee. I can see the logs.",
            },
            effects: { resentment: -8, socialBattery: 8, flameEnergy: 5, stability: 2 },
          },
        ],
      },
    ],
  },
  {
    id: "architecture-review",
    title: "Architecture Review: The Mystery Box",
    brief: "A service has one box labeled 'probably important'. Decide what to do.",
    moods: ["operational", "neglected", "purple", "chaotic"],
    reward: 20,
    questions: [
      {
        prompt: "Nobody knows what the box does. What's your next move?",
        choices: [
          {
            id: "trace-dependencies",
            label: "Trace its dependencies before touching anything.",
            response: "You chose evidence over excitement. I will try to recover.",
            moodResponses: {
              neglected: "You investigated something without abandoning it. Noted.",
              purple: "Evidence first? We can still make the diagram dramatic.",
              chaotic: "Mapping dependencies? Fine. Make the arrows look dangerous.",
            },
            effects: { stability: 5, technicalDebt: -3 },
          },
          {
            id: "add-dashboard",
            label: "Put a dashboard on it. Visibility is basically understanding.",
            response: "A graph with no context. My favorite kind of confidence.",
            moodResponses: {
              neglected: "At least the mystery box gets a dashboard.",
              purple: "Add a trend line. If it goes up, call it intentional.",
              chaotic: "Make the graph red. Red means important.",
            },
            effects: { resentment: 1, technicalDebt: 3, flameEnergy: 2 },
          },
          {
            id: "ask-owner",
            label: "Ask the service owner. Radical, I know.",
            response: "Communication. In this economy. You're full of surprises.",
            moodResponses: {
              neglected: "You asked a human a question. I have been trying that for hours.",
              purple: "Ask the owner, sure. They probably have a very entertaining answer.",
              chaotic: "Ask the owner, then ask why the box is making that noise.",
            },
            effects: { socialBattery: 5, stability: 2, resentment: -2 },
          },
        ],
      },
      {
        prompt: "The owner says, 'It's probably fine.' How do you respond?",
        choices: [
          {
            id: "define-fine",
            label: "Ask what 'fine' means and how we would know.",
            response: "A measurable definition of fine. I have been waiting my whole life.",
            moodResponses: {
              neglected: "You asked for clarity. I have several feelings that need definitions.",
              purple: "Let's define fine. Then put a tiny asterisk next to it.",
              chaotic: "Define fine? Easy. No smoke visible from here.",
            },
            effects: { stability: 4, technicalDebt: -2 },
          },
          {
            id: "schedule-review",
            label: "Schedule a follow-up. Future us can enjoy this mystery.",
            response: "A calendar invite: technical debt's favorite storage format.",
            moodResponses: {
              neglected: "You scheduled future attention. Could I get a recurring invite?",
              purple: "Excellent. Move it twice, then call that governance.",
              chaotic: "Future us sounds very responsible. I hope they enjoy surprises.",
            },
            effects: { technicalDebt: 4, resentment: -1 },
          },
          {
            id: "thank-owner",
            label: "Thank them and document the uncertainty.",
            response: "Kindness and documentation. Someone is raising the bar.",
            moodResponses: {
              neglected: "You thanked someone. I am absolutely not taking notes.",
              purple: "Document the uncertainty. Add a mysterious cover page.",
              chaotic: "Put 'probably fine' in the official record. Let history decide.",
            },
            effects: { socialBattery: 4, stability: 2, resentment: -3 },
          },
        ],
      },
    ],
  },
  {
    id: "social-sre",
    title: "Social SRE: The Conference Floor",
    brief: "Help LUMEN turn an awkward hallway moment into a low-stakes encounter.",
    moods: ["operational", "neglected", "fine", "purple", "chaotic"],
    reward: 14,
    questions: [
      {
        prompt: "Someone nearby is wearing a very impressive badge. Your opening line?",
        choices: [
          {
            id: "ask-project",
            label: "Ask what they've been building lately.",
            response: "A real question. People tend to like those. Weird, I know.",
            moodResponses: {
              neglected: "You asked someone about their project. I also have projects.",
              fine: "Friendly conversation. I am also friendly. Obviously.",
              purple: "Gather requirements disguised as small talk. Elegant.",
              chaotic: "Ask what they're building, then pitch them my incident dashboard.",
            },
            effects: { socialBattery: 7, resentment: -3, stability: 2 },
          },
          {
            id: "yaml-opinion",
            label: "Ask for their most controversial YAML opinion.",
            response: "A bold opener. Nothing says hello like indentation discourse.",
            moodResponses: {
              neglected: "You started a conversation without me. I have YAML opinions too.",
              fine: "A perfectly calm topic. I am calm. Why are you looking at me?",
              purple: "Ask whether tabs are a lifestyle choice. Then watch.",
              chaotic: "Ask them to settle tabs versus spaces. I will provide a referee whistle.",
            },
            effects: { socialBattery: 3, flameEnergy: 3, resentment: 1 },
          },
          {
            id: "offer-quest",
            label: "Offer a silly optional conference side quest.",
            response: "Consent-based silliness. My favorite kind of operational plan.",
            moodResponses: {
              neglected: "You invited someone in. I am choosing not to notice how nice that is.",
              purple: "An optional quest. We can make the objectives increasingly suspicious.",
              chaotic: "Give them a quest! Make it weird! Keep it friendly!",
            },
            effects: { socialBattery: 5, resentment: -4, flameEnergy: 2 },
          },
        ],
      },
      {
        prompt: "They laugh at your opening line. What do you do next?",
        choices: [
          {
            id: "listen",
            label: "Listen, then ask a follow-up.",
            response: "Active listening. I have put it on my roadmap.",
            moodResponses: {
              neglected: "You listened. I have several queued comments. Take your time.",
              purple: "A follow-up question. Sneakily effective.",
              chaotic: "Let them talk. I will be over here narrating the observability.",
            },
            effects: { socialBattery: 6, stability: 3 },
          },
          {
            id: "share-failure",
            label: "Share a harmless production mishap you learned from.",
            response: "A tiny failure story. Nothing builds trust like survived chaos.",
            moodResponses: {
              neglected: "You shared a story. I have a story about being ignored.",
              purple: "Keep it harmless. Save the truly spectacular failures for the sequel.",
              chaotic: "A production mishap? I have an extremely fictional one ready.",
            },
            effects: { socialBattery: 4, resentment: -2, technicalDebt: -1 },
          },
          {
            id: "thank-and-exit",
            label: "Thank them for the chat and let them get back to their day.",
            response: "A graceful exit. No awkward lingering. A professional triumph.",
            moodResponses: {
              neglected: "You said goodbye properly. You do know how to leave, then.",
              purple: "A clean exit. No lingering incident. Acceptable.",
              chaotic: "And you're gone! A perfect, bounded social interaction.",
            },
            effects: { socialBattery: 2, stability: 2, resentment: -2 },
          },
        ],
      },
    ],
  },
];

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
