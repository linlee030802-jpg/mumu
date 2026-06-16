// 保时捷轧空 — 真人口播叠加层组件（科技蓝金，卡靠侧浮出，真人不挡）
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { P, SANS, MONO } from "./Broll";

const SMOOTH = Easing.bezier(0.16, 1, 0.3, 1);

// 侧滑入场 + 到点淡出
export const Pop: React.FC<{ at: number; out: number; from?: "left" | "right"; children: React.ReactNode }> =
({ at, out, from = "left", children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - at, fps, config: { damping: 22, mass: 0.9 } });
  const fade = interpolate(frame, [out, out + 16], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const o = interpolate(s, [0, 1], [0, 1]) * fade;
  const dx = from === "left" ? -70 : 70;
  return <div style={{ opacity: o, transform: `translateX(${interpolate(s, [0, 1], [dx, 0])}px)` }}>{children}</div>;
};

// 毛玻璃浮卡
export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ padding: "30px 36px", borderRadius: 22, background: "rgba(12,18,34,0.86)",
    backdropFilter: "blur(18px)", border: `1px solid ${P.blue}55`,
    boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${P.blue}22`, display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
);

// 中英双语标题（叠加层用，紧凑）
export const Tag: React.FC<{ en: string; zh: string; accent?: "gold" | "blue" | "red" }> = ({ en, zh, accent = "gold" }) => {
  const c = accent === "blue" ? P.blueLite : accent === "red" ? P.red : P.goldLite;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: `13px solid ${c}` }} />
      <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: c, textTransform: "uppercase" }}>{en}</span>
      <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 26, color: P.ink }}>{zh}</span>
    </div>
  );
};

// 大数字（叠加层用，滚动）
export const Num: React.FC<{ at: number; value: number; prefix?: string; suffix?: string; color?: string }> =
({ at, value, prefix = "", suffix = "", color = P.goldLite }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 30], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cur = value * p;
  const txt = Number.isInteger(value) ? Math.round(cur).toLocaleString() : cur.toFixed(1);
  return (
    <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 92, color, lineHeight: 1, letterSpacing: -2,
      textShadow: `0 0 30px ${color}66` }}>{prefix}{txt}<span style={{ fontSize: 48 }}>{suffix}</span></div>
  );
};

// 持仓堆叠条（紧凑横向）
export const StackMini: React.FC<{ at: number }> = ({ at }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const segs = [{ l: "保时捷股份", p: 42, c: P.gold }, { l: "保时捷期权", p: 32, c: P.goldLite }, { l: "州政府", p: 20, c: P.blue }, { l: "自由流通", p: 6, c: P.red }];
  return (
    <div style={{ width: 620 }}>
      <div style={{ display: "flex", height: 56, borderRadius: 10, overflow: "hidden", border: `1px solid ${P.mute}66` }}>
        {segs.map((s, i) => {
          const g = spring({ frame: frame - at - i * 10, fps, config: { damping: 18 } });
          return <div key={i} style={{ width: `${s.p * interpolate(g, [0, 1], [0, 1])}%`, background: s.c }} />;
        })}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", marginTop: 16 }}>
        {segs.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8,
            opacity: interpolate(frame, [at + 20 + i * 8, at + 36 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
            <div style={{ width: 18, height: 18, background: s.c, borderRadius: 4 }} />
            <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 24, color: P.ink }}>{s.l}</span>
            <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 28, color: s.c }}>{s.p}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 全屏 B-roll 切片：盖在口播画面上几秒（声音继续），Ken Burns + 双语标 + 署名
import { AbsoluteFill, Img, staticFile } from "remotion";
export const BrollCut: React.FC<{ img: string; dur: number; en: string; zh: string; credit: string; pan?: "in" | "left" }> =
({ img, dur, en, zh, credit, pan = "in" }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 10, dur - 12, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = pan === "in" ? interpolate(frame, [0, dur], [1.12, 1.24]) : 1.18;
  const tx = pan === "left" ? interpolate(frame, [0, dur], [30, -30]) : 0;
  return (
    <AbsoluteFill style={{ opacity: o, backgroundColor: P.bg, overflow: "hidden" }}>
      <Img src={staticFile(`porsche/${img}`)} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale}) translateX(${tx}px)` }} />
      <AbsoluteFill style={{ background: P.blue, mixBlendMode: "soft-light", opacity: 0.32 }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 38%, rgba(10,14,26,0.8) 100%)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(10,14,26,0.85) 0%, transparent 28%, transparent 72%, rgba(10,14,26,0.6) 100%)" }} />
      <div style={{ position: "absolute", left: 70, bottom: 90 }}><Tag en={en} zh={zh} /></div>
      <div style={{ position: "absolute", right: 28, bottom: 22, fontFamily: SANS, fontSize: 17, color: P.mute }}>{credit}</div>
    </AbsoluteFill>
  );
};
