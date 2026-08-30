import { NextResponse } from 'next/server';
import { 
  searchProducts, 
  searchCategories, 
  searchDimensions, 
  searchWeight, 
  searchKnowledge 
} from '@/chatbot/retrieval';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || 'stainless steel nipple';

  const testQueries = [
    "stainless steel nipple",
    "SS 316 nipple",
    "2 inch stainless steel nipple",
    "threaded fittings",
    "stainless steel flanges",
    "ASME B16.11",
    "pharmaceutical applications",
    "stainless steel products",
    "eccentric reducer",
    "unknown product xyz123"
  ];

  const results = {};

  testQueries.forEach(q => {
    // 1. Search products
    const products = searchProducts(q, { limit: 3 });
    // 2. Search categories
    const categories = searchCategories(q).slice(0, 2);
    // 3. Search knowledge
    const knowledge = searchKnowledge(q);
    
    // We can also extract some dimension/weight stuff if it's a specific product type
    // Let's just do products and categories for the main test
    
    results[q] = {
      products: products.map(p => p.name),
      categories: categories.map(c => c.name),
      knowledge: knowledge ? knowledge.topic : null
    };
  });

  return NextResponse.json(results);
}
