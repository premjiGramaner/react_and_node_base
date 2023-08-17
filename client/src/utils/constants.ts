export const API_URL = window.location.origin + '/api/'; // If need to point specifc orign, update the origin here
// export const API_URL = 'http://localhost:5002/api/'; // If need to point specifc orign, update the origin here

export const STORAGE_KEY = {
  AUTH_TOKEN: 'accessToken',
  IS_USER_AUTHENTICATED: 'is-user-auth',
  CLIENT_ACCESS_TOKEN: 'client-access-token',
  USER_INFO: 'user-info',
}

export const enum URLS {
  DEFAULT = '/',
  LOGIN = '/login',
  PAGE_NOT_FOUND = '*',
  DASHBOARD = '/dashboard',
  LOGOUT = '/logout',
  EDGENODE = '/egde-nodes',
  EDGEAPPINSTANCES = '/edge-app-instances',
}
 