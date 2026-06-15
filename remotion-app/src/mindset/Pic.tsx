// 水彩图层 - 竖屏铺满 + 轻 Ken Burns + 米白渐隐边融入纸底
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from "remotion";
import { M, MF } from "./theme";

export const Pic: React.FC<{ src: string; dur: number; pan?: "in" | "out"; }> =
({ src, dur, pan = "in" }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, dur], [0, 1], { extrapolateRight: "clamp" });
  const z = 0.08;
  const scale = pan === "in" ? 1 + z * p : 1 + z * (1 - p);
  const o = interpolate(frame, [0, 12, dur - 12, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: M.bg0, opacity: o }}>
      <Img src={staticFile(`mindset/img/${src}`)}
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})` }} />
      {/* 底部纸色渐隐，字幕区 */}
      <AbsoluteFill style={{ background: `linear-gradient(180deg, transparent 60%, ${M.bg0} 96%)` }} />
    </AbsoluteFill>
  );
};

// 跟读字幕条（小Lin说密字幕风：纯白底墨字，敦实）
export const Sub: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame - delay, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", bottom: 240, width: "100%", textAlign: "center", opacity: o }}>
      <span style={{
        display: "inline-block", padding: "14px 36px", maxWidth: 900,
        background: M.paper, borderRadius: 14, color: M.ink,
        fontFamily: MF.sans, fontWeight: 800, fontSize: 52, lineHeight: 1.3,
        boxShadow: "0 6px 20px rgba(80,60,30,0.18)",
      }}>{text}</span>
    </div>
  );
};
