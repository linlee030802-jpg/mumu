// 悬浮卡片基准 - 毛玻璃卡片 + 多层投影 + 景深 + 视差浮动 + 3D微倾（竖屏1080×1920@30fps）
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";

const SANS = '"Source Han Sans CN","PingFang SC","Noto Sans SC",sans-serif';

// 单张毛玻璃悬浮卡
const GlassCard: React.FC<{
  delay: number; x: number; y: number; w: number; h: number;
  depth: number;      // 0前景~1背景，控制虚化/亮度/浮动幅度
  tilt?: number;
  children?: React.ReactNode;
  accent?: string;
}> = ({ delay, x, y, w, h, depth, tilt = 0, children, accent = "#6C8CFF" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // 弹入：从下方+缩放+透视翻入
  const s = spring({ frame: frame - delay, fps, config: { damping: 16, mass: 0.9 } });
  const enterY = interpolate(s, [0, 1], [80, 0]);
  const enterO = interpolate(s, [0, 1], [0, 1]);
  const enterScale = interpolate(s, [0, 1], [0.92, 1]);
  // 持续视差浮动（深度越大浮得越慢越小）
  const floatAmp = 18 * (1 - depth * 0.5);
  const bob = Math.sin((frame - delay) / (30 + depth * 20)) * floatAmp;
  const bobX = Math.cos((frame - delay) / (40 + depth * 25)) * floatAmp * 0.4;
  // 景深：背景卡虚化+压暗
  const blur = depth * 6;
  const bright = 1 - depth * 0.35;

  return (
    <div style={{
      position: "absolute", left: x, top: y + bob, width: w, height: h,
      transform: `translateX(${bobX}px) translateY(${enterY}px) scale(${enterScale}) perspective(1400px) rotateX(${tilt * 0.6}deg) rotateY(${tilt}deg)`,
      opacity: enterO * (1 - depth * 0.2),
      filter: blur > 0.5 ? `blur(${blur}px) brightness(${bright})` : "none",
      borderRadius: 36,
      background: "linear-gradient(145deg, rgba(255,255,255,0.16), rgba(255,255,255,0.04))",
      backdropFilter: "blur(24px)",
      border: "1.5px solid rgba(255,255,255,0.28)",
      // 多层柔和投影 + 内高光，做出真实悬浮厚度
      boxShadow: `0 2px 8px rgba(0,0,0,0.18), 0 18px 40px rgba(0,0,0,0.28), 0 40px 90px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.4), 0 0 60px ${accent}22`,
      display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
    }}>
      {children}
    </div>
  );
};

export const FloatCardDemo: React.FC = () => {
  const frame = useCurrentFrame();
  // 背景柔和渐变 + 缓慢游移的辉光团
  const gx = 50 + Math.sin(frame / 80) * 12;
  const gy = 40 + Math.cos(frame / 100) * 10;
  return (
    <AbsoluteFill style={{
      background: `radial-gradient(circle at ${gx}% ${gy}%, #2A2350 0%, #14122B 55%, #0B0A18 100%)`,
    }}>
      {/* 背景辉光团 */}
      <div style={{ position: "absolute", left: "20%", top: "30%", width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, #6C8CFF44, transparent 70%)", filter: "blur(40px)" }} />
      <div style={{ position: "absolute", right: "10%", bottom: "20%", width: 420, height: 420, borderRadius: "50%",
        background: "radial-gradient(circle, #FF9EC444, transparent 70%)", filter: "blur(40px)" }} />

      {/* 背景虚化卡（景深层） */}
      <GlassCard delay={2} x={120} y={420} w={420} h={300} depth={0.8} tilt={-6} accent="#FF9EC4" />
      <GlassCard delay={4} x={560} y={1050} w={400} h={280} depth={0.7} tilt={5} accent="#6C8CFF" />

      {/* 主卡（前景清晰） */}
      <GlassCard delay={8} x={140} y={680} w={800} h={620} depth={0} tilt={-3} accent="#6C8CFF">
        <div style={{ fontSize: 130, marginBottom: 20 }}>🎯</div>
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 96, color: "#fff",
          textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>大胆认输</div>
        <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 44, color: "rgba(255,255,255,0.82)",
          marginTop: 24, textAlign: "center", lineHeight: 1.5 }}>
          从和全市场博弈的网游模式<br/>切换成自己成长的单机模式
        </div>
      </GlassCard>

      {/* 顶部小标签卡 */}
      <GlassCard delay={14} x={300} y={360} w={480} h={130} depth={0.2} accent="#FFD86B">
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 56, color: "#FFD86B",
          textShadow: "0 0 20px rgba(255,216,107,0.5)" }}>方法 02</div>
      </GlassCard>
    </AbsoluteFill>
  );
};
