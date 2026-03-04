import { ChangeEvent, useId } from 'react';
import { UploadFileState } from '../types/assessment';

interface ImageUploadItem {
  id: string;
  title: string;
  description: string;
  state: UploadFileState;
  onUploadFile: (fileName: string) => void;
  onClearUpload: () => void;
}

interface ImageUploadPanelProps {
  title: string;
  items: ImageUploadItem[];
}

const ImageUploadCard = ({ item }: { item: ImageUploadItem }) => {
  const inputId = useId();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    item.onUploadFile(file.name);
    event.currentTarget.value = '';
  };

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-3">
      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
      <p className="mt-1 text-xs text-slate-600">{item.description}</p>

      <div className="mt-2 flex h-24 items-center justify-center rounded border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-500">
        {item.state.uploaded ? `预览占位：${item.state.fileName}` : '文件预览占位'}
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <label htmlFor={inputId} className="cursor-pointer rounded-md bg-brand-700 px-3 py-1.5 text-xs font-semibold text-white">
          上传图片
        </label>
        <input id={inputId} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        {item.state.uploaded ? (
          <button type="button" onClick={item.onClearUpload} className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700">
            重新上传
          </button>
        ) : null}
      </div>
      <p className="mt-2 text-xs text-slate-600">
        状态：{item.state.uploaded ? '已上传' : '未上传'}
        {item.state.timestamp ? `（${item.state.timestamp}）` : ''}
      </p>
    </article>
  );
};

const ImageUploadPanel = ({ title, items }: ImageUploadPanelProps) => {
  return (
    <section className="panel-muted p-4">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <ImageUploadCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default ImageUploadPanel;
