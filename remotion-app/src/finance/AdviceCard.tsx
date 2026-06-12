// 建议卡 - 大序号 + 标题 + 要点，翻牌入场
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

export const AdviceCard: React.FC<{
  num: string;          // "一"
  title: string;        // "留现金"
  points: string[];
  accent?: string;
  delay?: number;
}> = ({ num, title, points, accent = C.teal, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const s = spring({ frame: f, fps, config: { damping: 13, mass: 0.7 } });
  const rot = interpolate(s, [0, 1], [-80, 0]);
  const o = interpolate(s, [0, 1], [0, 1]);

  return (
    <div style={{
      width: 1000, padding: "56px 70px",
      background: C.paper, borderRadius: 24,
      border: `4px solid ${accent}`,
      boxShadow: "0 20px 44px rgba(80,60,30,0.2)",
      transform: `perspective(1200px) rotateY(${rot}deg)`,
      opacity: o,
      display: "flex", alignItems: "center", gap: 50,
    }}>
      <div style={{
        minWidth: 160, height: 160, borderRadius: 28,
        background: accent, color: C.paper,
        display: "flex", justifyContent: "center", alignItems: "center",
        fontFamily: FONT.sans, fontWeight: 800, fontSize: 96,
        boxShadow: `0 10px 24px ${accent}66`,
      }}>{num}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 64, color: C.ink, marginBottom: 18 }}>
          {title}
        </div>
        {points.map((p, i) => {
          const ps = spring({ frame: f - 16 - i * 10, fps, config: { damping: 16 } });
          const po = interpolate(ps, [0, 1], [0, 1]);
          const px = interpolate(ps, [0, 1], [40, 0]);
          return (
            <div key={i} style={{
              fontFamily: FONT.sans, fontSize: 34, color: C.dim, lineHeight: 1.5,
              opacity: po, transform: `translateX(${px}px)`, marginBottom: 8,
            }}>· {p}</div>
          );
        })}
      </div>
    </div>
  );
};
