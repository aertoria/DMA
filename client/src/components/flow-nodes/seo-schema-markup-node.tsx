import { Handle, Position } from "reactflow";
import { Code, CheckCircle } from "lucide-react";

export default function SEOSchemaMarkupNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-purple-500 rounded-lg p-4 shadow-lg min-w-[200px]">
      <div className="flex items-center space-x-2 mb-2">
        <Code className="w-4 h-4 text-purple-500" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "Schema Markup"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Types: {data.schemaTypes || "Organization, Product"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Valid: {data.validation || "98%"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Rich Results: {data.richResults || "12 eligible"}
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