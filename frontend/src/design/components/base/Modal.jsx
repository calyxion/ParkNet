import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import './Modal.css';

/**
 * @typedef {Object} ModalProps
 * @property {boolean} isOpen
 * @property {Function} onClose
 * @property {string} [title]
 * @property {string} [description]
 * @property {React.ReactNode} children
 * @property {'sm'|'md'|'lg'|'xl'|'full'} [size]
 * @property {boolean} [closeOnOverlayClick]
 * @property {boolean} [closeOnEscape]
 * @property {boolean} [showCloseButton]
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 */

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
  style,
}) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  const getScrollbarWidth = () => {
    if (typeof window === 'undefined') return 0;
    return window.innerWidth - document.documentElement.clientWidth;
  };

  const trapFocus = (e) => {
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  };

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${getScrollbarWidth()}px`;
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      previousActiveElement.current?.focus();
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (!isOpen) return;
      if (e.key === 'Escape' && closeOnEscape) {
        onClose();
      }
      if (e.key === 'Tab') {
        trapFocus(e);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="pk-modal-overlay"
      onClick={closeOnOverlayClick ? (e) => { if (e.target === e.currentTarget) onClose(); } : undefined}
      role="presentation"
    >
      <div
        ref={modalRef}
        className={`pk-modal ${className}`}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'pk-modal-title' : undefined}
        aria-describedby={description ? 'pk-modal-description' : undefined}
        tabIndex={-1}
        data-size={size}
      >
        {(title || showCloseButton) && (
          <header className="pk-modal__header">
            {title && (
              <h2 id="pk-modal-title" className="pk-modal__title">
                {title}
              </h2>
            )}
            {description && (
              <p id="pk-modal-description" className="pk-modal__description">
                {description}
              </p>
            )}
            {showCloseButton && (
              <button
                className="pk-modal__close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </header>
        )}
        <div className="pk-modal__content">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

/**
 * @typedef {Object} ConfirmDialogProps
 * @property {boolean} isOpen
 * @property {Function} onClose
 * @property {Function} onConfirm
 * @property {string} title
 * @property {string} message
 * @property {string} [confirmText]
 * @property {string} [cancelText]
 * @property {'danger'|'primary'} [variant]
 * @property {boolean} [loading]
 */

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  loading = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      showCloseButton={false}
    >
      <p className="pk-modal__message">{message}</p>
      <div className="pk-modal__actions">
        <button
          className="pk-button pk-button--secondary pk-button--md"
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </button>
        <button
          className={`pk-button pk-button--${variant} pk-button--md`}
          onClick={() => { onConfirm(); onClose(); }}
          disabled={loading}
        >
          {loading ? '...' : confirmText}
        </button>
      </div>
    </Modal>
  );
}
