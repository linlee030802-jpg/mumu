// 信息卡 - 标题 + 多条要点 stagger 逐条滑入（高志凯 / 罗杰斯），可配真人头像
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

export const InfoCard: React.FC<{
  name: string;
  title: string;       // 头衔
  points: string[];    // 标志言论/履历
  accent?: string;
  delay?: number;
  photo?: string;      // public/finance/people 下文件名
}> = ({ name, title, points, accent = C.red, delay = 0, photo }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const cardS = spring({ frame: f, fps, config: { damping: 15, mass: 0.8 } });
  const cardO = interpolate(cardS, [0, 1], [0, 1]);
  const cardX = interpolate(cardS, [0, 1], [-80, 0]);

  return (
    <div style={{
      width: 880, padding: "48px 56px",
      background: C.paper, borderRadius: 18,
      border: `3px solid ${accent}`,
      boxShadow: "0 18px 40px rgba(80,60,30,0.18)",
      opacity: cardO, transform: `translateX(${cardX}px)`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 28, marginBottom: 24 }}>
        {photo && (
          <div style={{
            width: 130, height: 130, borderRadius: "50%", overflow: "hidden",
            border: `4px solid ${accent}`, flexShrink: 0,
            boxShadow: `0 8px 20px ${accent}44`,
          }}>
            <Img src={staticFile(`finance/people/${photo}`)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 60, color: C.ink }}>
              {name}
            </span>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: accent, display: "inline-block" }} />
          </div>
          <div style={{ fontFamily: FONT.sans, fontSize: 30, color: accent, fontWeight: 700, marginTop: 4 }}>
            {title}
          </div>
        </div>
      </div>
      {points.map((p, i) => {
        const ps = spring({ frame: f - 14 - i * 12, fps, config: { damping: 16 } });
        const po = interpolate(ps, [0, 1], [0, 1]);
        const px = interpolate(ps, [0, 1], [50, 0]);
        return (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 18,
            opacity: po, transform: `translateX(${px}px)`,
          }}>
            <span style={{
              minWidth: 34, height: 34, borderRadius: "50%", background: accent,
              color: C.paper, fontFamily: FONT.mono, fontWeight: 800, fontSize: 20,
              display: "flex", justifyContent: "center", alignItems: "center", marginTop: 4,
            }}>{i + 1}</span>
            <span style={{ fontFamily: FONT.sans, fontSize: 32, color: C.ink, lineHeight: 1.4 }}>
              {p}
            </span>
          </div>
        );
      })}
    </div>
  );
};
