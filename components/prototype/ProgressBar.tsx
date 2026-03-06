interface ProgressBarProps {
  current: number;
  total: number;
  label: string;
}

const ProgressBar = ({ current, total, label }: ProgressBarProps) => {
  const percent = Math.round((current / total) * 100);

  return (
    <header className="panel space-y-3">
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>流程进度</span>
        <span>
          {current}/{total}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-brand-600" style={{ width: `${percent}%` }} />
      </div>
      <p className="text-sm font-semibold text-slate-800">当前页面：{label}</p>
    </header>
  );
};

export default ProgressBar;
