// 真实实拍视频底层 - 静音 + 循环 + cover铺满 + 暖金压色暗角 + 缓推 + 进出淡化
import { AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from "remotion";

export const RealVideo: React.FC<{
  src: string;            // realvid 下文件名
  dur: number;            // 该镜总帧数
  fadeIn?: number;
  fadeOut?: number;
  dim?: number;           // 压暗强度
  zoom?: number;          // 缓推幅度
}> = ({ src, dur, fadeIn = 14, fadeOut = 14, dim = 0.34, zoom = 0.08 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, dur], [0, 1], { extrapolateRight: "clamp" });
  const scale = 1 + zoom * p;
  const opacity = interpolate(
    frame, [0, fadeIn, dur - fadeOut, dur], [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  return (
    <AbsoluteFill style={{ opacity, overflow: "hidden", backgroundColor: "#000" }}>
      <OffthreadVideo
        src={staticFile(`finance/realvid/${src}`)}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover",
          transform: `scale(${scale})` }}
      />
      {/* 暖金压色 */}
      <AbsoluteFill style={{
        background: `linear-gradient(180deg, rgba(40,28,10,${dim * 0.6}) 0%, transparent 30%, transparent 58%, rgba(30,20,8,${dim}) 100%)`,
      }} />
      {/* 暗角 */}
      <AbsoluteFill style={{ boxShadow: "inset 0 0 320px rgba(20,12,4,0.7)" }} />
    </AbsoluteFill>
  );
};
