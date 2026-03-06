interface MaterialDownloadCardProps {
  downloaded: boolean;
  onDownload: () => void;
}

const MaterialDownloadCard = ({ downloaded, onDownload }: MaterialDownloadCardProps) => {
  return (
    <section className="panel space-y-4">
      <h2 className="text-xl font-semibold text-slate-900">任务材料下载</h2>
      <p className="text-sm text-slate-600">本版仅下载任务材料，不下载课程材料。建议先打印后再继续。</p>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <p>文件：任务材料包（PDF）</p>
        <p>用途：线下纸面作答（含答题页与草稿页）</p>
      </div>

      <button type="button" className="btn-primary" onClick={onDownload}>
        下载任务 PDF
      </button>

      <p className="text-sm font-semibold text-slate-800">下载状态：{downloaded ? '已下载' : '未下载'}</p>
    </section>
  );
};

export default MaterialDownloadCard;
