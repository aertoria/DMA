import { Handle, Position } from "reactflow";
import { Settings, CheckCircle } from "lucide-react";

export default function SEOTechnicalAuditNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-yellow-700 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Settings className="w-4 h-4 text-yellow-700" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Technical SEO Audit"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Speed: {data.pageSpeed || "92/100"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Mobile: {data.mobileScore || "95/100"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Issues: {data.issues || "3 found"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-yellow-700 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-yellow-700 border-2 border-vscode-bg"
      />
    </div>
  );
}