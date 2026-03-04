import MaterialDownloadPanel from '../components/MaterialDownloadPanel';
import VideoLessonPanel from '../components/VideoLessonPanel';
import { getCaseById } from '../config/assessmentConfig';
import { useAssessment } from '../context/AssessmentContext';

interface Stage2LessonProps {
  nodeId: string;
}

const Stage2Lesson = ({ nodeId }: Stage2LessonProps) => {
  const { state, setLessonPlayback, setLessonCheckChoice, registerDownload } = useAssessment();

  const profile = getCaseById(state.activeCaseId);
  const lesson = profile.videoLesson;

  if (nodeId === 'stage2_teach_video') {
    return (
      <div className="space-y-4">
        <VideoLessonPanel
          config={lesson}
          playback={state.lessonPlayback}
          onPlay={() => setLessonPlayback('playing')}
          onPause={() => setLessonPlayback('paused')}
          onReplay={() => {
            setLessonPlayback('paused');
            setLessonPlayback('playing');
          }}
        />
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
          {'\u672c\u9636\u6bb5\u662f\u6559\u5b66\u8f93\u5165\uff0c\u4e0d\u8fdb\u5165\u6b63\u5f0f\u4efb\u52a1\u4f5c\u7b54\u3002'}
        </div>
      </div>
    );
  }

  if (nodeId === 'stage2_teach_check') {
    return (
      <div className="space-y-5">
        <header>
          <h2 className="font-serif text-2xl font-semibold text-slate-900">{'\u6559\u5b66\u786e\u8ba4\u4e0e\u6750\u6599\u4e0b\u8f7d'}</h2>
          <p className="mt-2 text-sm text-slate-700">{'\u8bf7\u5148\u4e0b\u8f7d\u6559\u5b66\u6750\u6599\uff08\u542b PDF\uff09\uff0c\u518d\u5b8c\u6210\u4e00\u4e2a\u786e\u8ba4\u95ee\u9898\u3002'}</p>
        </header>

        <MaterialDownloadPanel title={'\u6559\u5b66\u6750\u6599\u4e0b\u8f7d'} bundles={profile.teachingMaterials} onDownload={registerDownload} />

        <section className="panel-muted p-4">
          <p className="text-sm font-semibold text-slate-900">{lesson.checkPrompt}</p>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {lesson.checkOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLessonCheckChoice(option)}
                className={`rounded-lg border px-3 py-2 text-left text-sm ${
                  state.lessonCheckChoice === option ? 'border-brand-700 bg-brand-50 text-brand-900' : 'border-slate-200 bg-white'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <header>
        <h2 className="font-serif text-2xl font-semibold text-slate-900">{'\u81ea\u4e3b\u6574\u7406'}</h2>
        <p className="mt-2 text-sm text-slate-700">
          {
            '\u73b0\u5728\u53ef\u4ee5\u5728\u8349\u7a3f\u7eb8\u4e0a\u6574\u7406\u77e5\u8bc6\u3002\u51c6\u5907\u597d\u4e86\u5c31\u5f00\u59cb\u7b54\u9898\u5427\uff0c\u672c\u9875\u65e0\u9700\u5f55\u97f3\u6216\u586b\u5199\u4efb\u4f55\u5185\u5bb9\u3002'
          }
        </p>
      </header>

      <section className="panel-muted p-4">
        <p className="text-sm font-semibold text-slate-900">{'\u672c\u9875\u63d0\u793a'}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>{'\u53ef\u5728\u7eb8\u9762\u5199\u4e0b\u4f60\u7684\u6bd4\u8f83\u6b65\u9aa4\u6216\u5224\u65ad\u63d0\u9192\u3002'}</li>
          <li>{'\u5982\u5df2\u51c6\u5907\u5b8c\u6210\uff0c\u53ef\u76f4\u63a5\u70b9\u51fb\u201c\u4e0b\u4e00\u6b65\u201d\u8fdb\u5165\u4efb\u52a1\u6267\u884c\u3002'}</li>
          <li>{'\u8be5\u8282\u70b9\u4e0d\u8bbe\u63d0\u4ea4\u8981\u6c42\u3002'}</li>
        </ul>
      </section>
    </div>
  );
};

export default Stage2Lesson;
