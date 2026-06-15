// 概念动效 #16 失败者vs分享者 - 同一个人，左灰暗"失败者"→右赭金"分享者"，视角切换
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { M, MF } from "./theme";
import { EASE, prog, pop } from "./anim";

export const FailerSharer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // 0-45 左侧灰暗失败者 → 45 切换 → 45+ 右侧赭金分享者
  const toShare = frame >= 50;
  const flash = interpolate(frame, [45, 50, 58], [0, 0.8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lp = prog(frame, 6, 16);
  const rp = pop(frame, 54, fps, 11, 0.6);

  return (
    <AbsoluteFill style={{ backgroundColor: M.bg0 }}>
      <div style={{ position: "absolute", top: 230, width: "100%", textAlign: "center",
        color: M.ink, fontFamily: MF.sans, fontWeight: 800, fontSize: 54, opacity: prog(frame, 0, 12) }}>
        同样讲亏损，看你站哪个视角
      </div>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {!toShare ? (
          <div style={{ textAlign: "center", opacity: lp, filter: "grayscale(1)" }}>
            <div style={{ width: 200, height: 200, borderRadius: "50%", background: M.dim, margin: "0 auto" }} />
            <div style={{ marginTop: 30, fontFamily: MF.sans, fontWeight: 900, fontSize: 80, color: M.dim }}>失败者</div>
            <div style={{ fontFamily: MF.sans, fontSize: 40, color: M.dim, marginTop: 10 }}>躲屋里复盘</div>
          </div>
        ) : (
          <div style={{ textAlign: "center", opacity: rp.opacity, transform: `scale(${rp.scale})` }}>
            <div style={{ width: 200, height: 200, borderRadius: "50%", background: M.gold, margin: "0 auto",
              boxShadow: `0 0 50px ${M.gold}88` }} />
            <div style={{ marginTop: 30, fontFamily: MF.sans, fontWeight: 900, fontSize: 80, color: M.gold }}>分享者</div>
            <div style={{ fontFamily: MF.sans, fontSize: 40, color: M.green, marginTop: 10 }}>讲给新人听</div>
          </div>
        )}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: M.paper, opacity: flash, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
