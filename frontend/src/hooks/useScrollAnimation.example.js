/**
 * Example usage of useScrollAnimation hook
 * 
 * This file demonstrates how to use the scroll animation hook
 * in your React components.
 */

import React from 'react';
import { useScrollAnimation } from './useScrollAnimation';

// Example 1: Basic usage with default options
export const BasicExample = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section 
      ref={ref} 
      className={`about fade-in ${isVisible ? 'visible' : ''}`}
    >
      <h2>About Section</h2>
      <p>This content will fade in when scrolled into view.</p>
    </section>
  );
};

// Example 2: Custom threshold (trigger when 30% visible)
export const CustomThresholdExample = () => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });

  return (
    <div 
      ref={ref} 
      className={`project-card fade-in ${isVisible ? 'visible' : ''}`}
    >
      <h3>Project Card</h3>
      <p>Triggers when 30% of the element is visible.</p>
    </div>
  );
};

// Example 3: Custom root margin (trigger earlier/later)
export const CustomRootMarginExample = () => {
  const [ref, isVisible] = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '100px' // Trigger 100px before element enters viewport
  });

  return (
    <div 
      ref={ref} 
      className={`skill-item fade-in ${isVisible ? 'visible' : ''}`}
    >
      <span>React.js</span>
    </div>
  );
};

// Example 4: Multiple animated elements
export const MultipleElementsExample = () => {
  const [ref1, isVisible1] = useScrollAnimation();
  const [ref2, isVisible2] = useScrollAnimation();
  const [ref3, isVisible3] = useScrollAnimation();

  return (
    <div className="container">
      <div 
        ref={ref1} 
        className={`card fade-in ${isVisible1 ? 'visible' : ''}`}
      >
        Card 1
      </div>
      <div 
        ref={ref2} 
        className={`card fade-in ${isVisible2 ? 'visible' : ''}`}
      >
        Card 2
      </div>
      <div 
        ref={ref3} 
        className={`card fade-in ${isVisible3 ? 'visible' : ''}`}
      >
        Card 3
      </div>
    </div>
  );
};

/**
 * CSS Classes Required:
 * 
 * .fade-in {
 *   opacity: 0;
 *   transform: translateY(30px);
 *   transition: opacity var(--duration-700) var(--ease-out),
 *               transform var(--duration-700) var(--ease-out);
 * }
 * 
 * .fade-in.visible {
 *   opacity: 1;
 *   transform: translateY(0);
 * }
 * 
 * @media (prefers-reduced-motion: reduce) {
 *   .fade-in {
 *     opacity: 1;
 *     transform: none;
 *     transition: none;
 *   }
 * }
 */
