// 片尾素材鸣谢 - CC 署名 + 数据来源（使用 CC BY-SA 真人照的法律义务）
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "./theme";

const LINES = [
  "素材鸣谢 · CREDITS",
  "",
  "人物照片：",
  "高志凯 © Horasis (CC BY-SA 2.0)",
  "Jim Rogers © Fernando Diaz Villanueva (CC BY-SA 3.0)",
  "经 Wikimedia Commons 取得",
  "",
  "实拍视频：Pexels（免费商用授权）",
  "数据来源：欧洲央行年度报告、美国财政部公开数据",
];

export const Credits: React.FC = () => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 18, 100, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ backgroundColor: "#0E0A05", justifyContent: "center", alignItems: "center" }}>
      <div style={{ opacity: o, textAlign: "center" }}>
        {LINES.map((l, i) => (
          <div key={i} style={{
            fontFamily: FONT.sans,
            fontSize: i === 0 ? 38 : 26,
            fontWeight: i === 0 ? 800 : 500,
            color: i === 0 ? C.gold : "#C8BCA6",
            letterSpacing: i === 0 ? 4 : 1,
            lineHeight: 2,
            marginBottom: i === 0 ? 16 : 0,
          }}>{l || " "}</div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
