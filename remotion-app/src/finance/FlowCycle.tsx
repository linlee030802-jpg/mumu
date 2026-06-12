// 资金循环箭头 - 三节点闭环，箭头依次 draw-in，钱币沿路径流转
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

const NODES = [
  { name: "英伟达", x: 480, y: 180 },
  { name: "OpenAI", x: 760, y: 600 },
  { name: "甲骨文", x: 200, y: 600 },
];

// 三角顺时针：英伟达→OpenAI→甲骨文→英伟达
const EDGES = [
  [0, 1],
  [1, 2],
  [2, 0],
];

export const FlowCycle: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;

  return (
    <svg width={960} height={820} viewBox="0 0 960 820">
      {EDGES.map((e, i) => {
        const a = NODES[e[0]];
        const b = NODES[e[1]];
        const len = Math.hypot(b.x - a.x, b.y - a.y);
        const segStart = 20 + i * 22;
        const grow = interpolate(f, [segStart, segStart + 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        // 钱币沿线移动
        const coinT = interpolate(
          f,
          [segStart + 20, segStart + 44],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const cx = a.x + (b.x - a.x) * coinT;
        const cy = a.y + (b.y - a.y) * coinT;
        return (
          <g key={i}>
            <line
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={C.gold} strokeWidth={5}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - grow)}
              strokeLinecap="round"
            />
            {coinT > 0 && coinT < 1 && (
              <circle cx={cx} cy={cy} r={14} fill={C.gold}
                style={{ filter: `drop-shadow(0 2px 6px ${C.gold}aa)` }} />
            )}
          </g>
        );
      })}
      {NODES.map((n, i) => {
        const s = spring({ frame: f - i * 6, fps, config: { damping: 12 } });
        const sc = interpolate(s, [0, 1], [0, 1]);
        return (
          <g key={n.name} transform={`translate(${n.x},${n.y}) scale(${sc})`}>
            <circle r={64} fill={C.paper} stroke={C.teal} strokeWidth={4}
              style={{ filter: `drop-shadow(0 4px 12px ${C.teal}55)` }} />
            <text textAnchor="middle" dominantBaseline="central"
              fill={C.ink} fontFamily={FONT.sans} fontWeight={700} fontSize={26}>
              {n.name}
            </text>
          </g>
        );
      })}
      {/* 中心揭示 */}
      {f > 90 && (
        <text x={480} y={440} textAnchor="middle" fill={C.red}
          fontFamily={FONT.sans} fontWeight={800} fontSize={40}
          style={{ filter: `drop-shadow(0 2px 6px ${C.red}66)` }}>
          左手倒右手
        </text>
      )}
    </svg>
  );
};
