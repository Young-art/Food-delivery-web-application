import React from 'react';

export const FloatingDeliveryRider = ({
  width = 340,
  height = 300,
  color = '#FFFFFF',
  accentColor = '#FF4B2B',
  brandText = 'Foodiez',
  className = '',
  style = {}
}) => {
  return (
    <div
      className={`floating-rider-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        userSelect: 'none',
        pointerEvents: 'none',
        ...style
      }}
    >
      {/* Animated Subtle Wind / Motion Lines behind the scooter */}
      <div className="floating-rider-motion-lines">
        <div className="rider-speed-line line-top" />
        <div className="rider-speed-line line-mid" />
        <div className="rider-speed-line line-bot" />
      </div>

      <svg
        width={width}
        height={height}
        viewBox="0 0 400 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="floating-rider-svg"
        style={{
          overflow: 'visible',
          filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 15px rgba(255, 75, 43, 0.3))'
        }}
      >
        <defs>
          <linearGradient id="riderGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF9F5" />
            <stop offset="100%" stopColor="#F5ECE5" />
          </linearGradient>

          <linearGradient id="accentOrangeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF4B2B" />
            <stop offset="100%" stopColor="#FF416C" />
          </linearGradient>

          <filter id="headlightBeam" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Headlight Forward Glow Beam */}
        <path
          d="M 305 155 L 390 120 L 390 200 Z"
          fill="rgba(255, 235, 160, 0.2)"
          filter="url(#headlightBeam)"
        />

        {/* ================= SCOOTER REAR WHEEL ================= */}
        <g className="scooter-spin-wheel" transform="translate(125, 295)">
          {/* Tyre */}
          <circle cx="0" cy="0" r="34" fill="#1E293B" stroke={color} strokeWidth="7" />
          {/* Rim */}
          <circle cx="0" cy="0" r="16" fill="url(#riderGrad)" stroke="#0F172A" strokeWidth="4" />
          <circle cx="0" cy="0" r="6" fill={accentColor} />
          {/* Motion Spokes */}
          <line x1="-16" y1="0" x2="16" y2="0" stroke="#0F172A" strokeWidth="3" />
          <line x1="0" y1="-16" x2="0" y2="16" stroke="#0F172A" strokeWidth="3" />
        </g>

        {/* ================= SCOOTER FRONT WHEEL ================= */}
        <g className="scooter-spin-wheel" transform="translate(325, 295)">
          {/* Tyre */}
          <circle cx="0" cy="0" r="34" fill="#1E293B" stroke={color} strokeWidth="7" />
          {/* Rim */}
          <circle cx="0" cy="0" r="16" fill="url(#riderGrad)" stroke="#0F172A" strokeWidth="4" />
          <circle cx="0" cy="0" r="6" fill={accentColor} />
          {/* Motion Spokes */}
          <line x1="-16" y1="0" x2="16" y2="0" stroke="#0F172A" strokeWidth="3" />
          <line x1="0" y1="-16" x2="0" y2="16" stroke="#0F172A" strokeWidth="3" />
        </g>

        {/* ================= REAR WHEEL UNDER-FENDER & STRUT ================= */}
        {/* Rear Frame Outline */}
        <path
          d="M 68 285 L 175 285 L 175 260 L 75 260 Z"
          fill="url(#riderGrad)"
          stroke="#0F172A"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Rear Curved Teardrop Cowl / Mudguard (Exact match to reference photo) */}
        <path
          d="M 75 260 C 80 215, 130 205, 175 220 L 175 260 Z"
          fill="#1E293B"
          stroke={color}
          strokeWidth="7"
          strokeLinejoin="round"
        />

        {/* Rear Light Bulb Housing */}
        <path
          d="M 65 240 C 60 240, 58 255, 68 260 Z"
          fill="url(#accentOrangeGrad)"
          stroke={color}
          strokeWidth="5"
        />

        {/* ================= SCOOTER FLOORBOARD & FRONT APRON ================= */}
        {/* Low Floorboard */}
        <path
          d="M 175 285 C 190 285, 220 285, 260 270 C 275 260, 275 235, 265 200 L 290 220 C 310 255, 290 290, 240 295 L 175 295 Z"
          fill="url(#riderGrad)"
          stroke="#0F172A"
          strokeWidth="7"
          strokeLinejoin="round"
        />

        {/* Front Fender / Mudguard (Tilted over front wheel like reference) */}
        <path
          d="M 275 280 C 285 240, 345 235, 360 265 L 320 295 C 295 305, 280 295, 275 280 Z"
          fill="url(#riderGrad)"
          stroke="#0F172A"
          strokeWidth="7"
          strokeLinejoin="round"
        />
        <path
          d="M 285 275 C 295 248, 340 245, 350 268"
          stroke="#1E293B"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Front Steering Column / Head Unit (Exact rectangular match to reference) */}
        <path
          d="M 265 200 L 295 150 L 310 152 L 285 210 Z"
          fill="url(#riderGrad)"
          stroke="#0F172A"
          strokeWidth="6"
        />
        {/* Handlebar & Rectangular Headlight Unit */}
        <rect
          x="285"
          y="135"
          width="24"
          height="40"
          rx="5"
          fill="url(#riderGrad)"
          stroke="#0F172A"
          strokeWidth="7"
        />
        <rect
          x="292"
          y="142"
          width="10"
          height="26"
          rx="2"
          fill="#1E293B"
        />

        {/* ================= DELIVERY BOX ON REAR RACK ================= */}
        {/* Rear Support Strut */}
        <line x1="85" y1="235" x2="98" y2="195" stroke="#0F172A" strokeWidth="8" strokeLinecap="round" />

        {/* Large Square Delivery Thermal Box (Exact match to reference photo) */}
        <rect
          x="42"
          y="98"
          width="100"
          height="92"
          rx="12"
          fill="url(#riderGrad)"
          stroke="#0F172A"
          strokeWidth="8"
        />
        {/* Inner Top Stripe on Box */}
        <rect
          x="50"
          y="108"
          width="84"
          height="14"
          rx="4"
          fill="#1E293B"
        />
        {/* Brand Text / Foodiez Badge on Box */}
        <rect
          x="50"
          y="135"
          width="84"
          height="38"
          rx="6"
          fill="url(#accentOrangeGrad)"
        />
        <text
          x="92"
          y="160"
          fill="#FFFFFF"
          fontSize="14"
          fontWeight="900"
          fontFamily="Outfit, sans-serif"
          textAnchor="middle"
          letterSpacing="0.8"
        >
          {brandText}
        </text>
        <circle cx="120" cy="154" r="3" fill="#FFF" />

        {/* ================= RIDER WITH HELMET ================= */}
        {/* Rider Legs Sitting in Riding Pose (Exact match to reference) */}
        <path
          d="M 148 190 C 150 205, 175 260, 205 265 L 245 265 L 255 240 L 220 235 C 200 230, 185 185, 175 168 Z"
          fill="url(#riderGrad)"
          stroke="#0F172A"
          strokeWidth="7"
          strokeLinejoin="round"
        />

        {/* Rider Torso Leaning Forward (Exact match to reference) */}
        <path
          d="M 152 168 L 175 92 C 185 85, 205 85, 215 95 L 200 168 Z"
          fill="url(#riderGrad)"
          stroke="#0F172A"
          strokeWidth="7"
          strokeLinejoin="round"
        />

        {/* Rider Arm Extending to Handlebars (Exact match to reference) */}
        <path
          d="M 188 120 L 268 145 L 268 160 L 195 138 Z"
          fill="url(#riderGrad)"
          stroke="#0F172A"
          strokeWidth="7"
          strokeLinejoin="round"
        />

        {/* Rider Head / Helmet with Cutout & Cap Visor (Exact match to reference) */}
        <g transform="translate(170, 20)">
          {/* Helmet Outer Shell with front peak */}
          <path
            d="M 35 3 C 14 3, -2 20, -2 45 C -2 68, 12 85, 35 85 C 48 85, 60 76, 62 60 L 74 60 C 78 60, 80 52, 74 50 L 62 50 C 62 25, 52 3, 35 3 Z"
            fill="url(#riderGrad)"
            stroke="#0F172A"
            strokeWidth="7"
            strokeLinejoin="round"
          />

          {/* Inner Face / Visor Profile Cutout (Exact match to reference) */}
          <path
            d="M 36 28 C 30 28, 25 35, 25 45 C 25 55, 30 62, 38 62 C 48 62, 52 52, 52 45 C 52 35, 45 28, 36 28 Z"
            fill="#0F172A"
          />
        </g>
      </svg>
    </div>
  );
};
