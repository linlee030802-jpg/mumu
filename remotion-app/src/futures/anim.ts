// 动效工具库 - 封装 motion-craft 的缓动/物理/stagger（黑金红绿片复用）
import { Easing, interpolate, spring as rspring } from "remotion";

// 三条权威缓动曲线（来自官方 timing.md）
export const EASE = {
  enter: Easing.bezier(0.16, 1, 0.3, 1),      // 干脆入场，强ease-out不过冲
  editorial: Easing.bezier(0.45, 0, 0.55, 1), // 金句/留白，平衡ease-in-out
  pop: Easing.bezier(0.34, 1.56, 0.64, 1),    // 过冲强调，少用
  accel: Easing.in(Easing.cubic),             // 加速坠落/退场
  decel: Easing.out(Easing.cubic),            // 减速到位
};

// 归一化进度（timing与mapping分离的地基）
export const prog = (frame: number, start: number, dur: number, easing = EASE.enter) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    easing, extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

// 入场：滑动+淡入+模糊→清晰（带物理质感）
export const enterSlide = (frame: number, start: number, dur = 18, dist = 70) => {
  const p = prog(frame, start, dur);
  return {
    opacity: p,
    transform: `translateY(${interpolate(p, [0, 1], [dist, 0])}px)`,
    filter: `blur(${interpolate(p, [0, 1], [10, 0])}px)`,
  };
};

// spring 过冲（砸入/弹出，damping小=Q弹）
export const pop = (frame: number, start: number, fps: number, damping = 10, mass = 0.6) => {
  const s = rspring({ frame: frame - start, fps, config: { damping, mass } });
  return { scale: s, opacity: interpolate(s, [0, 0.4, 1], [0, 1, 1]) };
};

// 加速坠落（重物下落，越来越快）
export const drop = (frame: number, start: number, dur: number, fromY: number, toY = 0) =>
  interpolate(frame, [start, start + dur], [fromY, toY], {
    easing: EASE.accel, extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

// 冲击波（砸击后扩散衰减）：返回 {radius, opacity, shake}
export const impact = (frame: number, hitFrame: number, maxR = 400, life = 16) => {
  const active = frame >= hitFrame;
  const t = active ? Math.min(1, (frame - hitFrame) / life) : 0;
  const decay = active ? Math.max(0, 1 - (frame - hitFrame) / 10) : 0;
  return {
    radius: interpolate(t, [0, 1], [0, maxR]),
    opacity: active ? interpolate(t, [0, 1], [0.6, 0]) : 0,
    shake: decay * Math.sin(frame * 3) * 8,
  };
};

// 持续张力颤动（对抗的连线绷紧）
export const tension = (frame: number, amp = 4, speed = 8) => Math.sin(frame / speed) * amp;

// stagger 延迟（错峰）
export const stag = (i: number, step = 5) => i * step;
