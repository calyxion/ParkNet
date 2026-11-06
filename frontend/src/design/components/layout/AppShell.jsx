import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { BottomNavigation } from './BottomNavigation';
import './AppShell.css';

/**
 * @typedef {Object} AppShellProps
 * @property {Object|null} user
 * @property {string} user.name
 * @property {string} user.email
 * @property {string} user.role
 * @property {string} [user.avatar]
 * @property {Array<Object>} navItems
 * @property {string} navItems[].id
 * @property {string} navItems[].label
 * @property {React.ReactNode} navItems[].icon
 * @property {string} navItems[].path
 * @property {Array<'admin'|'operator'|'user'>} [navItems[].roles]
 * @property {string|number} [navItems[].badge]
 * @property {Function} onLogout
 * @property {Function} [onSearch]
 * @property {boolean} [sidebarCollapsed]
 * @property {Function} [onToggleSidebar]
 * @property {boolean} [liveIndicator]
 * @property {Object} [stats]
 * @property {number} stats.free
 * @property {number} stats.total
 * @property {number} [stats.revenue]
 * @property {React.ReactNode} [children]
 */

export function AppShell({
  user,
  navItems,
  onLogout,
  onSearch,
  sidebarCollapsed = false,
  onToggleSidebar,
  liveIndicator = true,
  stats,
  children,
}) {
  return (
    <div className="pk-app-shell">
      <Sidebar
        user={user}
        navItems={navItems}
        onLogout={onLogout}
        collapsed={sidebarCollapsed}
        onToggleCollapse={onToggleSidebar}
      />
      <div className="pk-app-shell__main" style={{ marginLeft: sidebarCollapsed ? '64px' : '260px' }}>
        <Topbar
          user={user}
          onSearch={onSearch}
          liveIndicator={liveIndicator}
          stats={stats}
        />
        <main className="pk-app-shell__content" role="main">
          {children || <Outlet />}
        </main>
      </div>
      <BottomNavigation
        user={user}
        navItems={navItems.filter(item => !item.roles || (user && item.roles.includes(user.role)))}
      />
    </div>
  );
}
