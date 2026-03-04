interface NarrativeReportProps {
  narrative: string[];
  evidenceChain: string[];
}

const NarrativeReport = ({ narrative, evidenceChain }: NarrativeReportProps) => {
  return (
    <div className="space-y-5">
      <section className="panel-muted p-4">
        <h2 className="font-serif text-2xl font-semibold text-slate-900">学习过程叙事摘要</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-700">
          {narrative.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      </section>

      <section className="panel-muted p-4">
        <h3 className="text-base font-semibold text-slate-900">证据链摘要</h3>
        <ul className="mt-2 space-y-2 text-sm text-slate-700">
          {evidenceChain.map((item) => (
            <li key={item} className="rounded-lg border border-slate-200 bg-white px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default NarrativeReport;
