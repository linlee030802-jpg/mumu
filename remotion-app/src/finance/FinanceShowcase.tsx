// 水彩科普 Showcase - 验证水彩美漫 + 插画讲解风
import { AbsoluteFill, Sequence } from "remotion";
import { C } from "./theme";
import { FinanceBG, TitleReveal } from "./TitleReveal";
import { NumberTicker } from "./NumberTicker";
import { RingProgress } from "./RingProgress";
import { FlowCycle } from "./FlowCycle";
import { DualBarSwap } from "./DualBarSwap";
import { ChapterCard } from "./ChapterCard";
import { Illustration } from "./Illustration";

const Center: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
    {children}
  </AbsoluteFill>
);

const Caption: React.FC<{ text: string; top?: number }> = ({ text, top = 130 }) => (
  <div style={{
    position: "absolute", top, width: "100%", textAlign: "center",
    color: C.ink, fontSize: 38, fontWeight: 700, letterSpacing: 2,
    fontFamily: '"PingFang SC","Noto Sans SC",sans-serif',
    textShadow: "0 2px 5px rgba(80,60,30,0.12)",
  }}>{text}</div>
);

// 插画 + 数据并排的讲解布局
const SplitScene: React.FC<{
  img: string; wash: string; rotate?: number; children: React.ReactNode;
}> = ({ img, wash, rotate = 0, children }) => (
  <AbsoluteFill style={{
    flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 90,
  }}>
    <Illustration src={img} size={520} delay={6} wash={wash} rotate={rotate} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {children}
    </div>
  </AbsoluteFill>
);

export const FinanceShowcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg0 }}>
      <FinanceBG accent={C.red} />

      {/* 0-90: 开场标题 */}
      <Sequence from={0} durationInFrames={90}>
        <Center>
          <TitleReveal text="全球性金融危机，真要来了？" size={84} color={C.ink} underline />
        </Center>
      </Sequence>

      {/* 90-210: 债务大山 + 数字滚动 */}
      <Sequence from={90} durationInFrames={120}>
        <Caption text="全球债务总额（万亿美元）" />
        <SplitScene img="debt_mountain.png" wash={C.red} rotate={-2}>
          <NumberTicker to={337} unit="万亿" color={C.red} size={170} delay={12} dur={50} />
        </SplitScene>
      </Sequence>

      {/* 210-330: 债务占GDP环形冲破红线 */}
      <Sequence from={210} durationInFrames={120}>
        <Caption text="美债占 GDP 127%，安全线仅 60%" />
        <Center>
          <RingProgress value={127} threshold={60} label="债务 / GDP" delay={6} dur={55} size={420} />
        </Center>
      </Sequence>

      {/* 330-390: 章节卡过场 */}
      <Sequence from={330} durationInFrames={60}>
        <ChapterCard num="02" title="AI 泡沫的账面游戏" accent={C.orange} />
      </Sequence>

      {/* 390-540: AI泡沫插画 + 资金循环 */}
      <Sequence from={390} durationInFrames={150}>
        <Caption text="英伟达 → OpenAI → 甲骨文 → 英伟达" />
        <AbsoluteFill style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 40 }}>
          <Illustration src="ai_bubble.png" size={430} delay={6} wash={C.orange} rotate={2} />
          <FlowCycle delay={20} />
        </AbsoluteFill>
      </Sequence>

      {/* 540-660: 黄金反超美债 + 金条插画 */}
      <Sequence from={540} durationInFrames={120}>
        <Caption text="黄金占央行储备首超美债" />
        <SplitScene img="gold_bars.png" wash={C.gold} rotate={-2}>
          <DualBarSwap
            left={{ name: "黄金", value: 27, color: C.gold }}
            right={{ name: "美国国债", value: 22, color: C.teal }}
            delay={6} dur={55}
          />
        </SplitScene>
      </Sequence>

      {/* 660-780: 金句收尾 */}
      <Sequence from={660} durationInFrames={120}>
        <Center>
          <TitleReveal text="危机不会消灭财富" size={76} color={C.ink} />
          <div style={{ height: 24 }} />
          <TitleReveal text="只是把它挪给沉得住气的人" size={56} color={C.gold} />
        </Center>
      </Sequence>
    </AbsoluteFill>
  );
};
