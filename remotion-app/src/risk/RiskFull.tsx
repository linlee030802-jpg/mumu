// 《止损vs加仓 哪个爆仓更快》完整片 — 电影暖金写实 + 苹果质感卡 + 数据动效三层混剪
// 配音 140.23s / 4207帧 @30fps
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { RiskScene } from "./RiskScene";
import { RiskClip } from "./RiskClip";
import { NumberRoll, DoubleStairs, VsBars } from "./DataViz";

export const RiskFull: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#F2E9D6" }}>
      <Audio src={staticFile("risk/audio/narration.mp3")} />

      {/* ===== 幕1 钩子 0-362 ===== */}
      <Sequence from={0} durationInFrames={200}>
        <RiskClip src="screen2.mp4" dur={200} title="哪个爆仓更快" cardTop="亏钱就止损 vs 亏钱就加仓" />
      </Sequence>
      <Sequence from={200} durationInFrames={162}>
        <RiskScene img="p01.png" dur={162} title="两条路" cardTop="火星都奔向" cardMain="同一个炸药桶" accent="red" />
      </Sequence>

      {/* ===== 幕2 止损逻辑 362-1358 (s2 33s) ===== */}
      <Sequence from={362} durationInFrames={210}>
        <RiskScene img="p02.png" dur={210} chapter="路线 01" title="亏钱就止损" />
      </Sequence>
      <Sequence from={572} durationInFrames={250}>
        <NumberRoll dur={250} title="王五的本金" value={100} suffix="万" sub="每次只亏 1% 就砍" />
      </Sequence>
      <Sequence from={822} durationInFrames={266}>
        <RiskScene img="p03.png" dur={266} title="想爆仓" cardMain="得连亏 100 次" cardSub="深不见底，几乎走不到" accent="gold" />
      </Sequence>
      <Sequence from={1088} durationInFrames={270}>
        <RiskScene img="p04.png" dur={270} title="连抛 100 次正面" cardTop="你抛到天亮也抛不出" cardMain="不是数学，是执行力" accent="green" />
      </Sequence>

      {/* ===== 幕3 加仓诱惑 1358-2131 (s3 26s) ===== */}
      <Sequence from={1358} durationInFrames={220}>
        <RiskScene img="p05.png" dur={220} chapter="路线 02" title="亏钱就加仓" />
      </Sequence>
      <Sequence from={1578} durationInFrames={280}>
        <RiskScene img="p05.png" dur={280} title="诱惑太大" cardTop="反弹 1% 就回本" cardMain="感觉节奏无敌" accent="gold" />
      </Sequence>
      <Sequence from={1858} durationInFrames={273}>
        <RiskScene img="p06.png" dur={273} title="保证金被打穿" cardTop="只要遇到一次" cardMain="一次就全没了" accent="red" />
      </Sequence>

      {/* ===== 幕4 翻倍下注 2131-2664 (s4 18s) ===== */}
      <Sequence from={2131} durationInFrames={260}>
        <DoubleStairs dur={260} title="从 5 万开始翻倍" />
      </Sequence>
      <Sequence from={2391} durationInFrames={273}>
        <RiskScene img="p09.png" dur={273} title="一两天就结束" cardTop="不是概率问题" cardMain="是一定会发生" accent="red" />
      </Sequence>

      {/* ===== 幕5 两路对比 2664-3361 (s5 23s) ===== */}
      <Sequence from={2664} durationInFrames={320}>
        <VsBars dur={320} leftLabel="止损" leftSub="活下去 · 可能赚到无限大" rightLabel="加仓" rightSub="赚 1% 就跑 · 扛到爆仓" />
      </Sequence>
      <Sequence from={2984} durationInFrames={377}>
        <RiskScene img="p11.png" dur={377} title="100万做到300万" cardTop="回撤三五十万" cardMain="能接受" accent="green" />
      </Sequence>

      {/* ===== 幕6 金句收尾 3361-4207 (s6 28s) ===== */}
      <Sequence from={3361} durationInFrames={300}>
        <RiskScene img="p12.png" dur={300} title="钱赚不完" cardMain="但能一把亏完" accent="gold" />
      </Sequence>
      <Sequence from={3661} durationInFrames={300}>
        <RiskScene img="p10.png" dur={300} title="得与舍的平衡" cardTop="留一条命 vs 埋定时炸弹" cardSub="只得不舍，终会大亏" accent="green" />
      </Sequence>
      <Sequence from={3961} durationInFrames={246}>
        <RiskClip src="sunrise1.mp4" dur={246} title="你是哪一边" cardSub="评论区告诉我 · 我是权知道，下期见" />
      </Sequence>
    </AbsoluteFill>
  );
};
