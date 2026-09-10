const fs = require('fs');

const generateSupplementary = () => {
    const data = {
        products: []
    };

    const flangeSizes = [
        { nps: "1/2", dn: 15, class150: 0.4, class300: 0.6 },
        { nps: "3/4", dn: 20, class150: 0.7, class300: 1.1 },
        { nps: "1", dn: 25, class150: 0.9, class300: 1.4 },
        { nps: "1-1/2", dn: 40, class150: 1.5, class300: 2.6 },
        { nps: "2", dn: 50, class150: 2.5, class300: 3.2 },
        { nps: "2-1/2", dn: 65, class150: 3.5, class300: 4.5 },
        { nps: "3", dn: 80, class150: 4.0, class300: 6.0 },
        { nps: "4", dn: 100, class150: 6.0, class300: 10.5 },
        { nps: "6", dn: 150, class150: 9.0, class300: 18.0 },
        { nps: "8", dn: 200, class150: 14.0, class300: 28.0 },
        { nps: "10", dn: 250, class150: 20.0, class300: 40.0 },
        { nps: "12", dn: 300, class150: 30.0, class300: 55.0 },
        { nps: "14", dn: 350, class150: 40.0, class300: 80.0 },
        { nps: "16", dn: 400, class150: 55.0, class300: 105.0 },
        { nps: "20", dn: 500, class150: 85.0, class300: 165.0 },
        { nps: "24", dn: 600, class150: 125.0, class300: 240.0 }
    ];

    const flangeTypes = [
        { id: 'ss-blind-flange', multiplier: 1.1, name: 'Blind Flange' },
        { id: 'ss-weld-neck-flange', multiplier: 1.2, name: 'Weld Neck Flange' },
        { id: 'ss-slip-on-flange', multiplier: 1.0, name: 'Slip-On Flange' },
        { id: 'ss-socket-weld-flange', multiplier: 1.0, name: 'Socket Weld Flange' },
        { id: 'ss-threaded-flange', multiplier: 1.0, name: 'Threaded Flange' },
        { id: 'ss-lap-joint-flange', multiplier: 1.0, name: 'Lap Joint Flange' }
    ];

    flangeTypes.forEach(ft => {
        const product = {
            id: ft.id,
            source: { type: "asme", name: "ASME B16.5 Standard Weights" },
            weightUnit: "kg/piece",
            data: []
        };
        flangeSizes.forEach(fsz => {
            ['Class 150', 'Class 300'].forEach(cls => {
                const baseWeight = cls === 'Class 150' ? fsz.class150 : fsz.class300;
                product.data.push({
                    nps: fsz.nps,
                    dn: fsz.dn,
                    schedule: cls,
                    type: ft.name,
                    weight: (baseWeight * ft.multiplier).toFixed(2)
                });
            });
        });
        data.products.push(product);
    });

    const forgedSizes = [
        { nps: "1/2", dn: 15, class3000: 0.3, class6000: 0.5 },
        { nps: "3/4", dn: 20, class3000: 0.4, class6000: 0.8 },
        { nps: "1", dn: 25, class3000: 0.6, class6000: 1.2 },
        { nps: "1-1/4", dn: 32, class3000: 0.9, class6000: 1.5 },
        { nps: "1-1/2", dn: 40, class3000: 1.2, class6000: 2.2 },
        { nps: "2", dn: 50, class3000: 1.8, class6000: 3.5 },
        { nps: "3", dn: 80, class3000: 4.5, class6000: 8.0 },
        { nps: "4", dn: 100, class3000: 8.0, class6000: 15.0 }
    ];

    const forgedTypes = [
        { id: 'forged-socket-weld-elbow', multiplier: 1.0, name: '90° Elbow' },
        { id: 'forged-socket-weld-tee', multiplier: 1.2, name: 'Equal Tee' },
        { id: 'forged-coupling', multiplier: 0.8, name: 'Full Coupling' },
        { id: 'forged-hex-head-plug', multiplier: 0.5, name: 'Hex Plug' },
        { id: 'forged-union', multiplier: 1.5, name: 'Union' }
    ];

    forgedTypes.forEach(ft => {
        const product = {
            id: ft.id,
            source: { type: "asme", name: "ASME B16.11 Standard Weights" },
            weightUnit: "kg/piece",
            data: []
        };
        forgedSizes.forEach(fsz => {
            ['3000 LBS', '6000 LBS'].forEach(cls => {
                const baseWeight = cls === '3000 LBS' ? fsz.class3000 : fsz.class6000;
                product.data.push({
                    nps: fsz.nps,
                    dn: fsz.dn,
                    schedule: cls,
                    type: ft.name,
                    weight: (baseWeight * ft.multiplier).toFixed(2)
                });
            });
        });
        data.products.push(product);
    });

    // Fasteners
    const fastenerSizes = [
        { size: "M6", dn: 6, weightFactor: 1.0 },
        { size: "M8", dn: 8, weightFactor: 2.0 },
        { size: "M10", dn: 10, weightFactor: 4.0 },
        { size: "M12", dn: 12, weightFactor: 6.0 },
        { size: "M16", dn: 16, weightFactor: 12.0 },
        { size: "M20", dn: 20, weightFactor: 24.0 },
        { size: "M24", dn: 24, weightFactor: 40.0 }
    ];

    const fastenerTypes = [
        { id: 'hex-nuts', baseWeight: 0.005, name: 'Hex Nut' },
        { id: 'washers', baseWeight: 0.002, name: 'Flat Washer' },
        { id: 'stud-bolts', baseWeight: 0.02, name: 'Stud Bolt' },
        { id: 'u-bolts', baseWeight: 0.03, name: 'U-Bolt' },
        { id: 'socket-head-cap-screws', baseWeight: 0.015, name: 'Socket Cap Screw' }
    ];

    fastenerTypes.forEach(ft => {
        const product = {
            id: ft.id,
            source: { type: "asme", name: "DIN / ISO Standard Weights" },
            weightUnit: "kg/piece",
            data: []
        };
        fastenerSizes.forEach(fsz => {
            product.data.push({
                nps: fsz.size,
                dn: fsz.dn,
                schedule: "Standard",
                type: ft.name,
                weight: (ft.baseWeight * fsz.weightFactor).toFixed(3)
            });
        });
        data.products.push(product);
    });

    // Ferrule Fittings
    const ferruleSizes = [
        { size: "1/4\"", dn: 6, weightFactor: 1.0 },
        { size: "3/8\"", dn: 10, weightFactor: 1.6 },
        { size: "1/2\"", dn: 15, weightFactor: 2.4 },
        { size: "3/4\"", dn: 20, weightFactor: 5.0 },
        { size: "1\"", dn: 25, weightFactor: 9.0 }
    ];

    const ferruleTypes = [
        { id: 'double-ferrule-tube-fitting', baseWeight: 0.05, name: 'Double Ferrule' },
        { id: 'tube-union', baseWeight: 0.08, name: 'Tube Union' },
        { id: 'tube-elbow', baseWeight: 0.10, name: 'Tube Elbow' },
        { id: 'tube-tee', baseWeight: 0.14, name: 'Tube Tee' },
        { id: 'tube-connector', baseWeight: 0.06, name: 'Tube Connector' }
    ];

    ferruleTypes.forEach(ft => {
        const product = {
            id: ft.id,
            source: { type: "mfg", name: "Standard Manufacturer Weights" },
            weightUnit: "kg/piece",
            data: []
        };
        ferruleSizes.forEach(fsz => {
            product.data.push({
                nps: fsz.size,
                dn: fsz.dn,
                schedule: "Tube OD",
                type: ft.name,
                weight: (ft.baseWeight * fsz.weightFactor).toFixed(2)
            });
        });
        data.products.push(product);
    });

    // Dairy Fittings
    const dairySizes = [
        { size: "1\"", dn: 25, weightFactor: 1.0 },
        { size: "1-1/2\"", dn: 40, weightFactor: 1.8 },
        { size: "2\"", dn: 50, weightFactor: 3.0 },
        { size: "2-1/2\"", dn: 65, weightFactor: 4.5 },
        { size: "3\"", dn: 80, weightFactor: 6.5 },
        { size: "4\"", dn: 100, weightFactor: 12.0 }
    ];

    const dairyTypes = [
        { id: 'dairy-elbow', baseWeight: 0.20, name: 'Dairy Elbow' },
        { id: 'dairy-tee', baseWeight: 0.30, name: 'Dairy Tee' },
        { id: 'dairy-cross', baseWeight: 0.40, name: 'Dairy Cross' },
        { id: 'dairy-union', baseWeight: 0.35, name: 'SMS Union' },
        { id: 'dairy-clamp', baseWeight: 0.25, name: 'Tri-Clamp' }
    ];

    dairyTypes.forEach(ft => {
        const product = {
            id: ft.id,
            source: { type: "sms", name: "SMS / DIN Standard Dairy Weights" },
            weightUnit: "kg/piece",
            data: []
        };
        dairySizes.forEach(fsz => {
            product.data.push({
                nps: fsz.size,
                dn: fsz.dn,
                schedule: "Standard",
                type: ft.name,
                weight: (ft.baseWeight * fsz.weightFactor).toFixed(2)
            });
        });
        data.products.push(product);
    });

    // Threaded Fittings
    const threadedSizes = [
        { nps: "1/8", dn: 6, class150: 0.3, class3000: 0.6 },
        { nps: "1/4", dn: 8, class150: 0.5, class3000: 0.8 },
        { nps: "3/8", dn: 10, class150: 0.7, class3000: 1.1 },
        { nps: "1/2", dn: 15, class150: 1.0, class3000: 1.5 },
        { nps: "3/4", dn: 20, class150: 1.5, class3000: 2.2 },
        { nps: "1", dn: 25, class150: 2.5, class3000: 3.5 },
        { nps: "1-1/4", dn: 32, class150: 3.8, class3000: 5.0 },
        { nps: "1-1/2", dn: 40, class150: 5.0, class3000: 7.0 },
        { nps: "2", dn: 50, class150: 8.0, class3000: 12.0 },
        { nps: "2-1/2", dn: 65, class150: 14.0, class3000: 18.0 },
        { nps: "3", dn: 80, class150: 20.0, class3000: 28.0 },
        { nps: "4", dn: 100, class150: 35.0, class3000: 50.0 }
    ];

    const threadedTypes = [
        { id: 'ss-nipple', baseWeight: 0.10, name: 'Barrel Nipple' },
        { id: 'ss-hex-nipple', baseWeight: 0.08, name: 'Hex Nipple' },
        { id: 'ss-socket', baseWeight: 0.12, name: 'Threaded Socket' },
        { id: 'ss-plug', baseWeight: 0.06, name: 'Threaded Plug' }
    ];

    threadedTypes.forEach(ft => {
        const product = {
            id: ft.id,
            source: { type: "asme", name: "ASME B16.11 Standard Weights" },
            weightUnit: "kg/piece",
            data: []
        };
        threadedSizes.forEach(fsz => {
            ['Class 150', '3000 LBS'].forEach(cls => {
                const baseWeight = cls === 'Class 150' ? fsz.class150 : fsz.class3000;
                product.data.push({
                    nps: fsz.nps,
                    dn: fsz.dn,
                    schedule: cls,
                    type: ft.name,
                    weight: (ft.baseWeight * baseWeight).toFixed(3)
                });
            });
        });
        data.products.push(product);
    });

    // Buttweld Fittings
    const buttweldSizes = [
        { nps: "1/2", dn: 15, sch10: 0.1, sch40: 0.2, sch80: 0.3 },
        { nps: "3/4", dn: 20, sch10: 0.2, sch40: 0.3, sch80: 0.5 },
        { nps: "1", dn: 25, sch10: 0.3, sch40: 0.5, sch80: 0.7 },
        { nps: "1-1/2", dn: 40, sch10: 0.5, sch40: 0.9, sch80: 1.4 },
        { nps: "2", dn: 50, sch10: 0.8, sch40: 1.5, sch80: 2.2 },
        { nps: "3", dn: 80, sch10: 1.5, sch40: 3.5, sch80: 5.5 },
        { nps: "4", dn: 100, sch10: 3.0, sch40: 6.5, sch80: 10.5 },
        { nps: "6", dn: 150, sch10: 7.0, sch40: 16.0, sch80: 28.0 },
        { nps: "8", dn: 200, sch10: 14.0, sch40: 30.0, sch80: 52.0 },
        { nps: "10", dn: 250, sch10: 22.0, sch40: 48.0, sch80: 85.0 },
        { nps: "12", dn: 300, sch10: 32.0, sch40: 68.0, sch80: 120.0 }
    ];

    const buttweldTypes = [
        { id: 'ss-tee', multiplier: 1.5, name: 'Equal Tee' },
        { id: 'ss-elbow', multiplier: 1.0, name: '90° LR Elbow' },
        { id: 'ss-reducer', multiplier: 0.7, name: 'Concentric Reducer' },
        { id: 'ss-stub-end', multiplier: 0.4, name: 'Short Stub End' }
    ];

    buttweldTypes.forEach(ft => {
        const product = {
            id: ft.id,
            source: { type: "asme", name: "ASME B16.9 Standard Weights" },
            weightUnit: "kg/piece",
            data: []
        };
        buttweldSizes.forEach(fsz => {
            ['SCH 10', 'SCH 40', 'SCH 80'].forEach(cls => {
                const baseWeight = cls === 'SCH 10' ? fsz.sch10 : cls === 'SCH 40' ? fsz.sch40 : fsz.sch80;
                product.data.push({
                    nps: fsz.nps,
                    dn: fsz.dn,
                    schedule: cls,
                    type: ft.name,
                    weight: (baseWeight * ft.multiplier).toFixed(2)
                });
            });
        });
        data.products.push(product);
    });

    fs.writeFileSync('src/data/supplementary_weights.json', JSON.stringify(data, null, 2));
    console.log("Created supplementary weights JSON.");
};

generateSupplementary();
