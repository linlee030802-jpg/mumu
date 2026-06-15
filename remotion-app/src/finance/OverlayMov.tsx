// 原片叠加动效层 - 关键词强调弹出 + 数据图表插入（叠在 2160×1080@50fps 原片上）
import { AbsoluteFill, Sequence, OffthreadVideo, staticFile, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const FONT = '"PingFang SC","Noto Sans SC",sans-serif';
const GOLD = "#FFCC4D";
const RED = "#FF5A4D";

// 关键词强调：从字幕上方弹出大字 + 描边高亮
const KeyPop: React.FC<{ text: string; color?: string; sub?: string }> = ({ text, color = GOLD, sub }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 12, mass: 0.6 } });
  const sc = interpolate(s, [0, 1], [0.4, 1]);
  const o = interpolate(s, [0, 1], [0, 1]);
  const wob = Math.sin(frame / 6) * 1.5;
  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 180 }}>
      <div style={{
        transform: `scale(${sc}) rotate(${wob}deg)`, opacity: o,
        fontFamily: FONT, fontWeight: 900, fontSize: 130, color,
        WebkitTextStroke: "6px rgba(20,12,4,0.85)",
        textShadow: `0 0 40px ${color}, 0 8px 24px rgba(0,0,0,0.6)`,
        letterSpacing: 4, whiteSpace: "nowrap",
      }}>{text}</div>
      {sub && (
        <div style={{
          marginTop: 20, opacity: o, fontFamily: FONT, fontWeight: 700, fontSize: 56,
          color: "#fff", background: "rgba(20,12,4,0.6)", padding: "10px 30px", borderRadius: 12,
          border: `3px solid ${color}`,
        }}>{sub}</div>
      )}
    </AbsoluteFill>
  );
};

// VIP 跳级标记
const JumpTag: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s1 = spring({ frame, fps, config: { damping: 13 } });
  const s2 = spring({ frame: frame - 18, fps, config: { damping: 10 } });
  const arrowO = interpolate(s2, [0, 1], [0, 1]);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 150 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40, transform: `scale(${interpolate(s1,[0,1],[0.5,1])})`, opacity: interpolate(s1,[0,1],[0,1]) }}>
        <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 80, color: "#bbb", textDecoration: "line-through", WebkitTextStroke: "4px rgba(20,12,4,0.7)" }}>普通客户</span>
        <span style={{ fontSize: 90, color: GOLD, opacity: arrowO, transform: `scale(${arrowO})` }}>➜</span>
        <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 110, color: GOLD, opacity: arrowO, WebkitTextStroke: "6px rgba(20,12,4,0.85)", textShadow: `0 0 40px ${GOLD}` }}>顶级VIP</span>
      </div>
    </AbsoluteFill>
  );
};

// 额度翻倍标记（5000万→1亿）
const AmountFlip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 13 } });
  const s2 = spring({ frame: frame - 20, fps, config: { damping: 9 } });
  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 160 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 36, opacity: interpolate(s,[0,1],[0,1]), transform: `translateY(${interpolate(s,[0,1],[-40,0])}px)` }}>
        <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 84, color: "#ddd", WebkitTextStroke: "4px rgba(20,12,4,0.8)" }}>5000万</span>
        <span style={{ fontSize: 80, color: GOLD, opacity: interpolate(s2,[0,1],[0,1]) }}>➜</span>
        <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 120, color: GOLD, opacity: interpolate(s2,[0,1],[0,1]), transform: `scale(${interpolate(s2,[0,1],[0.5,1])})`, WebkitTextStroke: "6px rgba(20,12,4,0.85)", textShadow: `0 0 40px ${GOLD}` }}>1亿</span>
      </div>
      <div style={{ marginTop: 18, opacity: interpolate(s2,[0,1],[0,1]), fontFamily: FONT, fontWeight: 700, fontSize: 48, color: "#fff", background: "rgba(20,12,4,0.6)", padding: "8px 26px", borderRadius: 10 }}>银行主动翻倍</div>
    </AbsoluteFill>
  );
};

// 期权思维图：有限下行 vs 无限上行
const OptionChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const grow = interpolate(frame, [10, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const o = spring({ frame, fps, config: { damping: 14 } });
  const cx = 1080, baseY = 620, x0 = 1500;
  // 上行曲线终点
  const upX = x0 + 480 * grow, upY = baseY - 360 * grow;
  return (
    <AbsoluteFill style={{ opacity: interpolate(o,[0,1],[0,1]) }}>
      <svg width={2160} height={1080} viewBox="0 0 2160 1080">
        <g opacity={0.92}>
          {/* 半透明面板 */}
          <rect x={620} y={180} width={920} height={520} rx={20} fill="rgba(20,14,8,0.62)" stroke={GOLD} strokeWidth={3} />
          <text x={1080} y={250} textAnchor="middle" fill="#fff" fontFamily={FONT} fontWeight="800" fontSize="52">期权思维</text>
          {/* 下行：小红块 */}
          <rect x={720} y={560} width={200} height={interpolate(grow,[0,1],[0,70])} rx={8} fill={RED} />
          <text x={820} y={540} textAnchor="middle" fill={RED} fontFamily={FONT} fontWeight="800" fontSize="40">下行有限</text>
          <text x={820} y={680} textAnchor="middle" fill="#fff" fontFamily={FONT} fontSize="32">可忽略的风险</text>
          {/* 上行：冲高箭头 */}
          <line x1={1180} y1={620} x2={interpolate(grow,[0,1],[1180,1420])} y2={interpolate(grow,[0,1],[620,300])} stroke={GOLD} strokeWidth={10} strokeLinecap="round" />
          <polygon points={`${interpolate(grow,[0,1],[1180,1420])},${interpolate(grow,[0,1],[620,300])} ${interpolate(grow,[0,1],[1180,1380])},${interpolate(grow,[0,1],[620,320])} ${interpolate(grow,[0,1],[1180,1430])},${interpolate(grow,[0,1],[620,350])}`} fill={GOLD} opacity={grow} />
          <text x={1320} y={260} textAnchor="middle" fill={GOLD} fontFamily={FONT} fontWeight="900" fontSize="48" opacity={grow}>上行无限 ↑</text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};

export const OverlayMov: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo src={staticFile("mov/source.mov")} />
      {/* 时间换算 秒×50=帧。各动效避开底部字幕区（顶部弹出）*/}

      {/* 7.7-11.4 普通客户→VIP 跳级 */}
      <Sequence from={385} durationInFrames={185}><JumpTag /></Sequence>

      {/* 17.9-20.0 没有流动性 */}
      <Sequence from={895} durationInFrames={108}><KeyPop text="没有流动性" color={RED} /></Sequence>

      {/* 20.0-22.7 浮盈不算盈利 */}
      <Sequence from={1002} durationInFrames={134}><KeyPop text="浮盈 ≠ 盈利" color={GOLD} /></Sequence>

      {/* 22.7-25.2 落进口袋才是钱 */}
      <Sequence from={1136} durationInFrames={122}><KeyPop text="落袋为安" sub="能拿到手的才是你的钱" color={GOLD} /></Sequence>

      {/* 25.2-27.2 开口5000万 → 33-35 翻倍成1亿 */}
      <Sequence from={1652} durationInFrames={158}><AmountFlip /></Sequence>

      {/* 47.8-51.9 期权思维图 */}
      <Sequence from={2390} durationInFrames={204}><OptionChart /></Sequence>

      {/* 50.0-51.9 没有上限的上行（叠在图上强调）*/}
      <Sequence from={2502} durationInFrames={92}><KeyPop text="无限上行" color={GOLD} /></Sequence>
    </AbsoluteFill>
  );
};
