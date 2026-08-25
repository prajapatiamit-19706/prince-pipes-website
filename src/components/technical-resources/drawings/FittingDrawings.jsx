import React from 'react';

// Common technical drawing components
const Defs = () => (
  <defs>
    {/* Arrowhead marker for dimension lines */}
    <marker id="arrow-start" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M9,0 L0,3 L9,6 z" fill="#64748b" />
    </marker>
    <marker id="arrow-end" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L9,3 L0,6 z" fill="#64748b" />
    </marker>
  </defs>
);

const commonProps = {
  viewBox: "0 0 300 300",
  xmlns: "http://www.w3.org/2000/svg",
  className: "w-full h-full max-h-[350px]"
};

// Styling Constants
const STYLES = {
  outline: { stroke: "#1e293b", strokeWidth: "2", fill: "none", strokeLinejoin: "round" },
  inner: { stroke: "#334155", strokeWidth: "1", fill: "none" },
  hidden: { stroke: "#64748b", strokeWidth: "1", strokeDasharray: "4,4", fill: "none" },
  center: { stroke: "#94a3b8", strokeWidth: "1", strokeDasharray: "15,5,4,5", fill: "none" },
  dimLine: { stroke: "#64748b", strokeWidth: "1", fill: "none", markerStart: "url(#arrow-start)", markerEnd: "url(#arrow-end)" },
  extLine: { stroke: "#94a3b8", strokeWidth: "1", fill: "none" },
  dimText: { fill: "#334155", fontSize: "14px", fontFamily: "monospace", fontWeight: "600", textAnchor: "middle", dominantBaseline: "middle" },
  dimTextBg: { fill: "#ffffff" } // To clear line behind text
};

const DimText = ({ x, y, children }) => (
  <>
    <rect x={x - 12} y={y - 8} width="24" height="16" {...STYLES.dimTextBg} />
    <text x={x} y={y + 1} {...STYLES.dimText}>{children}</text>
  </>
);

// 1. Tee (Butt-weld)
export const TeeDrawing = () => (
  <svg {...commonProps}>
    <Defs />
    {/* Centerlines */}
    <line x1="40" y1="120" x2="260" y2="120" {...STYLES.center} />
    <line x1="150" y1="50" x2="150" y2="240" {...STYLES.center} />

    {/* Outer Shell */}
    <path d="M 70 70 L 230 70 L 230 170 L 190 170 C 180 170, 180 180, 180 190 L 180 230 L 120 230 L 120 190 C 120 180, 120 170, 110 170 L 70 170 Z" {...STYLES.outline} />

    {/* Inner Wall (Hidden) to represent WT */}
    <path d="M 70 80 L 230 80 L 230 160 L 190 160 C 175 160, 170 165, 170 190 L 170 230" {...STYLES.hidden} />
    <path d="M 70 160 L 110 160 C 125 160, 130 165, 130 190 L 130 230" {...STYLES.hidden} />

    {/* Dimensions */}
    {/* C (Horizontal) */}
    <line x1="150" y1="40" x2="150" y2="60" {...STYLES.extLine} />
    <line x1="230" y1="40" x2="230" y2="60" {...STYLES.extLine} />
    <line x1="150" y1="50" x2="230" y2="50" {...STYLES.dimLine} />
    <DimText x="190" y="50">C</DimText>

    {/* C (Vertical Branch) */}
    <line x1="230" y1="120" x2="260" y2="120" {...STYLES.extLine} />
    <line x1="180" y1="230" x2="260" y2="230" {...STYLES.extLine} />
    <line x1="250" y1="120" x2="250" y2="230" {...STYLES.dimLine} />
    <DimText x="250" y="175">M</DimText>

    {/* OD Run */}
    <line x1="70" y1="70" x2="40" y2="70" {...STYLES.extLine} />
    <line x1="70" y1="170" x2="40" y2="170" {...STYLES.extLine} />
    <line x1="50" y1="70" x2="50" y2="170" {...STYLES.dimLine} />
    <DimText x="50" y="120">OD</DimText>
  </svg>
);

// 2. Elbow 90 Long Radius (Butt-weld)
export const ElbowDrawing = () => (
  <svg {...commonProps}>
    <Defs />
    {/* Centerlines */}
    <line x1="40" y1="220" x2="250" y2="220" {...STYLES.center} />
    <line x1="220" y1="40" x2="220" y2="250" {...STYLES.center} />
    <path d="M 100 220 A 120 120 0 0 1 220 100" {...STYLES.center} />

    {/* Outer Shell */}
    <path d="M 50 220 A 170 170 0 0 1 220 50 L 220 150 A 70 70 0 0 0 150 220 Z" {...STYLES.outline} />

    {/* Inner Wall (Hidden WT) */}
    <path d="M 60 220 A 160 160 0 0 1 220 60" {...STYLES.hidden} />
    <path d="M 140 220 A 80 80 0 0 1 220 140" {...STYLES.hidden} />

    {/* Dimensions */}
    {/* A (Center-to-End) horizontal */}
    <line x1="100" y1="220" x2="100" y2="260" {...STYLES.extLine} />
    <line x1="220" y1="220" x2="220" y2="260" {...STYLES.extLine} />
    <line x1="100" y1="250" x2="220" y2="250" {...STYLES.dimLine} />
    <DimText x="160" y="250">A</DimText>

    {/* OD */}
    <line x1="220" y1="50" x2="260" y2="50" {...STYLES.extLine} />
    <line x1="220" y1="150" x2="260" y2="150" {...STYLES.extLine} />
    <line x1="250" y1="50" x2="250" y2="150" {...STYLES.dimLine} />
    <DimText x="250" y="100">OD</DimText>
  </svg>
);

// 3. Concentric Reducer (Butt-weld)
export const ConcentricReducerDrawing = () => (
  <svg {...commonProps}>
    <Defs />
    {/* Centerline */}
    <line x1="40" y1="150" x2="260" y2="150" {...STYLES.center} />

    {/* Outer Shell */}
    <path d="M 70 70 L 230 110 L 230 190 L 70 230 Z" {...STYLES.outline} />

    {/* Inner Shell (Hidden WT) */}
    <path d="M 70 80 L 230 118" {...STYLES.hidden} />
    <path d="M 70 220 L 230 182" {...STYLES.hidden} />

    {/* Dimensions */}
    {/* L (End-to-End) */}
    <line x1="70" y1="230" x2="70" y2="280" {...STYLES.extLine} />
    <line x1="230" y1="230" x2="230" y2="280" {...STYLES.extLine} />
    <line x1="70" y1="260" x2="230" y2="260" {...STYLES.dimLine} />
    <DimText x="150" y="260">L</DimText>

    {/* OD1 (Large) */}
    <line x1="70" y1="70" x2="40" y2="70" {...STYLES.extLine} />
    <line x1="70" y1="230" x2="40" y2="230" {...STYLES.extLine} />
    <line x1="50" y1="70" x2="50" y2="230" {...STYLES.dimLine} />
    <DimText x="50" y="150">D1</DimText>

    {/* OD2 (Small) */}
    <line x1="230" y1="110" x2="260" y2="110" {...STYLES.extLine} />
    <line x1="230" y1="190" x2="260" y2="190" {...STYLES.extLine} />
    <line x1="250" y1="110" x2="250" y2="190" {...STYLES.dimLine} />
    <DimText x="250" y="150">D2</DimText>
  </svg>
);

// 4. Eccentric Reducer (Butt-weld)
export const EccentricReducerDrawing = () => (
  <svg {...commonProps}>
    <Defs />
    {/* Centerlines */}
    <line x1="40" y1="150" x2="160" y2="150" {...STYLES.center} />
    <line x1="140" y1="180" x2="260" y2="180" {...STYLES.center} />

    {/* Outer Shell (Flat bottom) */}
    <path d="M 70 70 L 230 130 L 230 230 L 70 230 Z" {...STYLES.outline} />

    {/* Inner Shell (Hidden WT) */}
    <path d="M 70 80 L 230 140" {...STYLES.hidden} />
    <path d="M 70 220 L 230 220" {...STYLES.hidden} />

    {/* Dimensions */}
    <line x1="70" y1="230" x2="70" y2="280" {...STYLES.extLine} />
    <line x1="230" y1="230" x2="230" y2="280" {...STYLES.extLine} />
    <line x1="70" y1="260" x2="230" y2="260" {...STYLES.dimLine} />
    <DimText x="150" y="260">L</DimText>

    <line x1="70" y1="70" x2="40" y2="70" {...STYLES.extLine} />
    <line x1="70" y1="230" x2="40" y2="230" {...STYLES.extLine} />
    <line x1="50" y1="70" x2="50" y2="230" {...STYLES.dimLine} />
    <DimText x="50" y="150">D1</DimText>

    <line x1="230" y1="130" x2="260" y2="130" {...STYLES.extLine} />
    <line x1="230" y1="230" x2="260" y2="230" {...STYLES.extLine} />
    <line x1="250" y1="130" x2="250" y2="230" {...STYLES.dimLine} />
    <DimText x="250" y="180">D2</DimText>
  </svg>
);

// 5. Long Stub End (Lap Joint)
export const LongStubEndDrawing = () => (
  <svg {...commonProps}>
    <Defs />
    {/* Centerline */}
    <line x1="40" y1="150" x2="260" y2="150" {...STYLES.center} />

    {/* Outer Shell */}
    <path d="M 60 60 L 80 60 L 80 90 A 10 10 0 0 0 90 100 L 220 100 L 220 200 L 90 200 A 10 10 0 0 0 80 210 L 80 240 L 60 240 Z" {...STYLES.outline} />

    {/* Inner Wall (Hidden WT) */}
    <line x1="60" y1="110" x2="220" y2="110" {...STYLES.hidden} />
    <line x1="60" y1="190" x2="220" y2="190" {...STYLES.hidden} />

    {/* Dimensions */}
    {/* L */}
    <line x1="60" y1="240" x2="60" y2="280" {...STYLES.extLine} />
    <line x1="220" y1="200" x2="220" y2="280" {...STYLES.extLine} />
    <line x1="60" y1="270" x2="220" y2="270" {...STYLES.dimLine} />
    <DimText x="140" y="270">L</DimText>

    {/* F (Lap Dia) */}
    <line x1="60" y1="60" x2="30" y2="60" {...STYLES.extLine} />
    <line x1="60" y1="240" x2="30" y2="240" {...STYLES.extLine} />
    <line x1="40" y1="60" x2="40" y2="240" {...STYLES.dimLine} />
    <DimText x="40" y="150">F</DimText>

    {/* OD */}
    <line x1="220" y1="100" x2="260" y2="100" {...STYLES.extLine} />
    <line x1="220" y1="200" x2="260" y2="200" {...STYLES.extLine} />
    <line x1="250" y1="100" x2="250" y2="200" {...STYLES.dimLine} />
    <DimText x="250" y="150">OD</DimText>

    {/* T (Thickness) */}
    <line x1="60" y1="50" x2="60" y2="30" {...STYLES.extLine} />
    <line x1="80" y1="50" x2="80" y2="30" {...STYLES.extLine} />
    <line x1="60" y1="40" x2="80" y2="40" {...STYLES.dimLine} />
    <DimText x="70" y="40">T</DimText>

    {/* R (Radius) */}
    <path d="M 110 80 Q 90 90 85 95" stroke="#64748b" strokeWidth="1" fill="none" markerEnd="url(#arrow-start)" />
    <text x="120" y="75" {...STYLES.dimText}>R</text>
  </svg>
);

// 5a. Short Stub End (Lap Joint)
export const ShortStubEndDrawing = () => (
  <svg {...commonProps}>
    <Defs />
    {/* Centerline */}
    <line x1="40" y1="150" x2="260" y2="150" {...STYLES.center} />

    {/* Outer Shell */}
    <path d="M 60 60 L 80 60 L 80 90 A 10 10 0 0 0 90 100 L 150 100 L 150 200 L 90 200 A 10 10 0 0 0 80 210 L 80 240 L 60 240 Z" {...STYLES.outline} />

    {/* Inner Wall (Hidden WT) */}
    <line x1="60" y1="110" x2="150" y2="110" {...STYLES.hidden} />
    <line x1="60" y1="190" x2="150" y2="190" {...STYLES.hidden} />

    {/* Dimensions */}
    {/* L */}
    <line x1="60" y1="240" x2="60" y2="280" {...STYLES.extLine} />
    <line x1="150" y1="200" x2="150" y2="280" {...STYLES.extLine} />
    <line x1="60" y1="270" x2="150" y2="270" {...STYLES.dimLine} />
    <DimText x="105" y="270">L</DimText>

    {/* F (Lap Dia) */}
    <line x1="60" y1="60" x2="30" y2="60" {...STYLES.extLine} />
    <line x1="60" y1="240" x2="30" y2="240" {...STYLES.extLine} />
    <line x1="40" y1="60" x2="40" y2="240" {...STYLES.dimLine} />
    <DimText x="40" y="150">F</DimText>

    {/* OD */}
    <line x1="150" y1="100" x2="190" y2="100" {...STYLES.extLine} />
    <line x1="150" y1="200" x2="190" y2="200" {...STYLES.extLine} />
    <line x1="180" y1="100" x2="180" y2="200" {...STYLES.dimLine} />
    <DimText x="180" y="150">OD</DimText>

    {/* T (Thickness) */}
    <line x1="60" y1="50" x2="60" y2="30" {...STYLES.extLine} />
    <line x1="80" y1="50" x2="80" y2="30" {...STYLES.extLine} />
    <line x1="60" y1="40" x2="80" y2="40" {...STYLES.dimLine} />
    <DimText x="70" y="40">T</DimText>

    {/* R (Radius) */}
    <path d="M 110 80 Q 90 90 85 95" stroke="#64748b" strokeWidth="1" fill="none" markerEnd="url(#arrow-start)" />
    <text x="120" y="75" {...STYLES.dimText}>R</text>
  </svg>
);

// 6. Threaded Nipple (Barrel/CNC)
export const ThreadedNippleDrawing = () => (
  <svg {...commonProps}>
    <Defs />
    <line x1="40" y1="150" x2="260" y2="150" {...STYLES.center} />

    {/* Body */}
    <rect x="50" y="100" width="200" height="100" {...STYLES.outline} />

    {/* Thread representation (NPT Taper) */}
    <path d="M50 100 L110 95 L110 205 L50 200 Z" fill="#f1f5f9" {...STYLES.inner} />
    <path d="M250 100 L190 95 L190 205 L250 200 Z" fill="#f1f5f9" {...STYLES.inner} />

    {/* Thread zig-zags */}
    <path d="M50 100 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5" {...STYLES.inner} />
    <path d="M50 200 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5" {...STYLES.inner} />
    <path d="M190 95 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5" {...STYLES.inner} />
    <path d="M190 205 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5" {...STYLES.inner} />

    {/* Inner bore */}
    <line x1="50" y1="120" x2="250" y2="120" {...STYLES.hidden} />
    <line x1="50" y1="180" x2="250" y2="180" {...STYLES.hidden} />

    {/* Dimensions */}
    <line x1="50" y1="210" x2="50" y2="250" {...STYLES.extLine} />
    <line x1="250" y1="210" x2="250" y2="250" {...STYLES.extLine} />
    <line x1="50" y1="240" x2="250" y2="240" {...STYLES.dimLine} />
    <DimText x="150" y="240">L (Length)</DimText>

    <line x1="50" y1="70" x2="50" y2="90" {...STYLES.extLine} />
    <line x1="110" y1="70" x2="110" y2="90" {...STYLES.extLine} />
    <line x1="50" y1="80" x2="110" y2="80" {...STYLES.dimLine} />
    <DimText x="80" y="80">TL</DimText>

    <line x1="250" y1="100" x2="270" y2="100" {...STYLES.extLine} />
    <line x1="250" y1="200" x2="270" y2="200" {...STYLES.extLine} />
    <line x1="260" y1="100" x2="260" y2="200" {...STYLES.dimLine} />
    <DimText x="260" y="150">OD</DimText>
  </svg>
);

// 7. Hex Nipple
export const HexNippleDrawing = () => (
  <svg {...commonProps}>
    <Defs />
    <line x1="40" y1="150" x2="260" y2="150" {...STYLES.center} />

    {/* Hex Center */}
    <rect x="135" y="80" width="30" height="140" fill="#f8fafc" {...STYLES.outline} />
    <line x1="135" y1="110" x2="165" y2="110" {...STYLES.inner} />
    <line x1="135" y1="190" x2="165" y2="190" {...STYLES.inner} />

    {/* Threads */}
    <path d="M50 110 L135 105 L135 195 L50 190 Z" fill="#f1f5f9" {...STYLES.outline} />
    <path d="M250 110 L165 105 L165 195 L250 190 Z" fill="#f1f5f9" {...STYLES.outline} />

    <path d="M50 110 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5" {...STYLES.inner} />
    <path d="M50 190 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5" {...STYLES.inner} />

    {/* Dimensions */}
    <line x1="50" y1="230" x2="50" y2="270" {...STYLES.extLine} />
    <line x1="250" y1="230" x2="250" y2="270" {...STYLES.extLine} />
    <line x1="50" y1="260" x2="250" y2="260" {...STYLES.dimLine} />
    <DimText x="150" y="260">L</DimText>

    <line x1="50" y1="80" x2="50" y2="100" {...STYLES.extLine} />
    <line x1="135" y1="80" x2="135" y2="100" {...STYLES.extLine} />
    <line x1="50" y1="90" x2="135" y2="90" {...STYLES.dimLine} />
    <DimText x="92.5" y="90">C (Thread Len)</DimText>

    <line x1="135" y1="80" x2="115" y2="80" {...STYLES.extLine} />
    <line x1="135" y1="220" x2="115" y2="220" {...STYLES.extLine} />
    <line x1="125" y1="80" x2="125" y2="220" {...STYLES.dimLine} />
    <DimText x="125" y="150">W</DimText>
  </svg>
);

// 8. Plug (Hex Head)
export const PlugDrawing = () => (
  <svg {...commonProps}>
    <Defs />
    <line x1="40" y1="150" x2="260" y2="150" {...STYLES.center} />

    {/* Hex Head */}
    <rect x="70" y="90" width="30" height="120" fill="#f8fafc" {...STYLES.outline} />
    <line x1="70" y1="115" x2="100" y2="115" {...STYLES.inner} />
    <line x1="70" y1="185" x2="100" y2="185" {...STYLES.inner} />

    {/* Threaded Body */}
    <path d="M100 110 L230 115 L230 185 L100 190 Z" fill="#f1f5f9" {...STYLES.outline} />

    <path d="M100 110 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5" {...STYLES.inner} />
    <path d="M100 190 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5 l5 -5" {...STYLES.inner} />

    <path d="M230 115 L230 185" {...STYLES.outline} />

    {/* Dimensions */}
    <line x1="70" y1="220" x2="70" y2="260" {...STYLES.extLine} />
    <line x1="230" y1="220" x2="230" y2="260" {...STYLES.extLine} />
    <line x1="70" y1="250" x2="230" y2="250" {...STYLES.dimLine} />
    <DimText x="150" y="250">A (Min Length)</DimText>

    <line x1="70" y1="90" x2="50" y2="90" {...STYLES.extLine} />
    <line x1="70" y1="210" x2="50" y2="210" {...STYLES.extLine} />
    <line x1="60" y1="90" x2="60" y2="210" {...STYLES.dimLine} />
    <DimText x="60" y="150">C/W</DimText>
  </svg>
);

// 9. Socket / Coupling (Threaded)
export const SocketDrawing = () => (
  <svg {...commonProps}>
    <Defs />
    <line x1="40" y1="150" x2="260" y2="150" {...STYLES.center} />

    {/* Outer Body */}
    <rect x="70" y="80" width="160" height="140" {...STYLES.outline} />

    {/* Inner Thread representation */}
    <line x1="70" y1="100" x2="130" y2="105" {...STYLES.inner} />
    <line x1="70" y1="200" x2="130" y2="195" {...STYLES.inner} />
    <line x1="230" y1="100" x2="170" y2="105" {...STYLES.inner} />
    <line x1="230" y1="200" x2="170" y2="195" {...STYLES.inner} />

    <path d="M130 105 L130 195" {...STYLES.inner} />
    <path d="M170 105 L170 195" {...STYLES.inner} />

    <path d="M70 100 l5 -5 l5 5 l5 -5 l5 5 l5 -5 l5 5" {...STYLES.inner} strokeWidth="0.5" />
    <path d="M230 100 l-5 -5 l-5 5 l-5 -5 l-5 5 l-5 -5 l-5 5" {...STYLES.inner} strokeWidth="0.5" />

    {/* Dimensions */}
    <line x1="70" y1="230" x2="70" y2="270" {...STYLES.extLine} />
    <line x1="230" y1="230" x2="230" y2="270" {...STYLES.extLine} />
    <line x1="70" y1="260" x2="230" y2="260" {...STYLES.dimLine} />
    <DimText x="150" y="260">L (Length)</DimText>

    <line x1="70" y1="80" x2="40" y2="80" {...STYLES.extLine} />
    <line x1="70" y1="220" x2="40" y2="220" {...STYLES.extLine} />
    <line x1="50" y1="80" x2="50" y2="220" {...STYLES.dimLine} />
    <DimText x="50" y="150">OD</DimText>

    <line x1="150" y1="105" x2="150" y2="195" {...STYLES.dimLine} />
    <DimText x="150" y="150">D</DimText>
  </svg>
);
