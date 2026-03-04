import AudioUploadPanel from '../components/AudioUploadPanel';
import ImageUploadPanel from '../components/ImageUploadPanel';
import SrlQuestionPanel from '../components/SrlQuestionPanel';
import { buildSrlGroups, responseKeys, voiceKeys } from '../config/assessmentConfig';
import { useAssessment } from '../context/AssessmentContext';

interface Stage4AssessmentProps {
  nodeId: string;
}

const Stage4Assessment = ({ nodeId }: Stage4AssessmentProps) => {
  const { state, updateTextResponse, commitTextResponse, toggleVoice, uploadAudio, clearAudio, uploadImage, clearImage } = useAssessment();
  const postGroup = buildSrlGroups(state.srlSelection).post;

  if (nodeId === 'stage4_post_srl') {
    return (
      <div className="space-y-5">
        <header>
          <h2 className="font-serif text-2xl font-semibold text-slate-900">{'\u540e\u7f6e SRL \u95ee\u9898'}</h2>
          <p className="mt-2 text-sm text-slate-700">
            {'\u4efb\u52a1\u5df2\u7ed3\u675f\uff0c\u8bf7\u5148\u5b8c\u6210\u540e\u7f6e SRL \u56de\u7b54\u3002\u63a8\u8350\u5148\u5f55\u97f3\uff0c\u5f55\u97f3\u5b8c\u6210\u540e\u53ef\u4e0d\u586b\u5199\u6587\u5b57\u3002'}
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <SrlQuestionPanel
            group={postGroup}
            value={state.textResponses[responseKeys.post] ?? ''}
            onChange={(value) => updateTextResponse(responseKeys.post, value)}
            onSave={() => commitTextResponse(responseKeys.post, postGroup.title)}
          />
          <AudioUploadPanel
            title={'\u4efb\u52a1\u540e\u97f3\u9891'}
            voiceStatus={state.voiceResponses[voiceKeys.post] ?? 'idle'}
            uploadState={state.audioUploads.post}
            onToggleRecord={() => toggleVoice(voiceKeys.post)}
            onUploadFile={(fileName) => uploadAudio('post', fileName)}
            onClearUpload={() => clearAudio('post')}
          />
        </div>
      </div>
    );
  }

  if (nodeId === 'stage4_submit') {
    return (
      <div className="space-y-5">
        <header>
          <h2 className="font-serif text-2xl font-semibold text-slate-900">{'\u62cd\u7167\u4e0a\u4f20'}</h2>
          <p className="mt-2 text-sm text-slate-700">
            {'\u8bf7\u4e0a\u4f20\u7b54\u9898\u7eb8\u4e0e\u8349\u7a3f\u7eb8\u7167\u7247\u3002\u4e0a\u4f20\u5b8c\u6210\u540e\u8fdb\u5165\u62a5\u544a\u5206\u6790\u7b49\u5f85\u9875\u3002'}
          </p>
        </header>

        <ImageUploadPanel
          title={'\u4efb\u52a1\u56fe\u7247\u4e0a\u4f20'}
          items={[
            {
              id: 'answerSheet',
              title: '\u7b54\u9898\u7eb8\u56fe\u7247\u4e0a\u4f20',
              description: '\u8bf7\u62cd\u6e05\u6670\u6574\u5f20\u7b54\u9898\u7eb8\uff0c\u786e\u4fdd\u5b57\u8ff9\u53ef\u8bc6\u522b\u3002',
              state: state.imageUploads.answerSheet,
              onUploadFile: (fileName) => uploadImage('answerSheet', fileName),
              onClearUpload: () => clearImage('answerSheet'),
            },
            {
              id: 'scratchSheet',
              title: '\u8349\u7a3f\u7eb8\u56fe\u7247\u4e0a\u4f20',
              description: '\u8bf7\u4e0a\u4f20\u8349\u7a3f\u7eb8\u7167\u7247\uff0c\u7528\u4e8e\u8865\u5145\u8fc7\u7a0b\u8bc1\u636e\u3002',
              state: state.imageUploads.scratchSheet,
              onUploadFile: (fileName) => uploadImage('scratchSheet', fileName),
              onClearUpload: () => clearImage('scratchSheet'),
            },
          ]}
        />

        <section className="panel-muted p-4 text-sm text-slate-700">
          <p>{'\u5f53\u524d\u4e0a\u4f20\u72b6\u6001\uff1a'}</p>
          <p className="mt-2">
            {'\u7b54\u9898\u7eb8\uff1a'}
            {state.imageUploads.answerSheet.uploaded
              ? `\u5df2\u4e0a\u4f20 ${state.imageUploads.answerSheet.fileName ?? ''}`
              : '\u672a\u4e0a\u4f20'}
          </p>
          <p className="mt-1">
            {'\u8349\u7a3f\u7eb8\uff1a'}
            {state.imageUploads.scratchSheet.uploaded
              ? `\u5df2\u4e0a\u4f20 ${state.imageUploads.scratchSheet.fileName ?? ''}`
              : '\u672a\u4e0a\u4f20'}
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <header>
        <h2 className="font-serif text-2xl font-semibold text-slate-900">{'\u7b49\u5f85\u62a5\u544a\u8f93\u51fa'}</h2>
        <p className="mt-2 text-sm text-slate-700">
          {'\u7cfb\u7edf\u5c06\u7ed3\u5408 OCR \u4e0e SRL \u97f3\u9891\u5206\u6790\u751f\u6210\u53d9\u4e8b\u5f0f\u62a5\u544a\uff0c\u8bf7\u8010\u5fc3\u7b49\u5f85\u3002'}
        </p>
      </header>

      <section className="panel-muted p-4">
        <p className="text-sm font-semibold text-slate-900">{'\u5904\u7406\u8bf4\u660e'}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>{'\u7cfb\u7edf\u6b63\u5728\u89e3\u6790\u7b54\u9898\u7eb8\u4e0e\u8349\u7a3f\u7eb8\u56fe\u7247\u5185\u5bb9\u3002'}</li>
          <li>{'\u7cfb\u7edf\u6b63\u5728\u5206\u6790\u524d/\u4e2d/\u540e SRL \u97f3\u9891\u4e0e\u5173\u952e\u8fc7\u7a0b\u7ebf\u7d22\u3002'}</li>
          <li>{'\u9884\u8ba1\u9700\u8981\u4e00\u6bb5\u65f6\u95f4\u5b8c\u6210\u7efc\u5408\u62a5\u544a\u751f\u6210\u3002'}</li>
        </ul>
      </section>

      <section className="panel-muted p-4">
        <p className="text-sm font-semibold text-slate-900">{'\u67e5\u770b\u65b9\u5f0f'}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>{'\u5206\u6790\u5b8c\u6210\u540e\u53ef\u53d1\u9001\u81f3\u767b\u8bb0\u90ae\u7bb1\u3002'}</li>
          <li>{'\u4e5f\u53ef\u5728\u7ea6 2 \u5c0f\u65f6\u540e\u8fd4\u56de\u672c\u9875\u9762\u67e5\u770b\u5206\u6790\u7ed3\u679c\u3002'}</li>
        </ul>
      </section>
    </div>
  );
};

export default Stage4Assessment;
