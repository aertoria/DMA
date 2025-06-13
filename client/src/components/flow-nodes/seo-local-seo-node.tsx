import { Handle, Position } from "reactflow";
import { MapPin, Star } from "lucide-react";

export default function SEOLocalSEONode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-green-600 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <MapPin className="w-4 h-4 text-green-600" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Local SEO"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        GMB Score: {data.gmbScore || "92/100"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Reviews: {data.reviews || "4.8★ (247)"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Citations: {data.citations || "156 found"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-green-600 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-green-600 border-2 border-vscode-bg"
      />
    </div>
  );
}