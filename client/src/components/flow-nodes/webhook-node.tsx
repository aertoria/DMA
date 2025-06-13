import { Handle, Position } from "reactflow";
import { Webhook } from "lucide-react";

export default function WebhookNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-vscode-text-muted rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Webhook className="w-4 h-4 text-vscode-text-muted" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Webhook"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted">
        URL: {data.url ? data.url.substring(0, 20) + "..." : "Not configured"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-vscode-text-muted border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-vscode-text-muted border-2 border-vscode-bg"
      />
    </div>
  );
}
