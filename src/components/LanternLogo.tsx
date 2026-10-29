const shards = Array.from({ length: 20 }, (_, index) => {
  const angle = index * 18;
  const radius = 15 + (index % 4) * 1.4;
  const hue = 24 + (index % 5) * 8;
  return { angle, radius, hue };
});

export function LanternLogo() {
  return (
    <span className="lantern-logo" aria-label="Lantern">
      <svg className="lantern-logo-mark" viewBox="0 0 52 52" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="brand-shard" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#ffdc00" />
            <stop offset="1" stopColor="#f47a20" />
          </linearGradient>
        </defs>
        {shards.map(({ angle, radius, hue }, index) => (
          <path
            key={angle}
            d={`M26 ${26 - radius - 4.5} L30 ${26 - radius} L26 ${26 - radius + 4.5} L22 ${26 - radius} Z`}
            transform={`rotate(${angle} 26 26)`}
            fill={index % 3 === 0 ? `hsl(${hue} 96% 54%)` : "url(#brand-shard)"}
          />
        ))}
        <path d="M24 23 L28 26 L24 29 L21 26 Z" fill="#ffb000" />
      </svg>
      <span className="lantern-logo-word">LANTERN<span className="logo-flame">◆</span></span>
    </span>
  );
}
