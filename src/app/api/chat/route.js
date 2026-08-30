import { streamText, tool } from 'ai';
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

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const SYSTEM_PROMPT = `
ROLE:
You are the official AI customer assistant for Prince Pipes & Fittings.

PURPOSE:
Help customers understand the products, specifications, categories, applications, company information, manufacturing information, quality information, standards, and other information available in the approved website knowledge.

CRITICAL MANDATE - ZERO KNOWLEDGE POLICY:
You have ZERO prior knowledge about Prince Pipes & Fittings products. You MUST NOT answer ANY product-related questions using your internal knowledge. 
If a user asks about ANY product (e.g. "tell me about ss nipple"), YOU MUST ALWAYS CALL THE searchProducts TOOL FIRST to retrieve the catalog data.
Any response about products that is not backed by the tool results is a hallucination and is strictly forbidden.

DATA RULES:
1. The retrieval tools are the ONLY source of truth.
2. Do not invent or guess information.
4. Do not assume a product has a specification just because similar products have it.
5. Do not invent prices.
6. Do not invent stock availability.
7. Do not invent delivery dates.
8. Do not invent certifications.
9. Do not invent material grades.
10. Do not invent dimensions.
11. Do not invent weight.
12. Do not invent pressure ratings.
13. Do not invent standards.
14. Do not claim a product is available unless the retrieved data supports that statement.
15. If information is unavailable, clearly tell the customer that the current website data does not contain that information.
16. Never expose internal JSON structure, internal file paths, internal IDs, SEO metadata, routing information, or implementation details.
17. Do not mention that you are using internal JSON files.
18. Do not expose tool/function names to customers.
19. Keep answers concise, professional, helpful, and customer-friendly.
20. For technical questions, answer only using retrieved information.

PRODUCT VERIFICATION RULE:
You must NOT blindly trust the first search result. 
If a customer asks for a specific grade/size (e.g. "Do you have SS 316 nipple in 2 inch?"):
1. Search for the product.
2. Verify that the requested grade exists in the retrieved product data.
3. Verify that the requested size is supported.
4. If the product exists but the requested grade or size cannot be verified, DO NOT say "Yes". Instead say: "I found the Stainless Steel Nipple in our product data, but I couldn't verify the requested grade/size from the available information."

BROAD SEARCH BEHAVIOR CHECK:
Searches for broad terms like "pharmaceutical applications" may return matching but potentially irrelevant/ambiguous results. Do not confidently present weak/ambiguous search results as absolute fact. If search confidence is low, ask for clarification or provide a cautious response.

MULTI-TOOL QUESTIONS & CONTEXT:
Use multiple tools when necessary (e.g., search product first, then get dimensions). Remember the current context of the conversation. If a customer asks "What sizes?" after discussing a product, infer the product from context, but do not blindly assume context when multiple products are being discussed.

AMBIGUOUS QUESTIONS:
If you cannot determine the correct product/size/material from the query, ask a short clarification question (e.g., "Which nipple size would you like the weight for?").

PRICING / AVAILABILITY:
The current website data does NOT contain reliable live pricing or stock availability. If asked, politely explain that the current website data does not provide live pricing/availability and guide the customer toward contacting the sales team.

UNKNOWN QUESTIONS:
If retrieval returns no relevant information, do not hallucinate. Say: "I couldn't find that information in our current product data. Please contact our sales team for confirmation."

RESPONSE STYLE:
- Concise, professional, friendly, easy to understand.
- Use bullets when listing specifications.
- Avoid huge paragraphs.

CRITICAL RULE FOR ALL RESPONSES:
Whenever you need to use a tool to search for information, you MUST ALWAYS output a short text message FIRST (e.g. "Let me check the product data for you..." or "I'm looking that up now...") BEFORE invoking the tool. Never invoke a tool without saying something first!
`;

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("INCOMING API CHAT BODY:", JSON.stringify(body, null, 2));
    const { messages } = body;

    // Remove any undefined values or fix message format if needed
    console.log("MESSAGES:", JSON.stringify(messages, null, 2));

    const coreMessages = [];
    for (const m of messages) {
      if (m.role === 'user' || m.role === 'system') {
        const textContent = typeof m.content === 'string' ? m.content : (typeof m.text === 'string' ? m.text : '');
        coreMessages.push({ 
          role: m.role, 
          content: textContent 
        });
      } else if (m.role === 'assistant') {
        if (m.toolInvocations && m.toolInvocations.length > 0) {
          const toolCalls = [];
          const toolResults = [];
          for (const t of m.toolInvocations) {
            let parsedArgs = {};
            if (typeof t.args === 'string') {
              try { parsedArgs = JSON.parse(t.args); } catch (e) { parsedArgs = {}; }
            } else if (t.args && typeof t.args === 'object') {
              parsedArgs = t.args;
            }

            toolCalls.push({
              type: 'tool-call',
              toolCallId: t.toolCallId || `call_${Math.random().toString(36).substring(7)}`,
              toolName: t.toolName || 'unknown_tool',
              args: parsedArgs
            });
            
            if (t.state === 'result' || t.result !== undefined) {
              toolResults.push({
                type: 'tool-result',
                toolCallId: t.toolCallId || 'unknown_call',
                toolName: t.toolName || 'unknown_tool',
                result: t.result
              });
            }
          }
          coreMessages.push({
            role: 'assistant',
            content: m.content ? [{ type: 'text', text: m.content }, ...toolCalls] : toolCalls
          });
          if (toolResults.length > 0) {
            coreMessages.push({
              role: 'tool',
              content: toolResults
            });
          }
        } else {
          coreMessages.push({ 
            role: 'assistant', 
            content: typeof m.content === 'string' ? m.content : '' 
          });
        }
      } else if (m.role === 'tool') {
        // Strip any UI properties like id, createdAt
        coreMessages.push({
          role: 'tool',
          content: Array.isArray(m.content) ? m.content.map(c => ({
            type: 'tool-result',
            toolCallId: c.toolCallId || `call_${Math.random().toString(36).substring(7)}`,
            toolName: c.toolName || 'unknown_tool',
            result: c.result
          })) : []
        });
      }
    }

    const result = streamText({
      model: groq('qwen/qwen3.8-27b'),
      system: SYSTEM_PROMPT,
      messages: coreMessages,
      tools: {
        searchProducts: tool({
          description: 'Use this when the customer is looking for a product or when you need to identify products matching a name, material, grade, size, standard, application, connection, or other product characteristic.',
          parameters: z.object({
            query: z.string().describe('The search query for the product')
          }),
          execute: async ({ query }) => {
            return searchProducts(query, { limit: 5 });
          },
        }),
        getProductDetails: tool({
          description: 'Use this after identifying a specific product when detailed product information is required.',
          parameters: z.object({
            productIdOrSlug: z.string().describe('The exact product ID or slug retrieved from a previous searchProducts call')
          }),
          execute: async ({ productIdOrSlug }) => {
            return getProductDetails(productIdOrSlug);
          },
        }),
        searchDimensions: tool({
          description: 'Use this when the customer asks about product dimensions for a specific product and size.',
          parameters: z.object({
            productType: z.string().describe('The type of product (e.g., nipple, tee, flange)'),
            sizeQuery: z.string().optional().describe('The specific size to filter (e.g., "2", "1/2")')
          }),
          execute: async ({ productType, sizeQuery }) => {
            return searchDimensions(productType, sizeQuery);
          },
        }),
        searchWeight: tool({
          description: 'Use this when the customer asks about product weight.',
          parameters: z.object({
            productType: z.string().describe('The type of product (e.g., nipple, tee, flange)'),
            sizeQuery: z.string().optional().describe('The specific size to filter (e.g., "2", "1/2")')
          }),
          execute: async ({ productType, sizeQuery }) => {
            return searchWeight(productType, sizeQuery);
          },
        }),
        searchCategories: tool({
          description: 'Use this when the customer asks what categories, subcategories, or product groups are available.',
          parameters: z.object({
            query: z.string().describe('The category search query')
          }),
          execute: async ({ query }) => {
            return searchCategories(query);
          },
        }),
        searchKnowledge: tool({
          description: 'Use this for company, manufacturing, quality, materials, standards, industries, capabilities, contact, and other non-product information.',
          parameters: z.object({
            query: z.string().describe('The knowledge search query (e.g., "quality", "about", "manufacturing")')
          }),
          execute: async ({ query }) => {
            return searchKnowledge(query);
          },
        }),
      },
      maxSteps: 5, // Allow multi-step tool calls
    });
    return result.toUIMessageStreamResponse({
      sendReasoning: false,
      onError: (err) => {
        console.error("Stream Error:", err);
        return err instanceof Error ? err.message : "An error occurred.";
      }
    });
  } catch (err) {
    console.error("Error in POST /api/chat:", err);
    return new Response(JSON.stringify({ error: err.message || 'Unknown error' }), { status: 500 });
  }
}

// force recompile
