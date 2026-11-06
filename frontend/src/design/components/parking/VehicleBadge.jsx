import './VehicleBadge.css';

const VEHICLE_CONFIG = {
  car: { label: 'Car', icon: '🚗', color: '#2196F3' },
  bike: { label: 'Bike', icon: '🏍️', color: '#FF9800' },
  suv: { label: 'SUV', icon: '🚙', color: '#FF4757' },
  truck: { label: 'Truck', icon: '🚚', color: '#AB47BC' },
  'ev car': { label: 'EV Car', icon: '⚡', color: '#00E5FF' },
  'ev': { label: 'EV', icon: '⚡', color: '#00E5FF' },
  'ev bike': { label: 'EV Bike', icon: '🛵', color: '#00E5FF' },
  bicycle: { label: 'Bicycle', icon: '🚲', color: '#4CAF50' },
  other: { label: 'Vehicle', icon: '🚗', color: '#757575' },
};

function getVehicleConfig(typeStr) {
  if (!typeStr) return VEHICLE_CONFIG.other;
  const normalized = typeStr.toLowerCase().trim();
  return VEHICLE_CONFIG[normalized] || VEHICLE_CONFIG.other;
}

/**
 * @typedef {Object} VehicleBadgeProps
 * @property {string} type
 * @property {'xs'|'sm'|'md'|'lg'} [size]
 * @property {'badge'|'chip'|'card'} [variant]
 * @property {boolean} [showLabel]
 * @property {string} [className]
 */

export function VehicleBadge({
  type,
  size = 'md',
  variant = 'badge',
  showLabel = true,
  className = '',
}) {
  const config = getVehicleConfig(type);

  const classNames = [
    'pk-vehicle-badge',
    `pk-vehicle-badge--${variant}`,
    `pk-vehicle-badge--${size}`,
    className,
  ].filter(Boolean).join(' ');

  if (variant === 'chip') {
    return (
      <span className={classNames} style={{ '--vehicle-color': config.color }}>
        <span className="pk-vehicle-badge__icon" aria-hidden="true">{config.icon}</span>
        {showLabel && <span className="pk-vehicle-badge__label">{config.label}</span>}
      </span>
    );
  }

  if (variant === 'card') {
    return (
      <div className={classNames} style={{ '--vehicle-color': config.color }}>
        <div className="pk-vehicle-badge__avatar" aria-hidden="true">
          {config.icon}
        </div>
        <div className="pk-vehicle-badge__info">
          <span className="pk-vehicle-badge__label">{config.label}</span>
          {type && <span className="pk-vehicle-badge__type">{type}</span>}
        </div>
      </div>
    );
  }

  return (
    <span className={classNames} style={{ '--vehicle-color': config.color }}>
      <span className="pk-vehicle-badge__icon" aria-hidden="true">{config.icon}</span>
      {showLabel && <span className="pk-vehicle-badge__label">{config.label}</span>}
    </span>
  );
}

/**
 * @typedef {Object} VehicleSelectorProps
 * @property {string} value
 * @property {Function} onChange
 * @property {Array<string>} [options]
 * @property {'sm'|'md'|'lg'} [size]
 * @property {string} [className]
 */

const DEFAULT_VEHICLE_TYPES = ['Car', 'Bike', 'SUV', 'Truck', 'EV Car', 'EV Bike', 'Bicycle'];

export function VehicleSelector({
  value,
  onChange,
  options = DEFAULT_VEHICLE_TYPES,
  size = 'md',
  className = '',
}) {
  return (
    <div className={`pk-vehicle-selector ${className}`} role="group" aria-label="Select vehicle type">
      {options.map((vehicle) => {
        const config = getVehicleConfig(vehicle);
        const isSelected = value.toLowerCase().trim() === vehicle.toLowerCase().trim();
        return (
          <button
            key={vehicle}
            type="button"
            className={`pk-vehicle-selector__option ${isSelected ? 'selected' : ''}`}
            onClick={() => onChange(vehicle)}
            aria-pressed={isSelected}
            style={{ '--vehicle-color': config.color }}
          >
            <span className="pk-vehicle-selector__icon" aria-hidden="true">{config.icon}</span>
            <span className="pk-vehicle-selector__label">{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}
