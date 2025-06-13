import OpenAI from "openai";
import type { ChatMessage } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || "sk-placeholder-key"
});

export async function generateAIResponse(messages: ChatMessage[]): Promise<string> {
  try {
    const conversationHistory = messages
      .slice(-10) // Keep last 10 messages for context
      .map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      }));

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a marketing AI assistant for DeepMonetizy, an AI-powered marketing campaign IDE. You help users optimize their email campaigns, A/B tests, and marketing flows. 

Key capabilities:
- Suggest email subject lines and copy optimization
- Provide A/B testing recommendations  
- Analyze campaign performance metrics
- Help with marketing automation flow design
- Give actionable marketing advice

Be concise, practical, and focus on actionable insights. When suggesting content, provide specific examples. If asked to generate subject lines or copy, provide multiple variants for testing.`
        },
        ...conversationHistory,
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response right now.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "I'm experiencing some technical difficulties. Please try again later.";
  }
}

export async function generateMarketingContent(type: string, context: any): Promise<any> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a marketing content generator. Respond with JSON containing the requested content."
        },
        {
          role: "user",
          content: `Generate ${type} content with this context: ${JSON.stringify(context)}`
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 300,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    console.error("Content generation error:", error);
    return { error: "Failed to generate content" };
  }
}
