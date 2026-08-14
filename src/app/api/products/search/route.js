import { NextResponse } from 'next/server';
import { getProductSearchIndex } from '@/utils/productData';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query || query.trim() === '') {
      return NextResponse.json({ items: [], total: 0 });
    }

    // getProductSearchIndex parses the JSON and builds the flattened index.
    // In a real production app with a massive database, this would be a DB query.
    // Next.js will cache this response if we configure it, but since we read from 
    // a local JSON, the in-memory processing here is extremely fast and avoids 
    // sending the entire JSON payload to the client.
    const searchIndex = getProductSearchIndex();
    const { items = [] } = searchIndex;
    
    const queryTerms = query.toLowerCase().split(' ').filter(Boolean);
    
    const filteredResults = items.filter(item => {
      return queryTerms.every(term => item.searchString.includes(term));
    });

    // Limit to max 15 results
    const limitedResults = filteredResults.slice(0, 15);

    return NextResponse.json({ 
      items: limitedResults, 
      total: filteredResults.length 
    });
  } catch (error) {
    console.error('Error in product search API:', error);
    return NextResponse.json({ items: [], total: 0, error: 'Internal Server Error' }, { status: 500 });
  }
}
