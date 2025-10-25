import React from 'react';
import PropTypes from 'prop-types';

// SVG Logo Components
const FullLogo = ({ className, size }) => (
  <svg 
    width={size === 'sm' ? '120' : size === 'md' ? '160' : '200'} 
    height={size === 'sm' ? '28' : size === 'md' ? '36' : '48'} 
    viewBox={size === 'sm' ? '0 0 120 28' : size === 'md' ? '0 0 160 36' : '0 0 200 48'} 
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    aria-labelledby="logo-title"
    className={className}
  >
    <title id="logo-title">Shubham.dev - Full Stack Developer</title>
    
    <defs>
      {/* Gradient for icon */}
      <linearGradient id={`iconGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'var(--color-secondary-200)', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'var(--color-secondary-400)', stopOpacity: 1 }} />
      </linearGradient>
      
      {/* Glow filter for icon */}
      <filter id={`iconGlow-${size}`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      {/* Text gradient */}
      <linearGradient id={`textGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#e5e7eb', stopOpacity: 0.9 }} />
      </linearGradient>
    </defs>
    
    {/* Background glow circle */}
    <circle 
      cx={size === 'sm' ? '11' : size === 'md' ? '13' : '15'} 
      cy={size === 'sm' ? '14' : size === 'md' ? '18' : '24'} 
      r={size === 'sm' ? '12' : size === 'md' ? '14' : '16'} 
      fill="none"
      stroke={`url(#iconGradient-${size})`}
      strokeWidth="0.5"
      opacity="0.15"
      className="logo-glow-circle"
    />
    
    {/* Developer Icon: Angular brackets with code cursor */}
    <g className="logo-icon" filter={`url(#iconGlow-${size})`}>
      {/* Left bracket with enhanced design */}
      <path 
        d={size === 'sm' ? 'M6 7 L1.5 14 L6 21' : size === 'md' ? 'M7 9 L1.5 18 L7 27' : 'M8 12 L2 24 L8 36'} 
        stroke={`url(#iconGradient-${size})`}
        strokeWidth={size === 'sm' ? '2.5' : '3'} 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="logo-bracket-left"
      />
      
      {/* Right bracket with enhanced design */}
      <path 
        d={size === 'sm' ? 'M16 7 L20.5 14 L16 21' : size === 'md' ? 'M18 9 L23.5 18 L18 27' : 'M22 12 L28 24 L22 36'} 
        stroke={`url(#iconGradient-${size})`}
        strokeWidth={size === 'sm' ? '2.5' : '3'} 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="logo-bracket-right"
      />
      
      {/* Code cursor/terminal line with gradient */}
      <rect 
        x={size === 'sm' ? '9' : size === 'md' ? '10' : '12'} 
        y={size === 'sm' ? '12' : size === 'md' ? '16' : '22'} 
        width={size === 'sm' ? '4' : size === 'md' ? '5' : '6'} 
        height={size === 'sm' ? '3' : '4'} 
        fill={`url(#iconGradient-${size})`}
        rx="1"
        className="logo-cursor"
      >
        <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite"/>
      </rect>
      
      {/* Enhanced code dots with glow */}
      <circle 
        cx={size === 'sm' ? '15' : size === 'md' ? '17' : '20'} 
        cy={size === 'sm' ? '10' : size === 'md' ? '13' : '18'} 
        r={size === 'sm' ? '1' : '1.2'} 
        fill="var(--color-secondary-200)" 
        opacity="0.8"
        className="logo-dot"
      />
      <circle 
        cx={size === 'sm' ? '15' : size === 'md' ? '17' : '20'} 
        cy={size === 'sm' ? '14' : size === 'md' ? '18' : '24'} 
        r={size === 'sm' ? '1' : '1.2'} 
        fill="var(--color-secondary-200)" 
        opacity="0.8"
        className="logo-dot"
      />
      <circle 
        cx={size === 'sm' ? '15' : size === 'md' ? '17' : '20'} 
        cy={size === 'sm' ? '18' : size === 'md' ? '23' : '30'} 
        r={size === 'sm' ? '1' : '1.2'} 
        fill="var(--color-secondary-200)" 
        opacity="0.8"
        className="logo-dot"
      />
    </g>
    
    {/* Text: Shubham.dev */}
    <g className="logo-text">
      {/* Shubham with gradient */}
      <text 
        x={size === 'sm' ? '28' : size === 'md' ? '32' : '40'} 
        y={size === 'sm' ? '12' : size === 'md' ? '15' : '20'} 
        fontFamily="var(--font-heading)" 
        fontSize={size === 'sm' ? '12' : size === 'md' ? '14' : '16'} 
        fontWeight="700" 
        fill={`url(#textGradient-${size})`}
        letterSpacing="-0.025em"
        className="logo-name"
      >
        Shubham
      </text>
      
      {/* .dev with accent color and enhanced styling */}
      <text 
        x={size === 'sm' ? '28' : size === 'md' ? '32' : '40'} 
        y={size === 'sm' ? '22' : size === 'md' ? '27' : '34'} 
        fontFamily="var(--font-secondary)" 
        fontSize={size === 'sm' ? '10' : size === 'md' ? '12' : '14'} 
        fontWeight="600" 
        fill="var(--color-secondary-200)" 
        letterSpacing="0.05em"
        className="logo-domain"
      >
        .dev
      </text>
    </g>
  </svg>
);

const IconLogo = ({ className, size }) => {
  const iconSize = size === 'sm' ? '24' : size === 'md' ? '28' : '32';
  
  return (
    <svg 
      width={iconSize} 
      height={iconSize} 
      viewBox="0 0 32 32" 
      xmlns="http://www.w3.org/2000/svg" 
      role="img" 
      aria-labelledby="icon-title"
      className={className}
    >
      <title id="icon-title">Shubham.dev Logo</title>
      
      <defs>
        {/* Gradient for icon */}
        <linearGradient id={`iconGradientIcon-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'var(--color-secondary-200)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'var(--color-secondary-400)', stopOpacity: 1 }} />
        </linearGradient>
        
        {/* Glow filter */}
        <filter id={`iconGlowIcon-${size}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Radial gradient for background */}
        <radialGradient id={`bgGradient-${size}`}>
          <stop offset="0%" style={{ stopColor: 'var(--color-secondary-200)', stopOpacity: 0.1 }} />
          <stop offset="100%" style={{ stopColor: 'var(--color-secondary-200)', stopOpacity: 0 }} />
        </radialGradient>
      </defs>
      
      {/* Background glow */}
      <circle 
        cx="16" 
        cy="16" 
        r="14" 
        fill={`url(#bgGradient-${size})`}
        className="logo-bg-glow"
      />
      
      {/* Outer ring */}
      <circle 
        cx="16" 
        cy="16" 
        r="15" 
        fill="none" 
        stroke={`url(#iconGradientIcon-${size})`}
        strokeWidth="0.5" 
        opacity="0.3"
        className="logo-outer-ring"
      />
      
      {/* Developer Icon: Angular brackets with code cursor - optimized for small sizes */}
      <g className="logo-icon" filter={`url(#iconGlowIcon-${size})`}>
        {/* Left bracket */}
        <path 
          d="M6 8 L2 16 L6 24" 
          stroke={`url(#iconGradientIcon-${size})`}
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="logo-bracket-left"
        />
        
        {/* Right bracket */}
        <path 
          d="M26 8 L30 16 L26 24" 
          stroke={`url(#iconGradientIcon-${size})`}
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="logo-bracket-right"
        />
        
        {/* Code cursor/terminal line */}
        <rect 
          x="13" 
          y="14" 
          width="6" 
          height="4" 
          fill={`url(#iconGradientIcon-${size})`}
          rx="1"
          className="logo-cursor"
        >
          <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite"/>
        </rect>
        
        {/* Code dots - enhanced */}
        <circle cx="22" cy="12" r="1.2" fill="var(--color-secondary-200)" opacity="0.8" className="logo-dot"/>
        <circle cx="22" cy="16" r="1.2" fill="var(--color-secondary-200)" opacity="0.8" className="logo-dot"/>
        <circle cx="22" cy="20" r="1.2" fill="var(--color-secondary-200)" opacity="0.8" className="logo-dot"/>
      </g>
    </svg>
  );
};

const Logo = ({ 
  size = 'md', 
  type = 'full', 
  className = '', 
  responsive = false,
  ...props 
}) => {
  const baseClasses = `logo-component ${className}`;
  
  // Handle responsive behavior
  if (responsive) {
    return (
      <div className={`${baseClasses} logo-responsive`} {...props}>
        <div className="logo-full-desktop">
          <FullLogo className="logo-svg" size={size} />
        </div>
        <div className="logo-icon-mobile">
          <IconLogo className="logo-svg" size={size} />
        </div>
      </div>
    );
  }
  
  // Render based on type prop
  if (type === 'icon') {
    return (
      <div className={baseClasses} {...props}>
        <IconLogo className="logo-svg" size={size} />
      </div>
    );
  }
  
  return (
    <div className={baseClasses} {...props}>
      <FullLogo className="logo-svg" size={size} />
    </div>
  );
};

Logo.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['full', 'icon']),
  className: PropTypes.string,
  responsive: PropTypes.bool,
};

// Add CSS styles for the component
const logoStyles = `
  .logo-component {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-transform);
  }
  
  .logo-svg {
    display: block;
    width: auto;
    height: auto;
    transition: var(--transition-transform);
  }
  
  /* Enhanced hover effects */
  .logo-component:hover .logo-svg .logo-icon {
    transform: scale(1.08);
    transition: transform var(--duration-300) var(--ease-out);
  }
  
  .logo-component:hover .logo-svg .logo-bracket-left {
    transform: translateX(-1px);
    transition: transform var(--duration-200) var(--ease-out);
  }
  
  .logo-component:hover .logo-svg .logo-bracket-right {
    transform: translateX(1px);
    transition: transform var(--duration-200) var(--ease-out);
  }
  
  .logo-component:hover .logo-svg .logo-domain {
    fill: var(--color-secondary-100);
    filter: drop-shadow(0 0 4px rgba(0, 255, 224, 0.4));
    transition: fill var(--duration-200) var(--ease-out), filter var(--duration-200) var(--ease-out);
  }
  
  .logo-component:hover .logo-svg .logo-glow-circle {
    opacity: 0.3;
    r: 18;
    transition: opacity var(--duration-300) var(--ease-out);
  }
  
  .logo-component:hover .logo-svg .logo-dot {
    opacity: 1;
    filter: drop-shadow(0 0 2px var(--color-secondary-200));
    transition: opacity var(--duration-200) var(--ease-out), filter var(--duration-200) var(--ease-out);
  }
  
  /* Active state */
  .logo-component:active .logo-svg .logo-icon {
    transform: scale(0.95);
    transition: transform var(--duration-100) var(--ease-out);
  }
  
  .logo-component:focus-visible {
    outline: 2px solid var(--color-secondary-200);
    outline-offset: 4px;
    border-radius: var(--radius-md);
  }
  
  /* Responsive behavior */
  .logo-responsive .logo-icon-mobile {
    display: none;
  }
  
  @media (max-width: 768px) {
    .logo-responsive .logo-full-desktop {
      display: none;
    }
    
    .logo-responsive .logo-icon-mobile {
      display: block;
    }
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .logo-svg .logo-icon path,
    .logo-svg .logo-icon rect {
      stroke: var(--text-primary) !important;
      fill: var(--text-primary) !important;
    }
    .logo-svg .logo-text text {
      fill: var(--text-primary) !important;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .logo-svg .logo-cursor {
      animation: none !important;
    }
    .logo-component:hover .logo-svg .logo-icon,
    .logo-component:hover .logo-svg .logo-bracket-left,
    .logo-component:hover .logo-svg .logo-bracket-right {
      transform: none !important;
    }
  }
  
  /* Size variants */
  .logo-component.logo-sm {
    height: var(--space-6);
  }
  
  .logo-component.logo-md {
    height: var(--space-8);
  }
  
  .logo-component.logo-lg {
    height: var(--space-10);
  }
`;

// Inject styles if not already present
if (typeof document !== 'undefined' && !document.getElementById('logo-component-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'logo-component-styles';
  styleSheet.textContent = logoStyles;
  document.head.appendChild(styleSheet);
}

export default Logo;