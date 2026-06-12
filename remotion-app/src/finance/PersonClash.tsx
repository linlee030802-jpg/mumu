// 双人物对撞 - 左右两个真人头像卡 spring 入场，中间警告火花
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

const Avatar: React.FC<{ photo: string; label: string; sub: string; side: -1 | 1; accent: string; delay: number }> =
({ photo, label, sub, side, accent, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 13, mass: 0.8 } });
  const x = interpolate(s, [0, 1], [side * 420, 0]);
  const o = interpolate(s, [0, 1], [0, 1]);
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 18,
      transform: `translateX(${x}px)`, opacity: o,
    }}>
      <div style={{
        width: 220, height: 220, borderRadius: "50%",
        border: `6px solid ${accent}`, overflow: "hidden",
        boxShadow: `0 14px 32px ${accent}55`,
      }}>
        <Img src={staticFile(`finance/people/${photo}`)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ fontFamily: FONT.sans, fontWeight: 800, fontSize: 44, color: C.ink }}>{label}</div>
      <div style={{ fontFamily: FONT.sans, fontSize: 26, color: C.dim }}>{sub}</div>
    </div>
  );
};

export const PersonClash: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sparkS = spring({ frame: frame - delay - 20, fps, config: { damping: 10 } });
  const sparkScale = interpolate(sparkS, [0, 1], [0, 1]);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 120, position: "relative" }}>
      <Avatar photo="gao.jpg" label="高志凯" sub="全球化智库副主任" side={-1} accent={C.red} delay={delay} />
      <div style={{
        position: "absolute", left: "50%", top: "30%", transform: `translateX(-50%) scale(${sparkScale})`,
        fontFamily: FONT.sans, fontWeight: 800, fontSize: 40, color: C.orange,
        background: C.paper, padding: "10px 22px", borderRadius: 30,
        border: `3px solid ${C.orange}`, whiteSpace: "nowrap",
        boxShadow: "0 8px 20px rgba(80,60,30,0.2)",
      }}>⚡ 同一个警告</div>
      <Avatar photo="rogers.jpg" label="吉姆·罗杰斯" sub="量子基金创始人 · 84岁" side={1} accent={C.blue} delay={delay + 8} />
    </div>
  );
};
