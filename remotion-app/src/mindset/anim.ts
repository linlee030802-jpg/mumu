// 动效工具 - motion-craft 准则（米白水彩片复用）
import { Easing, interpolate, spring as rspring } from "remotion";

export const EASE = {
  enter: Easing.bezier(0.16, 1, 0.3, 1),
  editorial: Easing.bezier(0.45, 0, 0.55, 1),
  pop: Easing.bezier(0.34, 1.56, 0.64, 1),
  accel: Easing.in(Easing.cubic),
  decel: Easing.out(Easing.cubic),
};

export const prog = (frame: number, start: number, dur: number, easing = EASE.enter) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    easing, extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

// 入场：滑动+淡入+模糊→清晰
export const enterSlide = (frame: number, start: number, dur = 16, dist = 60) => {
  const p = prog(frame, start, dur);
  return {
    opacity: p,
    transform: `translateY(${interpolate(p, [0, 1], [dist, 0])}px)`,
    filter: `blur(${interpolate(p, [0, 1], [8, 0])}px)`,
  };
};

// spring 过冲
export const pop = (frame: number, start: number, fps: number, damping = 11, mass = 0.6) => {
  const s = rspring({ frame: frame - start, fps, config: { damping, mass } });
  return { scale: s, opacity: interpolate(s, [0, 0.4, 1], [0, 1, 1]) };
};

export const stag = (i: number, step = 5) => i * step;
