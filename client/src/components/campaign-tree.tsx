import { CheckCircle, AlertCircle, Pause, Mail, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Campaign } from "@shared/schema";

interface CampaignTreeProps {
  campaigns: Campaign[];
  selectedCampaignId: number | null;
  onSelectCampaign: (id: number | null) => void;
}

export default function CampaignTree({ campaigns, selectedCampaignId, onSelectCampaign }: CampaignTreeProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-vscode-success" />;
      case "draft":
        return <AlertCircle className="w-4 h-4 text-vscode-warning" />;
      case "paused":
        return <Pause className="w-4 h-4 text-vscode-text-muted" />;
      default:
        return <FileText className="w-4 h-4 text-vscode-text-muted" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-vscode-success text-white",
      draft: "bg-vscode-warning text-white", 
      paused: "bg-vscode-text-muted text-white",
      archived: "bg-vscode-text-muted text-white",
    };

    return (
      <Badge 
        className={`text-xs px-2 py-1 ${variants[status as keyof typeof variants] || variants.archived}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="p-2">
      {campaigns.length === 0 ? (
        <div className="text-sm text-vscode-text-muted text-center py-8">
          No campaigns found. Create your first campaign to get started.
        </div>
      ) : (
        campaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-item mb-2">
            <div 
              className={`flex items-center space-x-2 p-2 hover:bg-vscode-hover rounded cursor-pointer ${
                selectedCampaignId === campaign.id ? 'bg-vscode-hover border-l-2 border-vscode-accent' : ''
              }`}
              onClick={() => onSelectCampaign(campaign.id)}
            >
              {getStatusIcon(campaign.status)}
              <span className="text-sm flex-1 text-vscode-text">{campaign.name}</span>
              {getStatusBadge(campaign.status)}
            </div>
            
            {/* Campaign flow items - simplified for now */}
            {selectedCampaignId === campaign.id && campaign.flowData && (
              <div className="ml-6 pl-2 border-l border-vscode-border">
                {campaign.flowData.nodes?.map((node: any) => (
                  <div key={node.id} className="flex items-center space-x-2 p-1 text-sm text-vscode-text-muted hover:text-vscode-text cursor-pointer">
                    <Mail className="w-3 h-3" />
                    <span>{node.data?.label || `Node ${node.id}`}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
