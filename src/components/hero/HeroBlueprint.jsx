import React from "react";

export function HeroBlueprint() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.1]">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#0F2747" strokeWidth="0.5" fill="none" className="font-mono text-[8px]">
          
          {/* Central crosshairs */}
          <line x1="50%" y1="10%" x2="50%" y2="90%" strokeDasharray="6 4 2 4" strokeWidth="0.75" />
          <line x1="10%" y1="50%" x2="90%" y2="50%" strokeDasharray="6 4 2 4" strokeWidth="0.75" />
          
          {/* Concentric construction circles */}
          <circle cx="50%" cy="50%" r="20%" />
          <circle cx="50%" cy="50%" r="25%" strokeDasharray="4 4" />
          <circle cx="50%" cy="50%" r="35%" />
          
          {/* Outer large circle faint */}
          <circle cx="50%" cy="50%" r="45%" strokeDasharray="2 6" strokeOpacity="0.5" />

          {/* Precision Nodes & Marks */}
          <circle cx="50%" cy="50%" r="3" fill="#0F2747" />
          
          {/* Dimension Lines (Top) */}
          <line x1="30%" y1="15%" x2="70%" y2="15%" />
          <line x1="30%" y1="13%" x2="30%" y2="17%" />
          <line x1="70%" y1="13%" x2="70%" y2="17%" />
          <text x="50%" y="14%" textAnchor="middle" fill="#0F2747" stroke="none" className="tracking-widest">120.00</text>
          
          {/* Inner Dimension (Top) */}
          <line x1="40%" y1="22%" x2="60%" y2="22%" />
          <line x1="40%" y1="20%" x2="40%" y2="24%" />
          <line x1="60%" y1="20%" x2="60%" y2="24%" />
          <text x="50%" y="21%" textAnchor="middle" fill="#0F2747" stroke="none" className="tracking-widest">80.00</text>

          {/* Radius Dimensions (Right) */}
          <line x1="70%" y1="30%" x2="85%" y2="30%" />
          <text x="85%" y="29%" textAnchor="end" fill="#0F2747" stroke="none" className="tracking-widest">R1.00</text>

          <line x1="75%" y1="40%" x2="90%" y2="40%" />
          <text x="90%" y="39%" textAnchor="end" fill="#0F2747" stroke="none" className="tracking-widest">∅32.00</text>

          <line x1="75%" y1="70%" x2="90%" y2="70%" />
          <text x="90%" y="69%" textAnchor="end" fill="#0F2747" stroke="none" className="tracking-widest">∅26.00</text>

          {/* Section Marker (Bottom Right) */}
          <text x="75%" y="85%" textAnchor="middle" fill="#0F2747" stroke="none" className="tracking-[0.3em] font-bold">SECTION A-A</text>
          
        </g>
      </svg>
    </div>
  );
}
