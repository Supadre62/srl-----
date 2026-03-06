import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '任务型 SRL 测评流程 Demo（Next.js）',
  description: '线上引导 + 纸面作答 + 线上回收证据的流程原型',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
