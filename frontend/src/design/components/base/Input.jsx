import { forwardRef, useId } from 'react';
import './Input.css';

/**
 * @typedef {Object} InputProps
 * @property {string} [label]
 * @property {string} [error]
 * @property {string} [hint]
 * @property {React.ReactNode} [leftIcon]
 * @property {React.ReactNode} [rightIcon]
 * @property {boolean} [fullWidth]
 */

export const Input = forwardRef(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      style,
      id: providedId,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;
    const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;

    const classNames = [
      'pk-input-wrapper',
      fullWidth && 'pk-input-wrapper--full-width',
      error && 'pk-input-wrapper--error',
      disabled && 'pk-input-wrapper--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={classNames} style={style}>
        {label && (
          <label htmlFor={id} className="pk-input__label">
            {label}
            {required && <span className="pk-input__required" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="pk-input__container">
          {leftIcon && <span className="pk-input__icon pk-input__icon--left" aria-hidden="true">{leftIcon}</span>}
          <input
            ref={ref}
            id={id}
            className="pk-input"
            disabled={disabled}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            {...props}
          />
          {rightIcon && <span className="pk-input__icon pk-input__icon--right" aria-hidden="true">{rightIcon}</span>}
        </div>
        {error && (
          <p id={errorId} className="pk-input__error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="pk-input__hint">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Textarea = forwardRef(
  (
    {
      label,
      error,
      hint,
      fullWidth = false,
      className = '',
      style,
      id: providedId,
      disabled,
      required,
      rows = 3,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;
    const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;

    const classNames = [
      'pk-input-wrapper',
      fullWidth && 'pk-input-wrapper--full-width',
      error && 'pk-input-wrapper--error',
      disabled && 'pk-input-wrapper--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={classNames} style={style}>
        {label && (
          <label htmlFor={id} className="pk-input__label">
            {label}
            {required && <span className="pk-input__required" aria-hidden="true">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className="pk-textarea"
          disabled={disabled}
          required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          rows={rows}
          {...props}
        />
        {error && (
          <p id={errorId} className="pk-input__error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="pk-input__hint">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export const Select = forwardRef(
  (
    {
      label,
      error,
      hint,
      options,
      placeholder,
      fullWidth = false,
      className = '',
      style,
      id: providedId,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const errorId = `${id}-error`;
    const hintId = `${id}-hint`;
    const describedBy = [error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined;

    const classNames = [
      'pk-input-wrapper',
      fullWidth && 'pk-input-wrapper--full-width',
      error && 'pk-input-wrapper--error',
      disabled && 'pk-input-wrapper--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={classNames} style={style}>
        {label && (
          <label htmlFor={id} className="pk-input__label">
            {label}
            {required && <span className="pk-input__required" aria-hidden="true">*</span>}
          </label>
        )}
        <div className="pk-select__container">
          <select
            ref={ref}
            id={id}
            className="pk-select"
            disabled={disabled}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            {...props}
          >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="pk-select__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
        {error && (
          <p id={errorId} className="pk-input__error" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="pk-input__hint">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
