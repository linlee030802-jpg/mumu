// 《交易心态自救》完整片 - 苹果质感版（水彩图打底+暖玻璃悬浮卡+超大字模糊上浮+极慢缓动，无跟读字幕）
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { AppleScene } from "./AppleScene";
import { RealClip } from "./RealClip";

export const MindsetFull: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#F2E9D6" }}>
      <Audio src={staticFile("mindset/audio/narration.mp3")} />

      {/* ===== 开场 0-984 ===== */}
      <Sequence from={0} durationInFrames={372}>
        <RealClip src="trader2.mp4" dur={372} title="不敢开仓" cardTop="赚了心慌，亏了崩溃" />
      </Sequence>
      <Sequence from={372} durationInFrames={328}>
        <AppleScene img="p02.png" dur={328} title="清零重洗" cardTop="市场帮你做的一件事" cardSub="错误认知 · 浮躁心态 · 侥幸习惯" />
      </Sequence>
      <Sequence from={700} durationInFrames={284}>
        <AppleScene img="p03.png" dur={284} title="进阶的坎" cardMain="5 个方法" cardSub="把自己从坑里捞出来" />
      </Sequence>

      {/* ===== 方法① 消灭宿命感 984-2280 ===== */}
      <Sequence from={984} durationInFrames={216}>
        <AppleScene img="p04.png" dur={216} chapter="方法 01" title="消灭宿命感" />
      </Sequence>
      <Sequence from={1200} durationInFrames={500}>
        <AppleScene img="p05.png" dur={500} title="不是命" cardTop="无力感的真相" cardMain="能力配不上欲望" />
      </Sequence>
      <Sequence from={1700} durationInFrames={580}>
        <AppleScene img="p06.png" dur={580} title="把预期降下来" cardMain="赚看得懂的钱" cardSub="正反馈一点点堆出来" />
      </Sequence>

      {/* ===== 方法② 大胆认输 2280-3714 ===== */}
      <Sequence from={2280} durationInFrames={220}>
        <AppleScene img="p07.png" dur={220} chapter="方法 02" title="大胆认输" />
      </Sequence>
      <Sequence from={2500} durationInFrames={600}>
        <AppleScene img="p07.png" dur={600} title="他敢认输" cardTop="周瑜诸葛耗死，司马懿赢" cardSub="守着节奏，熬到对面退" />
      </Sequence>
      <Sequence from={3100} durationInFrames={614}>
        <AppleScene img="p08.png" dur={614} title="单机模式" cardTop="从网游模式切换到" cardMain="盯自己的系统" />
      </Sequence>

      {/* ===== 方法③ 价值输出 3714-4938 ===== */}
      <Sequence from={3714} durationInFrames={236}>
        <AppleScene img="p09.png" dur={236} chapter="方法 03" title="去做价值输出" />
      </Sequence>
      <Sequence from={3950} durationInFrames={500}>
        <AppleScene img="p09.png" dur={500} title="从索取到给予" cardMain="帮新人少走弯路" />
      </Sequence>
      <Sequence from={4450} durationInFrames={488}>
        <RealClip src="think1.mp4" dur={488} title="很稳的底气" cardTop="像银行里有存款" cardSub="暂时取不出，但不慌" />
      </Sequence>

      {/* ===== 方法④ 把失败讲出来 4938-6321 ===== */}
      <Sequence from={4938} durationInFrames={242}>
        <AppleScene img="p10.png" dur={242} chapter="方法 04" title="把失败讲出来" />
      </Sequence>
      <Sequence from={5180} durationInFrames={570}>
        <AppleScene img="p10.png" dur={570} title="换个视角" cardTop="躲屋里复盘是失败者" cardMain="讲给新人就是分享者" />
      </Sequence>
      <Sequence from={5750} durationInFrames={571}>
        <AppleScene img="p10.png" dur={571} title="是你的勋章" cardSub="踩过的坑，不丢人" />
      </Sequence>

      {/* ===== 方法⑤ 给身体充能 6321-7512 ===== */}
      <Sequence from={6321} durationInFrames={239}>
        <AppleScene img="p11.png" dur={239} chapter="方法 05" title="给身体充能" />
      </Sequence>
      <Sequence from={6560} durationInFrames={490}>
        <RealClip src="trader1.mp4" dur={490} title="是身体垮了" cardTop="心态崩，往往不是策略" />
      </Sequence>
      <Sequence from={7050} durationInFrames={462}>
        <RealClip src="walk1.mp4" dur={462} title="四个小方法" cardSub="晒太阳 · 坐直 · 走路 · 睡好觉" />
      </Sequence>

      {/* ===== 收尾 7512-8610 ===== */}
      <Sequence from={7512} durationInFrames={438}>
        <AppleScene img="p12.png" dur={438} title="真正决定你的" cardMain="是心气" />
      </Sequence>
      <Sequence from={7950} durationInFrames={400}>
        <AppleScene img="p12.png" dur={400} title="低谷是来筛选你的" cardSub="筛剩的，是真能赚钱的系统" />
      </Sequence>
      <Sequence from={8350} durationInFrames={260}>
        <RealClip src="sunrise1.mp4" dur={260} title="权知道" cardSub="评论区聊聊，下期见" />
      </Sequence>
    </AbsoluteFill>
  );
};
