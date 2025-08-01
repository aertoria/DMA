import { useCallback, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
  type Edge,
  type Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Eye, CheckCircle, Mail, FileText, Clock, Webhook, BarChart3, Target, Split, Send, TrendingUp, Search, Link, Users, MapPin, Code, Map, Mic, Bot, Brain, MessageCircle, Sparkles } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import StartNode from "./flow-nodes/start-node";
import EmailNode from "./flow-nodes/email-node";
import SplitNode from "./flow-nodes/split-node";
import DelayNode from "./flow-nodes/delay-node";
import WebhookNode from "./flow-nodes/webhook-node";
import AnalyticsNode from "./flow-nodes/analytics-node";
import LeadScoringNode from "./flow-nodes/lead-scoring-node";
import ABEmailSplitNode from "./flow-nodes/ab-email-split-node";
import SendEmailNode from "./flow-nodes/send-email-node";
import EmailAnalyticsNode from "./flow-nodes/email-analytics-node";
import SEOKeywordResearchNode from "./flow-nodes/seo-keyword-research-node";
import SEOContentOptimizationNode from "./flow-nodes/seo-content-optimization-node";
import SEOTechnicalAuditNode from "./flow-nodes/seo-technical-audit-node";
import SEOBacklinkAnalysisNode from "./flow-nodes/seo-backlink-analysis-node";
import SEORankTrackingNode from "./flow-nodes/seo-rank-tracking-node";
import SEOCompetitorAnalysisNode from "./flow-nodes/seo-competitor-analysis-node";
import SEOLocalSEONode from "./flow-nodes/seo-local-seo-node";
import SEOSchemaMarkupNode from "./flow-nodes/seo-schema-markup-node";
import SEOSitemapOptimizationNode from "./flow-nodes/seo-sitemap-optimization-node";
import SEOVoiceSearchOptimizationNode from "./flow-nodes/seo-voice-search-optimization-node";
import AEOAIPromptOptimizationNode from "./flow-nodes/aeo-ai-prompt-optimization-node";
import AEOAgentBehaviorAnalysisNode from "./flow-nodes/aeo-agent-behavior-analysis-node";
import AEOConversationalOptimizationNode from "./flow-nodes/aeo-conversational-optimization-node";
import SimulatorPoolNode from "./flow-nodes/simulator-pool-node";
import type { Campaign } from "@shared/schema";

const nodeTypes = {
  start: StartNode,
  email: EmailNode,
  split: SplitNode,
  delay: DelayNode,
  webhook: WebhookNode,
  analytics: AnalyticsNode,
  leadScoring: LeadScoringNode,
  abEmailSplit: ABEmailSplitNode,
  sendEmail: SendEmailNode,
  emailAnalytics: EmailAnalyticsNode,
  seoKeywordResearch: SEOKeywordResearchNode,
  seoContentOptimization: SEOContentOptimizationNode,
  seoTechnicalAudit: SEOTechnicalAuditNode,
  seoBacklinkAnalysis: SEOBacklinkAnalysisNode,
  seoRankTracking: SEORankTrackingNode,
  seoCompetitorAnalysis: SEOCompetitorAnalysisNode,
  seoLocalSEO: SEOLocalSEONode,
  seoSchemaMarkup: SEOSchemaMarkupNode,
  seoSitemapOptimization: SEOSitemapOptimizationNode,
  seoVoiceSearchOptimization: SEOVoiceSearchOptimizationNode,
  aeoAIPromptOptimization: AEOAIPromptOptimizationNode,
  aeoAgentBehaviorAnalysis: AEOAgentBehaviorAnalysisNode,
  aeoConversationalOptimization: AEOConversationalOptimizationNode,
  simulatorPool: SimulatorPoolNode,
};

interface MainCanvasProps {
  campaignId: number | null;
}

export default function MainCanvas({ campaignId }: MainCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: campaign } = useQuery<Campaign>({
    queryKey: ["/api/campaigns", campaignId],
    enabled: !!campaignId,
  });

  const updateCampaignMutation = useMutation({
    mutationFn: async (data: { flowData?: any; status?: string }) => {
      if (!campaignId) throw new Error("No campaign selected");
      return apiRequest("PUT", `/api/campaigns/${campaignId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      toast({ title: "Campaign saved successfully" });
    },
    onError: () => {
      toast({ title: "Failed to save campaign", variant: "destructive" });
    },
  });

  // Load campaign flow data when campaign changes
  useEffect(() => {
    if (campaign?.flowData && typeof campaign.flowData === 'object') {
      const flowData = campaign.flowData as { nodes?: any[], edges?: any[] };
      setNodes(flowData.nodes || []);
      setEdges(flowData.edges || []);
    } else {
      // Default empty flow
      setNodes([]);
      setEdges([]);
    }
  }, [campaign, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const saveFlow = useCallback(() => {
    if (!campaignId) return;
    
    const flowData = { nodes, edges };
    updateCampaignMutation.mutate({ flowData });
  }, [nodes, edges, campaignId, updateCampaignMutation]);

  const addNode = useCallback((type: string) => {
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: Math.random() * 300 + 100, y: Math.random() * 300 + 100 },
      data: { 
        label: type.charAt(0).toUpperCase() + type.slice(1),
        ...(type === 'email' && { subject: 'New Email', content: 'Email content...' }),
        ...(type === 'split' && { condition: 'Email opened' }),
        ...(type === 'delay' && { duration: '1 day' }),
        ...(type === 'webhook' && { url: 'https://api.example.com/webhook' }),
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const runCampaign = () => {
    if (!campaignId) return;
    
    // Update campaign status to active and save current flow
    updateCampaignMutation.mutate({ 
      status: "active",
      flowData: { nodes, edges }
    });
    
    toast({ title: "Campaign started successfully!" });
  };

  if (!campaignId) {
    return (
      <div className="h-full flex items-center justify-center bg-vscode-bg">
        <div className="text-center">
          <div className="text-vscode-text-muted text-lg mb-2">No campaign selected</div>
          <div className="text-vscode-text-muted text-sm">Select a campaign from the left panel to start editing</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-vscode-bg">
      {/* Top Bar */}
      <div className="bg-vscode-panel border-b border-vscode-border px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-vscode-accent" />
            <span className="text-sm font-medium text-vscode-text-bright">
              {campaign?.name || "Untitled Campaign"}
            </span>
            {nodes.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                Modified
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="border-vscode-border hover:border-vscode-accent"
          >
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button
            size="sm"
            onClick={runCampaign}
            className="bg-vscode-success hover:bg-green-600 text-white"
          >
            <Play className="w-4 h-4 mr-1" />
            Run Campaign
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={saveFlow}
            disabled={updateCampaignMutation.isPending}
            className="border-vscode-border hover:border-vscode-accent"
          >
            Save
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          className="node-canvas"
          fitView
        >
          <Background color="var(--vscode-border)" />
          <Controls className="bg-vscode-panel border border-vscode-border" />
          <MiniMap 
            className="bg-vscode-panel border border-vscode-border"
            nodeColor="#007acc"
            maskColor="rgba(0, 0, 0, 0.2)"
          />
        </ReactFlow>

        {/* Tool Palette */}
        <div className="absolute top-4 right-4 bg-vscode-sidebar border border-vscode-border rounded-lg p-3 space-y-3 w-64 max-h-[80vh] overflow-y-auto">
          <div className="text-xs font-medium text-vscode-text-bright mb-2 font-code">Components</div>
          
          {/* Core Components */}
          <div className="space-y-2">
            <div className="text-xs text-vscode-text-muted font-medium">Core</div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('email')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-vscode-accent"
              >
                <Mail className="w-4 h-4 text-vscode-accent mb-1" />
                <span className="text-xs">Email</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('split')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-vscode-accent"
              >
                <FileText className="w-4 h-4 text-vscode-warning mb-1" />
                <span className="text-xs">A/B Split</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('delay')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-vscode-accent"
              >
                <Clock className="w-4 h-4 text-vscode-text-muted mb-1" />
                <span className="text-xs">Delay</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('webhook')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-vscode-accent"
              >
                <Webhook className="w-4 h-4 text-vscode-text-muted mb-1" />
                <span className="text-xs">Webhook</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('analytics')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-vscode-accent"
              >
                <BarChart3 className="w-4 h-4 text-purple-500 mb-1" />
                <span className="text-xs">Analytics</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('leadScoring')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-vscode-accent"
              >
                <Target className="w-4 h-4 text-orange-500 mb-1" />
                <span className="text-xs">Lead Score</span>
              </Button>
            </div>
          </div>

          {/* Email Campaign Section */}
          <div className="space-y-2">
            <div className="text-xs text-vscode-text-muted font-medium">Email Campaign</div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('abEmailSplit')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-blue-500"
              >
                <Split className="w-4 h-4 text-blue-500 mb-1" />
                <span className="text-xs">AB Split</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('sendEmail')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-green-500"
              >
                <Send className="w-4 h-4 text-green-500 mb-1" />
                <span className="text-xs">Send Email</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('emailAnalytics')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-indigo-500"
              >
                <TrendingUp className="w-4 h-4 text-indigo-500 mb-1" />
                <span className="text-xs">Email Analytics</span>
              </Button>
            </div>
          </div>

          {/* SEO Section */}
          <div className="space-y-2">
            <div className="text-xs text-vscode-text-muted font-medium">SEO</div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('seoKeywordResearch')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-yellow-500"
              >
                <Search className="w-4 h-4 text-yellow-500 mb-1" />
                <span className="text-xs">Keywords</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('seoContentOptimization')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-yellow-600"
              >
                <FileText className="w-4 h-4 text-yellow-600 mb-1" />
                <span className="text-xs">Content</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('seoTechnicalAudit')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-yellow-700"
              >
                <BarChart3 className="w-4 h-4 text-yellow-700 mb-1" />
                <span className="text-xs">Tech Audit</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('seoBacklinkAnalysis')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-yellow-500"
              >
                <Link className="w-4 h-4 text-yellow-500 mb-1" />
                <span className="text-xs">Backlinks</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('seoRankTracking')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-orange-500"
              >
                <TrendingUp className="w-4 h-4 text-orange-500 mb-1" />
                <span className="text-xs">Rank Track</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('seoCompetitorAnalysis')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-red-500"
              >
                <Users className="w-4 h-4 text-red-500 mb-1" />
                <span className="text-xs">Competitors</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('seoLocalSEO')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-green-600"
              >
                <MapPin className="w-4 h-4 text-green-600 mb-1" />
                <span className="text-xs">Local SEO</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('seoSchemaMarkup')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-purple-500"
              >
                <Code className="w-4 h-4 text-purple-500 mb-1" />
                <span className="text-xs">Schema</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('seoSitemapOptimization')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-teal-500"
              >
                <Map className="w-4 h-4 text-teal-500 mb-1" />
                <span className="text-xs">Sitemap</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('seoVoiceSearchOptimization')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-pink-500"
              >
                <Mic className="w-4 h-4 text-pink-500 mb-1" />
                <span className="text-xs">Voice Search</span>
              </Button>
            </div>
          </div>

          {/* AEO Section */}
          <div className="space-y-2">
            <div className="text-xs text-vscode-text-muted font-medium">AEO (Agent Engine Optimization)</div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('aeoAIPromptOptimization')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-cyan-500"
              >
                <Bot className="w-4 h-4 text-cyan-500 mb-1" />
                <span className="text-xs">AI Prompts</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('aeoAgentBehaviorAnalysis')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-indigo-600"
              >
                <Brain className="w-4 h-4 text-indigo-600 mb-1" />
                <span className="text-xs">Behavior</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('aeoConversationalOptimization')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-violet-500"
              >
                <MessageCircle className="w-4 h-4 text-violet-500 mb-1" />
                <span className="text-xs">Conversation</span>
              </Button>
            </div>
          </div>

          {/* Simulator Pool */}
          <div className="space-y-2">
            <div className="text-xs text-vscode-text-muted font-medium">Simulator</div>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => addNode('simulatorPool')}
                className="flex flex-col h-auto py-2 border-vscode-border hover:border-emerald-500"
              >
                <Play className="w-4 h-4 text-emerald-500 mb-1" />
                <span className="text-xs">Campaign Simulator</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-vscode-panel border-t border-vscode-border px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <span className="text-vscode-text-muted">Campaign Flow</span>
            <span className="text-vscode-text-muted">{nodes.length} nodes, {edges.length} connections</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-vscode-success rounded-full"></div>
              <span className="text-vscode-text-muted">Valid flow</span>
            </div>
            {campaign?.settings && typeof campaign.settings === 'object' && (campaign.settings as any).abTestVariants && (
              <span className="text-vscode-accent">A/B Testing: {(campaign.settings as any).abTestVariants} variants</span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {campaign?.settings && typeof campaign.settings === 'object' && (campaign.settings as any).estimatedReach && (
              <span className="text-vscode-text-muted">Est. reach: {(campaign.settings as any).estimatedReach.toLocaleString()} contacts</span>
            )}
            <span className="text-vscode-text-muted">Conv. rate: 12.3%</span>
            <span className="text-vscode-text-muted">Zoom: 100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
