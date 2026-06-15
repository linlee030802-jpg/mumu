// 电影级 B-roll 底层 - 全屏写实图 + Ken Burns 运镜 + 暗角 + 进出淡入
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

type Pan = "in" | "out" | "left" | "right" | "up";
type Focus = "wide" | "center" | "closeup" | "top" | "bottom";

export const BRoll: React.FC<{
  src: string;            // broll 下文件名，如 "br03.png"
  dur: number;            // 该镜总帧数（用于结尾淡出计算）
  pan?: Pan;              // 运镜方向
  fadeIn?: number;        // 淡入帧
  fadeOut?: number;       // 淡出帧
  dim?: number;           // 压暗强度 0-1（给叠加文字留对比）
  zoom?: number;          // 缩放幅度
  punch?: boolean;        // 入场冲击放大回弹
  focus?: Focus;          // 景别：同图切不同视角（全景/居中/特写/上/下）
}> = ({ src, dur, pan = "in", fadeIn = 14, fadeOut = 14, dim = 0.32, zoom = 0.12, punch = true, focus = "wide" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame, [0, dur], [0, 1], { extrapolateRight: "clamp" });

  // 景别基准缩放与焦点
  const focusMap: Record<Focus, { base: number; ox: number; oy: number }> = {
    wide: { base: 1, ox: 0, oy: 0 },
    center: { base: 1.3, ox: 0, oy: 0 },
    closeup: { base: 1.7, ox: 0, oy: 0 },
    top: { base: 1.4, ox: 0, oy: -90 },
    bottom: { base: 1.4, ox: 0, oy: 90 },
  };
  const fc = focusMap[focus];

  // Ken Burns
  let scale = fc.base, tx = fc.ox, ty = fc.oy;
  const z = zoom;
  if (pan === "in") scale = fc.base + z * p;
  else if (pan === "out") scale = fc.base + z * (1 - p);
  else if (pan === "left") { scale = fc.base + z; tx = fc.ox + interpolate(p, [0, 1], [z * 60, -z * 60]); }
  else if (pan === "right") { scale = fc.base + z; tx = fc.ox + interpolate(p, [0, 1], [-z * 60, z * 60]); }
  else if (pan === "up") { scale = fc.base + z; ty = fc.oy + interpolate(p, [0, 1], [z * 60, -z * 60]); }

  // 入场冲击：快速放大回弹（叠在 Ken Burns 之上）
  const punchS = punch ? spring({ frame, fps, config: { damping: 11, mass: 0.5 } }) : 1;
  const punchScale = punch ? interpolate(punchS, [0, 1], [1.12, 1]) : 1;
  scale *= punchScale;

  const opacity = interpolate(
    frame,
    [0, fadeIn, dur - fadeOut, dur],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ opacity, overflow: "hidden" }}>
      <Img
        src={staticFile(`finance/broll/${src}`)}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: `scale(${scale}) translate(${tx}px, ${ty}px)`,
        }}
      />
      {/* 暖金压色 */}
      <AbsoluteFill style={{
        background: `linear-gradient(180deg, rgba(40,28,10,${dim * 0.6}) 0%, transparent 30%, transparent 60%, rgba(30,20,8,${dim}) 100%)`,
      }} />
      {/* 暗角 */}
      <AbsoluteFill style={{
        boxShadow: "inset 0 0 320px rgba(20,12,4,0.7)",
      }} />
    </AbsoluteFill>
  );
};

// 底部电影字幕条
export const SubBar: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <div style={{
      position: "absolute", bottom: 70, width: "100%", textAlign: "center", opacity: o,
    }}>
      <span style={{
        display: "inline-block", padding: "12px 36px",
        background: "rgba(20,14,6,0.55)", borderRadius: 8,
        color: "#FCEFC7", fontSize: 40, fontWeight: 700, letterSpacing: 2,
        fontFamily: '"PingFang SC","Noto Sans SC",sans-serif',
        textShadow: "0 2px 8px rgba(0,0,0,0.6)",
        borderLeft: "4px solid #D4A017", borderRight: "4px solid #D4A017",
      }}>{text}</span>
    </div>
  );
};
