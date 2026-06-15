// 小Lin说风格动效组件（竖屏 1080×1920 @60fps）
// DNA：向上滑动0.5s入场 + 纯白敦实黑体 + 极度克制 + 数字高亮
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const FONT = '"PingFang SC","Source Han Sans CN","Noto Sans SC",sans-serif';
export const LIN = {
  white: "#FFFFFF",
  yellow: "#FFE14D",   // 高亮黄
  red: "#FF4D4D",      // 涨/强调红
  green: "#2ECC71",    // 涨绿(期货红涨)
  ink: "#1A1A1A",
  cardBg: "rgba(20,20,24,0.78)",
};

// 小Lin说招牌：向上滑动 0.5s 入场（30帧@60fps）
export const SlideUp: React.FC<{ delay?: number; children: React.ReactNode; dist?: number }> =
({ delay = 0, children, dist = 60 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 16, mass: 0.7 } });
  const y = interpolate(s, [0, 1], [dist, 0]);
  const o = interpolate(s, [0, 1], [0, 1]);
  return <div style={{ transform: `translateY(${y}px)`, opacity: o }}>{children}</div>;
};

// 数字徽章：标签 + 高亮数值，向上滑入
export const NumBadge: React.FC<{
  label: string; value: string; color?: string; delay?: number; size?: number;
}> = ({ label, value, color = LIN.yellow, delay = 0, size = 88 }) => (
  <SlideUp delay={delay}>
    <div style={{
      display: "inline-flex", alignItems: "baseline", gap: 18,
      background: LIN.cardBg, padding: "20px 40px", borderRadius: 18,
      border: `3px solid ${color}`, boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    }}>
      <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: size * 0.5, color: "#fff" }}>{label}</span>
      <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: size, color,
        textShadow: `0 0 24px ${color}aa` }}>{value}</span>
    </div>
  </SlideUp>
);

// 计算式逐步展开：a × b × c = result
export const FormulaStep: React.FC<{
  parts: string[];   // ["5吨","×10","×7%","=2324元"]
  delay?: number; highlightLast?: boolean;
}> = ({ parts, delay = 0, highlightLast = true }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: 14, maxWidth: 940 }}>
      {parts.map((p, i) => {
        const isLast = i === parts.length - 1;
        const col = highlightLast && isLast ? LIN.yellow : "#fff";
        return (
          <SlideUp key={i} delay={delay + i * 14}>
            <span style={{
              fontFamily: FONT, fontWeight: 900, fontSize: isLast ? 96 : 72, color: col,
              background: isLast ? "rgba(20,20,24,0.85)" : "transparent",
              padding: isLast ? "8px 28px" : "0", borderRadius: 14,
              textShadow: isLast ? `0 0 28px ${LIN.yellow}` : "0 2px 8px rgba(0,0,0,0.6)",
              WebkitTextStroke: "2px rgba(0,0,0,0.4)",
            }}>{p}</span>
          </SlideUp>
        );
      })}
    </div>
  );
};

// 数字跳动滚到目标（保证金/价格）
export const CountTo: React.FC<{
  to: number; prefix?: string; suffix?: string; color?: string; delay?: number; size?: number; dur?: number;
}> = ({ to, prefix = "", suffix = "", color = LIN.yellow, delay = 0, size = 130, dur = 30 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = frame - delay;
  const p = interpolate(f, [0, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const val = Math.round(to * p);
  const pop = spring({ frame: f - dur, fps, config: { damping: 8, mass: 0.5 } });
  const sc = f >= dur ? interpolate(pop, [0, 1], [1.15, 1]) : 1;
  return (
    <SlideUp delay={delay}>
      <span style={{ display: "inline-block", transform: `scale(${sc})`,
        fontFamily: FONT, fontWeight: 900, fontSize: size, color,
        textShadow: `0 0 30px ${color}aa`, WebkitTextStroke: "3px rgba(0,0,0,0.45)" }}>
        {prefix}{val.toLocaleString()}{suffix}
      </span>
    </SlideUp>
  );
};

// 涨幅强调：从A涨到B + 箭头 + 百分比
export const PriceJump: React.FC<{
  from: number; to: number; delay?: number;
}> = ({ from, to, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pct = Math.round((to - from) / from * 100);
  const s2 = spring({ frame: frame - delay - 24, fps, config: { damping: 9 } });
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <SlideUp delay={delay}>
          <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 76, color: "#bbb",
            WebkitTextStroke: "2px rgba(0,0,0,0.4)" }}>¥{from}</span>
        </SlideUp>
        <SlideUp delay={delay + 12}>
          <span style={{ fontSize: 80, color: LIN.red }}>↗</span>
        </SlideUp>
        <SlideUp delay={delay + 18}>
          <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 120, color: LIN.red,
            textShadow: `0 0 30px ${LIN.red}`, WebkitTextStroke: "3px rgba(0,0,0,0.45)" }}>¥{to}</span>
        </SlideUp>
      </div>
      <div style={{ opacity: interpolate(s2, [0, 1], [0, 1]), transform: `scale(${interpolate(s2,[0,1],[0.6,1])})`,
        fontFamily: FONT, fontWeight: 900, fontSize: 100, color: LIN.red,
        background: "rgba(20,20,24,0.85)", padding: "10px 40px", borderRadius: 20,
        textShadow: `0 0 30px ${LIN.red}` }}>
        +{pct}% 🚀
      </div>
    </div>
  );
};
