// 概念动效 #4 台阶跃升 - 五级台阶逐级点亮，小人跃上最高级（"认知上台阶"）
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { M, MF } from "./theme";
import { EASE, prog, pop } from "./anim";

export const StepRise: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const N = 5;
  const baseX = 280, baseY = 1400, sw = 110, sh = 110;

  // 小人逐级跳：每级18帧
  const start = 14, per = 18;
  let idx = Math.max(0, Math.min(N - 1, Math.floor((frame - start) / per)));
  const lf = (frame - start) - idx * per;
  const jp = interpolate(lf, [0, per], [0, 1], { easing: EASE.decel, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // 当前级到下一级（带跳跃弧线）
  const fromX = baseX + idx * sw, fromY = baseY - idx * sh;
  const toX = baseX + (idx + 1) * sw, toY = baseY - (idx + 1) * sh;
  const manX = fromX + (toX - fromX) * jp;
  const arc = Math.sin(jp * Math.PI) * 70; // 跳跃弧
  const manY = (fromY + (toY - fromY) * jp) - arc - 70;

  return (
    <AbsoluteFill style={{ backgroundColor: M.bg0 }}>
      <div style={{ position: "absolute", top: 220, width: "100%", textAlign: "center",
        color: M.ink, fontFamily: MF.sans, fontWeight: 800, fontSize: 60, opacity: prog(frame, 0, 14) }}>
        熬过去，认知上一个台阶
      </div>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        {Array.from({ length: N }, (_, i) => {
          const x = baseX + i * sw, y = baseY - i * sh;
          const litFrame = start + i * per;
          const p = pop(frame, litFrame, fps, 12, 0.6);
          const lit = frame >= litFrame;
          return (
            <g key={i}>
              <rect x={x} y={y} width={sw + 40} height={sh} rx={8}
                fill={lit ? M.green : M.dim} opacity={lit ? 0.85 : 0.25}
                transform={`scale(${lit ? p.scale : 1})`} style={{ transformOrigin: `${x}px ${y}px` }} />
            </g>
          );
        })}
        {/* 小人（圆头+身体简笔） */}
        <g transform={`translate(${manX + 50}, ${manY})`}>
          <circle cx={0} cy={-30} r={22} fill={M.red} />
          <rect x={-14} y={-8} width={28} height={44} rx={10} fill={M.red} />
        </g>
      </svg>
    </AbsoluteFill>
  );
};
