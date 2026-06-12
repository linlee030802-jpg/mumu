// 标题逐字浮现 - 开场标题 / 结尾金句
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

export const TitleReveal: React.FC<{
  text: string;
  size?: number;
  color?: string;
  underline?: boolean;
  perChar?: number;
}> = ({ text, size = 92, color = C.ink, underline = false, perChar = 2.5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chars = [...text];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {chars.map((ch, i) => {
          const s = spring({
            frame: frame - i * perChar,
            fps,
            config: { damping: 14, mass: 0.6 },
          });
          const o = interpolate(s, [0, 1], [0, 1]);
          const y = interpolate(s, [0, 1], [40, 0]);
          return (
            <span key={i} style={{
              fontFamily: FONT.sans, fontWeight: 800, fontSize: size,
              color, opacity: o, transform: `translateY(${y}px)`,
              display: "inline-block", whiteSpace: "pre",
              textShadow: `0 2px 6px rgba(80,60,30,0.18)`,
            }}>
              {ch}
            </span>
          );
        })}
      </div>
      {underline && (() => {
        const u = spring({ frame: frame - chars.length * perChar, fps, config: { damping: 20 } });
        const w = interpolate(u, [0, 1], [0, size * chars.length * 0.6]);
        return <div style={{ height: 5, width: w, background: C.gold, boxShadow: `0 0 16px ${C.gold}` }} />;
      })()}
    </div>
  );
};

// 全程铺底的水彩纸质暖底 + 漂浮晕染色斑
export const FinanceBG: React.FC<{ accent?: string }> = ({ accent = C.red }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const shift = interpolate(frame, [0, durationInFrames], [0, 60]);
  const f1x = 22 + Math.sin(frame / 90) * 6;
  const f2x = 78 + Math.cos(frame / 110) * 6;
  return (
    <>
      {/* 米白纸底 */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at 50% 40%, ${C.paper} 0%, ${C.bg0} 55%, ${C.bg1} 100%)`,
      }} />
      {/* 两团水彩晕染随时间游移 */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.5,
        background: `radial-gradient(420px circle at ${f1x}% ${30 + shift / 6}%, ${accent}1f 0%, transparent 60%),
                     radial-gradient(480px circle at ${f2x}% ${72 - shift / 8}%, ${C.gold}1c 0%, transparent 62%)`,
      }} />
      {/* 极淡纸纹网格 */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.6,
        backgroundImage: `linear-gradient(${C.grid} 1px, transparent 1px), linear-gradient(90deg, ${C.grid} 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
      }} />
    </>
  );
};
