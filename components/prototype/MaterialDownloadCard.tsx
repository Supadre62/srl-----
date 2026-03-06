import { TaskCard } from '@/lib/prototypeData';
import { primaryButtonClass, secondaryButtonClass } from '@/lib/buttonStyles';

interface MaterialDownloadCardProps {
  downloaded: boolean;
  themeName: string;
  materialPath: string;
  taskCards: TaskCard[];
  onOpenMaterial: () => void;
}

const MaterialDownloadCard = ({ downloaded, themeName, materialPath, taskCards, onOpenMaterial }: MaterialDownloadCardProps) => {
  return (
    <section className="panel space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">任务材料</h2>
        <p className="text-sm text-slate-600">材料改为 HTML 版，可直接打开、播放、打印。建议打印“任务配套”区域后再继续。</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <p>当前主题：{themeName}</p>
        <p className="mt-1">文件形式：HTML 微课程 + 可打印任务配套</p>
      </div>

      <div className="grid gap-2 md:grid-cols-2">
        {taskCards.map((item) => (
          <div key={item.code} className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">
              {item.code} · {item.type}
            </p>
            <p className="mt-1 text-slate-600">{item.focus}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <a className={primaryButtonClass} href={`${materialPath}?print=1#task-pack`} target="_blank" rel="noreferrer" onClick={onOpenMaterial}>
          打开并打印任务材料
        </a>
        <a className={secondaryButtonClass} href={materialPath} target="_blank" rel="noreferrer">
          预览完整主题页面
        </a>
      </div>

      <p className="text-sm font-semibold text-slate-800">下载状态：{downloaded ? '已打开材料页' : '尚未打开'}</p>
    </section>
  );
};

export default MaterialDownloadCard;
