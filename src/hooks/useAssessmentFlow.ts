import { useMemo, useState } from 'react';
import { FlowNode, StageDefinition, StageId } from '../types/assessment';

interface FlowApi {
  currentNode: FlowNode;
  currentStageId: StageId;
  currentNodeIndex: number;
  visitedStageIds: StageId[];
  lockedStageIds: StageId[];
  canGoPrev: boolean;
  canGoNext: boolean;
  isBoundaryToNextStage: boolean;
  goNext: () => void;
  goPrev: () => void;
  goToStage: (stageId: StageId) => void;
  resetFlow: () => void;
}

export const useAssessmentFlow = (nodes: FlowNode[], stageDefs: StageDefinition[]): FlowApi => {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [visitedStageIds, setVisitedStageIds] = useState<StageId[]>(['stage1']);
  const [lockedStageIds, setLockedStageIds] = useState<StageId[]>([]);

  const currentNode = nodes[currentNodeIndex];
  const currentStageId = currentNode.stageId;

  const canGoNext = currentNodeIndex < nodes.length - 1;
  const isBoundaryToNextStage = canGoNext && nodes[currentNodeIndex + 1].stageId !== currentNode.stageId;

  const canGoPrev = useMemo(() => {
    if (currentNodeIndex === 0) return false;
    const prev = nodes[currentNodeIndex - 1];
    if (prev.stageId !== currentNode.stageId && lockedStageIds.includes(prev.stageId)) {
      return false;
    }
    return true;
  }, [currentNode.stageId, currentNodeIndex, lockedStageIds, nodes]);

  const goNext = () => {
    if (!canGoNext) return;
    const current = nodes[currentNodeIndex];
    const next = nodes[currentNodeIndex + 1];
    if (next.stageId !== current.stageId) {
      const stageDef = stageDefs.find((item) => item.id === current.stageId);
      if (stageDef?.lockAfterLeave) {
        setLockedStageIds((prev) => (prev.includes(current.stageId) ? prev : [...prev, current.stageId]));
      }
      setVisitedStageIds((prev) => (prev.includes(next.stageId) ? prev : [...prev, next.stageId]));
    }
    setCurrentNodeIndex((prev) => prev + 1);
  };

  const goPrev = () => {
    if (!canGoPrev) return;
    setCurrentNodeIndex((prev) => Math.max(0, prev - 1));
  };

  const goToStage = (stageId: StageId) => {
    if (!visitedStageIds.includes(stageId)) return;
    if (lockedStageIds.includes(stageId) && stageId !== currentStageId) return;
    const targetIndex = nodes.findIndex((item) => item.stageId === stageId);
    if (targetIndex < 0) return;
    setCurrentNodeIndex(targetIndex);
  };

  const resetFlow = () => {
    setCurrentNodeIndex(0);
    setVisitedStageIds(['stage1']);
    setLockedStageIds([]);
  };

  return {
    currentNode,
    currentStageId,
    currentNodeIndex,
    visitedStageIds,
    lockedStageIds,
    canGoPrev,
    canGoNext,
    isBoundaryToNextStage,
    goNext,
    goPrev,
    goToStage,
    resetFlow,
  };
};
