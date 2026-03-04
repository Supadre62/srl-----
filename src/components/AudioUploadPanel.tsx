import { ChangeEvent, useId } from 'react';
import { UploadFileState, VoiceStatus } from '../types/assessment';

interface AudioUploadPanelProps {
  title: string;
  voiceStatus: VoiceStatus;
  uploadState: UploadFileState;
  onToggleRecord: () => void;
  onUploadFile: (fileName: string) => void;
  onClearUpload: () => void;
}

const voiceActionText: Record<VoiceStatus, string> = {
  idle: '开始录音占位',
  recording: '结束录音占位',
  recorded: '重置录音占位',
};

const voiceStatusText: Record<VoiceStatus, string> = {
  idle: '未开始',
  recording: '录音中（模拟）',
  recorded: '已完成录音占位',
};

const AudioUploadPanel = ({ title, voiceStatus, uploadState, onToggleRecord, onUploadFile, onClearUpload }: AudioUploadPanelProps) => {
  const inputId = useId();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onUploadFile(file.name);
    event.currentTarget.value = '';
  };

  return (
    <section className="panel-muted p-4">
      <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
      <p className="mt-1 text-xs text-slate-500">推荐先完成网页录音占位，再决定是否上传音频文件。</p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onToggleRecord}
          className="rounded-md bg-brand-700 px-3 py-2 text-xs font-semibold text-white"
        >
          {voiceActionText[voiceStatus]}
        </button>

        <label htmlFor={inputId} className="cursor-pointer rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700">
          上传音频文件
        </label>
        <input id={inputId} type="file" accept="audio/*" onChange={handleFileChange} className="hidden" />

        {uploadState.uploaded ? (
          <button type="button" onClick={onClearUpload} className="rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700">
            清除上传
          </button>
        ) : null}
      </div>

      <p className="mt-2 text-xs text-slate-600">录音状态：{voiceStatusText[voiceStatus]}</p>
      <p className="mt-1 text-xs text-slate-600">
        上传状态：{uploadState.uploaded ? `已上传 ${uploadState.fileName ?? ''}` : '未上传'}
        {uploadState.timestamp ? `（${uploadState.timestamp}）` : ''}
      </p>
    </section>
  );
};

export default AudioUploadPanel;
