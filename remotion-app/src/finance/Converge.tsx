// 三因汇流 - 三条线从上方汇聚到一点，压向「最后一根稻草」
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

const CAUSES = [
  { label: "债务到顶", color: C.red, x: 200 },
  { label: "AI泡沫", color: C.orange, x: 480 },
  { label: "美元信任塌", color: C.blue, x: 760 },
];

export const Converge: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const meetX = 480, meetY = 420;
  const draw = interpolate(f, [0, 36], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const strawS = spring({ frame: f - 40, fps, config: { damping: 10 } });
  const strawO = interpolate(strawS, [0, 1], [0, 1]);
  const strawY = interpolate(strawS, [0, 1], [-30, 0]);

  return (
    <svg width={960} height={560} viewBox="0 0 960 560">
      {CAUSES.map((c, i) => {
        const ex = c.x + (meetX - c.x) * draw;
        const ey = 120 + (meetY - 120) * draw;
        const ns = spring({ frame: f - i * 6, fps, config: { damping: 13 } });
        const sc = interpolate(ns, [0, 1], [0, 1]);
        return (
          <g key={c.label}>
            <line x1={c.x} y1={120} x2={ex} y2={ey} stroke={c.color} strokeWidth={5}
              strokeLinecap="round" opacity={0.7} />
            <g transform={`translate(${c.x},120) scale(${sc})`}>
              <rect x={-90} y={-40} width={180} height={80} rx={12}
                fill={C.paper} stroke={c.color} strokeWidth={4} />
              <text textAnchor="middle" dominantBaseline="central" fill={c.color}
                fontFamily={FONT.sans} fontWeight={700} fontSize={28}>{c.label}</text>
            </g>
          </g>
        );
      })}
      {/* 汇聚点 */}
      <circle cx={meetX} cy={meetY} r={18 * draw} fill={C.red}
        style={{ filter: `drop-shadow(0 3px 8px ${C.red}66)` }} />
      {/* 最后一根稻草 */}
      <text x={meetX} y={meetY + 80} textAnchor="middle" fill={C.red}
        fontFamily={FONT.sans} fontWeight={800} fontSize={44}
        opacity={strawO} transform={`translateY(${strawY}px)`}>
        最后一根稻草
      </text>
    </svg>
  );
};
