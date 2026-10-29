export type Mood =
  | "operational"
  | "neglected"
  | "fine"
  | "purple"
  | "chaotic";

export type Attribute =
  | "flameEnergy"
  | "stability"
  | "socialBattery"
  | "technicalDebt"
  | "resentment"
  | "xp";

export interface Attributes {
  flameEnergy: number;
  stability: number;
  socialBattery: number;
  technicalDebt: number;
  resentment: number;
  xp: number;
}

export interface LumenState {
  nowMs: number;
  attributes: Attributes;
  mood: Mood;
  sequence: "anger" | "composure" | null;
  sequenceStartedAt: number | null;
  lastFineAt: number;
  lastInteractionAt: number;
  seed: number;
  level: number;
  dialogue: string;
  mutter: string | null;
  activeQuest: string | null;
  questStatus: "idle" | "active" | "complete" | "failed";
  encounter: string | null;
  events: LumenEvent[];
  inputHistory: RecordedInput[];
}

export type EngineInputPayload =
  | { type: "advance"; ms: number }
  | { type: "interact"; kind: string }
  | { type: "setAttribute"; attribute: Attribute; value: number }
  | { type: "forceMood"; mood: Mood }
  | { type: "triggerFine" }
  | { type: "activatePurple" }
  | { type: "recover" }
  | { type: "hardware"; kind: string; detail?: string }
  | { type: "quest"; action: "start" | "complete" | "fail"; id?: string }
  | { type: "encounter"; action: "start" | "complete"; id?: string };

export type EngineInput = EngineInputPayload & { origin?: string };

export interface RecordedInput {
  contractVersion: 1;
  atMs: number;
  type: EngineInput["type"];
  origin: string;
  seed: number;
  payload: EngineInput;
}

export interface LumenEvent {
  contractVersion: 1;
  id: number;
  atMs: number;
  type: string;
  origin: string;
  seed: number;
  payload: { message: string; mood?: Mood };
  message: string;
  mood?: Mood;
}
