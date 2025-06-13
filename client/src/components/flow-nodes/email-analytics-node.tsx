import { Handle, Position } from "reactflow";
import { TrendingUp, Mail } from "lucide-react";

export default function EmailAnalyticsNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-indigo-500 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <TrendingUp className="w-4 h-4 text-indigo-500" />
        <Mail className="w-3 h-3 text-indigo-500" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Email Analytics"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Open Rate: {data.openRate || "24.5%"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Click Rate: {data.clickRate || "4.8%"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Bounce: {data.bounceRate || "2.1%"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-indigo-500 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-indigo-500 border-2 border-vscode-bg"
      />
    </div>
  );
}