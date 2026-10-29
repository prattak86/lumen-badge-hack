import { conversationJobs, dialogue, quests } from "./content";
import type {
  Attribute,
  EngineInput,
  LumenEvent,
  LumenState,
  Mood,
  RecordedInput,
} from "./types";

export const ENGINE_CONFIG = Object.freeze({
  attributeMax: 100,
  xpMax: 10_000,
  neglectedIntervalMs: 60_000,
  resentmentPerNeglectedInterval: 5,
  stabilityLossPerNeglectedInterval: 1,
  debtPerNeglectedInterval: 1,
  fineThreshold: 55,
  fineCooldownMs: 5 * 60_000,
  fineAngerDurationMs: 2_000,
  fineComposureDurationMs: 2_500,
  purpleThreshold: 70,
  chaoticThreshold: 90,
  neglectedThreshold: 25,
  neglectedStabilityThreshold: 38,
  chaoticStabilityThreshold: 8,
});

export const DEFAULT_STATE: Omit<LumenState, "events" | "inputHistory"> = {
  nowMs: 0,
  attributes: {
    flameEnergy: 82,
    stability: 80,
    socialBattery: 65,
    technicalDebt: 12,
    resentment: 0,
    xp: 0,
  },
  mood: "operational",
  sequence: null,
  sequenceStartedAt: null,
  lastFineAt: -Infinity,
  lastInteractionAt: 0,
  seed: 0x4c554d45,
  level: 1,
  dialogue: dialogue.operational.lines[0],
  mutter: null,
  activeQuest: null,
  questStatus: "idle",
  conversationId: null,
  conversationQuestion: 0,
  conversationStatus: "idle",
  conversationResponse: null,
  encounter: null,
};

const clamp = (value: number) => Math.max(0, Math.min(100, Math.round(value)));
const clampXp = (value: number) =>
  Math.max(0, Math.min(ENGINE_CONFIG.xpMax, Math.round(value)));

export function createInitialState(): LumenState {
  return {
    ...DEFAULT_STATE,
    attributes: { ...DEFAULT_STATE.attributes },
    events: [],
    inputHistory: [],
  };
}

function event(state: LumenState, type: string, message: string, mood?: Mood) {
  state.events.push({
    contractVersion: 1,
    id: (state.events.at(-1)?.id ?? 0) + 1,
    atMs: state.nowMs,
    type,
    origin: "engine",
    seed: state.seed,
    payload: { message, ...(mood ? { mood } : {}) },
    message,
    ...(mood ? { mood } : {}),
  });
  if (state.events.length > 300) state.events.shift();
}

function choose<T>(state: LumenState, values: T[]): T {
  state.seed = (Math.imul(state.seed, 1664525) + 1013904223) >>> 0;
  return values[Math.floor((state.seed / 0x1_0000_0000) * values.length)];
}

function deriveMood(state: LumenState): Mood {
  const { resentment, stability } = state.attributes;
  if (
    resentment >= ENGINE_CONFIG.chaoticThreshold ||
    stability <= ENGINE_CONFIG.chaoticStabilityThreshold
  ) return "chaotic";
  if (resentment >= ENGINE_CONFIG.purpleThreshold) return "purple";
  if (
    resentment >= ENGINE_CONFIG.neglectedThreshold ||
    stability <= ENGINE_CONFIG.neglectedStabilityThreshold
  ) return "neglected";
  return "operational";
}

function setMood(state: LumenState, mood: Mood) {
  if (state.mood === mood) return;
  state.mood = mood;
  const animationByMood: Partial<Record<Mood, string>> = {
    operational: "happy-bounce",
    neglected: "suspicious-glance",
    purple: "sinister-smile",
    chaotic: "theatrical-pulse",
  };
  const animation = animationByMood[mood];
  if (animation) event(state, "animation", animation);
  event(state, "mood", `MOOD → ${mood.toUpperCase()}`, mood);
}

function speak(state: LumenState) {
  const options = dialogue[state.mood];
  const freshLines = options.lines.filter((line) => line !== state.dialogue);
  state.dialogue = choose(state, freshLines.length ? freshLines : options.lines);
  const freshMutters = options.mutters.filter((line) => line !== state.mutter);
  state.mutter =
    state.mood === "fine" || state.attributes.resentment >= 40
      ? choose(state, freshMutters.length ? freshMutters : options.mutters)
      : null;
  event(state, "dialogue", `DIALOGUE · ${state.dialogue}`, state.mood);
  if (state.mutter) {
    event(state, "animation", "under-breath-muttering");
    event(state, "mutter", `UNDER BREATH · ${state.mutter}`, state.mood);
  }
}

function beginFine(state: LumenState, force = false) {
  if (!force && state.nowMs - state.lastFineAt < ENGINE_CONFIG.fineCooldownMs) return;
  state.mood = "fine";
  state.sequence = "anger";
  state.sequenceStartedAt = state.nowMs;
  state.lastFineAt = state.nowMs;
  state.dialogue = "SYSTEM ALERT: FEELINGS DETECTED";
  state.mutter = null;
  event(state, "animation", "angry-red-face", "fine");
  event(state, "mood", "MOOD → I'M FINE", "fine");
}

function finishFine(state: LumenState) {
  const sequenceEndedAt = (state.sequenceStartedAt ?? state.nowMs) + 2_000;
  state.sequence = null;
  state.mood = "fine";
  state.sequence = "composure";
  state.sequenceStartedAt = sequenceEndedAt;
  state.dialogue = "I'M FINE........ 😒";
  state.mutter = "System logs indicate otherwise.";
  event(state, "animation", "fine-composure", "fine");
  event(state, "dialogue", `DIALOGUE · ${state.dialogue}`, "fine");
}

function completeFine(state: LumenState) {
  state.sequence = null;
  state.sequenceStartedAt = null;
  setMood(state, deriveMood(state));
  speak(state);
}

function updateTime(state: LumenState, ms: number) {
  if (!Number.isFinite(ms) || ms < 0) return;
  const target = state.nowMs + Math.floor(ms);
  while (state.nowMs < target) {
    const interval = ENGINE_CONFIG.neglectedIntervalMs;
    const nextMinute = (Math.floor(state.nowMs / interval) + 1) * interval;
    let nextTime = Math.min(target, nextMinute);
    if (state.sequenceStartedAt !== null && state.sequence) {
      const duration =
        state.sequence === "anger"
          ? ENGINE_CONFIG.fineAngerDurationMs
          : ENGINE_CONFIG.fineComposureDurationMs;
      nextTime = Math.min(nextTime, state.sequenceStartedAt + duration);
    }
    state.nowMs = nextTime;

    if (
      state.sequenceStartedAt !== null &&
      state.nowMs - state.sequenceStartedAt >=
        (state.sequence === "anger"
          ? ENGINE_CONFIG.fineAngerDurationMs
          : state.sequence === "composure"
            ? ENGINE_CONFIG.fineComposureDurationMs
            : Infinity)
    ) {
      if (state.sequence === "anger") finishFine(state);
      else if (state.sequence === "composure") completeFine(state);
    }

    if (
      state.nowMs === nextMinute &&
      state.nowMs - state.lastInteractionAt >= ENGINE_CONFIG.neglectedIntervalMs
    ) {
      state.attributes.resentment = clamp(
        state.attributes.resentment + ENGINE_CONFIG.resentmentPerNeglectedInterval,
      );
      state.attributes.technicalDebt = clamp(
        state.attributes.technicalDebt + ENGINE_CONFIG.debtPerNeglectedInterval,
      );
      state.attributes.stability = clamp(
        state.attributes.stability - ENGINE_CONFIG.stabilityLossPerNeglectedInterval,
      );
      event(state, "attribute", `RESENTMENT +${ENGINE_CONFIG.resentmentPerNeglectedInterval} · neglect`);
    }

    if (!state.sequence) {
      if (
        state.mood === "neglected" &&
        state.attributes.resentment >= ENGINE_CONFIG.fineThreshold
      ) beginFine(state);
      if (!state.sequence) {
        const next = deriveMood(state);
        if (next !== state.mood) {
          setMood(state, next);
          speak(state);
        }
      }
    }
  }
}

function updateAttribute(state: LumenState, attribute: Attribute, value: number) {
  state.attributes[attribute] =
    attribute === "xp"
    ? clampXp(value)
      : clamp(value);
  if (attribute === "xp") {
    state.level = Math.floor(state.attributes.xp / 100) + 1;
  }
  event(state, "attribute", `${attribute} → ${state.attributes[attribute]}`);
  if (attribute === "resentment" || attribute === "stability") {
    const next = deriveMood(state);
    if (next !== state.mood && !state.sequence) {
      setMood(state, next);
      speak(state);
    }
  }
}

export function reduceLumen(previous: LumenState, input: EngineInput): LumenState {
  const state: LumenState = {
    ...previous,
    attributes: { ...previous.attributes },
    events: [...previous.events],
    inputHistory: [
      ...previous.inputHistory,
      {
        contractVersion: 1 as const,
        atMs: previous.nowMs,
        type: input.type,
        origin: input.origin ?? "emulator",
        seed: previous.seed,
        payload: input,
      },
    ].slice(-5_000),
  };
  switch (input.type) {
    case "advance":
      updateTime(state, input.ms);
      break;
    case "interact":
      state.lastInteractionAt = state.nowMs;
      state.attributes.resentment = clamp(state.attributes.resentment - 8);
      state.attributes.socialBattery = clamp(state.attributes.socialBattery + 5);
      state.attributes.stability = clamp(state.attributes.stability + 3);
      state.attributes.flameEnergy = clamp(state.attributes.flameEnergy + 2);
      event(state, "input", `INTERACTION · ${input.kind}`);
      event(state, "animation", "happy-bounce");
      if (state.mood === "fine") {
        completeFine(state);
      } else {
        setMood(state, deriveMood(state));
        speak(state);
      }
      break;
    case "setAttribute":
      updateAttribute(state, input.attribute, input.value);
      if (input.attribute === "flameEnergy" && input.value <= 15) {
        event(state, "animation", "sleepy");
      }
      break;
    case "forceMood":
      if (input.mood === "fine") beginFine(state, true);
      else {
        state.sequence = null;
        state.sequenceStartedAt = null;
        if (input.mood === "operational") {
          state.attributes.resentment = 0;
          state.attributes.stability = Math.max(75, state.attributes.stability);
        }
        if (input.mood === "purple") {
          state.attributes.resentment = Math.max(70, Math.min(89, state.attributes.resentment));
          state.attributes.stability = Math.max(9, state.attributes.stability);
        }
        if (input.mood === "chaotic") {
          state.attributes.resentment = Math.max(90, state.attributes.resentment);
        }
        if (input.mood === "neglected") {
          state.attributes.resentment = Math.max(25, Math.min(69, state.attributes.resentment));
          state.attributes.stability = Math.max(39, state.attributes.stability);
        }
        setMood(state, input.mood);
        speak(state);
      }
      break;
    case "triggerFine":
      beginFine(state, true);
      break;
    case "activatePurple":
      state.sequence = null;
      state.sequenceStartedAt = null;
      state.attributes.resentment = Math.max(70, state.attributes.resentment);
      state.attributes.stability = Math.max(9, Math.min(45, state.attributes.stability));
      setMood(state, "purple");
      speak(state);
      event(state, "animation", "purple-flame-transition");
      break;
    case "recover":
      state.attributes.resentment = 0;
      state.attributes.stability = Math.max(75, state.attributes.stability);
      state.attributes.technicalDebt = Math.max(0, state.attributes.technicalDebt - 20);
      state.lastInteractionAt = state.nowMs;
      state.sequence = null;
      state.sequenceStartedAt = null;
      setMood(state, "operational");
      speak(state);
      event(state, "recovery", "RECOVERY · protocol reset");
      break;
    case "hardware":
      event(state, "hardware", `${input.kind.toUpperCase()}${input.detail ? ` · ${input.detail}` : ""}`);
      if (input.kind === "consultant-timer") {
        speak(state);
        event(state, "animation", "sarcastic-eye-roll");
      }
      if (/button|touch|shake|tilt|rotate/i.test(input.kind)) {
        state.lastInteractionAt = state.nowMs;
        state.attributes.resentment = clamp(state.attributes.resentment - 2);
      }
      if (input.kind === "shake") {
        state.dialogue = "Please stop stress-testing the lantern.";
        event(state, "animation", "shake-recoil");
      }
      break;
    case "quest":
      if (input.action === "start") {
        state.activeQuest = input.id ?? "yaml-apologist";
        state.questStatus = "active";
        event(state, "quest", `QUEST START · ${state.activeQuest}`);
      } else if (state.activeQuest) {
        state.questStatus = input.action === "complete" ? "complete" : "failed";
        if (input.action === "complete") {
          const reward = quests.find((quest) => quest.id === state.activeQuest)?.reward ?? 18;
          state.attributes.xp = clampXp(state.attributes.xp + reward);
          state.attributes.resentment = clamp(state.attributes.resentment - 12);
          state.level = Math.floor(state.attributes.xp / 100) + 1;
        }
        event(state, "quest", `QUEST ${input.action.toUpperCase()} · ${state.activeQuest}`);
        state.activeQuest = null;
        if (input.action === "complete") event(state, "animation", "QUEST CELEBRATION");
      }
      break;
    case "conversation":
      if (input.action === "start") {
        const eligible = conversationJobs.filter((job) => job.moods.includes(state.mood));
        const requested = input.jobId
          ? conversationJobs.find(
              (job) => job.id === input.jobId && job.moods.includes(state.mood),
            )
          : undefined;
        const job = requested ?? choose(state, eligible.length ? eligible : conversationJobs);
        state.conversationId = job.id;
        state.conversationQuestion = 0;
        state.conversationStatus = "active";
        state.conversationResponse = null;
        state.lastInteractionAt = state.nowMs;
        state.dialogue = choose(state, [
          `I've got a tiny job for you: ${job.title}.`,
          `Quick briefing. Try not to make this a whole incident.`,
          `A little conference-floor assignment. You in?`,
        ]);
        event(state, "conversation", `JOB OFFERED · ${job.title}`, state.mood);
        event(state, "dialogue", `DIALOGUE · ${state.dialogue}`, state.mood);
      } else if (state.conversationStatus === "active" && state.conversationId) {
        const job = conversationJobs.find(
          (item) => item.id === state.conversationId,
        );
        const question = job?.questions[state.conversationQuestion];
        const choice = question?.choices.find((item) => item.id === input.choiceId);
        if (!job || !question || !choice) break;

        const responseMood = state.mood;
        const response = choice.moodResponses?.[responseMood] ?? choice.response;
        state.conversationResponse = response;
        state.dialogue = response;
        state.mutter =
          responseMood === "chaotic"
            ? "This is a fictional conference scenario. Please don't test it in production."
            : null;
        state.lastInteractionAt = state.nowMs;
        for (const [attribute, delta] of Object.entries(choice.effects) as Array<
          [keyof typeof choice.effects, number]
        >) {
          if (delta === undefined) continue;
          const targetAttribute = attribute as Exclude<Attribute, "xp">;
          state.attributes[targetAttribute] = clamp(
            state.attributes[targetAttribute] + delta,
          );
          event(
            state,
            "attribute",
            `${targetAttribute} ${delta > 0 ? "+" : ""}${delta}`,
          );
        }
        event(state, "conversation", `ANSWER · ${choice.label}`, responseMood);
        event(state, "dialogue", `LUMEN · ${response}`, responseMood);
        state.conversationQuestion += 1;
        const nextMood = deriveMood(state);
        if (nextMood !== state.mood && !state.sequence) {
          setMood(state, nextMood);
        }
        if (state.conversationQuestion >= job.questions.length) {
          state.conversationQuestion = job.questions.length;
          state.conversationStatus = "complete";
          state.attributes.xp = clampXp(state.attributes.xp + job.reward);
          state.level = Math.floor(state.attributes.xp / 100) + 1;
          event(state, "conversation", `JOB COMPLETE · +${job.reward} XP`, state.mood);
          event(state, "animation", "QUEST CELEBRATION");
        }
      }
      break;
    case "encounter":
      if (input.action === "start") {
        state.encounter = input.id ?? "tabs-vs-spaces";
        event(state, "encounter", `ENCOUNTER START · ${state.encounter}`);
        event(state, "animation", "MERGE CONFLICT ALARM");
      } else {
        event(state, "encounter", `ENCOUNTER COMPLETE · ${state.encounter ?? "mock"}`);
        state.encounter = null;
        state.attributes.xp = clampXp(state.attributes.xp + 10);
      }
      break;
  }
  return state;
}

export function replayInputs(
  inputs: Array<EngineInput | RecordedInput>,
): LumenState {
  return inputs.reduce(
    (state, item) => reduceLumen(state, "payload" in item ? item.payload : item),
    createInitialState(),
  );
}

export function restoreState(value: unknown): LumenState | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Partial<LumenState>;
  if (!candidate.attributes || typeof candidate.attributes !== "object") return null;
  const state = createInitialState();
  for (const key of Object.keys(state.attributes) as (keyof typeof state.attributes)[]) {
    const item = candidate.attributes[key];
    if (typeof item === "number" && Number.isFinite(item)) {
      state.attributes[key] =
        key === "xp"
          ? clampXp(item)
          : clamp(item);
    }
  }
  if (typeof candidate.nowMs === "number" && Number.isFinite(candidate.nowMs)) {
    state.nowMs = Math.max(0, candidate.nowMs);
  }
  if (candidate.seed !== undefined && Number.isInteger(candidate.seed)) state.seed = candidate.seed >>> 0;
  state.lastInteractionAt =
    typeof candidate.lastInteractionAt === "number" ? candidate.lastInteractionAt : state.nowMs;
  state.lastFineAt =
    typeof candidate.lastFineAt === "number" ? candidate.lastFineAt : -Infinity;
  state.level = Math.floor(state.attributes.xp / 100) + 1;
  const mood = deriveMood(state);
  if (
    (candidate.sequence === "anger" || candidate.sequence === "composure") &&
    typeof candidate.sequenceStartedAt === "number" &&
    candidate.sequenceStartedAt <= state.nowMs
  ) {
    state.sequence = candidate.sequence;
    state.sequenceStartedAt = candidate.sequenceStartedAt;
  }
  state.mood = state.sequence ? "fine" : mood;
  state.dialogue =
    typeof candidate.dialogue === "string" ? candidate.dialogue : dialogue[mood].lines[0];
  state.mutter = typeof candidate.mutter === "string" ? candidate.mutter : null;
  state.activeQuest =
    typeof candidate.activeQuest === "string" ? candidate.activeQuest : null;
  state.questStatus =
    candidate.questStatus === "active" ||
    candidate.questStatus === "complete" ||
    candidate.questStatus === "failed"
      ? candidate.questStatus
      : "idle";
  state.encounter = typeof candidate.encounter === "string" ? candidate.encounter : null;
  state.conversationId =
    typeof candidate.conversationId === "string" &&
    conversationJobs.some((job) => job.id === candidate.conversationId)
      ? candidate.conversationId
      : null;
  const savedJob = conversationJobs.find((job) => job.id === state.conversationId);
  state.conversationQuestion =
    typeof candidate.conversationQuestion === "number" &&
    Number.isInteger(candidate.conversationQuestion) &&
    savedJob
      ? Math.max(0, Math.min(savedJob.questions.length, candidate.conversationQuestion))
      : 0;
  state.conversationStatus =
    (candidate.conversationStatus === "active" ||
      candidate.conversationStatus === "complete") &&
    savedJob
      ? candidate.conversationStatus
      : "idle";
  if (
    state.conversationStatus === "active" &&
    state.conversationQuestion >= (savedJob?.questions.length ?? 0)
  ) {
    state.conversationStatus = "complete";
  }
  state.conversationResponse =
    typeof candidate.conversationResponse === "string"
      ? candidate.conversationResponse
      : null;
  state.events = Array.isArray(candidate.events)
    ? candidate.events
        .filter(
          (item): item is LumenEvent =>
            !!item &&
            typeof item === "object" &&
            Number.isInteger(item.id) &&
            item.contractVersion === 1 &&
            typeof item.atMs === "number" &&
            typeof item.type === "string" &&
            typeof item.origin === "string" &&
            typeof item.seed === "number" &&
            !!item.payload &&
            typeof item.payload.message === "string" &&
            typeof item.message === "string",
        )
        .slice(-300)
    : [];
  state.inputHistory = Array.isArray(candidate.inputHistory)
    ? candidate.inputHistory.filter(isRecordedInput).slice(-5_000)
    : [];
  return state;
}

function isEngineInput(value: unknown): value is EngineInput {
  if (!value || typeof value !== "object" || !("type" in value)) return false;
  const input = value as Partial<EngineInput>;
  if (input.origin !== undefined && typeof input.origin !== "string") return false;
  switch (input.type) {
    case "advance":
      return typeof input.ms === "number" && Number.isFinite(input.ms) && input.ms >= 0;
    case "interact":
      return typeof input.kind === "string";
    case "setAttribute":
      return (
        typeof input.attribute === "string" &&
        input.attribute in DEFAULT_STATE.attributes &&
        typeof input.value === "number" &&
        Number.isFinite(input.value)
      );
    case "forceMood":
      return ["operational", "neglected", "fine", "purple", "chaotic"].includes(
        input.mood as string,
      );
    case "triggerFine":
    case "activatePurple":
    case "recover":
      return true;
    case "hardware":
      return typeof input.kind === "string" &&
        (input.detail === undefined || typeof input.detail === "string");
    case "quest":
      return (
        ["start", "complete", "fail"].includes(input.action as string) &&
        (input.id === undefined || typeof input.id === "string")
      );
    case "conversation":
      return (
        ["start", "answer"].includes(input.action as string) &&
        (input.jobId === undefined || typeof input.jobId === "string") &&
        (input.choiceId === undefined || typeof input.choiceId === "string")
      );
    case "encounter":
      return (
        ["start", "complete"].includes(input.action as string) &&
        (input.id === undefined || typeof input.id === "string")
      );
    default:
      return false;
  }
}

function isRecordedInput(value: unknown): value is RecordedInput {
  if (!value || typeof value !== "object") return false;
  const input = value as Partial<RecordedInput>;
  return (
    input.contractVersion === 1 &&
    typeof input.atMs === "number" &&
    typeof input.type === "string" &&
    typeof input.origin === "string" &&
    typeof input.seed === "number" &&
    isEngineInput(input.payload) &&
    input.type === input.payload.type
  );
}

export function latestEvents(state: LumenState, count = 40): LumenEvent[] {
  return state.events.slice(-count);
}
