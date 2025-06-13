import { Handle, Position } from "reactflow";
import { Map, Globe } from "lucide-react";

export default function SEOSitemapOptimizationNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-teal-500 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Map className="w-4 h-4 text-teal-500" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Sitemap Optimization"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        URLs: {data.urlCount || "2,847 mapped"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Indexed: {data.indexedPercent || "94%"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Errors: {data.errors || "12 found"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-teal-500 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-teal-500 border-2 border-vscode-bg"
      />
    </div>
  );
}