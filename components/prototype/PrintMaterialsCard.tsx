import { ThemeItem } from '@/lib/prototypeData';
import { primaryButtonClass, secondaryButtonClass } from '@/lib/buttonStyles';

interface PrintMaterialsCardProps {
  theme: ThemeItem;
  printed: boolean;
  onPrint: () => void;
}

const renderAnswerLines = (count: number) =>
  Array.from({ length: count }, (_, index) => `<div class="answer-line" data-line="${index + 1}"></div>`).join('');

const buildPrintDocument = (theme: ThemeItem) => `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>${theme.subject} - ${theme.theme} 任务材料</title>
    <style>
      body { font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif; margin: 24px; color: #0f172a; background: #ffffff; }
      .sheet { max-width: 860px; margin: 0 auto; }
      h1, h2, p { margin: 0; }
      .header { border: 1px solid #cbd5e1; border-radius: 14px; padding: 16px 18px; background: #f8fafc; }
      .header p + p { margin-top: 8px; }
      .question-block { margin-top: 16px; border: 1px solid #cbd5e1; border-radius: 14px; padding: 16px 18px; page-break-inside: avoid; }
      .question-type { font-size: 12px; color: #64748b; }
      .question-prompt { margin-top: 8px; font-size: 16px; font-weight: 700; line-height: 1.7; }
      .question-focus { margin-top: 8px; font-size: 13px; color: #475569; }
      .question-note { margin-top: 10px; padding: 10px 12px; border-radius: 10px; background: #eff6ff; color: #1d4ed8; font-size: 13px; }
      .answer-lines { margin-top: 12px; display: grid; gap: 12px; }
      .answer-line { height: 24px; border-bottom: 1px solid #94a3b8; }
      @media print {
        body { margin: 12px; }
        .question-block, .header { break-inside: avoid; }
      }
    </style>
  </head>
  <body>
    <main class="sheet">
      <section class="header">
        <h1>${theme.subject} · ${theme.theme}</h1>
        <p style="margin-top: 10px; color: #334155;">${theme.summary}</p>
        <p><strong>微课目标：</strong>${theme.lessonGoal}</p>
        <p><strong>核心考察点：</strong>${theme.focus}</p>
      </section>
      ${theme.taskCards
        .map(
          (item) => `<section class="question-block">
            <div class="question-type">${item.code} · ${item.type}</div>
            <div class="question-prompt">${item.prompt}</div>
            <div class="question-focus">考察点：${item.focus}</div>
            ${item.code === 'Q3' ? '<div class="question-note">做到本题时，请回到网页开启 Think-Aloud 录音。</div>' : ''}
            <div class="answer-lines">${renderAnswerLines(item.answerLines)}</div>
          </section>`,
        )
        .join('')}
    </main>
    <script>window.print();</script>
  </body>
</html>`;

const PrintMaterialsCard = ({ theme, printed, onPrint }: PrintMaterialsCardProps) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=980,height=840');
    if (!printWindow) return;
    printWindow.document.open();
    printWindow.document.write(buildPrintDocument(theme));
    printWindow.document.close();
    onPrint();
  };

  return (
    <section className="panel space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">打印任务材料</h2>
        <p className="text-sm text-slate-600">本页提供当前主题配套题纸。打印后请在纸面直接作答。</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">{theme.subject}</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">{theme.theme}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-700">{theme.summary}</p>
          <p className="mt-3 text-sm text-slate-600">微课目标：{theme.lessonGoal}</p>
          <p className="mt-1 text-sm text-slate-600">核心考察点：{theme.focus}</p>
        </div>

        <div className="mt-4 space-y-3">
          {theme.taskCards.map((item) => (
            <article key={item.code} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs text-slate-500">
                {item.code} · {item.type}
              </p>
              <p className="mt-2 text-base font-semibold leading-7 text-slate-900">{item.prompt}</p>
              <p className="mt-2 text-sm text-slate-600">考察点：{item.focus}</p>
              {item.code === 'Q3' ? (
                <p className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-700">
                  做到本题时，请回到网页开启 Think-Aloud 录音。
                </p>
              ) : null}
              <div className="mt-4 space-y-3">
                {Array.from({ length: item.answerLines }, (_, index) => (
                  <div key={`${item.code}-${index + 1}`} className="h-6 border-b border-slate-300" />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className={primaryButtonClass} onClick={handlePrint}>
          打印当前主题任务材料
        </button>
        <a className={secondaryButtonClass} href={theme.storyPath} target="_blank" rel="noreferrer">
          打开微课程预览
        </a>
      </div>

      <p className="text-sm font-semibold text-slate-800">准备状态：{printed ? '已进入打印流程' : '尚未打印'}</p>
      <p className="text-xs text-slate-500">当前材料与微课程主题一一对应：{theme.id}</p>
    </section>
  );
};

export default PrintMaterialsCard;
