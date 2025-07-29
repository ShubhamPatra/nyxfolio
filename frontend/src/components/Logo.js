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
    
    {/* Developer Icon: Angular brackets with code cursor */}
    <g className="logo-icon">
      {/* Left bracket */}
      <path 
        d={size === 'sm' ? 'M6 7 L1.5 14 L6 21' : size === 'md' ? 'M7 9 L1.5 18 L7 27' : 'M8 12 L2 24 L8 36'} 
        stroke="var(--color-secondary-200)" 
        strokeWidth={size === 'sm' ? '2' : '2.5'} 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Right bracket */}
      <path 
        d={size === 'sm' ? 'M16 7 L20.5 14 L16 21' : size === 'md' ? 'M18 9 L23.5 18 L18 27' : 'M22 12 L28 24 L22 36'} 
        stroke="var(--color-secondary-200)" 
        strokeWidth={size === 'sm' ? '2' : '2.5'} 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      
      {/* Code cursor/terminal line */}
      <rect 
        x={size === 'sm' ? '9' : size === 'md' ? '10' : '12'} 
        y={size === 'sm' ? '12' : size === 'md' ? '16' : '22'} 
        width={size === 'sm' ? '4' : size === 'md' ? '5' : '6'} 
        height={size === 'sm' ? '3' : '4'} 
        fill="var(--color-secondary-200)" 
        rx="1"
      >
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
      </rect>
      
      {/* Code dots */}
      <circle 
        cx={size === 'sm' ? '15' : size === 'md' ? '17' : '20'} 
        cy={size === 'sm' ? '10' : size === 'md' ? '13' : '18'} 
        r={size === 'sm' ? '0.8' : '1'} 
        fill="var(--text-primary)" 
        opacity="0.6"
      />
      <circle 
        cx={size === 'sm' ? '15' : size === 'md' ? '17' : '20'} 
        cy={size === 'sm' ? '14' : size === 'md' ? '18' : '24'} 
        r={size === 'sm' ? '0.8' : '1'} 
        fill="var(--text-primary)" 
        opacity="0.6"
      />
      <circle 
        cx={size === 'sm' ? '15' : size === 'md' ? '17' : '20'} 
        cy={size === 'sm' ? '18' : size === 'md' ? '23' : '30'} 
        r={size === 'sm' ? '0.8' : '1'} 
        fill="var(--text-primary)" 
        opacity="0.6"
      />
    </g>
    
    {/* Text: Shubham.dev */}
    <g className="logo-text">
      {/* Shubham */}
      <text 
        x={size === 'sm' ? '28' : size === 'md' ? '32' : '40'} 
        y={size === 'sm' ? '12' : size === 'md' ? '15' : '20'} 
        fontFamily="var(--font-heading)" 
        fontSize={size === 'sm' ? '12' : size === 'md' ? '14' : '16'} 
        fontWeight="600" 
        fill="var(--text-primary)" 
        letterSpacing="-0.025em"
      >
        Shubham
      </text>
      
      {/* .dev with accent color */}
      <text 
        x={size === 'sm' ? '28' : size === 'md' ? '32' : '40'} 
        y={size === 'sm' ? '22' : size === 'md' ? '27' : '34'} 
        fontFamily="var(--font-secondary)" 
        fontSize={size === 'sm' ? '10' : size === 'md' ? '12' : '14'} 
        fontWeight="500" 
        fill="var(--color-secondary-200)" 
        letterSpacing="0.025em"
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
      
      {/* Developer Icon: Angular brackets with code cursor - optimized for small sizes */}
      <g className="logo-icon">
        {/* Left bracket */}
        <path 
          d="M6 8 L2 16 L6 24" 
          stroke="var(--color-secondary-200)" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* Right bracket */}
        <path 
          d="M26 8 L30 16 L26 24" 
          stroke="var(--color-secondary-200)" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        {/* Code cursor/terminal line */}
        <rect 
          x="13" 
          y="14" 
          width="6" 
          height="4" 
          fill="var(--color-secondary-200)" 
          rx="1"
        >
          <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite"/>
        </rect>
        
        {/* Code dots - simplified for small size */}
        <circle cx="22" cy="12" r="1.2" fill="var(--text-primary)" opacity="0.7"/>
        <circle cx="22" cy="16" r="1.2" fill="var(--text-primary)" opacity="0.7"/>
        <circle cx="22" cy="20" r="1.2" fill="var(--text-primary)" opacity="0.7"/>
      </g>
      
      {/* Background circle for better contrast at small sizes */}
      <circle 
        cx="16" 
        cy="16" 
        r="15" 
        fill="none" 
        stroke="var(--color-secondary-200)" 
        strokeWidth="0.5" 
        opacity="0.2"
      />
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
  
  .logo-component:hover .logo-svg .logo-icon {
    transform: scale(1.05);
    transition: transform var(--duration-200) var(--ease-out);
  }
  
  .logo-component:hover .logo-svg .logo-text text:last-child {
    fill: var(--color-secondary-100);
    transition: fill var(--duration-200) var(--ease-out);
  }
  
  .logo-component:focus-visible {
    outline: 2px solid var(--color-secondary-200);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
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
    .logo-svg .logo-icon rect {
      animation: none !important;
    }
    .logo-component:hover .logo-svg .logo-icon {
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