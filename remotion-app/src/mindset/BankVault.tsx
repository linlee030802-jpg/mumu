// 概念动效 #14 银行存款罐 - 稳稳的存款罐，"暂时取不出但不慌"（价值输出的底气）
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { M, MF } from "./theme";
import { EASE, prog, pop } from "./anim";

export const BankVault: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // 金币逐枚落入罐子（stagger），罐子稳稳不动
  const coins = [16, 30, 44, 58, 72];
  const tagP = pop(frame, 90, fps, 12, 0.6);

  return (
    <AbsoluteFill style={{ backgroundColor: M.bg0 }}>
      <div style={{ position: "absolute", top: 240, width: "100%", textAlign: "center",
        color: M.ink, fontFamily: MF.sans, fontWeight: 800, fontSize: 56, opacity: prog(frame, 0, 12) }}>
        你知道自己有价值
      </div>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ position: "relative", width: 420, height: 460 }}>
          {/* 罐身 */}
          <div style={{ position: "absolute", bottom: 0, left: 60, width: 300, height: 320, borderRadius: "40px 40px 60px 60px",
            background: M.green, opacity: 0.9, boxShadow: `0 0 50px ${M.green}55` }} />
          <div style={{ position: "absolute", bottom: 320, left: 100, width: 220, height: 40, borderRadius: 20, background: M.green }} />
          {/* 落币 */}
          {coins.map((st, i) => {
            const fall = interpolate(frame, [st, st + 14], [-300, 60 + i * 8], { easing: EASE.accel, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            if (frame < st) return null;
            return <div key={i} style={{ position: "absolute", left: 170 + (i % 3) * 30, top: fall, width: 56, height: 56,
              borderRadius: "50%", background: M.gold, boxShadow: `0 0 20px ${M.gold}` }} />;
          })}
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", bottom: 360, width: "100%", textAlign: "center",
        fontFamily: MF.sans, fontWeight: 900, fontSize: 64, color: M.gold,
        opacity: tagP.opacity, transform: `scale(${interpolate(tagP.scale, [0, 1], [1.4, 1])})` }}>
        暂时取不出，但不慌
      </div>
    </AbsoluteFill>
  );
};
