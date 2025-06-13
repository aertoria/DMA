import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, X, Sparkles } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ChatMessage } from "@shared/schema";

interface AIChatPanelProps {
  campaignId: number | null;
}

export default function AIChatPanel({ campaignId }: AIChatPanelProps) {
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: messages = [] } = useQuery<ChatMessage[]>({
    queryKey: ["/api/chat/messages", { campaignId }],
    enabled: !!campaignId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!campaignId) throw new Error("No campaign selected");
      return apiRequest("POST", "/api/chat/messages", {
        campaignId,
        role: "user",
        content,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/messages"] });
      setMessage("");
    },
    onError: () => {
      toast({ title: "Failed to send message", variant: "destructive" });
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !campaignId) return;
    sendMessageMutation.mutate(message.trim());
  };

  const handleQuickCommand = (command: string) => {
    if (!campaignId) return;
    sendMessageMutation.mutate(command);
  };

  if (!isExpanded) {
    return (
      <div className="w-12 bg-vscode-sidebar border-l border-vscode-border flex flex-col items-center py-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(true)}
          className="text-vscode-text hover:bg-vscode-hover"
        >
          <Sparkles className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-vscode-sidebar border-l border-vscode-border flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-vscode-border">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          <span className="font-medium text-sm text-vscode-text-bright">Marketing Copilot</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(false)}
          className="text-vscode-text hover:bg-vscode-hover"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-4">
          {!campaignId ? (
            <div className="text-center text-vscode-text-muted py-8">
              <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <div className="text-sm">Select a campaign to start chatting with AI</div>
            </div>
          ) : messages.length === 0 ? (
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div className="flex-1">
                  <div className="bg-vscode-panel border border-vscode-border rounded-lg p-3 text-sm">
                    <p className="text-vscode-text">
                      Hi! I'm your marketing AI assistant. I can help you optimize your campaigns, suggest email content, and provide A/B testing recommendations.
                    </p>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickCommand("/suggest email subjects")}
                      className="text-xs border-vscode-border hover:border-vscode-accent"
                    >
                      Suggest subjects
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickCommand("/optimize campaign flow")}
                      className="text-xs border-vscode-border hover:border-vscode-accent"
                    >
                      Optimize flow
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`flex space-x-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">AI</span>
                  </div>
                )}
                <div className={`flex-1 ${msg.role === 'user' ? 'max-w-xs' : ''}`}>
                  <div className={`rounded-lg p-3 text-sm ${
                    msg.role === 'user' 
                      ? 'bg-vscode-accent text-white ml-auto' 
                      : 'bg-vscode-panel border border-vscode-border text-vscode-text'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
                {msg.role === 'user' && (
                  <div className="w-6 h-6 bg-vscode-text-muted rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">U</span>
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      {campaignId && (
        <div className="border-t border-vscode-border p-3">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="relative">
              <Textarea
                placeholder="Ask about your campaign..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-vscode-panel border-vscode-border focus:border-vscode-accent resize-none pr-10 text-sm"
                rows={2}
                disabled={sendMessageMutation.isPending}
              />
              <Button
                type="submit"
                size="sm"
                disabled={!message.trim() || sendMessageMutation.isPending}
                className="absolute bottom-2 right-2 p-1 h-6 w-6 bg-vscode-accent hover:bg-blue-600"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickCommand("/suggest copy improvements")}
                className="text-xs border-vscode-border hover:border-vscode-accent h-6"
              >
                /suggest copy
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickCommand("/optimize conversion rates")}
                className="text-xs border-vscode-border hover:border-vscode-accent h-6"
              >
                /optimize
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickCommand("/explain campaign metrics")}
                className="text-xs border-vscode-border hover:border-vscode-accent h-6"
              >
                /explain
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
