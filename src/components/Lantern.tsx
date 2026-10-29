import type { Mood } from "../core/types";

const colors: Record<Mood, { flame: string; glow: string; face: string }> = {
  operational: { flame: "#ffc85a", glow: "#f6a83d", face: "#28302d" },
  neglected: { flame: "#ffb14f", glow: "#e68235", face: "#30312e" },
  fine: { flame: "#ff462f", glow: "#ff3b32", face: "#f04b3d" },
  purple: { flame: "#c582ff", glow: "#9b58e8", face: "#302638" },
  chaotic: { flame: "#d59cff", glow: "#7739cf", face: "#211b28" },
};

interface LanternProps {
  mood: Mood;
  sequence: "anger" | "composure" | null;
  reducedMotion: boolean;
  animation: string;
  animationId: number;
  muttering: boolean;
}

export function Lantern({
  mood,
  sequence,
  reducedMotion,
  animation,
  animationId,
  muttering,
}: LanternProps) {
  const color = sequence === "composure" ? colors.operational : colors[mood];
  const animationClass = animation.replaceAll(/[^a-z0-9-]/gi, "-").toLowerCase();
  return (
    <svg
      key={animationId}
      className={`lantern-art mood-${mood} ${sequence ? `sequence-${sequence}` : ""} animation-${animationClass} ${muttering ? "muttering" : ""} ${reducedMotion ? "reduced-motion" : ""}`}
      viewBox="0 0 320 240"
      role="img"
      aria-label={`LUMEN the lantern, ${mood.replace("-", " ")} mood`}
    >
      <defs>
        <radialGradient id="glass" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#fff5c8" stopOpacity=".95" />
          <stop offset="52%" stopColor={color.glow} stopOpacity=".42" />
          <stop offset="100%" stopColor="#17201d" stopOpacity=".9" />
        </radialGradient>
        <filter id="soft-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="9" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse className="lantern-shadow" cx="160" cy="210" rx="70" ry="12" fill="#050807" opacity=".58" />
      <g className="lantern-body">
        <path d="M121 67 L130 43 Q160 28 190 43 L199 67" fill="#164b45" stroke="#40bba9" strokeWidth="4" />
        <path d="M129 67 Q160 55 191 67 L207 173 Q205 191 187 198 L133 198 Q115 191 113 173 Z" fill="#174c45" stroke="#55c9b2" strokeWidth="4" />
        <path d="M132 78 Q160 68 188 78 L198 165 Q197 180 183 184 L137 184 Q123 180 122 165 Z" fill="url(#glass)" stroke="#9de0c9" strokeOpacity=".82" strokeWidth="3" />
        <path d="M125 69 Q160 56 195 69 M116 175 Q160 190 204 175" fill="none" stroke="#56c4ad" strokeWidth="5" strokeLinecap="round" />
        <path d="M142 49 Q160 40 178 49" fill="none" stroke="#102e2a" strokeWidth="5" strokeLinecap="round" />
        <path d="M160 42 L167 49 L160 56 L153 49 Z" fill="#ffb000" className="lantern-emblem" />
        <path className="side-gem side-gem-left" d="M124 90 L132 98 L124 106 L119 98 Z" fill="#ffb000" opacity=".9" />
        <path className="side-gem side-gem-right" d="M196 90 L201 98 L196 106 L188 98 Z" fill="#ff8a25" opacity=".9" />
        <path className="flame-halo" d="M160 163 C135 142 154 126 161 100 C174 120 186 133 171 163 Z" fill={color.glow} opacity=".35" filter="url(#soft-glow)" />
        <g className="flame">
          <path d="M160 164 C141 148 156 131 160 110 C177 132 183 148 168 164 Z" fill={color.flame} />
          <path d="M161 162 C153 151 164 141 164 131 C173 145 171 154 166 162 Z" fill="#fff3ba" opacity=".95" />
        </g>
        <g className="face">
          <ellipse className="cheek cheek-left" cx="135" cy="130" rx="5" ry="2.5" fill="#ff9a79" opacity=".48" />
          <ellipse className="cheek cheek-right" cx="186" cy="130" rx="5" ry="2.5" fill="#ff9a79" opacity=".48" />
          <path className="brow brow-left" d="M135 105 Q146 98 155 105" fill="none" stroke={color.face} strokeWidth="5" strokeLinecap="round" />
          <path className="brow brow-right" d="M166 105 Q176 98 185 105" fill="none" stroke={color.face} strokeWidth="5" strokeLinecap="round" />
          <ellipse className="eye-white" cx="146" cy="118" rx="7" ry="9" fill="#fff0d0" />
          <ellipse className="eye-white" cx="175" cy="118" rx="7" ry="9" fill="#fff0d0" />
          <g className="pupils" fill={color.face}>
            <ellipse className="pupil pupil-left" cx="147" cy="119" rx="3.3" ry="5.2" />
            <ellipse className="pupil pupil-right" cx="174" cy="119" rx="3.3" ry="5.2" />
            <circle className="eye-shine" cx="148" cy="117" r="1.5" fill="#fff" />
            <circle className="eye-shine" cx="175" cy="117" r="1.5" fill="#fff" />
          </g>
          <path className="eyelid eyelid-left" d="M138 116 Q146 105 154 116 L154 121 Q146 126 138 121 Z" fill={color.glow} />
          <path className="eyelid eyelid-right" d="M167 116 Q175 105 183 116 L183 121 Q175 126 167 121 Z" fill={color.glow} />
          <path className="mouth" d="M148 138 Q160 147 173 137" fill="none" stroke={color.face} strokeWidth="4" strokeLinecap="round" />
        </g>
        <g className="arms" fill="none" stroke="#40bba9" strokeWidth="5" strokeLinecap="round">
          <path className="arm arm-left" d="M118 131 Q103 139 108 154" />
          <path className="arm arm-right" d="M202 131 Q217 139 212 154" />
          <path className="hand hand-left" d="M108 154 Q104 160 100 155 M108 154 Q112 161 115 155" />
          <path className="hand hand-right" d="M212 154 Q208 161 205 155 M212 154 Q216 160 220 154" />
        </g>
        <path d="M142 198 L138 208 M178 198 L182 208" stroke="#87948d" strokeWidth="5" strokeLinecap="round" />
        <path d="M133 210 Q160 217 187 210" fill="none" stroke="#40bba9" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g className="sparkles" fill="#ffb000">
        <path className="sparkle sparkle-one" d="M91 102 L94 109 L101 112 L94 115 L91 122 L88 115 L81 112 L88 109 Z" />
        <path className="sparkle sparkle-two" d="M224 83 L226 88 L231 90 L226 92 L224 97 L222 92 L217 90 L222 88 Z" />
        <circle className="sparkle sparkle-three" cx="104" cy="177" r="2.5" />
        <circle className="sparkle sparkle-four" cx="217" cy="180" r="2.5" />
      </g>
      {sequence === "anger" && (
        <g className="anger-flash">
          <path d="M100 78 L87 66 M216 78 L230 65 M106 115 L88 111 M213 116 L232 111" stroke="#ff5247" strokeWidth="5" strokeLinecap="round" />
          <text x="160" y="52" textAnchor="middle" fill="#ff7468" fontSize="12" fontWeight="900">!</text>
        </g>
      )}
      {animation === "shake-recoil" && (
        <g className="motion-lines" fill="none" stroke="#ffb000" strokeWidth="2" strokeLinecap="round">
          <path d="M93 135 L83 135 M95 143 L85 147 M225 135 L235 135 M223 143 L233 147" />
        </g>
      )}
      <text x="160" y="229" textAnchor="middle" fill="#40bba9" fontSize="9" fontWeight="700" letterSpacing="2">LUMEN // {mood.toUpperCase()}</text>
    </svg>
  );
}
