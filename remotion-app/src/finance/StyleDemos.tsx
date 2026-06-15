// 两种博主动效风格对比 Demo（竖屏 1080×1920 @30fps，纯展示风格差异）
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { SlideUp, NumBadge, FormulaStep, CountTo, PriceJump, LIN } from "./LinStyle";
import { Quake, Glitch, Shake, Sway, VertWord, HollowText, WEN } from "./WenStyle";

const FONT = '"PingFang SC","Source Han Sans CN","Noto Sans SC",sans-serif';

// ============ Demo A：小Lin说 克制型 ============
export const DemoLin: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg,#1a1d29,#0d0f16)", justifyContent: "center", alignItems: "center" }}>
      {/* 风格标 */}
      <div style={{ position: "absolute", top: 80, fontFamily: FONT, fontWeight: 900, fontSize: 44, color: LIN.yellow, opacity: 0.5 }}>小Lin说 · 克制型</div>

      <Sequence from={0} durationInFrames={70}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <SlideUp><div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 96, color: "#fff" }}>房价不行了</div></SlideUp>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={70} durationInFrames={80}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 36 }}>
          <SlideUp><div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 56, color: "#fff" }}>钱往哪走？</div></SlideUp>
          <NumBadge label="居民存款" value="¥147万亿" color={LIN.yellow} delay={14} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={150} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 30 }}>
          <SlideUp><div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 48, color: "#fff" }}>黄金涨幅</div></SlideUp>
          <CountTo to={28} suffix="%" delay={12} color={LIN.yellow} size={200} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={240} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <PriceJump from={460} to={780} delay={10} />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

// ============ Demo B：温义飞 冲击型 ============
export const DemoWen: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "linear-gradient(160deg,#1a0e0e,#0e0e12)", justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", top: 80, fontFamily: FONT, fontWeight: 900, fontSize: 44, color: WEN.red, opacity: 0.6 }}>温义飞 · 冲击型</div>

      <Sequence from={0} durationInFrames={70}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 50 }}>
          <VertWord text="房地产" color={WEN.white} delay={0} size={140} />
          <Quake delay={20}><VertWord text="不行" color={WEN.red} delay={20} size={160} /></Quake>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={70} durationInFrames={80}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 40 }}>
          <Glitch delay={0} dur={20}><div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 88, color: "#fff" }}>钱往哪走？</div></Glitch>
          <Shake amp={5}><div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 130, color: WEN.yellow, textShadow: `0 0 40px ${WEN.yellow}` }}>¥147万亿</div></Shake>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={150} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 30 }}>
          <HollowText text="黄金 GOLD" delay={0} size={80} />
          <Quake delay={14}><div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 220, color: WEN.yellow, textShadow: `0 0 50px ${WEN.red}` }}>+28%</div></Quake>
        </AbsoluteFill>
      </Sequence>
      <Sequence from={240} durationInFrames={90}>
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <Sway deg={4}><Glitch delay={0} dur={16}>
            <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 160, color: WEN.red, textShadow: `0 0 50px ${WEN.red}` }}>¥460→780</div>
          </Glitch></Sway>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
