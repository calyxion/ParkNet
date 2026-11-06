import { NavLink, useLocation } from 'react-router-dom';
import './BottomNavigation.css';

/**
 * @typedef {Object} BottomNavigationProps
 * @property {Object|null} user
 * @property {string} user.role
 * @property {Array<Object>} navItems
 * @property {string} navItems[].id
 * @property {string} navItems[].label
 * @property {React.ReactNode} navItems[].icon
 * @property {string} navItems[].path
 * @property {Array<'admin'|'operator'|'user'>} [navItems[].roles]
 * @property {string} [className]
 */

export function BottomNavigation({ user, navItems, className = '' }) {
  const location = useLocation();

  const filteredItems = navItems.filter(item => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.role);
  });

  if (filteredItems.length === 0) return null;

  return (
    <nav
      className={`pk-bottom-nav ${className}`}
      role="navigation"
      aria-label="Primary navigation"
    >
      {filteredItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) =>
            `pk-bottom-nav__item ${isActive ? 'pk-bottom-nav__item--active' : ''}`
          }
          aria-current={location.pathname === item.path ? 'page' : undefined}
        >
          <span className="pk-bottom-nav__icon" aria-hidden="true">
            {item.icon}
          </span>
          <span className="pk-bottom-nav__label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
