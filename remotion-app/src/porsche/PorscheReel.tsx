// 保时捷轧空大众 — 完整数据动效版（历史B-roll + 全套数据动效，科技蓝金）
// 覆盖整篇叙事，可独立发，也可与真人口播逐段对剪。横屏1920×1080
import { AbsoluteFill, Sequence } from "remotion";
import { BRoll } from "./Broll";
import { PriceSpike, BigStat, GapBar, Holdings } from "./DataViz";
import { TitleCard, VsWeapon, KeyTwist, ShortFlow, Rules, CTA } from "./Scenes";

export const PorscheReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0E1A" }}>
      {/* 开场标题 0-120 */}
      <Sequence from={0} durationInFrames={120}><TitleCard dur={120} /></Sequence>

      {/* 一夜亏200亿 120-225 */}
      <Sequence from={120} durationInFrames={105}>
        <BigStat dur={105} enTag="ONE NIGHT LOSS" zhTag="顶级对冲基金 一夜亏掉" value={200} prefix="$" suffix="亿+" sub="甚至需要德国政府出面斡旋" color="#E63A2E" />
      </Sequence>

      {/* 大众总部B-roll 225-315 */}
      <Sequence from={225} durationInFrames={90}>
        <BRoll img="vw_wolfsburg.jpg" dur={90} pan="in" enTag="VOLKSWAGEN 2008" zhTag="故事的主角" credit="© High Contrast / CC BY 2.0" />
      </Sequence>

      {/* 真正的武器：K线✕→交割规则✓ 315-435 */}
      <Sequence from={315} durationInFrames={120}><VsWeapon dur={120} /></Sequence>

      {/* 持仓拆解 435-570 */}
      <Sequence from={435} durationInFrames={135}><Holdings dur={135} /></Sequence>

      {/* 牛熊雕像 做空 570-660 */}
      <Sequence from={570} durationInFrames={90}>
        <BRoll img="bull_bear.jpg" dur={90} pan="left" enTag="BULLS VS BEARS" zhTag="多空对决" credit="© Thomas Richter / CC BY-SA 3.0" />
      </Sequence>

      {/* 资金流向 做空 660-780 */}
      <Sequence from={660} durationInFrames={120}><ShortFlow dur={120} /></Sequence>

      {/* 关键转折：现金结算 780-915 */}
      <Sequence from={780} durationInFrames={135}><KeyTwist dur={135} /></Sequence>

      {/* 74.1% 控盘 915-1020 */}
      <Sequence from={915} durationInFrames={105}>
        <BigStat dur={105} enTag="PORSCHE CONTROLS" zhTag="保时捷实际控制" value={74.1} suffix="%" sub="一纸公告，引爆深水炸弹" />
      </Sequence>

      {/* 缺口图 1020-1140 */}
      <Sequence from={1020} durationInFrames={120}><GapBar dur={120} /></Sequence>

      {/* 法兰克福2008 B-roll 1140-1260 */}
      <Sequence from={1140} durationInFrames={120}>
        <BRoll img="frankfurt_floor_2008.jpg" dur={120} pan="in" enTag="FRANKFURT · OCT 2008" zhTag="轧空风暴中心" credit="© Dontworry / CC BY-SA 3.0" />
      </Sequence>

      {/* 股价暴涨曲线 1260-1440（高潮） */}
      <Sequence from={1260} durationInFrames={180}><PriceSpike dur={180} /></Sequence>

      {/* 市值3700亿 1440-1545 */}
      <Sequence from={1440} durationInFrames={105}>
        <BigStat dur={105} enTag="PEAK MARKET CAP" zhTag="一度全球市值第一" value={3700} prefix="$" suffix="亿" color="#FFD36B" />
      </Sequence>

      {/* 两句铁律 1545-1710 */}
      <Sequence from={1545} durationInFrames={165}><Rules dur={165} /></Sequence>

      {/* CTA 1710-1830 */}
      <Sequence from={1710} durationInFrames={120}><CTA dur={120} /></Sequence>
    </AbsoluteFill>
  );
};
