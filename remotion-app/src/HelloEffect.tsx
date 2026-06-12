import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const HelloEffect: React.FC<{
  title: string;
  subtitle: string;
}> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // 标题：弹簧式入场 + 上浮
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [60, 0]);
  const titleScale = interpolate(titleSpring, [0, 1], [0.85, 1]);

  // 副标题：延迟入场淡入
  const subSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 18 },
  });
  const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);
  const subY = interpolate(subSpring, [0, 1], [30, 0]);

  // 背景：缓慢径向渐变呼吸
  const bgShift = interpolate(
    frame,
    [0, 150],
    [0, 40],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${50 + bgShift / 4}% 40%, #1e3a8a 0%, #0f172a 60%, #020617 100%)`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'PingFang SC', 'Helvetica Neue', sans-serif",
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: 130,
          fontWeight: 800,
          margin: 0,
          letterSpacing: 4,
          transform: `translateY(${titleY}px) scale(${titleScale})`,
          textShadow: "0 20px 60px rgba(59,130,246,0.5)",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          color: "#93c5fd",
          fontSize: 48,
          fontWeight: 400,
          marginTop: 24,
          letterSpacing: 8,
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
        }}
      >
        {subtitle}
      </p>
    </AbsoluteFill>
  );
};
