import React from 'react';

interface SageLogoProps {
  className?: string;
  size?: number;
}

export default function SageLogo({ className = '', size = 500 }: SageLogoProps) {
  return (
    <svg 
      viewBox="0 0 500 500" 
      width={size} 
      height={size} 
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E90FF" />
          <stop offset="100%" stopColor="#87CEEB" />
        </linearGradient>
        <radialGradient id="orangeRadial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF771C" />
          <stop offset="100%" stopColor="#E8650A" />
        </radialGradient>
        <linearGradient id="pcbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#141E30" />
          <stop offset="100%" stopColor="#243B55" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="50%" stopColor="#F5B041" />
          <stop offset="100%" stopColor="#D35400" />
        </linearGradient>
        <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A00E0" />
          <stop offset="100%" stopColor="#8E2DE2" />
        </linearGradient>

        {/* Text Paths */}
        {/* Top Text Path (arc from left-to-right along upper half) */}
        <path 
          id="topTextPath" 
          d="M 50 250 A 200 200 0 0 1 450 250" 
          fill="none" 
        />
        {/* Bottom Text Path (arc from left-to-right along lower half) */}
        {/* We invert the start and end points to make text read left-to-right along the bottom curve */}
        <path 
          id="bottomTextPath" 
          d="M 445 250 A 195 195 0 0 1 55 250" 
          fill="none" 
        />

        {/* Clip paths for individual hexagons */}
        {/* Standard flat-topped hexagon polygon */}
        <clipPath id="hexClip">
          <polygon points="27.5,0 82.5,0 110,47.63 82.5,95.26 27.5,95.26 0,47.63" />
        </clipPath>
      </defs>

      {/* Outer Circle (Background light blue / sky blue) */}
      <circle cx="250" cy="250" r="240" fill="#3AA4F7" />

      {/* Outer border of blue circle */}
      <circle cx="250" cy="250" r="238" fill="none" stroke="#FFFFFF" strokeWidth="3" />

      {/* Text on Top Path */}
      <text fill="#FFFFFF" fontSize="23" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" letterSpacing="1px">
        <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">
          SHASTRY ASSOCIATES GLOBAL ENTERPRISES
        </textPath>
      </text>

      {/* Text on Bottom Path */}
      <text fill="#FFFFFF" fontSize="13.5" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" letterSpacing="0.8px">
        <textPath href="#bottomTextPath" startOffset="50%" textAnchor="middle">
          RF • Microwaves • Wireless • Workshops • Courses • Tutorials • Training • Consulting
        </textPath>
      </text>

      {/* Inner Circle (Orange Brand Backdrop) */}
      <circle cx="250" cy="250" r="195" fill="url(#orangeRadial)" />
      
      {/* Circle separator */}
      <circle cx="250" cy="250" r="193" fill="none" stroke="#FFFFFF" strokeWidth="2" />

      {/* ========================================== */}
      {/* HEXAGONAL HONEYCOMB CLUSTER */}
      {/* ========================================== */}
      
      {/* 
        Center hexagon coordinate offsets of current system:
        Side length (s) = 55. Width = 110. Height = 95.26. No scale gap.
        Flat top height/2 = 47.63.
      */}

      {/* --- SVG GROUP FOR HONEYCOMB CONTROLS --- */}
      <g stroke="#FFFFFF" strokeWidth="6" strokeLinejoin="miter">

        {/* 1. TOP HEXAGON (Waveforms) */}
        {/* Location: cx=250, cy=154.74 */}
        <g transform="translate(195, 107.11)">
          {/* Hexagon Border */}
          <polygon points="27.5,0 82.5,0 110,47.63 82.5,95.26 27.5,95.26 0,47.63" fill="#FFFFFF" />
          {/* Hexagon Content */}
          <g clipPath="url(#hexClip)">
            {/* Draw waveforms: Sine, Square, Pulse */}
            <rect width="110" height="96" fill="#FFFFFF" stroke="none" />
            
            {/* Horizontal Guide lines */}
            <line x1="10" y1="48" x2="100" y2="48" stroke="#EAEAEA" strokeWidth="1" />
            
            {/* Waveform Path - Orange Analog/Digital Wave */}
            <path 
              d="M 12,50 C 20,20 30,20 38,50 L 38,30 L 62,30 L 62,70 L 80,70 L 80,48 L 98,48" 
              fill="none" 
              stroke="#E8650A" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            {/* Tiny Nodes at terminals */}
            <circle cx="12" cy="50" r="3.5" fill="#E8650A" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="98" cy="48" r="3.5" fill="#E8650A" stroke="#FFFFFF" strokeWidth="1" />
          </g>
        </g>

        {/* 2. TOP-LEFT HEXAGON (Smith Chart) */}
        {/* Location: cx=167.5, cy=202.37 */}
        <g transform="translate(112.5, 154.74)">
          <polygon points="27.5,0 82.5,0 110,47.63 82.5,95.26 27.5,95.26 0,47.63" fill="#FFFFFF" />
          <g clipPath="url(#hexClip)">
            <rect width="110" height="96" fill="#FFFFFF" stroke="none" />
            
            {/* Smith Chart grid representation */}
            <circle cx="55" cy="48" r="42" fill="none" stroke="#2c3e50" strokeWidth="1" />
            <circle cx="76" cy="48" r="21" fill="none" stroke="#2c3e50" strokeWidth="1.5" strokeDasharray="1,1" />
            <circle cx="65.5" cy="48" r="31.5" fill="none" stroke="#111111" strokeWidth="1.5" />
            <circle cx="86.5" cy="48" r="10.5" fill="none" stroke="#111111" strokeWidth="1" />
            
            {/* Constant Reactance Arcs */}
            {/* Top Arcs */}
            <path d="M 13,48 A 42 42 0 0 1 97,48" fill="none" stroke="#111111" strokeWidth="1" />
            <path d="M 23.5,48 A 31.5 31.5 0 0 1 86.5,48" fill="none" stroke="#2c3e50" strokeWidth="1.2" />
            <path d="M 34,48 A 21 21 0 0 1 76,48" fill="none" stroke="#2c3e50" strokeWidth="0.8" />
            {/* Bottom Arcs */}
            <path d="M 13,48 A 42 42 0 0 0 97,48" fill="none" stroke="#111111" strokeWidth="1" />
            <path d="M 23.5,48 A 31.5 31.5 0 0 0 86.5,48" fill="none" stroke="#2c3e50" strokeWidth="1.2" />
            
            {/* Horizontal center axis */}
            <line x1="13" y1="48" x2="97" y2="48" stroke="#111111" strokeWidth="1.5" />
            
            {/* Curving matching stub or SWR curve */}
            <path d="M 30,70 Q 55,15 80,55" fill="none" stroke="#E8650A" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>

        {/* 3. TOP-RIGHT HEXAGON (Antenna / Bowtie Patch) */}
        {/* Location: cx=332.5, cy=202.37 */}
        <g transform="translate(277.5, 154.74)">
          <polygon points="27.5,0 82.5,0 110,47.63 82.5,95.26 27.5,95.26 0,47.63" fill="#FFFFFF" />
          <g clipPath="url(#hexClip)">
            <rect width="110" height="96" fill="#FFFFFF" stroke="none" />
            {/* Bowtie Microstrip Patch Design */}
            {/* Ground Plane (light green) */}
            <rect x="5" y="15" width="100" height="66" rx="5" fill="#2E7D32" stroke="none" />
            {/* Antenna element (solid gold/whitish patch) */}
            <polygon points="20,25 50,47 20,69" fill="#FFF2CC" stroke="#F5B400" strokeWidth="1.5" />
            <polygon points="90,25 60,47 90,69" fill="#FFF2CC" stroke="#F5B400" strokeWidth="1.5" />
            {/* Microstrip line / feed */}
            <rect x="52" y="45" width="6" height="30" fill="#F5B400" stroke="none" />
            {/* Coaxial feed point dot */}
            <circle cx="55" cy="72" r="45" fill="#FFFFFF" stroke="#D35400" strokeWidth="1" transform="scale(0.08) translate(610, 840)" />
            <circle cx="55" cy="72" r="2.5" fill="#111111" stroke="none" />
          </g>
        </g>

        {/* 4. BOTTOM-LEFT HEXAGON (Smartphone UI) */}
        {/* Location: cx=167.5, cy=297.63 */}
        <g transform="translate(112.5, 250)">
          <polygon points="27.5,0 82.5,0 110,47.63 82.5,95.26 27.5,95.26 0,47.63" fill="#FFFFFF" />
          <g clipPath="url(#hexClip)">
            {/* Phone Screen Gradient */}
            <rect width="110" height="96" fill="url(#phoneGrad)" stroke="none" />
            {/* Phone Frame outlines inside */}
            <rect x="18" y="4" width="74" height="88" rx="8" fill="none" stroke="#FFFFFF" strokeWidth="3" />
            
            {/* Status bar */}
            <rect x="35" y="8" width="40" height="4" rx="2" fill="#FFFFFF" />
            <circle cx="82" cy="10" r="1.5" fill="#22FF22" />
            
            {/* Screen Content - App icons (grid of colorful dots) */}
            <g transform="translate(25, 20)">
              {/* Row 1 */}
              <circle cx="12" cy="10" r="5" fill="#FF5E5B" />
              <circle cx="28" cy="10" r="5" fill="#FFE066" />
              <circle cx="44" cy="10" r="5" fill="#2EC4B6" />
              <circle cx="60" cy="10" r="5" fill="#0077B6" />

              {/* Row 2 */}
              <circle cx="12" cy="26" r="5" fill="#7209B7" />
              <circle cx="28" cy="26" r="5" fill="#F72585" />
              <circle cx="44" cy="26" r="5" fill="#4CC9F0" />
              <circle cx="60" cy="26" r="5" fill="#4CAF50" />

              {/* Row 3 */}
              <circle cx="12" cy="42" r="5" fill="#F4A261" />
              <circle cx="28" cy="42" r="5" fill="#E76F51" />
              <circle cx="44" cy="42" r="5" fill="#2A9D8F" />
              <polygon points="56,44 64,44 60,37" fill="#FFFFFF" />

              {/* Central Widget/Mockup Text lines */}
              <rect x="8" y="54" width="20" height="4" rx="1" fill="#FFFFFF" opacity="0.6" />
              <rect x="8" y="61" width="44" height="3" rx="1" fill="#FFFFFF" opacity="0.4" />
              <rect x="8" y="67" width="30" height="3" rx="1" fill="#FFFFFF" opacity="0.4" />
            </g>
          </g>
        </g>

        {/* 5. BOTTOM-RIGHT HEXAGON (PCB MMIC Integrated Circuit Grid) */}
        {/* Location: cx=332.5, cy=297.63 */}
        <g transform="translate(277.5, 250)">
          <polygon points="27.5,0 82.5,0 110,47.63 82.5,95.26 27.5,95.26 0,47.63" fill="#FFFFFF" />
          <g clipPath="url(#hexClip)">
            {/* PCB substrate backdrop */}
            <rect width="110" height="96" fill="url(#pcbGrad)" stroke="none" />
            
            {/* Circuit pattern / Microstrips in Gold */}
            <g stroke="url(#goldGrad)" strokeWidth="2.5" fill="none">
              {/* Spiral inductors (concentric square lines) */}
              <rect x="15" y="15" width="22" height="22" rx="2" />
              <rect x="19" y="19" width="14" height="14" rx="1" />
              
              <rect x="73" y="15" width="22" height="22" rx="2" />
              <rect x="77" y="19" width="14" height="14" rx="1" />

              <rect x="15" y="58" width="22" height="22" rx="2" />
              <rect x="73" y="58" width="22" height="22" rx="2" />

              {/* Connecting transmission lines */}
              <path d="M 37,26 L 73,26" strokeWidth="4" />
              <path d="M 55,26 L 55,69" strokeWidth="3" />
              <path d="M 37,69 L 73,69" strokeWidth="4" />
              <path d="M 15,48 L 95,48" strokeWidth="1.5" />
            </g>
            {/* Gold micro-pads */}
            <rect x="46" y="42" width="18" height="12" rx="1" fill="url(#goldGrad)" stroke="none" />
            <circle cx="26" cy="26" r="3.5" fill="#FFE066" stroke="none" />
            <circle cx="84" cy="26" r="3.5" fill="#FFE066" stroke="none" />
            <circle cx="26" cy="69" r="3.5" fill="#FFE066" stroke="none" />
            <circle cx="84" cy="69" r="3.5" fill="#FFE066" stroke="none" />
          </g>
        </g>

        {/* 6. BOTTOM HEXAGON (Cellular Lattice Tower) */}
        {/* Location: cx=250, cy=345.26 */}
        <g transform="translate(195, 297.63)">
          <polygon points="27.5,0 82.5,0 110,47.63 82.5,95.26 27.5,95.26 0,47.63" fill="#FFFFFF" />
          <g clipPath="url(#hexClip)">
            {/* Sky Background */}
            <rect width="110" height="96" fill="url(#skyGrad)" stroke="none" />
            
            {/* Cell Tower structure */}
            <g stroke="#FFFFFF" strokeWidth="1" fill="none">
              {/* Outer structural legs */}
              <line x1="42" y1="90" x2="51" y2="12" strokeWidth="2.5" />
              <line x1="68" y1="90" x2="59" y2="12" strokeWidth="2.5" />
              
              {/* Horizontal cross girts */}
              <line x1="43.5" y1="75" x2="66.5" y2="75" strokeWidth="1.5" />
              <line x1="45" y1="60" x2="65" y2="60" strokeWidth="1.5" />
              <line x1="47.5" y1="42" x2="62.5" y2="42" strokeWidth="1.5" />
              <line x1="50" y1="24" x2="60" y2="24" strokeWidth="1.5" />
              
              {/* Cross bracing diagonals */}
              <line x1="42" y1="90" x2="66.5" y2="75" />
              <line x1="68" y1="90" x2="43.5" y2="75" />
              <line x1="43.5" y1="75" x2="65" y2="60" />
              <line x1="66.5" y1="75" x2="45" y2="60" />
              <line x1="45" y1="60" x2="62.5" y2="42" />
              <line x1="65" y1="60" x2="47.5" y2="42" />
              <line x1="47.5" y1="42" x2="60" y2="24" />
              <line x1="62.5" y1="42" x2="50" y2="24" />
              <line x1="50" y1="24" x2="59" y2="12" />
              <line x1="60" y1="24" x2="51" y2="12" />

              {/* Antenna Panels at the top peak */}
              <rect x="47" y="12" width="4" height="12" fill="#E8650A" stroke="none" />
              <rect x="59" y="12" width="4" height="12" fill="#E8650A" stroke="none" />
              <rect x="52.5" y="4" width="5" height="10" fill="#FFFFFF" stroke="none" />
              <line x1="55" y1="4" x2="55" y2="20" strokeWidth="1.5" stroke="#FFFFFF" />
            </g>
            {/* Signal waves from antenna */}
            <path d="M 45,5 A 15 15 0 0 1 65,5" fill="none" stroke="#E8650A" strokeWidth="1.5" opacity="0.8" />
            <path d="M 40,0 A 20 20 0 0 1 70,0" fill="none" stroke="#E8650A" strokeWidth="1.5" opacity="0.5" />
          </g>
        </g>

        {/* 7. CENTER HERO HEXAGON (SAGE Core Branding Logo) */}
        {/* Location: cx=250, cy=250 */}
        <g transform="translate(195, 202.37)">
          <polygon points="27.5,0 82.5,0 110,47.63 82.5,95.26 27.5,95.26 0,47.63" fill="#FFFFFF" />
          <g clipPath="url(#hexClip)">
            <rect width="110" height="96" fill="#FFFFFF" stroke="none" />
            
            {/* Core logo design assembly */}
            {/* Orange arched crest (sunburst) */}
            <path 
              d="M 22,46 A 34 34 0 0 1 88,46" 
              fill="none" 
              stroke="#E8650A" 
              strokeWidth="5" 
              strokeLinecap="round" 
            />
            
            {/* Open Book Vector Symbol in deep blue */}
            {/* Left page arch */}
            <path 
              d="M 55,52 Q 44,45 28,51 L 28,34 Q 44,28 55,35 Z" 
              fill="#0F99E8" 
              stroke="none" 
            />
            {/* Right page arch */}
            <path 
              d="M 55,52 Q 66,45 82,51 L 82,34 Q 66,28 55,35 Z" 
              fill="#0F99E8" 
              stroke="none" 
            />
            
            {/* Wave arcs emanating from the book (Wi-Fi symbol) */}
            <path d="M 44,26 A 14 14 0 0 1 66,26" fill="none" stroke="#00A2E8" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 40,21 A 18 18 0 0 1 70,21" fill="none" stroke="#00A2E8" strokeWidth="2" strokeLinecap="round" />
            <path d="M 48,30 A 8 8 0 0 1 62,30" fill="none" stroke="#00A2E8" strokeWidth="3" strokeLinecap="round" />

            {/* SAGE text */}
            <text 
              x="55" 
              y="74" 
              fontFamily="system-ui, -apple-system, sans-serif" 
              fontWeight="900" 
              fontSize="17.5" 
              fill="#E8650A" 
              letterSpacing="1.2px" 
              textAnchor="middle"
            >
              SAGE
            </text>
          </g>
        </g>

      </g>
    </svg>
  );
}
