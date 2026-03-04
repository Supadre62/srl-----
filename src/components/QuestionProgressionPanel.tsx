import { TaskQuestion } from '../types/assessment';

interface QuestionProgressionPanelProps {
  questions: TaskQuestion[];
  modeLabel: string;
  compact?: boolean;
}

const QuestionProgressionPanel = ({ questions, modeLabel, compact = false }: QuestionProgressionPanelProps) => {
  return (
    <section className="panel-muted p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-slate-900">{'\u9898\u76ee\u9012\u8fdb\u987a\u5e8f'}</h3>
        <span className="rounded bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-600">{modeLabel}</span>
      </div>
      <p className="mt-1 text-sm text-slate-600">
        {'\u56fa\u5b9a\u987a\u5e8f\uff1a\u76f4\u63a5\u5e94\u7528\u9898\u3001\u8868\u9762\u5e72\u6270\u9898\u3001\u89c4\u5219\u51b2\u7a81\u9898\u3001\u53d8\u5316\u9898A\u3001\u53d8\u5316\u9898B\u3001\u8fc1\u79fb\u9898\u3002'}
      </p>

      <div className="mt-3 grid gap-3">
        {questions.map((item, index) => (
          <article key={item.id} className="rounded-lg border border-slate-200 bg-white p-3">
            <p className="text-sm font-semibold text-slate-900">
              {index + 1}. {item.title}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              {'\u8003\u67e5\u70b9\uff1a'}
              {item.requirement}
            </p>
            {!compact ? <p className="mt-2 text-sm text-slate-700">{item.prompt}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
};

export default QuestionProgressionPanel;
