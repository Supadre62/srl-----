interface ImageUploadCardProps {
  title: string;
  fileName: string | null;
  onPick: (fileName: string) => void;
}

const ImageUploadCard = ({ title, fileName, onPick }: ImageUploadCardProps) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
        选择图片
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              onPick(file.name);
            }
          }}
        />
      </label>
      <p className="mt-2 text-sm text-slate-700">{fileName ? `已上传：${fileName}` : '未上传'}</p>
    </section>
  );
};

export default ImageUploadCard;
