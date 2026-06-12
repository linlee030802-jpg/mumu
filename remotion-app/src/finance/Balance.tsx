// 天平倾斜 - 投入远大于产出，横梁向投入侧压沉（16:1 失衡）
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

export const Balance: React.FC<{
  left: { label: string; value: string };   // 投入 5600亿
  right: { label: string; value: string };  // 产出 350亿
  ratio?: string;                            // "16:1"
  delay?: number;
}> = ({ left, right, ratio = "16 : 1", delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const tilt = interpolate(f, [20, 60], [0, 14], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const cx = 480, cy = 160, arm = 300;
  const lx = cx - arm * Math.cos(tilt * Math.PI / 180);
  const ly = cy + arm * Math.sin(tilt * Math.PI / 180);
  const rx = cx + arm * Math.cos(tilt * Math.PI / 180);
  const ry = cy - arm * Math.sin(tilt * Math.PI / 180);
  const ratioS = spring({ frame: f - 55, fps, config: { damping: 9 } });
  const ratioScale = interpolate(ratioS, [0, 1], [2, 1]);
  const ratioO = interpolate(ratioS, [0, 1], [0, 1]);

  const Pan: React.FC<{ x: number; y: number; d: { label: string; value: string }; color: string }> =
  ({ x, y, d, color }) => (
    <g>
      <line x1={x} y1={y} x2={x} y2={y + 50} stroke={C.dim} strokeWidth={3} />
      <rect x={x - 110} y={y + 50} width={220} height={120} rx={12}
        fill={C.paper} stroke={color} strokeWidth={4}
        style={{ filter: `drop-shadow(0 6px 14px ${color}44)` }} />
      <text x={x} y={y + 100} textAnchor="middle" fill={color}
        fontFamily={FONT.mono} fontWeight={800} fontSize={42}>{d.value}</text>
      <text x={x} y={y + 140} textAnchor="middle" fill={C.dim}
        fontFamily={FONT.sans} fontSize={24}>{d.label}</text>
    </g>
  );

  return (
    <svg width={960} height={500} viewBox="0 0 960 500">
      {/* 支柱 */}
      <line x1={cx} y1={cy} x2={cx} y2={420} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
      <polygon points={`${cx - 50},420 ${cx + 50},420 ${cx},370`} fill={C.ink} opacity={0.15} />
      {/* 横梁 */}
      <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={C.ink} strokeWidth={8} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={12} fill={C.gold} />
      <Pan x={lx} y={ly} d={left} color={C.red} />
      <Pan x={rx} y={ry} d={right} color={C.teal} />
      {/* 比例标注 */}
      <text x={cx} y={470} textAnchor="middle" fill={C.red}
        fontFamily={FONT.mono} fontWeight={800} fontSize={56}
        transform={`scale(${ratioScale})`} transform-origin={`${cx} 470`}
        opacity={ratioO} style={{ transformBox: "fill-box" }}>{ratio}</text>
    </svg>
  );
};
