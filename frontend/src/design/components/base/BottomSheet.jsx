import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronUp } from 'lucide-react';
import { StatusBadge } from './Badge';
import { Button } from './Button';
import './BottomSheet.css';

/**
 * @typedef {Object} BottomSheetProps
 * @property {boolean} isOpen
 * @property {Function} onClose
 * @property {string} [title]
 * @property {string} [description]
 * @property {React.ReactNode} children
 * @property {Array<'peek'|'half'|'full'>} [snapPoints]
 * @property {'peek'|'half'|'full'} [defaultSnap]
 * @property {boolean} [showHandle]
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 */

export function BottomSheet({
  isOpen,
  onClose,
  title,
  description,
  children,
  snapPoints = ['half', 'full'],
  defaultSnap = 'half',
  showHandle = true,
  className = '',
  style,
}) {
  const sheetRef = useRef(null);
  const contentRef = useRef(null);
  const [currentSnap, setCurrentSnap] = useState(defaultSnap);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const startSnapIndex = useRef(0);

  const snapHeights = {
    peek: 80,
    half: '50vh',
    full: '85vh',
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleDragStart = (e) => {
    if (!contentRef.current) return;
    setIsDragging(true);
    dragStartY.current = 'touches' in e ? e.touches[0].clientY : e.clientY;
    startSnapIndex.current = snapPoints.indexOf(currentSnap);
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDragMove, { passive: true });
    document.addEventListener('touchend', handleDragEnd);
  };

  const handleDragMove = (e) => {
    if (!isDragging || !contentRef.current) return;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = dragStartY.current - clientY;
    // Implement drag logic here
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('touchend', handleDragEnd);
  };

  const snapTo = (snap) => {
    if (snapPoints.includes(snap)) {
      setCurrentSnap(snap);
    }
  };

  if (!isOpen) return null;

  const sheetContent = (
    <div
      className="pk-bottom-sheet-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={sheetRef}
        className={`pk-bottom-sheet ${className}`}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'pk-bottom-sheet-title' : undefined}
        aria-describedby={description ? 'pk-bottom-sheet-description' : undefined}
      >
        {showHandle && (
          <div className="pk-bottom-sheet__handle" onClick={(e) => e.stopPropagation()}>
            <div className="pk-bottom-sheet__handle-bar" />
          </div>
        )}
        {(title || description) && (
          <header className="pk-bottom-sheet__header">
            {title && (
              <h2 id="pk-bottom-sheet-title" className="pk-bottom-sheet__title">
                {title}
              </h2>
            )}
            {description && (
              <p id="pk-bottom-sheet-description" className="pk-bottom-sheet__description">
                {description}
              </p>
            )}
          </header>
        )}
        <div
          ref={contentRef}
          className="pk-bottom-sheet__content"
          onTouchStart={handleDragStart}
          onMouseDown={handleDragStart}
        >
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(sheetContent, document.body);
}

/**
 * @typedef {Object} ParkingBottomSheetProps
 * @property {boolean} isOpen
 * @property {Function} onClose
 * @property {Object} parking
 * @property {string} parking.id
 * @property {string} parking.name
 * @property {string} parking.address
 * @property {string} parking.distance
 * @property {number} parking.pricePerHour
 * @property {number} parking.availableSpots
 * @property {number} parking.totalSpots
 * @property {number} [parking.rating]
 * @property {Array<string>} [parking.facilities]
 * @property {Array<string>} [parking.images]
 * @property {Object} [parking.coordinates]
 * @property {Function} onNavigate
 * @property {Function} onReserve
 * @property {Function} [onSave]
 * @property {boolean} [isSaved]
 */

export function ParkingBottomSheet({
  isOpen,
  onClose,
  parking,
  onNavigate,
  onReserve,
  onSave,
  isSaved = false,
  ...props
}) {
  const occupancyPercent = Math.round((parking.availableSpots / parking.totalSpots) * 100);
  const availabilityStatus = occupancyPercent > 50 ? 'available' : occupancyPercent > 20 ? 'limited' : 'full';

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title={parking.name}
      description={parking.address}
      snapPoints={['half', 'full']}
      defaultSnap="half"
      {...props}
    >
      <div className="pk-parking-sheet">
        {/* Image carousel */}
        {parking.images?.length && (
          <div className="pk-parking-sheet__images">
            <img
              src={parking.images[0]}
              alt={parking.name}
              className="pk-parking-sheet__image"
            />
          </div>
        )}

        {/* Key info row */}
        <div className="pk-parking-sheet__key-info">
          <div className="pk-parking-sheet__info-item">
            <StatusBadge status={availabilityStatus} size="sm" />
            <span className="pk-parking-sheet__spots">
              {parking.availableSpots} of {parking.totalSpots} spots
            </span>
          </div>
          <div className="pk-parking-sheet__info-item">
            <span className="pk-parking-sheet__distance">{parking.distance}</span>
          </div>
          <div className="pk-parking-sheet__info-item">
            <span className="pk-parking-sheet__price">₹{parking.pricePerHour}/hr</span>
          </div>
          {parking.rating && (
            <div className="pk-parking-sheet__info-item">
              <span className="pk-parking-sheet__rating">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFB800" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {parking.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Facilities */}
        {parking.facilities?.length && (
          <div className="pk-parking-sheet__facilities">
            {parking.facilities.map((facility) => (
              <span key={facility} className="pk-parking-sheet__facility">
                {facility}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="pk-parking-sheet__actions">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={onNavigate}
            leftIcon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polygon points="3 11 22 2 13 14 13 22 3 11" /></svg>}
          >
            Navigate
          </Button>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={onReserve}
          >
            Reserve Spot
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
}
