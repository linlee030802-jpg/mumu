// 标志镜头 #7 阶梯崩落 - 金色价格球沿台阶逐级加速坠落，每级砸出红色冲击波
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { F, FF } from "./theme";
import { EASE, impact, prog } from "./anim";

const STEPS = 5;           // 5级台阶
const STEP_W = 150, STEP_H = 130;
const x0 = 240, y0 = 480;  // 第一级左上

export const ShotStairs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 球逐级下落：每级 16 帧，第 i 级在 [start+i*16, +16]
  const startFall = 20;
  const perStep = 16;
  // 当前球位置
  let stepIdx = Math.min(STEPS - 1, Math.floor((frame - startFall) / perStep));
  if (frame < startFall) stepIdx = 0;
  const localF = (frame - startFall) - stepIdx * perStep;
  const lp = interpolate(localF, [0, perStep], [0, 1], { easing: EASE.accel, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // 从第 stepIdx 级落到 stepIdx+1 级
  const curX = x0 + (stepIdx + lp) * STEP_W + 30;
  const curY = y0 + (stepIdx + lp) * STEP_H - 60;
  // 每级落地帧 → 冲击波
  const hitFrames = Array.from({ length: STEPS }, (_, i) => startFall + (i + 1) * perStep);

  return (
    <AbsoluteFill style={{ backgroundColor: F.bg0 }}>
      {/* 标题 */}
      <div style={{ position: "absolute", top: 140, width: "100%", textAlign: "center", color: F.ink, fontFamily: FF.sans, fontWeight: 800, fontSize: 52, opacity: prog(frame, 0, 16) }}>
        接不住，就往下一个档位砸
      </div>
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute" }}>
        {/* 台阶 */}
        {Array.from({ length: STEPS }, (_, i) => {
          const sx = x0 + i * STEP_W, sy = y0 + i * STEP_H;
          const lit = frame >= hitFrames[i];
          return (
            <g key={i}>
              <rect x={sx} y={sy} width={STEP_W + 60} height={12} rx={6}
                fill={lit ? F.gold : F.dim} opacity={lit ? 0.9 : 0.3}
                style={{ filter: lit ? `drop-shadow(0 0 16px ${F.gold})` : "none" }} />
              {/* 档位标 */}
              <text x={sx + STEP_W + 80} y={sy + 14} fill={lit ? F.red : F.dim} fontFamily={FF.mono} fontWeight="700" fontSize="34" opacity={lit ? 1 : 0.4}>
                -{(i + 1) * 2}%
              </text>
            </g>
          );
        })}
        {/* 各级冲击波 */}
        {hitFrames.map((hf, i) => {
          const im = impact(frame, hf, 180, 14);
          if (im.opacity <= 0) return null;
          const sx = x0 + (i + 1) * STEP_W + 30, sy = y0 + (i + 1) * STEP_H - 50;
          return <circle key={i} cx={sx} cy={sy} r={im.radius} fill="none" stroke={F.red} strokeWidth={4} opacity={im.opacity} />;
        })}
        {/* 价格球 */}
        <circle cx={curX} cy={curY} r={42} fill={F.gold} style={{ filter: `drop-shadow(0 0 30px ${F.gold})` }} />
        <text x={curX} y={curY + 10} textAnchor="middle" fill={F.bg0} fontFamily={FF.sans} fontWeight="900" fontSize="34">价</text>
      </svg>
    </AbsoluteFill>
  );
};
