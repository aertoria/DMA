import { Handle, Position } from "reactflow";
import { GitBranch } from "lucide-react";

export default function SplitNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-vscode-warning rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <GitBranch className="w-4 h-4 text-vscode-warning" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "A/B Split"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted">
        Condition: {data.condition || "Email opened"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-vscode-warning border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: "25%" }}
        className="w-4 h-4 !bg-vscode-warning border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ top: "75%" }}
        className="w-4 h-4 !bg-vscode-warning border-2 border-vscode-bg"
      />
    </div>
  );
}
