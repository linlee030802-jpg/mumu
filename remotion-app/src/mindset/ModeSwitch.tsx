// 概念动效 #11 网游→单机模式切换 - 多人对战图标切成单人打磨（"认输后切换模式"）
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { M, MF } from "./theme";
import { EASE, prog, pop } from "./anim";

export const ModeSwitch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // 0-50 网游模式(多人混战) → 50 切换闪 → 50+ 单机模式(一人打磨)
  const switched = frame >= 55;
  const flash = interpolate(frame, [50, 55, 62], [0, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: M.bg0 }}>
      <div style={{ position: "absolute", top: 240, width: "100%", textAlign: "center",
        color: M.ink, fontFamily: MF.sans, fontWeight: 800, fontSize: 56, opacity: prog(frame, 0, 12) }}>
        {switched ? "单机模式：盯自己的系统" : "网游模式：和全市场博弈"}
      </div>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {!switched ? (
          // 网游：多个小人混战，红绿交错
          <div style={{ position: "relative", width: 700, height: 500 }}>
            {Array.from({ length: 9 }, (_, i) => {
              const ang = (i / 9) * Math.PI * 2;
              const r = 180 + (i % 3) * 30;
              const x = 350 + Math.cos(ang + frame / 20) * r;
              const y = 250 + Math.sin(ang + frame / 20) * r * 0.7;
              const col = i % 2 ? M.red : M.green;
              return <div key={i} style={{ position: "absolute", left: x, top: y, width: 50, height: 50,
                borderRadius: "50%", background: col, opacity: 0.8 }} />;
            })}
          </div>
        ) : (
          // 单机：一个人专注打磨剑
          (() => {
            const p = pop(frame, 58, fps, 12, 0.6);
            return (
              <div style={{ transform: `scale(${p.scale})`, opacity: p.opacity, textAlign: "center" }}>
                <div style={{ width: 160, height: 160, borderRadius: "50%", background: M.green, margin: "0 auto",
                  boxShadow: `0 0 50px ${M.green}88` }} />
                <div style={{ marginTop: 30, fontFamily: MF.sans, fontWeight: 900, fontSize: 64, color: M.gold }}>
                  慢慢打磨
                </div>
              </div>
            );
          })()
        )}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: M.paper, opacity: flash, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
