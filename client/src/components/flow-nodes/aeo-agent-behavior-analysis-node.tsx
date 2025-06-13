import { Handle, Position } from "reactflow";
import { Brain, Activity } from "lucide-react";

export default function AEOAgentBehaviorAnalysisNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-indigo-600 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Brain className="w-4 h-4 text-indigo-600" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Agent Behavior Analysis"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Patterns: {data.patterns || "247 identified"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Response Quality: {data.quality || "91%"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Engagement: {data.engagement || "78% positive"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-indigo-600 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-indigo-600 border-2 border-vscode-bg"
      />
    </div>
  );
}