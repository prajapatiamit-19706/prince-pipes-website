const fs = require('fs');

function printMetrics(name, filename) {
  try {
    const lh = JSON.parse(fs.readFileSync(filename, 'utf8'));
    console.log(`\n--- ${name} ---`);
    console.log('Performance Score:', lh.categories.performance.score * 100);
    console.log('FCP:', lh.audits['first-contentful-paint'].displayValue);
    console.log('LCP:', lh.audits['largest-contentful-paint'].displayValue);
    console.log('TBT:', lh.audits['total-blocking-time'].displayValue);
    console.log('CLS:', lh.audits['cumulative-layout-shift'].displayValue);
    
    const jsSize = lh.audits['network-requests'].details.items.filter(i => i.resourceType === 'Script').reduce((acc, i) => acc + i.transferSize, 0);
    console.log('Total JS (KB):', (jsSize / 1024).toFixed(2));
  } catch(e) {
    console.log(`\n--- ${name} --- (File not found)`);
  }
}

printMetrics('Baseline', 'baseline-lh-report.json');
printMetrics('Phase 1 (Code Split)', 'post-lh-report.json');
printMetrics('Phase 2A (LCP Fix)', 'phase2a-lh-report.json');
