import { Composition } from "remotion";
import { HelloEffect } from "./HelloEffect";
import { JensenHuang } from "./JensenHuang";
import { FinanceShowcase } from "./finance/FinanceShowcase";
import { FinanceFull } from "./finance/FinanceFull";
import { OverlayMov } from "./finance/OverlayMov";
import { OverlayLin } from "./finance/OverlayLin";
import { DemoLin, DemoWen } from "./finance/StyleDemos";
import { FuturesShowcase } from "./futures/FuturesShowcase";
import { MindsetShowcase } from "./mindset/MindsetShowcase";
import { MindsetFull } from "./mindset/MindsetFull";
import { PowParticles } from "./mindset/PowParticles";
import { ParticleShots } from "./mindset/ParticleShots";
import { FloatCardDemo } from "./mindset/FloatCardDemo";
import { AppleStyle } from "./mindset/AppleStyle";
import { RiskFull } from "./risk/RiskFull";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="RiskFull" component={RiskFull} durationInFrames={4207} fps={30} width={1080} height={1920} />
      <Composition id="AppleStyle" component={AppleStyle} durationInFrames={180} fps={30} width={1080} height={1920} />
      <Composition id="FloatCardDemo" component={FloatCardDemo} durationInFrames={180} fps={30} width={1080} height={1920} />
      <Composition id="ParticleShots" component={ParticleShots} durationInFrames={300} fps={30} width={1080} height={1920} />
      <Composition id="PowParticles" component={PowParticles} durationInFrames={150} fps={30} width={1080} height={1920} />
      <Composition id="MindsetFull" component={MindsetFull} durationInFrames={8610} fps={30} width={1080} height={1920} />
      <Composition id="MindsetShowcase" component={MindsetShowcase} durationInFrames={985} fps={30} width={1080} height={1920} />
      <Composition id="FuturesShowcase" component={FuturesShowcase} durationInFrames={495} fps={30} width={1080} height={1920} />
      <Composition id="DemoLin" component={DemoLin} durationInFrames={330} fps={30} width={1080} height={1920} />
      <Composition id="DemoWen" component={DemoWen} durationInFrames={330} fps={30} width={1080} height={1920} />
      <Composition
        id="OverlayLin"
        component={OverlayLin}
        durationInFrames={1666}
        fps={60}
        width={1080}
        height={1920}
      />
      <Composition
        id="OverlayMov"
        component={OverlayMov}
        durationInFrames={2594}
        fps={50}
        width={2160}
        height={1080}
      />
      <Composition
        id="FinanceFull"
        component={FinanceFull}
        durationInFrames={11107}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="FinanceShowcase"
        component={FinanceShowcase}
        durationInFrames={780}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="JensenHuang"
        component={JensenHuang}
        durationInFrames={390}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="HelloEffect"
        component={HelloEffect}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "剪辑小能手",
          subtitle: "Remotion 高级动效引擎",
        }}
      />
    </>
  );
};
