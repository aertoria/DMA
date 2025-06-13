import { Handle, Position } from "reactflow";
import { Split, Mail } from "lucide-react";

export default function ABEmailSplitNode({ data }: { data: any }) {
  return (
    <div className="bg-vscode-panel border-2 border-blue-500 rounded-lg p-4 shadow-lg min-w-[220px]">
      <div className="flex items-center space-x-2 mb-2">
        <Split className="w-4 h-4 text-blue-500" />
        <Mail className="w-3 h-3 text-blue-500" />
        <span className="text-sm font-medium text-vscode-text-bright">
          {data.label || "A/B Email Split"}
        </span>
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Variant A: {data.variantA || "Subject line test"}
      </div>
      <div className="text-xs text-vscode-text-muted mb-1">
        Variant B: {data.variantB || "CTA button test"}
      </div>
      <div className="text-xs text-vscode-text-muted">
        Split: {data.split || "50/50"}
      </div>
      
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-blue-500 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: "25%" }}
        className="w-4 h-4 !bg-blue-500 border-2 border-vscode-bg"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ top: "75%" }}
        className="w-4 h-4 !bg-blue-500 border-2 border-vscode-bg"
      />
    </div>
  );
}