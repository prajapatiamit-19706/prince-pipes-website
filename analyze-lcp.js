const fs = require('fs');
const lh = JSON.parse(fs.readFileSync('post-lh-report.json', 'utf8'));

console.log('=== LCP ELEMENT ===');
const lcpElementAudit = lh.audits['largest-contentful-paint-element'];
if (lcpElementAudit && lcpElementAudit.details && lcpElementAudit.details.items) {
  const lcpItem = lcpElementAudit.details.items[0];
  console.log('Node:', lcpItem.node ? lcpItem.node.snippet : 'Unknown');
  console.log('Selector:', lcpItem.node ? lcpItem.node.selector : 'Unknown');
}

console.log('\n=== LCP PHASES ===');
const lcpAudit = lh.audits['largest-contentful-paint'];
console.log('LCP Time:', lcpAudit.displayValue);

// Find the LCP breakdown if available, sometimes it's in diagnostics or metrics
const diagnostics = lh.audits['diagnostics'];
const metrics = lh.audits['metrics'];
// The network requests
const networkRequests = lh.audits['network-requests'].details.items;

// Try to find the LCP image/video in network requests
if (lcpElementAudit && lcpElementAudit.details && lcpElementAudit.details.items) {
  const lcpItem = lcpElementAudit.details.items[0];
  // usually it has a URL if it's an image
  console.log('LCP Resource URL:', lcpItem.url || 'No URL (likely text or inline)');
  if (lcpItem.url) {
    const lcpReq = networkRequests.find(req => req.url === lcpItem.url);
    if (lcpReq) {
      console.log('Resource Size:', (lcpReq.transferSize / 1024).toFixed(2), 'KB');
      console.log('Mime Type:', lcpReq.mimeType);
      console.log('Resource Load Time:', lcpReq.endTime - lcpReq.startTime, 'ms');
    }
  }
}

console.log('\n=== NETWORK REQUESTS (Top 5 largest) ===');
const sortedRequests = [...networkRequests].sort((a, b) => b.transferSize - a.transferSize).slice(0, 5);
sortedRequests.forEach(req => {
  console.log(`- ${(req.transferSize / 1024).toFixed(2)} KB | ${req.mimeType} | ${req.url.substring(req.url.lastIndexOf('/') + 1)}`);
});

console.log('\n=== LONG TASKS & TBT ===');
const longTasksAudit = lh.audits['long-tasks'];
if (longTasksAudit && longTasksAudit.details && longTasksAudit.details.items) {
  const tasks = longTasksAudit.details.items;
  console.log(`Total Long Tasks: ${tasks.length}`);
  tasks.slice(0, 5).forEach(task => {
    console.log(`- Duration: ${task.duration.toFixed(0)}ms, URL: ${task.url}`);
  });
}

const bootup = lh.audits['bootup-time'];
if (bootup && bootup.details && bootup.details.items) {
  console.log('\n=== JS BOOTUP TIME (Top 5) ===');
  bootup.details.items.slice(0, 5).forEach(item => {
    console.log(`- Script: ${item.url.substring(item.url.lastIndexOf('/') + 1)}`);
    console.log(`  Total: ${item.total.toFixed(0)}ms | Eval: ${item.scripting.toFixed(0)}ms`);
  });
}
