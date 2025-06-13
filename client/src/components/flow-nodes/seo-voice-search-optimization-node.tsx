import { Handle, Position } from "reactflow";
import { Mic, MessageSquare } from "lucide-react";

export default function SEOVoiceSearchOptimizationNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-pink-500 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Mic className="w-4 h-4 text-pink-500" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Voice Search Optimization"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Queries: {data.voiceQueries || "347 optimized"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Featured Snippets: {data.featuredSnippets || "23 ranking"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Voice Share: {data.voiceShare || "12.4%"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-pink-500 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-pink-500 border-2 border-vscode-bg"
      />
    </div>
  );
}