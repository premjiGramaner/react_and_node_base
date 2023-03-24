export const API = {
  users: {
    get: '/test',
    create: '/login',
    logout: 'login/logout',
  },
  dashboard: {
    projects: '/dashboard/projects',
    status: '/dashboard/projects/status',
  },
  edgeNode: {
    edgeNodes: 'edgeNodes?next.pageSize=20&next.pageNum=1',
  },
}
