'use client';

import { useEffect, useMemo, useState } from 'react';
import AudioRecorderCard, { RecordingStatus } from '@/components/prototype/AudioRecorderCard';
import ImageUploadCard from '@/components/prototype/ImageUploadCard';
import MicroCourseCard from '@/components/prototype/MicroCourseCard';
import PrintMaterialsCard from '@/components/prototype/PrintMaterialsCard';
import ProgressBar from '@/components/prototype/ProgressBar';
import SrlQuestionPage from '@/components/prototype/SrlQuestionPage';
import { disabledButtonClass, primaryButtonClass, secondaryButtonClass } from '@/lib/buttonStyles';
import {
  createSessionId,
  getThemeById,
  pickSrlSet,
  pickThemeBySession,
  SrlQuestion,
  SrlSelection,
  themePool,
} from '@/lib/prototypeData';

type StepId =
  | 'flow'
  | 'intro'
  | 'pre_srl_q1'
  | 'pre_srl_q2'
  | 'pre_srl_q3'
  | 'pre_srl_q4'
  | 'lesson'
  | 'print_materials'
  | 'organize'
  | 'task_q12'
  | 'task_q3_think'
  | 'mid_srl_q1'
  | 'mid_srl_q2'
  | 'mid_srl_q3'
  | 'task_q456'
  | 'task_done'
  | 'post_srl_q1'
  | 'post_srl_q2'
  | 'post_srl_q3'
  | 'post_srl_q4'
  | 'image_upload'
  | 'waiting'
  | 'report';

interface StepItem {
  id: StepId;
  title: string;
  stage: string;
}

const steps: StepItem[] = [
  { id: 'flow', title: '流程总览', stage: '阶段 1/4' },
  { id: 'intro', title: '任务说明', stage: '阶段 1/4' },
  { id: 'pre_srl_q1', title: '任务前 SRL 1/4', stage: '阶段 1/4' },
  { id: 'pre_srl_q2', title: '任务前 SRL 2/4', stage: '阶段 1/4' },
  { id: 'pre_srl_q3', title: '任务前 SRL 3/4', stage: '阶段 1/4' },
  { id: 'pre_srl_q4', title: '任务前 SRL 4/4', stage: '阶段 1/4' },
  { id: 'lesson', title: '微课学习', stage: '阶段 2/4' },
  { id: 'print_materials', title: '打印任务材料', stage: '阶段 2/4' },
  { id: 'organize', title: '自主整理（5 分钟）', stage: '阶段 3/4' },
  { id: 'task_q12', title: '任务开始（Q1-Q2）', stage: '阶段 4/4' },
  { id: 'task_q3_think', title: 'Q3 Think-Aloud 录音', stage: '阶段 4/4' },
  { id: 'mid_srl_q1', title: '任务中 SRL 1/3', stage: '阶段 4/4' },
  { id: 'mid_srl_q2', title: '任务中 SRL 2/3', stage: '阶段 4/4' },
  { id: 'mid_srl_q3', title: '任务中 SRL 3/3', stage: '阶段 4/4' },
  { id: 'task_q456', title: '任务进行中（Q4-Q6）', stage: '阶段 4/4' },
  { id: 'task_done', title: '任务结束', stage: '阶段 4/4' },
  { id: 'post_srl_q1', title: '任务后 SRL 1/4', stage: '阶段 4/4' },
  { id: 'post_srl_q2', title: '任务后 SRL 2/4', stage: '阶段 4/4' },
  { id: 'post_srl_q3', title: '任务后 SRL 3/4', stage: '阶段 4/4' },
  { id: 'post_srl_q4', title: '任务后 SRL 4/4', stage: '阶段 4/4' },
  { id: 'image_upload', title: '上传答题纸与草稿纸', stage: '阶段 4/4' },
  { id: 'waiting', title: '等待报告生成', stage: '阶段 4/4' },
  { id: 'report', title: '叙事报告', stage: '完成' },
];

const stageQuestionMap: Partial<Record<StepId, { stage: 'pre' | 'mid' | 'post'; index: number }>> = {
  pre_srl_q1: { stage: 'pre', index: 0 },
  pre_srl_q2: { stage: 'pre', index: 1 },
  pre_srl_q3: { stage: 'pre', index: 2 },
  pre_srl_q4: { stage: 'pre', index: 3 },
  mid_srl_q1: { stage: 'mid', index: 0 },
  mid_srl_q2: { stage: 'mid', index: 1 },
  mid_srl_q3: { stage: 'mid', index: 2 },
  post_srl_q1: { stage: 'post', index: 0 },
  post_srl_q2: { stage: 'post', index: 1 },
  post_srl_q3: { stage: 'post', index: 2 },
  post_srl_q4: { stage: 'post', index: 3 },
};

const formatTime = (value: number) => {
  const mm = String(Math.floor(value / 60)).padStart(2, '0');
  const ss = String(value % 60).padStart(2, '0');
  return `${mm}:${ss}`;
};

const clampStepIndex = (value: number) => Math.max(0, Math.min(steps.length - 1, value));

const buildSearch = (params: URLSearchParams) => {
  const query = params.toString();
  return query ? `?${query}` : '';
};

const longNarrativeParagraphs = [
  '在本次任务中，学习者能够在引导下进入任务，并基本理解这是一段需要先表达起始想法、再学习、再整理、最后在纸面独立完成的完整学习流程。前测访谈中，学习者能说出任务大意，但对“做到什么算真正完成”的标准仍不够清晰，起始注意力更容易落在显眼线索上，说明其目标建构已经启动，但仍处于较表层阶段。',
  '进入微课学习后，学习者能够完成课程浏览并复述部分关键内容，体现出对新输入的基本接收能力。整理阶段虽然不要求网页输入，但学习者在纸面草稿中的记录显示其开始把输入转为自己的表达，这一阶段主要起到从“听懂”到“会用”的过渡作用。',
  '在任务执行上半段，学习者在直接应用题中表现较稳定，但在干扰题中出现犹豫。Q3 的 Think-Aloud 录音显示其一开始仍偏向显眼局部线索，随后逐步回到规则判断框架，说明监控与修正并非完全事后发生，而是在任务当下已被触发。',
  '中段 SRL 回答与 Think-Aloud 相互印证：学习者能明确指出“拿不准”的时刻，并能描述把自己拉回规则判断的过程。进入 Q4-Q6 后，虽在复杂变化下仍有波动，但已经出现了较稳定的“先对齐规则，再做判断”的执行迹象。',
  '后测阶段，学习者能够提炼一句可迁移提醒语，例如“不要只看最显眼的部分，要看它在整体里占多少”。这表明其经验已从“这次怎么做”开始过渡到“下次怎么提醒自己和他人”。在归因上，学习者也更多提到“方法调整”而不是固定能力否定，体现了积极的自我信念方向。',
  '综合来看，学习者呈现出典型的成长轨迹：从依赖表层线索，到在冲突情境中感知偏差，再到初步形成可迁移策略。当前重点支持方向是进一步强化完成标准意识、提升规则应用稳定性，并通过更多类似任务巩固迁移质量。',
];

const AppPage = () => {
  const [isSessionReady, setIsSessionReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [themeId, setThemeId] = useState(themePool[0].id);
  const [srlSelection, setSrlSelection] = useState<SrlSelection>({ pre: [], mid: [], post: [] });
  const [srlRecordingMap, setSrlRecordingMap] = useState<Record<string, RecordingStatus>>({});

  const [thinkStatus, setThinkStatus] = useState<RecordingStatus>('idle');
  const [materialsPrinted, setMaterialsPrinted] = useState(false);
  const [lessonChecked, setLessonChecked] = useState(false);
  const [answerPaper, setAnswerPaper] = useState<string | null>(null);
  const [draftPaper, setDraftPaper] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);

  const current = steps[activeIndex] ?? steps[0];
  const isLastStep = activeIndex === steps.length - 1;
  const activeTheme = useMemo(() => getThemeById(themeId) ?? themePool[0], [themeId]);

  const currentSrlQuestion = useMemo(() => {
    const map = stageQuestionMap[current.id];
    if (!map) return null;
    return srlSelection[map.stage][map.index] ?? null;
  }, [current.id, srlSelection]);

  const returnTo = useMemo(() => {
    if (!isSessionReady || !sessionId) return '';
    const params = new URLSearchParams();
    params.set('step', String(activeIndex));
    params.set('sid', sessionId);
    params.set('theme', activeTheme.id);
    if (lessonChecked) {
      params.set('lesson', '1');
    }
    return `/${buildSearch(params)}`;
  }, [activeIndex, activeTheme.id, isSessionReady, lessonChecked, sessionId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const sid = params.get('sid') || createSessionId();
    const themeFromUrl = params.get('theme');
    const resolvedTheme = getThemeById(themeFromUrl ?? '') ?? pickThemeBySession(sid);
    const selection = pickSrlSet(sid);
    const recordingState = [...selection.pre, ...selection.mid, ...selection.post].reduce<Record<string, RecordingStatus>>(
      (acc, item) => {
        acc[item.id] = 'idle';
        return acc;
      },
      {},
    );

    const stepRaw = Number(params.get('step') ?? '0');
    const step = Number.isInteger(stepRaw) ? clampStepIndex(stepRaw) : 0;
    const lessonFlag = params.get('lesson') === '1';

    setSessionId(sid);
    setThemeId(resolvedTheme.id);
    setSrlSelection(selection);
    setSrlRecordingMap(recordingState);
    setActiveIndex(step);
    setLessonChecked(lessonFlag);
    setIsSessionReady(true);

    params.set('sid', sid);
    params.set('theme', resolvedTheme.id);
    params.set('step', String(step));
    if (lessonFlag) {
      params.set('lesson', '1');
    } else {
      params.delete('lesson');
    }

    const nextUrl = `${window.location.pathname}${buildSearch(params)}${window.location.hash}`;
    window.history.replaceState(window.history.state, '', nextUrl);
  }, []);

  useEffect(() => {
    if (!isSessionReady || typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    params.set('step', String(activeIndex));
    params.set('sid', sessionId);
    params.set('theme', activeTheme.id);
    if (lessonChecked) {
      params.set('lesson', '1');
    } else {
      params.delete('lesson');
    }
    const nextUrl = `${window.location.pathname}${buildSearch(params)}${window.location.hash}`;
    window.history.replaceState(window.history.state, '', nextUrl);
  }, [activeIndex, activeTheme.id, isSessionReady, lessonChecked, sessionId]);

  useEffect(() => {
    if (current.id !== 'organize') {
      setSecondsLeft(300);
      setTimerRunning(false);
      return;
    }
    setSecondsLeft(300);
    setTimerRunning(false);
  }, [current.id]);

  useEffect(() => {
    if (current.id !== 'organize' || !timerRunning || secondsLeft <= 0) {
      return;
    }
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [current.id, secondsLeft, timerRunning]);

  const canContinue = useMemo(() => {
    if (!isSessionReady) return false;
    if (currentSrlQuestion) {
      return srlRecordingMap[currentSrlQuestion.id] === 'done';
    }
    switch (current.id) {
      case 'lesson':
        return lessonChecked;
      case 'print_materials':
        return materialsPrinted;
      case 'task_q3_think':
        return thinkStatus === 'done';
      case 'image_upload':
        return Boolean(answerPaper && draftPaper);
      default:
        return true;
    }
  }, [
    answerPaper,
    current.id,
    currentSrlQuestion,
    draftPaper,
    isSessionReady,
    lessonChecked,
    materialsPrinted,
    srlRecordingMap,
    thinkStatus,
  ]);

  const setSrlStatus = (question: SrlQuestion, status: RecordingStatus) => {
    setSrlRecordingMap((prev) => ({ ...prev, [question.id]: status }));
  };

  const next = () => {
    if (!isLastStep && canContinue) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const restart = () => {
    const newSessionId = createSessionId();
    const newTheme = pickThemeBySession(newSessionId);
    const newSrl = pickSrlSet(newSessionId);
    const recordingState = [...newSrl.pre, ...newSrl.mid, ...newSrl.post].reduce<Record<string, RecordingStatus>>((acc, item) => {
      acc[item.id] = 'idle';
      return acc;
    }, {});

    setActiveIndex(0);
    setSessionId(newSessionId);
    setThemeId(newTheme.id);
    setSrlSelection(newSrl);
    setSrlRecordingMap(recordingState);
    setThinkStatus('idle');
    setMaterialsPrinted(false);
    setLessonChecked(false);
    setAnswerPaper(null);
    setDraftPaper(null);
    setSecondsLeft(300);
    setTimerRunning(false);
    setIsSessionReady(true);
  };

  if (!isSessionReady) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl space-y-5 p-4 md:p-8 lg:p-10">
        <ProgressBar current={1} total={steps.length} label="阶段初始化中" />
        <section className="panel space-y-2">
          <h1 className="text-xl font-semibold text-slate-900">正在初始化会话</h1>
          <p className="text-sm text-slate-600">正在载入主题和 SRL 题单，请稍候。</p>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl space-y-5 p-4 md:p-8 lg:p-10">
      <ProgressBar current={activeIndex + 1} total={steps.length} label={`${current.stage} · ${current.title}`} />

      {current.id === 'flow' ? (
        <section className="panel space-y-4">
          <h1 className="text-2xl font-semibold text-slate-900">任务型 SRL 流程</h1>
          <p className="text-sm text-slate-600">本页只展示流程，不放置其他干扰信息。</p>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
            <li>进入任务与流程说明</li>
            <li>任务前 SRL 四题录音</li>
            <li>微课学习与打印当前主题材料</li>
            <li>自主整理、纸面作答、关键录音、图片上传与叙事报告</li>
          </ol>
        </section>
      ) : null}

      {current.id === 'intro' ? (
        <section className="panel space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">任务说明</h2>
          <p className="text-sm text-slate-700">
            当前系统抽取主题：{activeTheme.subject} / {activeTheme.theme}
          </p>
          <p className="text-sm text-slate-700">本原型采用“线上引导 + 纸面作答 + 线上回收证据”。</p>
          <p className="text-sm text-slate-700">接下来会先完成任务前 SRL，再进入微课学习与打印材料环节。</p>
          <p className="text-sm text-slate-700">微课程主题与任务材料严格一一对应，当前主题 ID：{activeTheme.id}</p>
        </section>
      ) : null}

      {currentSrlQuestion ? (
        <SrlQuestionPage
          title={current.title}
          question={currentSrlQuestion}
          status={srlRecordingMap[currentSrlQuestion.id] ?? 'idle'}
          onStart={() => setSrlStatus(currentSrlQuestion, 'recording')}
          onStop={() => setSrlStatus(currentSrlQuestion, 'done')}
          onReset={() => setSrlStatus(currentSrlQuestion, 'idle')}
        />
      ) : null}

      {current.id === 'lesson' ? (
        <MicroCourseCard
          theme={activeTheme}
          onOpenLesson={() => setLessonChecked(true)}
          lessonCompleted={lessonChecked}
          returnTo={returnTo}
        />
      ) : null}

      {current.id === 'print_materials' ? (
        <PrintMaterialsCard theme={activeTheme} printed={materialsPrinted} onPrint={() => setMaterialsPrinted(true)} />
      ) : null}

      {current.id === 'organize' ? (
        <section className="panel space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">自主整理</h2>
          <p className="text-sm text-slate-700">现在可以整理知识，准备好就开始答题。本页不要求录音或填写。</p>
          <p className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">倒计时：{formatTime(secondsLeft)}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={primaryButtonClass} onClick={() => setTimerRunning(true)} disabled={timerRunning || secondsLeft === 0}>
              开始 5 分钟倒计时
            </button>
            <button type="button" className={secondaryButtonClass} onClick={() => setSecondsLeft(0)}>
              直接跳过
            </button>
          </div>
        </section>
      ) : null}

      {current.id === 'task_q12' ? (
        <section className="panel space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">任务开始（Q1-Q2）</h2>
          <p className="text-sm text-slate-600">请在打印材料上开始作答，网页本页只负责提示题型与考察点。</p>
          <div className="space-y-3">
            {activeTheme.taskCards.slice(0, 2).map((item) => (
              <article key={item.code} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">{item.type}</p>
                <p className="mt-1 text-base font-semibold text-slate-900">{item.code}</p>
                <p className="mt-2 text-sm text-slate-600">{item.focus}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {current.id === 'task_q3_think' ? (
        <section className="space-y-4">
          <section className="panel space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">Q3 Think-Aloud（强制录音）</h2>
            <p className="text-sm text-slate-700">本题请先开启录音，再回到纸面继续作答。网页本页不重复展示完整纸面题干。</p>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs text-slate-500">{activeTheme.taskCards[2].type}</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{activeTheme.taskCards[2].code}</p>
              <p className="mt-2 text-sm text-slate-600">{activeTheme.taskCards[2].focus}</p>
            </article>
          </section>
          <AudioRecorderCard
            title="Q3 录音窗口"
            hint="录音状态必须为“录音已完成”才可进入下一步。"
            status={thinkStatus}
            onStart={() => setThinkStatus('recording')}
            onStop={() => setThinkStatus('done')}
            onReset={() => setThinkStatus('idle')}
          />
        </section>
      ) : null}

      {current.id === 'task_q456' ? (
        <section className="panel space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">任务进行中（Q4-Q6）</h2>
          <p className="text-sm text-slate-600">请继续在打印材料上完成作答，网页本页只展示题型与考察点。</p>
          <div className="space-y-3">
            {activeTheme.taskCards.slice(3, 6).map((item) => (
              <article key={item.code} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs text-slate-500">{item.type}</p>
                <p className="mt-1 text-base font-semibold text-slate-900">{item.code}</p>
                <p className="mt-2 text-sm text-slate-600">{item.focus}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {current.id === 'task_done' ? (
        <section className="panel space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">答题结束</h2>
          <p className="text-sm text-slate-700">本页不展示分数。请继续完成后测 SRL 录音与纸面图片上传。</p>
        </section>
      ) : null}

      {current.id === 'image_upload' ? (
        <section className="panel space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">上传图片证据</h2>
          <p className="text-sm text-slate-600">请上传答题纸与草稿纸照片，用于后续 OCR 与报告生成。</p>
          <div className="grid gap-3 md:grid-cols-2">
            <ImageUploadCard title="答题纸图片" fileName={answerPaper} onPick={setAnswerPaper} />
            <ImageUploadCard title="草稿纸图片" fileName={draftPaper} onPick={setDraftPaper} />
          </div>
        </section>
      ) : null}

      {current.id === 'waiting' ? (
        <section className="panel space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">等待报告生成</h2>
          <p className="text-sm text-slate-700">系统将结合纸面图片（OCR）与 SRL 录音，输出叙事式学习画像。</p>
          <p className="text-sm text-slate-700">你可以通过邮箱接收，或 2 小时后回到本页面查看分析结果。</p>
          <p className="text-xs text-slate-500">过程证据会在报告页集中展示，不在前面流程外显。</p>
        </section>
      ) : null}

      {current.id === 'report' ? (
        <section className="panel space-y-6">
          <h2 className="text-xl font-semibold text-slate-900">叙事报告（示例）</h2>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">学习过程要点</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>已完成前 4 / 中 3 / 后 4 的 SRL 单题录音，任务链路完整。</li>
              <li>Q3 Think-Aloud 显示从显眼线索向规则判断切换。</li>
              <li>后测可提炼迁移提醒语，具备初步反馈迁移能力。</li>
            </ul>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-3 py-2">维度</th>
                  <th className="px-3 py-2">当前 Level</th>
                  <th className="px-3 py-2">备选 Level</th>
                  <th className="px-3 py-2">确信度</th>
                  <th className="px-3 py-2">证据摘要</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200"><td className="px-3 py-2">目标建构</td><td className="px-3 py-2">L2</td><td className="px-3 py-2">L3</td><td className="px-3 py-2">中</td><td className="px-3 py-2">前测录音可描述任务目标，但完成标准仍偏模糊。</td></tr>
                <tr className="border-t border-slate-200"><td className="px-3 py-2">认知加工</td><td className="px-3 py-2">L2</td><td className="px-3 py-2">L3</td><td className="px-3 py-2">中</td><td className="px-3 py-2">可复述规则并在纸面题中部分稳定应用。</td></tr>
                <tr className="border-t border-slate-200"><td className="px-3 py-2">元认知</td><td className="px-3 py-2">L2</td><td className="px-3 py-2">L3</td><td className="px-3 py-2">中高</td><td className="px-3 py-2">Q3 与中测录音均出现“发现偏差并拉回”的表述。</td></tr>
                <tr className="border-t border-slate-200"><td className="px-3 py-2">动机调节</td><td className="px-3 py-2">L2</td><td className="px-3 py-2">L3</td><td className="px-3 py-2">中</td><td className="px-3 py-2">任务中有波动但保持推进，未中断流程。</td></tr>
                <tr className="border-t border-slate-200"><td className="px-3 py-2">情绪调节</td><td className="px-3 py-2">L1-L2</td><td className="px-3 py-2">L2</td><td className="px-3 py-2">中</td><td className="px-3 py-2">能说出“拿不准”时刻，但触发链条仍需强化。</td></tr>
                <tr className="border-t border-slate-200"><td className="px-3 py-2">行为执行</td><td className="px-3 py-2">L2</td><td className="px-3 py-2">L3</td><td className="px-3 py-2">中</td><td className="px-3 py-2">流程完成度高，关键节点录音与上传均达成。</td></tr>
                <tr className="border-t border-slate-200"><td className="px-3 py-2">情境与资源</td><td className="px-3 py-2">L2</td><td className="px-3 py-2">-</td><td className="px-3 py-2">中低</td><td className="px-3 py-2">纸面与草稿资源已使用，仍偏基础记录。</td></tr>
                <tr className="border-t border-slate-200"><td className="px-3 py-2">自我信念</td><td className="px-3 py-2">L2</td><td className="px-3 py-2">L3</td><td className="px-3 py-2">中</td><td className="px-3 py-2">归因更偏向方法调整，而非能力否定。</td></tr>
                <tr className="border-t border-slate-200"><td className="px-3 py-2">反馈与迁移</td><td className="px-3 py-2">L2</td><td className="px-3 py-2">-</td><td className="px-3 py-2">中</td><td className="px-3 py-2">后测可形成提醒语，迁移表达已启动。</td></tr>
                <tr className="border-t border-slate-200"><td className="px-3 py-2">社会调节</td><td className="px-3 py-2">L1-L2</td><td className="px-3 py-2">-</td><td className="px-3 py-2">低</td><td className="px-3 py-2">能“教别人一句话”，但求助协作证据有限。</td></tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">长报告全文</h3>
            {longNarrativeParagraphs.map((item) => (
              <p key={item} className="text-sm leading-7 text-slate-700">
                {item}
              </p>
            ))}
          </div>

          <button type="button" className={secondaryButtonClass} onClick={restart}>
            重新开始演示
          </button>
        </section>
      ) : null}

      <footer className="panel flex items-center justify-between border-sky-100 bg-gradient-to-r from-white via-sky-50/70 to-white">
        <button type="button" className={`${secondaryButtonClass} min-w-[128px]`} onClick={prev} disabled={activeIndex === 0}>
          上一步
        </button>
        <button
          type="button"
          className={`${isLastStep || !canContinue ? disabledButtonClass : primaryButtonClass} min-w-[128px]`}
          onClick={next}
          disabled={isLastStep || !canContinue}
        >
          {current.id === 'waiting' ? '查看示例报告' : '下一步'}
        </button>
      </footer>
    </main>
  );
};

export default AppPage;
