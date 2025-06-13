import { Handle, Position } from "reactflow";
import { BarChart3 } from "lucide-react";

export default function AnalyticsNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-purple-500 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <BarChart3 className="w-4 h-4 text-purple-500" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Analytics Tracker"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Event: {data.event || "Page view"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Conversion: {data.conversionRate || "8.5%"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-purple-500 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-purple-500 border-2 border-vscode-bg"
      />
    </div>
  );
}