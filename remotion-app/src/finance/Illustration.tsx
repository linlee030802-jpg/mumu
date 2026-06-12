// 水彩插画载入 - spring 弹入 + 持续轻微浮动 + 底部水彩晕染托盘
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "./theme";

export const Illustration: React.FC<{
  src: string;          // public/finance 下文件名，如 "gold_bars.png"
  size?: number;        // 高度 px
  delay?: number;
  wash?: string;        // 水彩晕染色
  floatAmp?: number;    // 浮动幅度
  rotate?: number;      // 初始轻微旋转
}> = ({ src, size = 560, delay = 0, wash = C.gold, floatAmp = 14, rotate = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const s = spring({ frame: f, fps, config: { damping: 13, mass: 0.7 } });
  const scale = interpolate(s, [0, 1], [0.7, 1]);
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const float = Math.sin((frame - delay) / 26) * floatAmp;
  const rot = interpolate(s, [0, 1], [rotate * 1.6, rotate]);

  return (
    <div style={{
      position: "relative", display: "flex",
      justifyContent: "center", alignItems: "center",
      transform: `translateY(${float}px) scale(${scale}) rotate(${rot}deg)`,
      opacity,
    }}>
      {/* 水彩晕染托盘 */}
      <div style={{
        position: "absolute", width: size * 1.05, height: size * 1.05,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${wash}33 0%, ${wash}14 45%, transparent 70%)`,
        filter: "blur(8px)",
      }} />
      <Img
        src={staticFile(`finance/${src}`)}
        style={{
          height: size, width: "auto", objectFit: "contain",
          filter: "drop-shadow(0 12px 28px rgba(80,60,30,0.18))",
        }}
      />
    </div>
  );
};

// 手绘圈选标注（强调用）
export const HandCircle: React.FC<{
  w?: number; h?: number; delay?: number; color?: string;
}> = ({ w = 340, h = 160, delay = 0, color = C.red }) => {
  const frame = useCurrentFrame();
  const f = frame - delay;
  const draw = interpolate(f, [0, 22], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const rx = w / 2, ry = h / 2;
  const peri = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}
      style={{ position: "absolute", overflow: "visible" }}>
      <ellipse cx={rx} cy={ry} rx={rx - 6} ry={ry - 6}
        fill="none" stroke={color} strokeWidth={5} strokeLinecap="round"
        strokeDasharray={peri} strokeDashoffset={peri * (1 - draw)}
        transform={`rotate(-4 ${rx} ${ry})`} />
    </svg>
  );
};
