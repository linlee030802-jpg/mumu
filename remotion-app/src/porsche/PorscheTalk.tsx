// 保时捷轧空 — 真人口播 + 数据动效叠加版（科技蓝金，真人在右，卡靠左浮出）
// 口播 203.38s / 10169帧 @50fps · 时间戳来自whisper转录
import { AbsoluteFill, OffthreadVideo, staticFile, Sequence } from "remotion";
import { P, SANS, MONO } from "./Broll";
import { Pop, Card, Tag, Num, StackMini, BrollCut } from "./OverlayKit";

const F = (sec: number) => Math.round(sec * 50); // 秒→帧

export const PorscheTalk: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo src={staticFile("porsche/talk.mov")} />
      {/* 右侧暗角，卡可读、真人在左不挡 */}
      <AbsoluteFill style={{ background: "linear-gradient(270deg, rgba(6,10,20,0.78) 0%, rgba(6,10,20,0.3) 34%, transparent 56%)" }} />

      {/* ===== 历史B-roll全屏切片（声音继续，盖画面增信）===== */}
      {/* 保时捷公司 36-39.5s */}
      <Sequence from={F(36)} durationInFrames={F(3.5)}>
        <BrollCut img="porsche_911.jpg" dur={F(3.5)} en="PORSCHE" zh="做跑车的保时捷" credit="© Agus964 / CC BY-SA 3.0" pan="left" />
      </Sequence>
      {/* 大众股票 42-45.5s */}
      <Sequence from={F(42)} durationInFrames={F(3.5)}>
        <BrollCut img="vw_wolfsburg.jpg" dur={F(3.5)} en="VOLKSWAGEN" zh="悄悄买入大众" credit="© High Contrast / CC BY 2.0" pan="in" />
      </Sequence>
      {/* 对冲基金做空氛围 67-71s */}
      <Sequence from={F(67)} durationInFrames={F(4)}>
        <BrollCut img="bull_bear.jpg" dur={F(4)} en="BULLS VS BEARS" zh="对冲基金的算盘" credit="© Thomas Richter / CC BY-SA 3.0" pan="left" />
      </Sequence>
      {/* 轧空现场 135-139s */}
      <Sequence from={F(135)} durationInFrames={F(4)}>
        <BrollCut img="frankfurt_floor_2008.jpg" dur={F(4)} en="FRANKFURT · OCT 2008" zh="价格爆发了" credit="© Dontworry / CC BY-SA 3.0" pan="in" />
      </Sequence>


      {/* 顶部品牌条 */}
      <Sequence from={F(12)}>
        <div style={{ position: "absolute", top: 46, right: 60 }}>
          <Pop at={0} out={F(190)} from="right"><Tag en="SHORT SQUEEZE 2008" zh="轧空屠杀" accent="gold" /></Pop>
        </div>
      </Sequence>

      {/* ① 5.6-11 一夜亏200亿 */}
      <Sequence from={F(5.6)} durationInFrames={F(5.4)}>
        <div style={{ position: "absolute", top: 300, right: 60 }}>
          <Pop at={0} out={F(5)} from="right"><Card><Tag en="ONE NIGHT LOSS" zh="一夜亏掉" accent="red" /><Num at={6} value={200} prefix="$" suffix="亿+" color={P.red} /></Card></Pop>
        </div>
      </Sequence>

      {/* ② 24-27 武器是交割规则 */}
      <Sequence from={F(24)} durationInFrames={F(7)}>
        <div style={{ position: "absolute", top: 320, right: 60 }}>
          <Pop at={0} out={F(6.5)} from="right"><Card>
            <Tag en="THE REAL WEAPON" zh="真正的武器" />
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 34, color: P.mute }}>K线 ✕</span>
              <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 40, color: P.goldLite }}>→ 交割规则 ✓</span>
            </div>
          </Card></Pop>
        </div>
      </Sequence>

      {/* ③ 45-64 持仓拆解 42/31/20/6 */}
      <Sequence from={F(45.8)} durationInFrames={F(18.5)}>
        <div style={{ position: "absolute", top: 280, right: 60 }}>
          <Pop at={0} out={F(17.5)} from="right"><Card><Tag en="WHO HOLDS VW" zh="筹码在谁手里" /><StackMini at={10} /></Card></Pop>
        </div>
      </Sequence>

      {/* ④ 79-85 大规模做空 */}
      <Sequence from={F(79.4)} durationInFrames={F(6)}>
        <div style={{ position: "absolute", top: 340, right: 60 }}>
          <Pop at={0} out={F(5.5)} from="right"><Card><Tag en="HEDGE FUNDS SHORT" zh="华尔街疯狂做空" accent="red" />
            <span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 38, color: P.ink }}>对冲基金 → 大规模做空</span></Card></Pop>
        </div>
      </Sequence>

      {/* ⑤ 90-101 现金结算≠实物 */}
      <Sequence from={F(90)} durationInFrames={F(11)}>
        <div style={{ position: "absolute", top: 320, right: 60 }}>
          <Pop at={0} out={F(10.5)} from="right"><Card><Tag en="THE TWIST" zh="空头算漏的事" accent="red" />
            <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 52, color: P.goldLite }}>现金结算</span>
            <span style={{ fontFamily: SANS, fontWeight: 500, fontSize: 30, color: P.mute }}>不是实物交割 · 不用真买股票</span></Card></Pop>
        </div>
      </Sequence>

      {/* ⑥ 109-114 控制74.1% */}
      <Sequence from={F(109.9)} durationInFrames={F(5)}>
        <div style={{ position: "absolute", top: 320, right: 60 }}>
          <Pop at={0} out={F(4.5)} from="right"><Card><Tag en="PORSCHE CONTROLS" zh="保时捷实际控制" /><Num at={6} value={74.1} suffix="%" /></Card></Pop>
        </div>
      </Sequence>

      {/* ⑦ 123-135 缺口图 买不到货 */}
      <Sequence from={F(123.4)} durationInFrames={F(12)}>
        <div style={{ position: "absolute", top: 300, right: 60 }}>
          <Pop at={0} out={F(11)} from="right"><Card><Tag en="NO SHARES LEFT" zh="买不到货" accent="red" />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}><span style={{ width: 360, height: 36, background: P.red, borderRadius: 6 }} /><span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 34, color: P.red }}>空头12%+</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}><span style={{ width: 180, height: 36, background: P.blueLite, borderRadius: 6 }} /><span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 34, color: P.blueLite }}>可买6%</span></div>
            </div></Card></Pop>
        </div>
      </Sequence>

      {/* ⑧ 139-148 股价暴涨200→1005 / 3700亿 */}
      <Sequence from={F(139)} durationInFrames={F(10)}>
        <div style={{ position: "absolute", top: 300, right: 60 }}>
          <Pop at={0} out={F(9)} from="right"><Card><Tag en="THE SQUEEZE" zh="两天垂直拉升" accent="red" />
            <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 76, color: P.goldLite }}>€200<span style={{ fontSize: 44, color: P.mute }}> → </span>€1005</div>
            <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 28, color: P.mute }}>市值一度$3700亿 · 全球第一</span></Card></Pop>
        </div>
      </Sequence>

      {/* ⑨ 180-195 两句铁律 */}
      <Sequence from={F(180.6)} durationInFrames={F(15)}>
        <div style={{ position: "absolute", top: 280, right: 60 }}>
          <Pop at={0} out={F(14)} from="right"><Card><Tag en="TWO LESSONS" zh="两句铁律" />
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}><span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 56, color: P.gold }}>01</span><span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 36, color: P.ink }}>别把仓位暴露给对手</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}><span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 56, color: P.gold }}>02</span><span style={{ fontFamily: SANS, fontWeight: 800, fontSize: 36, color: P.ink }}>别低估规则的力量</span></div></Card></Pop>
        </div>
      </Sequence>
      {/* 片尾 CC 素材鸣谢卡 198-203.4s */}
      <Sequence from={F(198)} durationInFrames={F(5.4)}>
        <div style={{ position: "absolute", bottom: 50, left: 60 }}>
          <Pop at={0} out={F(5)} from="left">
            <div style={{ padding: "16px 24px", borderRadius: 14, background: "rgba(12,18,34,0.86)", border: `1px solid ${P.blue}44`,
              fontFamily: SANS, fontSize: 20, color: P.mute, lineHeight: 1.6, maxWidth: 760 }}>
              <span style={{ color: P.goldLite, fontWeight: 700 }}>素材鸣谢　</span>
              历史图片来自 Wikimedia Commons：High Contrast、Dontworry、Thomas Richter、Agus964（CC BY / CC BY-SA）
            </div>
          </Pop>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
