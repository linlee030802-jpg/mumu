import {
  AbsoluteFill,
  interpolate,
  spring,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const GREEN = "#76b900";

// 缓慢移动的光晕背景
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const shift = interpolate(frame, [0, durationInFrames], [0, 100]);
  const pulse = interpolate(
    Math.sin(frame / 25),
    [-1, 1],
    [0.45, 0.7]
  );
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${30 + shift / 6}% ${
          40 + shift / 12
        }%, rgba(118,185,0,${pulse * 0.25}) 0%, #0a0f0a 45%, #020402 100%)`,
      }}
    />
  );
};

// 顶部细线扫入
const TopLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grow = spring({ frame, fps, config: { damping: 20, mass: 0.6 } });
  const width = interpolate(grow, [0, 1], [0, 520]);
  return (
    <div
      style={{
        position: "absolute",
        top: 360,
        left: 220,
        height: 4,
        width,
        background: GREEN,
        boxShadow: `0 0 24px ${GREEN}`,
      }}
    />
  );
};

// 姓名：弹簧入场 + 缩放
const Name: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 13, mass: 0.9 } });
  const y = interpolate(s, [0, 1], [70, 0]);
  const scale = interpolate(s, [0, 1], [0.8, 1]);
  return (
    <div
      style={{
        position: "absolute",
        top: 220,
        left: 218,
        transform: `translateY(${y}px) scale(${scale})`,
        transformOrigin: "left center",
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: 120,
          fontWeight: 800,
          letterSpacing: 2,
          lineHeight: 1,
          textShadow: `0 16px 50px rgba(118,185,0,0.4)`,
        }}
      >
        黄仁勋
      </div>
      <div
        style={{
          color: "#8a8f88",
          fontSize: 40,
          fontWeight: 300,
          letterSpacing: 14,
          marginTop: 8,
        }}
      >
        JENSEN HUANG
      </div>
    </div>
  );
};

// 头衔：延迟淡入上浮
const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 18, fps, config: { damping: 18 } });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const y = interpolate(s, [0, 1], [24, 0]);
  return (
    <div
      style={{
        position: "absolute",
        top: 392,
        left: 222,
        color: GREEN,
        fontSize: 38,
        fontWeight: 600,
        letterSpacing: 4,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      NVIDIA 创始人 · 总裁兼 CEO
    </div>
  );
};

// 履历条目：依次滑入
const FactRow: React.FC<{ index: number; year: string; text: string }> = ({
  index,
  year,
  text,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - index * 8,
    fps,
    config: { damping: 16, mass: 0.7 },
  });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const x = interpolate(s, [0, 1], [-50, 0]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 28,
        opacity,
        transform: `translateX(${x}px)`,
        marginBottom: 26,
      }}
    >
      <span
        style={{
          color: GREEN,
          fontSize: 34,
          fontWeight: 700,
          width: 110,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {year}
      </span>
      <span style={{ color: "#e8eae6", fontSize: 34, fontWeight: 300 }}>
        {text}
      </span>
    </div>
  );
};

const FACTS = [
  { year: "1963", text: "生于台湾台南，幼年移居美国" },
  { year: "1993", text: "联合创办 NVIDIA，任 CEO 至今" },
  { year: "1999", text: "推出 GeForce 256，定义现代 GPU" },
  { year: "2006", text: "发布 CUDA，开启通用并行计算时代" },
  { year: "2023", text: "市值破万亿，AI 算力时代领军者" },
];

// 收尾标语
const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 20 } });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const scale = interpolate(s, [0, 1], [0.92, 1]);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          color: "white",
          fontSize: 66,
          fontWeight: 700,
          letterSpacing: 2,
          opacity,
          transform: `scale(${scale})`,
          textShadow: `0 0 40px ${GREEN}`,
          textAlign: "center",
        }}
      >
        “The more you buy,
        <br />
        the more you save.”
      </div>
    </AbsoluteFill>
  );
};

export const JensenHuang: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <Sequence from={0} durationInFrames={300}>
        <TopLine />
        <Name />
        <Title />
        <div style={{ position: "absolute", top: 470, left: 222 }}>
          {FACTS.map((f, i) => (
            <FactRow key={f.year} index={i} year={f.year} text={f.text} />
          ))}
        </div>
      </Sequence>
      <Sequence from={300} durationInFrames={90}>
        <Tagline />
      </Sequence>
    </AbsoluteFill>
  );
};
