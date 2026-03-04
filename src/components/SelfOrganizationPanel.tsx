import { ReactNode } from 'react';
import { formatSeconds } from '../utils/time';

interface SelfOrganizationPanelProps {
  text: string;
  onTextChange: (value: string) => void;
  onSaveText: () => void;
  remainingSeconds: number;
  samples: string[];
  audioPanel: ReactNode;
}

const SelfOrganizationPanel = ({ text, onTextChange, onSaveText, remainingSeconds, samples, audioPanel }: SelfOrganizationPanelProps) => {
  return (
    <div className="space-y-4">
      <header>
        <h2 className="font-serif text-2xl font-semibold text-slate-900">自主整理（非正式答题）</h2>
        <p className="mt-2 text-sm text-slate-700">现在是整理时间。你可以想一想、说一说、在纸上记一记。</p>
      </header>

      <section className="panel-muted p-4">
        <p className="text-sm font-semibold text-slate-900">草稿纸提醒</p>
        <p className="mt-1 text-sm text-slate-600">建议先在草稿纸记录比较步骤，再在线上简要整理关键思路。</p>
      </section>

      <section className="grid gap-4 md:grid-cols-[1.6fr_1fr]">
        <div className="panel-muted p-4">
          <p className="text-sm font-semibold text-slate-900">整理文字</p>
          <textarea
            value={text}
            onChange={(event) => onTextChange(event.target.value)}
            placeholder="例如：先看总量，再看成分占比；每题做完用一句完整判断句复核。"
            className="mt-2 h-36 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-700"
          />
          <button type="button" onClick={onSaveText} className="mt-2 rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white">
            保存整理文字
          </button>
        </div>
        <div className="panel-muted p-4">
          <p className="text-sm font-semibold text-slate-900">整理时间提示</p>
          <p className="mt-2 text-sm text-slate-700">剩余时间：{formatSeconds(remainingSeconds)}</p>
          <p className="mt-2 text-xs text-slate-500">该计时用于演示程序化施测节奏。</p>
        </div>
      </section>

      {audioPanel}

      <section className="panel-muted p-4">
        <p className="text-sm font-semibold text-slate-900">整理样例占位</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {samples.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SelfOrganizationPanel;
