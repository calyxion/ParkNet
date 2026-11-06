import './Avatar.css';

/**
 * @typedef {Object} AvatarProps
 * @property {string} [src]
 * @property {string} [alt]
 * @property {string} [name]
 * @property {'xs'|'sm'|'md'|'lg'|'xl'} [size]
 * @property {'circle'|'square'} [shape]
 * @property {'online'|'offline'|'busy'|'away'} [status]
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 */

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  status,
  className = '',
  style,
}) {
  const classNames = [
    'pk-avatar',
    `pk-avatar--${size}`,
    `pk-avatar--${shape}`,
    status && `pk-avatar--status-${status}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={classNames} style={style}>
      {src ? (
        <img src={src} alt={alt || name || 'Avatar'} className="pk-avatar__image" />
      ) : (
        <span className="pk-avatar__initials" aria-hidden="true">
          {initials || '?'}
        </span>
      )}
      {status && <span className="pk-avatar__status" aria-label={`Status: ${status}`} />}
    </div>
  );
}

/**
 * @typedef {Object} AvatarGroupProps
 * @property {React.ReactNode} children
 * @property {number} [max]
 * @property {'xs'|'sm'|'md'|'lg'|'xl'} [size]
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 */

export function AvatarGroup({
  children,
  max = 5,
  size = 'md',
  className = '',
  style,
}) {
  const childArray = Array.isArray(children) ? children : [children];
  const visibleChildren = childArray.slice(0, max);
  const remainingCount = childArray.length - max;

  const classNames = [
    'pk-avatar-group',
    `pk-avatar-group--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style} role="group" aria-label={`${childArray.length} people`}>
      {visibleChildren.map((child, index) => (
        <span key={index} className="pk-avatar-group__item" style={{ zIndex: max - index }}>
          {child}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="pk-avatar-group__more" aria-label={`${remainingCount} more`}>
          +{remainingCount}
        </span>
      )}
    </div>
  );
}
