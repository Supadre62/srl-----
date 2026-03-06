import { ThemeItem } from '@/lib/prototypeData';
import { primaryButtonClass, secondaryButtonClass } from '@/lib/buttonStyles';

interface MicroCourseCardProps {
  theme: ThemeItem;
  onOpenLesson: () => void;
  lessonCompleted: boolean;
  returnTo: string;
}

const appendParam = (urlText: string, key: string, value: string) => {
  try {
    const parsed = new URL(urlText, 'http://localhost');
    parsed.searchParams.set(key, value);
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    const separator = urlText.includes('?') ? '&' : '?';
    return `${urlText}${separator}${key}=${encodeURIComponent(value)}`;
  }
};

const MicroCourseCard = ({ theme, onOpenLesson, lessonCompleted, returnTo }: MicroCourseCardProps) => {
  const returnWithLesson = returnTo ? appendParam(returnTo, 'lesson', '1') : '';
  const lessonHref = returnWithLesson
    ? `${theme.storyPath}?return_to=${encodeURIComponent(returnWithLesson)}`
    : theme.storyPath;
  const libraryHref = returnTo
    ? `course-theme-pool/index.html?return_to=${encodeURIComponent(returnTo)}`
    : 'course-theme-pool/index.html';

  return (
    <section className="panel space-y-5">
      <div className="space-y-3 rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">当前微课主题</p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-sky-200 bg-white px-3 py-1 text-sm font-semibold text-sky-800">{theme.subject}</span>
          <span className="text-sm text-slate-500">本轮任务与该主题严格对应</span>
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">{theme.theme}</h2>
        <p className="max-w-3xl text-sm leading-7 text-slate-600">{theme.summary}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <p>微课目标：{theme.lessonGoal}</p>
        <p className="mt-2">核心考察点：{theme.focus}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <a className={`${primaryButtonClass} w-full justify-center px-5 py-4 text-base`} href={lessonHref} onClick={onOpenLesson}>
          打开当前微课
        </a>
        <a className={`${secondaryButtonClass} w-full justify-center px-5 py-4 text-base`} href={libraryHref}>
          查看全部主题
        </a>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-slate-800">
          学习状态：{lessonCompleted ? '已打开微课，可以进入下一步' : '请先打开当前微课，完成浏览后再继续'}
        </p>
        <p className="mt-2 text-xs leading-6 text-slate-500">
          任务材料打印会在主流程的“打印任务材料”页面完成。当前页面只负责让学生明确看到本轮学习主题，并进入配套微课。
        </p>
      </div>
    </section>
  );
};

export default MicroCourseCard;
