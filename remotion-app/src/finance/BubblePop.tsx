// 泡沫膨胀到极限后破裂 - 吹大、抖动、啵地碎成粒子
import { interpolate, useCurrentFrame } from "remotion";
import { C, FONT } from "./theme";

const SHARDS = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2;
  return { dx: Math.cos(a), dy: Math.sin(a), r: 6 + (i % 4) * 3 };
});

export const BubblePop: React.FC<{ delay?: number; popAt?: number }> =
({ delay = 0, popAt = 60 }) => {
  const frame = useCurrentFrame();
  const f = frame - delay;
  const popped = f >= popAt;
  // 膨胀
  const grow = interpolate(f, [0, popAt], [40, 230], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  // 临破前抖动
  const shake = f > popAt - 14 && f < popAt ? Math.sin(f * 4) * 6 : 0;
  // 破裂粒子飞散
  const burst = interpolate(f, [popAt, popAt + 24], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const cx = 480, cy = 300;

  return (
    <svg width={960} height={600} viewBox="0 0 960 600">
      {!popped && (
        <g transform={`translate(${cx + shake},${cy})`}>
          <circle r={grow} fill={`${C.orange}33`} stroke={C.orange} strokeWidth={4} />
          <ellipse cx={-grow * 0.3} cy={-grow * 0.35} rx={grow * 0.22} ry={grow * 0.14}
            fill={C.paper} opacity={0.7} />
          <text textAnchor="middle" dominantBaseline="central" fill={C.orange}
            fontFamily={FONT.sans} fontWeight={800} fontSize={grow * 0.32}>AI</text>
        </g>
      )}
      {popped && (
        <g transform={`translate(${cx},${cy})`}>
          {SHARDS.map((s, i) => (
            <circle key={i}
              cx={s.dx * burst * 280} cy={s.dy * burst * 280}
              r={s.r * (1 - burst)} fill={C.orange} opacity={1 - burst} />
          ))}
          <text textAnchor="middle" dominantBaseline="central" fill={C.red}
            fontFamily={FONT.sans} fontWeight={800} fontSize={60} opacity={burst}>啵！</text>
        </g>
      )}
    </svg>
  );
};
