// 保时捷轧空大众 — 历史增信B-roll + 数据动效（科技蓝金，冷峻机构厮杀质感）
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";

export const SANS = '"Source Han Sans CN","PingFang SC","Helvetica Neue",sans-serif';
export const MONO = '"DIN Alternate","Roboto Mono",ui-monospace,monospace';
const SMOOTH = Easing.bezier(0.16, 1, 0.3, 1);

export const P = {
  bg: "#0A0E1A",        // 深蓝黑底
  ink: "#EAF0FF",       // 冷白字
  blue: "#2B6BFF",      // 科技蓝
  blueLite: "#5B9BFF",
  gold: "#E0A22B",      // 金色高亮
  goldLite: "#FFD36B",
  red: "#E63A2E",       // 暴涨/警示红
  mute: "#7E89A8",
};

// 中英双语标题（学拉片：英文大写等宽 + 中文 + ▶引导）
export const BiTag: React.FC<{ en: string; zh: string; at?: number; accent?: "gold" | "blue" | "red" }> =
({ en, zh, at = 0, accent = "gold" }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [at, at + 18], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const c = accent === "blue" ? P.blueLite : accent === "red" ? P.red : P.goldLite;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, opacity: p, transform: `translateX(${interpolate(p, [0, 1], [-30, 0])}px)` }}>
      <div style={{ width: 0, height: 0, borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: `16px solid ${c}` }} />
      <span style={{ fontFamily: MONO, fontWeight: 800, fontSize: 28, letterSpacing: 3, color: c, textTransform: "uppercase" }}>{en}</span>
      <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 32, color: P.ink }}>{zh}</span>
    </div>
  );
};

// B-roll 图片镜：Ken Burns 运镜 + 冷蓝压色 + 暗角 + 进出淡化
export const BRoll: React.FC<{
  img: string; dur: number; pan?: "in" | "out" | "left" | "right";
  enTag?: string; zhTag?: string; credit?: string;
}> = ({ img, dur, pan = "in", enTag, zhTag, credit }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 14, dur - 14, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const z = pan === "in" ? [1.15, 1.28] : pan === "out" ? [1.28, 1.15] : [1.2, 1.2];
  const scale = interpolate(frame, [0, dur], z);
  const tx = pan === "left" ? interpolate(frame, [0, dur], [40, -40]) : pan === "right" ? interpolate(frame, [0, dur], [-40, 40]) : 0;
  return (
    <AbsoluteFill style={{ backgroundColor: P.bg, opacity: o, overflow: "hidden" }}>
      <Img src={staticFile(`porsche/${img}`)}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover",
          transform: `scale(${scale}) translateX(${tx}px)` }} />
      {/* 冷蓝压色 + 暗角 */}
      <AbsoluteFill style={{ background: P.blue, mixBlendMode: "soft-light", opacity: 0.35 }} />
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, transparent 35%, rgba(10,14,26,0.85) 100%)" }} />
      <AbsoluteFill style={{ background: "linear-gradient(0deg, rgba(10,14,26,0.9) 0%, transparent 30%, transparent 70%, rgba(10,14,26,0.7) 100%)" }} />
      {(enTag || zhTag) && (
        <div style={{ position: "absolute", left: 70, top: 90 }}>
          <BiTag en={enTag || ""} zh={zhTag || ""} at={8} />
        </div>
      )}
      {credit && <div style={{ position: "absolute", right: 30, bottom: 24, fontFamily: SANS, fontSize: 18, color: P.mute }}>{credit}</div>}
    </AbsoluteFill>
  );
};
