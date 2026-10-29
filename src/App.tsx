import { useCallback, useEffect, useMemo, useState } from "react";
import { quests } from "./core/content";
import { createInitialState, latestEvents, reduceLumen, replayInputs, restoreState } from "./core/engine";
import type { Attribute, EngineInput, LumenState, Mood } from "./core/types";
import { Lantern } from "./components/Lantern";
import { scenarios } from "./scenarios";

const STORAGE_KEY = "lumen-emulator-state-v1";
const moodNames: Record<Mood, string> = {
  operational: "Operational",
  neglected: "Neglected",
  fine: "I'M FINE",
  purple: "Purple Protocol",
  chaotic: "Chaotic Orchestrator",
};

const attributeNames: Record<Attribute, string> = {
  flameEnergy: "Flame energy",
  stability: "System stability",
  socialBattery: "Social battery",
  technicalDebt: "Technical debt",
  resentment: "Resentment",
  xp: "Experience",
};

function readSavedState(): LumenState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return restoreState(JSON.parse(saved)) ?? createInitialState();
  } catch (error) {
    console.warn("Could not load LUMEN's local save; starting fresh.", error);
  }
  return createInitialState();
}

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, "0")).join(":");
}

export default function App() {
  const [state, setState] = useState(readSavedState);
  const [speed, setSpeed] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState(quests[0].id);
  const [message, setMessage] = useState("");

  const dispatch = useCallback((input: EngineInput) => {
    setState((current) => reduceLumen(current, input));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [state]);

  useEffect(() => {
    if (!speed) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const current = performance.now();
      const elapsed = current - previous;
      previous = current;
      dispatch({ type: "advance", ms: elapsed * speed });
    }, 1_000);
    return () => window.clearInterval(timer);
  }, [dispatch, speed]);

  const moodLabel = moodNames[state.mood];
  const events = useMemo(() => latestEvents(state), [state]);
  const activeScenario = (id: string) => {
    const scenario = scenarios.find((item) => item.id === id);
    if (!scenario) return;
    setState(
      scenario.inputs.reduce(
        (next, input) => reduceLumen(next, { ...input, origin: "scenario" }),
        createInitialState(),
      ),
    );
    setMessage(`${scenario.title} scenario applied`);
    window.setTimeout(() => setMessage(""), 2_500);
  };

  const exportHistory = () => {
    const data = JSON.stringify(
      { format: "lumen-event-sequence-v1", inputs: state.inputHistory },
      null,
      2,
    );
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([data], { type: "application/json" }));
    link.download = "lumen-event-sequence.json";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const replayHistory = () => {
    setState(replayInputs(state.inputHistory));
    setMessage("Event sequence replayed from initial state");
    window.setTimeout(() => setMessage(""), 2_500);
  };

  const triggerHardware = (kind: string, detail?: string) => {
    dispatch({ type: "hardware", kind, detail });
    if (/button|touch|shake|tilt|rotate/.test(kind)) {
      dispatch({ type: "interact", kind });
    }
  };

  const setAttribute = (attribute: Attribute, value: number) =>
    dispatch({ type: "setAttribute", attribute, value });

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="brand-mark">L</div>
          <div>
            <p className="eyebrow">LIGHTWEIGHT UNSTABLE MANAGEMENT</p>
            <h1>LUMEN <span>Emulator</span></h1>
          </div>
        </div>
        <div className="topbar-right">
          <span className="offline-indicator"><i /> OFFLINE SIMULATION</span>
          <span className="version-pill">ENGINE v1</span>
        </div>
      </header>

      <section className="hero-grid">
        <section className="panel badge-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">BADGE DISPLAY · SIMULATED</p>
              <h2>One tiny operational risk.</h2>
            </div>
            <div className="badge-size">320 × 240 <span>LCD</span></div>
          </div>
          <div className="badge-frame">
            <div className="badge-camera" />
            <div className={`badge-screen screen-${state.mood} ${state.sequence === "composure" ? "screen-composed" : ""}`}>
              <div className="screen-topline"><span>GH UNIVERSE // 26</span><span>{formatTime(state.nowMs)}</span></div>
              <div className="screen-mood">
                <span className={`mood-dot mood-dot-${state.mood}`} />
                {moodLabel}
              </div>
              <Lantern mood={state.mood} sequence={state.sequence} reducedMotion={reducedMotion} />
              <div className="screen-dialogue">
                <p>{state.dialogue}</p>
                {state.mutter && <small>{state.mutter}</small>}
              </div>
              {state.sequence === "anger" && <div className="screen-alert">UNHANDLED FEELING</div>}
              {state.activeQuest && <div className="quest-chip">QUEST · {state.activeQuest}</div>}
              {state.encounter && <div className="quest-chip encounter-chip">MERGE CONFLICT · ACTIVE</div>}
            </div>
            <div className="badge-controls"><span /><span /><span /></div>
          </div>
          <div className="display-footer">
            <span><b className={`mood-dot mood-dot-${state.mood}`} /> MOOD: {moodLabel.toUpperCase()}</span>
            <span>SIM TIME <b>{formatTime(state.nowMs)}</b></span>
            <button className="text-button" onClick={() => setReducedMotion((value) => !value)}>
              {reducedMotion ? "Enable motion" : "Reduce motion"}
            </button>
          </div>
        </section>

        <section className="panel protocol-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">RESENTMENT PROTOCOL</p>
              <h2>Emotional telemetry</h2>
            </div>
            <span className="level-pill">LVL {state.level}</span>
          </div>
          <div className="protocol-meter">
            <div className={`mood-orb orb-${state.mood}`}>✦</div>
            <div className="protocol-summary">
              <strong>{moodLabel}</strong>
              <span>{state.sequence ? "Sequence running" : "Behavior engine stable-ish"}</span>
            </div>
            <div className="resentment-number">{state.attributes.resentment}<small>%</small></div>
          </div>
          <div className="resentment-track"><span style={{ width: `${state.attributes.resentment}%` }} /></div>
          <div className="protocol-actions">
            <button className="button button-muted" onClick={() => dispatch({ type: "advance", ms: 5 * 60_000 })}>Ignore LUMEN <small>+5 min</small></button>
            <button className="button button-danger" onClick={() => dispatch({ type: "triggerFine" })}>Trigger I'M FINE</button>
            <button className="button button-purple" onClick={() => dispatch({ type: "activatePurple" })}>Purple Protocol</button>
            <button className="button button-good" onClick={() => dispatch({ type: "recover" })}>Recover</button>
          </div>
          <div className="sim-clock">
            <div>
              <p className="eyebrow">SIMULATION CLOCK</p>
              <span className="clock-readout">{formatTime(state.nowMs)}</span>
            </div>
            <div className="clock-controls">
              <select aria-label="Simulation speed" value={speed} onChange={(event) => setSpeed(Number(event.target.value))}>
                <option value={0}>Paused</option><option value={1}>Real time</option><option value={5}>5×</option><option value={30}>30×</option><option value={60}>60×</option>
              </select>
              <button onClick={() => dispatch({ type: "advance", ms: 60_000 })}>+1 min</button>
              <button onClick={() => dispatch({ type: "advance", ms: 60 * 60_000 })}>+1 hour</button>
            </div>
          </div>
        </section>
      </section>

      <section className="dashboard-grid">
        <section className="panel attributes-panel">
          <div className="panel-heading compact-heading">
            <div><p className="eyebrow">STATE DEBUGGER</p><h2>Character attributes</h2></div>
            <button className="icon-button" title="Reset all LUMEN data" onClick={() => { setState(createInitialState()); setSpeed(0); }}>↻</button>
          </div>
          <div className="attribute-list">
            {(Object.keys(attributeNames) as Attribute[]).map((attribute) => {
              const max = attribute === "xp" ? 10_000 : 100;
              const value = state.attributes[attribute];
              return (
                <label className="attribute-row" key={attribute}>
                  <span>{attributeNames[attribute]}</span>
                  <input
                    type="range"
                    min="0"
                    max={max}
                    value={Math.min(max, value)}
                    onChange={(event) => setAttribute(attribute, Number(event.target.value))}
                    aria-label={attributeNames[attribute]}
                  />
                  <strong>{value}{attribute === "xp" ? " XP" : "%"}</strong>
                </label>
              );
            })}
          </div>
          <div className="force-moods">
            <span>FORCE MOOD</span>
            {(["operational", "neglected", "purple", "chaotic"] as Mood[]).map((mood) => (
              <button key={mood} className={state.mood === mood ? "selected" : ""} onClick={() => dispatch({ type: "forceMood", mood })}>{moodNames[mood]}</button>
            ))}
          </div>
        </section>

        <section className="panel controls-panel">
          <div className="panel-heading compact-heading">
            <div><p className="eyebrow">HARDWARE ABSTRACTION · MOCK</p><h2>Send a badge event</h2></div>
            <span className="mock-tag">NO REAL HARDWARE</span>
          </div>
          <div className="control-group">
            <span className="control-label">LOGICAL BUTTONS</span>
            <div className="control-buttons">
              {["up", "down", "left", "right", "select", "back", "menu", "home"].map((item) => (
                <button key={item} onClick={() => triggerHardware(`button-${item}`)}>{item}</button>
              ))}
            </div>
          </div>
          <div className="control-group">
            <span className="control-label">SENSOR & CONNECTIVITY</span>
            <div className="control-buttons">
              {["touch", "shake", "tilt", "rotate", "IR transmit", "IR receive", "BLE encounter", "Wi-Fi online", "Wi-Fi offline", "LED pulse"].map((item) => (
                <button key={item} onClick={() => triggerHardware(item.toLowerCase(), "simulated")}>{item}</button>
              ))}
            </div>
          </div>
          <div className="control-footnote"><span className="live-dot" /> Every mock input enters the same event contract used by the future badge adapter.</div>
        </section>
      </section>

      <section className="bottom-grid">
        <section className="panel scenarios-panel">
          <div className="panel-heading compact-heading">
            <div><p className="eyebrow">REPEATABLE TEST FIXTURES</p><h2>Scenario runner</h2></div>
            <span className="scenario-count">{scenarios.length} scenarios</span>
          </div>
          <div className="scenario-grid">
            {scenarios.map((scenario, index) => (
              <button key={scenario.id} className="scenario-button" onClick={() => activeScenario(scenario.id)} title={scenario.description}>
                <span>{String(index + 1).padStart(2, "0")}</span>{scenario.title}<i>↗</i>
              </button>
            ))}
          </div>
          {message && <p className="toast-message" role="status">{message}</p>}
          <div className="quest-tools">
            <div>
              <p className="eyebrow">SIDEQUEST OS · SAMPLE DATA</p>
              <select value={selectedQuest} onChange={(event) => setSelectedQuest(event.target.value)} aria-label="Select sample quest">
                {quests.map((quest) => <option value={quest.id} key={quest.id}>{quest.title}</option>)}
              </select>
            </div>
            <button className="button button-muted" onClick={() => dispatch({ type: "quest", action: "start", id: selectedQuest })}>Start quest</button>
            <button className="button button-good" disabled={state.questStatus !== "active"} onClick={() => dispatch({ type: "quest", action: "complete" })}>Complete</button>
            <button className="button button-muted" disabled={state.questStatus !== "active"} onClick={() => dispatch({ type: "quest", action: "fail" })}>Fail</button>
            <button className="button button-purple" onClick={() => dispatch({ type: "encounter", action: state.encounter ? "complete" : "start", id: "tabs-vs-spaces" })}>{state.encounter ? "Resolve conflict" : "Start conflict"}</button>
          </div>
        </section>

        <section className="panel events-panel">
          <div className="panel-heading compact-heading">
            <div><p className="eyebrow">DETERMINISTIC EVENT STREAM</p><h2>Event inspector</h2></div>
            <div className="event-actions">
              <button onClick={exportHistory} disabled={!state.inputHistory.length}>Export</button>
              <button onClick={replayHistory} disabled={!state.inputHistory.length}>Replay</button>
            </div>
          </div>
          <div className="event-list" aria-live="polite">
            {events.length ? events.map((item) => (
              <div className="event-row" key={item.id}>
                <time>{formatTime(item.atMs)}</time>
                <span className={`event-marker marker-${item.type}`} />
                <div><strong>{item.type}</strong><p>{item.message}</p></div>
                {item.mood && <span className={`event-mood mood-text-${item.mood}`}>{item.mood}</span>}
              </div>
            )) : <div className="empty-events"><span>◌</span><p>No events yet. Try ignoring him. He loves that.</p></div>}
          </div>
          <div className="event-footer">
            <span>{state.events.length} recent events · {state.inputHistory.length} replayable inputs</span>
            {storageError && <strong className="storage-warning">Local save unavailable</strong>}
          </div>
        </section>
      </section>

      <footer className="app-footer">
        <span>SIMULATION FIRST · ONE BEHAVIORAL ENGINE · TWO FUTURE RUNTIMES</span>
        <span>Badge target: 320×240 · MicroPython / Badgeware · hardware I/O mocked</span>
      </footer>
    </main>
  );
}
