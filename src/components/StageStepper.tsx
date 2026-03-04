import { StageDefinition, StageId } from '../types/assessment';

interface StageStepperProps {
  stages: StageDefinition[];
  currentStageId: StageId;
  visitedStageIds: StageId[];
  lockedStageIds: StageId[];
  onSelectStage: (stageId: StageId) => void;
}

const StageStepper = ({ stages, currentStageId, visitedStageIds, lockedStageIds, onSelectStage }: StageStepperProps) => {
  return (
    <div className="grid gap-2 md:grid-cols-4">
      {stages.map((stage) => {
        const active = stage.id === currentStageId;
        const visited = visitedStageIds.includes(stage.id);
        const locked = lockedStageIds.includes(stage.id) && !active;
        const disabled = !visited || locked;
        return (
          <button
            key={stage.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelectStage(stage.id)}
            className={`rounded-xl border px-3 py-3 text-left transition ${
              active
                ? 'border-brand-700 bg-brand-50 shadow-sm'
                : disabled
                  ? 'border-slate-200 bg-slate-50 text-slate-400'
                  : 'border-slate-200 bg-white hover:border-brand-600 hover:bg-brand-50/40'
            }`}
          >
            <p className="text-xs font-semibold text-slate-500">{stage.shortTitle}</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">{stage.title}</p>
            <p className="mt-1 text-xs text-slate-500">{locked ? '已锁定不可回退' : stage.description}</p>
          </button>
        );
      })}
    </div>
  );
};

export default StageStepper;
