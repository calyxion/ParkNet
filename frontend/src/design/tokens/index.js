export const colors = {
  // Brand
  brand: {
    primary: '#0066CC',
    primaryHover: '#0052A3',
    primaryLight: '#E8F0FE',
    primaryDark: '#004499',
    accent: '#FFB800',
    accentHover: '#E6A700',
    accentLight: '#FFF8E1',
  },

  // Semantic - Light mode
  light: {
    bg: {
      primary: '#FFFFFF',
      secondary: '#F8F9FA',
      tertiary: '#F1F3F4',
      elevated: '#FFFFFF',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    surface: {
      primary: '#FFFFFF',
      secondary: '#F8F9FA',
      tertiary: '#F1F3F4',
      interactive: '#FFFFFF',
      interactiveHover: '#F1F3F4',
      interactiveActive: '#E8EAED',
    },
    border: {
      primary: '#E0E0E0',
      secondary: '#DADCE0',
      focus: '#0066CC',
      error: '#D93025',
    },
    text: {
      primary: '#202124',
      secondary: '#5F6368',
      tertiary: '#80868B',
      inverse: '#FFFFFF',
      link: '#0066CC',
      error: '#D93025',
      success: '#1E8E3E',
      warning: '#F57F17',
    },
    icon: {
      primary: '#202124',
      secondary: '#5F6368',
      tertiary: '#80868B',
      inverse: '#FFFFFF',
    },
    status: {
      success: '#1E8E3E',
      successBg: '#E8F5E9',
      successBorder: '#C8E6C9',
      warning: '#F57F17',
      warningBg: '#FFF8E1',
      warningBorder: '#FFECB3',
      error: '#D93025',
      errorBg: '#FCE8E6',
      errorBorder: '#F5C6CB',
      info: '#0066CC',
      infoBg: '#E8F0FE',
      infoBorder: '#D2E3FC',
    },
    availability: {
      available: '#1E8E3E',
      availableBg: '#E8F5E9',
      limited: '#F57F17',
      limitedBg: '#FFF8E1',
      full: '#D93025',
      fullBg: '#FCE8E6',
      reserved: '#0066CC',
      reservedBg: '#E8F0FE',
    },
  },

  // Semantic - Dark mode
  dark: {
    bg: {
      primary: '#0A0E17',
      secondary: '#111827',
      tertiary: '#1A2234',
      elevated: '#151D2E',
      overlay: 'rgba(0, 0, 0, 0.7)',
    },
    surface: {
      primary: '#111827',
      secondary: '#1A2234',
      tertiary: '#222D3E',
      interactive: '#1A2234',
      interactiveHover: '#222D3E',
      interactiveActive: '#2D3A4F',
    },
    border: {
      primary: '#2D3A4F',
      secondary: '#3A4A60',
      focus: '#4A9EFF',
      error: '#EF5350',
    },
    text: {
      primary: '#E8EAED',
      secondary: '#9AA0A6',
      tertiary: '#6E7681',
      inverse: '#0A0E17',
      link: '#4A9EFF',
      error: '#EF5350',
      success: '#66BB6A',
      warning: '#FFD54F',
    },
    icon: {
      primary: '#E8EAED',
      secondary: '#9AA0A6',
      tertiary: '#6E7681',
      inverse: '#0A0E17',
    },
    status: {
      success: '#66BB6A',
      successBg: '#1B3A2A',
      successBorder: '#2E7D32',
      warning: '#FFD54F',
      warningBg: '#3A331A',
      warningBorder: '#F57F17',
      error: '#EF5350',
      errorBg: '#3A1B1B',
      errorBorder: '#C62828',
      info: '#4A9EFF',
      infoBg: '#1A2D4A',
      infoBorder: '#0066CC',
    },
    availability: {
      available: '#66BB6A',
      availableBg: '#1B3A2A',
      limited: '#FFD54F',
      limitedBg: '#3A331A',
      full: '#EF5350',
      fullBg: '#3A1B1B',
      reserved: '#4A9EFF',
      reservedBg: '#1A2D4A',
    },
  },
};

export const typography = {
  fontFamilies: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
    display: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  fontSizes: {
    xs: '0.6875rem',    // 11px
    sm: '0.75rem',      // 12px
    base: '0.875rem',   // 14px
    lg: '1rem',         // 16px
    xl: '1.125rem',     // 18px
    '2xl': '1.25rem',   // 20px
    '3xl': '1.5rem',    // 24px
    '4xl': '2rem',      // 32px
    '5xl': '2.5rem',    // 40px
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.04em',
    widest: '0.1em',
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px,
};

export const borderRadius = {
  none: '0',
  sm: '0.25rem',    // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

export const shadows = {
  none: 'none',
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
  focus: '0 0 0 3px rgba(0, 102, 204, 0.4)',
};

export const motion = {
  durations: {
    instant: '0ms',
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
    slower: '500ms',
  },
  easings: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};

export const breakpoints = {
  sm: '360px',
  md: '768px',
  lg: '1024px',
  xl: '1440px',
  '2xl': '1920px',
};

export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
  commandPalette: 900,
};

export const transitions = {
  fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 350ms cubic-bezier(0.4, 0, 0.2, 1)',
  colors: 'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
  transform: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 150ms ease',
};

export const layout = {
  sidebar: {
    width: '260px',
    widthCollapsed: '64px',
    mobileHeight: '64px',
  },
  topbar: {
    height: '56px',
    mobileHeight: '52px',
  },
  bottomNav: {
    height: '64px',
  },
  mapControls: {
    size: '40px',
  },
  container: {
    maxWidth: '1440px',
    padding: '1.5rem',
  },
};

export const icons = {
  sizes: {
    xs: '12px',
    sm: '16px',
    md: '20px',
    lg: '24px',
    xl: '32px',
    '2xl': '40px',
  },
};

export const focusRing = {
  width: '2px',
  offset: '2px',
  color: 'var(--color-brand-primary)',
};

export const glass = {
  light: 'background: rgba(255, 255, 255, 0.7); backdrop-filter: saturate(180%) blur(20px);',
  dark: 'background: rgba(10, 14, 23, 0.7); backdrop-filter: saturate(180%) blur(20px);',
};

export const gradients = {
  brand: 'linear-gradient(135deg, #0066CC 0%, #004499 100%)',
  brandHover: 'linear-gradient(135deg, #0052A3 0%, #003D8A 100%)',
  accent: 'linear-gradient(135deg, #FFB800 0%, #E6A700 100%)',
  surface: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%)',
  surfaceDark: 'linear-gradient(180deg, rgba(17,24,39,0.9) 0%, rgba(17,24,39,0.5) 100%)',
  mesh: 'radial-gradient(ellipse at 50% 50%, rgba(0,102,204,0.08) 0%, transparent 70%)',
  meshDark: 'radial-gradient(ellipse at 50% 50%, rgba(0,102,204,0.12) 0%, transparent 70%)',
};

export const elevations = {
  level0: 'none',
  level1: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
  level2: '0 4px 8px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06)',
  level3: '0 8px 16px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.06)',
  level4: '0 16px 32px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08)',
  level5: '0 24px 48px rgba(0,0,0,0.15), 0 12px 24px rgba(0,0,0,0.1)',
};

export const componentTokens = {
  button: {
    height: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
    padding: {
      sm: '0 12px',
      md: '0 16px',
      lg: '0 24px',
    },
    fontSize: {
      sm: '0.75rem',
      md: '0.875rem',
      lg: '1rem',
    },
    fontWeight: 600,
    borderRadius: '8px',
    transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  input: {
    height: '44px',
    padding: '0 14px',
    fontSize: '0.875rem',
    borderRadius: '10px',
    borderWidth: '1px',
    transition: 'all 150ms ease',
  },
  card: {
    borderRadius: '12px',
    padding: '1.5rem',
    borderWidth: '1px',
  },
  badge: {
    height: '20px',
    padding: '0 8px',
    fontSize: '0.6875rem',
    fontWeight: 700,
    borderRadius: '9999px',
  },
  avatar: {
    sizes: {
      xs: '24px',
      sm: '32px',
      md: '40px',
      lg: '48px',
      xl: '64px',
    },
  },
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  motion,
  breakpoints,
  zIndex,
  transitions,
  layout,
  icons,
  focusRing,
  glass,
  gradients,
  elevations,
  componentTokens,
};

/**
 * @typedef {typeof theme} Theme
 */

export function getColorModeColors(mode = 'dark') {
  return mode === 'light' ? colors.light : colors.dark;
}

export function createTheme(mode = 'dark') {
  const modeColors = getColorModeColors(mode);
  return {
    ...theme,
    colors: {
      ...theme.colors,
      ...modeColors,
      mode,
    },
  };
}