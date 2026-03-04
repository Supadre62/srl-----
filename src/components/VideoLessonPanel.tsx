import { VideoLessonConfig } from '../types/assessment';

interface VideoLessonPanelProps {
  config: VideoLessonConfig;
  playback: 'paused' | 'playing';
  onPlay: () => void;
  onPause: () => void;
  onReplay: () => void;
}

const VideoLessonPanel = ({ config, playback, onPlay, onPause, onReplay }: VideoLessonPanelProps) => {
  return (
    <div className="space-y-4">
      <header className="rounded-xl border border-brand-100 bg-brand-50 p-4">
        <h2 className="font-serif text-2xl font-semibold text-brand-800">{config.title}</h2>
        <p className="mt-2 text-sm text-brand-900">{config.summary}</p>
      </header>

      <div className="flex min-h-52 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50">
        <p className="text-sm text-slate-600">{config.placeholderText}</p>
      </div>

      <div className="panel-muted p-4">
        <p className="text-sm font-semibold text-slate-900">{config.exampleTitle}</p>
        <p className="mt-2 text-sm text-slate-700">{config.exampleContent}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={onPlay} className="rounded-lg bg-brand-700 px-3 py-2 text-sm font-semibold text-white">
          播放
        </button>
        <button type="button" onClick={onPause} className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700">
          暂停
        </button>
        <button type="button" onClick={onReplay} className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700">
          重播
        </button>
        <span className="text-xs text-slate-500">当前状态：{playback === 'playing' ? '播放中（模拟）' : '暂停（模拟）'}</span>
      </div>
    </div>
  );
};

export default VideoLessonPanel;
