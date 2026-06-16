// 期权·时间维度 — 核心可视化（冰块衰减 / 三希腊字母 / 定金合同）
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { C, SANS, MONO, Stage, BigTitle, Sub, Corner } from "./Geo";

const SMOOTH = Easing.bezier(0.16, 1, 0.3, 1);

// ③ 冰块融化：时间价值加速衰减，里面冻着一枚期权，越接近到期越快归零
export const IceMelt: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  // 加速衰减：用 quad 缓动
  const melt = interpolate(frame, [30, dur - 30], [0, 1], { easing: Easing.in(Easing.quad), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const size = interpolate(melt, [0, 1], [320, 40]);
  const cx = 540, cyBase = 860;
  return (
    <Stage dur={dur}>
      <Corner text="06 / 时间衰减" />
      <BigTitle text="时间价值，加速衰减" size={80} top={220} color={C.ink} />
      <svg width={1080} height={1920} style={{ position: "absolute", top: 0 }}>
        {/* 地面线 */}
        <line x1={200} y1={cyBase + 180} x2={880} y2={cyBase + 180} stroke={C.ink} strokeWidth={4} />
        {/* 冰块（方形带高光） */}
        <g transform={`translate(${cx - size/2}, ${cyBase + 180 - size})`}>
          <rect width={size} height={size} rx={14} fill={C.blueLite} opacity={0.35} stroke={C.blue} strokeWidth={5} />
          <rect x={size*0.15} y={size*0.12} width={size*0.22} height={size*0.5} rx={6} fill="#fff" opacity={0.5} />
          {/* 冻在里面的期权硬币 */}
          <circle cx={size/2} cy={size/2} r={Math.max(8, size*0.18)} fill={C.amber} stroke={C.ink} strokeWidth={3} />
          <text x={size/2} y={size/2 + size*0.06} fontFamily={SANS} fontSize={Math.max(10, size*0.18)} fontWeight={900} fill={C.ink} textAnchor="middle">权</text>
        </g>
        {/* 水滴 */}
        {melt > 0.2 && [0,1,2].map(i => {
          const dy = ((frame + i*20) % 60) / 60;
          return <circle key={i} cx={cx - 40 + i*40} cy={cyBase + 180 - size + size + dy*150} r={6} fill={C.blue} opacity={(1-dy)*0.6} />;
        })}
      </svg>
      <Sub text="快到期的虚值期权 · 哪怕方向对，照样归零" top={1280} delay={20} color={C.red} size={40} />
    </Stage>
  );
};

// ④ 三个希腊字母：Vega / Gamma / IV 依次弹入，各带一句解释
export const Greeks: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = [
    { sym: "ν", name: "Vega", desc: "风险变高了", color: C.blue },
    { sym: "Γ", name: "Gamma", desc: "涨跌加速度在变", color: C.red },
    { sym: "IV", name: "隐含波动率", desc: "市场恐慌程度在变", color: C.amber },
  ];
  return (
    <Stage dur={dur}>
      <Corner text="05 / 三个新变量" />
      <BigTitle text="时间，带来三个变量" size={78} top={200} color={C.ink} />
      <div style={{ position: "absolute", top: 460, width: "100%", display: "flex", flexDirection: "column", gap: 50, alignItems: "center" }}>
        {items.map((it, i) => {
          const s = spring({ frame: frame - 30 - i * 22, fps, config: { damping: 16, mass: 0.9 } });
          const o = interpolate(s, [0, 1], [0, 1]);
          const x = interpolate(s, [0, 1], [-80, 0]);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 36, width: 820,
              opacity: o, transform: `translateX(${x}px)` }}>
              <div style={{ width: 150, height: 150, borderRadius: 24, background: it.color,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                fontFamily: MONO, fontWeight: 900, fontSize: it.name === "隐含波动率" ? 56 : 88, color: "#fff" }}>{it.sym}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 56, color: C.ink }}>{it.name}</span>
                <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 40, color: it.color }}>{it.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

// ⑤ 定金合同：一张盖章契约卡（权利金/到期日/行权价）
export const Contract: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 24, fps, config: { damping: 18, mass: 1 } });
  const stamp = spring({ frame: frame - 70, fps, config: { damping: 9, mass: 0.6 } });
  const rows = [["权利金", "你付出的成本"], ["到期日", "时间限制"], ["行权价", "约定价格"]];
  return (
    <Stage dur={dur}>
      <Corner text="03 / 你买的是什么" />
      <BigTitle text="一张有期限的合同" size={82} top={200} color={C.ink} />
      <div style={{ position: "absolute", top: 470, left: "50%", transform: `translateX(-50%) scale(${interpolate(s,[0,1],[0.8,1])})`,
        opacity: interpolate(s, [0, 1], [0, 1]),
        width: 760, background: "#fff", border: `5px solid ${C.ink}`, borderRadius: 20, padding: "56px 60px",
        display: "flex", flexDirection: "column", gap: 30 }}>
        {rows.map((r, i) => {
          const ro = interpolate(frame, [40 + i * 12, 56 + i * 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
              borderBottom: `2px dashed ${C.mute}`, paddingBottom: 18, opacity: ro }}>
              <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 52, color: C.blue }}>{r[0]}</span>
              <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 36, color: C.mute }}>{r[1]}</span>
            </div>
          );
        })}
        {/* 红章 */}
        <div style={{ position: "absolute", right: 50, bottom: 40, width: 150, height: 150, borderRadius: "50%",
          border: `6px solid ${C.red}`, color: C.red, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: SANS, fontWeight: 900, fontSize: 40, transform: `scale(${interpolate(stamp,[0,1],[2.4,1])}) rotate(-16deg)`,
          opacity: interpolate(stamp, [0, 1], [0, 0.9]) }}>权利</div>
      </div>
    </Stage>
  );
};
