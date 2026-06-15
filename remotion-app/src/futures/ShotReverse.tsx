// 标志镜头 #11 箭头反转 - 慢放定格，绿色"空头平仓"箭头180°反转成金色"买入"上冲（反直觉）
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { F, FF } from "./theme";
import { EASE, prog, pop } from "./anim";

export const ShotReverse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cx = 540;

  // 阶段：0-30 绿箭头下行(空头平仓) → 30-55 慢放定格 → 55-90 翻转上冲变金
  // 子弹时间：用非线性进度，中段几乎停滞
  const slow = interpolate(frame, [30, 45, 70, 90], [0, 0.45, 0.55, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // 箭头旋转：0→180度（下→上），在 slow 0.45-0.55 的定格后翻
  const rot = interpolate(slow, [0, 0.45, 0.55, 1], [0, 0, 0, 180], { extrapolateRight: "clamp" });
  // 颜色：绿→金（翻转时变色）
  const colorMix = interpolate(slow, [0.5, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const arrowColor = colorMix < 0.5 ? F.green : F.gold;
  // 入场绿箭头
  const inP = prog(frame, 0, 16);
  const arrowY = interpolate(inP, [0, 1], [-100, 0]);
  // "反直觉"标震入
  const tagP = pop(frame, 60, fps, 8, 0.5);
  // 定格时画面轻微缩放聚焦
  const camZ = interpolate(slow, [0.4, 0.55], [1, 1.12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: F.bg0 }}>
      <div style={{ position: "absolute", top: 150, width: "100%", textAlign: "center", color: F.ink, fontFamily: FF.sans, fontWeight: 800, fontSize: 50, opacity: inP }}>
        推动价格上涨的，是谁？
      </div>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `scale(${camZ})` }}>
        {/* 箭头：用 SVG 三角+杆，整体 rotate */}
        <div style={{ transform: `translateY(${arrowY}px) rotate(${rot}deg)`, filter: `drop-shadow(0 0 40px ${arrowColor})` }}>
          <svg width={240} height={420} viewBox="0 0 240 420">
            <rect x={100} y={0} width={40} height={260} fill={arrowColor} />
            <polygon points="120,420 30,250 210,250" fill={arrowColor} />
          </svg>
        </div>
      </AbsoluteFill>
      {/* 标签：定格前"空头平仓"，翻转后"买入力量" */}
      <div style={{ position: "absolute", bottom: 620, width: "100%", textAlign: "center", fontFamily: FF.sans, fontWeight: 900, fontSize: 64,
        color: colorMix < 0.5 ? F.green : F.gold, opacity: colorMix < 0.5 ? interpolate(slow,[0,0.2],[0,1],{extrapolateRight:"clamp"}) : colorMix }}>
        {colorMix < 0.5 ? "空头平仓" : "其实是买入力量"}
      </div>
      {/* "反直觉"震入 */}
      <div style={{ position: "absolute", bottom: 440, width: "100%", textAlign: "center", fontFamily: FF.sans, fontWeight: 900, fontSize: 80,
        color: F.gold, opacity: tagP.opacity, transform: `scale(${interpolate(tagP.scale,[0,1],[2,1])})`, textShadow: `0 0 50px ${F.gold}` }}>
        反 · 直 · 觉
      </div>
    </AbsoluteFill>
  );
};
