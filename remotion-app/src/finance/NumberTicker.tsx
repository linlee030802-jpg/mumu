// 数字滚动计数器 - 大数字滚动到目标值，落定弹一下
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, fmt } from "./theme";

export const NumberTicker: React.FC<{
  to: number;
  digits?: number;
  prefix?: string;
  suffix?: string;
  unit?: string;
  color?: string;
  size?: number;
  delay?: number;
  dur?: number;
}> = ({
  to,
  digits = 0,
  prefix = "",
  suffix = "",
  unit = "",
  color = C.ink,
  size = 120,
  delay = 0,
  dur = 40,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  // 滚动进度
  const p = interpolate(f, [0, dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const val = to * p;
  // 落定弹一下
  const pop = spring({ frame: f - dur, fps, config: { damping: 9, mass: 0.5 } });
  const scale = f >= dur ? interpolate(pop, [0, 1], [1.18, 1]) : 1;
  // 滚动时轻微模糊
  const blur = interpolate(p, [0, 0.85, 1], [6, 2, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        color,
        fontFamily: FONT.mono,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: 1,
        transform: `scale(${scale})`,
        filter: `blur(${blur}px)`,
        textShadow: `0 3px 8px rgba(80,60,30,0.20)`,
      }}
    >
      {prefix}
      {fmt(val, digits)}
      {unit && <span style={{ fontSize: size * 0.42, marginLeft: 6 }}>{unit}</span>}
      {suffix}
    </span>
  );
};
