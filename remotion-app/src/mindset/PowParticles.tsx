// 惊艳基准A - 赛博霓虹粒子风暴→重组（"市场帮你清零重洗"）
// 1500个发光粒子：混乱红色风暴 → 被冲刷 → 重组成墨绿上升阵列。纯Canvas+辉光。
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, random } from "remotion";

const N = 1500;
const W = 1080, H = 1920;

// 预生成粒子的随机种子参数（用 random(seed) 保证可复现）
const particles = Array.from({ length: N }, (_, i) => {
  const a = random(`ang${i}`) * Math.PI * 2;
  const r = random(`rad${i}`);
  return {
    i,
    // 混乱期：极坐标乱飞
    chaosAng: a,
    chaosR: 80 + r * 520,
    chaosSpeed: 0.5 + random(`spd${i}`) * 2,
    // 重组期：目标落在一个向上的网格阵列
    gridX: (i % 30) / 29,           // 0-1
    gridY: Math.floor(i / 30) / (N / 30 - 1),
    size: 2 + random(`sz${i}`) * 4,
    twinkle: random(`tw${i}`) * Math.PI * 2,
  };
});

export const PowParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 三阶段进度：0-40混乱风暴 / 40-75冲刷过渡 / 75+重组上升
  const morph = interpolate(frame, [40, 78], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // 冲刷波（一道亮光从下往上扫）
  const washY = interpolate(frame, [40, 78], [H + 200, -200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 45%, #0d1430 0%, #05060d 70%, #000 100%)" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute" }}>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <g filter="url(#glow)">
          {particles.map((p) => {
            // 混乱位置（绕中心乱转）
            const cAng = p.chaosAng + frame * 0.02 * p.chaosSpeed;
            const cx = W / 2 + Math.cos(cAng) * p.chaosR * (1 - morph * 0.5);
            const cy = H * 0.45 + Math.sin(cAng) * p.chaosR * 0.7 * (1 - morph * 0.6);
            // 重组目标位置（向上的整齐阵列）
            const tx = 140 + p.gridX * (W - 280);
            const ty = 1500 - p.gridY * 1100 + Math.sin(frame * 0.04 + p.twinkle) * 8;
            // 插值
            const x = cx + (tx - cx) * morph;
            const y = cy + (ty - cy) * morph;
            // 颜色：混乱红 → 重组墨绿青
            const r = Math.round(255 + (0 - 255) * morph);
            const g = Math.round(59 + (229 - 59) * morph);
            const b = Math.round(59 + (200 - 59) * morph);
            // 闪烁透明度
            const tw = 0.5 + 0.5 * Math.sin(frame * 0.15 + p.twinkle);
            const op = (0.4 + 0.6 * tw) * interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
            return <circle key={p.i} cx={x} cy={y} r={p.size * (1 + morph * 0.4)} fill={`rgb(${r},${g},${b})`} opacity={op} />;
          })}
        </g>
        {/* 冲刷波 */}
        {frame >= 40 && frame <= 80 && (
          <rect x={0} y={washY} width={W} height={120} fill="url(#wash)" opacity={0.5} />
        )}
        <defs>
          <linearGradient id="wash" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#7fffe8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
      {/* 文字 */}
      <div style={{ position: "absolute", top: 200, width: "100%", textAlign: "center",
        fontFamily: '"Source Han Sans CN",sans-serif', fontWeight: 900, fontSize: 70,
        color: "#fff", opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
        textShadow: "0 0 30px rgba(127,255,232,0.6)" }}>
        {morph < 0.5 ? "错误的认知，浮躁的心态" : "市场帮你清零重洗"}
      </div>
    </AbsoluteFill>
  );
};
