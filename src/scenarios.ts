import type { EngineInput } from "./core/types";

export interface Scenario {
  id: string;
  title: string;
  description: string;
  inputs: EngineInput[];
}

export const scenarios: Scenario[] = [
  {
    id: "boot",
    title: "Fresh boot",
    description: "Start the mocked badge and record the boot event.",
    inputs: [{ type: "hardware", kind: "boot", detail: "fresh boot scenario" }],
  },
  {
    id: "five-minutes",
    title: "Five minutes idle",
    description: "Leave LUMEN unattended for five simulated minutes.",
    inputs: [{ type: "advance", ms: 5 * 60_000 }],
  },
  {
    id: "extended-neglect",
    title: "Extended neglect",
    description: "Fast-forward through a long stretch of abandonment.",
    inputs: [{ type: "advance", ms: 2 * 60 * 60_000 }],
  },
  {
    id: "fine",
    title: "Trigger I'M FINE",
    description: "Start the red-faced sequence; advance the simulation clock to finish it.",
    inputs: [{ type: "triggerFine" }],
  },
  {
    id: "purple",
    title: "Purple Protocol",
    description: "Activate the mischievous protocol.",
    inputs: [{ type: "activatePurple" }],
  },
  {
    id: "recover",
    title: "Recover",
    description: "Reset resentment and restore operational stability.",
    inputs: [{ type: "recover" }],
  },
  {
    id: "quest-complete",
    title: "Complete side quest",
    description: "Complete the sample YAML quest for XP.",
    inputs: [
      { type: "quest", action: "start", id: "yaml-apologist" },
      { type: "quest", action: "complete" },
    ],
  },
  {
    id: "quest-fail",
    title: "Fail side quest",
    description: "Record a fictional mission failure.",
    inputs: [
      { type: "quest", action: "start", id: "it-depends" },
      { type: "quest", action: "fail" },
    ],
  },
  {
    id: "merge-conflict",
    title: "Initiate merge conflict",
    description: "Create a mocked tabs-versus-spaces encounter.",
    inputs: [{ type: "encounter", action: "start", id: "tabs-vs-spaces" }],
  },
  {
    id: "ir-encounter",
    title: "Complete IR encounter",
    description: "Simulate IR transmit and receive, then complete an encounter.",
    inputs: [
      { type: "hardware", kind: "ir-transmit", detail: "mock signal" },
      { type: "hardware", kind: "ir-receive", detail: "mock signal received" },
      { type: "encounter", action: "start", id: "mock-ir-peer" },
      { type: "encounter", action: "complete" },
    ],
  },
  {
    id: "consultant",
    title: "Consultant commentary",
    description: "Trigger a deterministic, mood-aware consulting remark.",
    inputs: [
      { type: "activatePurple" },
      { type: "hardware", kind: "consultant-timer", detail: "mock periodic trigger" },
    ],
  },
  {
    id: "conference-day",
    title: "Full conference day",
    description: "Run an eight-hour deterministic day with several interactions.",
    inputs: [
      { type: "advance", ms: 2 * 60 * 60_000 },
      { type: "interact", kind: "attendee encounter" },
      { type: "advance", ms: 2 * 60 * 60_000 },
      { type: "quest", action: "start", id: "yaml-apologist" },
      { type: "quest", action: "complete" },
      { type: "advance", ms: 2 * 60 * 60_000 },
      { type: "interact", kind: "button select" },
      { type: "advance", ms: 2 * 60 * 60_000 },
    ],
  },
];
