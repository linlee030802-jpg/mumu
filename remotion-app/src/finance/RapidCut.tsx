// 快剪轮播 - 一组画面层按固定节奏(90-120帧)依次切换，制造3-4秒/切的律动
// 用法：把一个长镜头的多个画面塞进来，自动切碎
import { AbsoluteFill, Series } from "remotion";
import { FlashCut } from "./Transitions";

export const RapidCut: React.FC<{
  shots: { node: React.ReactNode; dur: number }[];
  flash?: boolean;   // 切换是否闪白
}> = ({ shots, flash = true }) => {
  return (
    <Series>
      {shots.map((s, i) => (
        <Series.Sequence key={i} durationInFrames={s.dur}>
          <AbsoluteFill>
            {s.node}
            {flash && i > 0 && <FlashCut at={0} dur={8} />}
          </AbsoluteFill>
        </Series.Sequence>
      ))}
    </Series>
  );
};
