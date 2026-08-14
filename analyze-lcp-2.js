const fs = require('fs');
const lh = JSON.parse(fs.readFileSync('post-lh-report.json', 'utf8'));
const lcpAudit = lh.audits['largest-contentful-paint-element'];
console.log(JSON.stringify(lcpAudit, null, 2));
