import { Handle, Position } from "reactflow";
import { Users, Eye } from "lucide-react";

export default function SEOCompetitorAnalysisNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-red-500 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Users className="w-4 h-4 text-red-500" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Competitor Analysis"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Competitors: {data.competitors || "12 tracked"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Gap Score: {data.gapScore || "73/100"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Opportunities: {data.opportunities || "47 found"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-red-500 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-red-500 border-2 border-vscode-bg"
      />
    </div>
  );
}