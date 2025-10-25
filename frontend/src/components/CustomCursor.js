import { useEffect, useRef, useState } from 'react';
import '../styles/CustomCursor.css';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;
    
    // Check if device supports hover (not a touch device)
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Update cursor position on mouse move with smooth trailing effect
    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (cursorDot) {
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
      }
    };

    // Smooth trailing animation for outline
    const animateOutline = () => {
      const distX = mouseX - outlineX;
      const distY = mouseY - outlineY;
      
      outlineX += distX * 0.15;
      outlineY += distY * 0.15;
      
      if (cursorOutline) {
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
      }
      
      requestAnimationFrame(animateOutline);
    };

    // Add hover class when over interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('tag') ||
        target.classList.contains('project-card') ||
        target.classList.contains('skill-item') ||
        target.closest('.tag') ||
        target.closest('.project-card') ||
        target.closest('.skill-item');
      
      if (isInteractive) {
        cursorDot?.classList.add('hover');
        cursorOutline?.classList.add('hover');
      }
    };

    // Remove hover class when leaving interactive elements
    const handleMouseOut = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('tag') ||
        target.classList.contains('project-card') ||
        target.classList.contains('skill-item') ||
        target.closest('.tag') ||
        target.closest('.project-card') ||
        target.closest('.skill-item');
      
      if (isInteractive) {
        cursorDot?.classList.remove('hover');
        cursorOutline?.classList.remove('hover');
      }
    };

    // Add click effect
    const handleMouseDown = () => {
      cursorDot?.classList.add('click');
      cursorOutline?.classList.add('click');
    };

    const handleMouseUp = () => {
      cursorDot?.classList.remove('click');
      cursorOutline?.classList.remove('click');
    };

    // Show cursor when mouse enters viewport
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Hide cursor when mouse leaves viewport
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Start animation loop
    animateOutline();

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorDotRef} 
        className={`cursor-dot ${isVisible ? 'visible' : ''}`}
      />
      <div 
        ref={cursorOutlineRef} 
        className={`cursor-outline ${isVisible ? 'visible' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
