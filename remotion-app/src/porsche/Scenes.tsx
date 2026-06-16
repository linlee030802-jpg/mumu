// 保时捷轧空大众 — 叙事场景组件（标题/对比/资金流/转折/警示/铁律/CTA）科技蓝金
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { P, SANS, MONO, BiTag } from "./Broll";

const SMOOTH = Easing.bezier(0.16, 1, 0.3, 1);

const Frame: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 14, dur - 14, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: P.bg, opacity: o }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 42%, rgba(43,107,255,0.12), transparent 60%)` }} />
      <AbsoluteFill style={{ backgroundImage:
        `linear-gradient(rgba(91,155,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(91,155,255,0.06) 1px, transparent 1px)`,
        backgroundSize: "80px 80px" }} />
      {children}
    </AbsoluteFill>
  );
};

// 开场标题卡：大标题 + 年份 + 副标
export const TitleCard: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 16, fps, config: { damping: 16 } });
  const line = interpolate(frame, [30, 60], [0, 560], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Frame dur={dur}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 20 }}>
        <div style={{ fontFamily: MONO, fontWeight: 800, fontSize: 40, letterSpacing: 8, color: P.goldLite,
          opacity: interpolate(frame, [6, 26], [0, 1], { extrapolateRight: "clamp" }) }}>2008 · GERMANY</div>
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 130, color: P.ink, letterSpacing: -2,
          transform: `scale(${interpolate(s, [0, 1], [0.8, 1])})`, opacity: interpolate(s, [0, 1], [0, 1]),
          textShadow: `0 0 50px rgba(43,107,255,0.4)` }}>轧空屠杀</div>
        <div style={{ width: line, height: 5, background: P.gold, boxShadow: `0 0 16px ${P.gold}` }} />
        <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 42, color: P.mute, marginTop: 10,
          opacity: interpolate(frame, [50, 74], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          保时捷 vs 对冲基金 · 人类金融史最经典一战</div>
      </AbsoluteFill>
    </Frame>
  );
};

// 武器对比：K线 ✕ → 交割规则 ✓
export const VsWeapon: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sL = spring({ frame: frame - 20, fps, config: { damping: 16 } });
  const sR = spring({ frame: frame - 50, fps, config: { damping: 16 } });
  const Card = ({ s, label, mark, color, sub }: any) => (
    <div style={{ width: 560, padding: "60px 50px", borderRadius: 24, background: "rgba(20,28,48,0.7)",
      border: `2px solid ${color}55`, display: "flex", flexDirection: "column", alignItems: "center", gap: 24,
      opacity: interpolate(s, [0, 1], [0, 1]), transform: `translateY(${interpolate(s, [0, 1], [50, 0])}px)` }}>
      <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 90, color }}>{mark}</div>
      <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 64, color: P.ink }}>{label}</div>
      <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 34, color: P.mute }}>{sub}</div>
    </div>
  );
  return (
    <Frame dur={dur}>
      <div style={{ position: "absolute", left: 70, top: 90 }}><BiTag en="THE REAL WEAPON" zh="真正的武器" at={6} /></div>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 80 }}>
        <Card s={sL} label="K 线" mark="✕" color={P.mute} sub="散户的武器" />
        <Card s={sR} label="交割规则" mark="✓" color={P.goldLite} sub="机构的武器" />
      </AbsoluteFill>
    </Frame>
  );
};

// 关键转折卡：现金结算 ≠ 实物交割
export const KeyTwist: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 18, fps, config: { damping: 14 } });
  return (
    <Frame dur={dur}>
      <div style={{ position: "absolute", left: 70, top: 90 }}><BiTag en="THE TWIST" zh="空头算漏的一件事" at={6} accent="red" /></div>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 30 }}>
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 100, color: P.goldLite, letterSpacing: -1,
          transform: `scale(${interpolate(s, [0, 1], [0.8, 1])})`, opacity: interpolate(s, [0, 1], [0, 1]),
          textShadow: `0 0 40px ${P.gold}66` }}>现金结算</div>
        <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 48, color: P.mute }}>不是实物交割</div>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 40, color: P.ink, marginTop: 20, maxWidth: 1000, textAlign: "center", lineHeight: 1.5,
          opacity: interpolate(frame, [40, 64], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          保时捷根本不用真买股票 · 等期权到期按差价收钱就行</div>
      </AbsoluteFill>
    </Frame>
  );
};

// 资金流向：对冲基金 → 大规模做空 → 等崩盘捡尸
export const ShortFlow: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const grow1 = interpolate(frame, [24, 50], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const grow2 = interpolate(frame, [56, 82], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const Node = ({ x, text, color, op }: any) => (
    <div style={{ position: "absolute", left: x, top: 470, width: 360, padding: "40px 30px", borderRadius: 20,
      background: "rgba(20,28,48,0.8)", border: `2px solid ${color}`, textAlign: "center", opacity: op,
      fontFamily: SANS, fontWeight: 800, fontSize: 44, color: P.ink }}>{text}</div>
  );
  const Arrow = ({ x, g }: any) => (
    <div style={{ position: "absolute", left: x, top: 530, width: 120 * g, height: 5, background: P.red,
      boxShadow: `0 0 10px ${P.red}` }}>
      <div style={{ position: "absolute", right: -2, top: -8, opacity: g > 0.8 ? 1 : 0,
        borderTop: "10px solid transparent", borderBottom: "10px solid transparent", borderLeft: `16px solid ${P.red}` }} />
    </div>
  );
  return (
    <Frame dur={dur}>
      <div style={{ position: "absolute", left: 70, top: 90 }}><BiTag en="HEDGE FUNDS SHORT" zh="华尔街疯狂做空" at={6} accent="red" /></div>
      <Node x={140} text="对冲基金" color={P.blueLite} op={1} />
      <Arrow x={520} g={grow1} />
      <Node x={660} text="大规模做空" color={P.red} op={grow1} />
      <Arrow x={1040} g={grow2} />
      <Node x={1180} text="等崩盘捡尸" color={P.mute} op={grow2} />
      <div style={{ position: "absolute", bottom: 280, width: "100%", textAlign: "center",
        fontFamily: SANS, fontWeight: 600, fontSize: 42, color: P.goldLite,
        opacity: interpolate(frame, [90, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        他们算准了基本面，却算漏了一件事</div>
    </Frame>
  );
};

// 两句铁律编号卡
export const Rules: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rules = [
    { no: "01", t: "别把仓位暴露给对手", s: "头寸多大、止损在哪，被摸透就被精准打击" },
    { no: "02", t: "别低估规则的力量", s: "你不懂规则，规则就成了对手的武器" },
  ];
  return (
    <Frame dur={dur}>
      <div style={{ position: "absolute", left: 70, top: 90 }}><BiTag en="TWO LESSONS" zh="两句铁律" at={6} /></div>
      <div style={{ position: "absolute", top: 380, left: 200, right: 200, display: "flex", flexDirection: "column", gap: 60 }}>
        {rules.map((r, i) => {
          const s = spring({ frame: frame - 30 - i * 26, fps, config: { damping: 16 } });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 40,
              opacity: interpolate(s, [0, 1], [0, 1]), transform: `translateX(${interpolate(s, [0, 1], [-60, 0])}px)` }}>
              <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 130, color: P.gold, lineHeight: 1, flexShrink: 0,
                textShadow: `0 0 30px ${P.gold}55` }}>{r.no}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 60, color: P.ink }}>{r.t}</span>
                <span style={{ fontFamily: SANS, fontWeight: 500, fontSize: 34, color: P.mute }}>{r.s}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
};

// 大数字暴亏开场（$200亿）+ CTA 复用 BigStat，这里只做 CTA
export const CTA: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 20, fps, config: { damping: 14 } });
  return (
    <Frame dur={dur}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 30 }}>
        <div style={{ fontFamily: SANS, fontWeight: 900, fontSize: 90, color: P.ink, textAlign: "center", lineHeight: 1.3,
          transform: `scale(${interpolate(s, [0, 1], [0.85, 1])})`, opacity: interpolate(s, [0, 1], [0, 1]) }}>
          市场不关心你对不对<br /><span style={{ color: P.goldLite }}>只关心你扛不扛得住</span></div>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 44, color: P.mute, marginTop: 40,
          opacity: interpolate(frame, [50, 74], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          你吃过轧空的亏吗？评论区聊聊</div>
        <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 38, color: P.blueLite,
          opacity: interpolate(frame, [70, 94], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          我是权知道 · 长按点赞 · 下期见</div>
      </AbsoluteFill>
    </Frame>
  );
};
