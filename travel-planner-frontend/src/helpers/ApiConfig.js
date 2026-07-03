const host =  window.location.hostname;

export const AUTH_API_URL = `http://${host}:${import.meta.env.VITE_AUTH_PORT}/api/auth`;
export const TRAVEL_API_URL = `http://${host}:${import.meta.env.VITE_TRAVEL_PORT}/api/travel`;
export const SHARING_API_URL = `http://${host}:${import.meta.env.VITE_SHARING_PORT}/api/sharing`;
export const FRONTEND_BASE_URL = `${window.location.protocol}//${host}:${import.meta.env.VITE_FRONTEND_PORT}`;