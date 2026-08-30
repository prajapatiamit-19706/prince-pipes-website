import aboutData from '@/data/about-us-master.json';
import companyData from '@/data/company.json';
import qualityData from '@/data/quality.json';
import standardsData from '@/data/standards.json';
import manufacturingData from '@/data/manufacturing.json';
import materialMaster from '@/data/materialMaster.json';

/**
 * Retrieves general knowledge base information from static JSON sources based on topic matching.
 * @param {string} query - The search query (e.g. "quality", "about", "manufacturing")
 * @returns {Object|null} Relevant information from the knowledge base, or null.
 */
export function searchKnowledge(query) {
  if (!query) {
    return {
      topic: 'Not Found',
      content: 'No specific knowledge base entry matched the query.'
    };
  }
  const lowerQuery = query.toLowerCase().trim();

  // Determine the best source based on keywords in the query
  if (lowerQuery.includes('about') || lowerQuery.includes('history') || lowerQuery.includes('company')) {
    return {
      topic: 'About Us / Company',
      content: {
        mission: aboutData.mission,
        vision: aboutData.vision,
        overview: companyData.description,
        contact: companyData.contact
      }
    };
  }

  if (lowerQuery.includes('quality') || lowerQuery.includes('certificat') || lowerQuery.includes('test')) {
    return {
      topic: 'Quality & Testing',
      content: {
        description: qualityData.description,
        testingMethods: qualityData.testingMethods || qualityData.facilities?.map(f => f.title)
      }
    };
  }

  if (lowerQuery.includes('standard') || lowerQuery.includes('asme') || lowerQuery.includes('astm')) {
    return {
      topic: 'Standards',
      content: standardsData
    };
  }

  if (lowerQuery.includes('manufactur') || lowerQuery.includes('process') || lowerQuery.includes('machine')) {
    return {
      topic: 'Manufacturing Capabilities',
      content: {
        overview: manufacturingData.overview,
        processes: manufacturingData.processes?.map(p => ({ title: p.title, description: p.description }))
      }
    };
  }

  // specific material querying
  if (lowerQuery.includes('material') || lowerQuery.includes('stainless') || lowerQuery.includes('carbon') || lowerQuery.includes('duplex') || lowerQuery.includes('alloy')) {
    const matchedMaterial = materialMaster.materials.find(m => 
      lowerQuery.includes(m.name.toLowerCase()) || lowerQuery.includes(m.slug)
    );
    
    if (matchedMaterial) {
      return {
        topic: `Material: ${matchedMaterial.name}`,
        content: {
          overview: matchedMaterial.overview,
          grades: matchedMaterial.grades,
          properties: matchedMaterial.properties
        }
      };
    }
  }

  return {
    topic: 'Not Found',
    content: 'No specific knowledge base entry matched the query.'
  }; // Return null if no matching topic is found safely (No Hallucination)
}
