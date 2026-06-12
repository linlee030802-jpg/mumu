// 双柱此消彼长 - 黄金占比反超美债
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "./theme";

export const DualBarSwap: React.FC<{
  left: { name: string; value: number; color: string };
  right: { name: string; value: number; color: string };
  delay?: number;
  dur?: number;
}> = ({ left, right, delay = 0, dur = 45 }) => {
  const frame = useCurrentFrame();
  const f = frame - delay;
  const p = interpolate(f, [0, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const maxV = Math.max(left.value, right.value);
  const H = 460;
  const bars = [left, right];

  return (
    <svg width={620} height={620} viewBox="0 0 620 620">
      {bars.map((b, i) => {
        const h = (b.value / maxV) * H * p;
        const x = 140 + i * 240;
        const shown = Math.round(b.value * p);
        return (
          <g key={b.name}>
            <rect x={x} y={520 - h} width={140} height={h} rx={6}
              fill={b.color}
              style={{ filter: `drop-shadow(0 6px 14px ${b.color}66)` }} />
            <text x={x + 70} y={520 - h - 24} textAnchor="middle"
              fill={b.color} fontFamily={FONT.mono} fontWeight={800} fontSize={56}>
              {shown}%
            </text>
            <text x={x + 70} y={560} textAnchor="middle"
              fill={C.ink} fontFamily={FONT.sans} fontWeight={600} fontSize={26}>
              {b.name}
            </text>
          </g>
        );
      })}
      {p > 0.95 && (
        <text x={310} y={70} textAnchor="middle" fill={C.gold}
          fontFamily={FONT.sans} fontWeight={800} fontSize={32}
          style={{ filter: `drop-shadow(0 2px 6px ${C.gold}66)` }}>
          30年来头一回
        </text>
      )}
    </svg>
  );
};
