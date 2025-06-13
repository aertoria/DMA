import { Handle, Position } from "reactflow";
import { Search, TrendingUp } from "lucide-react";

export default function SEOKeywordResearchNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-yellow-500 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Search className="w-4 h-4 text-yellow-500" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Keyword Research"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Keywords: {data.keywords || "247 found"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Difficulty: {data.difficulty || "Medium"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Volume: {data.volume || "12.5K/mo"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-yellow-500 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-yellow-500 border-2 border-vscode-bg"
      />
    </div>
  );
}