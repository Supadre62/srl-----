import { CaseMode, CaseProfile } from '../types/assessment';

interface ThemeSetupPanelProps {
  caseMode: CaseMode;
  activeCaseId: string;
  systemPrompt: string;
  caseOptions: CaseProfile[];
  onCaseModeChange: (mode: CaseMode) => void;
  onDrawRandomCase: () => void;
  onSystemPromptChange: (value: string) => void;
}

const ThemeSetupPanel = ({
  caseMode,
  activeCaseId,
  systemPrompt,
  caseOptions,
  onCaseModeChange,
  onDrawRandomCase,
  onSystemPromptChange,
}: ThemeSetupPanelProps) => {
  const current = caseOptions.find((item) => item.id === activeCaseId);

  return (
    <section className="panel-muted p-4">
      <h3 className="text-base font-semibold text-slate-900">案例抽取模式与 SP 变量</h3>
      <p className="mt-1 text-sm text-slate-600">当前采用本地题库随机抽取，不接入 LLM。SP 先作为可配置变量展示在前端。</p>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <label className="block text-sm">
          <span className="font-semibold text-slate-800">案例模式</span>
          <select
            value={caseMode}
            onChange={(event) => onCaseModeChange(event.target.value as CaseMode)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-700"
          >
            <option value="random_case">题库随机抽取</option>
            <option value="pending_case">案例待定模式</option>
          </select>
        </label>

        <div className="text-sm">
          <span className="font-semibold text-slate-800">当前案例</span>
          <div className="mt-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">{current ? current.title : activeCaseId}</div>
          <button
            type="button"
            onClick={onDrawRandomCase}
            disabled={caseMode !== 'random_case'}
            className="mt-2 rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:opacity-50"
          >
            重新随机抽取
          </button>
        </div>
      </div>

      <label className="mt-3 block text-sm">
        <span className="font-semibold text-slate-800">系统提示词（SP）</span>
        <textarea
          value={systemPrompt}
          onChange={(event) => onSystemPromptChange(event.target.value)}
          placeholder="例如：请严格按‘先看整体、再看成分、最后复核’的步骤判断。"
          className="mt-1 h-24 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-700"
        />
      </label>
    </section>
  );
};

export default ThemeSetupPanel;
