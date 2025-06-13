import { Handle, Position } from "reactflow";
import { TrendingUp, Target } from "lucide-react";

export default function SEORankTrackingNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-orange-500 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <TrendingUp className="w-4 h-4 text-orange-500" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Rank Tracking"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Position: {data.position || "#3 (+2)"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Keyword: {data.keyword || "marketing automation"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Visibility: {data.visibility || "67%"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-orange-500 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-orange-500 border-2 border-vscode-bg"
      />
    </div>
  );
}