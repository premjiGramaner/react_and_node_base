// export const API_URL = 'http://168.62.172.215/api/' // prod
// export const API_URL = 'http://74.235.243.35/api/' // uat
// export const API_URL = 'http://98.70.0.57/api/' // staging
export const API_URL = 'http://localhost:5002/api/'; //local

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
 