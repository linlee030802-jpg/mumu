// 期权·为什么烧脑（时间维度）— 扫盲极简几何风 完整片
// 配音 159s / 4768帧 @30fps · 比奇堡分析师
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Hook, KeyPoint, SpeedCompare, Outro } from "./Story";
import { LineToCurve, RulerVs3D } from "./Dims";
import { IceMelt, Greeks, Contract } from "./Scenes";

export const OptionFull: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#F4F1EA" }}>
      <Audio src={staticFile("option/narration.mp3")} />

      {/* 幕1 钩子 0-333 */}
      <Sequence from={0} durationInFrames={333}><Hook dur={333} /></Sequence>

      {/* 幕2 点题=时间维度 333-677 */}
      <Sequence from={333} durationInFrames={344}><KeyPoint dur={344} /></Sequence>

      {/* 幕3 一维直线 + 定金合同 677-1444 */}
      <Sequence from={677} durationInFrames={383}><LineToCurve dur={383} /></Sequence>
      <Sequence from={1060} durationInFrames={384}><Contract dur={384} /></Sequence>

      {/* 幕4 概率曲线（强调弯曲）1444-2055 */}
      <Sequence from={1444} durationInFrames={611}><LineToCurve dur={611} /></Sequence>

      {/* 幕5 三个希腊字母 2055-2640 */}
      <Sequence from={2055} durationInFrames={585}><Greeks dur={585} /></Sequence>

      {/* 幕6 涨速对比 + 冰块衰减 2640-3682 */}
      <Sequence from={2640} durationInFrames={520}><SpeedCompare dur={520} /></Sequence>
      <Sequence from={3160} durationInFrames={522}><IceMelt dur={522} /></Sequence>

      {/* 幕7 一维尺量三维 + 收尾 3682-4768 */}
      <Sequence from={3682} durationInFrames={560}><RulerVs3D dur={560} /></Sequence>
      <Sequence from={4242} durationInFrames={526}><Outro dur={526} /></Sequence>
    </AbsoluteFill>
  );
};
