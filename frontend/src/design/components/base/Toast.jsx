import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import './Toast.css';

/**
 * @typedef {Object} Toast
 * @property {string} id
 * @property {'success'|'error'|'warning'|'info'|'default'} type
 * @property {string} title
 * @property {string} [message]
 * @property {number} [duration]
 * @property {Object} [action]
 * @property {string} action.label
 * @property {Function} action.onClick
 * @property {boolean} [dismissible]
 */

export function ToastContainer({
  toasts,
  onDismiss,
  position = 'bottom-right',
  maxVisible = 5,
  className = '',
}) {
  const visibleToasts = toasts.slice(-maxVisible);

  const positionClasses = {
    'top-right': 'pk-toast-container--top-right',
    'top-left': 'pk-toast-container--top-left',
    'bottom-right': 'pk-toast-container--bottom-right',
    'bottom-left': 'pk-toast-container--bottom-left',
    'top-center': 'pk-toast-container--top-center',
    'bottom-center': 'pk-toast-container--bottom-center',
  };

  return (
    <div
      className={`pk-toast-container ${positionClasses[position]} ${className}`}
      role="region"
      aria-label="Notifications"
      aria-live="polite"
    >
      {visibleToasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onDismiss(toast.id), 200);
      }, toast.duration ?? 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, onDismiss]);

  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertTriangle size={20} />,
    info: <Info size={20} />,
    default: <Info size={20} />,
  };

  const iconColor = {
    success: 'var(--color-status-success)',
    error: 'var(--color-status-error)',
    warning: 'var(--color-status-warning)',
    info: 'var(--color-brand-primary)',
    default: 'var(--color-text-secondary)',
  };

  return (
    <div
      className={`pk-toast pk-toast--${toast.type} ${isExiting ? 'pk-toast--exiting' : ''}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="pk-toast__icon" style={{ color: iconColor[toast.type] }}>
        {icons[toast.type]}
      </div>
      <div className="pk-toast__content">
        <div className="pk-toast__title">{toast.title}</div>
        {toast.message && <div className="pk-toast__message">{toast.message}</div>}
      </div>
      {toast.action && (
        <button
          className="pk-toast__action"
          onClick={toast.action.onClick}
        >
          {toast.action.label}
        </button>
      )}
      {toast.dismissible !== false && (
        <button
          className="pk-toast__close"
          onClick={() => { setIsExiting(true); setTimeout(() => onDismiss(toast.id), 200); }}
          aria-label="Dismiss notification"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Math.random().toString(36).slice(2, 9);
    const newToast = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);
    return id;
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const dismissAll = () => {
    setToasts([]);
  };

  const success = (title, message, options) =>
    addToast({ type: 'success', title, message, ...options });

  const error = (title, message, options) =>
    addToast({ type: 'error', title, message, ...options });

  const warning = (title, message, options) =>
    addToast({ type: 'warning', title, message, ...options });

  const info = (title, message, options) =>
    addToast({ type: 'info', title, message, ...options });

  return {
    toasts,
    addToast,
    dismissToast,
    dismissAll,
    success,
    error,
    warning,
    info,
  };
}
