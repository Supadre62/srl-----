import { TaskIntroConfig } from '../types/assessment';

interface TaskIntroPanelProps {
  config: TaskIntroConfig;
  taskGoal: string;
  taskDescription: string;
  scratchpadPrepared: boolean;
  onToggleScratchpadPrepared: () => void;
}

const TaskIntroPanel = ({ config, taskGoal, taskDescription, scratchpadPrepared, onToggleScratchpadPrepared }: TaskIntroPanelProps) => {
  return (
    <div className="space-y-4">
      <header>
        <h2 className="font-serif text-2xl font-semibold text-slate-900">{config.heading}</h2>
        <p className="mt-2 text-sm leading-7 text-slate-700">{config.description}</p>
      </header>

      <section className="panel-muted p-4">
        <p className="text-sm font-semibold text-brand-800">当前任务目标</p>
        <p className="mt-2 text-sm text-slate-700">{taskGoal}</p>
        <p className="mt-1 text-sm text-slate-600">{taskDescription}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="panel-muted p-4">
          <p className="text-sm font-semibold text-slate-900">流程概览</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-700">
            {config.flowSummary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
        <div className="panel-muted p-4">
          <p className="text-sm font-semibold text-slate-900">完成标准</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {config.completionCriteria.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">{config.downloadHint}</div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">{config.scratchpadHint}</div>
      </section>

      <button
        type="button"
        onClick={onToggleScratchpadPrepared}
        className={`rounded-lg px-3 py-2 text-sm font-semibold ${
          scratchpadPrepared ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
        }`}
      >
        {scratchpadPrepared ? '已标记：草稿纸已准备' : '点击标记：草稿纸已准备'}
      </button>

      <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">{config.warning}</div>
    </div>
  );
};

export default TaskIntroPanel;
