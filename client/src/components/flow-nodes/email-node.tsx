import { Handle, Position } from "reactflow";
import { Mail } from "lucide-react";

export default function EmailNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-vscode-accent rounded-lg p-4 shadow-lg min-w-[220px]">
      <div className="flex items-center space-x-2 mb-2">
        <Mail className="w-4 h-4 text-vscode-accent" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Email"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-2">
        Subject: {data.subject || "Email subject"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        {data.openRate ? `Open rate: ${data.openRate}` : "Open rate: --"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-vscode-accent border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-vscode-accent border-2 border-vscode-bg"
      />
    </div>
  );
}
