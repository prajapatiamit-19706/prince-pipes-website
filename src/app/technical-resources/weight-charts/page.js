import React from 'react';
import WeightChartsClient from '@/components/technical-resources/WeightChartsClient';
import weightData from '@/data/stainless_steel_weight_chart.json';

export const metadata = {
  title: 'Stainless Steel Pipe Fittings Weight Chart | Weight Table',
  description: 'Explore stainless steel pipe fittings weight charts with reference weights for elbows, tees, reducers, nipples, plugs, sockets and stub ends by size and schedule.',
};

export default function WeightChartsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Client-side Interactive Chart Component */}
        <WeightChartsClient initialData={weightData} />
      </div>
    </main>
  );
}
