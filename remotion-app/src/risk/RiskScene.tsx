// 止损vs加仓 — 电影暖金写实场景模板（图打底+暖渐变+超大字模糊上浮+毛玻璃卡）
// 复用上片苹果质感，指向 risk/img
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";

const SANS = '"Source Han Sans CN","PingFang SC","Helvetica Neue",sans-serif';
const APPLE = Easing.bezier(0.16, 1, 0.3, 1);
export const WC = { paper: "#F2E9D6", ink: "#3A2E22", gold: "#B07A2B", green: "#3E6B5E", red: "#B5482F" };

const Reveal: React.FC<{ text: string; size: number; weight: number; color: string; delay: number; shadow?: boolean }> =
({ text, size, weight, color, delay, shadow }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 28], [0, 1], { easing: APPLE, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ fontFamily: SANS, fontWeight: weight, fontSize: size, color,
      letterSpacing: weight > 700 ? -1 : 2, lineHeight: 1.2, opacity: p,
      transform: `translateY(${interpolate(p, [0, 1], [38, 0])}px)`,
      filter: `blur(${interpolate(p, [0, 1], [14, 0])}px)`,
      textShadow: shadow ? "0 4px 30px rgba(0,0,0,0.6)" : "0 2px 12px rgba(120,90,40,0.25)", textAlign: "center" }}>{text}</div>
  );
};

export const RiskScene: React.FC<{
  img: string; dur: number; chapter?: string; title: string;
  cardTop?: string; cardMain?: string; cardSub?: string; titleTop?: number; accent?: "green" | "red" | "gold";
}> = ({ img, dur, chapter, title, cardTop, cardMain, cardSub, titleTop = 240, accent = "green" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const camScale = interpolate(frame, [0, dur], [1.04, 1.1]);
  const imgScale = interpolate(frame, [0, dur], [1.08, 1.16]);
  const sceneO = interpolate(frame, [0, 16, dur - 14, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardS = spring({ frame: frame - 42, fps, config: { damping: 26, mass: 1.2 } });
  const cardY = interpolate(cardS, [0, 1], [70, 0]);
  const cardO = interpolate(cardS, [0, 1], [0, 1]);
  const cardFloat = Math.sin(frame / 52) * 9;
  const hasCard = cardMain || cardTop || cardSub;
  const mainColor = accent === "red" ? WC.red : accent === "gold" ? WC.gold : WC.green;

  return (
    <AbsoluteFill style={{ backgroundColor: WC.paper, opacity: sceneO }}>
      <AbsoluteFill style={{ transform: `scale(${camScale})` }}>
        <Img src={staticFile(`risk/img/${img}`)}
          style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover",
            transform: `scale(${imgScale})`, opacity: interpolate(frame, [0, 22], [0, 1], { extrapolateRight: "clamp" }) }} />
        <AbsoluteFill style={{ background: `linear-gradient(180deg, ${WC.paper}EE 0%, ${WC.paper}44 26%, ${WC.paper}33 60%, ${WC.paper}F2 100%)` }} />

        <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: titleTop }}>
          {chapter && <><Reveal text={chapter} size={46} weight={400} color={WC.gold} delay={4} /><div style={{ height: 20 }} /></>}
          <Reveal text={title} size={128} weight={800} color={WC.ink} delay={chapter ? 12 : 6} />
        </AbsoluteFill>

        {hasCard && (
          <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 360 }}>
            <div style={{ width: 820, padding: "56px 60px", borderRadius: 40,
              opacity: cardO, transform: `translateY(${cardY + cardFloat}px)`,
              background: "linear-gradient(160deg, rgba(255,250,238,0.55), rgba(255,248,232,0.28))",
              backdropFilter: "blur(26px)", border: "1px solid rgba(255,250,240,0.6)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.7) inset, 0 24px 60px rgba(90,60,25,0.28), 0 8px 20px rgba(90,60,25,0.2)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
              {cardTop && <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 38, color: WC.ink, opacity: 0.7 }}>{cardTop}</div>}
              {cardMain && <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 84, color: mainColor, letterSpacing: -1 }}>{cardMain}</div>}
              {cardSub && <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 32, color: WC.gold }}>{cardSub}</div>}
            </div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
