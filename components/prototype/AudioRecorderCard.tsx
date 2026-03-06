export type RecordingStatus = 'idle' | 'recording' | 'done';

interface AudioRecorderCardProps {
  title: string;
  status: RecordingStatus;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  hint?: string;
}

const statusText: Record<RecordingStatus, string> = {
  idle: '未开始录音',
  recording: '录音中...',
  done: '录音已完成',
};

const AudioRecorderCard = ({ title, status, onStart, onStop, onReset, hint }: AudioRecorderCardProps) => {
  return (
    <section className="panel space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      {hint ? <p className="text-sm text-slate-600">{hint}</p> : null}

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">状态：{statusText[status]}</div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-primary" onClick={onStart} disabled={status === 'recording'}>
          开始录音
        </button>
        <button type="button" className="btn-secondary" onClick={onStop} disabled={status !== 'recording'}>
          结束录音
        </button>
        <button type="button" className="btn-secondary" onClick={onReset} disabled={status === 'idle'}>
          重录
        </button>
      </div>

      <p className="text-xs text-slate-500">仅保留网页录音流程，不提供文件上传与文字填写。</p>
    </section>
  );
};

export default AudioRecorderCard;
