// 债务雪球 - 从坡顶由小滚到坡底变大，利息越滚越多
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "./theme";

export const Snowball: React.FC<{ delay?: number; label?: string }> =
({ delay = 0, label = "利息滚雪球" }) => {
  const frame = useCurrentFrame();
  const f = frame - delay;
  const p = interpolate(f, [0, 70], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  // 坡道：从左上到右下
  const x = interpolate(p, [0, 1], [180, 760]);
  const y = interpolate(p, [0, 1], [150, 430]);
  const r = interpolate(p, [0, 1], [26, 110]);
  const roll = p * 540;

  return (
    <svg width={960} height={560} viewBox="0 0 960 560">
      {/* 坡道 */}
      <path d="M120 120 L860 470 L860 520 L120 520 Z" fill={C.line} opacity={0.5} />
      <line x1={120} y1={120} x2={860} y2={470} stroke={C.dim} strokeWidth={4} />
      {/* 轨迹拖影 */}
      <line x1={180} y1={150} x2={x} y2={y} stroke={C.gold} strokeWidth={3}
        strokeDasharray="6 8" opacity={0.5} />
      {/* 雪球 */}
      <g transform={`translate(${x},${y}) rotate(${roll})`}>
        <circle r={r} fill={C.paper} stroke={C.gold} strokeWidth={5}
          style={{ filter: `drop-shadow(0 6px 14px ${C.gold}66)` }} />
        <text textAnchor="middle" dominantBaseline="central" fill={C.gold}
          fontFamily={FONT.sans} fontWeight={800} fontSize={r * 0.5}>￥</text>
      </g>
      {p > 0.8 && (
        <text x={760} y={300} textAnchor="middle" fill={C.red}
          fontFamily={FONT.sans} fontWeight={800} fontSize={40}>{label}</text>
      )}
    </svg>
  );
};
