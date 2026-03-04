import { SrlQuestionGroup } from '../types/assessment';

interface SrlQuestionPanelProps {
  group: SrlQuestionGroup;
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
}

const SrlQuestionPanel = ({ group, value, onChange, onSave }: SrlQuestionPanelProps) => {
  return (
    <section className="panel-muted p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-slate-900">{group.title}</h3>
        <span className="rounded bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-600">{group.mode}</span>
      </div>
      <p className="mt-1 text-sm text-slate-600">{group.description}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
        {group.questions.map((question) => (
          <li key={question}>{question}</li>
        ))}
      </ul>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={group.answerPlaceholder}
        className="mt-3 h-28 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-700"
      />
      <p className="mt-2 text-xs text-slate-500">提示：音频为主，若音频已上传，文字可不填写。</p>
      <button type="button" onClick={onSave} className="mt-2 rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white">
        保存问题回答
      </button>
    </section>
  );
};

export default SrlQuestionPanel;
