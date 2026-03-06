# SRL Evaluation Prototype

任务型 SRL（self-regulated learning）测评前端原型。

当前版本采用“线上引导 + 纸面作答 + 线上回收证据”的原型形式：

- 网页负责流程引导
- 微课主题与任务材料一一对应
- 任务主要在线下打印材料上完成
- 网页采集前测 / 中测 / 后测 SRL 录音、Q3 think-aloud 录音、答题纸与草稿纸图片
- 最终输出叙事式报告示例

## 当前技术栈

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

## 本地运行

先安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

本地访问：

```text
http://localhost:3000
```

生产构建：

```bash
npm run build
```

## 当前流程

当前主流程在 [app/page.tsx](/c:/Users/tiann/Desktop/srl%20前端界面/app/page.tsx) 中组织，核心顺序如下：

1. 流程总览
2. 任务说明
3. 前测 SRL 1-4（每题单独页面，必须完成录音）
4. 微课学习
5. 打印任务材料
6. 自主整理（5 分钟倒计时，可跳过）
7. 任务开始 Q1-Q2（网页只提示题型，纸面作答）
8. Q3 Think-Aloud 录音
9. 中段 SRL 1-3（每题单独页面，必须完成录音）
10. 任务继续 Q4-Q6（网页只提示题型，纸面作答）
11. 任务结束
12. 后测 SRL 1-4（每题单独页面，必须完成录音）
13. 上传答题纸与草稿纸图片
14. 等待报告生成
15. 查看叙事报告示例

## 目录说明

- [app](/c:/Users/tiann/Desktop/srl%20前端界面/app)
  - Next.js App Router 入口
  - [page.tsx](/c:/Users/tiann/Desktop/srl%20前端界面/app/page.tsx) 为主流程页面
  - [globals.css](/c:/Users/tiann/Desktop/srl%20前端界面/app/globals.css) 为全局视觉样式

- [components/prototype](/c:/Users/tiann/Desktop/srl%20前端界面/components/prototype)
  - 原型组件
  - 例如进度条、微课卡、打印材料卡、录音卡、SRL 单题页面、图片上传卡

- [lib](/c:/Users/tiann/Desktop/srl%20前端界面/lib)
  - 本地配置与数据
  - 主题池、任务材料、SRL 题池、按钮样式等都在这里维护

- [public/course-theme-pool](/c:/Users/tiann/Desktop/srl%20前端界面/public/course-theme-pool)
  - 微课程主题池 HTML
  - 当前包含 10 个主题示例
  - 作为“有声图书 / 可打印微课”的前端原型入口

- [out](/c:/Users/tiann/Desktop/srl%20前端界面/out)
  - `next build` 导出的静态产物目录

## 当前原型的边界

当前仍是前端原型，不接真实后端。以下能力是占位或本地模拟：

- 录音：前端状态模拟，不接真实音频上传服务
- 图片上传：仅保留前端文件选择状态
- 报告：当前为示例叙事报告，不接 OCR / LLM / 数据库存储
- 题库：使用本地配置，不接真实题库服务

## 微课主题与任务材料

当前设计要求：

- 每个微课主题有固定配套任务
- 打印材料中直接生成 6 道纸面题
- 结构固定为：直 - 干 - 冲 - 变 - 变 - 迁
- Q3 要求回到网页开启 think-aloud 录音

相关配置主要在 [lib/prototypeData.ts](/c:/Users/tiann/Desktop/srl%20前端界面/lib/prototypeData.ts)。

## 部署说明

当前仓库保留了 GitHub Pages 工作流：

- [deploy.yml](/c:/Users/tiann/Desktop/srl%20前端界面/.github/workflows/deploy.yml)

Next 导出配置见：

- [next.config.mjs](/c:/Users/tiann/Desktop/srl%20前端界面/next.config.mjs)

注意：

- 生产环境配置了 `basePath` / `assetPrefix` 用于 GitHub Pages
- 本地开发时不使用 `basePath`
- 如果后续以 Gitee Pages 或其他静态托管为主，需要同步调整 `next.config.mjs`

## 仓库现状说明

仓库中仍保留部分旧版 Vite 迁移痕迹，例如：

- [src](/c:/Users/tiann/Desktop/srl%20前端界面/src)
- [dist](/c:/Users/tiann/Desktop/srl%20前端界面/dist)
- [vite.config.ts](/c:/Users/tiann/Desktop/srl%20前端界面/vite.config.ts)
- [index.html](/c:/Users/tiann/Desktop/srl%20前端界面/index.html)

当前主线运行方式以 Next.js 为准，不应再通过 `Vite` 或直接双击 `index.html` 查看页面。

## 后续建议

如果继续往产品化推进，优先级建议如下：

1. 接入真实录音能力与音频存储
2. 接入答题纸 / 草稿纸图片上传与 OCR
3. 将 SRL 题池、主题池、任务池拆到独立配置或数据库
4. 将报告示例替换为真实分析链路输出
5. 补充部署文档与协作约定
