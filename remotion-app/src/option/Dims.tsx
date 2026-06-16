// 期权·时间维度 — 核心可视化（维度系列：直线→曲线、一维尺量三维、冰块衰减、希腊字母）
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { C, SANS, MONO, Stage, BigTitle, Sub, Corner } from "./Geo";

const SMOOTH = Easing.bezier(0.16, 1, 0.3, 1);

// ① 一维直线 → 概率曲线：先画直线，再弯成上扬曲线
export const LineToCurve: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  // 0-40 画直线；50-110 弯成曲线
  const draw = interpolate(frame, [10, 50], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bend = interpolate(frame, [60, 120], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const W = 900, H = 500, x0 = 90, y0 = 460;
  // 直线终点
  const lx = x0 + W * draw, ly = y0 - (W * 0.35) * draw;
  // 曲线控制点（向上凸）
  const cpx = x0 + W * 0.5, cpy = y0 - 120 - bend * 360;
  const ex = x0 + W, ey = y0 - W * 0.35;
  return (
    <Stage dur={dur}>
      <Corner text="01 / 价格关系" />
      <BigTitle text={bend > 0.3 ? "不是直线，是曲线" : "股票期货：一条直线"} size={84} top={200} color={bend > 0.3 ? C.blue : C.ink} />
      <svg width={1080} height={1920} style={{ position: "absolute", top: 400 }}>
        {/* 坐标轴 */}
        <line x1={x0} y1={y0} x2={x0 + W + 30} y2={y0} stroke={C.ink} strokeWidth={3} />
        <line x1={x0} y1={y0} x2={x0} y2={y0 - 460} stroke={C.ink} strokeWidth={3} />
        <text x={x0 + W - 10} y={y0 + 50} fontFamily={SANS} fontSize={32} fontWeight={700} fill={C.mute}>价格</text>
        <text x={x0 - 70} y={y0 - 430} fontFamily={SANS} fontSize={32} fontWeight={700} fill={C.mute}>盈亏</text>
        {/* 直线（bend时淡出） */}
        <line x1={x0} y1={y0} x2={lx} y2={ly} stroke={C.ink} strokeWidth={7} strokeLinecap="round" opacity={1 - bend} />
        {/* 曲线（bend时长出） */}
        {bend > 0 && <path d={`M ${x0} ${y0} Q ${cpx} ${cpy} ${ex} ${ey}`} fill="none"
          stroke={C.blue} strokeWidth={9} strokeLinecap="round"
          strokeDasharray={1400} strokeDashoffset={1400 * (1 - bend)} />}
      </svg>
      {bend > 0.6 && <Sub text="多了一个变量：时间" top={1500} delay={120} color={C.blue} size={48} />}
    </Stage>
  );
};

// ② 一维尺子量三维：三维坐标系 + 一根短尺子，量不准
export const RulerVs3D: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ax = spring({ frame: frame - 20, fps, config: { damping: 18 } });
  const axes = [
    { label: "方向", x2: 240, y2: 0, color: C.ink },
    { label: "时间", x2: -150, y2: -160, color: C.blue },
    { label: "波动率", x2: 0, y2: -300, color: C.red },
  ];
  const cx = 540, cy = 1100;
  const rulerShake = Math.sin(frame / 5) * (interpolate(frame, [80, 110], [0, 8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  return (
    <Stage dur={dur}>
      <Corner text="07 / 维度升级" />
      <BigTitle text="一维的尺子" size={96} top={210} color={C.ink} />
      <Sub text="量不准三维的距离" top={340} delay={10} color={C.red} size={46} />
      <svg width={1080} height={1920} style={{ position: "absolute", top: 0 }}>
        {axes.map((a, i) => {
          const g = interpolate(ax, [0, 1], [0, 1]) * (frame > 20 + i * 8 ? 1 : 0);
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={cx + a.x2 * g} y2={cy + a.y2 * g} stroke={a.color} strokeWidth={8} strokeLinecap="round" />
              <circle cx={cx + a.x2 * g} cy={cy + a.y2 * g} r={g > 0.9 ? 14 : 0} fill={a.color} />
              {g > 0.9 && <text x={cx + a.x2 * 1.15} y={cy + a.y2 * 1.15} fontFamily={SANS} fontSize={40} fontWeight={800} fill={a.color} textAnchor="middle">{a.label}</text>}
            </g>
          );
        })}
        {/* 一维短尺子（带刻度），抖动表示量不准 */}
        <g transform={`translate(${cx - 120 + rulerShake}, ${cy + 120}) rotate(-12)`} opacity={frame > 80 ? 1 : 0}>
          <rect x={0} y={0} width={300} height={40} fill="none" stroke={C.ink} strokeWidth={4} rx={6} />
          {[0,1,2,3,4,5,6].map(i => <line key={i} x1={i*42+12} y1={0} x2={i*42+12} y2={16} stroke={C.ink} strokeWidth={3} />)}
        </g>
      </svg>
    </Stage>
  );
};
