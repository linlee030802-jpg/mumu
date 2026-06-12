// 财富转移 - 金币从「沉不住气」一侧流向「沉得住气」一侧
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "./theme";

const COINS = Array.from({ length: 6 }, (_, i) => i);

export const WealthShift: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const f = frame - delay;

  const Side: React.FC<{ x: number; label: string; color: string; pile: number }> =
  ({ x, label, color, pile }) => (
    <g>
      <circle cx={x} cy={180} r={70} fill={`${color}22`} stroke={color} strokeWidth={4} />
      <text x={x} y={180} textAnchor="middle" dominantBaseline="central" fontSize={56}>
        {color === C.red ? "😰" : "😌"}
      </text>
      <text x={x} y={300} textAnchor="middle" fill={color}
        fontFamily={FONT.sans} fontWeight={700} fontSize={30}>{label}</text>
      {/* 财富堆 */}
      {Array.from({ length: pile }, (_, i) => (
        <circle key={i} cx={x - 40 + (i % 4) * 28} cy={360 - Math.floor(i / 4) * 24}
          r={12} fill={C.gold} opacity={0.9} />
      ))}
    </g>
  );

  const t = interpolate(f, [10, 70], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const leftPile = Math.round(8 * (1 - t));
  const rightPile = Math.round(8 * t);
  const coinX = interpolate(t, [0, 1], [300, 660]);

  return (
    <svg width={960} height={440} viewBox="0 0 960 440">
      <Side x={300} label="沉不住气的人" color={C.red} pile={leftPile} />
      <Side x={660} label="沉得住气的人" color={C.teal} pile={rightPile} />
      {/* 流动金币 */}
      {COINS.map((i) => {
        const tt = (t - i * 0.08);
        if (tt <= 0 || tt >= 1) return null;
        const cx = 300 + (660 - 300) * tt;
        const cy = 360 - Math.sin(tt * Math.PI) * 120;
        return <circle key={i} cx={cx} cy={cy} r={14} fill={C.gold}
          style={{ filter: `drop-shadow(0 2px 6px ${C.gold}aa)` }} />;
      })}
      <text x={480} y={420} textAnchor="middle" fill={C.dim}
        fontFamily={FONT.sans} fontSize={26}>财富只是换了主人</text>
    </svg>
  );
};
