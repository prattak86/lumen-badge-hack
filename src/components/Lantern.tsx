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
}

export function Lantern({ mood, sequence, reducedMotion }: LanternProps) {
  const color = sequence === "composure" ? colors.operational : colors[mood];
  return (
    <svg
      className={`lantern-art mood-${mood} ${sequence ? `sequence-${sequence}` : ""} ${reducedMotion ? "reduced-motion" : ""}`}
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
      <ellipse cx="160" cy="210" rx="70" ry="12" fill="#050807" opacity=".58" />
      <g className="lantern-body">
        <path d="M121 67 L130 43 Q160 28 190 43 L199 67" fill="#313b37" stroke="#92a198" strokeWidth="4" />
        <path d="M129 67 Q160 55 191 67 L207 173 Q205 191 187 198 L133 198 Q115 191 113 173 Z" fill="#27322e" stroke="#9eaaa2" strokeWidth="4" />
        <path d="M132 78 Q160 68 188 78 L198 165 Q197 180 183 184 L137 184 Q123 180 122 165 Z" fill="url(#glass)" stroke="#d7dfd9" strokeOpacity=".7" strokeWidth="3" />
        <path d="M125 69 Q160 56 195 69 M116 175 Q160 190 204 175" fill="none" stroke="#c1ccc4" strokeWidth="5" strokeLinecap="round" />
        <path d="M142 49 Q160 40 178 49" fill="none" stroke="#18211e" strokeWidth="5" strokeLinecap="round" />
        <circle cx="160" cy="49" r="5" fill="#ffc85a" />
        <path className="flame-halo" d="M160 163 C135 142 154 126 161 100 C174 120 186 133 171 163 Z" fill={color.glow} opacity=".35" filter="url(#soft-glow)" />
        <path className="flame" d="M160 164 C141 148 156 131 160 110 C177 132 183 148 168 164 Z" fill={color.flame} />
        <path d="M161 162 C153 151 164 141 164 131 C173 145 171 154 166 162 Z" fill="#fff3ba" opacity=".95" />
        <g className="face" fill={color.face}>
          <path className="brow brow-left" d="M135 105 Q146 98 155 105" fill="none" stroke={color.face} strokeWidth="5" strokeLinecap="round" />
          <path className="brow brow-right" d="M166 105 Q176 98 185 105" fill="none" stroke={color.face} strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="146" cy="118" rx="5" ry="8" />
          <ellipse cx="175" cy="118" rx="5" ry="8" />
          <circle className="eye-shine" cx="148" cy="115" r="1.7" fill="#fff" />
          <circle className="eye-shine" cx="177" cy="115" r="1.7" fill="#fff" />
          <path className="mouth" d="M148 138 Q160 147 173 137" fill="none" stroke={color.face} strokeWidth="4" strokeLinecap="round" />
        </g>
        <path d="M142 198 L138 208 M178 198 L182 208" stroke="#87948d" strokeWidth="5" strokeLinecap="round" />
        <path d="M133 210 Q160 217 187 210" fill="none" stroke="#87948d" strokeWidth="5" strokeLinecap="round" />
      </g>
      {sequence === "anger" && (
        <g className="anger-flash">
          <path d="M100 78 L87 66 M216 78 L230 65 M106 115 L88 111 M213 116 L232 111" stroke="#ff5247" strokeWidth="5" strokeLinecap="round" />
          <text x="160" y="52" textAnchor="middle" fill="#ff7468" fontSize="12" fontWeight="900">!</text>
        </g>
      )}
      <text x="160" y="229" textAnchor="middle" fill="#88958e" fontSize="9" letterSpacing="2">LUMEN // {mood.toUpperCase()}</text>
    </svg>
  );
}
