// 三标志镜头 showcase - 验证黑金红绿动效风格（竖屏 1080×1920 @30fps）
import { AbsoluteFill, Sequence } from "remotion";
import { F } from "./theme";
import { ShotBalance } from "./ShotBalance";
import { ShotStairs } from "./ShotStairs";
import { ShotReverse } from "./ShotReverse";

export const FuturesShowcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: F.bg0 }}>
      <Sequence from={0} durationInFrames={195}><ShotBalance /></Sequence>
      <Sequence from={195} durationInFrames={150}><ShotStairs /></Sequence>
      <Sequence from={345} durationInFrames={150}><ShotReverse /></Sequence>
    </AbsoluteFill>
  );
};
