"use client";
import React, { useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function CTADrawing() {
  const svgRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.to(".cad-cursor", { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });
    gsap.to(".construction-point", { opacity: 0.3, scale: 1.4, duration: 2.2, repeat: -1, yoyo: true, transformOrigin: "center", ease: "sine.inOut", stagger: 0.3 });
    gsap.to(".dim-glow-line", { strokeDashoffset: -400, duration: 4.5, repeat: -1, ease: "linear", delay: 2 });
    gsap.to(".mfg-pulse", { opacity: 0.6, duration: 1.2, repeat: -1, yoyo: true, repeatDelay: 6, ease: "sine.inOut" });

  }, { scope: svgRef });

  // Thread Generator
  const generateTaperedThread = (startX, endX, yOuterTip, yOuterEnd, depth, pitch, isTop) => {
    let d = `M ${startX} ${yOuterTip}`;
    const length = Math.abs(endX - startX);
    const dirX = startX < endX ? 1 : -1;
    const dirY = isTop ? 1 : -1;
    const dy = yOuterEnd - yOuterTip;

    for (let i = 0; i < length; i += pitch) {
      let nextX = startX + ((i + pitch / 2) * dirX);
      let nextPct = (i + pitch / 2) / length;
      let rootY = yOuterTip + (dy * nextPct) + (depth * dirY);

      let endToothX = startX + ((i + pitch) * dirX);
      let endToothPct = (i + pitch) / length;
      let endCrestY = yOuterTip + (dy * endToothPct);

      d += ` L ${nextX} ${rootY}`;
      d += ` L ${endToothX} ${endCrestY}`;
    }
    return d;
  };

  const generateThreadLines = (startX, endX, yTopTip, yTopEnd, yBotTip, yBotEnd, pitch) => {
    let d = "";
    const length = Math.abs(endX - startX);
    const dirX = startX < endX ? 1 : -1;
    const dyTop = yTopEnd - yTopTip;
    const dyBot = yBotEnd - yBotTip;

    for (let i = 0; i <= length; i += pitch) {
      let x = startX + (i * dirX);
      let pct = i / length;
      let yt = yTopTip + (dyTop * pct);
      let yb = yBotTip + (dyBot * pct);
      d += ` M ${x} ${yt} L ${x + (pitch / 2) * dirX} ${yb}`;
    }
    return d;
  };

  // Profile Paths (Front & Section Views)
  const frontTopLeft = generateTaperedThread(180, 240, 259, 255, 4, 4, true);
  const frontTopRight = generateTaperedThread(420, 360, 259, 255, 4, 4, true);
  const frontBotLeft = generateTaperedThread(180, 240, 341, 345, 4, 4, false);
  const frontBotRight = generateTaperedThread(420, 360, 341, 345, 4, 4, false);

  const frontThreadsLeft = generateThreadLines(180, 240, 259, 255, 341, 345, 4);
  const frontThreadsRight = generateThreadLines(420, 360, 259, 255, 341, 345, 4);

  const secTopLeft = generateTaperedThread(730, 790, 259, 255, 4, 4, true);
  const secTopRight = generateTaperedThread(970, 910, 259, 255, 4, 4, true);
  const secBotLeft = generateTaperedThread(730, 790, 341, 345, 4, 4, false);
  const secBotRight = generateTaperedThread(970, 910, 341, 345, 4, 4, false);

  const secThreadsLeftTop = generateThreadLines(730, 790, 259, 255, 270, 270, 4);
  const secThreadsLeftBot = generateThreadLines(730, 790, 330, 330, 341, 345, 4);
  const secThreadsRightTop = generateThreadLines(970, 910, 259, 255, 270, 270, 4);
  const secThreadsRightBot = generateThreadLines(970, 910, 330, 330, 341, 345, 4);

  return (
    <div className="relative w-full flex items-center justify-center group cursor-crosshair px-2 sm:px-0">
      <svg
        ref={svgRef}
        viewBox="0 0 1200 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[1200px] transition-all duration-500 pointer-events-auto filter drop-shadow-[0_4px_20px_rgba(20,46,87,0.06)]"
      >
        <defs>
          <pattern id="ansi-hatch" width="12" height="12" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="12" stroke="#142E57" strokeWidth="0.8" opacity="0.6" />
          </pattern>
          <clipPath id="detail-b-clip">
            <circle cx="850" cy="550" r="100" />
          </clipPath>
        </defs>

        <g stroke="#142E57" strokeLinecap="round" strokeLinejoin="round" className="font-mono text-[20px]">

          {/* Main Drawing Title */}
          <g className="draw-notes opacity-0 transition-opacity duration-700 max-sm:translate-x-[60px]">
            <text x="80" y="90" className="font-bold text-[20px] fill-[#142E57] uppercase tracking-widest" stroke="none">Engineering Drawing</text>
            <text x="80" y="140" className="font-bold text-[45px] tracking-wide fill-[#142E57]" stroke="none">THREADED BARREL NIPPLE</text>
          </g>

          {/* Step 2: Construction Lines (#22406B) */}
          <g className="draw-construction-lines opacity-0 transition-opacity duration-300 group-hover:opacity-60" stroke="#22406B" strokeWidth="0.75" strokeDasharray="5 5">
            <rect x="150" y="220" width="300" height="160" />
            <line x1="300" y1="200" x2="300" y2="400" />
            <rect x="700" y="220" width="300" height="160" />
            <line x1="850" y1="200" x2="850" y2="400" />
            <rect x="220" y="620" width="160" height="160" className="max-sm:translate-x-[60px]" />
            <line x1="300" y1="400" x2="300" y2="620" className="max-sm:opacity-0" />
            <line x1="300" y1="300" x2="700" y2="300" />
            <line x1="450" y1="700" x2="750" y2="550" />
          </g>

          {/* Ambient Construction Points */}
          <g className="opacity-0 transition-opacity duration-500 group-hover:opacity-100" fill="#142E57" stroke="none">
            <circle cx="180" cy="300" r="2.5" className="construction-point" />
            <circle cx="420" cy="300" r="2.5" className="construction-point" />
            <circle cx="730" cy="300" r="2.5" className="construction-point" />
            <circle cx="970" cy="300" r="2.5" className="construction-point" />
            <circle cx="300" cy="700" r="2.5" className="construction-point max-sm:translate-x-[60px]" />
            <circle cx="850" cy="550" r="2.5" className="construction-point" />
          </g>

          {/* Reference Circles */}
          <g className="draw-ref-circles opacity-0 transition-all duration-500" stroke="#22406B" strokeWidth="0.75" strokeDasharray="3 6">
            <circle cx="300" cy="700" r="90" opacity="0.5" className="max-sm:translate-x-[60px]" />
            <circle cx="850" cy="550" r="110" opacity="0.5" />
          </g>

          {/* Main External Profile Lines (#142E57) */}
          <g className="draw-external opacity-0" stroke="#142E57" strokeWidth="2.2">
            <path d={`
              M 240 255 L 360 255
              M 240 345 L 360 345
              M 180 270 L 180 259
              M 180 330 L 180 341
              M 420 270 L 420 259
              M 420 330 L 420 341
              ${frontTopLeft} ${frontTopRight}
              ${frontBotLeft} ${frontBotRight}
            `} />

            <path d={`
              M 790 255 L 910 255
              M 790 345 L 910 345
              M 730 270 L 730 259
              M 730 330 L 730 341
              M 970 270 L 970 259
              M 970 330 L 970 341
              ${secTopLeft} ${secTopRight}
              ${secBotLeft} ${secBotRight}
            `} />

            {/* End View OD Circle */}
            <path d="M 255 700 A 45 45 0 1 1 345 700 A 45 45 0 1 1 255 700" className="max-sm:translate-x-[60px]" />

            {/* Detail B Zoomed Profile */}
            <path d="M 720 580 L 732 556 L 744 580 L 756 556 L 768 580 L 780 556 L 792 580 L 804 556 L 816 580 L 828 556 L 840 580 L 852 556 L 864 580 L 876 556 L 888 580 L 900 556 L 912 580 L 924 556 L 936 580 L 948 556 M 720 580" strokeWidth="2.5" clipPath="url(#detail-b-clip)" />
          </g>

          {/* Internal Bore Lines */}
          <g className="draw-internal opacity-0" stroke="#142E57" strokeWidth="1.5">
            <path d="M 730 270 L 735 270 L 965 270 L 970 270" />
            <path d="M 730 330 L 735 330 L 965 330 L 970 330" />
            <path d="M 270 700 A 30 30 0 1 1 330 700 A 30 30 0 1 1 270 700" className="max-sm:translate-x-[60px]" />
          </g>

          {/* Threads */}
          <g className="draw-threads opacity-0" stroke="#142E57" strokeWidth="1">
            <path d={frontThreadsLeft} strokeDasharray="5 3" />
            <path d={frontThreadsRight} strokeDasharray="5 3" />
            <path d={secThreadsLeftTop} strokeWidth="0.8" />
            <path d={secThreadsLeftBot} strokeWidth="0.8" />
            <path d={secThreadsRightTop} strokeWidth="0.8" />
            <path d={secThreadsRightBot} strokeWidth="0.8" />
          </g>

          {/* Hidden Lines & Hatching */}
          <g className="draw-hidden opacity-0" strokeWidth="0.8">
            <line x1="180" y1="270" x2="420" y2="270" stroke="#142E57" strokeDasharray="5 5" />
            <line x1="180" y1="330" x2="420" y2="330" stroke="#142E57" strokeDasharray="5 5" />

            <rect x="730" y="255" width="240" height="15" fill="url(#ansi-hatch)" stroke="none" />
            <rect x="730" y="330" width="240" height="15" fill="url(#ansi-hatch)" stroke="none" />

            <circle cx="300" cy="700" r="39" stroke="#22406B" strokeDasharray="5 5" className="max-sm:translate-x-[60px]" />
          </g>

          {/* Centerlines (#142E57) */}
          <g className="draw-centerlines opacity-0" stroke="#142E57" strokeWidth="1" strokeDasharray="30 6 6 6">
            <line x1="120" y1="300" x2="1030" y2="300" />
            <line x1="210" y1="700" x2="390" y2="700" className="max-sm:translate-x-[60px]" />
            <line x1="300" y1="610" x2="300" y2="790" className="max-sm:translate-x-[60px]" />
          </g>

          {/* Dimension Lines & Leaders (#142E57) */}
          <g className="draw-dim-arrows opacity-0 transition-colors duration-500" stroke="#142E57" strokeWidth="1.25">
            <line x1="180" y1="345" x2="180" y2="420" />
            <line x1="420" y1="345" x2="420" y2="420" />
            <line x1="180" y1="405" x2="420" y2="405" />
            <path d="M 188 400 L 180 405 L 188 410 M 412 400 L 420 405 L 412 410" />

            <line x1="240" y1="345" x2="240" y2="390" />
            <line x1="180" y1="375" x2="240" y2="375" />
            <path d="M 188 370 L 180 375 L 188 380 M 232 370 L 240 375 L 232 380" />

            <line x1="970" y1="255" x2="1030" y2="255" />
            <line x1="970" y1="345" x2="1030" y2="345" />
            <line x1="1015" y1="255" x2="1015" y2="345" />
            <path d="M 1010 263 L 1015 255 L 1020 263 M 1010 337 L 1015 345 L 1020 337" />

            <line x1="970" y1="270" x2="990" y2="270" />
            <line x1="970" y1="330" x2="990" y2="330" />
            <line x1="980" y1="270" x2="980" y2="330" />
            <path d="M 975 278 L 980 270 L 985 278 M 975 322 L 980 330 L 985 322" />

            <line x1="300" y1="700" x2="360" y2="640" className="max-sm:translate-x-[60px]" />
            <line x1="360" y1="640" x2="400" y2="640" className="max-sm:translate-x-[60px]" />
            <line x1="300" y1="700" x2="380" y2="720" className="max-sm:translate-x-[60px]" />
            <line x1="380" y1="720" x2="420" y2="720" className="max-sm:translate-x-[60px]" />

            <line x1="756" y1="550" x2="780" y2="550" />
            <line x1="756" y1="545" x2="756" y2="555" />
            <line x1="780" y1="545" x2="780" y2="555" />

            <line x1="888" y1="590" x2="920" y2="590" />
            <line x1="900" y1="590" x2="900" y2="556" />
            <path d="M 895 564 L 900 556 L 905 564 M 895 582 L 900 590 L 905 582" />

            <circle cx="850" cy="550" r="100" strokeWidth="1" strokeDasharray="6 6" fill="none" />
            <line x1="930" y1="490" x2="970" y2="450" />
            <line x1="970" y1="450" x2="1030" y2="450" />

            <line x1="180" y1="405" x2="420" y2="405" stroke="#142E57" strokeWidth="2" className="dim-glow-line opacity-0 group-hover:opacity-100" strokeDasharray="80 240" strokeDashoffset="0" />
          </g>

          {/* Dimension Values (#142E57) */}
          <g className="draw-dim-text opacity-0 transition-colors duration-500" fill="#142E57" stroke="none">
            <text x="300" y="395" textAnchor="middle" className="font-bold">OVERALL LENGTH 160.00</text>
            <text x="210" y="365" textAnchor="middle" className="text-[16px]">THREAD 40.00</text>
            <text x="1025" y="300" textAnchor="start" dominantBaseline="middle" className="font-bold">Ø 60.00 OD</text>
            <text x="990" y="300" textAnchor="start" dominantBaseline="middle" className="text-[16px]">Ø 40.00 ID</text>

            <text x="410" y="635" textAnchor="start" className="text-[16px] max-sm:translate-x-[60px]">Ø 60.00</text>
            <text x="430" y="715" textAnchor="start" className="text-[16px] max-sm:translate-x-[60px]">Ø 40.00</text>

            <text x="768" y="542" textAnchor="middle" className="text-[16px]">PITCH</text>
            <text x="910" y="575" textAnchor="start" className="text-[16px]">DEPTH</text>

            <text x="825" y="572" textAnchor="middle" className="text-[16px]">55°</text>
            <path d="M 816 575 Q 825 565 834 575" fill="none" stroke="#142E57" strokeWidth="0.75" />
          </g>

          {/* Notes & View Labels */}
          <g className="draw-notes opacity-0 transition-colors duration-500" fill="#142E57">
            <text x="300" y="470" textAnchor="middle" className="font-bold tracking-widest text-[20px]">FRONT VIEW</text>
            <text x="850" y="420" textAnchor="middle" className="font-bold tracking-widest text-[20px]">SECTION A-A</text>
            <text x="300" y="810" textAnchor="middle" className="font-bold tracking-widest text-[20px] max-sm:translate-x-[60px]">END VIEW</text>
            <text x="850" y="680" textAnchor="middle" className="font-bold tracking-widest text-[20px]">DETAIL B</text>

            <text x="1020" y="445" stroke="none" className="font-bold text-[20px]">BSPT THREAD</text>
            <text x="1000" y="465" stroke="none" className="text-[20px] fill-[#142E57]">TYP. BOTH ENDS</text>

            <line x1="300" y1="180" x2="300" y2="390" stroke="#142E57" strokeWidth="1.5" strokeDasharray="15 8" />
            <path d="M 290 190 L 300 180 L 310 190 M 290 380 L 300 390 L 310 380" stroke="#142E57" strokeWidth="2" fill="none" />
            <text x="280" y="190" stroke="none" className="font-bold text-[24px]">A</text>
            <text x="280" y="390" stroke="none" className="font-bold text-[24px]">A</text>

            <path d="M 180 180 L 180 215 M 165 197.5 L 195 197.5" stroke="#142E57" strokeWidth="1" className="cad-cursor" />
          </g>

          {/* Title Block (Border: #22406B, Text: #142E57) */}
          <g className="draw-titleblock opacity-0 transition-opacity duration-500 group-hover:opacity-100 max-sm:-translate-x-[150px] max-sm:translate-y-[20px]" strokeWidth="0.75" stroke="#22406B" fill="none">
            <rect x="680" y="700" width="480" height="180" fill="#FFFFFF" />

            <line x1="680" y1="730" x2="1160" y2="730" />
            <line x1="680" y1="760" x2="1160" y2="760" />
            <line x1="680" y1="790" x2="1160" y2="790" />
            <line x1="680" y1="820" x2="1160" y2="820" />
            <line x1="680" y1="850" x2="1160" y2="850" />

            <line x1="810" y1="700" x2="810" y2="850" />
            <line x1="1000" y1="820" x2="1000" y2="880" />

            <g fill="#142E57" stroke="none" className="text-[16px]">
              <text x="690" y="722" className="fill-[#142E57]">DRAWING NO</text>
              <text x="820" y="722" className="font-bold text-[20px]">PPF-BN-001</text>

              <text x="690" y="752" className="fill-[#142E57]">PART NAME</text>
              <text x="820" y="752" className="font-bold text-[20px]">THREADED BARREL NIPPLE</text>

              <text x="690" y="782" className="fill-[#142E57]">MATERIAL</text>
              <text x="820" y="782" className="font-bold text-[20px]">ASTM A182 F316</text>

              <text x="690" y="812" className="fill-[#142E57]">STATUS</text>
              <text x="820" y="812" className="font-bold text-[20px] mfg-status fill-[#142E57]">DRAFTING IN PROGRESS</text>

              <text x="690" y="842" className="fill-[#142E57]">REVISION</text>
              <text x="820" y="842" className="font-bold">A</text>
              <text x="1010" y="842">SCALE: NTS</text>

              <text x="690" y="872" className="fill-[#142E57]">STANDARD</text>
              <text x="820" y="872">ASME B1.20.1</text>
              <text x="1010" y="872">TOL: ±0.10 mm</text>
            </g>
          </g>

          {/* Workflow Indicator (#4D7A58 Muted Green) */}
          <g className="workflow-ui opacity-0 text-[19px] font-mono max-sm:translate-x-[90px] max-sm:translate-y-[800px]" transform="translate(0, 760)" fill="#142E57" stroke="none">
            <text x="0" y="0" className="font-bold tracking-widest text-[18px] fill-[#142E57]">ENGINEERING WORKFLOW</text>

            <circle cx="5" cy="28" r="4.5" className="wf-dot-1" fill="transparent" stroke="#142E57" strokeWidth="1.2" />
            <text x="18" y="32" className="wf-text-1 opacity-50 fill-[#142E57]">Engineering Design</text>

            <circle cx="5" cy="56" r="4.5" className="wf-dot-2" fill="transparent" stroke="#142E57" strokeWidth="1.2" />
            <text x="18" y="60" className="wf-text-2 opacity-50 fill-[#4E6D95]">Quality Assurance</text>

            <circle cx="5" cy="84" r="4.5" className="wf-dot-3" fill="transparent" stroke="#142E57" strokeWidth="1.2" />
            <text x="18" y="88" className="wf-text-3 opacity-50 fill-[#5B6B80]">Ready For Manufacturing</text>
            <circle cx="5" cy="84" r="11" className="mfg-pulse opacity-0" fill="transparent" stroke="#4D7A58" strokeWidth="1" />
          </g>

        </g>
      </svg>
    </div>
  );
}