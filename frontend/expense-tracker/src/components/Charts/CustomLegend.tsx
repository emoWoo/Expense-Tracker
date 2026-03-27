import type { PayloadItem } from "./CustomTooltip";

interface CustomLegendProps {
  payload?: PayloadItem[];
}

const CustomLegend = ({ payload }: CustomLegendProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
      {payload?.map((_, idx) => (
        <div key={`legend-${idx}`} className="flex items-center space-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: _.color }}
          ></div>
          <span className="text-xs text-gray-700 font-medium">{_.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
