import { Handle, Position } from "reactflow";
import { Bot, Zap } from "lucide-react";

export default function AEOAIPromptOptimizationNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-cyan-500 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Bot className="w-4 h-4 text-cyan-500" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "AI Prompt Optimization"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Model: {data.model || "GPT-4 Turbo"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Accuracy: {data.accuracy || "94.2%"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Tokens: {data.tokenEfficiency || "85% optimized"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-cyan-500 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-cyan-500 border-2 border-vscode-bg"
      />
    </div>
  );
}