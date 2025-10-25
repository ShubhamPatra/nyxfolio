import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-based animations using Intersection Observer API
 * with fallback for browsers that don't support it.
 * 
 * @param {Object} options - Configuration options for Intersection Observer
 * @param {number} options.threshold - Percentage of element visibility to trigger (default: 0.1)
 * @param {string} options.rootMargin - Margin around root element (default: '0px')
 * @returns {Array} [elementRef, isVisible] - Ref to attach to element and visibility state
 */
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
      // Use Intersection Observer API for better performance
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Unobserve after animation triggers (one-time animation)
            observer.unobserve(entry.target);
          }
        },
        {
          threshold: 0.1,
          rootMargin: '0px',
          ...options,
        }
      );

      observer.observe(element);

      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    } else {
      // Fallback for browsers without Intersection Observer support
      const handleScroll = () => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Check if element is in viewport (with 10% threshold)
        const isInViewport = rect.top <= windowHeight * 0.9 && rect.bottom >= 0;

        if (isInViewport && !isVisible) {
          setIsVisible(true);
          // Remove listener after animation triggers
          window.removeEventListener('scroll', handleScroll);
        }
      };

      // Check on mount
      handleScroll();

      // Add scroll listener with passive flag for better performance
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isVisible, options]);

  return [elementRef, isVisible];
};

export default useScrollAnimation;
