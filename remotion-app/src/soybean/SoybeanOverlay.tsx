// 0508豆粕片 — 口播叠加动效主合成（横屏1920×1080，真人在右，数据卡靠左浮出）
// 配音逐字时间轴 → 帧（×30fps）
import { AbsoluteFill, OffthreadVideo, staticFile, Sequence } from "remotion";
import { Pop, BiTag, Ring, FlowArrow, BigNum, Panel, G, SANS } from "./Overlays";

export const SoybeanOverlay: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo src={staticFile("soybean/base.mov")} />

      {/* 左侧暗角，让浮卡区可读、真人在右半不被挡 */}
      <AbsoluteFill style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 38%, transparent 60%)" }} />

      {/* 顶部品牌条 0.3s起 */}
      <Sequence from={9}>
        <div style={{ position: "absolute", top: 40, left: 56 }}>
          <Pop at={0} from="up">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 6, height: 30, background: G.greenLite, boxShadow: `0 0 10px ${G.green}` }} />
              <BiTag en="SOYBEAN CHAIN" zh="大豆供应链" accent />
            </div>
          </Pop>
        </div>
      </Sequence>

      {/* ① 1.8-4.2s 资金流向：一场雨 → 猪肉价 (左中) */}
      <Sequence from={54} durationInFrames={78}>
        <div style={{ position: "absolute", top: 360, left: 56 }}>
          <Pop at={0} out={66} from="left">
            <Panel>
              <BiTag en="CHAIN REACTION" zh="一场雨的连锁" />
              <FlowArrow at={8} from="中西部一场雨" to="楼下猪肉价" />
            </Panel>
          </Pop>
        </div>
      </Sequence>

      {/* ② 5.5-9.2s 蛋白质来源=豆粕 高亮卡 (左中) */}
      <Sequence from={165} durationInFrames={111}>
        <div style={{ position: "absolute", top: 340, left: 56 }}>
          <Pop at={0} out={96} from="left">
            <Panel>
              <BiTag en="PROTEIN SOURCE" zh="蛋白质来源" />
              <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 60, color: G.greenLite, textShadow: `0 0 24px ${G.green}` }}>豆粕</div>
              <div style={{ fontFamily: SANS, fontSize: 24, color: G.white, opacity: 0.8 }}>猪饲料蛋白主要来源</div>
            </Panel>
          </Pop>
        </div>
      </Sequence>

      {/* ③ 9.2-12.9s 环形90% 进口依赖 (左中) */}
      <Sequence from={276} durationInFrames={111}>
        <div style={{ position: "absolute", top: 320, left: 56 }}>
          <Pop at={0} out={96} from="left">
            <Panel>
              <BiTag en="IMPORT RELIANCE" zh="进口依赖" />
              <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                <Ring at={6} pct={90} />
                <div style={{ fontFamily: SANS, fontSize: 26, color: G.white, lineHeight: 1.5, maxWidth: 220 }}>
                  中国 <span style={{ color: G.greenLite, fontWeight: 800 }}>90%+</span> 豆粕<br />来自进口大豆
                </div>
              </div>
            </Panel>
          </Pop>
        </div>
      </Sequence>

      {/* ④ 12.9-14.9s 大数字3亿吨 全球产量 (左下) */}
      <Sequence from={387}>
        <div style={{ position: "absolute", top: 700, left: 56 }}>
          <Pop at={0} from="left">
            <BigNum at={4} value={3} unit="亿吨+" label="全球大豆年产量" />
          </Pop>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
