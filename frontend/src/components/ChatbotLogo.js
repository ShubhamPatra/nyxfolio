import React from 'react';
import PropTypes from 'prop-types';

// SVG ChatbotLogo Components
const FullLogo = ({ className, size }) => (
  <svg 
    width={size === 'sm' ? '100' : size === 'md' ? '140' : '180'} 
    height={size === 'sm' ? '28' : size === 'md' ? '36' : '48'} 
    viewBox={size === 'sm' ? '0 0 100 28' : size === 'md' ? '0 0 140 36' : '0 0 180 48'} 
    xmlns="http://www.w3.org/2000/svg" 
    role="img" 
    aria-labelledby="chatbot-logo-title"
    className={className}
  >
    <title id="chatbot-logo-title">Nyx AI - Intelligent Assistant</title>
    
    {/* AI Chat Bubble Icon */}
    <g className="chatbot-icon">
      {/* Main chat bubble */}
      <path 
        d={size === 'sm' ? 'M2 8 Q2 4 6 4 L16 4 Q20 4 20 8 L20 16 Q20 20 16 20 L8 20 L4 24 L4 20 Q2 20 2 16 Z' : 
           size === 'md' ? 'M2 10 Q2 5 7 5 L19 5 Q24 5 24 10 L24 20 Q24 25 19 25 L9 25 L4 30 L4 25 Q2 25 2 20 Z' :
           'M3 12 Q3 6 9 6 L23 6 Q29 6 29 12 L29 24 Q29 30 23 30 L11 30 L5 36 L5 30 Q3 30 3 24 Z'} 
        fill="var(--color-primary-600)" 
        stroke="var(--color-secondary-200)" 
        strokeWidth="1"
        opacity="0.9"
      >
        <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite"/>
      </path>
      
      {/* Neural network dots inside bubble */}
      <circle 
        cx={size === 'sm' ? '8' : size === 'md' ? '10' : '12'} 
        cy={size === 'sm' ? '10' : size === 'md' ? '13' : '16'} 
        r={size === 'sm' ? '1' : '1.2'} 
        fill="var(--color-secondary-100)"
      >
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0s"/>
      </circle>
      <circle 
        cx={size === 'sm' ? '11' : size === 'md' ? '13' : '16'} 
        cy={size === 'sm' ? '12' : size === 'md' ? '15' : '19'} 
        r={size === 'sm' ? '1' : '1.2'} 
        fill="var(--color-secondary-100)"
      >
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.5s"/>
      </circle>
      <circle 
        cx={size === 'sm' ? '14' : size === 'md' ? '16' : '20'} 
        cy={size === 'sm' ? '10' : size === 'md' ? '13' : '16'} 
        r={size === 'sm' ? '1' : '1.2'} 
        fill="var(--color-secondary-100)"
      >
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="1s"/>
      </circle>
      
      {/* Circuit-like connecting lines */}
      <path 
        d={size === 'sm' ? 'M8 10 L11 12 L14 10' : size === 'md' ? 'M10 13 L13 15 L16 13' : 'M12 16 L16 19 L20 16'} 
        stroke="var(--color-secondary-200)" 
        strokeWidth="0.8" 
        fill="none" 
        opacity="0.6"
      >
        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite"/>
      </path>
      
      {/* AI brain pattern - additional neural nodes */}
      <circle 
        cx={size === 'sm' ? '6' : size === 'md' ? '8' : '10'} 
        cy={size === 'sm' ? '14' : size === 'md' ? '17' : '22'} 
        r={size === 'sm' ? '0.6' : '0.8'} 
        fill="var(--color-secondary-200)" 
        opacity="0.5"
      >
        <animate attributeName="r" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="1.5s"/>
      </circle>
      <circle 
        cx={size === 'sm' ? '16' : size === 'md' ? '18' : '22'} 
        cy={size === 'sm' ? '14' : size === 'md' ? '17' : '22'} 
        r={size === 'sm' ? '0.6' : '0.8'} 
        fill="var(--color-secondary-200)" 
        opacity="0.5"
      >
        <animate attributeName="r" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="2s"/>
      </circle>
      
      {/* Glow effect */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </g>
    
    {/* Text: Nyx */}
    <g className="chatbot-text">
      {/* Nyx */}
      <text 
        x={size === 'sm' ? '26' : size === 'md' ? '30' : '36'} 
        y={size === 'sm' ? '12' : size === 'md' ? '15' : '20'} 
        fontFamily="var(--font-heading)" 
        fontSize={size === 'sm' ? '12' : size === 'md' ? '14' : '16'} 
        fontWeight="600" 
        fill="var(--text-primary)" 
        letterSpacing="-0.025em"
      >
        Nyx
      </text>
      
      {/* AI with accent color */}
      <text 
        x={size === 'sm' ? '26' : size === 'md' ? '30' : '36'} 
        y={size === 'sm' ? '22' : size === 'md' ? '27' : '34'} 
        fontFamily="var(--font-secondary)" 
        fontSize={size === 'sm' ? '10' : size === 'md' ? '12' : '14'} 
        fontWeight="500" 
        fill="var(--color-secondary-200)" 
        letterSpacing="0.025em"
      >
        AI
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
      aria-labelledby="chatbot-icon-title"
      className={className}
    >
      <title id="chatbot-icon-title">Nyx AI Assistant</title>
      
      <defs>
        <filter id="iconGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <radialGradient id="bubbleGradient" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="var(--color-primary-500)" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="var(--color-primary-700)" stopOpacity="0.9"/>
        </radialGradient>
      </defs>
      
      {/* AI Chat Bubble Icon - optimized for small sizes */}
      <g className="chatbot-icon" filter="url(#iconGlow)">
        {/* Main chat bubble with gradient */}
        <path 
          d="M4 10 Q4 6 8 6 L20 6 Q24 6 24 10 L24 18 Q24 22 20 22 L12 22 L8 26 L8 22 Q4 22 4 18 Z" 
          fill="url(#bubbleGradient)" 
          stroke="var(--color-secondary-200)" 
          strokeWidth="1"
        >
          <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite"/>
        </path>
        
        {/* Neural network dots - AI thinking pattern */}
        <circle cx="10" cy="12" r="1.5" fill="var(--color-secondary-100)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" begin="0s"/>
          <animate attributeName="r" values="1.5;2;1.5" dur="1.8s" repeatCount="indefinite" begin="0s"/>
        </circle>
        <circle cx="14" cy="14" r="1.5" fill="var(--color-secondary-100)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" begin="0.6s"/>
          <animate attributeName="r" values="1.5;2;1.5" dur="1.8s" repeatCount="indefinite" begin="0.6s"/>
        </circle>
        <circle cx="18" cy="12" r="1.5" fill="var(--color-secondary-100)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" begin="1.2s"/>
          <animate attributeName="r" values="1.5;2;1.5" dur="1.8s" repeatCount="indefinite" begin="1.2s"/>
        </circle>
        
        {/* Circuit-like connecting lines */}
        <path 
          d="M10 12 Q12 10 14 14 Q16 10 18 12" 
          stroke="var(--color-secondary-200)" 
          strokeWidth="1" 
          fill="none" 
          opacity="0.6"
        >
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite"/>
        </path>
        
        {/* Additional neural nodes for AI brain pattern */}
        <circle cx="8" cy="16" r="0.8" fill="var(--color-secondary-200)" opacity="0.7">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" begin="2s"/>
        </circle>
        <circle cx="20" cy="16" r="0.8" fill="var(--color-secondary-200)" opacity="0.7">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" begin="2.5s"/>
        </circle>
        
        {/* Subtle outer circuit ring */}
        <circle 
          cx="16" 
          cy="16" 
          r="14" 
          fill="none" 
          stroke="var(--color-secondary-200)" 
          strokeWidth="0.5" 
          opacity="0.3"
          strokeDasharray="2,3"
        >
          <animateTransform 
            attributeName="transform" 
            type="rotate" 
            values="0 16 16;360 16 16" 
            dur="20s" 
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  );
};

const ChatbotLogo = ({ 
  size = 'md', 
  type = 'full', 
  className = '', 
  responsive = false,
  ...props 
}) => {
  const baseClasses = `chatbot-logo-component ${className}`;
  
  // Handle responsive behavior
  if (responsive) {
    return (
      <div className={`${baseClasses} chatbot-logo-responsive`} {...props}>
        <div className="chatbot-logo-full-desktop">
          <FullLogo className="chatbot-logo-svg" size={size} />
        </div>
        <div className="chatbot-logo-icon-mobile">
          <IconLogo className="chatbot-logo-svg" size={size} />
        </div>
      </div>
    );
  }
  
  // Render based on type prop
  if (type === 'icon') {
    return (
      <div className={baseClasses} {...props}>
        <IconLogo className="chatbot-logo-svg" size={size} />
      </div>
    );
  }
  
  return (
    <div className={baseClasses} {...props}>
      <FullLogo className="chatbot-logo-svg" size={size} />
    </div>
  );
};

ChatbotLogo.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['full', 'icon']),
  className: PropTypes.string,
  responsive: PropTypes.bool,
};

// Add CSS styles for the component
const chatbotLogoStyles = `
  .chatbot-logo-component {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-transform);
  }
  
  .chatbot-logo-svg {
    display: block;
    width: auto;
    height: auto;
    transition: var(--transition-transform);
  }
  
  .chatbot-logo-component:hover .chatbot-logo-svg .chatbot-icon {
    transform: scale(1.05);
    transition: transform var(--duration-200) var(--ease-out);
  }
  
  .chatbot-logo-component:hover .chatbot-logo-svg .chatbot-text text:last-child {
    fill: var(--color-secondary-100);
    transition: fill var(--duration-200) var(--ease-out);
  }
  
  .chatbot-logo-component:hover .chatbot-logo-svg .chatbot-icon path:first-child {
    filter: brightness(1.1);
    transition: filter var(--duration-200) var(--ease-out);
  }
  
  .chatbot-logo-component:focus-visible {
    outline: 2px solid var(--color-secondary-200);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
  
  /* Responsive behavior */
  .chatbot-logo-responsive .chatbot-logo-icon-mobile {
    display: none;
  }
  
  @media (max-width: 768px) {
    .chatbot-logo-responsive .chatbot-logo-full-desktop {
      display: none;
    }
    
    .chatbot-logo-responsive .chatbot-logo-icon-mobile {
      display: block;
    }
  }
  
  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .chatbot-logo-svg .chatbot-icon path,
    .chatbot-logo-svg .chatbot-icon circle {
      stroke: var(--text-primary) !important;
      fill: var(--text-primary) !important;
    }
    .chatbot-logo-svg .chatbot-text text {
      fill: var(--text-primary) !important;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .chatbot-logo-svg .chatbot-icon circle,
    .chatbot-logo-svg .chatbot-icon path {
      animation: none !important;
    }
    .chatbot-logo-component:hover .chatbot-logo-svg .chatbot-icon {
      transform: none !important;
    }
    .chatbot-logo-svg animateTransform,
    .chatbot-logo-svg animate {
      animation-duration: 0s !important;
    }
  }
  
  /* Size variants */
  .chatbot-logo-component.chatbot-logo-sm {
    height: var(--space-6);
  }
  
  .chatbot-logo-component.chatbot-logo-md {
    height: var(--space-8);
  }
  
  .chatbot-logo-component.chatbot-logo-lg {
    height: var(--space-10);
  }
  
  /* AI-specific styling enhancements */
  .chatbot-logo-svg .chatbot-icon {
    filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.3));
  }
  
  .chatbot-logo-component:hover .chatbot-logo-svg .chatbot-icon {
    filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
  }
  
  /* Ensure proper scaling for button integration */
  .chat-logo .chatbot-logo-svg {
    width: 100%;
    height: 100%;
  }
`;

// Inject styles if not already present
if (typeof document !== 'undefined' && !document.getElementById('chatbot-logo-component-styles')) {
  const styleSheet = document.createElement('style');
  styleSheet.id = 'chatbot-logo-component-styles';
  styleSheet.textContent = chatbotLogoStyles;
  document.head.appendChild(styleSheet);
}

export default ChatbotLogo;