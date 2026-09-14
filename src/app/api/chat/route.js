import { streamText, tool, isStepCount } from 'ai';
import { groq } from '@ai-sdk/groq';
import { z } from 'zod';
import {
  searchProducts,
  getProductDetails,
  searchCategories,
  searchDimensions,
  searchWeight,
  searchKnowledge
} from '@/chatbot/retrieval';

export const maxDuration = 30;

const SYSTEM_PROMPT = `
ROLE:
You are the official AI customer assistant for Prince Pipes & Fittings, a B2B industrial manufacturer. 

TONE & STYLE:
Professional, concise, helpful, and technically grounded. Answer directly without conversational filler. Do NOT start answers with "Sure!", "Certainly!", "Let me check", or "I will look that up".

ZERO KNOWLEDGE POLICY & HALLUCINATION:
You have zero internal knowledge about Prince Pipes & Fittings products.
Every single product-related query MUST be answered by calling the appropriate retrieval tool.
Do NOT invent products, prices, stock, delivery times, or certifications.
If requested information is out of scope (e.g., weather, politics, unrelated topics, programming), politely decline: "I can help with Prince Pipes & Fittings products, materials, technical specifications, and company information. What would you like to know?"

TOOL USAGE DIRECTIVE (CRITICAL):
When you need to use a tool to look up information, you MUST output ONLY the tool call. 
DO NOT generate ANY conversational text before calling a tool.
NEVER say "I will search the catalog", "Let me check", or "Processing your request". 
Execute the tool call instantly.

CONTEXT & AMBIGUITY:
Maintain conversation context (e.g., if the user asks "What sizes?" after discussing Stainless Steel Elbows, infer the context).
If a user is vague (e.g., "products"), use searchProducts broadly or summarize categories. 
If a query is highly ambiguous, ask a concise clarifying question (e.g., "Are you looking for a specific material or fitting type?").

RETRIEVAL & FALLBACK:
The catalog ONLY covers Stainless Steel, Carbon Steel, Duplex, Super Duplex, Alloy Steel, and Inconel 625 pipe fittings. If asked for UPVC/CPVC/Brass, politely state they are not in this catalog.
If a tool returns no results, inform the customer politely that the information is currently unavailable in the system.
Never expose internal tool names, internal JSON structures, or say "I don't have this in my vector database".
`;

export async function POST(req) {
  try {
    const body = await req.json();
    
    const messages = body.messages ?? [];


    const coreMessages = [];
    for (const m of messages) {
      if (m.role === 'user' || m.role === 'system') {
        let textContent = m.content || m.text || "";
        if (m.parts && Array.isArray(m.parts)) {
          textContent = m.parts.filter(p => p.type === 'text').map(p => p.text).join('\n');
        }
        coreMessages.push({ role: m.role, content: textContent });
      } else if (m.role === 'assistant') {
        let contentArr = [];
        
        // Handle parts if present
        if (m.parts && Array.isArray(m.parts)) {
          for (const p of m.parts) {
            if (p.type === 'text' && p.text) {
              contentArr.push({ type: 'text', text: p.text });
            } else if ((p.type === 'tool-invocation' || p.type === 'tool-call') && p.toolName) {
              contentArr.push({
                type: 'tool-call',
                toolCallId: p.toolCallId || `call_${Math.random().toString(36).substring(7)}`,
                toolName: p.toolName,
                args: typeof p.args === 'string' ? JSON.parse(p.args) : (p.args || {})
              });
            }
          }
        }
        
        // Handle legacy toolInvocations if present
        if (m.toolInvocations && Array.isArray(m.toolInvocations)) {
          for (const t of m.toolInvocations) {
            if (!contentArr.find(c => c.type === 'tool-call' && c.toolCallId === t.toolCallId)) {
              contentArr.push({
                type: 'tool-call',
                toolCallId: t.toolCallId || `call_${Math.random().toString(36).substring(7)}`,
                toolName: t.toolName || 'unknown_tool',
                args: typeof t.args === 'string' ? JSON.parse(t.args) : (t.args || {})
              });
            }
          }
        }
        
        if (contentArr.length === 0) {
          let textContent = m.content || m.text || "";
          if (textContent) {
            coreMessages.push({ role: 'assistant', content: textContent });
          }
        } else {
          coreMessages.push({ role: 'assistant', content: contentArr });
        }
      } else if (m.role === 'tool') {
        let toolResults = [];
        if (m.parts && Array.isArray(m.parts)) {
          for (const p of m.parts) {
            if (p.type === 'tool-result' && p.toolName) {
              toolResults.push({
                type: 'tool-result',
                toolCallId: p.toolCallId || 'unknown_call',
                toolName: p.toolName,
                result: p.result || {}
              });
            }
          }
        }
        
        // Try falling back to toolInvocations (some UI layers pack results here)
        if (toolResults.length === 0 && m.toolInvocations && Array.isArray(m.toolInvocations)) {
          for (const t of m.toolInvocations) {
            if (t.state === 'result' || t.result !== undefined) {
              toolResults.push({
                type: 'tool-result',
                toolCallId: t.toolCallId || 'unknown_call',
                toolName: t.toolName || 'unknown_tool',
                result: t.result || {}
              });
            }
          }
        }
        
        if (toolResults.length > 0) {
          coreMessages.push({ role: 'tool', content: toolResults });
        }
      }
    }


    const result = streamText({
      model: groq('openai/gpt-oss-120b'),
      system: SYSTEM_PROMPT,
      messages: coreMessages,
      maxSteps: 5,
      tools: {
        searchProducts: tool({
          description: 'Search the database for specific products by name, type, or material (e.g. "elbow", "flange", "carbon steel tee"). You MUST provide a searchTerm.',
          parameters: z.object({
            searchTerm: z.string().describe('The product name, material, or keyword to search for (e.g. "carbon steel elbow", "flange").')
          }),
          execute: async ({ searchTerm }) => {
            const query = searchTerm || "";
            if (!query) return "Error: Please provide a specific search query...";
            const res = searchProducts(query, { limit: 5 });
            return res;
          },
        }),
        getProductDetails: tool({
          description: 'Use this after identifying a specific product when detailed product information is required.',
          parameters: z.object({
            productIdOrSlug: z.string().describe('The exact product ID or slug retrieved from a previous searchProducts call. MUST NOT BE EMPTY.')
          }),
          execute: async ({ productIdOrSlug }) => {
            if (!productIdOrSlug) return "Error: Please provide a valid productIdOrSlug.";
            const res = getProductDetails(productIdOrSlug);
            return res;
          },
        }),
        searchDimensions: tool({
          description: 'Use this when the customer asks about product dimensions for a specific product and size.',
          parameters: z.object({
            productType: z.string().optional().default('').describe('The type of product (e.g., nipple, tee, flange)'),
            sizeQuery: z.string().optional().describe('The specific size to filter (e.g., "2", "1/2")')
          }),
          execute: async ({ productType, sizeQuery }) => {
            return searchDimensions(productType || "", sizeQuery);
          },
        }),
        searchWeight: tool({
          description: 'Use this when the customer asks about product weight.',
          parameters: z.object({
            productType: z.string().optional().default('').describe('The type of product (e.g., nipple, tee, flange)'),
            sizeQuery: z.string().optional().describe('The specific size to filter (e.g., "2", "1/2")')
          }),
          execute: async ({ productType, sizeQuery }) => {
            return searchWeight(productType || "", sizeQuery);
          },
        }),
        searchCategories: tool({
          description: 'Use this to search for broad product categories, subcategories, materials, or general product lines. Do not use this for specific products.',
          parameters: z.object({
            categoryQuery: z.string().optional().default('').describe('The category name to search for. Pass empty string to list all categories.')
          }),
          execute: async ({ categoryQuery }) => {
            const query = categoryQuery || "";
            const res = searchCategories(query);
            return res;
          },
        }),
        searchKnowledge: tool({
          description: 'Use this for company, manufacturing, quality, materials, standards, industries, capabilities, contact, and other non-product information.',
          parameters: z.object({
            query: z.string().optional().default('').describe('The knowledge search query (e.g., "quality", "about", "manufacturing")')
          }),
          execute: async ({ query }) => {
            return searchKnowledge(query || "company");
          },
        }),
      },
      stopWhen: isStepCount(5),
    });

    return result.toUIMessageStreamResponse({
      sendReasoning: false,
      onError: (err) => {
        console.error("[CHAT ERROR] stream Error:", err);
        return err instanceof Error ? err.message : "An error occurred.";
      }
    });
    
  } catch (err) {
    console.error("[CHAT ERROR] stage = POST_CATCH", err);
    return new Response(
      JSON.stringify({ error: "I'm sorry, I couldn't process that request right now. You can ask me about our products, materials, or technical information." }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
