import { Composition } from "remotion";
import { HelloEffect } from "./HelloEffect";
import { JensenHuang } from "./JensenHuang";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
