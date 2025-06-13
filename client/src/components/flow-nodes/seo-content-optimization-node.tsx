import { Handle, Position } from "reactflow";
import { FileText, Target } from "lucide-react";

export default function SEOContentOptimizationNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-yellow-600 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <FileText className="w-4 h-4 text-yellow-600" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Content Optimization"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Score: {data.score || "87/100"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Readability: {data.readability || "Good"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Keywords: {data.keywordDensity || "2.3%"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-yellow-600 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-yellow-600 border-2 border-vscode-bg"
      />
    </div>
  );
}