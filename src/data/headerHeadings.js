export const HEADER_HEADINGS = {
  '/': { title: 'Engineered Flow Solutions', subtitle: 'Global Manufacturing Excellence' },
  '/products': { title: 'Industrial Pipe & Fittings', subtitle: 'Comprehensive Product Portfolio' },
  '/materials': { title: 'Advanced Polymers', subtitle: 'Material Science & Engineering' },
  '/technical': { title: 'Technical Documentation', subtitle: 'Engineering Specifications' },
  '/resources': { title: 'Engineering Resources', subtitle: 'Knowledge Base & Tools' },
  '/about': { title: 'About Prince Pipes & Fittings', subtitle: 'Our Heritage & Vision' },
  '/company': { title: 'Manufacturing Excellence', subtitle: 'World-Class Infrastructure' },
  '/contact': { title: 'Get In Touch', subtitle: 'Global Support Network' },
};

export const getHeadingForRoute = (pathname) => {
  // 1. Exact match
  if (HEADER_HEADINGS[pathname]) {
    return HEADER_HEADINGS[pathname];
  }

  // 2. Dynamic generation based on path segments
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0) {
    const lastSegment = segments[segments.length - 1];
    const parentSegment = segments.length > 1 ? segments[segments.length - 2] : '';

    const formatSlug = (str) => {
      return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    let title = formatSlug(lastSegment);
    
    // Add elegant extra words to make shorter titles look premium
    if (title.length < 20) {
      if (segments.includes('materials')) {
        title = `Premium ${title} Alloys & Grades`;
      } else if (segments.includes('products')) {
        title = `Precision-Engineered ${title}`;
      } else if (segments.includes('technical-resources')) {
        title = `${title} Reference Data`;
      } else {
        title = `Explore ${title}`;
      }
    }
    
    let subtitle = 'Engineered Flow Solutions';
    if (parentSegment) {
      subtitle = formatSlug(parentSegment);
    } else {
      // If it's a top level page not in HEADER_HEADINGS (e.g. /quality)
      // Check if it exists as a partial match or just use a generic subtitle
      const possibleParentMatch = HEADER_HEADINGS[`/${lastSegment}`];
      if (possibleParentMatch) subtitle = possibleParentMatch.subtitle;
    }

    return { title, subtitle };
  }

  return { title: 'Prince Pipes & Fittings', subtitle: 'Engineered Flow Solutions' };
};
