import { forwardRef } from 'react';
import './Button.css';

/**
 * @typedef {Object} ButtonProps
 * @property {'primary'|'secondary'|'outline'|'ghost'|'danger'|'success'} [variant]
 * @property {'sm'|'md'|'lg'} [size]
 * @property {boolean} [fullWidth]
 * @property {boolean} [loading]
 * @property {React.ReactNode} [leftIcon]
 * @property {React.ReactNode} [rightIcon]
 * @property {boolean} [disabled]
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 */

export const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      style,
      ...props
    },
    ref
  ) => {
    const classNames = [
      'pk-button',
      `pk-button--${variant}`,
      `pk-button--${size}`,
      fullWidth && 'pk-button--full-width',
      loading && 'pk-button--loading',
      disabled && 'pk-button--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        style={style}
        {...props}
      >
        {loading && <span className="pk-button__spinner" aria-hidden="true" />}
        {!loading && leftIcon && <span className="pk-button__icon pk-button__icon--left" aria-hidden="true">{leftIcon}</span>}
        <span className="pk-button__text">{children}</span>
        {!loading && rightIcon && <span className="pk-button__icon pk-button__icon--right" aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

/**
 * @typedef {Object} IconButtonProps
 * @property {'sm'|'md'|'lg'} [size]
 * @property {'primary'|'secondary'|'outline'|'ghost'|'danger'} [variant]
 * @property {string} aria-label
 */

export const IconButton = forwardRef(
  ({ children, size = 'md', variant = 'ghost', 'aria-label': ariaLabel, className = '', style, ...props }, ref) => {
    const classNames = [
      'pk-icon-button',
      `pk-icon-button--${variant}`,
      `pk-icon-button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        aria-label={ariaLabel}
        style={style}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
