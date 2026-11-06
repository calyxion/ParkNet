import './Skeleton.css';

/**
 * @typedef {Object} SkeletonProps
 * @property {'text'|'circular'|'rectangular'|'card'|'avatar'|'button'|'map-marker'} [variant]
 * @property {string|number} [width]
 * @property {string|number} [height]
 * @property {number} [lines]
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 */

export function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  className = '',
  style,
}) {
  const classNames = [
    'pk-skeleton',
    `pk-skeleton--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const skeletonStyle = {
    ...style,
    ...(width && { width }),
    ...(height && { height }),
  };

  if (variant === 'text') {
    return (
      <div className={classNames} style={skeletonStyle}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="pk-skeleton__line" style={{ width: i === lines - 1 && lines > 1 ? '60%' : '100%' }} />
        ))}
      </div>
    );
  }

  return <div className={classNames} style={skeletonStyle} />;
}

/**
 * @typedef {Object} SkeletonCardProps
 * @property {boolean} [hasImage]
 * @property {number} [lines]
 * @property {number} [actions]
 * @property {string} [className]
 */

export function SkeletonCard({ hasImage = true, lines = 3, actions = 2, className = '' }) {
  return (
    <div className={`pk-skeleton-card ${className}`}>
      {hasImage && <div className="pk-skeleton-card__image" />}
      <div className="pk-skeleton-card__content">
        <div className="pk-skeleton-card__title" />
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="pk-skeleton-card__line" style={{ width: i === lines - 1 ? '50%' : '100%' }} />
        ))}
      </div>
      <div className="pk-skeleton-card__actions">
        {Array.from({ length: actions }).map((_, i) => (
          <div key={i} className="pk-skeleton-card__action" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonDashboard({ stats = 4, chartHeight = 120, rows = 5, className = '' }) {
  return (
    <div className={`pk-skeleton-dashboard ${className}`}>
      <div className="pk-skeleton-dashboard__header">
        <div className="pk-skeleton pk-skeleton--text" style={{ width: '30%', height: '24px' }} />
        <div className="pk-skeleton pk-skeleton--text" style={{ width: '20%', height: '16px' }} />
      </div>
      <div className="pk-skeleton-dashboard__stats" style={{ gridTemplateColumns: `repeat(${stats}, 1fr)` }}>
        {Array.from({ length: stats }).map((_, i) => (
          <div key={i} className="pk-skeleton-card">
            <div className="pk-skeleton-card__title" style={{ width: '80px', height: '12px' }} />
            <div className="pk-skeleton-card__line" style={{ width: '100px', height: '28px', marginTop: '8px' }} />
            <div className="pk-skeleton-card__line" style={{ width: '60px', height: '8px', marginTop: '12px' }} />
          </div>
        ))}
      </div>
      <div className="pk-skeleton-dashboard__charts" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="pk-skeleton-card" style={{ padding: '24px' }}>
          <div className="pk-skeleton-card__title" style={{ width: '120px', height: '16px' }} />
          <div className="pk-skeleton-card__line" style={{ width: '100%', height: `${chartHeight}px`, marginTop: '16px' }} />
        </div>
        <div className="pk-skeleton-card" style={{ padding: '24px' }}>
          <div className="pk-skeleton-card__title" style={{ width: '100px', height: '16px' }} />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="pk-skeleton-card__line" style={{ width: '100%', height: '8px', marginTop: '12px' }} />
          ))}
        </div>
      </div>
      <div className="pk-skeleton-card" style={{ padding: '24px' }}>
        <div className="pk-skeleton-card__title" style={{ width: '120px', height: '16px' }} />
        <div className="pk-skeleton-table">
          <div className="pk-skeleton-table__header">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="pk-skeleton-table__cell" style={{ width: i === 0 ? '120px' : i === 5 ? '80px' : '100px' }} />
            ))}
          </div>
          {Array.from({ length: rows }).map((_, r) => (
            <div key={r} className="pk-skeleton-table__row">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="pk-skeleton-table__cell" style={{ width: i === 0 ? '120px' : i === 5 ? '80px' : '100px' }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * @typedef {Object} SkeletonMapProps
 * @property {number} [markers]
 * @property {string} [className]
 */

export function SkeletonMap({ markers = 8, className = '' }) {
  return (
    <div className={`pk-skeleton-map ${className}`}>
      <div className="pk-skeleton-map__toolbar">
        <div className="pk-skeleton pk-skeleton--text" style={{ width: '200px', height: '40px' }} />
        <div className="pk-skeleton-map__filters">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="pk-skeleton pk-skeleton--button" style={{ width: '70px', height: '32px' }} />
          ))}
        </div>
      </div>
      <div className="pk-skeleton-map__grid">
        <div className="pk-skeleton-map__floor-selector">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="pk-skeleton pk-skeleton--button" style={{ width: '100%', height: '60px' }} />
          ))}
        </div>
        <div className="pk-skeleton-map__canvas">
          {Array.from({ length: markers }).map((_, i) => (
            <div key={i} className="pk-skeleton-map__marker" style={{ left: `${(i % 4) * 24}%`, top: `${Math.floor(i / 4) * 24}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
