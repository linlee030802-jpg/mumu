// 苹果质感 + 水彩配色 - 暖纸底 + 真水彩图打底 + 暖调毛玻璃卡 + 极慢缓动（无底部金句）
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";

const SANS = '"Source Han Sans CN","PingFang SC","Helvetica Neue",sans-serif';
const APPLE = Easing.bezier(0.16, 1, 0.3, 1);
// 水彩暖色系（取自美漫水彩图调性）
const C = { paper: "#F2E9D6", ink: "#3A2E22", gold: "#B07A2B", green: "#3E6B5E" };

const Reveal: React.FC<{ text: string; size: number; weight: number; color: string; delay: number }> =
({ text, size, weight, color, delay }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 28], [0, 1], { easing: APPLE, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ fontFamily: SANS, fontWeight: weight, fontSize: size, color,
      letterSpacing: weight > 700 ? -1 : 2, lineHeight: 1.2, opacity: p,
      transform: `translateY(${interpolate(p, [0, 1], [38, 0])}px)`,
      filter: `blur(${interpolate(p, [0, 1], [14, 0])}px)`,
      textShadow: "0 2px 12px rgba(120,90,40,0.25)", textAlign: "center" }}>{text}</div>
  );
};

export const AppleStyle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const camScale = interpolate(frame, [0, durationInFrames], [1.04, 1.1]);
  const imgScale = interpolate(frame, [0, durationInFrames], [1.08, 1.16]);
  const cardS = spring({ frame: frame - 42, fps, config: { damping: 26, mass: 1.2 } });
  const cardY = interpolate(cardS, [0, 1], [70, 0]);
  const cardO = interpolate(cardS, [0, 1], [0, 1]);
  const cardFloat = Math.sin(frame / 52) * 9;

  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, transform: `scale(${camScale})` }}>
      <Img src={staticFile("mindset/img/p07.png")}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover",
          transform: `scale(${imgScale})`, opacity: interpolate(frame, [0, 24], [0, 1], { extrapolateRight: "clamp" }) }} />
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${C.paper}EE 0%, ${C.paper}44 26%, ${C.paper}33 60%, ${C.paper}F2 100%)` }} />

      <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 250 }}>
        <Reveal text="方法 02" size={46} weight={400} color={C.gold} delay={4} />
        <div style={{ height: 22 }} />
        <Reveal text="大胆认输" size={140} weight={800} color={C.ink} delay={12} />
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 360 }}>
        <div style={{
          width: 820, padding: "60px 64px", borderRadius: 40,
          opacity: cardO, transform: `translateY(${cardY + cardFloat}px)`,
          background: "linear-gradient(160deg, rgba(255,250,238,0.55), rgba(255,248,232,0.28))",
          backdropFilter: "blur(26px)",
          border: "1px solid rgba(255,250,240,0.6)",
          boxShadow: `0 1px 0 rgba(255,255,255,0.7) inset, 0 24px 60px rgba(90,60,25,0.28), 0 8px 20px rgba(90,60,25,0.2)`,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
        }}>
          <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 40, color: C.ink, opacity: 0.7 }}>从网游模式切换到</div>
          <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 88, color: C.green, letterSpacing: -1 }}>单机模式</div>
          <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 34, color: C.gold }}>只盯自己的系统，慢慢打磨</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
