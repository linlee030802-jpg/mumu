// 金融危机科普片 - 全局主题（水彩美漫 / 小Lin说亮色讲解风）
export const C = {
  // 纸质暖底
  bg0: "#F5EFE2",      // 米白纸
  bg1: "#EFE7D6",      // 略深奶油
  paper: "#FBF7EE",    // 卡片纸面
  // 主色（复古水彩调）
  red: "#C0392B",      // 砖红警示
  gold: "#C8941E",     // 赭金
  teal: "#2E7D74",     // 墨绿青（涨）
  orange: "#D87A2B",   // 陶橙（跌/强调）
  blue: "#3A6EA5",     // 低饱和蓝
  // 文字
  ink: "#2B2620",      // 深棕墨（正文）
  dim: "#7A6F5E",      // 暖灰（次要）
  line: "#2B262022",   // 手绘描边淡色
  grid: "rgba(120,100,70,0.05)",
};

export const FONT = {
  // 中文圆润黑体 + 手写感等宽数字
  sans: '"PingFang SC","Microsoft YaHei","Noto Sans SC",sans-serif',
  mono: '"DIN Alternate","Roboto Mono","SF Mono",ui-monospace,monospace',
  hand: '"Bradley Hand","Comic Sans MS","PingFang SC",sans-serif',
};

// 千分位 + 单位格式化
export const fmt = (n: number, digits = 0) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
