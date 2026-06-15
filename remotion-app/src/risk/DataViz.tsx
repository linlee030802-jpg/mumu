// 止损vs加仓 — 数据动效组件库 v2（NVIDIA范本档次：伪3D体积+发光+滚动模糊落定）
// 暖金电影感配色，非PPT：深度网格背景 + 体积柱 + 数字滚动落定
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";

const SANS = '"Source Han Sans CN","PingFang SC","Helvetica Neue",sans-serif';
const MONO = '"DIN Alternate","Roboto Mono",ui-monospace,monospace';
const APPLE = Easing.bezier(0.16, 1, 0.3, 1);
export const C = { paper: "#F2E9D6", ink: "#3A2E22", gold: "#B07A2B", goldLite: "#E0A94B", green: "#3E6B5E", red: "#B5482F" };

// 暖金深度网格背景（透视地平线感，破PPT）
const GridBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const drift = (frame * 0.4) % 80;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 64%, rgba(224,169,75,0.16), transparent 58%)` }} />
      {/* 横向地平线网格 */}
      <div style={{ position: "absolute", left: "-20%", right: "-20%", bottom: 300, height: 620,
        backgroundImage: `repeating-linear-gradient(0deg, rgba(176,122,43,0.14) 0 1px, transparent 1px 80px)`,
        transform: "perspective(700px) rotateX(62deg)", transformOrigin: "bottom center",
        maskImage: "linear-gradient(0deg, transparent, #000 40%)" }} />
      <div style={{ position: "absolute", left: "-20%", right: "-20%", bottom: 300, height: 620,
        backgroundImage: `repeating-linear-gradient(90deg, rgba(176,122,43,0.12) 0 1px, transparent 1px 90px)`,
        backgroundPositionX: drift, transform: "perspective(700px) rotateX(62deg)", transformOrigin: "bottom center",
        maskImage: "linear-gradient(0deg, transparent, #000 40%)" }} />
    </AbsoluteFill>
  );
};

const Frame: React.FC<{ dur: number; title?: string; children: React.ReactNode }> = ({ dur, title, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 16, dur - 14, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tp = interpolate(frame, [6, 34], [0, 1], { easing: APPLE, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, opacity: o }}>
      <GridBackdrop />
      {title && (
        <div style={{ position: "absolute", top: 220, width: "100%", textAlign: "center",
          fontFamily: SANS, fontWeight: 800, fontSize: 88, color: C.ink, letterSpacing: -1,
          opacity: tp, transform: `translateY(${interpolate(tp, [0, 1], [34, 0])}px)`,
          filter: `blur(${interpolate(tp, [0, 1], [12, 0])}px)`,
          textShadow: "0 4px 30px rgba(176,122,43,0.25)" }}>{title}</div>
      )}
      {children}
    </AbsoluteFill>
  );
};

// ① 数字滚动落定：滚动时纵向模糊，落定带轻微回弹 + 暖金辉光
export const NumberRoll: React.FC<{ dur: number; title: string; value: number; suffix?: string; prefix?: string; sub?: string; color?: string }> =
({ dur, title, value, suffix = "", prefix = "", sub, color = C.green }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 30, fps, config: { damping: 12, mass: 0.8 }, durationInFrames: 56 });
  const cur = Math.round(value * Math.min(1, interpolate(frame, [30, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const rolling = frame > 30 && frame < 82;
  const blur = rolling ? interpolate(frame, [30, 78, 82], [0, 8, 0], { extrapolateRight: "clamp" }) : 0;
  const pop = interpolate(s, [0, 1], [0.7, 1]);
  const glow = interpolate(Math.sin(frame / 14), [-1, 1], [0.3, 0.6]);
  return (
    <Frame dur={dur} title={title}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 250, color, letterSpacing: -4,
          transform: `scale(${pop})`, filter: `blur(${blur}px)`,
          textShadow: `0 0 60px rgba(176,122,43,${glow}), 0 12px 50px rgba(90,60,25,0.3)` }}>
          {prefix}{cur.toLocaleString()}<span style={{ fontSize: 120, marginLeft: 8 }}>{suffix}</span>
        </div>
        {sub && <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 44, color: C.gold, marginTop: 24,
          opacity: interpolate(frame, [60, 84], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>{sub}</div>}
      </AbsoluteFill>
    </Frame>
  );
};

// 伪3D体积柱：正面渐变 + 顶面菱形 + 右侧暗面 + 顶部发光描边
const Bar3D: React.FC<{ w: number; h: number; depth: number; c1: string; c2: string; glow: string; label?: string; sub?: string }> =
({ w, h, depth, c1, c2, glow, label, sub }) => (
  <div style={{ position: "relative", width: w, height: h }}>
    {/* 右侧暗面 */}
    <div style={{ position: "absolute", right: -depth, bottom: depth, width: depth, height: h,
      background: `linear-gradient(180deg, ${c2}, #2a1c0c)`, transform: "skewY(-45deg)", transformOrigin: "bottom right", opacity: 0.85 }} />
    {/* 顶面 */}
    <div style={{ position: "absolute", top: -depth, left: 0, width: w, height: depth,
      background: c1, transform: "skewX(-45deg)", transformOrigin: "bottom left", filter: "brightness(1.3)" }} />
    {/* 正面 */}
    <div style={{ position: "absolute", inset: 0, borderRadius: "4px 4px 0 0",
      background: `linear-gradient(180deg, ${c1}, ${c2})`,
      boxShadow: `0 0 30px ${glow}, inset 0 2px 0 rgba(255,255,255,0.4)` }} />
    {label && <div style={{ position: "absolute", top: -depth - 64, width: w, textAlign: "center",
      fontFamily: MONO, fontWeight: 800, fontSize: 42, color: C.ink }}>{label}</div>}
    {sub && <div style={{ position: "absolute", bottom: -70, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap", textAlign: "center",
      fontFamily: SANS, fontWeight: 600, fontSize: 28, color: C.ink,
      background: "rgba(242,233,214,0.82)", padding: "6px 16px", borderRadius: 12,
      boxShadow: "0 4px 16px rgba(90,60,25,0.18)" }}>{sub}</div>}
  </div>
);

// ② 翻倍阶梯：5→10→20→40→80 逐级体积柱生长，最后一格崩塌
export const DoubleStairs: React.FC<{ dur: number; title: string }> = ({ dur, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bets = [5, 10, 20, 40, 80];
  return (
    <Frame dur={dur} title={title}>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 470 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 40 }}>
          {bets.map((b, i) => {
            const s = spring({ frame: frame - 38 - i * 12, fps, config: { damping: 15, mass: 0.8 } });
            const h = interpolate(s, [0, 1], [0, 90 + b * 4.2]);
            const last = i === bets.length - 1;
            const collapse = last ? interpolate(frame, [dur - 64, dur - 22], [0, 1], { easing: Easing.in(Easing.quad), extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0;
            const c1 = last ? "#D86A4A" : C.goldLite, c2 = last ? "#7a2e1c" : "#8a5e20";
            return (
              <div key={i} style={{ transform: `translateY(${collapse * 200}px) rotate(${collapse * 16}deg)`, opacity: 1 - collapse * 0.8 }}>
                <Bar3D w={100} h={h} depth={26} c1={c1} c2={c2} glow={last ? "rgba(216,106,74,0.6)" : "rgba(224,169,75,0.5)"} label={`${b}万`} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Frame>
  );
};

// ③ 双柱对比：止损(稳涨·发光) vs 加仓(涨后被砍崩塌)，伪3D体积柱
export const VsBars: React.FC<{ dur: number; leftLabel: string; leftSub: string; rightLabel: string; rightSub: string }> =
({ dur, leftLabel, leftSub, rightLabel, rightSub }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sL = spring({ frame: frame - 34, fps, config: { damping: 16, mass: 1 } });
  const hL = interpolate(sL, [0, 1], [0, 640]);
  // 加仓柱：先涨再被砍
  const sR = spring({ frame: frame - 48, fps, config: { damping: 16, mass: 1 } });
  const grow = interpolate(sR, [0, 1], [0, 340]);
  const cut = interpolate(frame, [dur - 78, dur - 30], [0, 300], { easing: Easing.in(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const hR = Math.max(46, grow - cut);
  const cutting = frame > dur - 78 && frame < dur - 30;
  return (
    <Frame dur={dur}>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 380 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 150 }}>
          <Bar3D w={180} h={hL} depth={34} c1="#5fa088" c2="#274a40" glow="rgba(62,107,94,0.55)" label={leftLabel} sub={leftSub} />
          <div style={{ filter: cutting ? `blur(${interpolate(frame, [dur-78, dur-30], [0, 3])}px)` : "none" }}>
            <Bar3D w={180} h={hR} depth={34} c1="#D86A4A" c2="#7a2e1c" glow="rgba(181,72,47,0.55)" label={rightLabel} sub={rightSub} />
          </div>
        </div>
      </AbsoluteFill>
    </Frame>
  );
};
