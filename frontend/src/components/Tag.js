import React from 'react';
import '../styles/_tags.css';

/**
 * Tag Component - Reusable pill-shaped badge for displaying technologies, skills, and other labels
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The text content to display in the tag
 * @param {string} [props.variant='default'] - The visual variant: 'default', 'tech', or 'skill'
 * @param {React.ComponentType} [props.icon] - Optional icon component to display before the text
 * @param {string} [props.className] - Additional CSS classes to apply
 * @returns {JSX.Element} Tag component
 */
const Tag = ({ children, variant = 'default', icon: Icon, className = '' }) => {
  const tagClassName = `tag tag-${variant} ${className}`.trim();

  return (
    <span className={tagClassName}>
      {Icon && <Icon className="tag-icon" />}
      {children}
    </span>
  );
};

export default Tag;
