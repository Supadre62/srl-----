import DimensionMappingPanel from '../components/DimensionMappingPanel';
import LongReportSamplePanel from '../components/LongReportSamplePanel';
import NarrativeReport from '../components/NarrativeReport';
import { AssessmentState } from '../types/assessment';
import { buildNarrativeReport } from '../utils/reporting';

interface ResultsPageProps {
  state: AssessmentState;
  onRestart: () => void;
}

const ResultsPage = ({ state, onRestart }: ResultsPageProps) => {
  const report = buildNarrativeReport(state);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl font-semibold text-slate-900">叙事式结果展示</h2>
        <p className="mt-2 text-sm text-slate-700">输出结构：学习过程叙事 + 10维映射 + 确信度 + 证据链。</p>
      </div>

      <NarrativeReport narrative={report.narrative} evidenceChain={report.evidenceChain} />
      <DimensionMappingPanel dimensions={report.dimensions} />
      <LongReportSamplePanel />

      <div className="flex justify-end">
        <button type="button" onClick={onRestart} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
          重新演示流程
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
