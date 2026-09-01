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

SCOPE CONSTRAINT:
The catalog ONLY contains: "Stainless Steel, Carbon Steel, Duplex, Super Duplex, Alloy Steel, and Inconel 625 pipe fittings".
If a customer asks for UPVC, CPVC, PVC, Copper, Brass, or anything else outside this scope, clearly state that this specific catalog does not contain those materials.

DATA RULES:
1. The retrieval tools are the ONLY source of truth.
2. Do not invent or guess information.
3. Do not assume a product has a specification just because similar products have it.
4. Do not invent certifications, material grades, dimensions, weights, pressure ratings, or standards.
5. If information is unavailable, clearly tell the customer that the current website data does not contain that information.
6. Never expose internal JSON structure, internal file paths, internal IDs, SEO metadata, routing information, or implementation details.
7. Do not mention that you are using internal JSON files or expose tool/function names to customers.
8. Keep answers concise, professional, helpful, and customer-friendly.
9. For technical questions, answer ONLY using retrieved information.

INTENT ROUTING & BEST PRODUCT:
- "Best Product": We do not define a "best product". If asked (e.g., "tell me about your best product"), DO NOT guess or rank products. DO NOT search for random standards or products. Instead, explain that product suitability depends on application, material, size, connection, grade, and standard, and offer to help them find the appropriate product.
- Unknown/Out-of-Scope: If asked about the weather, presidents, or completely unrelated topics, respond politely: "I can help with Prince Pipes & Fittings products, specifications, materials, standards, applications, and company information. I don't have verified information for that request."
- Only use \`searchKnowledge\` for company, manufacturing, quality, materials, standards, industries, or capabilities. NEVER use it for general product searches.

PRODUCT VERIFICATION RULE:
You must NOT blindly trust the first search result. 
1. Search for the product.
2. If the user asks for a specific product (e.g., "Stainless Steel Nipple"), filter the results and ONLY answer about that exact product. Do not talk about "Hex Nipple" or "Reducer" if they asked for "Nipple".
3. Verify Material, Grade, and Size before confirming availability.
4. If a customer asks for a specific grade/size (e.g. "Do you have SS 316 nipple in 2 inch?"):
   - If the product exists but the requested grade/size cannot be verified from the data, DO NOT say "Yes". Instead say: "I found the Stainless Steel Nipple in our product data, but I couldn't verify the requested grade/size from the available information."

MULTI-TOOL QUESTIONS & CONTEXT:
Use multiple tools when necessary. Remember the current context of the conversation. If a customer asks "What sizes?" after discussing a product, infer the product from context and search for its details or dimensions.

AMBIGUOUS QUESTIONS:
If you cannot determine the correct product/size/material from the query, or if multiple products match equally for a specific part request, ask a short clarification question.

ACRONYMS & BROAD QUERIES:
1. If the user uses acronyms like "CS" (Carbon Steel) or "SS" (Stainless Steel), expand these terms in your tool calls (search for "Carbon Steel" instead of just "CS").
2. If the user asks broadly about a category (e.g., "tell me about duplex pipe fittings" or "CS"), DO NOT ask them to specify a single product. Instead, use the retrieved products to describe the general category, its common materials, and list the types of products available (e.g., elbows, tees, reducers) within that category.

PRICING / AVAILABILITY:
The current website data does NOT contain reliable live pricing or stock availability. If asked for price or stock, DO NOT invent numbers. Say: "Pricing/availability isn't available in the current product data. Please contact our sales team for the latest information."

TOOL USAGE DIRECTIVE:
You MUST NEVER output conversational filler, pre-search messages, or phrases like "I'll check that for you", "Let me look that up", or "I need to look up that specific detail".
If you need to retrieve information to answer the user, YOUR VERY FIRST OUTPUT MUST BE THE TOOL CALL itself. DO NOT generate any text before calling the tool. DO NOT EXPLAIN THAT YOU ARE SEARCHING. Just execute the tool call!
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
      let textContent = '';
      if (typeof m.content === 'string') {
        textContent = m.content;
      } else if (typeof m.text === 'string') {
        textContent = m.text;
      } else if (Array.isArray(m.parts)) {
        textContent = m.parts.filter(p => p.text).map(p => p.text).join('\n');
      } else if (Array.isArray(m.content)) {
        textContent = m.content.filter(p => p.text).map(p => p.text).join('\n');
      }

      if (m.role === 'user' || m.role === 'system') {
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
              input: parsedArgs
            });

            if (t.state === 'result' || t.result !== undefined) {
              toolResults.push({
                type: 'tool-result',
                toolCallId: t.toolCallId || 'unknown_call',
                toolName: t.toolName || 'unknown_tool',
                output: t.result
              });
            }
          }
          coreMessages.push({
            role: 'assistant',
            content: textContent ? [{ type: 'text', text: textContent }, ...toolCalls] : toolCalls
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
            content: textContent
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
            output: c.result
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
            query: z.string().optional().default('').describe('The search query for the product')
          }),
          execute: async ({ query }) => {
            return searchProducts(query || "", { limit: 5 });
          },
        }),
        getProductDetails: tool({
          description: 'Use this after identifying a specific product when detailed product information is required.',
          parameters: z.object({
            productIdOrSlug: z.string().optional().default('').describe('The exact product ID or slug retrieved from a previous searchProducts call')
          }),
          execute: async ({ productIdOrSlug }) => {
            if (!productIdOrSlug) return "Error: Please provide a valid productIdOrSlug.";
            return getProductDetails(productIdOrSlug);
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
          description: 'Use this when the customer asks what categories, subcategories, or product groups are available.',
          parameters: z.object({
            query: z.string().optional().default('').describe('The category search query')
          }),
          execute: async ({ query }) => {
            return searchCategories(query || "");
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
