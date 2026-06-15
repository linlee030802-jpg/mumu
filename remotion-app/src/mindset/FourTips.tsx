// 概念动效 #19 四方法清单 - 晒太阳/坐直/走路/睡眠 四图标 stagger 点亮
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { M, MF } from "./theme";
import { prog, pop } from "./anim";

const ITEMS = [
  { icon: "☀", label: "晒太阳" },
  { icon: "🪑", label: "坐直" },
  { icon: "🚶", label: "走一走" },
  { icon: "😴", label: "睡好觉" },
];

export const FourTips: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: M.bg0 }}>
      <div style={{ position: "absolute", top: 280, width: "100%", textAlign: "center",
        color: M.ink, fontFamily: MF.sans, fontWeight: 900, fontSize: 64, opacity: prog(frame, 0, 14) }}>
        给身体充能
      </div>
      <div style={{ position: "absolute", top: 380, width: "100%", textAlign: "center",
        color: M.green, fontFamily: MF.sans, fontWeight: 700, fontSize: 40, opacity: prog(frame, 12, 14) }}>
        简单到离谱，坚持一周就有效
      </div>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 40, paddingTop: 120 }}>
        {ITEMS.map((it, i) => {
          const p = pop(frame, 30 + i * 12, fps, 12, 0.6);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 36,
              background: M.paper, padding: "20px 50px", borderRadius: 20, width: 620,
              opacity: p.opacity, transform: `scale(${p.scale})`,
              boxShadow: "0 8px 24px rgba(80,60,30,0.15)", border: `3px solid ${M.green}` }}>
              <span style={{ fontSize: 80 }}>{it.icon}</span>
              <span style={{ fontFamily: MF.sans, fontWeight: 900, fontSize: 64, color: M.ink }}>{it.label}</span>
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
