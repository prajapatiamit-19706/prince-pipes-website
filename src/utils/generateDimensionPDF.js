import React from 'react';
import { createRoot } from 'react-dom/client';
import DimensionChartPDF from '../components/technical-resources/DimensionChartPDF';

export const generateDimensionPDF = async (product, unit, contactData, companyData) => {
  // Dynamically import heavy libraries to protect site performance
  const htmlToImage = await import('html-to-image');
  const { jsPDF } = await import('jspdf');

  // Create a hidden container at the end of the body
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '-10000px';
  container.style.left = '-10000px';
  // Ensure background is solid for accurate canvas rendering
  container.style.backgroundColor = '#ffffff'; 
  document.body.appendChild(container);

  // Render the React component into the container
  const root = createRoot(container);
  
  return new Promise((resolve, reject) => {
    // We use a small timeout to allow React to flush the render to the actual DOM
    root.render(
      <DimensionChartPDF 
        product={product} 
        unit={unit} 
        contactData={contactData} 
        companyData={companyData} 
      />
    );

    setTimeout(async () => {
      try {
        const element = document.getElementById('dimension-chart-pdf-container');
        if (!element) throw new Error("PDF container not found");

        const imgData = await htmlToImage.toJpeg(element, {
          quality: 0.95,
          backgroundColor: '#ffffff',
          pixelRatio: 2 // High resolution
        });
        
        // Calculate PDF dimensions (A4 size)
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // Create an image element to get the dimensions of the generated jpeg
        const img = new Image();
        img.src = imgData;
        await new Promise((res) => { img.onload = res; });

        const imgWidth = img.width;
        const imgHeight = img.height;
        const ratio = pdfWidth / imgWidth;
        const totalPdfHeight = imgHeight * ratio;

        let heightLeft = totalPdfHeight;
        let position = 0;

        // Add first page
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, totalPdfHeight);
        heightLeft -= pdfHeight;

        // Add subsequent pages if the content is longer than one A4 page
        while (heightLeft >= 0) {
          position = heightLeft - totalPdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, totalPdfHeight);
          heightLeft -= pdfHeight;
        }

        const fileName = `${companyData?.name?.replace(/[^a-z0-9]/gi, '_') || 'Prince'}_${product.name.replace(/\s+/g, '_')}_Dimensions.pdf`;
        pdf.save(fileName);
        
        resolve();
      } catch (error) {
        console.error("Error generating PDF:", error);
        reject(error);
      } finally {
        // Cleanup DOM and React Root
        root.unmount();
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      }
    }, 500); // 500ms delay to ensure DOM is fully painted
  });
};
