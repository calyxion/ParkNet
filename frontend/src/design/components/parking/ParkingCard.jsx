import { useState } from 'react';
import { Navigation, Star, Zap, Shield, Car, Plug, Wifi, Accessibility } from 'lucide-react';
import { Card, CardContent } from '../base/Card';
import { Button } from '../base/Button';
import { Badge, StatusBadge } from '../base/Badge';
import { Avatar } from '../base/Avatar';
import './ParkingCard.css';

const facilityIcons = {
  'EV Charging': <Plug size={14} />,
  'Covered': <Car size={14} />,
  'CCTV': <Shield size={14} />,
  'WiFi': <Wifi size={14} />,
  'Accessible': <Accessibility size={14} />,
  'Valet': <Car size={14} />,
  'Security': <Shield size={14} />,
  'Lighting': <Zap size={14} />,
};

/**
 * @typedef {Object} ParkingCardProps
 * @property {Object} parking
 * @property {string} parking.id
 * @property {string} parking.name
 * @property {string} parking.address
 * @property {number} parking.distance
 * @property {number} parking.pricePerHour
 * @property {number} parking.availableSpots
 * @property {number} parking.totalSpots
 * @property {number} [parking.rating]
 * @property {number} [parking.reviewCount]
 * @property {Array<string>} [parking.images]
 * @property {Array<string>} [parking.facilities]
 * @property {Object} [parking.coordinates]
 * @property {'available'|'limited'|'full'|'reserved'} [parking.availabilityStatus]
 * @property {boolean} [parking.isOpen]
 * @property {string} [parking.openingHours]
 * @property {Function} onViewDetails
 * @property {Function} onNavigate
 * @property {Function} onReserve
 * @property {Function} [onSave]
 * @property {boolean} [isSaved]
 * @property {'default'|'compact'|'featured'} [variant]
 * @property {string} [className]
 */

export function ParkingCard({
  parking,
  onViewDetails,
  onNavigate,
  onReserve,
  onSave,
  isSaved = false,
  variant = 'default',
  className = '',
}) {
  const [imageError, setImageError] = useState(false);
  const occupancyPercent = parking.totalSpots > 0
    ? Math.round((parking.availableSpots / parking.totalSpots) * 100)
    : 0;
  const status = parking.availabilityStatus || (
    occupancyPercent > 50 ? 'available' : occupancyPercent > 20 ? 'limited' : 'full'
  );
  const distanceText = parking.distance < 1000
    ? `${parking.distance}m`
    : `${(parking.distance / 1000).toFixed(1)}km`;

  const classNames = [
    'pk-parking-card',
    `pk-parking-card--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  if (variant === 'compact') {
    return (
      <Card variant="outlined" padding="sm" className={classNames}>
        <div className="pk-parking-card__compact">
          <div className="pk-parking-card__compact-main">
            <div className="pk-parking-card__compact-info">
              <h3 className="pk-parking-card__compact-name">{parking.name}</h3>
              <p className="pk-parking-card__compact-address">{parking.address}</p>
            </div>
            <div className="pk-parking-card__compact-meta">
              <StatusBadge status={status} size="sm" />
              <span className="pk-parking-card__compact-distance">{distanceText}</span>
            </div>
          </div>
          <div className="pk-parking-card__compact-footer">
            <span className="pk-parking-card__compact-price">₹{parking.pricePerHour}/hr</span>
            <span className="pk-parking-card__compact-spots">
              {parking.availableSpots}/{parking.totalSpots}
            </span>
            <Button variant="primary" size="sm" onClick={onReserve}>
              Reserve
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="elevated" padding="none" className={classNames}>
      {/* Image */}
      {parking.images?.length && !imageError && (
        <div className="pk-parking-card__image-wrapper">
          <img
            src={parking.images[0]}
            alt={parking.name}
            className="pk-parking-card__image"
            onError={() => setImageError(true)}
            loading="lazy"
          />
          <div className="pk-parking-card__image-overlay">
            <StatusBadge status={status} size="md" className="pk-parking-card__status-badge" />
            {parking.rating && (
              <div className="pk-parking-card__rating">
                <Star size={14} fill="#FFB800" aria-hidden="true" />
                <span>{parking.rating.toFixed(1)}</span>
                {parking.reviewCount && (
                  <span className="pk-parking-card__review-count">({parking.reviewCount})</span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <CardContent className="pk-parking-card__content">
        {/* Header */}
        <div className="pk-parking-card__header">
          <div className="pk-parking-card__info">
            <h2 className="pk-parking-card__name">{parking.name}</h2>
            <div className="pk-parking-card__location">
              <Navigation size={14} aria-hidden="true" />
              <span className="pk-parking-card__address">{parking.address}</span>
              <span className="pk-parking-card__distance">{distanceText} · {Math.ceil(parking.distance / 80)} min walk</span>
            </div>
            {parking.openingHours && (
              <div className="pk-parking-card__hours">
                <span className={`pk-parking-card__open-indicator ${parking.isOpen ? 'open' : 'closed'}`} />
                <span>{parking.openingHours}</span>
              </div>
            )}
          </div>
          {onSave && (
            <button
              className={`pk-parking-card__save ${isSaved ? 'saved' : ''}`}
              onClick={onSave}
              aria-label={isSaved ? 'Remove from saved' : 'Save parking'}
              aria-pressed={isSaved}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          )}
        </div>

        {/* Key metrics */}
        <div className="pk-parking-card__metrics">
          <div className="pk-parking-card__metric">
            <span className="pk-parking-card__metric-value">₹{parking.pricePerHour}</span>
            <span className="pk-parking-card__metric-label">/ hour</span>
          </div>
          <div className="pk-parking-card__metric">
            <div className="pk-parking-card__availability">
              <div className="pk-parking-card__availability-bar">
                <div
                  className={`pk-parking-card__availability-fill pk-parking-card__availability-fill--${status}`}
                  style={{ width: `${occupancyPercent}%` }}
                />
              </div>
              <span className="pk-parking-card__availability-text">
                {parking.availableSpots} of {parking.totalSpots} spots
              </span>
            </div>
          </div>
          <div className="pk-parking-card__metric">
            <div className="pk-parking-card__availability">
              <StatusBadge status={status} size="sm" />
            </div>
          </div>
        </div>

        {/* Facilities */}
        {parking.facilities?.length && (
          <div className="pk-parking-card__facilities">
            {parking.facilities.slice(0, 6).map((facility) => (
              <span key={facility} className="pk-parking-card__facility">
                {facilityIcons[facility] || <Zap size={14} />}
                <span>{facility}</span>
              </span>
            ))}
            {parking.facilities.length > 6 && (
              <span className="pk-parking-card__facility pk-parking-card__facility--more">
                +{parking.facilities.length - 6} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="pk-parking-card__actions">
          <Button
            variant="outline"
            size="md"
            onClick={onNavigate}
            leftIcon={<Navigation size={18} />}
            fullWidth
          >
            Navigate
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={onReserve}
            fullWidth
            disabled={status === 'full'}
          >
            {status === 'full' ? 'Full' : 'Reserve Spot'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
