import { format, formatDistanceToNow } from 'date-fns';
import { Calendar, Clock, MapPin, CreditCard, QrCode, ChevronRight, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '../base/Card';
import { Button } from '../base/Button';
import { Badge, StatusBadge } from '../base/Badge';
import { VehicleBadge } from './VehicleBadge';
import './BookingCard.css';

/**
 * @typedef {Object} BookingCardProps
 * @property {Object} booking
 * @property {string} booking.id
 * @property {string} booking.parkingName
 * @property {string} booking.parkingAddress
 * @property {string} [booking.floor]
 * @property {string} [booking.slot]
 * @property {string} booking.vehicleType
 * @property {string} booking.plate
 * @property {Date|string} booking.startTime
 * @property {Date|string} [booking.endTime]
 * @property {number} [booking.duration]
 * @property {'upcoming'|'active'|'completed'|'cancelled'|'pending'} booking.status
 * @property {number} booking.amount
 * @property {string} [booking.paymentMethod]
 * @property {string} [booking.qrCode]
 * @property {string} [booking.bookingNumber]
 * @property {'default'|'compact'|'timeline'} [variant]
 * @property {Function} [onViewDetails]
 * @property {Function} [onExtend]
 * @property {Function} [onCancel]
 * @property {Function} [onViewQR]
 * @property {Function} [onNavigate]
 * @property {string} [className]
 */

export function BookingCard({
  booking,
  variant = 'default',
  onViewDetails,
  onExtend,
  onCancel,
  onViewQR,
  onNavigate,
  className = '',
}) {
  const startTime = new Date(booking.startTime);
  const endTime = booking.endTime ? new Date(booking.endTime) : null;
  const isActive = booking.status === 'active';
  const isUpcoming = booking.status === 'upcoming' || booking.status === 'pending';

  const formatDate = (date) => format(date, 'MMM d, yyyy');
  const formatTime = (date) => format(date, 'h:mm a');
  const formatDateTime = (date) => `${formatDate(date)} at ${formatTime(date)}`;

  const statusMap = {
    upcoming: 'upcoming',
    active: 'active',
    confirmed: 'upcoming',
    completed: 'completed',
    cancelled: 'cancelled',
    pending: 'pending',
  };

  const statusForBadge = statusMap[booking.status] || 'pending';

  if (variant === 'compact') {
    return (
      <Card variant="outlined" padding="sm" className={`pk-booking-card pk-booking-card--compact ${className}`}>
        <div className="pk-booking-card__compact">
          <div className="pk-booking-card__compact-main">
            <div className="pk-booking-card__compact-info">
              <h3 className="pk-booking-card__compact-parking">{booking.parkingName}</h3>
              <div className="pk-booking-card__compact-meta">
                <span className="pk-booking-card__compact-time">
                  <Clock size={12} aria-hidden="true" />
                  {formatDateTime(startTime)}
                </span>
                <span className="pk-booking-card__compact-location">
                  <MapPin size={12} aria-hidden="true" />
                  {booking.parkingAddress}
                </span>
              </div>
            </div>
            <div className="pk-booking-card__compact-status">
              <StatusBadge status={statusForBadge} size="sm" />
            </div>
          </div>
          <div className="pk-booking-card__compact-footer">
            <span className="pk-booking-card__compact-amount">₹{booking.amount}</span>
            <span className="pk-booking-card__compact-plate">{booking.plate}</span>
            <VehicleBadge type={booking.vehicleType} size="xs" variant="chip" />
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'timeline') {
    return (
      <div className={`pk-booking-card pk-booking-card--timeline ${className}`} data-status={booking.status}>
        <div className="pk-booking-card__timeline-marker">
          <div className={`pk-booking-card__timeline-dot pk-booking-card__timeline-dot--${booking.status}`} />
        </div>
        <div className="pk-booking-card__timeline-content">
          <div className="pk-booking-card__timeline-header">
            <h3 className="pk-booking-card__timeline-parking">{booking.parkingName}</h3>
            <StatusBadge status={statusForBadge} size="sm" />
          </div>
          <div className="pk-booking-card__timeline-details">
            <span className="pk-booking-card__timeline-time">
              <Clock size={12} aria-hidden="true" />
              {formatTime(startTime)} - {endTime ? formatTime(endTime) : 'Ongoing'}
            </span>
            <span className="pk-booking-card__timeline-location">
              <MapPin size={12} aria-hidden="true" />
              {booking.slot ? `Slot ${booking.slot}` : booking.parkingAddress}
            </span>
            <span className="pk-booking-card__timeline-vehicle">
              <VehicleBadge type={booking.vehicleType} size="xs" variant="chip" />
              {booking.plate}
            </span>
          </div>
          <div className="pk-booking-card__timeline-footer">
            <span className="pk-booking-card__timeline-amount">₹{booking.amount}</span>
            {booking.paymentMethod && (
              <span className="pk-booking-card__timeline-payment">
                <CreditCard size={12} aria-hidden="true" />
                {booking.paymentMethod}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card variant="elevated" padding="none" className={`pk-booking-card ${className}`}>
      <CardContent className="pk-booking-card__content">
        {/* Header */}
        <div className="pk-booking-card__header">
          <div className="pk-booking-card__header-main">
            <div className="pk-booking-card__parking-info">
              <h2 className="pk-booking-card__parking-name">{booking.parkingName}</h2>
              <div className="pk-booking-card__parking-address">
                <MapPin size={14} aria-hidden="true" />
                <span>{booking.parkingAddress}</span>
              </div>
            </div>
            {booking.floor && (
              <div className="pk-booking-card__floor-slot">
                <span className="pk-booking-card__floor">{booking.floor}</span>
                {booking.slot && <span className="pk-booking-card__slot">Slot {booking.slot}</span>}
              </div>
            )}
          </div>
          <div className="pk-booking-card__header-actions">
            <StatusBadge status={statusForBadge} size="md" />
            <div className="pk-booking-card__menu">
              <button className="pk-booking-card__menu-btn" aria-label="More options">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Time & Vehicle */}
        <div className="pk-booking-card__details">
          <div className="pk-booking-card__detail-row">
            <div className="pk-booking-card__detail">
              <div className="pk-booking-card__detail-icon">
                <Calendar size={18} aria-hidden="true" />
              </div>
              <div className="pk-booking-card__detail-content">
                <span className="pk-booking-card__detail-label">Date</span>
                <span className="pk-booking-card__detail-value">{formatDate(startTime)}</span>
              </div>
            </div>
            <div className="pk-booking-card__detail">
              <div className="pk-booking-card__detail-icon">
                <Clock size={18} aria-hidden="true" />
              </div>
              <div className="pk-booking-card__detail-content">
                <span className="pk-booking-card__detail-label">Time</span>
                <span className="pk-booking-card__detail-value">
                  {formatTime(startTime)} - {endTime ? formatTime(endTime) : isActive ? 'Ongoing' : 'TBD'}
                </span>
              </div>
            </div>
            <div className="pk-booking-card__detail">
              <div className="pk-booking-card__detail-icon" style={{ color: 'var(--vehicle-color)' }}>
                <VehicleBadge type={booking.vehicleType} size="sm" variant="chip" showLabel={false} />
              </div>
              <div className="pk-booking-card__detail-content">
                <span className="pk-booking-card__detail-label">Vehicle</span>
                <span className="pk-booking-card__detail-value pk-booking-card__detail-value--vehicle">
                  <VehicleBadge type={booking.vehicleType} size="xs" variant="chip" />
                  {booking.plate}
                </span>
              </div>
            </div>
          </div>

          {booking.duration && (
            <div className="pk-booking-card__detail-row pk-booking-card__detail-row--single">
              <div className="pk-booking-card__detail">
                <div className="pk-booking-card__detail-icon">
                  <Clock size={18} aria-hidden="true" />
                </div>
                <div className="pk-booking-card__detail-content">
                  <span className="pk-booking-card__detail-label">Duration</span>
                  <span className="pk-booking-card__detail-value">
                    {booking.duration < 60
                      ? `${booking.duration} min`
                      : `${Math.floor(booking.duration / 60)}h ${booking.duration % 60}m`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {isActive && (
            <div className="pk-booking-card__active-timer">
              <div className="pk-booking-card__timer">
                <span className="pk-booking-card__timer-label">Elapsed</span>
                <span className="pk-booking-card__timer-value" data-start={startTime.toISOString()}>
                  {formatDistanceToNow(startTime, { addSuffix: true })}
                </span>
              </div>
              <div className="pk-booking-card__estimated-cost">
                <span className="pk-booking-card__timer-label">Est. Cost</span>
                <span className="pk-booking-card__timer-value">₹{booking.amount}</span>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pk-booking-card__actions">
          {isActive && (
            <>
              {onExtend && (
                <Button variant="outline" size="md" onClick={onExtend} leftIcon={<Clock size={18} />}>
                  Extend
                </Button>
              )}
              {onViewQR && (
                <Button variant="outline" size="md" onClick={onViewQR} leftIcon={<QrCode size={18} />}>
                  View QR
                </Button>
              )}
              {onNavigate && (
                <Button variant="outline" size="md" onClick={onNavigate} leftIcon={<MapPin size={18} />}>
                  Navigate
                </Button>
              )}
              {onCancel && (
                <Button variant="ghost" size="md" onClick={onCancel} className="pk-booking-card__cancel-btn">
                  Cancel
                </Button>
              )}
            </>
          )}
          {isUpcoming && (
            <>
              {onViewQR && (
                <Button variant="outline" size="md" onClick={onViewQR} leftIcon={<QrCode size={18} />}>
                  View QR
                </Button>
              )}
              {onNavigate && (
                <Button variant="outline" size="md" onClick={onNavigate} leftIcon={<MapPin size={18} />}>
                  Navigate
                </Button>
              )}
              {onViewDetails && (
                <Button variant="primary" size="md" onClick={onViewDetails} rightIcon={<ChevronRight size={18} />}>
                  View Details
                </Button>
              )}
              {onCancel && (
                <Button variant="ghost" size="md" onClick={onCancel} className="pk-booking-card__cancel-btn">
                  Cancel
                </Button>
              )}
            </>
          )}
          {booking.status === 'completed' && (
            <>
              <Button variant="outline" size="md" onClick={onViewDetails} rightIcon={<ChevronRight size={18} />}>
                View Receipt
              </Button>
              <Button variant="ghost" size="md" onClick={() => { /* Rebook */ }}>
                Book Again
              </Button>
            </>
          )}
          {booking.status === 'cancelled' && (
            <Button variant="ghost" size="md" onClick={() => { /* Rebook */ }}>
              Book Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * @typedef {Object} BookingListProps
 * @property {Array<Object>} bookings
 * @property {'all'|'upcoming'|'active'|'completed'|'cancelled'} [filter]
 * @property {Function} [onFilterChange]
 * @property {Function} [onViewDetails]
 * @property {Function} [onExtend]
 * @property {Function} [onCancel]
 * @property {Function} [onViewQR]
 * @property {Function} [onNavigate]
 * @property {string} [emptyMessage]
 * @property {string} [className]
 */

export function BookingList({
  bookings,
  filter = 'all',
  onFilterChange,
  onViewDetails,
  onExtend,
  onCancel,
  onViewQR,
  onNavigate,
  emptyMessage = 'No bookings found',
  className = '',
}) {
  const filteredBookings = bookings.filter(b => filter === 'all' || b.status === filter);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className={`pk-booking-list ${className}`}>
      <div className="pk-booking-list__header">
        <div className="pk-booking-list__tabs" role="tablist" aria-label="Booking filters">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={filter === tab.id}
              aria-controls={`panel-${tab.id}`}
              className={`pk-booking-list__tab ${filter === tab.id ? 'active' : ''}`}
              onClick={() => onFilterChange?.(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="pk-booking-list__empty">
          <div className="pk-booking-list__empty-icon">
            <Calendar size={48} aria-hidden="true" />
          </div>
          <h3 className="pk-booking-list__empty-title">No bookings found</h3>
          <p className="pk-booking-list__empty-message">{emptyMessage}</p>
        </div>
      ) : (
        <div className="pk-booking-list__cards" role="tabpanel" id={`panel-${filter}`}>
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onViewDetails={() => onViewDetails?.(booking)}
              onExtend={() => onExtend?.(booking)}
              onCancel={() => onCancel?.(booking)}
              onViewQR={() => onViewQR?.(booking)}
              onNavigate={() => onNavigate?.(booking)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
