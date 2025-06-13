import { Handle, Position } from "reactflow";
import { Send, Mail } from "lucide-react";

export default function SendEmailNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-green-500 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Send className="w-4 h-4 text-green-500" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Send Email"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Template: {data.template || "Welcome series"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Sent: {data.sent || "1,247"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Status: {data.status || "Active"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-green-500 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-green-500 border-2 border-vscode-bg"
      />
    </div>
  );
}