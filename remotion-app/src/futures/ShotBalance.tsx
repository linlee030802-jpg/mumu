// 标志镜头 #2 永恒水平天平 - 砸再多筹码横梁绝对水平（反常识立"物理定律"）
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { F, FF } from "./theme";
import { pop, tension, EASE, prog } from "./anim";

export const ShotBalance: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cx = 540, beamY = 760, arm = 360;
  // 筹码分批砸下（红左绿右），每次砸落画面微抖，但横梁纹丝不动
  const drops = [30, 70, 110, 150];
  const wob = tension(frame, 1.2, 10); // 横梁极微颤，强调"撑住"
  // 标语
  const tagP = prog(frame, 165, 20, EASE.pop);

  const Chip: React.FC<{ side: -1 | 1; idx: number; color: string }> = ({ side, idx, color }) => {
    const start = drops[idx];
    const p = pop(frame, start, fps, 9, 0.7);
    if (frame < start) return null;
    const fall = interpolate(frame, [start, start + 8], [-220, 0], { easing: EASE.accel, extrapolateRight: "clamp" });
    const x = cx + side * (arm - 30) - 60;
    const y = beamY - 70 - idx * 46 + fall;
    return (
      <div style={{
        position: "absolute", left: x, top: y, width: 120, height: 40, borderRadius: 8,
        background: color, opacity: p.opacity, transform: `scaleY(${p.scale})`,
        boxShadow: `0 0 24px ${color}`,
      }} />
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: F.bg0 }}>
      {/* 立柱 */}
      <div style={{ position: "absolute", left: cx - 5, top: beamY, width: 10, height: 360, background: F.dim, opacity: 0.5 }} />
      {/* 横梁（绝对水平，仅极微颤） */}
      <div style={{
        position: "absolute", left: cx - arm, top: beamY - 4,
        width: arm * 2, height: 8, background: F.gold, borderRadius: 4,
        transform: `rotate(${wob * 0.15}deg)`, transformOrigin: "center",
        boxShadow: `0 0 30px ${F.gold}`,
      }} />
      <div style={{ position: "absolute", left: cx - 14, top: beamY - 14, width: 28, height: 28, borderRadius: "50%", background: F.gold }} />
      {/* 筹码堆 */}
      {drops.map((_, i) => <Chip key={`r${i}`} side={-1} idx={i} color={F.red} />)}
      {drops.map((_, i) => <Chip key={`g${i}`} side={1} idx={i} color={F.green} />)}
      {/* 两端标签 */}
      <div style={{ position: "absolute", left: cx - arm - 40, top: beamY + 30, width: 160, textAlign: "center", color: F.red, fontFamily: FF.sans, fontWeight: 800, fontSize: 44 }}>多单</div>
      <div style={{ position: "absolute", left: cx + arm - 120, top: beamY + 30, width: 160, textAlign: "center", color: F.green, fontFamily: FF.sans, fontWeight: 800, fontSize: 44 }}>空单</div>
      {/* 标语 */}
      <div style={{
        position: "absolute", top: 280, width: "100%", textAlign: "center",
        color: F.ink, fontFamily: FF.sans, fontWeight: 900, fontSize: 72,
        opacity: tagP, transform: `scale(${interpolate(tagP, [0, 1], [1.3, 1])})`,
        textShadow: `0 0 40px ${F.gold}88`,
      }}>这不是规律</div>
      <div style={{
        position: "absolute", top: 380, width: "100%", textAlign: "center",
        color: F.gold, fontFamily: FF.sans, fontWeight: 900, fontSize: 88,
        opacity: tagP, textShadow: `0 0 50px ${F.gold}`,
      }}>是物理定律</div>
    </AbsoluteFill>
  );
};
