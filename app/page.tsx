'use client';

import { useEffect, useMemo, useState } from 'react';
import AudioRecorderCard, { RecordingStatus } from '@/components/prototype/AudioRecorderCard';
import ImageUploadCard from '@/components/prototype/ImageUploadCard';
import MaterialDownloadCard from '@/components/prototype/MaterialDownloadCard';
import ProgressBar from '@/components/prototype/ProgressBar';
import { randomTheme } from '@/lib/prototypeData';

type StepId =
  | 'flow'
  | 'intro'
  | 'task_material'
  | 'pre_srl_record'
  | 'lesson'
  | 'organize'
  | 'task_q12'
  | 'task_q3_think'
  | 'mid_srl_record'
  | 'task_q456'
  | 'task_done'
  | 'post_srl_record'
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
  { id: 'task_material', title: '下载任务材料', stage: '阶段 1/4' },
  { id: 'pre_srl_record', title: '任务前 SRL 录音', stage: '阶段 1/4' },
  { id: 'lesson', title: '微课学习', stage: '阶段 2/4' },
  { id: 'organize', title: '自主整理（5 分钟）', stage: '阶段 3/4' },
  { id: 'task_q12', title: '任务开始（Q1-Q2）', stage: '阶段 4/4' },
  { id: 'task_q3_think', title: 'Q3 Think-Aloud 录音', stage: '阶段 4/4' },
  { id: 'mid_srl_record', title: '任务中 SRL 录音', stage: '阶段 4/4' },
  { id: 'task_q456', title: '任务进行中（Q4-Q6）', stage: '阶段 4/4' },
  { id: 'task_done', title: '任务结束', stage: '阶段 4/4' },
  { id: 'post_srl_record', title: '任务后 SRL 录音', stage: '阶段 4/4' },
  { id: 'image_upload', title: '上传答题纸与草稿纸', stage: '阶段 4/4' },
  { id: 'waiting', title: '等待报告生成', stage: '阶段 4/4' },
  { id: 'report', title: '叙事报告', stage: '完成' },
];

const formatTime = (value: number) => {
  const mm = String(Math.floor(value / 60)).padStart(2, '0');
  const ss = String(value % 60).padStart(2, '0');
  return `${mm}:${ss}`;
};

const AppPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [theme] = useState(() => randomTheme());
  const [downloaded, setDownloaded] = useState(false);
  const [lessonChecked, setLessonChecked] = useState(false);
  const [answerPaper, setAnswerPaper] = useState<string | null>(null);
  const [draftPaper, setDraftPaper] = useState<string | null>(null);

  const [recordings, setRecordings] = useState<Record<'pre' | 'think' | 'mid' | 'post', RecordingStatus>>({
    pre: 'idle',
    think: 'idle',
    mid: 'idle',
    post: 'idle',
  });

  const [secondsLeft, setSecondsLeft] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);

  const current = steps[activeIndex];
  const isLastStep = activeIndex === steps.length - 1;

  useEffect(() => {
    if (current.id !== 'organize') {
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
  }, [current.id, timerRunning, secondsLeft]);

  const canContinue = useMemo(() => {
    switch (current.id) {
      case 'task_material':
        return downloaded;
      case 'pre_srl_record':
        return recordings.pre === 'done';
      case 'lesson':
        return lessonChecked;
      case 'task_q3_think':
        return recordings.think === 'done';
      case 'mid_srl_record':
        return recordings.mid === 'done';
      case 'post_srl_record':
        return recordings.post === 'done';
      case 'image_upload':
        return Boolean(answerPaper && draftPaper);
      default:
        return true;
    }
  }, [answerPaper, current.id, downloaded, draftPaper, lessonChecked, recordings]);

  const setRecordingStatus = (key: 'pre' | 'think' | 'mid' | 'post', status: RecordingStatus) => {
    setRecordings((prev) => ({ ...prev, [key]: status }));
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
    setActiveIndex(0);
    setDownloaded(false);
    setLessonChecked(false);
    setAnswerPaper(null);
    setDraftPaper(null);
    setRecordings({ pre: 'idle', think: 'idle', mid: 'idle', post: 'idle' });
  };

  const downloadTaskPdf = () => {
    const content = `任务主题：${theme.theme}\n学科：${theme.subject}\n考察点：${theme.focus}\n\n请在线下纸面完成 Q1-Q6，并保留草稿纸。`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '任务材料_示例.txt';
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  return (
    <main className="mx-auto min-h-screen max-w-4xl space-y-4 p-4 md:p-8">
      <ProgressBar current={activeIndex + 1} total={steps.length} label={`${current.stage} · ${current.title}`} />

      {current.id === 'flow' ? (
        <section className="panel space-y-4">
          <h1 className="text-2xl font-semibold text-slate-900">任务型 SRL 流程</h1>
          <p className="text-sm text-slate-600">本页仅展示流程，不放其他信息。</p>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
            <li>任务导入与任务前录音</li>
            <li>微课学习</li>
            <li>自主整理（5 分钟，可跳过）</li>
            <li>纸面作答 + 关键录音 + 上传图片 + 报告</li>
          </ol>
        </section>
      ) : null}

      {current.id === 'intro' ? (
        <section className="panel space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">任务说明</h2>
          <p className="text-sm text-slate-700">当前为系统抽取主题：{theme.subject} / {theme.theme}</p>
          <p className="text-sm text-slate-700">你将在纸面完成题目，网页只做引导、录音与证据回收。</p>
          <p className="text-sm text-slate-700">课程主题池文件：<span className="font-mono">{theme.htmlFile}</span></p>
        </section>
      ) : null}

      {current.id === 'task_material' ? <MaterialDownloadCard downloaded={downloaded} onDownload={downloadTaskPdf} /> : null}

      {current.id === 'pre_srl_record' ? (
        <AudioRecorderCard
          title="任务前 SRL 录音"
          hint="请口头回答：你准备先看哪里？遇到不确定时你会怎么做？"
          status={recordings.pre}
          onStart={() => setRecordingStatus('pre', 'recording')}
          onStop={() => setRecordingStatus('pre', 'done')}
          onReset={() => setRecordingStatus('pre', 'idle')}
        />
      ) : null}

      {current.id === 'lesson' ? (
        <section className="panel space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">微课学习</h2>
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">微课视频区域（后续接入）</div>
          <p className="text-sm text-slate-700">本阶段不答题，只完成学习输入。</p>
          <button type="button" className="btn-primary" onClick={() => setLessonChecked(true)}>
            已完成学习
          </button>
        </section>
      ) : null}

      {current.id === 'organize' ? (
        <section className="panel space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">自主整理</h2>
          <p className="text-sm text-slate-700">现在可以在草稿纸上整理知识。准备好就开始答题。</p>
          <p className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">倒计时：{formatTime(secondsLeft)}</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-primary" onClick={() => setTimerRunning(true)} disabled={timerRunning || secondsLeft === 0}>
              开始 5 分钟倒计时
            </button>
            <button type="button" className="btn-secondary" onClick={() => setSecondsLeft(0)}>
              直接跳过
            </button>
          </div>
        </section>
      ) : null}

      {current.id === 'task_q12' ? (
        <section className="panel space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">任务开始（Q1-Q2）</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>题型：直接应用题 + 表面干扰题</li>
            <li>考察点：规则初次应用、抑制表面线索</li>
            <li>请在纸质材料上工整作答</li>
          </ul>
        </section>
      ) : null}

      {current.id === 'task_q3_think' ? (
        <AudioRecorderCard
          title="Q3 Think-Aloud 录音"
          hint="请先开启录音，再做 Q3。边想边说你的思考过程。"
          status={recordings.think}
          onStart={() => setRecordingStatus('think', 'recording')}
          onStop={() => setRecordingStatus('think', 'done')}
          onReset={() => setRecordingStatus('think', 'idle')}
        />
      ) : null}

      {current.id === 'mid_srl_record' ? (
        <AudioRecorderCard
          title="任务中 SRL 录音"
          hint="请口头回答：刚才哪一刻拿不准？你怎么把自己拉回来的？"
          status={recordings.mid}
          onStart={() => setRecordingStatus('mid', 'recording')}
          onStop={() => setRecordingStatus('mid', 'done')}
          onReset={() => setRecordingStatus('mid', 'idle')}
        />
      ) : null}

      {current.id === 'task_q456' ? (
        <section className="panel space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">任务进行中（Q4-Q6）</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>题型：变化题 A + 变化题 B + 迁移题</li>
            <li>考察点：规则稳定化与经验迁移</li>
            <li>请继续在纸质材料上完成作答</li>
          </ul>
        </section>
      ) : null}

      {current.id === 'task_done' ? (
        <section className="panel space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">答题结束</h2>
          <p className="text-sm text-slate-700">本页不展示分数。请继续完成后测录音与图片上传。</p>
        </section>
      ) : null}

      {current.id === 'post_srl_record' ? (
        <AudioRecorderCard
          title="任务后 SRL 录音"
          hint="请口头回答：下次做类似任务，你会先提醒自己什么？"
          status={recordings.post}
          onStart={() => setRecordingStatus('post', 'recording')}
          onStop={() => setRecordingStatus('post', 'done')}
          onReset={() => setRecordingStatus('post', 'idle')}
        />
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
          <p className="text-sm text-slate-700">系统将结合纸面图片（OCR）与 SRL 录音分析生成叙事报告。</p>
          <p className="text-sm text-slate-700">你可以选择通过邮箱接收，或 2 小时后回到本页面查看。</p>
          <p className="text-xs text-slate-500">当前原型为演示模式，下一步将显示示例报告。</p>
        </section>
      ) : null}

      {current.id === 'report' ? (
        <section className="panel space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">叙事报告（示例）</h2>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">学习过程要点</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>能按流程完成任务，并在 Q3 触发即时思考表达。</li>
              <li>中段 SRL 能说出不确定时刻，后段继续执行。</li>
              <li>后测可提炼一条可迁移提醒语。</li>
            </ul>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-3 py-2">维度</th>
                  <th className="px-3 py-2">当前 Level</th>
                  <th className="px-3 py-2">确信度</th>
                  <th className="px-3 py-2">证据</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="px-3 py-2">目标建构</td>
                  <td className="px-3 py-2">L2</td>
                  <td className="px-3 py-2">中</td>
                  <td className="px-3 py-2">前测录音可描述任务目标。</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-3 py-2">元认知</td>
                  <td className="px-3 py-2">L2-L3</td>
                  <td className="px-3 py-2">中</td>
                  <td className="px-3 py-2">Q3 Think-Aloud + 中段 SRL 形成证据链。</td>
                </tr>
                <tr className="border-t border-slate-200">
                  <td className="px-3 py-2">反馈迁移</td>
                  <td className="px-3 py-2">L2</td>
                  <td className="px-3 py-2">中</td>
                  <td className="px-3 py-2">后测录音可给出下次提醒语。</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">长报告示例</h3>
            <p className="mt-2 text-sm leading-7 text-slate-700">
              在本次任务中，学习者从流程理解进入，到 Q3 的即时思考表达，再到中段和后测反思，逐步形成了“发现偏差-调整策略-提炼提醒语”的链条。
              纸面作答与草稿图片为后续 OCR 复核提供了外显证据，录音为 SRL 过程提供了时点证据，二者共同支撑叙事式画像输出。
            </p>
          </div>

          <button type="button" className="btn-secondary" onClick={restart}>
            重新开始演示
          </button>
        </section>
      ) : null}

      <footer className="panel flex items-center justify-between">
        <button type="button" className="btn-secondary" onClick={prev} disabled={activeIndex === 0 || current.id === 'flow'}>
          上一步
        </button>
        <button type="button" className="btn-primary" onClick={next} disabled={isLastStep || !canContinue}>
          {current.id === 'waiting' ? '查看示例报告' : '下一步'}
        </button>
      </footer>
    </main>
  );
};

export default AppPage;
