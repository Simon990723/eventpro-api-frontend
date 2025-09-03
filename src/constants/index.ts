// Application constants

export const APP_CONFIG = {
  name: 'Animated Design App',
  version: '1.0.0',
  description: 'Professional event management application with animated design system',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  EVENT_DETAIL: '/event/:eventId',
  MY_REGISTRATIONS: '/my-registrations',
  EVENT_MANAGEMENT: '/manage/event/:eventId',
  ANIMATED_DEMO: '/animated-demo',
} as const;

export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  EVENTS: '/api/events',
  REGISTRATIONS: '/api/registrations',
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1200,
} as const;