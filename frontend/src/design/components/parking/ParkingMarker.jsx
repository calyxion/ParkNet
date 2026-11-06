import { useMemo } from 'react';
import './ParkingMarker.css';

/**
 * @typedef {Object} ParkingMarkerProps
 * @property {Object} parking
 * @property {string} parking.id
 * @property {string} parking.name
 * @property {number} parking.availableSpots
 * @property {number} parking.totalSpots
 * @property {number} parking.pricePerHour
 * @property {number} parking.distance
 * @property {number} [parking.rating]
 * @property {Object} parking.coordinates
 * @property {number} parking.coordinates.lat
 * @property {number} parking.coordinates.lng
 * @property {Array<string>} [parking.facilities]
 * @property {boolean} [parking.isSelected]
 * @property {'available'|'limited'|'full'|'reserved'} [parking.availabilityStatus]
 * @property {Function} onClick
 * @property {string} [className]
 */

export function ParkingMarker({
  parking,
  onClick,
  className = '',
}) {
  const occupancyPercent = useMemo(
    () => Math.round((parking.availableSpots / parking.totalSpots) * 100),
    [parking.availableSpots, parking.totalSpots]
  );

  const status = parking.availabilityStatus || (
    occupancyPercent > 50 ? 'available' : occupancyPercent > 20 ? 'limited' : 'full'
  );

  const distanceText = parking.distance < 1000
    ? `${parking.distance}m`
    : `${(parking.distance / 1000).toFixed(1)}km`;

  const classNames = [
    'pk-parking-marker',
    `pk-parking-marker--${status}`,
    parking.isSelected && 'pk-parking-marker--selected',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      onClick={onClick}
      aria-label={`${parking.name}, ${parking.availableSpots} of ${parking.totalSpots} spots available, ₹${parking.pricePerHour} per hour, ${distanceText} away`}
    >
      <div className="pk-parking-marker__label">
        <span className="pk-parking-marker__price">₹{parking.pricePerHour}/hr</span>
        <span className="pk-parking-marker__spots">{parking.availableSpots} spots</span>
      </div>
      <div className="pk-parking-marker__pin">
        <div className="pk-parking-marker__pin-inner">
          <span className="pk-parking-marker__status-dot" aria-hidden="true" />
        </div>
      </div>
      {parking.isSelected && (
        <div className="pk-parking-marker__selected-ring" aria-hidden="true" />
      )}
    </button>
  );
}

/**
 * @typedef {Object} ClusterMarkerProps
 * @property {number} count
 * @property {Function} onClick
 * @property {string} [className]
 */

export function ClusterMarker({ count, onClick, className = '' }) {
  const displayCount = count > 99 ? '99+' : count;

  return (
    <button
      className={`pk-cluster-marker ${className}`}
      onClick={onClick}
      aria-label={`${count} parking locations clustered`}
    >
      <span className="pk-cluster-marker__count">{displayCount}</span>
    </button>
  );
}

/**
 * @typedef {Object} UserLocationMarkerProps
 * @property {string} [className]
 */

export function UserLocationMarker({ className = '' }) {
  return (
    <div className={`pk-user-location-marker ${className}`} aria-hidden="true">
      <div className="pk-user-location-marker__pulse" />
      <div className="pk-user-location-marker__dot" />
      <div className="pk-user-location-marker__accuracy" />
    </div>
  );
}
