// Client-side OpenAI utilities for handling AI responses
export interface AIResponse {
  content: string;
  suggestions?: string[];
  metadata?: Record<string, any>;
}

export function parseAIResponse(content: string): AIResponse {
  try {
    // Try to parse as JSON first for structured responses
    const parsed = JSON.parse(content);
    return {
      content: parsed.content || content,
      suggestions: parsed.suggestions,
      metadata: parsed.metadata,
    };
  } catch {
    // Fallback to plain text
    return { content };
  }
}

export function formatMarketingPrompt(type: string, context: any): string {
  const prompts = {
    subjectLines: `Generate 5 compelling email subject lines for: ${context.campaignName}. Target audience: ${context.audience || 'general'}. Focus on: ${context.focus || 'engagement'}.`,
    optimization: `Analyze this email campaign and suggest improvements: ${JSON.stringify(context)}`,
    copy: `Improve this email copy for better conversion: ${context.content}`,
    flow: `Suggest optimizations for this campaign flow: ${JSON.stringify(context.flowData)}`,
  };
  
  return prompts[type as keyof typeof prompts] || `Help with: ${type}`;
}
