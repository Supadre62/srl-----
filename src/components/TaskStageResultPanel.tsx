const TaskStageResultPanel = () => {
  return (
    <div className="space-y-4">
      <header>
        <h2 className="font-serif text-2xl font-semibold text-slate-900">{'\u7b54\u9898\u7ed3\u675f'}</h2>
        <p className="mt-2 text-sm text-slate-700">
          {
            '\u7eb8\u9762\u4efb\u52a1\u5df2\u5b8c\u6210\u3002\u6b64\u9875\u9762\u4e0d\u663e\u793a\u5206\u6570\uff0c\u4e0b\u4e00\u6b65\u8fdb\u5165\u540e\u7f6e SRL \u4e0e\u8bc1\u636e\u63d0\u4ea4\u3002'
          }
        </p>
      </header>

      <section className="panel-muted p-4">
        <p className="text-sm font-semibold text-slate-900">{'\u5f53\u524d\u72b6\u6001'}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>{'\u4efb\u52a1\u6267\u884c\u9636\u6bb5\u5df2\u7ed3\u675f\u3002'}</li>
          <li>{'\u8bf7\u56de\u5230\u7f51\u9875\u7ee7\u7eed\u540e\u7f6e SRL \u95ee\u9898\u3002'}</li>
          <li>{'\u968f\u540e\u4e0a\u4f20\u7b54\u9898\u7eb8\u4e0e\u8349\u7a3f\u7eb8\u7167\u7247\uff0c\u7b49\u5f85\u62a5\u544a\u751f\u6210\u3002'}</li>
        </ul>
      </section>
    </div>
  );
};

export default TaskStageResultPanel;
