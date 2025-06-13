import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import LeftPanel from "@/components/left-panel";
import MainCanvas from "@/components/main-canvas";
import AIChatPanel from "@/components/ai-chat-panel";

export default function Dashboard() {
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(1);

  return (
    <div className="h-screen w-full bg-vscode-bg text-vscode-text overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
          <LeftPanel 
            selectedCampaignId={selectedCampaignId}
            onSelectCampaign={setSelectedCampaignId}
          />
        </ResizablePanel>
        
        <ResizableHandle className="w-1 bg-vscode-border hover:bg-vscode-accent transition-colors" />
        
        <ResizablePanel defaultSize={60} minSize={40}>
          <MainCanvas campaignId={selectedCampaignId} />
        </ResizablePanel>
        
        <ResizableHandle className="w-1 bg-vscode-border hover:bg-vscode-accent transition-colors" />
        
        <ResizablePanel defaultSize={20} minSize={15} maxSize={35}>
          <AIChatPanel campaignId={selectedCampaignId} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
