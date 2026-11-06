import { useState, useEffect } from 'react';
import './AvailabilityIndicator.css';

/**
 * @typedef {Object} AvailabilityIndicatorProps
 * @property {number} available
 * @property {number} total
 * @property {'sm'|'md'|'lg'} [size]
 * @property {boolean} [showLabel]
 * @property {boolean} [showPercentage]
 * @property {boolean} [animated]
 * @property {string} [className]
 */

export function AvailabilityIndicator({
  available,
  total,
  size = 'md',
  showLabel = true,
  showPercentage = true,
  animated = true,
  className = '',
}) {
  const percent = total > 0 ? Math.round((available / total) * 100) : 0;
  const status = percent > 50 ? 'available' : percent > 20 ? 'limited' : 'full';

  const classNames = [
    'pk-availability-indicator',
    `pk-availability-indicator--${size}`,
    `pk-availability-indicator--${status}`,
    animated && 'pk-availability-indicator--animated',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="img" aria-label={`${available} of ${total} spots available (${percent}%)`}>
      <div className="pk-availability-indicator__ring">
        <svg className="pk-availability-indicator__svg" viewBox="0 0 64 64">
          <circle
            className="pk-availability-indicator__bg-circle"
            cx="32"
            cy="32"
            r="28"
            fill="none"
            strokeWidth="4"
          />
          <circle
            className="pk-availability-indicator__progress-circle"
            cx="32"
            cy="32"
            r="28"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${(28 * 2 * Math.PI * percent) / 100} ${28 * 2 * Math.PI}`}
            strokeDashoffset="0"
            transform="rotate(-90 32 32)"
            style={{
              transition: animated ? 'stroke-dasharray 800ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            }}
          />
        </svg>
        <div className="pk-availability-indicator__center">
          {showPercentage && (
            <span className="pk-availability-indicator__percentage">{percent}%</span>
          )}
        </div>
      </div>
      {showLabel && (
        <div className="pk-availability-indicator__label">
          <span className="pk-availability-indicator__available">{available}</span>
          <span className="pk-availability-indicator__separator">of</span>
          <span className="pk-availability-indicator__total">{total} spots</span>
        </div>
      )}
    </div>
  );
}

/**
 * @typedef {Object} AvailabilityBarProps
 * @property {number} available
 * @property {number} total
 * @property {number} [height]
 * @property {boolean} [showLabel]
 * @property {boolean} [animated]
 * @property {string} [className]
 */

export function AvailabilityBar({
  available,
  total,
  height = 8,
  showLabel = true,
  animated = true,
  className = '',
}) {
  const percent = total > 0 ? Math.round((available / total) * 100) : 0;
  const status = percent > 50 ? 'available' : percent > 20 ? 'limited' : 'full';

  const classNames = [
    'pk-availability-bar',
    `pk-availability-bar--${status}`,
    animated && 'pk-availability-bar--animated',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="img" aria-label={`${available} of ${total} spots available (${percent}%)`}>
      <div
        className="pk-availability-bar__track"
        style={{ height }}
      >
        <div
          className="pk-availability-bar__fill"
          style={{
            width: `${percent}%`,
            height,
            transition: animated ? 'width 800ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        />
      </div>
      {showLabel && (
        <div className="pk-availability-bar__label">
          <span className="pk-availability-bar__available">{available}</span>
          <span className="pk-availability-bar__separator">of</span>
          <span className="pk-availability-bar__total">{total} spots</span>
          <span className="pk-availability-bar__percentage">({percent}%)</span>
        </div>
      )}
    </div>
  );
}

/**
 * @typedef {Object} LiveAvailabilityProps
 * @property {number} available
 * @property {number} total
 * @property {Date} [lastUpdated]
 * @property {'sm'|'md'|'lg'} [size]
 * @property {string} [className]
 */

export function LiveAvailability({
  available,
  total,
  lastUpdated,
  size = 'md',
  className = '',
}) {
  const percent = total > 0 ? Math.round((available / total) * 100) : 0;
  const status = percent > 50 ? 'available' : percent > 20 ? 'limited' : 'full';

  const [timeAgo, setTimeAgo] = useState(0);

  useEffect(() => {
    if (!lastUpdated) return;
    const update = () => setTimeAgo(Math.round((Date.now() - lastUpdated.getTime()) / 1000));
    update();
    const interval = setInterval(update, 10000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  const classNames = [
    'pk-live-availability',
    `pk-live-availability--${size}`,
    `pk-live-availability--${status}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className="pk-live-availability__main">
        <div className="pk-live-availability__status">
          <span className="pk-live-availability__dot" aria-hidden="true" />
          <span className="pk-live-availability__status-text">
            {status === 'available' ? 'High Availability' : status === 'limited' ? 'Limited Availability' : 'Full'}
          </span>
        </div>
        <div className="pk-live-availability__count">
          <span className="pk-live-availability__available">{available}</span>
          <span className="pk-live-availability__separator">/</span>
          <span className="pk-live-availability__total">{total}</span>
        </div>
      </div>
      <div className="pk-live-availability__meta">
        <div className="pk-live-availability__percentage">{percent}% free</div>
        {lastUpdated && (
          <div className="pk-live-availability__updated">
            Updated {timeAgo < 60 ? `${timeAgo}s ago` : timeAgo < 3600 ? `${Math.round(timeAgo / 60)}m ago` : `${Math.round(timeAgo / 3600)}h ago`}
          </div>
        )}
      </div>
    </div>
  );
}
