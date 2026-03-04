import { caseDatabase, drawRandomCaseId, findCaseById, pendingCaseId } from '../data/caseDatabase';
import {
  AudioSlotId,
  CaseProfile,
  FlowNode,
  ImageSlotId,
  SrlQuestionGroup,
  SrlSelection,
  StageDefinition,
  TaskIntroConfig,
  TaskQuestion,
} from '../types/assessment';

export const appMeta = {
  title: '任务型 SRL 测评 Demo',
  subtitle: '线上引导 + 线下纸面作答 + 线上证据回收',
};

export const stageDefinitions: StageDefinition[] = [
  {
    id: 'stage1',
    shortTitle: '阶段1',
    title: '任务启动',
    description: '任务概览与前置 SRL',
    lockAfterLeave: true,
    supportTips: ['先确认任务标题和整体流程。', '前置 SRL 放在教学前。'],
    todoItems: ['查看流程说明', '完成前置 SRL（录音优先）'],
  },
  {
    id: 'stage2',
    shortTitle: '阶段2',
    title: '教学与整理',
    description: '教学输入后进行整理',
    supportTips: ['本阶段不进入正式任务作答。', '整理阶段以草稿纸复盘为主。'],
    todoItems: ['观看教学内容', '完成教学确认', '进入整理阶段（可不填内容）'],
  },
  {
    id: 'stage3',
    shortTitle: '阶段3',
    title: '任务执行',
    description: '纸面作答：Q1-Q2 -> Q3录音 -> 中段SRL -> Q4-Q6 -> 结束',
    supportTips: ['网页仅做任务引导，不进行在线选项作答。', 'Q3 必须先完成 think-aloud 录音占位。'],
    todoItems: ['按纸面完成 Q1-Q2', '在 Q3 开启 think-aloud 录音', '完成中段 SRL 后继续纸面完成 Q4-Q6'],
  },
  {
    id: 'stage4',
    shortTitle: '阶段4',
    title: '后置反思',
    description: '后置 SRL、图片上传与等待分析',
    supportTips: ['后置 SRL 在任务结束之后。', '上传答题纸和草稿纸后进入等待分析。'],
    todoItems: ['完成后置 SRL（录音优先）', '上传答题纸与草稿纸', '进入等待报告输出页面'],
  },
];

export const workflowNodes: FlowNode[] = [
  { id: 'stage1_overview', stageId: 'stage1', title: '任务标题与整体流程', nextLabel: '进入前置 SRL' },
  { id: 'stage1_pre_srl', stageId: 'stage1', title: '前置 SRL 问题', nextLabel: '进入教学阶段' },

  { id: 'stage2_teach_video', stageId: 'stage2', title: '教学输入', nextLabel: '进入教学确认' },
  { id: 'stage2_teach_check', stageId: 'stage2', title: '教学确认与下载', nextLabel: '进入整理时间' },
  { id: 'stage2_organize', stageId: 'stage2', title: '自主整理（草稿复盘）', nextLabel: '进入任务执行' },

  { id: 'stage3_q1_direct', stageId: 'stage3', title: '任务开始（Q1-Q2）', nextLabel: '进入 Q3 录音' },
  { id: 'stage3_q3_conflict_think', stageId: 'stage3', title: 'Q3 Think-Aloud 录音', nextLabel: '进入中段 SRL' },
  { id: 'stage3_mid_srl', stageId: 'stage3', title: '中段 SRL 问题', nextLabel: '进入任务中（Q4-Q6）' },
  { id: 'stage3_q4_variation_a', stageId: 'stage3', title: '任务中（Q4-Q6）', nextLabel: '完成任务执行' },
  { id: 'stage3_result', stageId: 'stage3', title: '答题结束', nextLabel: '进入后置 SRL' },

  { id: 'stage4_post_srl', stageId: 'stage4', title: '后置 SRL 与图片上传', nextLabel: '进入提交检查' },
  { id: 'stage4_submit', stageId: 'stage4', title: '提交前检查', nextLabel: '进入等待分析' },
  { id: 'stage4_waiting', stageId: 'stage4', title: '等待报告输出', nextLabel: '查看示例报告' },

  { id: 'result_report', stageId: 'result', title: '叙事式报告', hideNavigation: true },
];

export const taskIntroConfig: TaskIntroConfig = {
  heading: '欢迎进入任务型 SRL 测评',
  description: '网页负责流程引导、SRL问题展示、音频和图片证据回收；正式作答在纸面完成。',
  flowSummary: ['任务标题与流程', '前置 SRL', '教学与整理', '纸面执行任务（含Q3录音）', '后置 SRL 与上传', '等待分析与报告'],
  completionCriteria: ['完成前/中/后 SRL（录音优先）', '纸面完成全部题目', '完成证据上传（音频、图片）'],
  scratchpadHint: '请准备草稿纸，建议在整理阶段和任务阶段都使用。',
  downloadHint: '教学材料和任务材料均支持下载与打印。',
  warning: '进入下一阶段后，阶段1不可回退。',
};

export const responseKeys = {
  pre: 'srl_pre_text',
  organize: 'organize_text',
  mid: 'srl_mid_text',
  post: 'srl_post_text',
} as const;

export const voiceKeys = {
  pre: 'voice_pre',
  organize: 'voice_organize',
  mid: 'voice_mid',
  post: 'voice_post',
  thinkQ3: 'voice_think_q3',
} as const;

export const audioSlotLabels: Record<AudioSlotId, string> = {
  pre: '前置 SRL 音频',
  organize: '整理阶段音频',
  mid: '中段 SRL 音频',
  post: '后置 SRL 音频',
  thinkQ3: '第三题 Think-Aloud 音频',
};

export const imageSlotLabels: Record<ImageSlotId, string> = {
  answerSheet: '答题纸图片',
  scratchSheet: '草稿纸图片',
};

export const organizationSamples = ['先写出题目要比较的关键量。', '把“先看整体再看局部”写成检查步骤。', '每题结束后用一句话复述判断依据。'];

export const dimensionNames = [
  '目标建构',
  '认知加工',
  '元认知',
  '动机调节',
  '情绪调节',
  '行为执行',
  '情境与资源',
  '自我信念',
  '反馈与迁移',
  '社会调节',
];

export const getCaseById = (caseId: string): CaseProfile => findCaseById(caseId);

export const pickInitialCaseId = (): string => drawRandomCaseId();

export const getPendingCaseId = (): string => pendingCaseId;

export const getCaseOptions = (): CaseProfile[] => caseDatabase;

const prePool = [
  '等会儿你一开始准备先看哪里？',
  '你觉得这次任务要做到什么，才算完成？',
  '你觉得这次最重要的是做对哪一步？',
  '如果做到一半你不太确定，你准备先做什么？',
  '你打算怎么用这张草稿纸帮自己？',
  '你觉得自己学这种新内容时，通常先靠什么来弄明白？',
  '你现在觉得这次任务是有点简单、差不多、还是有点难？为什么？',
];

const midPool = [
  '刚才你先看了哪一步，才决定答案的？',
  '刚才哪一刻你有点拿不准？',
  '是哪一部分最容易把你带偏？',
  '你后来怎么把自己拉回来的？',
  '你现在做题和刚开始比，有没有哪里变了？',
  '到现在为止，哪一步最容易让你急、烦，或者不想继续？',
  '后面的题你准备提醒自己注意什么？',
];

const postPool = [
  '现在做完了，你觉得这种题最重要的是看什么？',
  '哪一类最容易看偏？为什么？',
  '如果教下一个小朋友做，你会先提醒他哪一句话？',
  '你后面做题的时候，有没有方法跟前面不一样？',
  '这次哪一刻你最不想继续？你后来是怎么继续下去的？',
  '如果下次再遇到很像的任务，你觉得自己最该先做什么？',
];

const sampleUnique = (pool: string[], count: number): string[] => {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(count, copy.length));
};

export const pickSrlQuestions = (config: { pre: number; mid: number; post: number }): SrlSelection => ({
  pre: sampleUnique(prePool, config.pre),
  mid: sampleUnique(midPool, config.mid),
  post: sampleUnique(postPool, config.post),
});

export const buildSrlGroups = (selection: SrlSelection): Record<'pre' | 'mid' | 'post', SrlQuestionGroup> => ({
  pre: {
    id: 'pre',
    title: '前置 SRL 问题',
    description: '教学前先表达你的计划和关注点。',
    mode: '题库抽题',
    questions: selection.pre,
    answerPlaceholder: '可选文字；推荐先录音，录音后可不填。',
  },
  mid: {
    id: 'mid',
    title: '中段 SRL 问题',
    description: '任务中记录你的监控和修正。',
    mode: '题库抽题',
    questions: selection.mid,
    answerPlaceholder: '可选文字；推荐先录音，录音后可不填。',
  },
  post: {
    id: 'post',
    title: '后置 SRL 问题',
    description: '结果后进行复盘与迁移总结。',
    mode: '题库抽题',
    questions: selection.post,
    answerPlaceholder: '可选文字；推荐先录音，录音后可不填。',
  },
});

const replaceSP = (text: string, systemPrompt: string): string => text.replace(/\{SP\}/g, systemPrompt.trim() || '系统提示词');

export const getTaskQuestionsByCase = (caseId: string, systemPrompt: string): TaskQuestion[] =>
  getCaseById(caseId).taskQuestions.map((q) => ({
    ...q,
    prompt: replaceSP(q.prompt, systemPrompt),
  }));

export const getTaskQuestionByIndex = (caseId: string, systemPrompt: string, index: number): TaskQuestion | undefined =>
  getTaskQuestionsByCase(caseId, systemPrompt)[index];
