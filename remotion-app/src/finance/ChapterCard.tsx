// 章节卡 - 超大序号滑入 + 主色块翻转
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT } from "./theme";

export const ChapterCard: React.FC<{
  num: string;   // "01"
  title: string; // "全球债务到顶"
  accent?: string;
}> = ({ num, title, accent = C.red }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14, mass: 0.8 } });
  const numX = interpolate(s, [0, 1], [-300, 0]);
  const titleS = spring({ frame: frame - 10, fps, config: { damping: 16 } });
  const titleO = interpolate(titleS, [0, 1], [0, 1]);
  const titleX = interpolate(titleS, [0, 1], [60, 0]);

  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column",
      justifyContent: "center", paddingLeft: 200,
    }}>
      <div style={{
        fontFamily: FONT.mono, fontWeight: 800, fontSize: 360,
        color: accent, lineHeight: 0.9,
        transform: `translateX(${numX}px)`,
        textShadow: `0 6px 18px ${accent}44`,
      }}>
        {num}
      </div>
      <div style={{
        fontFamily: FONT.sans, fontWeight: 700, fontSize: 88,
        color: C.ink, marginTop: 10,
        opacity: titleO, transform: `translateX(${titleX}px)`,
      }}>
        {title}
      </div>
    </div>
  );
};
