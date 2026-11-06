import './FilterChip.css';

/**
 * @typedef {Object} FilterChipProps
 * @property {string} label
 * @property {boolean} [selected]
 * @property {Function} [onClick]
 * @property {Function} [onRemove]
 * @property {boolean} [disabled]
 * @property {'default'|'outlined'|'filled'} [variant]
 * @property {'sm'|'md'|'lg'} [size]
 * @property {React.ReactNode} [icon]
 * @property {number} [count]
 * @property {string} [className]
 */

export function FilterChip({
  label,
  selected = false,
  onClick,
  onRemove,
  disabled = false,
  variant = 'default',
  size = 'md',
  icon,
  count,
  className = '',
}) {
  const classNames = [
    'pk-filter-chip',
    `pk-filter-chip--${variant}`,
    `pk-filter-chip--${size}`,
    selected && 'pk-filter-chip--selected',
    disabled && 'pk-filter-chip--disabled',
    onRemove && 'pk-filter-chip--removable',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    e.stopPropagation();
    if (!disabled && onClick) onClick();
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (!disabled && onRemove) onRemove();
  };

  return (
    <button
      type="button"
      className={classNames}
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={selected ? `${label}, selected` : label}
    >
      {icon && <span className="pk-filter-chip__icon" aria-hidden="true">{icon}</span>}
      <span className="pk-filter-chip__label">{label}</span>
      {count !== undefined && (
        <span className="pk-filter-chip__count" aria-label={`${count} results`}>
          {count > 99 ? '99+' : count}
        </span>
      )}
      {onRemove && !disabled && (
        <button
          className="pk-filter-chip__remove"
          onClick={handleRemove}
          aria-label={`Remove ${label} filter`}
          tabIndex={-1}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </button>
  );
}

/**
 * @typedef {Object} FilterChipGroupProps
 * @property {Array<Object>} chips
 * @property {string} chips[].id
 * @property {string} chips[].label
 * @property {React.ReactNode} [chips[].icon]
 * @property {number} [chips[].count]
 * @property {Array<string>} selectedIds
 * @property {Function} onChange
 * @property {boolean} [multiple]
 * @property {'default'|'outlined'|'filled'} [variant]
 * @property {'sm'|'md'|'lg'} [size]
 * @property {string} [className]
 * @property {string} [ariaLabel]
 */

export function FilterChipGroup({
  chips,
  selectedIds,
  onChange,
  multiple = true,
  variant = 'outlined',
  size = 'md',
  className = '',
  ariaLabel = 'Filters',
}) {
  const handleToggle = (id) => {
    const newSelected = multiple
      ? selectedIds.includes(id)
        ? selectedIds.filter(i => i !== id)
        : [...selectedIds, id]
      : [id];
    onChange(newSelected);
  };

  return (
    <div className={`pk-filter-chip-group ${className}`} role="group" aria-label={ariaLabel}>
      {chips.map((chip) => (
        <FilterChip
          key={chip.id}
          label={chip.label}
          icon={chip.icon}
          count={chip.count}
          selected={selectedIds.includes(chip.id)}
          onClick={() => handleToggle(chip.id)}
          variant={variant}
          size={size}
        />
      ))}
    </div>
  );
}

/**
 * @typedef {Object} SearchFilterProps
 * @property {string} value
 * @property {Function} onChange
 * @property {string} [placeholder]
 * @property {Array<Object>} filters
 * @property {string} filters[].id
 * @property {string} filters[].label
 * @property {React.ReactNode} [filters[].icon]
 * @property {Array<string>} selectedFilters
 * @property {Function} onFilterToggle
 * @property {Function} onSearch
 * @property {string} [className]
 */

export function SearchFilter({
  value,
  onChange,
  placeholder = 'Search parking...',
  filters,
  selectedFilters,
  onFilterToggle,
  onSearch,
  className = '',
}) {
  return (
    <div className={`pk-search-filter ${className}`}>
      <div className="pk-search-filter__input-wrapper">
        <svg className="pk-search-filter__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          className="pk-search-filter__input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onSearch(); }}
          aria-label="Search parking locations"
        />
        {value && (
          <button
            className="pk-search-filter__clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
      {filters.length > 0 && (
        <div className="pk-search-filter__chips" role="group" aria-label="Quick filters">
          {filters.map((filter) => (
            <FilterChip
              key={filter.id}
              label={filter.label}
              icon={filter.icon}
              selected={selectedFilters.includes(filter.id)}
              onClick={() => onFilterToggle(filter.id)}
              variant="outlined"
              size="sm"
            />
          ))}
        </div>
      )}
    </div>
  );
}
