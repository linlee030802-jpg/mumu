// 期权·时间维度 — 扫盲极简几何风 组件库
// 暖白纸底 + 克莱因蓝主色 + 朱红警示 + 超粗黑体 + 几何体，纯代码生成不依赖AI图
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";

export const SANS = '"Source Han Sans CN","PingFang SC","Helvetica Neue",sans-serif';
export const MONO = '"DIN Alternate","Roboto Mono",ui-monospace,monospace';
const SMOOTH = Easing.bezier(0.16, 1, 0.3, 1);

export const C = {
  paper: "#F4F1EA",      // 暖白纸底
  ink: "#1A1A1A",        // 墨黑字
  blue: "#1A2EE0",       // 克莱因蓝主色
  blueLite: "#5B6BF0",
  red: "#E63A2E",        // 朱红警示
  amber: "#E0A22B",      // 点缀
  mute: "#8A867C",       // 灰副文
};

// 纸纹背景 + 极淡网格 + 进出淡化
export const Stage: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, opacity: o, overflow: "hidden" }}>
      {/* 极淡网格 */}
      <AbsoluteFill style={{ backgroundImage:
        `linear-gradient(rgba(26,26,26,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.035) 1px, transparent 1px)`,
        backgroundSize: "90px 90px" }} />
      {children}
    </AbsoluteFill>
  );
};

// 超粗黑体标题：逐字块上浮（粉笔扫盲感）
export const BigTitle: React.FC<{ text: string; size?: number; color?: string; top?: number; delay?: number }> =
({ text, size = 120, color = C.ink, top = 280, delay = 4 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 24], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top, width: "100%", textAlign: "center",
      fontFamily: SANS, fontWeight: 900, fontSize: size, color, letterSpacing: -2, lineHeight: 1.1,
      opacity: p, transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)` }}>{text}</div>
  );
};

// 副标/小字
export const Sub: React.FC<{ text: string; top: number; delay?: number; color?: string; size?: number }> =
({ text, top, delay = 12, color = C.mute, size = 40 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 20], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top, width: "100%", textAlign: "center",
      fontFamily: SANS, fontWeight: 600, fontSize: size, color, letterSpacing: 1, opacity: p }}>{text}</div>
  );
};

// 来源/章节角标
export const Corner: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ position: "absolute", left: 60, top: 80, display: "flex", alignItems: "center", gap: 14 }}>
    <div style={{ width: 8, height: 40, background: C.blue }} />
    <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 30, color: C.ink, letterSpacing: 2 }}>{text}</span>
  </div>
);
