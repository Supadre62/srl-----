import { ConfidenceLevel, DimensionMapping } from '../types/assessment';

interface DimensionMappingPanelProps {
  dimensions: DimensionMapping[];
}

const confidenceStyle: Record<ConfidenceLevel, string> = {
  高: 'bg-emerald-100 text-emerald-800',
  中: 'bg-amber-100 text-amber-800',
  低: 'bg-rose-100 text-rose-800',
};

const DimensionMappingPanel = ({ dimensions }: DimensionMappingPanelProps) => {
  return (
    <section className="panel-muted p-4">
      <h3 className="text-base font-semibold text-slate-900">10 维映射展示</h3>
      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-3 py-2 font-semibold">维度</th>
              <th className="px-3 py-2 font-semibold">最可能 Level</th>
              <th className="px-3 py-2 font-semibold">备选 Level</th>
              <th className="px-3 py-2 font-semibold">确信度</th>
              <th className="px-3 py-2 font-semibold">证据摘要</th>
            </tr>
          </thead>
          <tbody>
            {dimensions.map((item) => (
              <tr key={item.dimension} className="border-t border-slate-200 bg-white">
                <td className="px-3 py-2 font-semibold text-slate-800">{item.dimension}</td>
                <td className="px-3 py-2">{item.level}</td>
                <td className="px-3 py-2 text-slate-600">{item.alternativeLevel ?? '-'}</td>
                <td className="px-3 py-2">
                  <span className={`rounded px-2 py-1 text-xs font-semibold ${confidenceStyle[item.confidence]}`}>{item.confidence}</span>
                </td>
                <td className="px-3 py-2 text-slate-700">{item.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DimensionMappingPanel;
