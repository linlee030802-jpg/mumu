// 前5镜试看片 - 验证美漫水彩+小Lin说克制风格（竖屏 1080×1920 @30fps）
import { AbsoluteFill, Sequence, Audio, staticFile, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { M, MF } from "./theme";
import { Pic, Sub } from "./Pic";
import { StepRise } from "./StepRise";
import { EASE, prog, pop } from "./anim";

// #3 三词被划掉（错误认知/浮躁心态/侥幸习惯）
const ThreeStrike: React.FC = () => {
  const frame = useCurrentFrame();
  const words = ["错误的认知", "浮躁的心态", "侥幸的习惯"];
  return (
    <AbsoluteFill style={{ backgroundColor: "transparent", justifyContent: "center", alignItems: "center", gap: 40 }}>
      {words.map((w, i) => {
        const start = 20 + i * 22;
        const o = prog(frame, start, 12);
        const strike = prog(frame, start + 14, 12); // 划线
        return (
          <div key={i} style={{ position: "relative", opacity: o }}>
            <span style={{ fontFamily: MF.sans, fontWeight: 800, fontSize: 72, color: M.ink,
              background: M.paper, padding: "8px 32px", borderRadius: 12 }}>{w}</span>
            <div style={{ position: "absolute", top: "50%", left: 0, height: 8, background: M.red,
              width: `${strike * 100}%`, borderRadius: 4, boxShadow: `0 0 12px ${M.red}` }} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// #5 纸底留白"5个方法"预告
const FiveIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleP = prog(frame, 0, 18, EASE.pop);
  return (
    <AbsoluteFill style={{ backgroundColor: M.bg0, justifyContent: "center", alignItems: "center" }}>
      <div style={{ fontFamily: MF.sans, fontWeight: 900, fontSize: 110, color: M.ink,
        opacity: titleP, transform: `scale(${interpolate(titleP, [0, 1], [1.3, 1])})` }}>
        5个方法
      </div>
      <div style={{ fontFamily: MF.sans, fontWeight: 700, fontSize: 56, color: M.green, marginTop: 16,
        opacity: prog(frame, 16, 14) }}>
        把自己从坑里捞出来
      </div>
      <div style={{ display: "flex", gap: 28, marginTop: 70 }}>
        {[1, 2, 3, 4, 5].map((n, i) => {
          const p = pop(frame, 30 + i * 8, fps, 11, 0.5);
          return (
            <div key={n} style={{ width: 90, height: 90, borderRadius: "50%", background: M.gold,
              color: M.paper, fontFamily: MF.sans, fontWeight: 900, fontSize: 50,
              display: "flex", justifyContent: "center", alignItems: "center",
              opacity: p.opacity, transform: `scale(${p.scale})` }}>{n}</div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const MindsetShowcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: M.bg0 }}>
      <Audio src={staticFile("mindset/audio/narration.mp3")} />
      {/* #1 瘫坐看盘 0-150 */}
      <Sequence from={0} durationInFrames={150}>
        <Pic src="p01.png" dur={150} pan="in" />
        <Sub text="不敢开仓，赚了心慌，亏了崩溃" delay={10} />
      </Sequence>
      {/* #2 攀台阶遇坎 150-312 */}
      <Sequence from={150} durationInFrames={162}>
        <Pic src="p03.png" dur={162} pan="in" />
        <Sub text="这不是终点，是进阶最关键的一道坎" delay={8} />
      </Sequence>
      {/* #3 暴雨重生 + 三词划掉 312-504 */}
      <Sequence from={312} durationInFrames={192}>
        <Pic src="p02.png" dur={192} pan="out" />
        <ThreeStrike />
        <Sub text="市场帮你清零重洗" delay={6} />
      </Sequence>
      {/* #4 台阶跃升 概念动效 504-672 */}
      <Sequence from={504} durationInFrames={168}>
        <StepRise />
      </Sequence>
      {/* #5 五方法预告 672-985 */}
      <Sequence from={672} durationInFrames={313}>
        <FiveIntro />
        <Sub text="五个方法，对应五个核心卡点" delay={20} />
      </Sequence>
    </AbsoluteFill>
  );
};
