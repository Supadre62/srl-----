import AudioUploadPanel from '../components/AudioUploadPanel';
import QuestionProgressionPanel from '../components/QuestionProgressionPanel';
import SrlQuestionPanel from '../components/SrlQuestionPanel';
import TaskIntroPanel from '../components/TaskIntroPanel';
import { buildSrlGroups, getCaseById, getTaskQuestionsByCase, responseKeys, taskIntroConfig, voiceKeys } from '../config/assessmentConfig';
import { useAssessment } from '../context/AssessmentContext';

interface Stage1EntryProps {
  nodeId: string;
}

const Stage1Entry = ({ nodeId }: Stage1EntryProps) => {
  const { state, setScratchpadPrepared, updateTextResponse, commitTextResponse, toggleVoice, uploadAudio, clearAudio } = useAssessment();

  const profile = getCaseById(state.activeCaseId);
  const allQuestions = getTaskQuestionsByCase(state.activeCaseId, state.systemPrompt);

  if (nodeId === 'stage1_overview') {
    return (
      <div className="space-y-5">
        <TaskIntroPanel
          config={taskIntroConfig}
          taskGoal={profile.taskGoal}
          taskDescription={profile.taskDescription}
          scratchpadPrepared={state.scratchpadPrepared}
          onToggleScratchpadPrepared={() => setScratchpadPrepared(!state.scratchpadPrepared)}
        />

        <section className="panel-muted p-4">
          <h3 className="text-base font-semibold text-slate-900">当前案例（系统抽取）</h3>
          <p className="mt-2 text-sm text-slate-700">{profile.title}</p>
          <p className="mt-1 text-xs text-slate-500">案例 ID：{state.activeCaseId}</p>
        </section>

        <QuestionProgressionPanel questions={allQuestions} modeLabel="固定顺序：直-干-冲-变-变-迁" compact />
      </div>
    );
  }

  const preGroup = buildSrlGroups(state.srlSelection).pre;
  return (
    <div className="space-y-5">
      <header>
        <h2 className="font-serif text-2xl font-semibold text-slate-900">前置 SRL 问题（教学前）</h2>
        <p className="mt-2 text-sm text-slate-700">推荐先录音再决定是否补文字。录音完成后可不填写文字。</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <SrlQuestionPanel
          group={preGroup}
          value={state.textResponses[responseKeys.pre] ?? ''}
          onChange={(value) => updateTextResponse(responseKeys.pre, value)}
          onSave={() => commitTextResponse(responseKeys.pre, preGroup.title)}
        />
        <AudioUploadPanel
          title="任务前音频上传"
          voiceStatus={state.voiceResponses[voiceKeys.pre] ?? 'idle'}
          uploadState={state.audioUploads.pre}
          onToggleRecord={() => toggleVoice(voiceKeys.pre)}
          onUploadFile={(fileName) => uploadAudio('pre', fileName)}
          onClearUpload={() => clearAudio('pre')}
        />
      </div>
    </div>
  );
};

export default Stage1Entry;
