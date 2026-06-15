// 粒子关键镜验证 - 台阶跃升 + 筛子筛选（竖屏 1080×1920 @30fps）
import { AbsoluteFill, Sequence } from "remotion";
import { StepRiseParticles } from "./StepRiseParticles";
import { SieveParticles } from "./SieveParticles";

export const ParticleShots: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <Sequence from={0} durationInFrames={150}><StepRiseParticles /></Sequence>
      <Sequence from={150} durationInFrames={150}><SieveParticles /></Sequence>
    </AbsoluteFill>
  );
};
