const longNarrative = [
  '在本次任务中，孩子能够在引导下进入任务，并基本理解这是一段需要先学习、再整理、再独立完成的完整任务流程。前测访谈中，孩子对任务总体目标有初步把握，但对“做到什么算真正完成”的理解仍偏表层。',
  '进入教学输入阶段后，孩子能够完成基础听讲，并在后续整理阶段在草稿纸上记录关键词与提醒语，说明其已开始把输入转成自己的理解，而不只是被动听过。',
  '在任务执行上半段，孩子在直接应用和表面干扰情境中表现出不同稳定度；到第三题 Think-Aloud 时，出现“先看局部、再回看整体”的即时自我监控线索。',
  '中段 SRL 回答与 Think-Aloud 过程相互印证，说明其不仅能事后解释，也能在任务当下觉察不确定并尝试调整。',
  '任务后半段中，孩子在变化与迁移情境中呈现出初步修正痕迹，但规则稳定化仍不足；最终能够提炼出一句可迁移提醒语，显示出从“做这次”向“指导下一次”过渡。',
  '综合判断：当前画像更接近“已被有效触发但仍需支架支持”的发展状态，后续重点应放在完成标准明确化、规则结构化整理、以及迁移策略的重复应用。',
];

const keyEvidence = [
  '前测：能说出任务大意，但完成标准表述不清晰。',
  '整理：草稿纸出现关键词与简短提醒语。',
  'Think-Aloud：出现“需要看整体”的即时修正线索。',
  '中段 SRL：能够复盘“刚才拿不准”的具体时刻。',
  '后测：可提炼一句对下一个学习者有帮助的提醒语。',
];

const suggestions = [
  '任务前先口头确认“先做什么、做到什么算完成”，强化目标建构。',
  '整理阶段加入“规则-例子-提醒语”三栏模板，提升结构化整理质量。',
  '在后续同类任务中重复使用本次提醒语，观察迁移稳定性。',
  '围绕“发现偏差后如何修正”做短回放训练，增强元认知与执行衔接。',
];

const LongReportSamplePanel = () => {
  return (
    <section className="panel-muted p-4">
      <h3 className="text-base font-semibold text-slate-900">新母版输出示例（长报告）</h3>
      <p className="mt-1 text-sm text-slate-600">以下为长报告展示区，用于补充“bulletpoint + 维度表格”之外的叙事化输出样式。</p>

      <div className="mt-4 space-y-5">
        <article>
          <h4 className="text-sm font-semibold text-slate-900">学习过程叙事摘要（长文示例）</h4>
          <div className="mt-2 space-y-3 text-sm leading-7 text-slate-700">
            {longNarrative.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <article>
          <h4 className="text-sm font-semibold text-slate-900">关键证据链示例</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {keyEvidence.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article>
          <h4 className="text-sm font-semibold text-slate-900">后续支持建议示例</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {suggestions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
};

export default LongReportSamplePanel;
