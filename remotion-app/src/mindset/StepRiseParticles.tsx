// 粒子版 台阶跃升（开场概念镜）- "熬过去，认知上一个台阶"
// 底部混乱粒子云 → 逐层汇聚成五级发光光阶 → 一束亮核沿光阶跃升到顶
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, random } from "remotion";

const N = 700;
const W = 1080, H = 1920;
const STEPS = 5;
const baseX = 300, baseY = 1380, sw = 100, sh = 150;

// 每个粒子归属某一级台阶，先乱后聚
const parts = Array.from({ length: N }, (_, i) => {
  const step = i % STEPS;
  return {
    i, step,
    chaosX: random(`cx${i}`) * W,
    chaosY: 900 + random(`cy${i}`) * 900,
    // 目标：该级台阶面上的随机点
    tgtX: baseX + step * sw + random(`tx${i}`) * (sw + 50),
    tgtY: baseY - step * sh + random(`ty${i}`) * 16,
    size: 2 + random(`s${i}`) * 3,
    tw: random(`t${i}`) * 6.28,
    settle: random(`st${i}`) * 10,
  };
});

export const StepRiseParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 亮核跃升：粒子聚拢后(45帧起)，一束核从底跃到顶
  const climbF = frame - 50;
  const climbStep = Math.max(0, Math.min(STEPS - 1, Math.floor(climbF / 16)));
  const lf = climbF - climbStep * 16;
  const jp = interpolate(lf, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const fromX = baseX + climbStep * sw + sw / 2, fromY = baseY - climbStep * sh;
  const toX = baseX + (climbStep + 1) * sw + sw / 2, toY = baseY - (climbStep + 1) * sh;
  const coreX = fromX + (toX - fromX) * jp;
  const coreY = (fromY + (toY - fromY) * jp) - Math.sin(jp * Math.PI) * 80;

  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 60%, #0a1410 0%, #06080d 70%, #000 100%)" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute" }}>
        <defs>
          <filter id="g3" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g filter="url(#g3)">
          {parts.map((p) => {
            // 聚拢进度：每级错峰亮起
            const conv = interpolate(frame, [8 + p.step * 7, 40 + p.step * 7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const x = p.chaosX + (p.tgtX - p.chaosX) * conv;
            const y = p.chaosY + (p.tgtY - p.chaosY) * conv;
            // 颜色：聚拢中暗红→聚成墨绿
            const r = Math.round(180 + (46 - 180) * conv);
            const g = Math.round(80 + (230 - 80) * conv);
            const b = Math.round(80 + (200 - 80) * conv);
            const tw = 0.6 + 0.4 * Math.sin(frame * 0.16 + p.tw);
            const op = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" }) * (0.5 + 0.5 * tw);
            return <circle key={p.i} cx={x} cy={y} r={p.size * (1 + conv * 0.5)} fill={`rgb(${r},${g},${b})`} opacity={op} />;
          })}
          {/* 跃升亮核 */}
          {climbF >= 0 && (
            <>
              <circle cx={coreX} cy={coreY} r={26} fill="#FFE08A" opacity={0.95} />
              <circle cx={coreX} cy={coreY} r={48} fill="#FFD86B" opacity={0.3} />
            </>
          )}
        </g>
      </svg>
      <div style={{ position: "absolute", top: 220, width: "100%", textAlign: "center",
        fontFamily: '"Source Han Sans CN",sans-serif', fontWeight: 900, fontSize: 64, color: "#fff",
        opacity: interpolate(frame, [0, 16], [0, 1], { extrapolateRight: "clamp" }),
        textShadow: "0 0 30px rgba(46,230,200,0.6)" }}>
        熬过去，认知上一个台阶
      </div>
    </AbsoluteFill>
  );
};
