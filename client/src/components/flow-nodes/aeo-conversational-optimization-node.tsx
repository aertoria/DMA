import { Handle, Position } from "reactflow";
import { MessageCircle, Sparkles } from "lucide-react";

export default function AEOConversationalOptimizationNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-violet-500 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <MessageCircle className="w-4 h-4 text-violet-500" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Conversational Optimization"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Context Score: {data.contextScore || "89/100"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Flow Efficiency: {data.flowEfficiency || "92%"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        User Satisfaction: {data.satisfaction || "4.7/5"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-violet-500 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-violet-500 border-2 border-vscode-bg"
      />
    </div>
  );
}