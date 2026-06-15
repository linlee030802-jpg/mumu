// 0527 期货保证金口播 - 小Lin说风格数字动效叠加层（竖屏1080×1920@60fps）
import { AbsoluteFill, Sequence, OffthreadVideo, staticFile } from "remotion";
import { SlideUp, NumBadge, FormulaStep, CountTo, PriceJump, LIN } from "./LinStyle";

const FONT = '"PingFang SC","Source Han Sans CN","Noto Sans SC",sans-serif';

// 顶部区放动效（避开博主脸和底部字幕）
const TopZone: React.FC<{ children: React.ReactNode; top?: number }> = ({ children, top = 230 }) => (
  <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: top }}>
    {children}
  </AbsoluteFill>
);

// 小标题贴纸
const Tag: React.FC<{ text: string; color?: string }> = ({ text, color = LIN.yellow }) => (
  <SlideUp>
    <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 60, color: LIN.ink,
      background: color, padding: "12px 36px", borderRadius: 14, transform: "rotate(-2deg)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.35)" }}>{text}</div>
  </SlideUp>
);

export const OverlayLin: React.FC = () => {
  // 秒×60=帧
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo src={staticFile("mov/src0527.mov")} />

      {/* 0-3.2 一手=5吨 */}
      <Sequence from={0} durationInFrames={195}>
        <TopZone><div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
          <Tag text="鸡蛋期货 · 一手" />
          <NumBadge label="1手 =" value="5吨" color={LIN.yellow} delay={14} />
        </div></TopZone>
      </Sequence>

      {/* 3.2-4.8 合约乘数10 */}
      <Sequence from={192} durationInFrames={96}>
        <TopZone><NumBadge label="合约乘数" value="×10" color={LIN.green} /></TopZone>
      </Sequence>

      {/* 4.8-7.6 保证金比例7% */}
      <Sequence from={288} durationInFrames={166}>
        <TopZone><NumBadge label="保证金比例" value="7%" color={LIN.red} /></TopZone>
      </Sequence>

      {/* 7.6-12 价位3320 */}
      <Sequence from={454} durationInFrames={278}>
        <TopZone><div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
          <Tag text="当前价位" color={LIN.yellow} />
          <CountTo to={3320} prefix="¥" delay={16} dur={36} color={LIN.white} />
        </div></TopZone>
      </Sequence>

      {/* 12-16 计算式 5吨×10×7%=2324 */}
      <Sequence from={732} durationInFrames={246}>
        <TopZone top={200}><div style={{ display: "flex", flexDirection: "column", gap: 30, alignItems: "center" }}>
          <Tag text="一手保证金怎么算" />
          <FormulaStep parts={["3320", "×5", "×10%", "×7%", "≈2324元"]} delay={20} />
        </div></TopZone>
      </Sequence>

      {/* 16-17.6 1万买4手 */}
      <Sequence from={966} durationInFrames={94}>
        <TopZone><NumBadge label="1万元只能买" value="4手" color={LIN.yellow} size={100} /></TopZone>
      </Sequence>

      {/* 17.6-20.5 占用保证金9300 */}
      <Sequence from={1056} durationInFrames={180}>
        <TopZone><div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
          <Tag text="占用保证金" color={LIN.green} />
          <CountTo to={9300} prefix="¥" suffix="+" delay={14} dur={30} color={LIN.green} />
        </div></TopZone>
      </Sequence>

      {/* 20.5-22.9 4月8日最低3320 */}
      <Sequence from={1230} durationInFrames={144}>
        <TopZone><div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
          <Tag text="4月8日 最低点" color={LIN.green} />
          <CountTo to={3320} prefix="¥" delay={12} dur={26} color={LIN.green} />
        </div></TopZone>
      </Sequence>

      {/* 22.9-27.7 冲到4142 涨幅强调 */}
      <Sequence from={1374} durationInFrames={292}>
        <TopZone top={300}><div style={{ display: "flex", flexDirection: "column", gap: 30, alignItems: "center" }}>
          <Tag text="主力合约盘中最高" color={LIN.red} />
          <PriceJump from={3320} to={4142} delay={16} />
        </div></TopZone>
      </Sequence>
    </AbsoluteFill>
  );
};
