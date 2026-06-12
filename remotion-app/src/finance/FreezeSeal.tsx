// 封条盖章 - 「政治人质」红章砸下 + 资金从美债流向黄金
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

export const FreezeSeal: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  // 盖章：缩放砸下
  const s = spring({ frame: f, fps, config: { damping: 8, mass: 0.6 } });
  const scale = interpolate(s, [0, 1], [2.6, 1]);
  const o = interpolate(s, [0, 1], [0, 1]);
  // 资金流向：美债→黄金
  const flow = interpolate(f, [40, 90], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const coinX = interpolate(flow, [0, 1], [260, 700]);

  return (
    <svg width={960} height={520} viewBox="0 0 960 520">
      {/* 美债箱 */}
      <rect x={160} y={180} width={200} height={150} rx={12}
        fill={C.paper} stroke={C.teal} strokeWidth={4} />
      <text x={260} y={250} textAnchor="middle" fill={C.teal}
        fontFamily={FONT.sans} fontWeight={700} fontSize={30}>美债</text>
      <text x={260} y={295} textAnchor="middle" fill={C.dim}
        fontFamily={FONT.sans} fontSize={22}>抛售</text>
      {/* 黄金箱 */}
      <rect x={600} y={180} width={200} height={150} rx={12}
        fill={C.paper} stroke={C.gold} strokeWidth={4} />
      <text x={700} y={250} textAnchor="middle" fill={C.gold}
        fontFamily={FONT.sans} fontWeight={700} fontSize={30}>黄金</text>
      <text x={700} y={295} textAnchor="middle" fill={C.dim}
        fontFamily={FONT.sans} fontSize={22}>买入</text>
      {/* 流向箭头 */}
      <line x1={360} y1={255} x2={600} y2={255} stroke={C.gold} strokeWidth={4}
        strokeDasharray="8 8" opacity={flow > 0 ? 0.7 : 0.2} />
      {flow > 0 && flow < 1 && (
        <circle cx={coinX} cy={255} r={16} fill={C.gold}
          style={{ filter: `drop-shadow(0 2px 6px ${C.gold}aa)` }} />
      )}
      {/* 封条印章 */}
      <g transform={`translate(480, 130) scale(${scale}) rotate(-10)`} opacity={o}>
        <rect x={-170} y={-44} width={340} height={88} rx={8}
          fill="none" stroke={C.red} strokeWidth={6} />
        <text textAnchor="middle" dominantBaseline="central" fill={C.red}
          fontFamily={FONT.sans} fontWeight={800} fontSize={38}>政治人质 · 冻结3000亿</text>
      </g>
    </svg>
  );
};
