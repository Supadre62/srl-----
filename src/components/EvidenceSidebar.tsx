import { useEffect, useMemo, useState } from 'react';
import { audioSlotLabels, imageSlotLabels, responseKeys, stageDefinitions, voiceKeys } from '../config/assessmentConfig';
import { AssessmentState, StageId } from '../types/assessment';
import { formatDuration } from '../utils/time';

interface EvidenceSidebarProps {
  state: AssessmentState;
  currentNodeTitle: string;
  currentStageId: StageId;
}

const hasText = (value?: string): boolean => (value ?? '').trim().length > 0;

const stage3NodeOrder = [
  'stage3_q1_direct',
  'stage3_q3_conflict_think',
  'stage3_mid_srl',
  'stage3_q4_variation_a',
  'stage3_result',
];

const text = {
  title: '\u8fc7\u7a0b\u8bc1\u636e',
  subTitle: '\u672c\u6b21\u8bb0\u5f55\u6301\u7eed\u66f4\u65b0',
  currentStage: '\u5f53\u524d\u9636\u6bb5',
  currentNode: '\u5f53\u524d\u8282\u70b9',
  elapsed: '\u5df2\u7528\u65f6\uff1a',
  caseId: '\u5f53\u524d\u6848\u4f8b ID\uff08\u7cfb\u7edf\u62bd\u53d6\uff09\uff1a',
  paperProgress: '\u7eb8\u9762\u4efb\u52a1\u8fdb\u5ea6',
  progressDesc: '\u8bf4\u660e\uff1a\u7f51\u9875\u4ec5\u505a\u6d41\u7a0b\u5f15\u5bfc\uff0c\u6b63\u5f0f\u4f5c\u7b54\u5728\u7eb8\u9762\u5b8c\u6210\u3002',
  srlStatus: 'SRL \u5b8c\u6210\u72b6\u6001',
  audioStatus: '\u97f3\u9891\u72b6\u6001',
  imageStatus: '\u56fe\u7247\u4e0a\u4f20\u72b6\u6001',
  scratchpad: '\u8349\u7a3f\u7eb8\u51c6\u5907\u72b6\u6001\uff1a',
  downloadCount: '\u6750\u6599\u4e0b\u8f7d\u8bb0\u5f55\uff1a',
  todo: '\u672c\u9636\u6bb5\u5f85\u5b8c\u6210\u4e8b\u9879',
} as const;

const EvidenceSidebar = ({ state, currentNodeTitle, currentStageId }: EvidenceSidebarProps) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const elapsedSeconds = Math.floor((now - state.startedAt) / 1000);
  const stageTodo = useMemo(
    () => stageDefinitions.find((stage) => stage.id === (currentStageId === 'result' ? 'stage4' : currentStageId))?.todoItems ?? [],
    [currentStageId],
  );

  const srlStatus = [
    {
      id: 'pre',
      label: '\u524d\u7f6e SRL',
      done:
        state.voiceResponses[voiceKeys.pre] === 'recorded' ||
        state.audioUploads.pre.uploaded ||
        hasText(state.textResponses[responseKeys.pre]),
    },
    {
      id: 'mid',
      label: '\u4e2d\u6bb5 SRL',
      done:
        state.voiceResponses[voiceKeys.mid] === 'recorded' ||
        state.audioUploads.mid.uploaded ||
        hasText(state.textResponses[responseKeys.mid]),
    },
    {
      id: 'post',
      label: '\u540e\u7f6e SRL',
      done:
        state.voiceResponses[voiceKeys.post] === 'recorded' ||
        state.audioUploads.post.uploaded ||
        hasText(state.textResponses[responseKeys.post]),
    },
  ];

  const taskProgress = useMemo(() => {
    const index = stage3NodeOrder.indexOf(state.currentNodeId);
    if (index >= 0) return Math.min(stage3NodeOrder.length, index + 1);
    if (currentStageId === 'stage4' || currentStageId === 'result') return stage3NodeOrder.length;
    return 0;
  }, [currentStageId, state.currentNodeId]);

  return (
    <div className="flex h-full flex-col gap-4">
      <header>
        <h3 className="text-lg font-semibold text-slate-900">{text.title}</h3>
        <p className="text-xs text-slate-500">{text.subTitle}</p>
      </header>

      <section className="panel-muted p-3 text-sm text-slate-700">
        <p className="text-xs font-semibold text-slate-500">{text.currentStage}</p>
        <p className="mt-1 font-semibold text-slate-900">{currentStageId}</p>
        <p className="mt-2 text-xs font-semibold text-slate-500">{text.currentNode}</p>
        <p className="mt-1">{currentNodeTitle}</p>
        <p className="mt-2 text-xs text-slate-500">
          {text.elapsed}
          {formatDuration(elapsedSeconds)}
        </p>
      </section>

      <section className="panel-muted p-3 text-xs text-slate-700">
        <p>
          {text.caseId}
          {state.activeCaseId}
        </p>
      </section>

      <section className="panel-muted p-3">
        <p className="text-sm font-semibold text-slate-900">{text.paperProgress}</p>
        <p className="mt-2 text-xs text-slate-700">
          {'\u8282\u70b9\u8fdb\u5ea6\uff1a'}
          {taskProgress} / {stage3NodeOrder.length}
        </p>
        <p className="mt-1 text-xs text-slate-700">{text.progressDesc}</p>
      </section>

      <section className="panel-muted p-3">
        <p className="text-sm font-semibold text-slate-900">{text.srlStatus}</p>
        <ul className="mt-2 space-y-1 text-xs text-slate-700">
          {srlStatus.map((item) => (
            <li key={item.id}>
              {item.label}
              {'\uff1a'}
              {item.done ? '\u5df2\u5b8c\u6210\uff08\u5f55\u97f3/\u4e0a\u4f20/\u6587\u5b57\uff09' : '\u5f85\u5b8c\u6210'}
            </li>
          ))}
          <li>
            {'Q3 Think-Aloud\uff1a'}
            {state.voiceResponses[voiceKeys.thinkQ3] === 'recorded' ? '\u5df2\u5b8c\u6210\u5f55\u97f3\u5360\u4f4d' : '\u5f85\u5b8c\u6210'}
          </li>
        </ul>
      </section>

      <section className="panel-muted p-3">
        <p className="text-sm font-semibold text-slate-900">{text.audioStatus}</p>
        <ul className="mt-2 space-y-1 text-xs text-slate-700">
          {Object.entries(state.audioUploads).map(([slot, upload]) => (
            <li key={slot}>
              {audioSlotLabels[slot as keyof typeof audioSlotLabels]}
              {'\uff1a'}
              {upload.uploaded ? `\u5df2\u4e0a\u4f20 ${upload.fileName ?? ''}` : '\u672a\u4e0a\u4f20'}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel-muted p-3">
        <p className="text-sm font-semibold text-slate-900">{text.imageStatus}</p>
        <ul className="mt-2 space-y-1 text-xs text-slate-700">
          {Object.entries(state.imageUploads).map(([slot, upload]) => (
            <li key={slot}>
              {imageSlotLabels[slot as keyof typeof imageSlotLabels]}
              {'\uff1a'}
              {upload.uploaded ? `\u5df2\u4e0a\u4f20 ${upload.fileName ?? ''}` : '\u672a\u4e0a\u4f20'}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel-muted p-3 text-xs text-slate-700">
        <p>
          {text.scratchpad}
          {state.scratchpadPrepared ? '\u5df2\u51c6\u5907' : '\u672a\u51c6\u5907'}
        </p>
        <p className="mt-1">
          {text.downloadCount}
          {state.downloadedFiles.length}
          {' \u9879'}
        </p>
      </section>

      <section className="panel-muted p-3">
        <p className="text-sm font-semibold text-slate-900">{text.todo}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-700">
          {stageTodo.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default EvidenceSidebar;
