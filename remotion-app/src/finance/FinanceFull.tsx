// 《一文说透全球性金融危机的本质》完整片 v2 - 写实B-roll + 数据动效混剪
// 学《野蛮人敲门》三层画面体系：写实场景做叙事/比喻，数据动效做硬核拆解，交替切
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { C } from "./theme";
import { FinanceBG, TitleReveal } from "./TitleReveal";
import { NumberTicker } from "./NumberTicker";
import { RingProgress } from "./RingProgress";
import { FlowCycle } from "./FlowCycle";
import { DualBarSwap } from "./DualBarSwap";
import { ChapterCard } from "./ChapterCard";
import { FlipNumber } from "./FlipNumber";
import { InfoCard } from "./InfoCard";
import { PersonClash } from "./PersonClash";
import { Timeline } from "./Timeline";
import { Balance } from "./Balance";
import { Converge } from "./Converge";
import { AdviceCard } from "./AdviceCard";
import { WealthShift } from "./WealthShift";
import { BRoll, SubBar } from "./BRoll";
import { RealVideo } from "./RealVideo";
import { FlashCut, SceneWrap } from "./Transitions";
import { Credits } from "./Credits";

const Center: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>{children}</AbsoluteFill>
);

// 数据动效场景：米白底（数据组件在此最清晰）+ 进出淡化消除硬切
const DataScene: React.FC<{ caption?: string; dur?: number; children: React.ReactNode }> = ({ caption, dur = 240, children }) => (
  <SceneWrap dur={dur}>
    <AbsoluteFill style={{ backgroundColor: C.bg0 }}>
      <FinanceBG accent={C.red} />
      {caption && (
        <div style={{
          position: "absolute", top: 90, width: "100%", textAlign: "center",
          color: C.ink, fontSize: 42, fontWeight: 700, letterSpacing: 2,
          fontFamily: '"PingFang SC","Noto Sans SC",sans-serif',
          textShadow: "0 2px 5px rgba(80,60,30,0.12)",
        }}>{caption}</div>
      )}
      <Center>{children}</Center>
    </AbsoluteFill>
  </SceneWrap>
);

// 章节卡场景：闪白转场 + 数据底
const ChapterScene: React.FC<{ num: string; title: string; accent: string }> = ({ num, title, accent }) => (
  <AbsoluteFill style={{ backgroundColor: C.bg0 }}>
    <FinanceBG accent={accent} />
    <ChapterCard num={num} title={title} accent={accent} />
    <FlashCut at={0} dur={12} />
  </AbsoluteFill>
);

// B-roll 场景：写实图打底 + 电影字幕条
const BRollScene: React.FC<{ src: string; dur: number; pan?: any; sub: string }> =
({ src, dur, pan = "in", sub }) => (
  <AbsoluteFill>
    <BRoll src={src} dur={dur} pan={pan} />
    <SubBar text={sub} delay={10} />
  </AbsoluteFill>
);

export const FinanceFull: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Audio src={staticFile("finance/audio/narration.mp3")} />

      {/* ===== 第一幕+第二幕 (seg1: 0-2444) ===== */}
      {/* S1 开场 真实暴风雨城市实拍 0-150 */}
      <Sequence from={0} durationInFrames={150}>
        <RealVideo src="storm1.mp4" dur={150} dim={0.5} />
        <Center>
          <TitleReveal text="全球性金融危机，真要来了？" size={86} color="#FCEFC7" underline />
        </Center>
      </Sequence>

      {/* S2 中美双人物（数据场景）150-640 */}
      <Sequence from={150} durationInFrames={490}>
        <DataScene dur={490} caption="一个月里，中美两位重磅人物前后脚发警告">
          <PersonClash delay={10} />
          <div style={{ position: "absolute", bottom: -180 }}>
            <FlipNumber from="—" to="5/27" label="凤凰湾区财经论坛" flipAt={40} color={C.red} size={80} delay={220} />
          </div>
        </DataScene>
      </Sequence>

      {/* S3 高志凯卡 640-1100 */}
      <Sequence from={640} durationInFrames={460}>
        <DataScene dur={460}>
          <InfoCard name="高志凯" title="全球化智库副主任" photo="gao.jpg"
            points={["12-18个月内爆发空前危机", "破坏力是2000年泡沫的十倍", "「高志凯线」提出者"]}
            accent={C.red} delay={6} />
        </DataScene>
      </Sequence>

      {/* S4 破坏力10倍 - B-roll 泡沫撞城 1100-1460 */}
      <Sequence from={1100} durationInFrames={360}>
        <BRoll src="br02.png" dur={360} pan="in" dim={0.4} />
        <Center>
          <NumberTicker to={10} suffix="×" color="#FCEFC7" size={320} delay={10} dur={40} />
        </Center>
        <SubBar text="破坏力 = 2000年互联网泡沫的十倍" delay={10} />
      </Sequence>

      {/* S5 罗杰斯卡 1460-2020 */}
      <Sequence from={1460} durationInFrames={560}>
        <DataScene dur={560}>
          <InfoCard name="吉姆·罗杰斯" title="量子基金创始人 · 84岁" photo="rogers.jpg"
            points={["2026最惨金融危机，胜过2008", "量子基金十年收益42倍", "与索罗斯、巴菲特并称三巨头"]}
            accent={C.blue} delay={6} />
        </DataScene>
      </Sequence>

      {/* S6 时间轴 2020-2444 */}
      <Sequence from={2020} durationInFrames={424}>
        <DataScene dur={424} caption="1987 · 2000 · 2008 —— 他都提前押中了">
          <Timeline delay={10}
            nodes={[{ year: "1987", label: "股灾" }, { year: "2000", label: "互联网泡沫" }, { year: "2008", label: "次贷危机" }]}
            stampText="已清空美股" />
        </DataScene>
      </Sequence>

      {/* ===== 第三幕 债务 (seg2: 2444-5103) ===== */}
      {/* S7 章节卡01 2444-2684 */}
      <Sequence from={2444} durationInFrames={240}>
        <ChapterScene num="01" title="全球债务到顶了" accent={C.red} />
      </Sequence>

      {/* S8a B-roll 债务山压地球 2684-3064 */}
      <Sequence from={2684} durationInFrames={380}>
        <BRoll src="br03.png" dur={380} pan="out" dim={0.4} />
        <Center>
          <NumberTicker to={337} unit="万亿$" color="#FCEFC7" size={160} delay={14} dur={50} />
        </Center>
        <SubBar text="全球债务 337万亿，美债就占 39万亿" delay={10} />
      </Sequence>

      {/* S8b 数据：利息vs国防双柱 3064-3444 */}
      <Sequence from={3064} durationInFrames={380}>
        <DataScene dur={380} caption="光利息一年 1.23万亿，比国防预算还多">
          <DualBarSwap
            left={{ name: "年利息", value: 123, color: C.red }}
            right={{ name: "国防预算", value: 100, color: C.teal }}
            delay={10} dur={55} />
        </DataScene>
      </Sequence>

      {/* S9 环形127% 3444-4144 */}
      <Sequence from={3444} durationInFrames={700}>
        <DataScene dur={700} caption="美债占 GDP 127%，安全线仅 60%">
          <RingProgress value={127} threshold={60} label="债务 / GDP" delay={10} dur={60} size={460} />
        </DataScene>
      </Sequence>

      {/* S10a 数据：利率翻牌 4144-4544 */}
      <Sequence from={4144} durationInFrames={400}>
        <DataScene dur={400} caption="借新还旧，续借利率 3% 涨到 6%">
          <FlipNumber from="3%" to="6%" label="续借利率" flipAt={60} color={C.red} size={200} delay={20} />
        </DataScene>
      </Sequence>

      {/* S10b B-roll 金币雪球碾华尔街 4544-5103 */}
      <Sequence from={4544} durationInFrames={559}>
        <BRoll src="br04.png" dur={559} pan="left" dim={0.38} />
        <SubBar text="本金太大，利息照样滚雪球" delay={10} />
      </Sequence>

      {/* ===== 第四幕 AI泡沫 (seg3: 5103-6999) ===== */}
      {/* S11 章节卡02 5103-5343 */}
      <Sequence from={5103} durationInFrames={240}>
        <ChapterScene num="02" title="AI泡沫的账面游戏" accent={C.orange} />
      </Sequence>

      {/* S12a B-roll 失衡天平 5343-5663 */}
      <Sequence from={5343} durationInFrames={320}>
        <BRoll src="br05.png" dur={320} pan="in" dim={0.4} />
        <SubBar text="砸 5600亿，营收才 350亿" delay={10} />
      </Sequence>

      {/* S12b 数据：天平16:1 5663-5963 */}
      <Sequence from={5663} durationInFrames={300}>
        <DataScene dur={300} caption="投入产出 16 : 1，严重失衡">
          <Balance left={{ label: "AI投入", value: "5600亿" }}
            right={{ label: "营收", value: "350亿" }} ratio="16 : 1" delay={10} />
        </DataScene>
      </Sequence>

      {/* S13a 数据：资金循环 5963-6303 */}
      <Sequence from={5963} durationInFrames={340}>
        <DataScene dur={340} caption="英伟达 → OpenAI → 甲骨文 → 英伟达">
          <FlowCycle delay={14} />
        </DataScene>
      </Sequence>

      {/* S13b 真实交易所实拍（资金空转）6303-6603 */}
      <Sequence from={6303} durationInFrames={300}>
        <RealVideo src="trading1.mp4" dur={300} dim={0.42} />
        <SubBar text="说穿了，就是左手倒右手" delay={10} />
      </Sequence>

      {/* S14 B-roll 泡沫破裂 6603-6999 */}
      <Sequence from={6603} durationInFrames={396}>
        <BRoll src="br07.png" dur={396} pan="out" dim={0.42} />
        <SubBar text="外部资金一断，泡沫立马就瘪" delay={10} />
      </Sequence>

      {/* ===== 第五幕 美元信任 (seg4: 6999-8811) ===== */}
      {/* S15 章节卡03 6999-7239 */}
      <Sequence from={6999} durationInFrames={240}>
        <ChapterScene num="03" title="美元的信任在塌" accent={C.gold} />
      </Sequence>

      {/* S16a 数据：黄金反超 7239-7639 */}
      <Sequence from={7239} durationInFrames={400}>
        <DataScene dur={400} caption="黄金占央行储备 27%，首超美债 22%">
          <DualBarSwap left={{ name: "黄金", value: 27, color: C.gold }}
            right={{ name: "美国国债", value: 22, color: C.teal }} delay={10} dur={55} />
        </DataScene>
      </Sequence>

      {/* S16b 真实金币实拍 7639-7999 */}
      <Sequence from={7639} durationInFrames={360}>
        <RealVideo src="gold1.mp4" dur={360} dim={0.42} />
        <SubBar text="30年来头一回，黄金登顶第一储备" delay={10} />
      </Sequence>

      {/* S17 B-roll 美债冰封 7999-8559 */}
      <Sequence from={7999} durationInFrames={560}>
        <BRoll src="br09.png" dur={560} pan="in" dim={0.4} />
        <SubBar text="冻结俄罗斯3000亿 —— 美债成了政治人质" delay={10} />
      </Sequence>

      {/* S18a B-roll 骆驼稻草 + 三因汇流 8559-8811 */}
      <Sequence from={8559} durationInFrames={252}>
        <BRoll src="br10.png" dur={252} pan="in" dim={0.45} />
        <Center><Converge delay={6} /></Center>
        <SubBar text="这就是压垮骆驼的最后一根稻草" delay={10} />
      </Sequence>

      {/* ===== 第六幕 建议+金句 (seg5+6: 8811-10987) ===== */}
      {/* S18b-1 留现金 8811-9372 */}
      <Sequence from={8811} durationInFrames={561}>
        <DataScene dur={561} caption="给普通人的四条实在话">
          <AdviceCard num="一" title="留现金"
            points={["别裸辞、别借钱搞重资产", "存够 1-2 年生活费放银行"]} accent={C.teal} delay={10} />
        </DataScene>
      </Sequence>

      {/* S18b-2 清债 9372-9933 */}
      <Sequence from={9372} durationInFrames={561}>
        <DataScene dur={561}>
          <AdviceCard num="二" title="把债清掉"
            points={["高息、不合规借贷尽快理清", "没负债就是最好的护身符"]} accent={C.blue} delay={10} />
        </DataScene>
      </Sequence>

      {/* S18b-3 副业 9933-10363 */}
      <Sequence from={9933} durationInFrames={430}>
        <DataScene dur={430}>
          <AdviceCard num="三" title="练本事、做副业"
            points={["学低成本技能", "找一份不挑地点的第二收入"]} accent={C.orange} delay={10} />
        </DataScene>
      </Sequence>

      {/* S18b-4 分散 - B-roll 风暴保险箱 10363-10683 */}
      <Sequence from={10363} durationInFrames={320}>
        <BRoll src="br11.png" dur={320} pan="in" dim={0.4} />
        <Center>
          <AdviceCard num="四" title="仓位分散"
            points={["鸡蛋别装一个篮子", "别追高，挑稳的拿"]} accent={C.red} delay={10} />
        </Center>
      </Sequence>

      {/* S18c B-roll 沙漏 + 金句 10683-10987 */}
      <Sequence from={10683} durationInFrames={304}>
        <BRoll src="br12.png" dur={304} pan="in" dim={0.5} />
        <Center>
          <TitleReveal text="危机不会消灭财富" size={62} color="#FCEFC7" />
          <div style={{ height: 18 }} />
          <TitleReveal text="只是把它挪给沉得住气的人" size={50} color={C.gold} />
        </Center>
      </Sequence>

      {/* 片尾素材鸣谢 10987-11107 */}
      <Sequence from={10987} durationInFrames={120}>
        <Credits />
      </Sequence>
    </AbsoluteFill>
  );
};
