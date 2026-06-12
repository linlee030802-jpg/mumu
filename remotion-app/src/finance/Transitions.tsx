// 转场手法 - 闪白 / 场景进出淡化缩放（消除硬切，学拉片报告STEP6）
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

// 闪白：幕切换瞬间一道白光扫过（叠在新场景开头）
export const FlashCut: React.FC<{ at?: number; dur?: number }> = ({ at = 0, dur = 10 }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [at, at + dur * 0.35, at + dur], [0, 0.85, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ background: "#FFF8E7", opacity: o, pointerEvents: "none" }} />;
};

// 场景进出包裹：开头淡入+轻微放大，结尾淡出，消除生硬切换
export const SceneWrap: React.FC<{
  dur: number; children: React.ReactNode; fade?: number;
}> = ({ dur, children, fade = 12 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame, [0, fade, dur - fade, dur], [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const scale = interpolate(frame, [0, fade], [1.04, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity, transform: `scale(${scale})` }}>
      {children}
    </AbsoluteFill>
  );
};
