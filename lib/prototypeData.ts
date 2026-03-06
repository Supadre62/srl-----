export interface ThemeItem {
  id: string;
  subject: string;
  theme: string;
  focus: string;
  htmlFile: string;
}

export const themePool: ThemeItem[] = [
  { id: 'MATH-01', subject: '数学', theme: '分数与整体占比', focus: '比较“部分/整体”关系', htmlFile: 'course-theme-pool/math-fraction.html' },
  { id: 'PHY-01', subject: '物理', theme: '力与平衡', focus: '识别受力变化下的平衡条件', htmlFile: 'course-theme-pool/physics-force.html' },
  { id: 'CHE-01', subject: '化学', theme: '溶液浓度变化', focus: '浓度与体积同时变化时的判断', htmlFile: 'course-theme-pool/chemistry-solution.html' },
  { id: 'BIO-01', subject: '生物', theme: '生态系统关系', focus: '在干扰信息中定位关键变量', htmlFile: 'course-theme-pool/biology-ecosystem.html' },
  { id: 'CHI-01', subject: '语文', theme: '主旨与细节', focus: '区分主题句与修饰细节', htmlFile: 'course-theme-pool/chinese-mainidea.html' },
  { id: 'ENG-01', subject: '英语', theme: '阅读推断', focus: '证据句定位与推断一致性', htmlFile: 'course-theme-pool/english-inference.html' },
  { id: 'HIS-01', subject: '历史', theme: '事件因果链', focus: '前因后果与时序辨析', htmlFile: 'course-theme-pool/history-causality.html' },
  { id: 'GEO-01', subject: '地理', theme: '区域比较', focus: '多因素条件下的区域判断', htmlFile: 'course-theme-pool/geography-region.html' },
  { id: 'CS-01', subject: '信息科技', theme: '算法步骤', focus: '顺序执行与分支判断', htmlFile: 'course-theme-pool/cs-algorithm.html' },
  { id: 'ECO-01', subject: '经济', theme: '供需变化', focus: '需求与供给同时变化的判断', htmlFile: 'course-theme-pool/economics-supply-demand.html' },
];

export const randomTheme = () => {
  const index = Math.floor(Math.random() * themePool.length);
  return themePool[index];
};
