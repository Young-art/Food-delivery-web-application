import React from 'react';

export const AnimatedDeliveryRider = ({ 
  size = 'medium', // 'small', 'medium', 'large', 'banner'
  showRoad = true,
  speed = 'fast',
  className = '',
  style = {}
}) => {
  const getScale = () => {
    switch (size) {
      case 'small': return 0.65;
      case 'large': return 1.25;
      case 'banner': return 1.0;
      default: return 0.9;
    }
  };

  return (
    <div 
      className={`animated-scooter-container ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        userSelect: 'none',
        ...style
      }}
    >
      {/* Animated Wind / Speed Particles Behind Bike */}
      <div className="scooter-wind-trails">
        <div className="wind-line wind-line-1" />
        <div className="wind-line wind-line-2" />
        <div className="wind-line wind-line-3" />
        <div className="wind-particle particle-1" />
        <div className="wind-particle particle-2" />
      </div>

      {/* Main Scooter & Rider SVG with Bobbing / Suspension Animation */}
      <div className="scooter-bike-wrapper">
        <svg 
          width={280 * getScale()} 
          height={190 * getScale()} 
          viewBox="0 0 280 190" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="scooterBodyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF4B2B" />
              <stop offset="100%" stopColor="#FF416C" />
            </linearGradient>

            <linearGradient id="helmetGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF4B2B" />
              <stop offset="100%" stopColor="#D9381E" />
            </linearGradient>

            <linearGradient id="bagGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            <linearGradient id="chromeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            <filter id="headlightGlow" x="-30%" y="-30%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Headlight Beam Projecting Forward */}
          <path 
            d="M 235 110 L 290 85 L 290 145 Z" 
            fill="rgba(255, 235, 150, 0.18)" 
            filter="url(#headlightGlow)"
          />

          {/* ================= SCOOTER REAR WHEEL ================= */}
          <g className="scooter-wheel wheel-rear" transform="translate(65, 140)">
            {/* Outer Tyre */}
            <circle cx="0" cy="0" r="28" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
            <circle cx="0" cy="0" r="20" fill="#334155" />
            {/* Rim */}
            <circle cx="0" cy="0" r="14" fill="url(#chromeGrad)" />
            {/* Spokes */}
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#0F172A" strokeWidth="2.5" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#0F172A" strokeWidth="2.5" />
            <line x1="-10" y1="-10" x2="10" y2="10" stroke="#0F172A" strokeWidth="2" />
            <line x1="-10" y1="10" x2="10" y2="-10" stroke="#0F172A" strokeWidth="2" />
            {/* Hub Cap */}
            <circle cx="0" cy="0" r="5" fill="#FF4B2B" />
          </g>

          {/* ================= SCOOTER FRONT WHEEL ================= */}
          <g className="scooter-wheel wheel-front" transform="translate(215, 140)">
            {/* Outer Tyre */}
            <circle cx="0" cy="0" r="28" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
            <circle cx="0" cy="0" r="20" fill="#334155" />
            {/* Rim */}
            <circle cx="0" cy="0" r="14" fill="url(#chromeGrad)" />
            {/* Spokes */}
            <line x1="-14" y1="0" x2="14" y2="0" stroke="#0F172A" strokeWidth="2.5" />
            <line x1="0" y1="-14" x2="0" y2="14" stroke="#0F172A" strokeWidth="2.5" />
            <line x1="-10" y1="-10" x2="10" y2="10" stroke="#0F172A" strokeWidth="2" />
            <line x1="-10" y1="10" x2="10" y2="-10" stroke="#0F172A" strokeWidth="2" />
            {/* Hub Cap */}
            <circle cx="0" cy="0" r="5" fill="#FF4B2B" />
          </g>

          {/* ================= SCOOTER CHASSIS & BODY ================= */}
          {/* Exhaust Pipe with subtle smoke */}
          <path d="M 50 148 L 75 142 L 85 135" stroke="url(#chromeGrad)" strokeWidth="5" strokeLinecap="round" />
          <circle cx="44" cy="148" r="3" fill="#64748B" />

          {/* Rear Mudguard / Fender */}
          <path d="M 40 135 C 40 115, 75 110, 92 125" stroke="#334155" strokeWidth="7" fill="none" strokeLinecap="round" />

          {/* Floorboard Base */}
          <path d="M 85 138 L 175 138 L 185 125 L 120 125 Z" fill="#1E293B" />
          <path d="M 115 134 L 175 134" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />

          {/* Main Curved Body Shell */}
          <path 
            d="M 68 122 C 70 95, 105 95, 125 105 L 140 125 L 85 125 Z" 
            fill="url(#scooterBodyGrad)" 
          />

          {/* Scooter Seat */}
          <path 
            d="M 75 96 C 90 92, 130 92, 138 98 C 138 104, 125 108, 80 106 Z" 
            fill="#0F172A" 
          />

          {/* Front Steering Column & Apron */}
          <path 
            d="M 172 135 L 205 78 L 222 82 L 202 142 Z" 
            fill="url(#scooterBodyGrad)" 
          />
          {/* Front Fender */}
          <path d="M 195 125 C 205 112, 230 115, 235 135" stroke="url(#scooterBodyGrad)" strokeWidth="8" fill="none" strokeLinecap="round" />

          {/* Handlebar & Grips */}
          <path d="M 198 75 L 208 58 L 224 60" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <circle cx="224" cy="60" r="4" fill="#FF4B2B" />

          {/* Headlight Housing & Bulb */}
          <path d="M 215 76 L 230 78 L 228 90 L 210 88 Z" fill="#0F172A" />
          <circle cx="228" cy="84" r="5" fill="#FEF08A" filter="url(#headlightGlow)" />

          {/* ================= BRANDED FOODIEZ DELIVERY BAG ================= */}
          {/* Mounted Heavy-Duty Thermal Delivery Box / Bag on Rear Rack */}
          <g className="scooter-delivery-bag" transform="translate(48, 48)">
            {/* Bag Body */}
            <rect x="0" y="0" width="48" height="52" rx="6" fill="url(#bagGrad)" stroke="#FF4B2B" strokeWidth="2.5" />
            
            {/* Top Zipper / Flap */}
            <path d="M 0 14 L 48 14" stroke="#FF4B2B" strokeWidth="2" />
            <rect x="18" y="2" width="12" height="4" rx="2" fill="#E2E8F0" />
            
            {/* Reflective Safety Stripes */}
            <line x1="4" y1="42" x2="44" y2="42" stroke="#10B981" strokeWidth="2.5" strokeDasharray="3,2" />

            {/* Branded "Foodiez." Typography / Badge on Bag */}
            <rect x="6" y="20" width="36" height="15" rx="3" fill="#FF4B2B" />
            <text 
              x="24" 
              y="31" 
              fill="#FFFFFF" 
              fontSize="8" 
              fontWeight="900" 
              fontFamily="Outfit, sans-serif" 
              textAnchor="middle" 
              letterSpacing="0.5"
            >
              Foodiez.
            </text>
          </g>

          {/* ================= DELIVERY RIDER MAN ================= */}
          {/* Legs & Trousers */}
          <path 
            d="M 112 98 L 138 128 L 160 130" 
            stroke="#1E293B" 
            strokeWidth="12" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Shoe */}
          <path d="M 154 130 L 168 130 L 168 134 L 152 134 Z" fill="#0F172A" rx="2" />

          {/* Rider Jacket / Torso (leaning forward in riding posture) */}
          <path 
            d="M 98 88 L 126 56 L 158 68 L 136 102 Z" 
            fill="url(#scooterBodyGrad)" 
            stroke="#D9381E" 
            strokeWidth="1.5"
          />

          {/* Foodiez Logo on Jacket Back/Chest */}
          <circle cx="132" cy="74" r="5" fill="#FFFFFF" />
          <path d="M 130 74 L 134 74 M 132 72 L 132 76" stroke="#FF4B2B" strokeWidth="1.5" />

          {/* Rider Arms Reaching to Handlebars */}
          <path 
            d="M 142 62 L 180 66 L 218 62" 
            stroke="#FF4B2B" 
            strokeWidth="9" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Hands / Riding Gloves */}
          <circle cx="218" cy="62" r="5" fill="#0F172A" />

          {/* Rider Neck */}
          <rect x="135" y="44" width="8" height="10" fill="#FDBA74" rx="2" />

          {/* Safety Helmet & Visor */}
          <g className="scooter-rider-head">
            {/* Main Full Helmet */}
            <circle cx="140" cy="36" r="18" fill="url(#helmetGrad)" stroke="#B91C1C" strokeWidth="1.5" />
            
            {/* Aerodynamic Fin on Helmet Back */}
            <path d="M 124 34 C 122 26, 130 20, 140 18 L 134 26 Z" fill="#991B1B" />
            
            {/* Tinted Protective Visor (facing right in riding direction) */}
            <path 
              d="M 142 28 C 154 28, 158 36, 156 46 L 144 46 C 146 38, 144 32, 142 28 Z" 
              fill="#0F172A" 
              stroke="#38BDF8" 
              strokeWidth="1.5"
            />
            {/* Visor Glint Reflection */}
            <path d="M 146 32 C 150 34, 152 38, 150 42" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
            
            {/* Safety Chin Strap */}
            <path d="M 132 44 C 136 50, 144 50, 148 46" stroke="#0F172A" strokeWidth="2" fill="none" />
          </g>
        </svg>
      </div>

      {/* ================= SPEEDING ROAD WITH DASHES ================= */}
      {showRoad && (
        <div className="scooter-road-track">
          <div className="road-line-solid" />
          <div className="road-dashes-container">
            <div className="road-dash" />
            <div className="road-dash" />
            <div className="road-dash" />
            <div className="road-dash" />
            <div className="road-dash" />
            <div className="road-dash" />
          </div>
        </div>
      )}
    </div>
  );
};
