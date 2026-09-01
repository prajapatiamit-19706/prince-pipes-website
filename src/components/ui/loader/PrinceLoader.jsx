import React from 'react';
import styles from './princeLoader.module.css';

/**
 * Reusable Prince Pipes & Fittings Loader.
 * Designed to look like mechanical/industrial precision rings.
 * 
 * @param {Object} props
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Controls the dimensions of the loader.
 * @param {string} [props.label] - Optional text label to display.
 * @param {'default' | 'button'} [props.variant='default'] - Layout variant (column vs row).
 * @param {string} [props.className] - Additional CSS classes.
 */
export const PrinceLoader = ({ 
  size = 'md', 
  label, 
  variant = 'default', 
  className = '' 
}) => {
  return (
    <div 
      className={`${styles.loaderContainer} ${styles[`size-${size}`]} ${styles[`variant-${variant}`]} ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.loaderWrapper} aria-hidden="true">
        <div className={`${styles.ring} ${styles.ringOuter}`} />
        <div className={`${styles.ring} ${styles.ringInner}`} />
        <div className={styles.centerDot} />
      </div>
      
      {label && (
        <span className={styles.label}>
          {label}
        </span>
      )}
      
      {/* Screen reader only fallback text if no label provided */}
      {!label && <span className="sr-only">Loading...</span>}
    </div>
  );
};
