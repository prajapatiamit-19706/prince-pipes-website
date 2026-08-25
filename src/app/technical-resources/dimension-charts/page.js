import { Suspense } from 'react';
import DimensionChartClient from '@/components/technical-resources/DimensionChartClient';

export const metadata = {
  title: 'Stainless Steel Pipe Fittings Dimension Chart | Prince Pipes',
  description: 'View stainless steel pipe fittings dimensions, sizes, outside diameters, wall thicknesses and center-to-end measurements for applicable industry standards.',
  keywords: [
    'stainless steel pipe fittings dimensions',
    'stainless steel fittings dimension chart',
    'stainless steel tee dimensions',
    'stainless steel elbow dimensions',
    'stainless steel reducer dimensions',
    'stainless steel stub end dimensions',
    'stainless steel nipple dimensions',
    'ASME B16.9 dimensions',
    'stainless steel pipe fitting sizes'
  ],
  alternates: {
    canonical: '/technical-resources/dimension-charts'
  },
  openGraph: {
    title: 'Stainless Steel Pipe Fittings Dimension Chart',
    description: 'Reference dimensions for stainless steel pipe fittings manufactured to applicable industry standards.',
    type: 'website',
  }
};

export default function DimensionChartsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="p-8 text-center">Loading dimension charts...</div>}>
        <DimensionChartClient />
      </Suspense>
    </div>
  );
}
