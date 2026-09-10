'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ProductBreadcrumb } from '@/components/product/ProductBreadcrumb';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WeightChartsClient({ initialData }) {
  const containerRef = useRef(null);
  const subCategories = useMemo(() => initialData?.subCategories || [], [initialData]);

  // States
  const [activeSubCatId, setActiveSubCatId] = useState(subCategories[0]?.id || '');
  const [activeProductId, setActiveProductId] = useState('');
  
  // Filters
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSchedule, setSelectedSchedule] = useState('All');
  const [searchSize, setSearchSize] = useState('');

  // Find active subcategory data
  const activeSubCat = useMemo(() =>
    subCategories.find(s => s.id === activeSubCatId) || subCategories[0],
    [activeSubCatId, subCategories]);

  // Initialize active product when subcategory changes
  // Find active product data
  const activeProductData = useMemo(() => {
    if (!activeSubCat || !activeSubCat.products) return null;
    return activeSubCat.products.find(p => p.id === activeProductId) || activeSubCat.products[0];
  }, [activeProductId, activeSubCat]);

  // GSAP Animations
  useGSAP(() => {
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

  const handleSubCatChange = (subCatId) => {
    setActiveSubCatId(subCatId);
    const newSubCat = subCategories.find(s => s.id === subCatId);
    if (newSubCat && newSubCat.products && newSubCat.products.length > 0) {
      setActiveProductId(newSubCat.products[0].id);
    }
    setSelectedType('All');
    setSelectedSchedule('All');
    setSearchSize('');
  };

  const handleProductChange = (e) => {
    setActiveProductId(e.target.value);
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

  if (!subCategories.length) return <div>No weight data available.</div>;

  return (
    <div ref={containerRef}>
      {/* Breadcrumb */}
      <div className="gsap-header mb-6 -mt-2">
        <ProductBreadcrumb breadcrumbs={[
          { name: 'Technical Resources', path: null },
          { name: 'Weight Charts', path: '/technical-resources/weight-charts' }
        ]} />
      </div>

      {/* Header Section */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="gsap-header text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          Stainless Steel Weight Charts
        </h1>
        <p className="gsap-header text-lg text-slate-600 max-w-3xl transition-opacity duration-200">
          Reference weight information for a broad range of stainless steel pipe fittings. Select a category and product below to view its approximate theoretical weight.
        </p>
      </div>

      {/* Main Interactive Container */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-300">
        
        {/* Category Selector (Tabs) */}
        <div className="bg-slate-50 border-b border-slate-200 overflow-x-auto gsap-filters scrollbar-hide">
          <div className="flex w-max min-w-full px-2 py-2">
            {subCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => handleSubCatChange(sub.id)}
                className={`px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-200 mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${activeSubCatId === sub.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-6 transition-opacity duration-200">
          
          {/* Subheader & Source Info */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gsap-filters">
            <div>
              <h2 className="text-xl font-bold text-slate-900 transition-colors duration-200">
                {activeProductData ? activeProductData.name : activeSubCat?.name} Weight Chart
              </h2>
              {activeProductData?.weightUnit && activeProductData.weightUnit !== "-" && (
                <p className="text-sm text-slate-500 mt-1">
                  Unit: <span className="font-semibold text-slate-700">{activeProductData.weightUnit}</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 p-4 bg-slate-50 rounded-lg border border-slate-200 transition-all duration-200 gsap-filters">
            
            {/* Product Filter (Dropdown) */}
            {activeSubCat && activeSubCat.products && (
              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Product</label>
                <select
                  value={activeProductId}
                  onChange={handleProductChange}
                  className="block w-full pl-3 pr-10 py-2 text-sm border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white border transition-all duration-200"
                >
                  {activeSubCat.products.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Type/Variant Filter */}
            {filterOptions.types.length > 0 && (
              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Variant</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-sm border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white border transition-all duration-200"
                >
                  <option value="All">All Variants</option>
                  {filterOptions.types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Schedule Filter */}
            {filterOptions.schedules.length > 0 && (
              <div className="lg:col-span-1">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Schedule</label>
                <select
                  value={selectedSchedule}
                  onChange={(e) => setSelectedSchedule(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-sm border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md bg-white border transition-all duration-200"
                >
                  <option value="All">All Schedules</option>
                  {filterOptions.schedules.map(sch => (
                    <option key={sch} value={sch}>{sch}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Search Size */}
            <div className={`lg:col-span-${(filterOptions.types.length > 0 || filterOptions.schedules.length > 0) ? '1' : '2'}`}>
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
                  className="block w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  value={searchSize}
                  onChange={(e) => setSearchSize(e.target.value)}
                  disabled={activeProductData?.source?.type === "unavailable"}
                />
              </div>
            </div>

            {/* Clear Filters */}
            <div className="lg:col-span-1 flex items-end">
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
                    Variant
                  </th>
                  <th scope="col" className="sticky top-0 px-6 py-3 text-right text-xs font-bold text-indigo-700 uppercase tracking-wider whitespace-nowrap">
                    Approx. Weight
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200 transition-opacity duration-200">
                {activeProductData?.source?.type === "unavailable" ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-500">
                        <svg className="w-12 h-12 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        <p className="text-lg font-medium text-slate-700">Data Unavailable</p>
                        <p className="text-sm mt-1 max-w-md text-center">Weight data for this specific product family is currently being compiled or is unavailable. Please check back later or contact support.</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredData.length > 0 ? (
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
                      No results found matching your filters.
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
