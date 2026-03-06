export type SrlStage = 'pre' | 'mid' | 'post';

export interface TaskCard {
  code: string;
  type: string;
  prompt: string;
  focus: string;
  answerLines: number;
}

export interface ThemeItem {
  id: string;
  subject: string;
  theme: string;
  focus: string;
  summary: string;
  lessonGoal: string;
  storyPath: string;
  taskCards: TaskCard[];
}

export interface SrlQuestion {
  id: string;
  stage: SrlStage;
  text: string;
  dimensionHint: string;
}

export interface SrlSelection {
  pre: SrlQuestion[];
  mid: SrlQuestion[];
  post: SrlQuestion[];
}

const buildTaskCards = (items: Array<{ type: string; prompt: string; focus: string }>): TaskCard[] =>
  items.map((item, index) => ({
    code: `Q${index + 1}`,
    type: item.type,
    prompt: item.prompt,
    focus: item.focus,
    answerLines: 4,
  }));

const sharedTaskTypes = ['直接应用题', '表面干扰题', '规则冲突题（Think-Aloud）', '变化题 A', '变化题 B', '迁移题'] as const;

export const themePool: ThemeItem[] = [
  {
    id: 'MATH-01',
    subject: '数学',
    theme: '分数与整体占比',
    focus: '比较部分在整体中的占比，而不是只看显眼数量。',
    summary: '通过图形与数量场景理解“部分占整体多少”，练习从局部回到整体的比较规则。',
    lessonGoal: '学会在数量变化时仍坚持比较比例关系。',
    storyPath: 'course-theme-pool/math-fraction.html',
    taskCards: buildTaskCards([
      { type: sharedTaskTypes[0], prompt: '甲盘有 8 块饼干，其中 4 块是巧克力味；乙盘有 10 块饼干，其中 5 块是巧克力味。哪一盘巧克力味占整体更多？请写出理由。', focus: '识别最直接的比例关系。' },
      { type: sharedTaskTypes[1], prompt: 'A 盒里有 6 个蓝球和 2 个白球，B 盒里有 8 个蓝球和 4 个白球。虽然 B 盒蓝球更多，但哪一盒蓝球占整体更大？请说明。', focus: '抑制显眼数量干扰。' },
      { type: sharedTaskTypes[2], prompt: '饮料甲一共 12 份，果汁占 8 份；饮料乙一共 15 份，果汁占 9 份。请边想边说：哪种饮料里果汁占比更高？你是怎么判断的？', focus: '冲突情境中回到核心规则。' },
      { type: sharedTaskTypes[3], prompt: '一张图里红色原来占 3/8，后来红色增加到 4 份、整体增加到 10 份。变化后红色占整体是变大、变小还是不变？请写出判断过程。', focus: '保持规则稳定应用。' },
      { type: sharedTaskTypes[4], prompt: '甲盘从 2/5 变成 3/6，乙盘从 3/7 变成 4/8。变化后哪一盘的深色部分占比更大？请比较并说明。', focus: '复杂变化中保持一致标准。' },
      { type: sharedTaskTypes[5], prompt: '如果提醒下一位同学做“部分占整体”这类题，你会写一句什么提醒语？', focus: '将规则提炼为可迁移策略。' },
    ]),
  },
  {
    id: 'PHY-01',
    subject: '物理',
    theme: '力与平衡',
    focus: '判断多个力共同作用时的合力关系。',
    summary: '通过受力箭头和生活场景理解平衡，不被单一显眼方向带偏。',
    lessonGoal: '学会整合多个方向后再判断是否平衡。',
    storyPath: 'course-theme-pool/physics-force.html',
    taskCards: buildTaskCards([
      { type: sharedTaskTypes[0], prompt: '一个物体左边受 3 牛的力，右边也受 3 牛的力。这个物体会保持平衡吗？请写出理由。', focus: '识别直接平衡关系。' },
      { type: sharedTaskTypes[1], prompt: 'A 物体向右 5 牛、向左 4 牛；B 物体向右 3 牛、向左 2 牛。虽然 A 的箭头更长，但哪一个物体更接近平衡？', focus: '避免单线索判断。' },
      { type: sharedTaskTypes[2], prompt: '一辆小车同时受到向左 4 牛、向右 6 牛、向上 2 牛、向下 2 牛的力。请边想边说：小车最终最可能往哪个方向运动？', focus: '从直觉切换到合力规则。' },
      { type: sharedTaskTypes[3], prompt: '如果在原来平衡的物体上再增加一个向右 2 牛的力，平衡会怎样变化？请说明。', focus: '条件变化后的重评估。' },
      { type: sharedTaskTypes[4], prompt: '甲物体原来左右各 4 牛，后来变成左 5 牛右 6 牛；乙物体原来左右各 3 牛，后来变成左 4 牛右 4 牛。哪一个现在更平衡？', focus: '复杂变化中的规则稳定。' },
      { type: sharedTaskTypes[5], prompt: '给下一位同学写一句判断受力是否平衡的提醒。', focus: '形成可复用判断顺序。' },
    ]),
  },
  {
    id: 'CHE-01',
    subject: '化学',
    theme: '溶液浓度变化',
    focus: '比较浓度时同时考虑溶质质量与总体积。',
    summary: '从烧杯场景中理解“颜色深浅”与“真实浓度”的区别。',
    lessonGoal: '学会同时追踪部分变化与整体变化。',
    storyPath: 'course-theme-pool/chemistry-solution.html',
    taskCards: buildTaskCards([
      { type: sharedTaskTypes[0], prompt: '甲杯有 20 克糖溶在 100 毫升水里，乙杯有 30 克糖溶在 150 毫升水里。哪一杯更浓？请写出理由。', focus: '浓度基础判断。' },
      { type: sharedTaskTypes[1], prompt: 'A 杯颜色更深，但 A 杯里糖和水都更多；B 杯颜色更浅，但总体积更小。判断哪杯更浓时，你应该重点比较什么？', focus: '识别表面线索局限。' },
      { type: sharedTaskTypes[2], prompt: '甲杯有 24 克糖和 120 毫升水，乙杯有 30 克糖和 180 毫升水。请边想边说：哪一杯糖水更浓？', focus: '回到浓度定义本身。' },
      { type: sharedTaskTypes[3], prompt: '一杯 40 克糖溶在 200 毫升水里的糖水，再加入 100 毫升水后，浓度会怎样变化？请写出判断过程。', focus: '整体变化下规则应用。' },
      { type: sharedTaskTypes[4], prompt: '甲杯先加 10 克糖又加 50 毫升水，乙杯只加 50 毫升水。变化后哪一杯更浓？请说明。', focus: '双变化下稳定比较。' },
      { type: sharedTaskTypes[5], prompt: '写一句提醒别人比较浓度时不要看错的策略。', focus: '形成迁移语句。' },
    ]),
  },
  {
    id: 'BIO-01',
    subject: '生物',
    theme: '生态系统关系',
    focus: '在关系链中定位关键变量。',
    summary: '通过生态故事理解“数量变化”与“关系变化”的差别。',
    lessonGoal: '学会先看关系链，再解释显眼变化。',
    storyPath: 'course-theme-pool/biology-ecosystem.html',
    taskCards: buildTaskCards([
      { type: sharedTaskTypes[0], prompt: '草、兔、狐组成一条食物链。如果草减少，最先直接受影响的是哪一种生物？请说明理由。', focus: '关系链基础识别。' },
      { type: sharedTaskTypes[1], prompt: '某片森林里狐狸数量突然减少，这是不是一定说明狐狸才是生态变化的主要原因？请写出你的判断。', focus: '区分现象与原因。' },
      { type: sharedTaskTypes[2], prompt: '湖里水草减少、虾减少、小鱼也减少。请边想边说：你会先从哪一层关系开始判断，为什么？', focus: '冲突中回到关键关系。' },
      { type: sharedTaskTypes[3], prompt: '如果先增加水草，再过一段时间观察虾和小鱼，关系链最可能出现什么变化？请说明。', focus: '变化后重建关系链。' },
      { type: sharedTaskTypes[4], prompt: '如果水温升高，同时小鱼的天敌减少，判断小鱼数量变化时要同时考虑哪两个方面？', focus: '复杂情境稳定判断。' },
      { type: sharedTaskTypes[5], prompt: '总结一句提醒别人分析生态关系时该先看什么的话。', focus: '形成可迁移规则。' },
    ]),
  },
  {
    id: 'CHI-01',
    subject: '语文',
    theme: '主旨与细节',
    focus: '区分中心意思与吸引注意的细节。',
    summary: '在阅读中建立“先抓主旨，再回看细节”的顺序。',
    lessonGoal: '避免被生动细节直接带偏。',
    storyPath: 'course-theme-pool/chinese-mainidea.html',
    taskCards: buildTaskCards([
      { type: sharedTaskTypes[0], prompt: '短文说：“小林每天放学后先整理书包，再把不会的题抄下来，第二天去问老师。一个月后，他发现自己不再总把错题忘掉。” 这段话最主要想说明什么？', focus: '中心信息识别。' },
      { type: sharedTaskTypes[1], prompt: '一段文章里最生动的句子最容易吸引注意，但它不一定就是主旨。遇到这种情况时，你会先找哪一类句子来判断中心？', focus: '细节与主旨区分。' },
      { type: sharedTaskTypes[2], prompt: '阅读材料时，如果细节很多、每句都像重点，请边想边说：你会怎样把注意力拉回主旨？', focus: '冲突阅读中的自我监控。' },
      { type: sharedTaskTypes[3], prompt: '换一段新材料后，你怎样快速判断主旨有没有变化？请写出你的做法。', focus: '跨材料规则稳定。' },
      { type: sharedTaskTypes[4], prompt: '如果一段文章里加入了两句很吸引人的干扰句，你会怎样避免被带偏？', focus: '干扰条件下稳定决策。' },
      { type: sharedTaskTypes[5], prompt: '写一句提醒别人阅读时先抓主旨的话。', focus: '形成迁移策略。' },
    ]),
  },
  {
    id: 'ENG-01',
    subject: '英语',
    theme: '阅读推断',
    focus: '先找证据句，再推断结论。',
    summary: '建立“证据支持”而非“凭感觉”的推断习惯。',
    lessonGoal: '提升证据驱动的阅读判断能力。',
    storyPath: 'course-theme-pool/english-inference.html',
    taskCards: buildTaskCards([
      { type: sharedTaskTypes[0], prompt: '短文说：“Tom put on his raincoat and took an umbrella before leaving home.” 根据这句话，你最合理的推断是什么？请说明依据。', focus: '证据-结论映射。' },
      { type: sharedTaskTypes[1], prompt: '如果题目里出现你很熟悉的单词，但它和真正证据不在同一句里，你应该怎样避免被这个熟词带偏？', focus: '识别熟悉词干扰。' },
      { type: sharedTaskTypes[2], prompt: '当一篇短文里的线索分散在前后两句时，请边想边说：你会怎样把证据拼起来再做推断？', focus: '冲突信息下证据回溯。' },
      { type: sharedTaskTypes[3], prompt: '换一个新段落后，如果人物情绪发生了变化，你怎样重新找出支持推断的证据句？', focus: '跨文本规则稳定。' },
      { type: sharedTaskTypes[4], prompt: '当一题里同时给出两条可能互相竞争的线索时，你会怎样决定哪条更值得相信？', focus: '多证据整合。' },
      { type: sharedTaskTypes[5], prompt: '总结一句提醒别人做英语阅读推断时要先做什么的话。', focus: '形成可迁移阅读策略。' },
    ]),
  },
  {
    id: 'HIS-01',
    subject: '历史',
    theme: '事件因果链',
    focus: '区分时间先后与真实因果。',
    summary: '从事件链中识别关键转折点和主要驱动因素。',
    lessonGoal: '学会“先找因果，再看时序”的分析方式。',
    storyPath: 'course-theme-pool/history-causality.html',
    taskCards: buildTaskCards([
      { type: sharedTaskTypes[0], prompt: '一项新税收政策公布后，商人减少远途贸易。这里最直接的因果关系是什么？请写出理由。', focus: '因果基础判断。' },
      { type: sharedTaskTypes[1], prompt: '一件事先发生，并不一定就是后面结果的主因。遇到这种题时，你会怎样区分“先后顺序”和“真正原因”？', focus: '时序与因果分离。' },
      { type: sharedTaskTypes[2], prompt: '某地先遇到干旱，后来粮价上涨，再后来出现人口流动。请边想边说：你会怎样找出真正的关键转折点？', focus: '冲突中定位关键节点。' },
      { type: sharedTaskTypes[3], prompt: '如果补充一条“朝廷随后发放赈济粮”的新信息，你会怎样重排这条因果链？', focus: '条件变化后重构逻辑。' },
      { type: sharedTaskTypes[4], prompt: '当战争、税收和气候三种因素同时变化时，你会怎样判断哪一个更可能是主因？', focus: '复杂情境稳定分析。' },
      { type: sharedTaskTypes[5], prompt: '写一句提醒别人分析历史因果时不要只看时间先后的话。', focus: '形成迁移性分析框架。' },
    ]),
  },
  {
    id: 'GEO-01',
    subject: '地理',
    theme: '区域比较',
    focus: '多条件综合比较区域差异。',
    summary: '避免只看单一显眼指标，建立多条件比较顺序。',
    lessonGoal: '形成稳定的区域比较框架。',
    storyPath: 'course-theme-pool/geography-region.html',
    taskCards: buildTaskCards([
      { type: sharedTaskTypes[0], prompt: '甲地年平均气温高、降水适中；乙地年平均气温略低、降水很多。比较两地农业条件时，你会先看哪两个基本条件？', focus: '基础区域差异识别。' },
      { type: sharedTaskTypes[1], prompt: '一张图里甲地人口最多，但比较区域发展时，人口多就一定代表发展更好吗？请说明。', focus: '单指标干扰识别。' },
      { type: sharedTaskTypes[2], prompt: '比较两个区域时，如果气候、地形和交通给出的线索互相冲突，请边想边说：你会按什么顺序判断？', focus: '冲突条件下综合比较。' },
      { type: sharedTaskTypes[3], prompt: '如果给甲地新增“临海港口”这一条件，你会怎样重新判断它的发展优势？', focus: '变化下重建比较框架。' },
      { type: sharedTaskTypes[4], prompt: '当地形、降水和人口同时变化时，你怎样避免只盯住一个最显眼的数据？', focus: '复杂条件稳定判断。' },
      { type: sharedTaskTypes[5], prompt: '总结一句提醒别人做区域比较题时该先看什么的话。', focus: '形成迁移策略。' },
    ]),
  },
  {
    id: 'CS-01',
    subject: '信息科技',
    theme: '算法步骤',
    focus: '区分顺序执行、条件判断与分支。',
    summary: '通过流程图理解“视觉顺序”不等于“执行顺序”。',
    lessonGoal: '形成“先看条件，再走分支”的习惯。',
    storyPath: 'course-theme-pool/cs-algorithm.html',
    taskCards: buildTaskCards([
      { type: sharedTaskTypes[0], prompt: '一个流程要求“先输入密码，再点击确认，最后进入主页”。请写出正确的执行顺序。', focus: '顺序执行基础。' },
      { type: sharedTaskTypes[1], prompt: '在流程图里，某个框画得更靠前，不一定表示先执行。遇到这种情况时，你会先找什么来判断顺序？', focus: '视觉顺序干扰识别。' },
      { type: sharedTaskTypes[2], prompt: '一个程序判断“如果分数大于 90 就显示 A，否则显示 B”。请边想边说：你会怎样根据条件决定走哪条分支？', focus: '条件驱动路径选择。' },
      { type: sharedTaskTypes[3], prompt: '如果输入值从 85 改成 92，这个流程的结果会怎么变？请说明判断过程。', focus: '条件变化下重决策。' },
      { type: sharedTaskTypes[4], prompt: '当流程里同时出现两个条件判断时，你会怎样一步一步确定执行路径？', focus: '复杂分支稳定执行。' },
      { type: sharedTaskTypes[5], prompt: '写一句提醒别人看流程图时不要只看图上位置的话。', focus: '形成迁移化算法思维。' },
    ]),
  },
  {
    id: 'ECO-01',
    subject: '经济',
    theme: '供需变化',
    focus: '同时观察供给和需求，不只盯价格。',
    summary: '通过市场场景建立“先看供需，再解释价格”的顺序。',
    lessonGoal: '提升双变量情境下的稳定分析能力。',
    storyPath: 'course-theme-pool/economics-supply-demand.html',
    taskCards: buildTaskCards([
      { type: sharedTaskTypes[0], prompt: '水果店里同样的苹果，需求增加而供给不变时，价格最可能怎么变化？请说明。', focus: '供需基础判断。' },
      { type: sharedTaskTypes[1], prompt: '价格上涨很显眼，但它不一定就是原因本身。看到价格变化时，你会先回头看哪两个变量？', focus: '价格表象干扰识别。' },
      { type: sharedTaskTypes[2], prompt: '某商品同时出现“工厂减产”和“顾客购买意愿下降”两种变化。请边想边说：你会怎样分析最后的价格趋势？', focus: '冲突中回到双变量逻辑。' },
      { type: sharedTaskTypes[3], prompt: '如果政府补贴生产者，供给增加，而需求不变，你会怎样重新判断价格变化？', focus: '变化条件下重建分析。' },
      { type: sharedTaskTypes[4], prompt: '当政策、天气和消费者偏好同时变化时，你怎样避免只看其中一个因素？', focus: '复杂情境稳定性。' },
      { type: sharedTaskTypes[5], prompt: '总结一句提醒别人分析供需题时先看什么的话。', focus: '形成迁移性分析策略。' },
    ]),
  },
];

export const srlPools: Record<SrlStage, SrlQuestion[]> = {
  pre: [
    { id: 'pre-1', stage: 'pre', text: '等会儿你一开始准备先看哪里？', dimensionHint: '目标建构 / 认知加工' },
    { id: 'pre-2', stage: 'pre', text: '你觉得这次任务要做到什么，才算完成？', dimensionHint: '目标建构' },
    { id: 'pre-3', stage: 'pre', text: '你觉得这次最重要的是先做对哪一步？', dimensionHint: '目标建构 / 策略意识' },
    { id: 'pre-4', stage: 'pre', text: '如果做到一半你不太确定，你准备先做什么？', dimensionHint: '元认知前置 / 行为执行' },
    { id: 'pre-5', stage: 'pre', text: '你打算怎么用这张草稿纸帮助自己？', dimensionHint: '情境与资源 / 行为执行' },
    { id: 'pre-6', stage: 'pre', text: '你学这类新内容时通常先靠什么弄明白？', dimensionHint: '自我信念 / 认知加工' },
    { id: 'pre-7', stage: 'pre', text: '你现在觉得这次任务是简单、适中还是偏难？为什么？', dimensionHint: '动机调节 / 情绪调节' },
  ],
  mid: [
    { id: 'mid-1', stage: 'mid', text: '刚才你先看了哪一步，才决定答案的？', dimensionHint: '认知加工 / 元认知' },
    { id: 'mid-2', stage: 'mid', text: '刚才哪一刻你有点拿不准？', dimensionHint: '元认知 / 情绪调节' },
    { id: 'mid-3', stage: 'mid', text: '是哪一部分最容易把你带偏？', dimensionHint: '元认知 / 认知加工' },
    { id: 'mid-4', stage: 'mid', text: '你后来怎么把自己拉回来的？', dimensionHint: '元认知 / 动机调节' },
    { id: 'mid-5', stage: 'mid', text: '你现在做题和刚开始比，有哪里变了？', dimensionHint: '反馈迁移 / 自我信念' },
    { id: 'mid-6', stage: 'mid', text: '到现在为止，哪一步最容易让你急或烦？', dimensionHint: '情绪调节 / 动机调节' },
    { id: 'mid-7', stage: 'mid', text: '后面的题你准备提醒自己注意什么？', dimensionHint: '反馈迁移 / 行为执行' },
  ],
  post: [
    { id: 'post-1', stage: 'post', text: '现在做完了，你觉得这类题最重要看什么？', dimensionHint: '认知加工 / 元认知' },
    { id: 'post-2', stage: 'post', text: '哪一类最容易看偏？为什么？', dimensionHint: '元认知 / 情绪调节' },
    { id: 'post-3', stage: 'post', text: '如果教下一个小朋友做，你会先提醒他哪一句话？', dimensionHint: '反馈迁移 / 社会调节' },
    { id: 'post-4', stage: 'post', text: '你后面做题的方法和前面有不一样吗？', dimensionHint: '元认知 / 自我信念' },
    { id: 'post-5', stage: 'post', text: '这次哪一刻你最不想继续？你后来怎么继续下去的？', dimensionHint: '动机调节 / 情绪调节' },
    { id: 'post-6', stage: 'post', text: '下次再遇到类似任务，你觉得自己最该先做什么？', dimensionHint: '反馈迁移 / 目标建构' },
  ],
};

const hashSeed = (seed: string) => {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
};

const mulberry32 = (seed: number) => {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let current = Math.imul(value ^ (value >>> 15), 1 | value);
    current ^= current + Math.imul(current ^ (current >>> 7), 61 | current);
    return ((current ^ (current >>> 14)) >>> 0) / 4294967296;
  };
};

const seededShuffle = <T,>(input: T[], seed: string) => {
  const result = [...input];
  const random = mulberry32(hashSeed(seed));
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
};

export const pickThemeBySession = (sessionId: string): ThemeItem => {
  const index = hashSeed(`theme:${sessionId}`) % themePool.length;
  return themePool[index];
};

export const getThemeById = (themeId: string): ThemeItem | null => {
  const theme = themePool.find((item) => item.id === themeId);
  return theme ?? null;
};

export const pickSrlSet = (seed: string): SrlSelection => ({
  pre: seededShuffle(srlPools.pre, `pre:${seed}`).slice(0, 4),
  mid: seededShuffle(srlPools.mid, `mid:${seed}`).slice(0, 3),
  post: seededShuffle(srlPools.post, `post:${seed}`).slice(0, 4),
});

export const createSessionId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `sid_${Date.now().toString(36)}_${randomPart}`;
};

export const randomTheme = () => {
  const index = Math.floor(Math.random() * themePool.length);
  return themePool[index];
};
