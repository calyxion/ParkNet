import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../base/Button';
import { Avatar } from '../base/Avatar';
import './Sidebar.css';

/**
 * @typedef {Object} NavItem
 * @property {string} id
 * @property {string} label
 * @property {React.ReactNode} icon
 * @property {string} path
 * @property {Array<'admin'|'operator'|'user'>} [roles]
 * @property {string|number} [badge]
 */

/**
 * @typedef {Object} SidebarProps
 * @property {Object|null} user
 * @property {string} user.name
 * @property {string} user.email
 * @property {string} user.role
 * @property {string} [user.avatar]
 * @property {Array<NavItem>} navItems
 * @property {Function} onLogout
 * @property {boolean} [collapsed]
 * @property {Function} [onToggleCollapse]
 * @property {string} [className]
 */

export function Sidebar({
  user,
  navItems,
  onLogout,
  collapsed = false,
  onToggleCollapse,
  className = '',
}) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredItems = navItems.filter(item => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.role);
  });

  const classNames = [
    'pk-sidebar',
    collapsed && 'pk-sidebar--collapsed',
    mobileOpen && 'pk-sidebar--mobile-open',
    className,
  ].filter(Boolean).join(' ');

  return (
    <>
      {mobileOpen && (
        <div
          className="pk-sidebar__backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={classNames}
        role="navigation"
        aria-label="Main navigation"
        data-collapsed={collapsed}
      >
        {/* Logo */}
        <div className="pk-sidebar__logo">
          <div className="pk-sidebar__logo-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#brandGradient)"/>
              <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="brandGradient" x1="0" y1="0" x2="32" y2="32">
                  <stop offset="0%" stopColor="#0066CC"/>
                  <stop offset="100%" stopColor="#004499"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          {!collapsed && (
            <div className="pk-sidebar__logo-text">
              <span className="pk-sidebar__logo-name">PARKNET</span>
              <span className="pk-sidebar__logo-tagline">Smart Parking</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="pk-sidebar__nav" aria-label="Primary">
          <ul className="pk-sidebar__list" role="list">
            {filteredItems.map((item) => (
              <li key={item.id} className="pk-sidebar__item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `pk-sidebar__link ${isActive ? 'pk-sidebar__link--active' : ''}`
                  }
                  onClick={() => setMobileOpen(false)}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  <span className="pk-sidebar__link-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <>
                      <span className="pk-sidebar__link-label">{item.label}</span>
                      {item.badge && (
                        <span className="pk-sidebar__link-badge" aria-label={`${item.badge} notifications`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User section */}
        {!collapsed && user && (
          <div className="pk-sidebar__user">
            <div className="pk-sidebar__user-info">
              <Avatar
                name={user.name}
                src={user.avatar}
                size="sm"
                status="online"
              />
              <div className="pk-sidebar__user-details">
                <span className="pk-sidebar__user-name">{user.name}</span>
                <span className="pk-sidebar__user-role">{user.role}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              aria-label="Sign out"
              fullWidth
              leftIcon={<ChevronLeft size={16} />}
            >
              Sign out
            </Button>
          </div>
        )}

        {/* Collapse toggle */}
        {onToggleCollapse && (
          <button
            className="pk-sidebar__toggle"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        )}

        {/* Mobile toggle */}
        <button
          className="pk-sidebar__mobile-toggle"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </aside>
    </>
  );
}
