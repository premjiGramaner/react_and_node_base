export const API = {
  users: {
    get: '/test',
    create: '/login',
    logout: '/logout',
  },
  dashboard: {
    projects: '/dashboard/projects',
    status: '/dashboard/projects/status',
    projectCounts: '/dashboard/projects/counts',
  },
  edgeNode: {
    edgeNodes: 'edgeNodes?',
    downloadScript: 'edgeApps/download-script/',
    sessionStatus: 'edgeApps/status/',
  },
  appInstance: {
    edgeApps: 'edgeApps?next.pageSize=20&next.pageNum=1',
    network: 'edgeApps/',
  },
}
