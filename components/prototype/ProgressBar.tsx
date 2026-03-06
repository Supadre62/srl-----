interface ProgressBarProps {
  current: number;
  total: number;
  label: string;
}

const ProgressBar = ({ current, total, label }: ProgressBarProps) => {
  const percent = Math.round((current / total) * 100);

  return (
    <header className="panel space-y-4 border-sky-100 bg-gradient-to-r from-white via-sky-50/70 to-white">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">流程进度</p>
          <p className="text-sm font-semibold text-slate-800">当前页面：{label}</p>
        </div>
        <span className="rounded-full border border-sky-200 bg-white px-3 py-1 text-sm font-semibold text-sky-800">
          {current}/{total}
        </span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 shadow-sm" style={{ width: `${percent}%` }} />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>完成当前要求后，按钮会点亮</span>
        <span>{percent}%</span>
      </div>
    </header>
  );
};

export default ProgressBar;
