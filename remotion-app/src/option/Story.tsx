// 期权·时间维度 — 叙事镜（钩子三连问 / 点题 / 涨速对比 / 收尾CTA）
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { C, SANS, MONO, Stage, BigTitle, Sub, Corner } from "./Geo";

const SMOOTH = Easing.bezier(0.16, 1, 0.3, 1);

// 钩子：三个反问依次砸出
export const Hook: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const qs = ["方向看对了，还亏钱？", "涨了，也不赚钱？", "股票期货那套，全失效？"];
  return (
    <Stage dur={dur}>
      <Corner text="期权 · 为什么烧脑" />
      <div style={{ position: "absolute", top: 640, width: "100%", display: "flex", flexDirection: "column", gap: 64, alignItems: "center" }}>
        {qs.map((q, i) => {
          const s = spring({ frame: frame - 20 - i * 30, fps, config: { damping: 12, mass: 0.8 } });
          const o = interpolate(s, [0, 1], [0, 1]);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 24, opacity: o,
              transform: `scale(${interpolate(s, [0, 1], [0.7, 1])})` }}>
              <span style={{ fontFamily: MONO, fontWeight: 900, fontSize: 60, color: C.red }}>?</span>
              <span style={{ fontFamily: SANS, fontWeight: 900, fontSize: 64, color: C.ink }}>{q}</span>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

// 点题：答案=时间维度
export const KeyPoint: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 30, fps, config: { damping: 14 } });
  return (
    <Stage dur={dur}>
      <Corner text="答案只有一个" />
      <Sub text="搞不懂它，就永远搞不懂期权" top={680} delay={50} color={C.mute} size={44} />
      <div style={{ position: "absolute", top: 770, width: "100%", textAlign: "center",
        fontFamily: SANS, fontWeight: 900, fontSize: 180, color: C.blue, letterSpacing: -4,
        transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`, opacity: interpolate(s, [0, 1], [0, 1]) }}>时间维度</div>
    </Stage>
  );
};

// 涨速对比：同样涨10点，快涨vs慢涨，期权结果不同
export const SpeedCompare: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const fast = interpolate(frame, [20, 50], [0, 1], { easing: Easing.out(Easing.quad), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const slow = interpolate(frame, [20, 110], [0, 1], { easing: SMOOTH, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const W = 360, H = 300;
  const Panel = ({ x, label, prog, color, result }: any) => (
    <g transform={`translate(${x}, 760)`}>
      <text x={W/2} y={-30} fontFamily={SANS} fontSize={44} fontWeight={900} fill={C.ink} textAnchor="middle">{label}</text>
      <line x1={0} y1={H} x2={W} y2={H} stroke={C.ink} strokeWidth={3} />
      <line x1={0} y1={0} x2={0} y2={H} stroke={C.ink} strokeWidth={3} />
      <line x1={0} y1={H} x2={W * prog} y2={H - H * 0.8 * prog} stroke={color} strokeWidth={8} strokeLinecap="round" />
      <circle cx={W * prog} cy={H - H * 0.8 * prog} r={12} fill={color} />
      {prog > 0.95 && <text x={W/2} y={H + 70} fontFamily={SANS} fontSize={40} fontWeight={800} fill={color} textAnchor="middle">{result}</text>}
    </g>
  );
  return (
    <Stage dur={dur}>
      <Corner text="04 / 涨速决定一切" />
      <BigTitle text="同样涨10点，结果不同" size={72} top={180} color={C.ink} />
      <svg width={1080} height={1920} style={{ position: "absolute", top: 0 }}>
        <Panel x={90} label="涨得快" prog={fast} color={C.red} result="权利金暴涨" />
        <Panel x={620} label="涨得慢" prog={slow} color={C.mute} result="可能不涨反跌" />
      </svg>
    </Stage>
  );
};

// 收尾CTA
export const Outro: React.FC<{ dur: number }> = ({ dur }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - 24, fps, config: { damping: 14 } });
  return (
    <Stage dur={dur}>
      <Corner text="权知道" />
      <BigTitle text="别再用股票思维" size={76} top={560} color={C.ink} />
      <BigTitle text="做期权" size={110} top={680} color={C.blue} delay={14} />
      <div style={{ position: "absolute", top: 1050, width: "100%", textAlign: "center",
        opacity: interpolate(s, [0, 1], [0, 1]), transform: `translateY(${interpolate(s, [0, 1], [30, 0])}px)` }}>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 42, color: C.mute, marginBottom: 20 }}>听懂了，评论区打三个字</div>
        <div style={{ display: "inline-block", fontFamily: SANS, fontWeight: 900, fontSize: 88, color: "#fff",
          background: C.red, padding: "16px 56px", borderRadius: 18, transform: "rotate(-2deg)" }}>非线性</div>
        <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 38, color: C.mute, marginTop: 50 }}>点赞关注收藏 · 下期见</div>
      </div>
    </Stage>
  );
};
