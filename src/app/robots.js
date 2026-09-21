export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/_next/',
        '/_next/static/',
        '/_next/image',
        '/images/'
      ],
    },
    sitemap: 'https://ppfworks.in/sitemap.xml',
  }
}
