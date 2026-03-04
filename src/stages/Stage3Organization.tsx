import AudioUploadPanel from '../components/AudioUploadPanel';
import MaterialDownloadPanel from '../components/MaterialDownloadPanel';
import SrlQuestionPanel from '../components/SrlQuestionPanel';
import TaskStageResultPanel from '../components/TaskStageResultPanel';
import { buildSrlGroups, getCaseById, getTaskQuestionByIndex, responseKeys, voiceKeys } from '../config/assessmentConfig';
import { useAssessment } from '../context/AssessmentContext';
import { TaskQuestion } from '../types/assessment';

interface Stage3OrganizationProps {
  nodeId: string;
}

interface PaperTaskGuideCardProps {
  heading: string;
  message: string;
  tips: string[];
  questions?: TaskQuestion[];
}

const text = {
  typeTitle: '\u672c\u9875\u9898\u578b\u8bf4\u660e\uff08\u7eb8\u9762\u4f5c\u7b54\uff09',
  requirement: '\u8003\u67e5\u70b9\uff1a',
  reminders: '\u672c\u9875\u5f15\u5bfc',
  stageStart: '\u4efb\u52a1\u5f00\u59cb\uff08Q1-Q2\uff09',
  stageMiddle: '\u4efb\u52a1\u4e2d\uff08Q4-Q6\uff09',
  thinkTitle: 'Q3 Think-Aloud \u5f55\u97f3',
  thinkNotice: 'Think-Aloud \u63d0\u793a\uff08\u5fc5\u987b\u5b8c\u6210\uff09',
  midSrl: '\u4e2d\u6bb5 SRL \u95ee\u9898',
  taskDownload: '\u4efb\u52a1\u6750\u6599\u4e0b\u8f7d',
} as const;

const PaperTaskGuideCard = ({ heading, message, tips, questions }: PaperTaskGuideCardProps) => {
  return (
    <section className="space-y-4">
      <header>
        <h2 className="font-serif text-2xl font-semibold text-slate-900">{heading}</h2>
        <p className="mt-2 text-sm text-slate-700">{message}</p>
      </header>

      {questions && questions.length > 0 ? (
        <section className="panel-muted p-4">
          <p className="text-sm font-semibold text-slate-900">{text.typeTitle}</p>
          <div className="mt-2 grid gap-2">
            {questions.map((question, index) => (
              <article key={question.id} className="rounded-lg border border-slate-200 bg-white p-3">
                <p className="text-sm font-semibold text-slate-900">
                  {index + 1}. {question.title}
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  {text.requirement}
                  {question.requirement}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="panel-muted p-4">
        <p className="text-sm font-semibold text-slate-900">{text.reminders}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          {tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>
    </section>
  );
};

const Stage3Organization = ({ nodeId }: Stage3OrganizationProps) => {
  const { state, registerDownload, updateTextResponse, commitTextResponse, toggleVoice, uploadAudio, clearAudio } = useAssessment();

  const profile = getCaseById(state.activeCaseId);
  const q1 = getTaskQuestionByIndex(state.activeCaseId, state.systemPrompt, 0);
  const q2 = getTaskQuestionByIndex(state.activeCaseId, state.systemPrompt, 1);
  const q3 = getTaskQuestionByIndex(state.activeCaseId, state.systemPrompt, 2);
  const q4 = getTaskQuestionByIndex(state.activeCaseId, state.systemPrompt, 3);
  const q5 = getTaskQuestionByIndex(state.activeCaseId, state.systemPrompt, 4);
  const q6 = getTaskQuestionByIndex(state.activeCaseId, state.systemPrompt, 5);
  const midGroup = buildSrlGroups(state.srlSelection).mid;

  if (nodeId === 'stage3_q1_direct') {
    return (
      <div className="space-y-5">
        <PaperTaskGuideCard
          heading={text.stageStart}
          message={'\u8bf7\u5148\u4e0b\u8f7d\u4efb\u52a1\u6750\u6599\uff0c\u518d\u5728\u7eb8\u9762\u5b8c\u6210 Q1-Q2\u3002\u7f51\u9875\u4e0d\u8fdb\u884c\u5728\u7ebf\u7b54\u9898\u3002'}
          questions={[q1, q2].filter((item): item is TaskQuestion => Boolean(item))}
          tips={[
            '\u8bf7\u5728\u6253\u5370\u6750\u6599\u4e0a\u5de5\u6574\u4e66\u5199\u3002',
            '\u8fd9\u4e00\u9875\u53ea\u8bf4\u660e\u9898\u578b\u4e0e\u8003\u67e5\u70b9\uff0c\u4e0d\u5c55\u793a\u9009\u9879\u3002',
            '\u5b8c\u6210 Q1-Q2 \u540e\u56de\u5230\u7f51\u9875\u8fdb\u5165 Q3 \u5f55\u97f3\u3002',
          ]}
        />
        <MaterialDownloadPanel title={text.taskDownload} bundles={profile.taskMaterials} onDownload={registerDownload} />
      </div>
    );
  }

  if (nodeId === 'stage3_q3_conflict_think') {
    return (
      <div className="space-y-5">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-900">{text.thinkNotice}</p>
          <p className="mt-1 text-sm text-amber-800">
            {
              '\u8bf7\u5148\u5f00\u542f\u5f55\u97f3\u5360\u4f4d\uff0c\u8fb9\u60f3\u8fb9\u8bf4\u5b8c\u6210\u7b2c 3 \u9898\u3002\u53ea\u6709\u5f55\u97f3\u72b6\u6001\u4e3a\u201c\u5df2\u5b8c\u6210\u5f55\u97f3\u5360\u4f4d\u201d\u624d\u53ef\u8fdb\u5165\u4e0b\u4e00\u6b65\u3002'
            }
          </p>
        </div>

        <PaperTaskGuideCard
          heading={text.thinkTitle}
          message={'\u672c\u9898\u5728\u7eb8\u9762\u5b8c\u6210\uff0c\u540c\u65f6\u6253\u5f00\u5f55\u97f3\u8bb2\u51fa\u4f60\u7684\u5224\u65ad\u8fc7\u7a0b\u3002'}
          questions={[q3].filter((item): item is TaskQuestion => Boolean(item))}
          tips={[
            '\u5efa\u8bae\u5148\u70b9\u51fb\u201c\u5f00\u59cb\u5f55\u97f3\u5360\u4f4d\u201d\u3002',
            '\u5b8c\u6210\u9898\u76ee\u540e\u70b9\u51fb\u201c\u7ed3\u675f\u5f55\u97f3\u5360\u4f4d\u201d\u3002',
            '\u8be5\u5f55\u97f3\u662f\u6838\u5fc3\u8fc7\u7a0b\u8bc1\u636e\u3002',
          ]}
        />

        <AudioUploadPanel
          title={text.thinkTitle}
          voiceStatus={state.voiceResponses[voiceKeys.thinkQ3] ?? 'idle'}
          uploadState={state.audioUploads.thinkQ3}
          onToggleRecord={() => toggleVoice(voiceKeys.thinkQ3)}
          onUploadFile={(fileName) => uploadAudio('thinkQ3', fileName)}
          onClearUpload={() => clearAudio('thinkQ3')}
        />
      </div>
    );
  }

  if (nodeId === 'stage3_mid_srl') {
    return (
      <div className="space-y-5">
        <header>
          <h2 className="font-serif text-2xl font-semibold text-slate-900">{text.midSrl}</h2>
          <p className="mt-2 text-sm text-slate-700">
            {
              '\u8bf7\u628a\u6ce8\u610f\u529b\u62c9\u56de\u7f51\u9875\uff0c\u56de\u7b54\u4e2d\u6bb5 SRL \u95ee\u9898\u3002\u63a8\u8350\u5148\u5f55\u97f3\uff0c\u518d\u51b3\u5b9a\u662f\u5426\u8865\u5145\u6587\u5b57\u3002'
            }
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <SrlQuestionPanel
            group={midGroup}
            value={state.textResponses[responseKeys.mid] ?? ''}
            onChange={(value) => updateTextResponse(responseKeys.mid, value)}
            onSave={() => commitTextResponse(responseKeys.mid, midGroup.title)}
          />
          <AudioUploadPanel
            title={'\u4e2d\u6bb5 SRL \u97f3\u9891'}
            voiceStatus={state.voiceResponses[voiceKeys.mid] ?? 'idle'}
            uploadState={state.audioUploads.mid}
            onToggleRecord={() => toggleVoice(voiceKeys.mid)}
            onUploadFile={(fileName) => uploadAudio('mid', fileName)}
            onClearUpload={() => clearAudio('mid')}
          />
        </div>
      </div>
    );
  }

  if (nodeId === 'stage3_q4_variation_a') {
    return (
      <PaperTaskGuideCard
        heading={text.stageMiddle}
        message={'\u8bf7\u5728\u7eb8\u9762\u7ee7\u7eed\u5b8c\u6210 Q4-Q6\uff0c\u7f51\u9875\u4ec5\u5c55\u793a\u9898\u578b\u4e0e\u8003\u67e5\u70b9\u3002'}
        questions={[q4, q5, q6].filter((item): item is TaskQuestion => Boolean(item))}
        tips={[
          '\u672c\u9875\u4e0d\u5c55\u793a\u5177\u4f53\u9898\u5e72\u548c\u9009\u9879\uff0c\u8bf7\u76f4\u63a5\u5728\u7eb8\u9762\u4f5c\u7b54\u3002',
          '\u5b8c\u6210 Q4-Q6 \u540e\u70b9\u51fb\u4e0b\u4e00\u6b65\u8fdb\u5165\u201c\u7b54\u9898\u7ed3\u675f\u201d\u3002',
        ]}
      />
    );
  }

  return <TaskStageResultPanel />;
};

export default Stage3Organization;
