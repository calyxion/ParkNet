import './Badge.css';

/**
 * @typedef {Object} BadgeProps
 * @property {React.ReactNode} children
 * @property {'default'|'success'|'warning'|'error'|'info'|'brand'} [variant]
 * @property {'sm'|'md'|'lg'} [size]
 * @property {boolean} [dot]
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 */

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className = '',
  style,
}) {
  const classNames = [
    'pk-badge',
    `pk-badge--${variant}`,
    `pk-badge--${size}`,
    dot && 'pk-badge--dot',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames} style={style}>
      {dot && <span className="pk-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

/**
 * @typedef {Object} StatusBadgeProps
 * @property {'available'|'limited'|'full'|'reserved'|'active'|'completed'|'pending'|'cancelled'} status
 * @property {'sm'|'md'} [size]
 * @property {boolean} [showDot]
 * @property {string} [className]
 */

export function StatusBadge({ status, size = 'md', showDot = true, className = '' }) {
  const variantMap = {
    available: 'success',
    limited: 'warning',
    full: 'error',
    reserved: 'info',
    active: 'success',
    completed: 'default',
    pending: 'warning',
    cancelled: 'error',
  };

  const labelMap = {
    available: 'Available',
    limited: 'Limited',
    full: 'Full',
    reserved: 'Reserved',
    active: 'Active',
    completed: 'Completed',
    pending: 'Pending',
    cancelled: 'Cancelled',
  };

  return (
    <Badge
      variant={variantMap[status] || 'default'}
      size={size}
      dot={showDot}
      className={`pk-status-badge ${className}`}
    >
      {labelMap[status] || status}
    </Badge>
  );
}
