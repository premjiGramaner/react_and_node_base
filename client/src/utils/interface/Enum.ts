export const API = {
  users: {
    get: '/test',
    create: '/login',
    tokenLogin: 'login/with-token',
    logout: '/logout',
  },
  dashboard: {
    projects: '/dashboard/projects',
    status: '/dashboard/projects/status',
    projectCounts: '/dashboard/projects/counts',
    termsService: '/login/updateTerm',
  },
  edgeNode: {
    edgeNodes: 'edgeNodes?',
    downloadScript: 'edgeApps/download-script/',
    sessionStatus: 'edgeApps/status/',
    edgeViewStatus: 'edgeNodes/info/:id',
  },
  appInstance: {
    edgeApps: 'edgeApps?',
    network: 'edgeApps/',
  },
}
