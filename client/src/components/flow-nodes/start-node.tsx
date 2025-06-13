import { Handle, Position } from "reactflow";
import { Play } from "lucide-react";

export default function StartNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-vscode-success rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-3 h-3 bg-vscode-success rounded-full"></div>
        <span className="text-sm font-medium text-vscode-text-bright">Campaign Start</span>
      </div>
      <div className="text-xs text-vscode-text-muted">
        {data.trigger || "Triggers: New subscriber"}
      </div>
      
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-vscode-success border-2 border-vscode-bg"
      />
    </div>
  );
}
