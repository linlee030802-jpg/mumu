// 粒子版 筛子筛选（收尾高潮）- "低谷是来帮你筛选的"
// 上方落下混合粒子→撞筛网→红色(幻想/浮躁/错误)被弹开消散，绿色穿过→底部汇聚成上升新芽
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, random } from "remotion";

const N = 900;
const W = 1080, H = 1920;
const SIEVE_Y = 760;   // 筛网高度

// 预生成粒子：一半红(被筛掉)，一半绿(穿过)
const parts = Array.from({ length: N }, (_, i) => {
  const bad = i % 2 === 0;           // 红=坏，绿=好
  return {
    i, bad,
    startX: 200 + random(`x${i}`) * (W - 400),
    startDelay: random(`d${i}`) * 40,
    fallSpeed: 8 + random(`s${i}`) * 6,
    // 绿粒子穿过后汇聚到新芽（中心茎+两叶）
    sproutX: W / 2 + (random(`sx${i}`) - 0.5) * 220,
    sproutY: 1420 - random(`sy${i}`) * 360,
    // 红粒子被弹开方向
    deflect: (random(`df${i}`) - 0.5) * 2,
    size: 2.5 + random(`sz${i}`) * 3.5,
    tw: random(`tw${i}`) * 6.28,
  };
});

export const SieveParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, #14100a 0%, #08060d 70%, #000 100%)" }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute" }}>
        <defs>
          <filter id="g2" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* 筛网（一道发光横线+网孔点） */}
        <line x1={180} y1={SIEVE_Y} x2={W - 180} y2={SIEVE_Y} stroke="#C8941E" strokeWidth={4}
          opacity={interpolate(frame, [0, 16], [0, 0.8], { extrapolateRight: "clamp" })}
          strokeDasharray="6 16" style={{ filter: "url(#g2)" }} />
        <g filter="url(#g2)">
          {parts.map((p) => {
            const f = frame - p.startDelay;
            if (f < 0) return null;
            // 下落到筛网
            const fallY = 80 + f * p.fallSpeed;
            const hitSieve = fallY >= SIEVE_Y;
            let x = p.startX, y = Math.min(fallY, SIEVE_Y);
            let op = interpolate(f, [0, 8], [0, 1], { extrapolateRight: "clamp" });
            let col = p.bad ? "#FF3B3B" : "#2EE6C8";

            if (hitSieve) {
              const af = fallY - SIEVE_Y; // 过筛网后的帧进度
              if (p.bad) {
                // 红：被弹开向两侧+消散
                x = p.startX + p.deflect * af * 2.5;
                y = SIEVE_Y - Math.sin(Math.min(af / 30, 1) * Math.PI) * 120 + af * 0.5;
                op *= interpolate(af, [0, 40], [1, 0], { extrapolateRight: "clamp" });
              } else {
                // 绿：穿过筛网，向新芽位置汇聚
                const conv = interpolate(af, [0, 60], [0, 1], { easing: undefined, extrapolateRight: "clamp" });
                x = p.startX + (p.sproutX - p.startX) * conv;
                y = SIEVE_Y + (p.sproutY - SIEVE_Y) * conv;
              }
            }
            const tw = 0.6 + 0.4 * Math.sin(frame * 0.18 + p.tw);
            return <circle key={p.i} cx={x} cy={y} r={p.size} fill={col} opacity={op * tw} />;
          })}
        </g>
      </svg>
      {/* 文字 */}
      <div style={{ position: "absolute", top: 200, width: "100%", textAlign: "center",
        fontFamily: '"Source Han Sans CN",sans-serif', fontWeight: 900, fontSize: 64, color: "#fff",
        opacity: interpolate(frame, [0, 16], [0, 1], { extrapolateRight: "clamp" }),
        textShadow: "0 0 30px rgba(200,148,30,0.6)" }}>
        低谷，是来帮你筛选的
      </div>
      <div style={{ position: "absolute", bottom: 240, width: "100%", textAlign: "center",
        fontFamily: '"Source Han Sans CN",sans-serif', fontWeight: 900, fontSize: 52, color: "#2EE6C8",
        opacity: interpolate(frame, [90, 115], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        textShadow: "0 0 30px rgba(46,230,200,0.7)" }}>
        筛剩的，是真能赚钱的系统
      </div>
    </AbsoluteFill>
  );
};
