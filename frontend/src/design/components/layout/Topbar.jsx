import { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, Command, MapPin } from 'lucide-react';
import { Button, Input } from '../base';
import { Avatar } from '../base/Avatar';
import { Modal } from '../base/Modal';
import { useToast } from '../base/Toast';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import './Topbar.css';

/**
 * @typedef {Object} TopbarProps
 * @property {Object|null} user
 * @property {string} user.name
 * @property {string} user.email
 * @property {string} user.role
 * @property {string} [user.avatar]
 * @property {Function} [onSearch]
 * @property {Function} [onProfileClick]
 * @property {Function} [onNotificationsClick]
 * @property {string} [searchPlaceholder]
 * @property {boolean} [liveIndicator]
 * @property {Object} [stats]
 * @property {number} stats.free
 * @property {number} stats.total
 * @property {number} [stats.revenue]
 * @property {string} [className]
 */

export function Topbar({
  user,
  onSearch,
  onProfileClick,
  onNotificationsClick,
  searchPlaceholder = 'Search parking locations...',
  liveIndicator = true,
  stats,
  className = '',
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);

  const { toasts, dismissToast, dismissAll } = useToast();

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandOpen(true);
        setSearchQuery('');
      }
      if (e.key === 'Escape') {
        setCommandOpen(false);
        setNotificationsOpen(false);
        setSearchOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (commandOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [commandOpen]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
    setSearchOpen(false);
  };

  return (
    <header className={`pk-topbar ${className}`} role="banner">
      <div className="pk-topbar__left">
        <button
          className="pk-topbar__menu-toggle"
          aria-label="Toggle navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="pk-topbar__search" data-open={searchOpen || commandOpen}>
          <Search className="pk-topbar__search-icon" aria-hidden="true" />
          <Input
            ref={searchRef}
            type="search"
            placeholder={commandOpen ? 'Search pages, actions...' : searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => { setSearchOpen(true); setCommandOpen(true); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                onSearch?.(searchQuery.trim());
                setSearchOpen(false);
              }
              if (e.key === 'Escape') {
                setSearchOpen(false);
                setCommandOpen(false);
              }
            }}
            className="pk-topbar__search-input"
            aria-label={commandOpen ? 'Command palette' : 'Search parking'}
            fullWidth
          />
          {(searchQuery || commandOpen) && (
            <button
              className="pk-topbar__search-clear"
              onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }}
              aria-label="Clear search"
            >
              <ChevronDown size={16} />
            </button>
          )}
          <kbd className="pk-topbar__search-shortcut" aria-hidden="true">
            <span>⌘</span><span>K</span>
          </kbd>
        </div>

        {liveIndicator && (
          <div className="pk-topbar__live" aria-live="polite">
            <span className="pk-topbar__live-dot" aria-hidden="true" />
            <span className="pk-topbar__live-text">LIVE</span>
          </div>
        )}
      </div>

      <div className="pk-topbar__center">
        {stats && (
          <div className="pk-topbar__stats" aria-label="Parking availability">
            <span className="pk-topbar__stat-free" aria-label={`${stats.free} free spots`}>
              <span className="pk-topbar__stat-value">{stats.free}</span>
              <span className="pk-topbar__stat-label">free</span>
            </span>
            <span className="pk-topbar__stat-divider" aria-hidden="true">/</span>
            <span className="pk-topbar__stat-total" aria-label={`${stats.total} total spots`}>
              {stats.total}
            </span>
          </div>
        )}
      </div>

      <div className="pk-topbar__right">
        {stats?.revenue !== undefined && (
          <div className="pk-topbar__revenue" aria-label="Today's revenue">
            <span className="pk-topbar__revenue-label">Today</span>
            <span className="pk-topbar__revenue-value">₹{stats.revenue.toLocaleString()}</span>
          </div>
        )}

        <div className="pk-topbar__actions">
          <button
            ref={notificationsRef}
            className="pk-topbar__icon-btn"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            aria-haspopup="true"
          >
            <Bell className="pk-topbar__icon" aria-hidden="true" />
            {toasts.length > 0 && (
              <span className="pk-topbar__badge" aria-label={`${toasts.length} unread notifications`}>
                {toasts.length > 9 ? '9+' : toasts.length}
              </span>
            )}
          </button>

          {user && (
            <button
              className="pk-topbar__user-btn"
              onClick={onProfileClick}
              aria-label="User menu"
              aria-expanded={false}
              aria-haspopup="true"
            >
              <Avatar
                name={user.name}
                src={user.avatar}
                size="sm"
                status="online"
              />
            </button>
          )}
        </div>
      </div>

      {/* Notifications dropdown */}
      {notificationsOpen && (
        <div
          ref={notificationsRef}
          className="pk-topbar__notifications"
          role="menu"
          aria-label="Notifications"
        >
          <div className="pk-topbar__notifications-header">
            <h3 className="pk-topbar__notifications-title">Activity Feed</h3>
            {toasts.length > 0 && (
              <button
                className="pk-topbar__notifications-clear"
                onClick={dismissAll}
              >
                Clear all
              </button>
            )}
          </div>
          <div className="pk-topbar__notifications-list">
            {toasts.length === 0 ? (
              <div className="pk-topbar__notifications-empty">
                <Bell size={24} aria-hidden="true" />
                <p>No recent activity</p>
              </div>
            ) : (
              toasts.slice(0, 10).map((toast) => (
                <div
                  key={toast.id}
                  className="pk-topbar__notification"
                  role="menuitem"
                  onClick={() => dismissToast(toast.id)}
                >
                  <div className={`pk-topbar__notification-icon pk-topbar__notification-icon--${toast.type}`}>
                    {toast.type === 'success' && <CheckCircle size={16} />}
                    {toast.type === 'error' && <AlertCircle size={16} />}
                    {toast.type === 'warning' && <AlertTriangle size={16} />}
                    {toast.type === 'info' && <Info size={16} />}
                  </div>
                  <div className="pk-topbar__notification-content">
                    <p className="pk-topbar__notification-title">{toast.title}</p>
                    {toast.message && (
                      <p className="pk-topbar__notification-message">{toast.message}</p>
                    )}
                  </div>
                  <button
                    className="pk-topbar__notification-dismiss"
                    onClick={(e) => { e.stopPropagation(); dismissToast(toast.id); }}
                    aria-label="Dismiss"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Command Palette */}
      <Modal
        isOpen={commandOpen}
        onClose={() => { setCommandOpen(false); setSearchQuery(''); }}
        size="lg"
        showCloseButton={false}
        closeOnOverlayClick={true}
      >
        <div className="pk-command-palette">
          <div className="pk-command-palette__input-wrapper">
            <Command className="pk-command-palette__icon" aria-hidden="true" />
            <Input
              ref={searchRef}
              type="search"
              placeholder="Search pages, actions, parking..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setCommandOpen(false);
                  setSearchQuery('');
                }
              }}
              fullWidth
              className="pk-command-palette__input"
            />
            <kbd className="pk-command-palette__shortcut">
              <span>⌘</span><span>K</span>
            </kbd>
          </div>
          <div className="pk-command-palette__sections">
            <div className="pk-command-palette__section">
              <h4 className="pk-command-palette__section-title">Navigation</h4>
              <div className="pk-command-palette__items">
                {[
                  { label: 'Dashboard', description: 'Overview & KPIs', icon: '📊', path: '/dashboard' },
                  { label: 'Live Map', description: 'Real-time parking availability', icon: '🗺️', path: '/map' },
                  { label: 'Explore', description: 'Find parking near you', icon: '🔍', path: '/explore' },
                  { label: 'Bookings', description: 'Your reservations & history', icon: '📋', path: '/bookings' },
                  { label: 'Vehicles', description: 'Manage your vehicles', icon: '🚗', path: '/vehicles' },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="pk-command-palette__item"
                    onClick={() => { setCommandOpen(false); setSearchQuery(''); window.location.href = item.path; }}
                  >
                    <span className="pk-command-palette__item-icon">{item.icon}</span>
                    <div className="pk-command-palette__item-content">
                      <span className="pk-command-palette__item-label">{item.label}</span>
                      <span className="pk-command-palette__item-desc">{item.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {searchQuery && (
              <div className="pk-command-palette__section">
                <h4 className="pk-command-palette__section-title">Search Results</h4>
                <div className="pk-command-palette__items">
                  <button className="pk-command-palette__item" onClick={() => { onSearch?.(searchQuery); setCommandOpen(false); }}>
                    <MapPin className="pk-command-palette__item-icon" size={16} />
                    <div className="pk-command-palette__item-content">
                      <span className="pk-command-palette__item-label">Search for "{searchQuery}"</span>
                      <span className="pk-command-palette__item-desc">Find parking locations</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </header>
  );
}
