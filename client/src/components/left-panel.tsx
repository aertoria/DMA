import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Settings, Users } from "lucide-react";
import CampaignTree from "./campaign-tree";
import CampaignCreationDialog from "./campaign-creation-dialog";
import type { Campaign, Project } from "@shared/schema";

interface LeftPanelProps {
  selectedCampaignId: number | null;
  onSelectCampaign: (id: number | null) => void;
}

export default function LeftPanel({ selectedCampaignId, onSelectCampaign }: LeftPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: campaigns = [] } = useQuery<Campaign[]>({
    queryKey: ["/api/campaigns"],
  });

  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full bg-vscode-sidebar border-r border-vscode-border flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-vscode-border">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-vscode-accent rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold font-code">D</span>
          </div>
          <span className="font-code text-sm font-medium text-vscode-text-bright">DeepMonetizy</span>
        </div>
        <Button variant="ghost" size="sm" className="text-vscode-text hover:bg-vscode-hover">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="campaigns" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 bg-vscode-bg border-b border-vscode-border rounded-none">
          <TabsTrigger 
            value="campaigns" 
            className="text-xs font-medium data-[state=active]:bg-vscode-sidebar data-[state=active]:border-b-2 data-[state=active]:border-vscode-accent"
          >
            Campaigns
          </TabsTrigger>
          <TabsTrigger 
            value="projects"
            className="text-xs font-medium data-[state=active]:bg-vscode-sidebar data-[state=active]:border-b-2 data-[state=active]:border-vscode-accent"
          >
            Projects
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="flex-1 flex flex-col mt-0">
          {/* Search */}
          <div className="p-3 border-b border-vscode-border">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-vscode-text-muted" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-vscode-panel border-vscode-border focus:border-vscode-accent text-sm"
              />
            </div>
          </div>

          {/* New Campaign Button */}
          <div className="p-3 border-b border-vscode-border">
            <CampaignCreationDialog onCampaignCreated={onSelectCampaign} />
          </div>

          {/* Campaign Tree */}
          <div className="flex-1 overflow-y-auto">
            <CampaignTree
              campaigns={filteredCampaigns}
              selectedCampaignId={selectedCampaignId}
              onSelectCampaign={onSelectCampaign}
            />
          </div>
        </TabsContent>

        <TabsContent value="projects" className="flex-1 flex flex-col mt-0">
          {/* Search */}
          <div className="p-3 border-b border-vscode-border">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-vscode-text-muted" />
              <Input
                placeholder="Search projects..."
                className="pl-9 bg-vscode-panel border-vscode-border focus:border-vscode-accent text-sm"
              />
            </div>
          </div>

          {/* New Project Button */}
          <div className="p-3 border-b border-vscode-border">
            <Button className="w-full bg-vscode-accent hover:bg-blue-600 text-white text-sm font-medium">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>

          {/* Projects List */}
          <div className="flex-1 overflow-y-auto p-2">
            {projects.length === 0 ? (
              <div className="text-sm text-vscode-text-muted text-center py-8">
                No projects found. Create your first project to organize your campaigns.
              </div>
            ) : (
              projects.map(project => (
                <div key={project.id} className="p-2 hover:bg-vscode-hover rounded cursor-pointer mb-2">
                  <div className="text-sm text-vscode-text">{project.name}</div>
                  <div className="text-xs text-vscode-text-muted">{project.description}</div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Bottom Actions */}
      <div className="border-t border-vscode-border p-3 space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sm text-vscode-text-muted hover:text-vscode-text hover:bg-vscode-hover"
        >
          <Users className="w-4 h-4 mr-2" />
          Customer Lists
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sm text-vscode-text-muted hover:text-vscode-text hover:bg-vscode-hover"
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
}
