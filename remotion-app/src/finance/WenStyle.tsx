// 温义飞·急救财经 冲击型动效组件（竖屏 1080×1920）
// DNA：震波/故障/抖动入场 + 故障转场 + 竖排单字重音 + 左右摇晃 + 镂空花字
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, random } from "remotion";

const FONT = '"PingFang SC","Source Han Sans CN","Noto Sans SC",sans-serif';
export const WEN = {
  white: "#FFFFFF", yellow: "#FFD60A", red: "#FF3B30",
  bg: "#0E0E12", ink: "#111",
};

// 震波入场：scale 脉冲冲击
export const Quake: React.FC<{ delay?: number; children: React.ReactNode }> = ({ delay = 0, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 7, mass: 0.5, stiffness: 200 } });
  const sc = interpolate(s, [0, 1], [1.8, 1]);
  const o = interpolate(s, [0, 0.3, 1], [0, 1, 1]);
  return <div style={{ transform: `scale(${sc})`, opacity: o }}>{children}</div>;
};

// 故障：RGB分离 + 位移闪（入场或强调）
export const Glitch: React.FC<{ delay?: number; dur?: number; children: React.ReactNode }> =
({ delay = 0, dur = 18, children }) => {
  const frame = useCurrentFrame();
  const f = frame - delay;
  const active = f >= 0 && f < dur;
  const seed = Math.floor(f / 2);
  const dx = active ? (random(`gx${seed}`) - 0.5) * 30 : 0;
  const dy = active ? (random(`gy${seed}`) - 0.5) * 14 : 0;
  const split = active ? interpolate(f, [0, dur], [16, 0]) : 0;
  const o = interpolate(f, [0, 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "relative", transform: `translate(${dx}px,${dy}px)`, opacity: o }}>
      {split > 0 && (<>
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${-split}px)`, filter: "url(#none)", color: WEN.red, mixBlendMode: "screen", opacity: 0.7 }}>{children}</div>
        <div style={{ position: "absolute", inset: 0, transform: `translateX(${split}px)`, color: "#00E5FF", mixBlendMode: "screen", opacity: 0.7 }}>{children}</div>
      </>)}
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
};

// 轻微抖动：持续高频微抖
export const Shake: React.FC<{ amp?: number; children: React.ReactNode }> = ({ amp = 4, children }) => {
  const frame = useCurrentFrame();
  const dx = (random(`sx${Math.floor(frame / 2)}`) - 0.5) * amp;
  const dy = (random(`sy${Math.floor(frame / 2)}`) - 0.5) * amp;
  return <div style={{ transform: `translate(${dx}px,${dy}px)` }}>{children}</div>;
};

// 左右摇晃：慢速摆动
export const Sway: React.FC<{ deg?: number; children: React.ReactNode }> = ({ deg = 3, children }) => {
  const frame = useCurrentFrame();
  const r = Math.sin(frame / 14) * deg;
  return <div style={{ transform: `rotate(${r}deg)`, transformOrigin: "center bottom" }}>{children}</div>;
};

// 竖排单字重音（房/地/产 竖着排，逐字弹入）
export const VertWord: React.FC<{ text: string; color?: string; delay?: number; size?: number }> =
({ text, color = WEN.yellow, delay = 0, size = 150 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chars = [...text];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      {chars.map((c, i) => {
        const s = spring({ frame: frame - delay - i * 6, fps, config: { damping: 8, mass: 0.5 } });
        const sc = interpolate(s, [0, 1], [0, 1]);
        return (
          <span key={i} style={{
            fontFamily: FONT, fontWeight: 900, fontSize: size, color, lineHeight: 1,
            transform: `scale(${sc})`, display: "inline-block",
            textShadow: `0 0 30px ${color}, 0 6px 16px rgba(0,0,0,0.6)`,
            WebkitTextStroke: "3px rgba(0,0,0,0.5)",
          }}>{c}</span>
        );
      })}
    </div>
  );
};

// 镂空花字（白描边透明填充）
export const HollowText: React.FC<{ text: string; delay?: number; size?: number }> =
({ text, delay = 0, size = 90 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 14 } });
  const y = interpolate(s, [0, 1], [40, 0]);
  return (
    <div style={{
      fontFamily: FONT, fontWeight: 900, fontSize: size, letterSpacing: 4,
      color: "transparent", WebkitTextStroke: "4px #fff",
      transform: `translateY(${y}px)`, opacity: interpolate(s, [0, 1], [0, 1]),
      textShadow: "0 4px 16px rgba(0,0,0,0.5)",
    }}>{text}</div>
  );
};
