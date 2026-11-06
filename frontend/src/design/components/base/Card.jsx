import './Card.css';

/**
 * @typedef {Object} CardProps
 * @property {React.ReactNode} children
 * @property {'default'|'elevated'|'outlined'|'interactive'} [variant]
 * @property {'none'|'sm'|'md'|'lg'} [padding]
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 * @property {Function} [onClick]
 */

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  style,
  onClick,
}) {
  const classNames = [
    'pk-card',
    `pk-card--${variant}`,
    `pk-card--padding-${padding}`,
    onClick && 'pk-card--interactive',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }} : undefined}
    >
      {children}
    </div>
  );
}

/**
 * @typedef {Object} CardHeaderProps
 * @property {React.ReactNode} children
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 */

export function CardHeader({ children, className = '', style }) {
  return (
    <div className={`pk-card__header ${className}`} style={style}>
      {children}
    </div>
  );
}

/**
 * @typedef {Object} CardContentProps
 * @property {React.ReactNode} children
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 */

export function CardContent({ children, className = '', style }) {
  return (
    <div className={`pk-card__content ${className}`} style={style}>
      {children}
    </div>
  );
}

/**
 * @typedef {Object} CardFooterProps
 * @property {React.ReactNode} children
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 */

export function CardFooter({ children, className = '', style }) {
  return (
    <div className={`pk-card__footer ${className}`} style={style}>
      {children}
    </div>
  );
}
