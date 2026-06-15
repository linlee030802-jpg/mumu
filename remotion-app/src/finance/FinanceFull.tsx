// 《一文说透全球性金融危机的本质》完整片 v5 - 快剪版（3-4秒/切，学《野蛮人敲门》节奏）
// 三层画面体系：真实实拍/AI写实比喻/数据动效交替；长镜头内部用 MultiBRoll 切碎
import { AbsoluteFill, Audio, Sequence, Series, staticFile } from "remotion";
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
import { MultiBRoll } from "./MultiBRoll";
import { FlashCut, SceneWrap } from "./Transitions";
import { Credits } from "./Credits";

const Center: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>{children}</AbsoluteFill>
);

const Cap: React.FC<{ text: string }> = ({ text }) => (
  <div style={{
    position: "absolute", top: 90, width: "100%", textAlign: "center",
    color: C.ink, fontSize: 42, fontWeight: 700, letterSpacing: 2,
    fontFamily: '"PingFang SC","Noto Sans SC",sans-serif',
    textShadow: "0 2px 5px rgba(80,60,30,0.12)",
  }}>{text}</div>
);

// 数据动效场景：米白底 + 进出淡化
const DataScene: React.FC<{ caption?: string; dur?: number; children: React.ReactNode }> = ({ caption, dur = 240, children }) => (
  <SceneWrap dur={dur}>
    <AbsoluteFill style={{ backgroundColor: C.bg0 }}>
      <FinanceBG accent={C.red} />
      {caption && <Cap text={caption} />}
      <Center>{children}</Center>
    </AbsoluteFill>
  </SceneWrap>
);

// 章节卡场景：闪白转场
const ChapterScene: React.FC<{ num: string; title: string; accent: string }> = ({ num, title, accent }) => (
  <AbsoluteFill style={{ backgroundColor: C.bg0 }}>
    <FinanceBG accent={accent} />
    <ChapterCard num={num} title={title} accent={accent} />
    <FlashCut at={0} dur={12} />
  </AbsoluteFill>
);

export const FinanceFull: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Audio src={staticFile("finance/audio/narration.mp3")} />

      {/* ===== 第一幕+第二幕 (seg1: 0-2444) ===== */}
      {/* S1 开场 暴风雨城市→铜牛→美联储 快剪 0-220 */}
      <Sequence from={0} durationInFrames={220}>
        <MultiBRoll total={220} seg={110} clips={[
          { type: "vid", src: "storm1.mp4", dim: 0.5 },
          { type: "img", src: "c01.png", focus: "center", dim: 0.5 },
        ]} />
        <Center>
          <TitleReveal text="全球性金融危机，真要来了？" size={86} color="#FCEFC7" underline />
        </Center>
      </Sequence>

      {/* S2 中美双人物 220-640（数据卡→华尔街空镜→翻牌 切碎）*/}
      <Sequence from={220} durationInFrames={420}>
        <Series>
          <Series.Sequence durationInFrames={200}>
            <DataScene dur={200} caption="一个月里，中美两位重磅人物前后脚发警告">
              <PersonClash delay={8} />
            </DataScene>
          </Series.Sequence>
          <Series.Sequence durationInFrames={110}>
            <AbsoluteFill>
              <RealVideo src="wallst1.mp4" dur={110} dim={0.42} />
              <SubBar text="快则今年，慢则明年" delay={6} />
            </AbsoluteFill>
          </Series.Sequence>
          <Series.Sequence durationInFrames={110}>
            <DataScene dur={110}>
              <FlipNumber from="—" to="5/27" label="凤凰湾区财经论坛" flipAt={20} color={C.red} size={120} delay={6} />
            </DataScene>
          </Series.Sequence>
        </Series>
      </Sequence>

      {/* S3 高志凯卡 640-1100（卡→美联储空镜→破坏力图）*/}
      <Sequence from={640} durationInFrames={460}>
        <Series>
          <Series.Sequence durationInFrames={240}>
            <DataScene dur={240}>
              <InfoCard name="高志凯" title="全球化智库副主任" photo="gao.jpg"
                points={["12-18个月内爆发空前危机", "破坏力是2000年泡沫的十倍", "「高志凯线」提出者"]}
                accent={C.red} delay={6} />
            </DataScene>
          </Series.Sequence>
          <Series.Sequence durationInFrames={120}>
            <AbsoluteFill><RealVideo src="fed1.mp4" dur={120} dim={0.42} />
              <SubBar text="全球化智库副主任" delay={6} /></AbsoluteFill>
          </Series.Sequence>
          <Series.Sequence durationInFrames={100}>
            <AbsoluteFill><BRoll src="c02.png" dur={100} focus="center" dim={0.42} />
              <SubBar text="规模空前的危机" delay={6} /></AbsoluteFill>
          </Series.Sequence>
        </Series>
      </Sequence>

      {/* S4 破坏力10倍 1100-1460（泡沫撞城→10×→泡沫特写）*/}
      <Sequence from={1100} durationInFrames={360}>
        <MultiBRoll total={360} seg={120} subSwitch={["", "破坏力 = 2000年互联网泡沫的十倍", ""]} clips={[
          { type: "img", src: "br02.png", pan: "in", dim: 0.4 },
          { type: "img", src: "c07.png", focus: "center", dim: 0.4 },
          { type: "img", src: "br02.png", focus: "closeup", dim: 0.4 },
        ]} />
        <Center>
          <NumberTicker to={10} suffix="×" color="#FCEFC7" size={300} delay={130} dur={36} />
        </Center>
      </Sequence>

      {/* S5 罗杰斯卡 1460-2020 */}
      <Sequence from={1460} durationInFrames={560}>
        <Series>
          <Series.Sequence durationInFrames={300}>
            <DataScene dur={300}>
              <InfoCard name="吉姆·罗杰斯" title="量子基金创始人 · 84岁" photo="rogers.jpg"
                points={["2026最惨金融危机，胜过2008", "量子基金十年收益42倍", "与索罗斯、巴菲特并称三巨头"]}
                accent={C.blue} delay={6} />
            </DataScene>
          </Series.Sequence>
          <Series.Sequence durationInFrames={130}>
            <AbsoluteFill><RealVideo src="trading1.mp4" dur={130} dim={0.42} />
              <SubBar text="华尔街神话，三大金融巨头之一" delay={6} /></AbsoluteFill>
          </Series.Sequence>
          <Series.Sequence durationInFrames={130}>
            <AbsoluteFill><RealVideo src="ticker1.mp4" dur={130} dim={0.42} />
              <SubBar text="手里的美股，已经清空了" delay={6} /></AbsoluteFill>
          </Series.Sequence>
        </Series>
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

      {/* S8a 债务山+337万亿 2684-2964 */}
      <Sequence from={2684} durationInFrames={280}>
        <BRoll src="br03.png" dur={280} pan="out" dim={0.4} />
        <Center><NumberTicker to={337} unit="万亿$" color="#FCEFC7" size={150} delay={14} dur={46} /></Center>
        <SubBar text="全球债务 337万亿，美债就占 39万亿" delay={10} />
      </Sequence>

      {/* S8b 债务比喻快剪 2964-3344（锁链拖拽→国债山→烧钱）*/}
      <Sequence from={2964} durationInFrames={380}>
        <MultiBRoll total={380} seg={127} subSwitch={[
          "39万亿，光利息一年就 1.23万亿", "比美国全年国防预算还多", "借新还旧，越滚越大"]} clips={[
          { type: "img", src: "c03.png", focus: "center", dim: 0.42 },
          { type: "img", src: "c04.png", focus: "wide", dim: 0.42 },
          { type: "img", src: "c05.png", focus: "center", dim: 0.42 },
        ]} />
      </Sequence>

      {/* S8c 利息vs国防双柱 3344-3444 */}
      <Sequence from={3344} durationInFrames={100}>
        <DataScene dur={100} caption="利息 vs 国防预算">
          <DualBarSwap left={{ name: "年利息", value: 123, color: C.red }}
            right={{ name: "国防预算", value: 100, color: C.teal }} delay={6} dur={45} />
        </DataScene>
      </Sequence>

      {/* S9a 环形127% 3444-3844 */}
      <Sequence from={3444} durationInFrames={400}>
        <DataScene dur={400} caption="美债占 GDP 127%，安全线仅 60%">
          <RingProgress value={127} threshold={60} label="债务 / GDP" delay={10} dur={55} size={460} />
        </DataScene>
      </Sequence>

      {/* S9b 还债高峰空镜 3844-4144（金融区夜→车流）*/}
      <Sequence from={3844} durationInFrames={300}>
        <MultiBRoll total={300} seg={150} subSwitch={[
          "2026年约10万亿国债要在高利率下续借", "三分之二还是短期债"]} clips={[
          { type: "vid", src: "night1.mp4", dim: 0.42 },
          { type: "vid", src: "traffic1.mp4", dim: 0.42 },
        ]} />
      </Sequence>

      {/* S10a 利率翻牌 4144-4344 */}
      <Sequence from={4144} durationInFrames={200}>
        <DataScene dur={200} caption="借新还旧，续借利率 3% 涨到 6%">
          <FlipNumber from="3%" to="6%" label="续借利率" flipAt={50} color={C.red} size={200} delay={16} />
        </DataScene>
      </Sequence>

      {/* S10b 雪球碾华尔街 快剪 4344-5103（雪球→华尔街→雪球特写）*/}
      <Sequence from={4344} durationInFrames={759}>
        <MultiBRoll total={759} seg={150} subSwitch={[
          "本金太大，利息照样滚雪球", "", "崩，是早晚的事", "美联储几乎降不动", ""]} clips={[
          { type: "img", src: "br04.png", pan: "left", dim: 0.38 },
          { type: "vid", src: "wallst2.mp4", dim: 0.42 },
          { type: "img", src: "br04.png", focus: "closeup", dim: 0.38 },
          { type: "vid", src: "fed1.mp4", dim: 0.42 },
          { type: "img", src: "c05.png", focus: "center", dim: 0.4 },
        ]} />
      </Sequence>

      {/* ===== 第四幕 AI泡沫 (seg3: 5103-6999) ===== */}
      {/* S11 章节卡02 5103-5343 */}
      <Sequence from={5103} durationInFrames={240}>
        <ChapterScene num="02" title="AI泡沫的账面游戏" accent={C.orange} />
      </Sequence>

      {/* S12a 烧钱快剪 5343-5663（服务器→天平→服务器）*/}
      <Sequence from={5343} durationInFrames={320}>
        <MultiBRoll total={320} seg={160} subSwitch={["2025年AI砸了5600亿美元", "营收才350亿"]} clips={[
          { type: "img", src: "br05.png", pan: "in", dim: 0.4 },
          { type: "vid", src: "server1.mp4", dim: 0.42 },
        ]} />
      </Sequence>

      {/* S12b 天平16:1 5663-5963 */}
      <Sequence from={5663} durationInFrames={300}>
        <DataScene dur={300} caption="投入产出 16 : 1，严重失衡">
          <Balance left={{ label: "AI投入", value: "5600亿" }}
            right={{ label: "营收", value: "350亿" }} ratio="16 : 1" delay={10} />
        </DataScene>
      </Sequence>

      {/* S13a 资金循环 5963-6303 */}
      <Sequence from={5963} durationInFrames={340}>
        <DataScene dur={340} caption="英伟达 → OpenAI → 甲骨文 → 英伟达">
          <FlowCycle delay={14} />
        </DataScene>
      </Sequence>

      {/* S13b 左手倒右手快剪 6303-6603（交易所→泡泡飘城→交易所）*/}
      <Sequence from={6303} durationInFrames={300}>
        <MultiBRoll total={300} seg={150} subSwitch={["说穿了，就是左手倒右手", "钱没流进实体经济"]} clips={[
          { type: "vid", src: "trading1.mp4", dim: 0.42 },
          { type: "img", src: "c07.png", focus: "wide", dim: 0.4 },
        ]} />
      </Sequence>

      {/* S14 泡沫破裂快剪 6603-6999（泡沫→破→旧报纸2000）*/}
      <Sequence from={6603} durationInFrames={396}>
        <MultiBRoll total={396} seg={132} subSwitch={[
          "外部资金一断，泡沫立马就瘪", "", "2000年那次，泡沫破了才长出新东西"]} clips={[
          { type: "img", src: "br07.png", pan: "out", dim: 0.42 },
          { type: "img", src: "c07.png", focus: "closeup", dim: 0.42 },
          { type: "img", src: "c08.png", focus: "center", dim: 0.42 },
        ]} />
      </Sequence>

      {/* ===== 第五幕 美元信任 (seg4: 6999-8811) ===== */}
      {/* S15 章节卡03 6999-7239 */}
      <Sequence from={6999} durationInFrames={240}>
        <ChapterScene num="03" title="美元的信任在塌" accent={C.gold} />
      </Sequence>

      {/* S16a 黄金反超数据 7239-7539 */}
      <Sequence from={7239} durationInFrames={300}>
        <DataScene dur={300} caption="黄金占央行储备 27%，首超美债 22%">
          <DualBarSwap left={{ name: "黄金", value: 27, color: C.gold }}
            right={{ name: "美国国债", value: 22, color: C.teal }} delay={10} dur={50} />
        </DataScene>
      </Sequence>

      {/* S16b 黄金快剪 7539-7999（真金币→金库开门→金条）*/}
      <Sequence from={7539} durationInFrames={460}>
        <MultiBRoll total={460} seg={153} subSwitch={[
          "30年来头一回，黄金登顶第一储备", "各国央行闷头买黄金", ""]} clips={[
          { type: "vid", src: "gold1.mp4", dim: 0.42 },
          { type: "img", src: "c09.png", focus: "center", dim: 0.42 },
          { type: "vid", src: "gold2.mp4", dim: 0.42 },
        ]} />
      </Sequence>

      {/* S17 冰封美债快剪 7999-8559（冰封→资金流向图→世界地图）*/}
      <Sequence from={7999} durationInFrames={560}>
        <MultiBRoll total={560} seg={140} subSwitch={[
          "冻结俄罗斯3000亿外汇储备", "美债成了政治人质", "抛美债，买黄金", "全世界在给美元投票"]} clips={[
          { type: "img", src: "br09.png", pan: "in", dim: 0.4 },
          { type: "img", src: "br09.png", focus: "closeup", dim: 0.4 },
          { type: "img", src: "c10.png", focus: "wide", dim: 0.42 },
          { type: "img", src: "c10.png", focus: "center", dim: 0.42 },
        ]} />
      </Sequence>

      {/* S18a 三因汇流+骆驼稻草 8559-8811 */}
      <Sequence from={8559} durationInFrames={252}>
        <MultiBRoll total={252} seg={126} subSwitch={["债务、AI泡沫、美元信任", "压垮骆驼的最后一根稻草"]} clips={[
          { type: "img", src: "c11.png", focus: "wide", dim: 0.4 },
          { type: "img", src: "br10.png", pan: "in", dim: 0.45 },
        ]} />
      </Sequence>

      {/* ===== 第六幕 建议+金句 (seg5+6: 8811-10987) ===== */}
      {/* S18b-1 留现金 8811-9372 */}
      <Sequence from={8811} durationInFrames={561}>
        <Series>
          <Series.Sequence durationInFrames={120}>
            <AbsoluteFill><RealVideo src="worry1.mp4" dur={120} dim={0.45} />
              <SubBar text="给普通人的四条实在话" delay={6} /></AbsoluteFill>
          </Series.Sequence>
          <Series.Sequence durationInFrames={441}>
            <DataScene dur={441} caption="给普通人的四条实在话">
              <AdviceCard num="一" title="留现金"
                points={["别裸辞、别借钱搞重资产", "存够 1-2 年生活费放银行"]} accent={C.teal} delay={10} />
            </DataScene>
          </Series.Sequence>
        </Series>
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

      {/* S18b-4 分散+大树 10363-10683 */}
      <Sequence from={10363} durationInFrames={320}>
        <MultiBRoll total={320} seg={160} subSwitch={["", ""]} clips={[
          { type: "img", src: "c12.png", focus: "center", dim: 0.42 },
          { type: "img", src: "br11.png", pan: "in", dim: 0.4 },
        ]} />
        <Center>
          <AdviceCard num="四" title="仓位分散"
            points={["鸡蛋别装一个篮子", "别追高，挑稳的拿"]} accent={C.red} delay={10} />
        </Center>
      </Sequence>

      {/* S18c 沙漏+金句 10683-10987 */}
      <Sequence from={10683} durationInFrames={304}>
        <BRoll src="br12.png" dur={304} pan="in" dim={0.5} />
        <Center>
          <TitleReveal text="危机不会消灭财富" size={62} color="#FCEFC7" />
          <div style={{ height: 18 }} />
          <TitleReveal text="只是把它挪给沉得住气的人" size={50} color={C.gold} />
        </Center>
      </Sequence>

      {/* 片尾鸣谢 10987-11107 */}
      <Sequence from={10987} durationInFrames={120}>
        <Credits />
      </Sequence>
    </AbsoluteFill>
  );
};
