// 概念动效 #21 筛子筛词 - 筛子把"幻想/浮躁/错误"筛掉落下，筛网下留种子发芽
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { M, MF } from "./theme";
import { EASE, prog, pop } from "./anim";

const DROP = ["不切实际的幻想", "浮躁侥幸的心态", "错误的交易习惯"];

export const Sieve: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // 三词逐个被筛掉(加速坠落消失)，最后种子发芽pop
  const sproutP = pop(frame, 110, fps, 11, 0.6);

  return (
    <AbsoluteFill style={{ backgroundColor: M.bg0 }}>
      <div style={{ position: "absolute", top: 180, width: "100%", textAlign: "center",
        color: M.ink, fontFamily: MF.sans, fontWeight: 800, fontSize: 56, opacity: prog(frame, 0, 12) }}>
        低谷是来帮你筛选的
      </div>
      {/* 筛子（半透明网格碗） */}
      <div style={{ position: "absolute", top: 360, left: "50%", transform: "translateX(-50%)",
        width: 520, height: 200, borderRadius: "0 0 260px 260px", border: `8px solid ${M.dim}`,
        borderTop: `8px solid ${M.gold}`, opacity: 0.6,
        backgroundImage: `repeating-linear-gradient(90deg, ${M.dim}44 0 4px, transparent 4px 22px)` }} />
      {/* 三个被筛掉的词 */}
      {DROP.map((w, i) => {
        const start = 18 + i * 26;
        const fall = interpolate(frame, [start, start + 30], [420, 1500], { easing: EASE.accel, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const o = interpolate(frame, [start, start + 8, start + 26, start + 30], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={i} style={{ position: "absolute", top: fall, width: "100%", textAlign: "center", opacity: o }}>
            <span style={{ fontFamily: MF.sans, fontWeight: 800, fontSize: 60, color: M.red,
              background: M.paper, padding: "8px 30px", borderRadius: 12 }}>{w}</span>
          </div>
        );
      })}
      {/* 筛网下种子发芽 */}
      <div style={{ position: "absolute", bottom: 380, width: "100%", textAlign: "center",
        opacity: sproutP.opacity, transform: `scale(${sproutP.scale})` }}>
        <div style={{ fontSize: 120 }}>🌱</div>
        <div style={{ fontFamily: MF.sans, fontWeight: 900, fontSize: 56, color: M.green, marginTop: 10 }}>
          赚钱的系统，自然长出来
        </div>
      </div>
    </AbsoluteFill>
  );
};
