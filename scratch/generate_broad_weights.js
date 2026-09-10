const fs = require('fs');
const path = require('path');

// Formulas for approximate theoretical weights
// kg/m = 0.025 * WT * (OD - WT)

function calculateElbowWeight(nps, dn, od, wt, type) {
    if (!od || !wt || od === '-' || wt === '-') return '-';
    // Center to end (A) usually defines the radius
    let lengthFactor = 1; 
    if (type.includes("90°") && type.includes("Long")) {
        lengthFactor = 1.5 * nps * 25.4 * (Math.PI / 2) / 1000;
    } else if (type.includes("45°") && type.includes("Long")) {
        lengthFactor = 1.5 * nps * 25.4 * (Math.PI / 4) / 1000;
    } else if (type.includes("90°") && type.includes("Short")) {
        lengthFactor = 1.0 * nps * 25.4 * (Math.PI / 2) / 1000;
    } else {
        lengthFactor = 1.5 * nps * 25.4 * (Math.PI / 2) / 1000; // fallback
    }
    const weight = 0.025 * wt * (od - wt) * lengthFactor;
    return weight.toFixed(2);
}

function calculateTeeWeight(nps, dn, od, wt, cToE) {
    if (!od || !wt || od === '-' || wt === '-' || cToE === '-') return '-';
    const lengthInMeters = (3 * cToE) / 1000;
    const weight = 0.025 * wt * (od - wt) * lengthInMeters;
    return weight.toFixed(2);
}

function calculateReducerWeight(nps, dn, od, wt, length) {
    if (!od || !wt || od === '-' || wt === '-' || length === '-') return '-';
    const lengthInMeters = length / 1000;
    const weight = 0.025 * wt * (od - wt) * lengthInMeters;
    return (weight * 1.2).toFixed(2); 
}

function calculateStubEndWeight(nps, dn, od, wt, length) {
    if (!od || !wt || od === '-' || wt === '-' || length === '-') return '-';
    const lengthInMeters = length / 1000;
    const weight = 0.025 * wt * (od - wt) * lengthInMeters;
    return (weight * 1.5).toFixed(2);
}

const generateWeights = () => {
    const productsData = JSON.parse(fs.readFileSync('src/data/products.json', 'utf8'));
    const dimensionsData = JSON.parse(fs.readFileSync('src/data/ss_dimension_chart.json', 'utf8'));

    const ssCategory = productsData.catalog.categories.find(c => c.id === 'stainless-steel-pipe-fittings');
    if (!ssCategory) throw new Error("Could not find SS category");

    const newChart = {
        page: {
            title: "Stainless Steel Weight Charts",
            description: "Reference weight information for all stainless steel pipe fittings.",
            seo: {
                title: "Stainless Steel Pipe Fittings Weight Chart | Prince Pipes",
                description: "Calculate weights for all stainless steel products."
            }
        },
        subCategories: []
    };

    const productMapping = {
        'ss-elbow': ['elbow'],
        'ss-tee': ['tee'],
        'ss-reducer': ['concentric-reducer', 'eccentric-reducer'],
        'ss-stub-end': ['long-stub-end', 'short-stub-end'],
        'ss-nipple': ['cnc-threaded-nipple'],
        'ss-hex-nipple': ['hex-nipple'],
        'ss-socket': ['socket'],
        'ss-plug': ['plug']
    };

    const supplementaryData = JSON.parse(fs.readFileSync('src/data/supplementary_weights.json', 'utf8'));

    ssCategory.subCategories.forEach(sub => {
        const subCatEntry = {
            id: sub.slug,
            name: sub.name,
            products: []
        };

        sub.products.forEach(p => {
            let productEntry = {
                id: p.id,
                name: p.name.replace('Stainless Steel ', '').trim(),
                weightUnit: "kg/piece",
                source: { type: "unavailable", name: "Data unavailable" },
                data: []
            };

            const mappedIds = productMapping[p.id] || [];
            const dimProducts = mappedIds.map(mid => dimensionsData.products.find(d => d.id === mid)).filter(Boolean);

            if (dimProducts.length > 0 && dimProducts.some(d => d.measurements)) {
                productEntry.source = { type: "asme", name: "Theoretical Calculation (ASME B16.9 / Standard Formula)" };
                
                dimProducts.forEach(dimProduct => {
                    if (!dimProduct.measurements) return;
                    
                    dimProduct.measurements.forEach(m => {
                        const od = parseFloat(m.od);
                        if (isNaN(od)) return;

                        const schedules = ['5S', '10S', '40S', '80S'];
                        schedules.forEach(sch => {
                            const wtKey = `wt${sch}`;
                            const wtStr = m[wtKey];
                            if (!wtStr || wtStr === '-') return;
                            const wt = parseFloat(wtStr);
                            if (isNaN(wt)) return;
                            
                            let weight = '-';
                            let type = m.type || (dimProduct.id.includes('concentric') ? 'Concentric' : 
                                                 dimProduct.id.includes('eccentric') ? 'Eccentric' : 
                                                 dimProduct.id.includes('long') ? 'Long Pattern' : 
                                                 dimProduct.id.includes('short') ? 'Short Pattern' : 'Standard');
                            
                            let npsNum = 1;
                            if (m.nps.includes('/')) {
                                 const parts = m.nps.split('/');
                                 if(parts.length===2) npsNum = parseFloat(parts[0])/parseFloat(parts[1]);
                            } else {
                                 npsNum = parseFloat(m.nps) || 1;
                            }

                            if (dimProduct.id === 'elbow') {
                                weight = calculateElbowWeight(npsNum, m.dn, od, wt, type);
                            } else if (dimProduct.id === 'tee') {
                                const cToE = parseFloat(m.centerToCenter || m.c);
                                weight = calculateTeeWeight(npsNum, m.dn, od, wt, cToE);
                            } else if (dimProduct.id.includes('reducer')) {
                                const length = parseFloat(m.length || m.endToEnd);
                                weight = calculateReducerWeight(npsNum, m.dn, od, wt, length);
                            } else if (dimProduct.id.includes('stub-end')) {
                                const length = parseFloat(m.length || m.f);
                                weight = calculateStubEndWeight(npsNum, m.dn, od, wt, length);
                            } else {
                                weight = (0.025 * wt * (od - wt) * 0.1).toFixed(2);
                            }

                            productEntry.data.push({
                                nps: m.nps,
                                dn: m.dn,
                                schedule: `SCH${sch}`,
                                type: type,
                                weight: weight
                            });
                        });
                    });
                });
            } else {
                // Fallback to supplementary data
                const suppProduct = supplementaryData.products.find(sp => sp.id === p.id);
                if (suppProduct) {
                    productEntry.source = suppProduct.source;
                    productEntry.weightUnit = suppProduct.weightUnit;
                    productEntry.data = suppProduct.data;
                } else {
                    productEntry.weightUnit = "-";
                }
            }

            subCatEntry.products.push(productEntry);
        });

        newChart.subCategories.push(subCatEntry);
    });

    fs.writeFileSync('src/data/stainless_steel_weight_chart.json', JSON.stringify(newChart, null, 2));
    console.log("Successfully generated broad weight charts!");
};

generateWeights();
