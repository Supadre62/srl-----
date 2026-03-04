interface StageFooterActionsProps {
  canGoPrev: boolean;
  canGoNext: boolean;
  nextLabel: string;
  validationMessage?: string;
  valid: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const StageFooterActions = ({ canGoPrev, canGoNext, nextLabel, validationMessage, valid, onPrev, onNext }: StageFooterActionsProps) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <p className={`text-sm ${valid ? 'text-slate-500' : 'text-rose-700'}`}>{valid ? '当前节点已满足进入下一步条件。' : validationMessage}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canGoPrev}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          上一步
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext || !valid}
          className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
};

export default StageFooterActions;
