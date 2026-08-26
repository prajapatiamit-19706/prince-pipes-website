'use client';

import React, { useState, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ProductBreadcrumb } from '@/components/product/ProductBreadcrumb';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WeightChartsClient({ initialData }) {
  const containerRef = useRef(null);
  const products = useMemo(() => initialData?.products || [], [initialData]);

  // States
  const [activeProduct, setActiveProduct] = useState(products[0]?.product || '');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSchedule, setSelectedSchedule] = useState('All');
  const [searchSize, setSearchSize] = useState('');

  // GSAP Animations
  useGSAP(() => {
    // Only animate if prefers-reduced-motion is false
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      const tl = gsap.timeline();

      tl.from('.gsap-header', {
        y: 15,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
      })
        .from('.gsap-filters', {
          y: 10,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
          clearProps: 'all'
        }, "-=0.2")
        .from('.gsap-table', {
          y: 10,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
          clearProps: 'all'
        }, "-=0.2");

      gsap.from('.gsap-scroll-reveal', {
        scrollTrigger: {
          trigger: '.gsap-scroll-reveal',
          start: 'top 90%',
          once: true
        },
        y: 12,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  }, { scope: containerRef });

  // Find active product data
  const activeProductData = useMemo(() =>
    products.find(p => p.product === activeProduct),
    [activeProduct, products]);

  // Extract unique filter options for the active product
  const filterOptions = useMemo(() => {
    if (!activeProductData || !activeProductData.data) return { types: [], schedules: [] };

    const types = new Set();
    const schedules = new Set();

    activeProductData.data.forEach(item => {
      if (item.type && item.type !== '-') types.add(item.type);
      if (item.schedule && item.schedule !== '-') schedules.add(item.schedule);
    });

    return {
      types: Array.from(types).sort(),
      schedules: Array.from(schedules).sort()
    };
  }, [activeProductData]);

  // Filter the table data
  const filteredData = useMemo(() => {
    if (!activeProductData || !activeProductData.data) return [];

    return activeProductData.data.filter(item => {
      if (selectedType !== 'All' && item.type !== selectedType) return false;
      if (selectedSchedule !== 'All' && item.schedule !== selectedSchedule) return false;
      if (searchSize) {
        const searchTerm = searchSize.toLowerCase();
        const npsMatch = item.nps && item.nps.toLowerCase().includes(searchTerm);
        const dnMatch = item.dn && String(item.dn).toLowerCase().includes(searchTerm);
        if (!npsMatch && !dnMatch) return false;
      }
      return true;
    });
  }, [activeProductData, selectedType, selectedSchedule, searchSize]);

  const handleProductChange = (productName) => {
    setActiveProduct(productName);
    setSelectedType('All');
    setSelectedSchedule('All');
    setSearchSize('');
  };

  const clearFilters = () => {
    setSelectedType('All');
    setSelectedSchedule('All');
    setSearchSize('');
  };

  const hasActiveFilters = selectedType !== 'All' || selectedSchedule !== 'All' || searchSize !== '';

  if (!products.length) return <div>No weight data available.</div>;

  return (
    <div ref={containerRef}>

      {/* Breadcrumb */}
      <div className="gsap-header mb-6 -mt-2">
        <ProductBreadcrumb breadcrumbs={[
          { name: 'Technical Resources', path: '/technical-resources' },
          { name: 'Weight Charts', path: '/technical-resources/weight-charts' }
        ]} />
      </div>

      {/* Header Section */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="gsap-header text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Stainless Steel Weight Charts
        </h1>
        <p className="gsap-header text-lg text-slate-600 max-w-3xl transition-opacity duration-200">
          Reference weight information for stainless steel pipe fittings across different sizes, types, and schedules.
          Select a product below to view its approximate theoretical weight.
        </p>
      </div>

      {/* Main Interactive Container */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300">

        {/* Product Selector (Tabs) */}
        <div className="bg-slate-50 border-b border-slate-200 overflow-x-auto gsap-filters">
          <div className="flex w-max min-w-full px-2 py-2">
            {products.map((p) => (
              <button
                key={p.product}
                onClick={() => handleProductChange(p.product)}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${activeProduct === p.product
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
              >
                {p.product}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6 transition-opacity duration-200">

          {/* Subheader & Source Info */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gsap-filters">
            <div>
              <h2 className="text-xl font-bold text-slate-900 transition-colors duration-200">{activeProduct} Weight Chart</h2>
              {activeProductData?.weightUnit !== "-" && (
                <p className="text-sm text-slate-500 mt-1">
                  Unit: <span className="font-semibold text-slate-700">{activeProductData?.weightUnit}</span>
                </p>
              )}
            </div>

            {activeProductData?.source && activeProductData.source.type !== "unavailable" && (
              <div className="mt-2 md:mt-0 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-100 flex items-center w-max transition-colors duration-200">
                <svg className="w-4 h-4 mr-1.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {activeProductData.source.name}
              </div>
            )}
          </div>

          {/* Filters Section */}
          {activeProductData?.source?.type !== "unavailable" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200 transition-all duration-200 gsap-filters">
              {/* Search Size */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 transition-colors duration-200">Search Size</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-slate-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. 1/2 or 15"
                    className="block w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                    value={searchSize}
                    onChange={(e) => setSearchSize(e.target.value)}
                  />
                </div>
              </div>

              {/* Type Filter */}
              {filterOptions.types.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white border transition-all duration-200"
                  >
                    <option value="All">All Types</option>
                    {filterOptions.types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Schedule Filter */}
              {filterOptions.schedules.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Schedule</label>
                  <select
                    value={selectedSchedule}
                    onChange={(e) => setSelectedSchedule(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white border transition-all duration-200"
                  >
                    <option value="All">All Schedules</option>
                    {filterOptions.schedules.map(sch => (
                      <option key={sch} value={sch}>{sch}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Clear Filters */}
              <div className="flex items-end">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="w-full py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-100 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Data Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-lg gsap-table transition-opacity duration-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-100">
                <tr>
                  <th scope="col" className="sticky top-0 px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                    NPS (Inch)
                  </th>
                  <th scope="col" className="sticky top-0 px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                    DN (mm)
                  </th>
                  <th scope="col" className="sticky top-0 px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                    Schedule
                  </th>
                  <th scope="col" className="sticky top-0 px-6 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider whitespace-nowrap">
                    Type
                  </th>
                  <th scope="col" className="sticky top-0 px-6 py-3 text-right text-xs font-bold text-indigo-700 uppercase tracking-wider whitespace-nowrap">
                    Approx. Weight
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200 transition-opacity duration-200">
                {filteredData.length > 0 ? (
                  filteredData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100 transition-colors duration-150`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {row.nps}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {row.dn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {row.schedule}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {row.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-700 text-right">
                        {row.weight}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-sm text-slate-500 bg-slate-50 transition-colors duration-200">
                      {activeProductData?.source?.type === "unavailable"
                        ? "Weight data is currently unavailable for this product."
                        : "No results found matching your filters."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-xs text-slate-400 text-right transition-opacity duration-200">
            Showing {filteredData.length > 0 ? (
              <span className="font-semibold text-slate-500">{filteredData.length}</span>
            ) : "0"} results
          </div>

        </div>
      </div>

      {/* Technical Notes Footer */}
      <div className="gsap-scroll-reveal mt-12 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Technical Notes
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-600 text-sm">
          <li>Weight values are approximate theoretical reference values based on ASME B16.9 standard dimensions.</li>
          <li>Actual product weight may vary depending on manufacturing tolerance, configuration, and specific material density.</li>
          <li>Weight may vary according to material grade, schedule, and dimensions.</li>
          <li>For threaded and forged fittings, standard formulas are unreliable; always refer to manufacturer data sheets for critical engineering calculations.</li>
          <li>Always verify critical dimensions and weights against the applicable standard or approved drawing before fabrication.</li>
        </ul>
      </div>

    </div>
  );
}
