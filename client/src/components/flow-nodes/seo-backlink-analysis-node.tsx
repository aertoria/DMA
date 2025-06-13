import { Handle, Position } from "reactflow";
import { Link, BarChart3 } from "lucide-react";

export default function SEOBacklinkAnalysisNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-yellow-500 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Link className="w-4 h-4 text-yellow-500" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Backlink Analysis"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Links: {data.totalLinks || "1,247"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Domain Authority: {data.domainAuthority || "68/100"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Quality: {data.quality || "85% high"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-yellow-500 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-yellow-500 border-2 border-vscode-bg"
      />
    </div>
  );
}