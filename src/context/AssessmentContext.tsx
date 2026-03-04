import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';
import { getPendingCaseId, pickInitialCaseId, pickSrlQuestions } from '../config/assessmentConfig';
import { AssessmentState, AudioSlotId, CaseMode, ImageSlotId, StageId, VoiceStatus } from '../types/assessment';
import { formatTimestamp } from '../utils/time';

interface AssessmentContextValue {
  state: AssessmentState;
  updateTextResponse: (key: string, value: string) => void;
  commitTextResponse: (key: string, label: string) => void;
  toggleVoice: (key: string) => void;
  setCaseMode: (mode: CaseMode) => void;
  drawRandomCase: () => void;
  setSystemPrompt: (value: string) => void;
  setLessonPlayback: (mode: 'paused' | 'playing') => void;
  setLessonCheckChoice: (value: string) => void;
  registerDownload: (fileId: string, fileName: string) => void;
  setQuestionAnswer: (questionId: string, optionId: string, correctOptionId: string) => void;
  uploadAudio: (slot: AudioSlotId, fileName: string) => void;
  clearAudio: (slot: AudioSlotId) => void;
  uploadImage: (slot: ImageSlotId, fileName: string) => void;
  clearImage: (slot: ImageSlotId) => void;
  setScratchpadPrepared: (ready: boolean) => void;
  tickOrganizeTimer: () => void;
  setCurrentPosition: (stageId: StageId, nodeId: string) => void;
  resetAll: () => void;
}

const emptyUpload = { uploaded: false as const };

const buildInitialState = (): AssessmentState => {
  const caseId = pickInitialCaseId();
  return {
    currentStageId: 'stage1',
    currentNodeId: 'stage1_overview',
    caseMode: 'random_case',
    activeCaseId: caseId,
    systemPrompt: '',
    srlSelection: pickSrlQuestions({ pre: 4, mid: 3, post: 4 }),
    textResponses: {},
    voiceResponses: {},
    audioUploads: {
      pre: emptyUpload,
      organize: emptyUpload,
      mid: emptyUpload,
      post: emptyUpload,
      thinkQ3: emptyUpload,
    },
    imageUploads: {
      answerSheet: emptyUpload,
      scratchSheet: emptyUpload,
    },
    questionAnswers: {},
    questionResults: {},
    lessonPlayback: 'paused',
    lessonCheckChoice: '',
    downloadedFiles: [],
    scratchpadPrepared: false,
    organizeRemainingSeconds: 8 * 60,
    timeline: [
      {
        id: `evt-${Date.now()}`,
        timestamp: formatTimestamp(),
        stageId: 'stage1',
        nodeId: 'stage1_overview',
        type: 'system',
        summary: `进入流程，系统已抽取案例：${caseId}`,
      },
    ],
    startedAt: Date.now(),
  };
};

const AssessmentContext = createContext<AssessmentContextValue | undefined>(undefined);

const pushTimeline = (
  state: AssessmentState,
  type: string,
  summary: string,
  stageId = state.currentStageId,
  nodeId = state.currentNodeId,
): AssessmentState => ({
  ...state,
  timeline: [
    ...state.timeline,
    {
      id: `evt-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      timestamp: formatTimestamp(),
      stageId,
      nodeId,
      type,
      summary,
    },
  ],
});

const voiceTransition: Record<VoiceStatus, VoiceStatus> = {
  idle: 'recording',
  recording: 'recorded',
  recorded: 'idle',
};

export const AssessmentProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<AssessmentState>(() => buildInitialState());

  const updateTextResponse = useCallback((key: string, value: string) => {
    setState((prev) => ({
      ...prev,
      textResponses: {
        ...prev.textResponses,
        [key]: value,
      },
    }));
  }, []);

  const commitTextResponse = useCallback((key: string, label: string) => {
    setState((prev) => {
      const value = (prev.textResponses[key] ?? '').trim();
      if (!value) return prev;
      const brief = value.length > 30 ? `${value.slice(0, 30)}...` : value;
      return pushTimeline(prev, 'text', `${label}：${brief}`);
    });
  }, []);

  const toggleVoice = useCallback((key: string) => {
    setState((prev) => {
      const current = prev.voiceResponses[key] ?? 'idle';
      const next = voiceTransition[current];
      const updated = {
        ...prev,
        voiceResponses: {
          ...prev.voiceResponses,
          [key]: next,
        },
      };
      const actionText = next === 'recording' ? '开始录音占位' : next === 'recorded' ? '完成录音占位' : '重置录音占位';
      return pushTimeline(updated, 'voice', `${key}：${actionText}`);
    });
  }, []);

  const setCaseMode = useCallback((mode: CaseMode) => {
    setState((prev) => {
      if (mode === prev.caseMode) return prev;
      const nextCaseId = mode === 'pending_case' ? getPendingCaseId() : pickInitialCaseId();
      const updated: AssessmentState = {
        ...prev,
        caseMode: mode,
        activeCaseId: nextCaseId,
        questionAnswers: {},
        questionResults: {},
        srlSelection: pickSrlQuestions({ pre: 4, mid: 3, post: 4 }),
      };
      const modeLabel = mode === 'pending_case' ? '待定模式' : '随机模式';
      return pushTimeline(updated, 'case', `案例模式切换为：${modeLabel}（${nextCaseId}）`);
    });
  }, []);

  const drawRandomCase = useCallback(() => {
    setState((prev) => {
      const nextCaseId = pickInitialCaseId();
      const updated: AssessmentState = {
        ...prev,
        caseMode: 'random_case',
        activeCaseId: nextCaseId,
        questionAnswers: {},
        questionResults: {},
        srlSelection: pickSrlQuestions({ pre: 4, mid: 3, post: 4 }),
      };
      return pushTimeline(updated, 'case', `重新抽取案例：${nextCaseId}`);
    });
  }, []);

  const setSystemPrompt = useCallback((value: string) => {
    setState((prev) => ({
      ...prev,
      systemPrompt: value,
    }));
  }, []);

  const setLessonPlayback = useCallback((mode: 'paused' | 'playing') => {
    const label = mode === 'playing' ? '播放中' : '暂停';
    setState((prev) => pushTimeline({ ...prev, lessonPlayback: mode }, 'lesson', `微课状态：${label}`));
  }, []);

  const setLessonCheckChoice = useCallback((value: string) => {
    setState((prev) => pushTimeline({ ...prev, lessonCheckChoice: value }, 'lesson-check', `教学确认：${value}`));
  }, []);

  const registerDownload = useCallback((fileId: string, fileName: string) => {
    setState((prev) => {
      if (prev.downloadedFiles.includes(fileId)) {
        return pushTimeline(prev, 'download', `再次下载：${fileName}`);
      }
      const updated = {
        ...prev,
        downloadedFiles: [...prev.downloadedFiles, fileId],
      };
      return pushTimeline(updated, 'download', `下载材料：${fileName}`);
    });
  }, []);

  const setQuestionAnswer = useCallback((questionId: string, optionId: string, correctOptionId: string) => {
    setState((prev) => {
      const isCorrect = optionId === correctOptionId;
      const updated = {
        ...prev,
        questionAnswers: {
          ...prev.questionAnswers,
          [questionId]: optionId,
        },
        questionResults: {
          ...prev.questionResults,
          [questionId]: isCorrect,
        },
      };
      return pushTimeline(updated, 'question', `${questionId} 已完成作答`);
    });
  }, []);

  const uploadAudio = useCallback((slot: AudioSlotId, fileName: string) => {
    setState((prev) => {
      const updated = {
        ...prev,
        audioUploads: {
          ...prev.audioUploads,
          [slot]: {
            uploaded: true,
            fileName,
            timestamp: formatTimestamp(),
          },
        },
      };
      return pushTimeline(updated, 'audio-upload', `${slot} 音频已上传：${fileName}`);
    });
  }, []);

  const clearAudio = useCallback((slot: AudioSlotId) => {
    setState((prev) => {
      const updated = {
        ...prev,
        audioUploads: {
          ...prev.audioUploads,
          [slot]: { uploaded: false },
        },
      };
      return pushTimeline(updated, 'audio-upload', `${slot} 音频已清除`);
    });
  }, []);

  const uploadImage = useCallback((slot: ImageSlotId, fileName: string) => {
    setState((prev) => {
      const updated = {
        ...prev,
        imageUploads: {
          ...prev.imageUploads,
          [slot]: {
            uploaded: true,
            fileName,
            timestamp: formatTimestamp(),
          },
        },
      };
      return pushTimeline(updated, 'image-upload', `${slot} 图片已上传：${fileName}`);
    });
  }, []);

  const clearImage = useCallback((slot: ImageSlotId) => {
    setState((prev) => {
      const updated = {
        ...prev,
        imageUploads: {
          ...prev.imageUploads,
          [slot]: { uploaded: false },
        },
      };
      return pushTimeline(updated, 'image-upload', `${slot} 图片已清除`);
    });
  }, []);

  const setScratchpadPrepared = useCallback((ready: boolean) => {
    const summary = ready ? '已准备草稿纸' : '取消草稿纸准备标记';
    setState((prev) => pushTimeline({ ...prev, scratchpadPrepared: ready }, 'scratchpad', summary));
  }, []);

  const tickOrganizeTimer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      organizeRemainingSeconds: Math.max(0, prev.organizeRemainingSeconds - 1),
    }));
  }, []);

  const setCurrentPosition = useCallback((stageId: StageId, nodeId: string) => {
    setState((prev) => {
      if (prev.currentStageId === stageId && prev.currentNodeId === nodeId) return prev;
      const updated = {
        ...prev,
        currentStageId: stageId,
        currentNodeId: nodeId,
      };
      return pushTimeline(updated, 'node', `进入节点：${nodeId}`, stageId, nodeId);
    });
  }, []);

  const resetAll = useCallback(() => {
    setState(buildInitialState());
  }, []);

  const value = useMemo(
    () => ({
      state,
      updateTextResponse,
      commitTextResponse,
      toggleVoice,
      setCaseMode,
      drawRandomCase,
      setSystemPrompt,
      setLessonPlayback,
      setLessonCheckChoice,
      registerDownload,
      setQuestionAnswer,
      uploadAudio,
      clearAudio,
      uploadImage,
      clearImage,
      setScratchpadPrepared,
      tickOrganizeTimer,
      setCurrentPosition,
      resetAll,
    }),
    [
      state,
      updateTextResponse,
      commitTextResponse,
      toggleVoice,
      setCaseMode,
      drawRandomCase,
      setSystemPrompt,
      setLessonPlayback,
      setLessonCheckChoice,
      registerDownload,
      setQuestionAnswer,
      uploadAudio,
      clearAudio,
      uploadImage,
      clearImage,
      setScratchpadPrepared,
      tickOrganizeTimer,
      setCurrentPosition,
      resetAll,
    ],
  );

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
};

export const useAssessment = (): AssessmentContextValue => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within AssessmentProvider');
  }
  return context;
};
