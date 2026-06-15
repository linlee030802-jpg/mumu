// 多画面快剪 B-roll - 一组图/视频按~100帧节奏自动切换，配统一字幕条
// 把长镜头喂进来自动切成 3-4秒/段，解决节奏单调
import { AbsoluteFill, Series } from "remotion";
import { BRoll, SubBar } from "./BRoll";
import { RealVideo } from "./RealVideo";
import { FlashCut } from "./Transitions";

type Clip =
  | { type: "img"; src: string; pan?: any; focus?: any; dim?: number }
  | { type: "vid"; src: string; dim?: number };

export const MultiBRoll: React.FC<{
  clips: Clip[];
  seg: number;        // 每段帧数（默认105≈3.5秒）
  total: number;      // 该镜总帧数
  sub?: string;       // 贯穿字幕
  subSwitch?: string[]; // 各段分别的字幕（覆盖 sub）
}> = ({ clips, seg, total, sub, subSwitch }) => {
  // 按 total 和 seg 算每段时长，末段补足
  const n = clips.length;
  const each = Math.floor(total / n);
  return (
    <AbsoluteFill>
      <Series>
        {clips.map((c, i) => {
          const d = i === n - 1 ? total - each * (n - 1) : each;
          return (
            <Series.Sequence key={i} durationInFrames={d}>
              <AbsoluteFill>
                {c.type === "img" ? (
                  <BRoll src={c.src} dur={d} pan={c.pan ?? "in"} focus={c.focus ?? "wide"} dim={c.dim ?? 0.4} />
                ) : (
                  <RealVideo src={c.src} dur={d} dim={c.dim ?? 0.4} />
                )}
                {i > 0 && <FlashCut at={0} dur={8} />}
                {subSwitch && subSwitch[i] && <SubBar text={subSwitch[i]} delay={6} />}
              </AbsoluteFill>
            </Series.Sequence>
          );
        })}
      </Series>
      {sub && !subSwitch && <SubBar text={sub} delay={10} />}
    </AbsoluteFill>
  );
};
