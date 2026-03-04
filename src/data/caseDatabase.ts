import { CaseProfile } from '../types/assessment';

const pendingCase: CaseProfile = {
  id: 'case_pending',
  title: '案例待定（题库占位）',
  isPending: true,
  taskGoal: '当前为案例待定模式。后续由教研补充或替换题库内容。',
  taskDescription: '该模式保留流程结构，展示固定题型递进顺序。',
  videoLesson: {
    title: '微课：案例待定',
    summary: '此处展示待定案例的教学输入区域。',
    placeholderText: '微课视频区域（后续接入）',
    exampleTitle: '示例讲解占位',
    exampleContent: '后续将替换为与案例对应的示例讲解。',
    checkPrompt: '你是否理解本次任务目标？',
    checkOptions: ['已理解', '还需要补充说明'],
  },
  teachingMaterials: [
    {
      id: 'teach_pending_bundle',
      kind: 'teaching',
      title: '教学材料（待定）',
      description: '后续由教研团队补充。',
      files: [
        {
          id: 'teach_pending_pdf',
          name: '教学 PDF（待定）',
          description: '当前为占位文件。',
          fileType: 'PDF',
          printHint: '可先使用默认模板打印。',
          mockUrl: '#',
        },
      ],
    },
  ],
  taskMaterials: [
    {
      id: 'task_pending_bundle',
      kind: 'task',
      title: '任务材料（待定）',
      description: '后续由教研团队补充。',
      files: [
        {
          id: 'task_pending_pdf',
          name: '任务 PDF（待定）',
          description: '当前为占位文件。',
          fileType: 'PDF',
          printHint: '可先在白纸完成后拍照上传。',
          mockUrl: '#',
        },
      ],
    },
  ],
  srlQuestions: {
    pre: ['开始任务前，你准备先关注哪些信息？'],
    mid: ['刚才哪一步最容易犹豫？你怎么修正？'],
    post: ['如果给下一位同学一句建议，你会说什么？'],
  },
  taskQuestions: [
    {
      id: 'pending_q1',
      type: 'direct',
      title: '直接应用题',
      requirement: '直接按规则完成判断。',
      prompt: '围绕系统提示词（SP）完成一次直接判断，并说明依据。',
      options: [
        { id: 'pending_q1_a', label: '按提示词逐步判断并给出理由' },
        { id: 'pending_q1_b', label: '只给结论，不说明过程' },
      ],
      correctOptionId: 'pending_q1_a',
    },
    {
      id: 'pending_q2',
      type: 'interference',
      title: '表面干扰题',
      requirement: '识别并排除无关干扰信息。',
      prompt: '题目中出现一个看似相关但实际无关的信息，你会如何处理？',
      options: [
        { id: 'pending_q2_a', label: '先识别干扰，再按规则判断' },
        { id: 'pending_q2_b', label: '直接按第一感觉作答' },
      ],
      correctOptionId: 'pending_q2_a',
    },
    {
      id: 'pending_q3',
      type: 'conflict',
      title: '规则冲突题',
      requirement: '线索冲突时进行监控与修正。',
      prompt: '当两个线索给出冲突结论时，你会如何重新检查？',
      options: [
        { id: 'pending_q3_a', label: '回到规则并逐步核对关键量' },
        { id: 'pending_q3_b', label: '保持原答案不再检查' },
      ],
      correctOptionId: 'pending_q3_a',
    },
    {
      id: 'pending_q4',
      type: 'variation',
      title: '变化题 A',
      requirement: '条件变化后保持判断标准。',
      prompt: '如果局部和整体都同时增加，你会先检查哪一个关系？',
      options: [
        { id: 'pending_q4_a', label: '先看局部在整体中的比例关系' },
        { id: 'pending_q4_b', label: '先看哪个局部数字更大' },
      ],
      correctOptionId: 'pending_q4_a',
    },
    {
      id: 'pending_q5',
      type: 'variation',
      title: '变化题 B',
      requirement: '在新条件下复用同一规则。',
      prompt: '如果整体减少但局部不变，你更应该关注什么？',
      options: [
        { id: 'pending_q5_a', label: '关注比例变化而不是局部绝对值' },
        { id: 'pending_q5_b', label: '只看局部是否变化' },
      ],
      correctOptionId: 'pending_q5_a',
    },
    {
      id: 'pending_q6',
      type: 'transfer',
      title: '迁移题',
      requirement: '迁移到新情境并复用策略。',
      prompt: '把当前规则迁移到新的场景，哪种做法更稳妥？',
      options: [
        { id: 'pending_q6_a', label: '先提炼通用步骤，再套用新场景' },
        { id: 'pending_q6_b', label: '只看表面相似点直接套答案' },
      ],
      correctOptionId: 'pending_q6_a',
    },
  ],
};

const ratioCaseA: CaseProfile = {
  id: 'case_ratio_a',
  title: '成分占整体：基础案例 A',
  taskGoal: '比较成分占整体比例，避免被局部绝对量误导。',
  taskDescription: '通过六题递进体验“直接应用 -> 干扰 -> 冲突 -> 变化 -> 变化 -> 迁移”。',
  videoLesson: {
    title: '微课：先看整体，再看成分',
    summary: '学习“比例判断”规则，不只看局部数字大小。',
    placeholderText: '微课视频区域（后续接入）',
    exampleTitle: '示例',
    exampleContent: 'A 杯 30/100，B 杯 40/160，A 杯占比更高。',
    checkPrompt: '你是否理解“绝对量大不代表占比高”？',
    checkOptions: ['理解了', '还需要再看一遍'],
  },
  teachingMaterials: [
    {
      id: 'teach_ratio_a',
      kind: 'teaching',
      title: '教学材料（案例A）',
      description: '比例规则与示例。',
      files: [
        {
          id: 'teach_ratio_a_pdf',
          name: '教学 PDF（案例A）',
          description: '用于学习规则和示例。',
          fileType: 'PDF',
          printHint: '建议打印后边看边标注。',
          mockUrl: '#',
        },
      ],
    },
  ],
  taskMaterials: [
    {
      id: 'task_ratio_a',
      kind: 'task',
      title: '任务材料（案例A）',
      description: '线下作答题纸。',
      files: [
        {
          id: 'task_ratio_a_pdf',
          name: '任务 PDF（案例A）',
          description: '线下作答并拍照上传。',
          fileType: 'PDF',
          printHint: '可单面打印，便于书写。',
          mockUrl: '#',
        },
      ],
    },
  ],
  srlQuestions: {
    pre: ['你准备先看哪里来判断占比？', '草稿纸你打算在什么时候用？'],
    mid: ['刚才哪一刻差点看错？你如何纠正？'],
    post: ['这类题最容易错在哪？你会怎么提醒别人？'],
  },
  taskQuestions: [
    {
      id: 'ratio_a_q1',
      type: 'direct',
      title: '直接应用题',
      requirement: '直接按比例规则判断。',
      prompt: '容器甲：24/80，容器乙：27/108。谁的占比更高？',
      options: [
        { id: 'ratio_a_q1_a', label: '容器甲更高' },
        { id: 'ratio_a_q1_b', label: '容器乙更高' },
      ],
      correctOptionId: 'ratio_a_q1_a',
    },
    {
      id: 'ratio_a_q2',
      type: 'interference',
      title: '表面干扰题',
      requirement: '排除“绝对量大”的干扰。',
      prompt: '样本X：18/60，样本Y：24/96。哪一个占比更高？',
      options: [
        { id: 'ratio_a_q2_a', label: '样本X更高' },
        { id: 'ratio_a_q2_b', label: '样本Y更高（因为24更大）' },
      ],
      correctOptionId: 'ratio_a_q2_a',
    },
    {
      id: 'ratio_a_q3',
      type: 'conflict',
      title: '规则冲突题',
      requirement: '面对冲突线索重新核对。',
      prompt: '同学说“乙的红色更多所以占比更高”，你该如何处理？',
      options: [
        { id: 'ratio_a_q3_a', label: '回到分子/分母比较后再判断' },
        { id: 'ratio_a_q3_b', label: '接受“更多就更高”的结论' },
      ],
      correctOptionId: 'ratio_a_q3_a',
    },
    {
      id: 'ratio_a_q4',
      type: 'variation',
      title: '变化题 A',
      requirement: '条件变化后保持判断标准。',
      prompt: '某容器加水后整体变大，颜色成分也变多。你先比较什么？',
      options: [
        { id: 'ratio_a_q4_a', label: '先比较成分/整体比例是否变化' },
        { id: 'ratio_a_q4_b', label: '先比较成分是否变多' },
      ],
      correctOptionId: 'ratio_a_q4_a',
    },
    {
      id: 'ratio_a_q5',
      type: 'variation',
      title: '变化题 B',
      requirement: '在新变化场景中复用规则。',
      prompt: '两个杯子都减少了总量，但减少幅度不同，如何比较占比？',
      options: [
        { id: 'ratio_a_q5_a', label: '仍按成分/整体比较，不按减少量直觉判断' },
        { id: 'ratio_a_q5_b', label: '谁减少得少就谁占比高' },
      ],
      correctOptionId: 'ratio_a_q5_a',
    },
    {
      id: 'ratio_a_q6',
      type: 'transfer',
      title: '迁移题',
      requirement: '迁移到新情境。',
      prompt: '把比例规则迁移到“果汁浓度比较”，先做哪一步？',
      options: [
        { id: 'ratio_a_q6_a', label: '先统一成“成分/总量”再比较' },
        { id: 'ratio_a_q6_b', label: '直接看颜色深浅下结论' },
      ],
      correctOptionId: 'ratio_a_q6_a',
    },
  ],
};

const ratioCaseB: CaseProfile = {
  ...ratioCaseA,
  id: 'case_ratio_b',
  title: '成分占整体：变式案例 B',
  taskQuestions: [
    {
      id: 'ratio_b_q1',
      type: 'direct',
      title: '直接应用题',
      requirement: '直接按比例规则判断。',
      prompt: '样本M：32/128，样本N：15/80。谁的占比更高？',
      options: [
        { id: 'ratio_b_q1_a', label: '样本M更高' },
        { id: 'ratio_b_q1_b', label: '样本N更高' },
      ],
      correctOptionId: 'ratio_b_q1_b',
    },
    {
      id: 'ratio_b_q2',
      type: 'interference',
      title: '表面干扰题',
      requirement: '排除无关线索。',
      prompt: '两杯液体颜色深浅不同，但给定比例是20/100和15/60，谁占比高？',
      options: [
        { id: 'ratio_b_q2_a', label: '20/100更高' },
        { id: 'ratio_b_q2_b', label: '15/60更高' },
      ],
      correctOptionId: 'ratio_b_q2_b',
    },
    {
      id: 'ratio_b_q3',
      type: 'conflict',
      title: '规则冲突题',
      requirement: '冲突情境下复查策略。',
      prompt: '如果“看起来更多”和“计算结果”冲突，你会怎么做？',
      options: [
        { id: 'ratio_b_q3_a', label: '以计算结果为主并复核步骤' },
        { id: 'ratio_b_q3_b', label: '以直觉感受为主' },
      ],
      correctOptionId: 'ratio_b_q3_a',
    },
    {
      id: 'ratio_b_q4',
      type: 'variation',
      title: '变化题 A',
      requirement: '条件变化下维持规则。',
      prompt: '如果总量翻倍，成分也增加，但增加比例不同，你先看什么？',
      options: [
        { id: 'ratio_b_q4_a', label: '先看各自成分在总量中的占比变化' },
        { id: 'ratio_b_q4_b', label: '先看成分增加量谁更多' },
      ],
      correctOptionId: 'ratio_b_q4_a',
    },
    {
      id: 'ratio_b_q5',
      type: 'variation',
      title: '变化题 B',
      requirement: '在变化场景继续复用策略。',
      prompt: '如果整体变小但局部不变，判断时应该优先看什么？',
      options: [
        { id: 'ratio_b_q5_a', label: '优先看局部在整体中的比例关系' },
        { id: 'ratio_b_q5_b', label: '优先看局部绝对值没变' },
      ],
      correctOptionId: 'ratio_b_q5_a',
    },
    {
      id: 'ratio_b_q6',
      type: 'transfer',
      title: '迁移题',
      requirement: '把策略迁移到不同主题。',
      prompt: '迁移到“班级男女比例比较”时，先看什么？',
      options: [
        { id: 'ratio_b_q6_a', label: '先看总人数，再看各自占比' },
        { id: 'ratio_b_q6_b', label: '只看人数差值大小' },
      ],
      correctOptionId: 'ratio_b_q6_a',
    },
  ],
};

export const caseDatabase: CaseProfile[] = [pendingCase, ratioCaseA, ratioCaseB];

export const pendingCaseId = pendingCase.id;

export const randomPoolCaseIds = caseDatabase.filter((item) => !item.isPending).map((item) => item.id);

export const findCaseById = (caseId: string): CaseProfile => caseDatabase.find((item) => item.id === caseId) ?? pendingCase;

export const drawRandomCaseId = (): string => {
  const pool = randomPoolCaseIds.length > 0 ? randomPoolCaseIds : [pendingCaseId];
  return pool[Math.floor(Math.random() * pool.length)];
};
