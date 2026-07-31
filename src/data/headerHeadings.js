export const HEADER_HEADINGS = {
  '/': { title: 'Engineered Flow Solutions', subtitle: 'Global Manufacturing Excellence' },
  '/products': { title: 'Industrial Pipe & Fittings', subtitle: 'Comprehensive Product Portfolio' },
  '/materials': { title: 'Advanced Polymers', subtitle: 'Material Science & Engineering' },
  '/technical': { title: 'Technical Documentation', subtitle: 'Engineering Specifications' },
  '/resources': { title: 'Engineering Resources', subtitle: 'Knowledge Base & Tools' },
  '/about': { title: 'About Prince Pipes', subtitle: 'Our Heritage & Vision' },
  '/company': { title: 'Manufacturing Excellence', subtitle: 'World-Class Infrastructure' },
  '/contact': { title: 'Get In Touch', subtitle: 'Global Support Network' },
};

export const getHeadingForRoute = (pathname) => {
  return HEADER_HEADINGS[pathname] || { title: 'Prince Pipes & Fittings', subtitle: 'Engineered Flow Solutions' };
};
