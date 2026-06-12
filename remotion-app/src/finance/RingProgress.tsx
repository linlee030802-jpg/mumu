// 环形进度 - 占比生长，超过红线阈值转红脉冲
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

export const RingProgress: React.FC<{
  value: number;      // 当前百分比，如 127
  threshold?: number; // 安全线，如 60
  label?: string;
  delay?: number;
  dur?: number;
  size?: number;
}> = ({ value, threshold = 60, label = "", delay = 0, dur = 40, size = 360 }) => {
  const frame = useCurrentFrame();
  const f = frame - delay;
  const r = size / 2 - 30;
  const circ = 2 * Math.PI * r;
  // 以 100% 为基准刻度，可超过
  const maxScale = Math.max(value, 100);
  const p = interpolate(f, [0, dur], [0, value / maxScale], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shown = Math.round((value) * interpolate(f, [0, dur], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  }));
  const over = shown > threshold;
  const pulse = over
    ? interpolate(Math.sin(f / 5), [-1, 1], [0.6, 1])
    : 1;
  const ringColor = over ? C.red : C.teal;
  const thrAngle = (threshold / maxScale) * 360;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 底环 */}
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="rgba(80,60,30,0.12)" strokeWidth={20} />
      {/* 安全线刻度 */}
      <line
        x1={size / 2} y1={size / 2}
        x2={size / 2 + r * Math.cos((thrAngle - 90) * Math.PI / 180)}
        y2={size / 2 + r * Math.sin((thrAngle - 90) * Math.PI / 180)}
        stroke={C.gold} strokeWidth={3} strokeDasharray="4 4" opacity={0.8}
      />
      {/* 进度环 */}
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={ringColor} strokeWidth={20} strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - p)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ filter: `drop-shadow(0 4px 10px ${ringColor}55)`, opacity: pulse }}
      />
      {/* 中心数字 */}
      <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="central"
        fill={ringColor} fontFamily={FONT.mono} fontWeight={800} fontSize={size * 0.22}>
        {shown}%
      </text>
      {label && (
        <text x={size / 2} y={size / 2 + size * 0.18} textAnchor="middle"
          fill={C.dim} fontFamily={FONT.sans} fontSize={size * 0.07}>
          {label}
        </text>
      )}
    </svg>
  );
};
