import { useState } from 'react';
import { Navigation, Star, Zap, Shield, Car, Plug, Wifi, Accessibility, Clock, MapPin, ArrowRight, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { BottomSheet } from '../base/BottomSheet';
import { Button } from '../base/Button';
import { Badge, StatusBadge } from '../base/Badge';
import { Avatar } from '../base/Avatar';
import './ParkingSheet.css';

const facilityIcons = {
  'EV Charging': <Plug size={16} />,
  'Covered': <Car size={16} />,
  'CCTV': <Shield size={16} />,
  'WiFi': <Wifi size={16} />,
  'Accessible': <Accessibility size={16} />,
  'Valet': <Car size={16} />,
  'Security': <Shield size={16} />,
  'Lighting': <Zap size={16} />,
  'Restrooms': <span>🚻</span>,
  'Payment': <span>💳</span>,
};

/**
 * @typedef {Object} ParkingSheetProps
 * @property {boolean} isOpen
 * @property {Function} onClose
 * @property {Object} parking
 * @property {string} parking.id
 * @property {string} parking.name
 * @property {string} parking.address
 * @property {number} parking.distance
 * @property {number} parking.pricePerHour
 * @property {number} [parking.pricePerDay]
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
 * @property {string} [parking.description]
 * @property {string} [parking.phone]
 * @property {string} [parking.website]
 * @property {number} [parking.evChargers]
 * @property {number} [parking.accessibleSpots]
 * @property {string} [parking.heightLimit]
 * @property {Function} onNavigate
 * @property {Function} onReserve
 * @property {Function} [onSave]
 * @property {Function} [onShare]
 * @property {boolean} [isSaved]
 * @property {Object} [user]
 * @property {string} [user.name]
 * @property {string} [user.avatar]
 */

export function ParkingSheet({
  isOpen,
  onClose,
  parking,
  onNavigate,
  onReserve,
  onSave,
  onShare,
  isSaved = false,
  user,
}) {
  const [currentImage, setCurrentImage] = useState(0);

  // Guard: don't render if sheet is closed or parking data is not available
  if (!isOpen || !parking) {
    return null;
  }

  const occupancyPercent = parking.totalSpots > 0
    ? Math.round((parking.availableSpots / parking.totalSpots) * 100)
    : 0;
  const status = parking.availabilityStatus || (
    occupancyPercent > 50 ? 'available' : occupancyPercent > 20 ? 'limited' : 'full'
  );
  const distanceText = parking.distance < 1000
    ? `${parking.distance}m`
    : `${(parking.distance / 1000).toFixed(1)}km`;

  const handleImageNext = () => {
    if (parking.images && parking.images.length > 1) {
      setCurrentImage((prev) => (prev + 1) % parking.images.length);
    }
  };

  const handleImagePrev = () => {
    if (parking.images && parking.images.length > 1) {
      setCurrentImage((prev) => (prev - 1 + parking.images.length) % parking.images.length);
    }
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={parking.name}
      description={parking.address}
      snapPoints={['half', 'full']}
      defaultSnap="half"
      showHandle={true}
    >
      <div className="pk-parking-sheet">
        {/* Image Carousel */}
        {parking.images?.length && (
          <div className="pk-parking-sheet__carousel">
            <button
              className="pk-parking-sheet__carousel-btn pk-parking-sheet__carousel-btn--prev"
              onClick={handleImagePrev}
              aria-label="Previous image"
              disabled={!parking.images || parking.images.length <= 1}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="pk-parking-sheet__carousel-viewport">
              <img
                src={parking.images[currentImage]}
                alt={`${parking.name} - Image ${currentImage + 1}`}
                className="pk-parking-sheet__carousel-image"
                loading="lazy"
              />
            </div>
            <button
              className="pk-parking-sheet__carousel-btn pk-parking-sheet__carousel-btn--next"
              onClick={handleImageNext}
              aria-label="Next image"
              disabled={!parking.images || parking.images.length <= 1}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            {parking.images.length > 1 && (
              <div className="pk-parking-sheet__carousel-indicators">
                {parking.images.map((_, i) => (
                  <button
                    key={i}
                    className={`pk-parking-sheet__carousel-indicator ${i === currentImage ? 'active' : ''}`}
                    onClick={() => setCurrentImage(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-current={i === currentImage ? 'true' : 'false'}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Header Info */}
        <div className="pk-parking-sheet__header-info">
          <div className="pk-parking-sheet__header-main">
            <div className="pk-parking-sheet__title-row">
              <h2 className="pk-parking-sheet__name">{parking.name}</h2>
              <StatusBadge status={status} size="md" />
            </div>
            <div className="pk-parking-sheet__location-row">
              <MapPin size={16} aria-hidden="true" />
              <span className="pk-parking-sheet__address">{parking.address}</span>
              <span className="pk-parking-sheet__distance">
                {distanceText} · {Math.ceil(parking.distance / 80)} min walk
              </span>
            </div>
            {parking.openingHours && (
              <div className="pk-parking-sheet__hours-row">
                <Clock size={16} aria-hidden="true" />
                <span className={`pk-parking-sheet__open-indicator ${parking.isOpen ? 'open' : 'closed'}`} />
                <span>{parking.openingHours}</span>
                {parking.isOpen !== undefined && (
                  <span className={`pk-parking-sheet__status-text ${parking.isOpen ? 'open' : 'closed'}`}>
                    {parking.isOpen ? 'Open now' : 'Closed'}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="pk-parking-sheet__header-actions">
            <button
              className={`pk-parking-sheet__action-btn ${isSaved ? 'saved' : ''}`}
              onClick={onSave}
              aria-label={isSaved ? 'Remove from saved' : 'Save parking'}
              aria-pressed={isSaved}
            >
              <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
            {onShare && (
              <button
                className="pk-parking-sheet__action-btn"
                onClick={onShare}
                aria-label="Share parking location"
              >
                <Share2 size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="pk-parking-sheet__metrics">
          <div className="pk-parking-sheet__metric">
            <span className="pk-parking-sheet__metric-label">Price</span>
            <div className="pk-parking-sheet__metric-values">
              <span className="pk-parking-sheet__metric-value">₹{parking.pricePerHour}/hr</span>
              {parking.pricePerDay && (
                <span className="pk-parking-sheet__metric-value pk-parking-sheet__metric-value--daily">
                  ₹{parking.pricePerDay}/day
                </span>
              )}
            </div>
          </div>
          <div className="pk-parking-sheet__metric-divider" />
          <div className="pk-parking-sheet__metric">
            <span className="pk-parking-sheet__metric-label">Availability</span>
            <div className="pk-parking-sheet__availability">
              <div className="pk-parking-sheet__availability-bar">
                <div
                  className={`pk-parking-sheet__availability-fill pk-parking-sheet__availability-fill--${status}`}
                  style={{ width: `${occupancyPercent}%` }}
                />
              </div>
              <div className="pk-parking-sheet__availability-text">
                <span className="pk-parking-sheet__spots-available">{parking.availableSpots}</span>
                <span className="pk-parking-sheet__spots-separator">of</span>
                <span className="pk-parking-sheet__spots-total">{parking.totalSpots} spots</span>
              </div>
            </div>
          </div>
          <div className="pk-parking-sheet__metric-divider" />
          <div className="pk-parking-sheet__metric">
            <span className="pk-parking-sheet__metric-label">Distance</span>
            <div className="pk-parking-sheet__metric-values">
              <span className="pk-parking-sheet__metric-value">{distanceText}</span>
              <span className="pk-parking-sheet__metric-value pk-parking-sheet__metric-value--walk">
                {Math.ceil(parking.distance / 80)} min walk
              </span>
            </div>
          </div>
        </div>

        {/* Rating & Reviews */}
        {parking.rating && (
          <div className="pk-parking-sheet__rating">
            <div className="pk-parking-sheet__rating-score">
              <span className="pk-parking-sheet__rating-value">{parking.rating.toFixed(1)}</span>
              <div className="pk-parking-sheet__rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(parking.rating) ? '#FFB800' : 'none'}
                    stroke="#FFB800"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
            {parking.reviewCount && (
              <span className="pk-parking-sheet__review-count">
                {parking.reviewCount} {parking.reviewCount === 1 ? 'review' : 'reviews'}
              </span>
            )}
            <button className="pk-parking-sheet__rating-link">
              Read reviews <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* Facilities */}
        {parking.facilities?.length && (
          <div className="pk-parking-sheet__section">
            <h3 className="pk-parking-sheet__section-title">Facilities</h3>
            <div className="pk-parking-sheet__facilities-grid">
              {parking.facilities.map((facility) => (
                <div key={facility} className="pk-parking-sheet__facility">
                  <span className="pk-parking-sheet__facility-icon">
                    {facilityIcons[facility] || <Zap size={18} />}
                  </span>
                  <span className="pk-parking-sheet__facility-name">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EV Charging Details */}
        {parking.evChargers && parking.evChargers > 0 && (
          <div className="pk-parking-sheet__section">
            <h3 className="pk-parking-sheet__section-title">EV Charging</h3>
            <div className="pk-parking-sheet__ev-details">
              <div className="pk-parking-sheet__ev-item">
                <Plug size={20} />
                <div>
                  <span className="pk-parking-sheet__ev-label">{parking.evChargers} charger{parking.evChargers > 1 ? 's' : ''}</span>
                  <span className="pk-parking-sheet__ev-type">Fast charging available</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Accessibility */}
        {parking.accessibleSpots && parking.accessibleSpots > 0 && (
          <div className="pk-parking-sheet__section">
            <h3 className="pk-parking-sheet__section-title">Accessibility</h3>
            <div className="pk-parking-sheet__accessibility-details">
              <div className="pk-parking-sheet__accessibility-item">
                <Wheelchair size={20} />
                <div>
                  <span className="pk-parking-sheet__accessibility-label">{parking.accessibleSpots} accessible spot{parking.accessibleSpots > 1 ? 's' : ''}</span>
                  <span className="pk-parking-sheet__accessibility-type">Level access available</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Height Limit */}
        {parking.heightLimit && (
          <div className="pk-parking-sheet__section">
            <h3 className="pk-parking-sheet__section-title">Restrictions</h3>
            <div className="pk-parking-sheet__restriction">
              <span className="pk-parking-sheet__restriction-icon">📏</span>
              <span>Max height: {parking.heightLimit}</span>
            </div>
          </div>
        )}

        {/* Description */}
        {parking.description && (
          <div className="pk-parking-sheet__section">
            <h3 className="pk-parking-sheet__section-title">About</h3>
            <p className="pk-parking-sheet__description">{parking.description}</p>
          </div>
        )}

        {/* Contact */}
        {(parking.phone || parking.website) && (
          <div className="pk-parking-sheet__section">
            <h3 className="pk-parking-sheet__section-title">Contact</h3>
            <div className="pk-parking-sheet__contact">
              {parking.phone && (
                <a href={`tel:${parking.phone}`} className="pk-parking-sheet__contact-item">
                  <span>📞</span>
                  <span>{parking.phone}</span>
                </a>
              )}
              {parking.website && (
                <a href={parking.website} target="_blank" rel="noopener noreferrer" className="pk-parking-sheet__contact-item">
                  <span>🌐</span>
                  <span>Website</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pk-parking-sheet__actions">
          <Button
            variant="outline"
            size="lg"
            onClick={onNavigate}
            leftIcon={<Navigation size={20} />}
            fullWidth
          >
            Navigate
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={onReserve}
            fullWidth
            disabled={status === 'full'}
          >
            {status === 'full' ? 'No Spots Available' : 'Reserve Spot'}
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
