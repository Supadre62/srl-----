import { MaterialBundle } from '../types/assessment';

interface MaterialDownloadPanelProps {
  title: string;
  bundles: MaterialBundle[];
  onDownload: (fileId: string, fileName: string) => void;
}

const MaterialDownloadPanel = ({ title, bundles, onDownload }: MaterialDownloadPanelProps) => {
  return (
    <section className="space-y-3">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {bundles.map((bundle) => (
          <article key={bundle.id} className="panel-muted p-4">
            <p className="text-sm font-semibold text-slate-900">{bundle.title}</p>
            <p className="mt-1 text-sm text-slate-600">{bundle.description}</p>

            <div className="mt-3 space-y-2">
              {bundle.files.map((file) => (
                <div key={file.id} className="rounded-lg border border-slate-200 bg-white p-3">
                  <p className="text-sm font-semibold text-slate-800">{file.name}</p>
                  <p className="mt-1 text-xs text-slate-600">{file.description}</p>
                  <p className="mt-1 text-xs text-slate-500">文件类型：{file.fileType}</p>
                  <p className="mt-1 text-xs text-slate-500">打印提示：{file.printHint}</p>
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => onDownload(file.id, file.name)}
                      className="rounded-md bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      下载
                    </button>
                    <a
                      href={file.mockUrl}
                      onClick={() => onDownload(file.id, `${file.name}（PDF）`)}
                      className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700"
                    >
                      PDF 下载
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default MaterialDownloadPanel;
