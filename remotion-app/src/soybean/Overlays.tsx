// 0508豆粕片 — 口播叠加动效组件库（学参考图：中英双语+绿色高亮+浮卡靠侧+真人不挡）
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";

export const SANS = '"Source Han Sans CN","PingFang SC","Helvetica Neue",sans-serif';
export const MONO = '"DIN Alternate","Roboto Mono",ui-monospace,monospace';
const SMOOTH = Easing.bezier(0.16, 1, 0.3, 1);
export const G = {
  green: "#1DB954", greenLite: "#3DE07A", ink: "#0d1410",
  panel: "rgba(10,18,12,0.82)", line: "rgba(60,224,122,0.35)", white: "#eafff0",
};

// 入场包装：从侧边滑入 + 淡入 + 到时淡出
export const Pop: React.FC<{ at: number; out?: number; from?: "left" | "right" | "up"; children: React.ReactNode }> =
({ at, out, from = "left", children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 22, mass: 0.9 } });
  const fadeOut = out ? interpolate(frame, [out, out + 14], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;
  const o = interpolate(s, [0, 1], [0, 1]) * fadeOut;
  const dx = from === "left" ? -60 : from === "right" ? 60 : 0;
  const dy = from === "up" ? 40 : 0;
  const x = interpolate(s, [0, 1], [dx, 0]);
  const y = interpolate(s, [0, 1], [dy, 0]);
  return <div style={{ opacity: o, transform: `translate(${x}px, ${y}px)` }}>{children}</div>;
};

// 中英双语高亮标（参考图核心手法：ENGLISH 大写 + 中文）
export const BiTag: React.FC<{ en: string; zh: string; accent?: boolean }> = ({ en, zh, accent }) => (
  <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
    <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 26, letterSpacing: 3,
      color: accent ? G.greenLite : G.white, textTransform: "uppercase" }}>{en}</span>
    <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 30, color: accent ? G.greenLite : G.white }}>{zh}</span>
  </div>
);

// 环形进度（90%）— 绿色描边生长 + 中心大数字
export const Ring: React.FC<{ at: number; pct: number; size?: number }> = ({ at, pct, size = 160 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 36], [0, pct / 100], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const r = size / 2 - 10, circ = 2 * Math.PI * r;
  const cur = Math.round(interpolate(frame, [at, at + 36], [0, pct], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={10} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={G.greenLite} strokeWidth={10} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - p)} style={{ filter: `drop-shadow(0 0 8px ${G.green})` }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 52, color: G.greenLite }}>{cur}%</span>
      </div>
    </div>
  );
};

// 资金/逻辑流向箭头：A → B
export const FlowArrow: React.FC<{ at: number; from: string; to: string }> = ({ at, from, to }) => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame, [at, at + 24], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Chip text={from} />
      <div style={{ width: 60 * grow, height: 3, background: G.greenLite, position: "relative", boxShadow: `0 0 8px ${G.green}` }}>
        <div style={{ position: "absolute", right: -2, top: -4, opacity: grow > 0.8 ? 1 : 0,
          borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: `10px solid ${G.greenLite}` }} />
      </div>
      <div style={{ opacity: grow > 0.85 ? 1 : 0 }}><Chip text={to} accent /></div>
    </div>
  );
};

const Chip: React.FC<{ text: string; accent?: boolean }> = ({ text, accent }) => (
  <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 26, padding: "10px 18px", borderRadius: 12,
    color: accent ? G.ink : G.white, background: accent ? G.greenLite : "rgba(255,255,255,0.1)",
    border: `1px solid ${accent ? G.greenLite : "rgba(255,255,255,0.2)"}`, whiteSpace: "nowrap" }}>{text}</div>
);

// 大数字滚动（3亿吨）
export const BigNum: React.FC<{ at: number; value: number; unit: string; label: string }> = ({ at, value, unit, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cur = (value * interpolate(frame, [at, at + 40], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toFixed(0);
  const s = spring({ frame: frame - at - 36, fps, config: { damping: 12 } });
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
      <BiTag en="GLOBAL OUTPUT" zh={label} accent />
      <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 92, color: G.white, lineHeight: 1,
        transform: `scale(${interpolate(s, [0, 1], [0.85, 1])})`, transformOrigin: "left",
        textShadow: `0 0 30px ${G.green}` }}>
        {cur}<span style={{ fontSize: 44, color: G.greenLite, marginLeft: 8 }}>{unit}</span>
      </div>
    </div>
  );
};

// 毛玻璃浮卡容器（靠侧用）
export const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ padding: "26px 30px", borderRadius: 20, background: G.panel,
    backdropFilter: "blur(20px)", border: `1px solid ${G.line}`,
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
);
