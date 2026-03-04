import { useEffect, useMemo } from 'react';
import AppLayout from './components/AppLayout';
import EvidenceSidebar from './components/EvidenceSidebar';
import StageFooterActions from './components/StageFooterActions';
import StageStepper from './components/StageStepper';
import { appMeta, stageDefinitions, workflowNodes } from './config/assessmentConfig';
import { useAssessment } from './context/AssessmentContext';
import { useAssessmentFlow } from './hooks/useAssessmentFlow';
import ResultsPage from './stages/ResultsPage';
import Stage1Entry from './stages/Stage1Entry';
import Stage2Lesson from './stages/Stage2Lesson';
import Stage3Organization from './stages/Stage3Organization';
import Stage4Assessment from './stages/Stage4Assessment';
import { validateNodeReadiness } from './utils/validation';

const App = () => {
  const { state, setCurrentPosition, tickOrganizeTimer, resetAll } = useAssessment();
  const flow = useAssessmentFlow(workflowNodes, stageDefinitions);

  useEffect(() => {
    setCurrentPosition(flow.currentNode.stageId, flow.currentNode.id);
  }, [flow.currentNode.id, flow.currentNode.stageId, setCurrentPosition]);

  useEffect(() => {
    if (flow.currentNode.id !== 'stage2_organize') return undefined;
    if (state.organizeRemainingSeconds <= 0) return undefined;
    const timer = window.setInterval(() => tickOrganizeTimer(), 1000);
    return () => window.clearInterval(timer);
  }, [flow.currentNode.id, state.organizeRemainingSeconds, tickOrganizeTimer]);

  const validation = validateNodeReadiness(flow.currentNode.id, state);
  const stageForStepper = flow.currentStageId === 'result' ? 'stage4' : flow.currentStageId;

  const content = useMemo(() => {
    if (flow.currentNode.stageId === 'stage1') return <Stage1Entry nodeId={flow.currentNode.id} />;
    if (flow.currentNode.stageId === 'stage2') return <Stage2Lesson nodeId={flow.currentNode.id} />;
    if (flow.currentNode.stageId === 'stage3') return <Stage3Organization nodeId={flow.currentNode.id} />;
    if (flow.currentNode.stageId === 'stage4') return <Stage4Assessment nodeId={flow.currentNode.id} />;
    return (
      <ResultsPage
        state={state}
        onRestart={() => {
          flow.resetFlow();
          resetAll();
        }}
      />
    );
  }, [flow, resetAll, state]);

  const supportItems = stageDefinitions.find((item) => item.id === stageForStepper)?.supportTips ?? ['结果页可回看完整证据链。'];
  const nextLabel = flow.currentNode.nextLabel ?? (flow.isBoundaryToNextStage ? '进入下一阶段' : '下一步');

  const footer = flow.currentNode.hideNavigation ? (
    <p className="text-sm text-slate-600">结果页已显示叙事摘要、10维映射和证据链摘要。</p>
  ) : (
    <StageFooterActions
      canGoPrev={flow.canGoPrev}
      canGoNext={flow.canGoNext}
      nextLabel={nextLabel}
      validationMessage={validation.message}
      valid={validation.valid}
      onPrev={flow.goPrev}
      onNext={flow.goNext}
    />
  );

  const showEvidenceSidebar = flow.currentNode.id === 'stage4_waiting' || flow.currentNode.id === 'result_report';

  return (
    <AppLayout
      title={appMeta.title}
      subtitle={appMeta.subtitle}
      stepper={
        <StageStepper
          stages={stageDefinitions}
          currentStageId={stageForStepper}
          visitedStageIds={flow.visitedStageIds}
          lockedStageIds={flow.lockedStageIds}
          onSelectStage={flow.goToStage}
        />
      }
      supportPanel={
        <div>
          <p className="text-sm font-semibold text-slate-900">辅助信息区</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {supportItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      }
      sidebar={showEvidenceSidebar ? <EvidenceSidebar state={state} currentNodeTitle={flow.currentNode.title} currentStageId={flow.currentStageId} /> : undefined}
      footer={footer}
    >
      {content}
    </AppLayout>
  );
};

export default App;
