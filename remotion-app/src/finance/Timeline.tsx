// 横向时间轴 - 主线 draw-in + 节点逐个爆闪点亮（1987/2000/2008）
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

export const Timeline: React.FC<{
  nodes: { year: string; label: string }[];
  delay?: number;
  stampText?: string;   // 末尾盖章，如「已清空美股」
}> = ({ nodes, delay = 0, stampText }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const W = 1400, x0 = 160, x1 = W - 160, y = 200;
  const lineGrow = interpolate(f, [0, 30], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const gap = (x1 - x0) / (nodes.length - 1);
  const stampS = spring({ frame: f - 30 - nodes.length * 16, fps, config: { damping: 9, mass: 0.7 } });
  const stampScale = interpolate(stampS, [0, 1], [2.2, 1]);
  const stampO = interpolate(stampS, [0, 1], [0, 1]);

  return (
    <svg width={W} height={400} viewBox={`0 0 ${W} 400`}>
      <line x1={x0} y1={y} x2={x0 + (x1 - x0) * lineGrow} y2={y}
        stroke={C.dim} strokeWidth={5} strokeLinecap="round" />
      {nodes.map((n, i) => {
        const cx = x0 + gap * i;
        const ns = spring({ frame: f - 30 - i * 16, fps, config: { damping: 11 } });
        const sc = interpolate(ns, [0, 1], [0, 1]);
        const flash = interpolate(f - 30 - i * 16, [0, 6, 14], [0, 1, 0], {
          extrapolateLeft: "clamp", extrapolateRight: "clamp",
        });
        return (
          <g key={n.year}>
            <circle cx={cx} cy={y} r={26 + flash * 22} fill={C.red} opacity={flash * 0.4} />
            <circle cx={cx} cy={y} r={22 * sc} fill={C.red}
              style={{ filter: `drop-shadow(0 3px 8px ${C.red}66)` }} />
            <text x={cx} y={y - 56} textAnchor="middle" fill={C.ink}
              fontFamily={FONT.mono} fontWeight={800} fontSize={48} opacity={sc}>{n.year}</text>
            <text x={cx} y={y + 70} textAnchor="middle" fill={C.dim}
              fontFamily={FONT.sans} fontSize={26} opacity={sc}>{n.label}</text>
          </g>
        );
      })}
      {stampText && (
        <g transform={`translate(${W / 2}, 340) scale(${stampScale}) rotate(-8)`} opacity={stampO}>
          <rect x={-180} y={-38} width={360} height={76} rx={8}
            fill="none" stroke={C.red} strokeWidth={5} />
          <text textAnchor="middle" dominantBaseline="central" fill={C.red}
            fontFamily={FONT.sans} fontWeight={800} fontSize={40}>{stampText}</text>
        </g>
      )}
    </svg>
  );
};
