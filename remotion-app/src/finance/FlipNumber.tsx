// 数字翻牌 - 旧值翻走、新值翻入（利率 3%→6% / 日期）
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

export const FlipNumber: React.FC<{
  from: string;
  to: string;
  label?: string;
  flipAt?: number;   // 翻牌帧
  color?: string;
  size?: number;
  delay?: number;
}> = ({ from, to, label = "", flipAt = 30, color = C.red, size = 130, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const flipped = f >= flipAt;
  const flip = spring({ frame: f - flipAt, fps, config: { damping: 12, mass: 0.6 } });
  const rot = flipped ? interpolate(flip, [0, 1], [-90, 0]) : 0;
  const show = flipped ? to : from;
  // 入场
  const enter = spring({ frame: f, fps, config: { damping: 14 } });
  const ey = interpolate(enter, [0, 1], [40, 0]);
  const eo = interpolate(enter, [0, 1], [0, 1]);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
      opacity: eo, transform: `translateY(${ey}px)`,
    }}>
      {label && (
        <div style={{ fontFamily: FONT.sans, fontSize: size * 0.28, color: C.dim, fontWeight: 600 }}>
          {label}
        </div>
      )}
      <div style={{
        fontFamily: FONT.mono, fontWeight: 800, fontSize: size, color,
        transform: `perspective(600px) rotateX(${rot}deg)`,
        textShadow: "0 4px 10px rgba(80,60,30,0.2)",
        transition: "none",
      }}>
        {show}
      </div>
    </div>
  );
};
