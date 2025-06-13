import { Handle, Position } from "reactflow";
import { Play, Users, BarChart } from "lucide-react";

export default function SimulatorPoolNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-emerald-500 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Play className="w-4 h-4 text-emerald-500" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Campaign Simulator"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Audience Pool: {data.poolSize || "10,000 profiles"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Scenarios: {data.scenarios || "25 running"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Accuracy: {data.accuracy || "87% prediction"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-emerald-500 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-emerald-500 border-2 border-vscode-bg"
      />
    </div>
  );
}