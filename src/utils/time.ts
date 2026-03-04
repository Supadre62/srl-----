export const formatTimestamp = (date = new Date()): string =>
  date.toLocaleTimeString('zh-CN', { hour12: false });

export const formatSeconds = (value: number): string => {
  const safe = Math.max(0, value);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const formatDuration = (value: number): string => {
  if (value < 60) {
    return `${value} 秒`;
  }
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${minutes} 分 ${seconds} 秒`;
};
