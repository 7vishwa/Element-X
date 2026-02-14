/**
 * Ghost Agent UI - Design System
 * Minimalist, brutalist aesthetic with Antigravity physics
 */

export const THEME = {
  colors: {
    // Core palette
    black: '#000000',
    white: '#FFFFFF',
    
    // Functional colors
    accent: '#FFFFFF',
    border: '#FFFFFF',
    background: '#000000',
    foreground: '#FFFFFF',
    
    // Status colors
    active: '#00FF00',
    inactive: '#666666',
    processing: '#FFFF00',
    encrypted: '#00FFFF',
  },
  
  typography: {
    // Font families
    mono: 'Courier New, monospace',
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    
    // Font sizes
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
  
  borders: {
    // Sharp, thin borders
    thin: '1px solid #FFFFFF',
    medium: '2px solid #FFFFFF',
    thick: '3px solid #FFFFFF',
  },
  
  borderRadius: {
    // Minimal rounding - professional look
    none: '0px',
    minimal: '2px',
    small: '4px',
  },
  
  shadows: {
    // Flat design - no shadows, use borders instead
    none: 'none',
  },
  
  transitions: {
    fast: '0.15s ease-in-out',
    normal: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
  
  zIndex: {
    background: 0,
    default: 1,
    elevated: 10,
    sticky: 20,
    dropdown: 30,
    modal: 40,
    toast: 50,
  },
  
  // Spring physics for Framer Motion (Antigravity feel)
  springPhysics: {
    light: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
    normal: {
      type: 'spring',
      stiffness: 150,
      damping: 20,
      mass: 1,
    },
    tight: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      mass: 1,
    },
  },
} as const;

// Typography utility
export const TYPOGRAPHY = {
  h1: `
    font-size: ${THEME.typography['3xl']};
    font-family: ${THEME.typography.mono};
    font-weight: 700;
    letter-spacing: -1px;
  `,
  h2: `
    font-size: ${THEME.typography['2xl']};
    font-family: ${THEME.typography.mono};
    font-weight: 700;
  `,
  h3: `
    font-size: ${THEME.typography.xl};
    font-family: ${THEME.typography.mono};
    font-weight: 600;
  `,
  body: `
    font-size: ${THEME.typography.base};
    font-family: ${THEME.typography.sans};
    font-weight: 400;
    line-height: 1.6;
  `,
  code: `
    font-size: ${THEME.typography.sm};
    font-family: ${THEME.typography.mono};
    font-weight: 400;
  `,
  tag: `
    font-size: ${THEME.typography.xs};
    font-family: ${THEME.typography.mono};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  `,
} as const;

// Motion presets
export const MOTION = {
  // Entrance animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: THEME.springPhysics.normal,
  },
  
  slideInFromTop: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: THEME.springPhysics.normal,
  },
  
  slideInFromBottom: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: THEME.springPhysics.normal,
  },
  
  slideInFromLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: THEME.springPhysics.normal,
  },
  
  slideInFromRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: THEME.springPhysics.normal,
  },
  
  floatIn: {
    initial: { opacity: 0, y: 10, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.95 },
    transition: THEME.springPhysics.light,
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: THEME.springPhysics.normal,
  },
} as const;
