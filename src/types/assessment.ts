export type StageId = 'stage1' | 'stage2' | 'stage3' | 'stage4' | 'result';

export type VoiceStatus = 'idle' | 'recording' | 'recorded';

export type MaterialKind = 'teaching' | 'task';

export type AudioSlotId = 'pre' | 'organize' | 'mid' | 'post' | 'thinkQ3';

export type ImageSlotId = 'answerSheet' | 'scratchSheet';

export type CaseMode = 'random_case' | 'pending_case';

export type QuestionProgressionType = 'direct' | 'interference' | 'conflict' | 'variation' | 'transfer';

export type ConfidenceLevel = '高' | '中' | '低';

export interface StageDefinition {
  id: Exclude<StageId, 'result'>;
  shortTitle: string;
  title: string;
  description: string;
  lockAfterLeave?: boolean;
  supportTips: string[];
  todoItems: string[];
}

export interface FlowNode {
  id: string;
  stageId: StageId;
  title: string;
  nextLabel?: string;
  hideNavigation?: boolean;
}

export interface TaskIntroConfig {
  heading: string;
  description: string;
  flowSummary: string[];
  completionCriteria: string[];
  scratchpadHint: string;
  downloadHint: string;
  warning: string;
}

export interface ResourceFile {
  id: string;
  name: string;
  description: string;
  fileType: string;
  printHint: string;
  mockUrl: string;
}

export interface MaterialBundle {
  id: string;
  kind: MaterialKind;
  title: string;
  description: string;
  files: ResourceFile[];
}

export interface VideoLessonConfig {
  title: string;
  summary: string;
  placeholderText: string;
  exampleTitle: string;
  exampleContent: string;
  checkPrompt: string;
  checkOptions: string[];
}

export interface TaskQuestionOption {
  id: string;
  label: string;
}

export interface TaskQuestion {
  id: string;
  type: QuestionProgressionType;
  title: string;
  requirement: string;
  prompt: string;
  options: TaskQuestionOption[];
  correctOptionId: string;
}

export interface CaseProfile {
  id: string;
  title: string;
  isPending?: boolean;
  taskGoal: string;
  taskDescription: string;
  videoLesson: VideoLessonConfig;
  teachingMaterials: MaterialBundle[];
  taskMaterials: MaterialBundle[];
  srlQuestions: {
    pre: string[];
    mid: string[];
    post: string[];
  };
  taskQuestions: TaskQuestion[];
}

export interface SrlQuestionGroup {
  id: 'pre' | 'mid' | 'post';
  title: string;
  description: string;
  mode: '题库抽题';
  questions: string[];
  answerPlaceholder: string;
}

export interface SrlSelection {
  pre: string[];
  mid: string[];
  post: string[];
}

export interface UploadFileState {
  uploaded: boolean;
  fileName?: string;
  timestamp?: string;
}

export interface EvidenceEvent {
  id: string;
  timestamp: string;
  stageId: StageId;
  nodeId: string;
  type: string;
  summary: string;
}

export interface DimensionMapping {
  dimension: string;
  level: string;
  alternativeLevel?: string;
  confidence: ConfidenceLevel;
  evidence: string;
}

export interface NarrativeReportData {
  narrative: string[];
  evidenceChain: string[];
  dimensions: DimensionMapping[];
}

export interface AssessmentState {
  currentStageId: StageId;
  currentNodeId: string;
  caseMode: CaseMode;
  activeCaseId: string;
  systemPrompt: string;
  srlSelection: SrlSelection;
  textResponses: Record<string, string>;
  voiceResponses: Record<string, VoiceStatus>;
  audioUploads: Record<AudioSlotId, UploadFileState>;
  imageUploads: Record<ImageSlotId, UploadFileState>;
  questionAnswers: Record<string, string>;
  questionResults: Record<string, boolean>;
  lessonPlayback: 'paused' | 'playing';
  lessonCheckChoice: string;
  downloadedFiles: string[];
  scratchpadPrepared: boolean;
  organizeRemainingSeconds: number;
  timeline: EvidenceEvent[];
  startedAt: number;
}
