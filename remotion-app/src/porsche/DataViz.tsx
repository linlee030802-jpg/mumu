// 保时捷轧空大众 — 数据动效（股价暴涨曲线 / 大数字 / 缺口图 / 持仓拆解）
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { P, SANS, MONO, BiTag } from "./Broll";

const SMOOTH = Easing.bezier(0.16, 1, 0.3, 1);

const Frame: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, 14, dur - 14, dur], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ backgroundColor: P.bg, opacity: o }}>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, rgba(43,107,255,0.12), transparent 60%)` }} />
      {/* 科技网格 */}
      <AbsoluteFill style={{ backgroundImage:
        `linear-gradient(rgba(91,155,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(91,155,255,0.06) 1px, transparent 1px)`,
        backgroundSize: "80px 80px" }} />
      {children}
    </AbsoluteFill>
  );
};

// ① 股价暴涨曲线：200→1005欧元，前段平缓后段垂直拉升（轧空高潮）
export const PriceSpike: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [20, dur - 40], [0, 1], { easing: Easing.bezier(0.4, 0, 0.9, 1), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const x0 = 200, y0 = 760, W = 1500, H = 560;
  // 曲线点：前80%时间价格平缓(200→300)，后段垂直拉升到1005
  const pts: [number, number][] = [];
  const N = 60;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const price = t < 0.7 ? 200 + (t / 0.7) * 120 : 320 + ((t - 0.7) / 0.3) ** 1.8 * 685;
    pts.push([x0 + W * t, y0 - (price / 1005) * H]);
  }
  const shown = Math.floor(pts.length * draw);
  const path = pts.slice(0, Math.max(2, shown)).map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
  const curPrice = Math.round(draw < 0.7 ? 200 + (draw / 0.7) * 120 : 320 + ((draw - 0.7) / 0.3) ** 1.8 * 685);
  const tip = pts[Math.max(0, shown - 1)] || pts[0];
  return (
    <Frame dur={dur}>
      <div style={{ position: "absolute", left: 70, top: 90 }}><BiTag en="THE SQUEEZE" zh="两天，垂直拉升" at={6} accent="red" /></div>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 60 }}>
        {/* 轴 */}
        <line x1={x0} y1={y0} x2={x0 + W + 20} y2={y0} stroke={P.mute} strokeWidth={2} />
        <line x1={x0} y1={y0} x2={x0} y2={y0 - H - 20} stroke={P.mute} strokeWidth={2} />
        {/* 参考线 */}
        {[200, 500, 1005].map((v) => {
          const y = y0 - (v / 1005) * H;
          return <g key={v}>
            <line x1={x0} y1={y} x2={x0 + W} y2={y} stroke="rgba(126,137,168,0.2)" strokeDasharray="6 8" />
            <text x={x0 - 16} y={y + 8} fontFamily={MONO} fontSize={28} fill={P.mute} textAnchor="end">€{v}</text>
          </g>;
        })}
        {/* 曲线 */}
        <path d={path} fill="none" stroke={P.red} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round"
          style={{ filter: `drop-shadow(0 0 12px ${P.red})` }} />
        {/* 头部光点 */}
        <circle cx={tip[0]} cy={tip[1]} r={12} fill={P.goldLite} style={{ filter: `drop-shadow(0 0 16px ${P.gold})` }} />
      </svg>
      {/* 实时价格大数字 */}
      <div style={{ position: "absolute", right: 120, top: 180, textAlign: "right" }}>
        <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 130, color: P.goldLite, lineHeight: 1,
          textShadow: `0 0 40px ${P.gold}` }}>€{curPrice.toLocaleString()}</div>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 34, color: P.mute, marginTop: 8 }}>2008.10.27 · 大众股价</div>
      </div>
    </Frame>
  );
};

// ② 大数字滚动卡
export const BigStat: React.FC<{ dur: number; enTag: string; zhTag: string; value: number; prefix?: string; suffix?: string; sub?: string; color?: string }> =
({ dur, enTag, zhTag, value, prefix = "", suffix = "", sub, color = P.goldLite }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = interpolate(frame, [16, 60], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cur = (value * p);
  const s = spring({ frame: frame - 50, fps, config: { damping: 12 } });
  const txt = Number.isInteger(value) ? Math.round(cur).toLocaleString() : cur.toFixed(1);
  return (
    <Frame dur={dur}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 24 }}>
        <BiTag en={enTag} zh={zhTag} at={6} />
        <div style={{ fontFamily: MONO, fontWeight: 900, fontSize: 240, color, letterSpacing: -4, lineHeight: 1,
          transform: `scale(${interpolate(s, [0, 1], [0.85, 1])})`, textShadow: `0 0 60px ${color}66` }}>
          {prefix}{txt}<span style={{ fontSize: 110 }}>{suffix}</span>
        </div>
        {sub && <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 40, color: P.mute }}>{sub}</div>}
      </AbsoluteFill>
    </Frame>
  );
};

// ③ 缺口图：空头要回补12% vs 市面只剩6%流通，红色缺口闪烁
export const GapBar: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sNeed = spring({ frame: frame - 30, fps, config: { damping: 16 } });
  const sHave = spring({ frame: frame - 50, fps, config: { damping: 16 } });
  const needW = interpolate(sNeed, [0, 1], [0, 900]);   // 12%+
  const haveW = interpolate(sHave, [0, 1], [0, 450]);   // 6%
  const gapBlink = interpolate(Math.sin(frame / 8), [-1, 1], [0.4, 1]);
  const Row = ({ y, w, label, val, color }: any) => (
    <g transform={`translate(360, ${y})`}>
      <text x={-30} y={50} fontFamily={SANS} fontSize={38} fontWeight={700} fill={P.ink} textAnchor="end">{label}</text>
      <rect x={0} y={0} width={w} height={80} rx={10} fill={color} style={{ filter: `drop-shadow(0 0 16px ${color}88)` }} />
      <text x={w + 24} y={56} fontFamily={MONO} fontSize={48} fontWeight={900} fill={color}>{val}</text>
    </g>
  );
  return (
    <Frame dur={dur}>
      <div style={{ position: "absolute", left: 70, top: 90 }}><BiTag en="NO SHARES LEFT" zh="买不到货" at={6} accent="red" /></div>
      <svg width={1920} height={1080} style={{ position: "absolute", top: 0 }}>
        <Row y={420} w={needW} label="空头要回补" val="12%+" color={P.red} />
        <Row y={560} w={haveW} label="市面可买" val="6%" color={P.blueLite} />
        {/* 缺口标注 */}
        {frame > 70 && (
          <g opacity={gapBlink}>
            <rect x={360 + haveW} y={420} width={Math.max(0, needW - haveW)} height={220} fill="rgba(230,58,46,0.15)" stroke={P.red} strokeWidth={2} strokeDasharray="8 8" />
            <text x={360 + (needW + haveW) / 2} y={400} fontFamily={SANS} fontSize={40} fontWeight={800} fill={P.red} textAnchor="middle">缺口 · 必须买但买不到</text>
          </g>
        )}
      </svg>
      <div style={{ position: "absolute", bottom: 240, width: "100%", textAlign: "center",
        fontFamily: SANS, fontWeight: 700, fontSize: 44, color: P.goldLite }}>价格只有一个方向：垂直拉升</div>
    </Frame>
  );
};

// ④ 持仓拆解：保时捷42%+31%期权 / 州政府20% / 流通<6%
export const Holdings: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const segs = [
    { label: "保时捷 股份", pct: 42, color: P.gold },
    { label: "保时捷 期权", pct: 32, color: P.goldLite },
    { label: "州政府 锁定", pct: 20, color: P.blue },
    { label: "自由流通", pct: 6, color: P.red },
  ];
  let acc = 0;
  return (
    <Frame dur={dur}>
      <div style={{ position: "absolute", left: 70, top: 90 }}><BiTag en="WHO HOLDS VW" zh="筹码都在谁手里" at={6} /></div>
      <div style={{ position: "absolute", top: 420, left: 360, width: 1200 }}>
        {/* 横向100%堆叠条 */}
        <div style={{ display: "flex", height: 120, borderRadius: 14, overflow: "hidden", border: `2px solid ${P.mute}` }}>
          {segs.map((s, i) => {
            const g = spring({ frame: frame - 24 - i * 14, fps, config: { damping: 18 } });
            return <div key={i} style={{ width: `${s.pct * interpolate(g, [0, 1], [0, 1])}%`, background: s.color,
              transition: "none", boxShadow: `inset 0 0 20px rgba(0,0,0,0.2)` }} />;
          })}
        </div>
        {/* 图例 */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 40, marginTop: 50 }}>
          {segs.map((s, i) => {
            const g = interpolate(frame, [40 + i * 12, 56 + i * 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, opacity: g }}>
                <div style={{ width: 28, height: 28, background: s.color, borderRadius: 6 }} />
                <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 34, color: P.ink }}>{s.label}</span>
                <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 40, color: s.color }}>{s.pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 220, width: "100%", textAlign: "center",
        fontFamily: SANS, fontWeight: 700, fontSize: 42, color: P.red }}>能自由买卖的，只剩不到 6%</div>
    </Frame>
  );
};
