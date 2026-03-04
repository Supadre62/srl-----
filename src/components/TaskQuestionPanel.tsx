import { TaskQuestion } from '../types/assessment';

interface TaskQuestionPanelProps {
  title: string;
  description: string;
  questions: TaskQuestion[];
  answers: Record<string, string>;
  onAnswer: (questionId: string, optionId: string, correctOptionId: string) => void;
}

const TaskQuestionPanel = ({ title, description, questions, answers, onAnswer }: TaskQuestionPanelProps) => {
  return (
    <div className="space-y-4">
      <header>
        <h2 className="font-serif text-2xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-700">{description}</p>
      </header>

      {questions.map((question) => {
        const selected = answers[question.id];
        return (
          <section key={question.id} className="panel-muted p-4">
            <p className="text-sm font-semibold text-slate-900">{question.title}</p>
            <p className="mt-1 text-xs text-slate-600">考查点：{question.requirement}</p>
            <p className="mt-2 text-sm text-slate-700">{question.prompt}</p>

            <div className="mt-3 grid gap-2">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onAnswer(question.id, option.id, question.correctOptionId)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm ${
                    selected === option.id ? 'border-brand-700 bg-brand-50 text-brand-900' : 'border-slate-200 bg-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default TaskQuestionPanel;
