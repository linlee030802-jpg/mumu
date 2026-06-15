// 实拍镜 - 竖屏铺满 + 暖纸色融合 + 极慢推进，与苹果质感水彩镜同调
// 真人/真实盘面压 AI 感，但用同样的暖色渐隐+留白+缓动，切换不跳
import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";

const SANS = '"Source Han Sans CN","PingFang SC","Helvetica Neue",sans-serif';
const APPLE = Easing.bezier(0.16, 1, 0.3, 1);
const WC = { paper: "#F2E9D6", ink: "#3A2E22", gold: "#B07A2B", green: "#3E6B5E" };

export const RealClip: React.FC<{
  src: string;            // real 下文件名
  dur: number;
  chapter?: string;
  title: string;
  cardTop?: string;
  cardMain?: string;
  cardSub?: string;
  titleTop?: number;
  warm?: number;          // 暖色融合强度 0-1（默认0.5）
}> = ({ src, dur, chapter, title, cardTop, cardMain, cardSub, titleTop = 250, warm = 0.5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const camScale = interpolate(frame, [0, dur], [1.04, 1.1]);
  const sceneO = interpolate(frame, [0, 16, dur - 14, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardS = spring({ frame: frame - 42, fps, config: { damping: 26, mass: 1.2 } });
  const cardY = interpolate(cardS, [0, 1], [70, 0]);
  const cardO = interpolate(cardS, [0, 1], [0, 1]);
  const cardFloat = Math.sin(frame / 52) * 9;
  const hasCard = cardMain || cardTop || cardSub;

  return (
    <AbsoluteFill style={{ backgroundColor: WC.paper, opacity: sceneO }}>
      <AbsoluteFill style={{ transform: `scale(${camScale})` }}>
        <OffthreadVideo src={staticFile(`mindset/real/${src}`)} muted
          style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} />
        {/* 暖纸色融合层：让实拍偏暖、跟水彩同调 */}
        <AbsoluteFill style={{ background: WC.gold, mixBlendMode: "soft-light", opacity: warm * 0.5 }} />
        <AbsoluteFill style={{ background: `linear-gradient(180deg, ${WC.paper}E0 0%, ${WC.paper}33 24%, rgba(20,14,8,0.28) 62%, rgba(20,14,8,0.55) 100%)` }} />

        {/* 标题（实拍上用白字+投影，保证可读） */}
        <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: titleTop }}>
          {chapter && <><Tt text={chapter} size={46} weight={400} color="#FFE9C8" delay={4} />
            <div style={{ height: 20 }} /></>}
          <Tt text={title} size={132} weight={800} color="#fff" delay={chapter ? 12 : 6} shadow />
        </AbsoluteFill>

        {hasCard && (
          <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 360 }}>
            <div style={{ width: 820, padding: "56px 60px", borderRadius: 40,
              opacity: cardO, transform: `translateY(${cardY + cardFloat}px)`,
              background: "linear-gradient(160deg, rgba(40,30,18,0.5), rgba(30,22,12,0.32))",
              backdropFilter: "blur(26px)", border: "1px solid rgba(255,240,210,0.4)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.25) inset, 0 24px 60px rgba(0,0,0,0.45)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
              {cardTop && <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 38, color: "rgba(255,245,230,0.85)" }}>{cardTop}</div>}
              {cardMain && <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 84, color: "#FFD9A0", letterSpacing: -1 }}>{cardMain}</div>}
              {cardSub && <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 32, color: "#FFE9C8" }}>{cardSub}</div>}
            </div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Tt: React.FC<{ text: string; size: number; weight: number; color: string; delay: number; shadow?: boolean }> =
({ text, size, weight, color, delay, shadow }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [delay, delay + 28], [0, 1], { easing: APPLE, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ fontFamily: SANS, fontWeight: weight, fontSize: size, color,
      letterSpacing: weight > 700 ? -1 : 2, lineHeight: 1.2, opacity: p,
      transform: `translateY(${interpolate(p, [0, 1], [38, 0])}px)`,
      filter: `blur(${interpolate(p, [0, 1], [14, 0])}px)`,
      textShadow: shadow ? "0 4px 30px rgba(0,0,0,0.7)" : "0 2px 12px rgba(0,0,0,0.4)", textAlign: "center" }}>{text}</div>
  );
};
