import { RecordingStatus } from '@/components/prototype/AudioRecorderCard';
import { primaryButtonClass, secondaryButtonClass } from '@/lib/buttonStyles';
import { SrlQuestion } from '@/lib/prototypeData';

interface SrlQuestionPageProps {
  title: string;
  question: SrlQuestion;
  status: RecordingStatus;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

const statusText: Record<RecordingStatus, string> = {
  idle: '未开始录音',
  recording: '录音中...',
  done: '录音已完成',
};

const statusClassMap: Record<RecordingStatus, string> = {
  idle: 'border-slate-200 bg-slate-50 text-slate-700',
  recording: 'border-amber-200 bg-amber-50 text-amber-700',
  done: 'border-emerald-200 bg-emerald-50 text-emerald-700',
};

const SrlQuestionPage = ({ title, question, status, onStart, onStop, onReset }: SrlQuestionPageProps) => {
  return (
    <section className="panel space-y-5 border-sky-100 bg-gradient-to-br from-white to-sky-50/40">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">SRL 口头回答</p>
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <p className="text-xs text-slate-500">维度提示：{question.dimensionHint}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm">
        <p className="text-base font-semibold leading-8 text-slate-900">{question.text}</p>
      </div>

      <div className={`rounded-2xl border px-4 py-3 text-sm font-medium ${statusClassMap[status]}`}>当前状态：{statusText[status]}</div>

      <div className="flex flex-wrap gap-3">
        <button type="button" className={`${primaryButtonClass} min-w-[132px]`} onClick={onStart} disabled={status === 'recording'}>
          开始录音
        </button>
        <button type="button" className={`${secondaryButtonClass} min-w-[132px]`} onClick={onStop} disabled={status !== 'recording'}>
          结束录音
        </button>
        <button type="button" className={`${secondaryButtonClass} min-w-[96px]`} onClick={onReset} disabled={status === 'idle'}>
          重录
        </button>
      </div>

      <p className="text-xs leading-6 text-slate-500">本页只采集录音，不需要文字输入和文件上传。完成录音后，才可进入下一题。</p>
    </section>
  );
};

export default SrlQuestionPage;
