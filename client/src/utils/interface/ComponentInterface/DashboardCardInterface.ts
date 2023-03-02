import { IEdgeNodeInfo } from '@Utils/interface/PagesInterface'
export interface ISearchData {
  title?: string
  edgeNodeStatus?: string
  enabled?: string
  projectType?: string
  edgeNodes?: number
  edgeAppInstance?: number
  info?: string
}
export interface IDashboardCardInterface {
  dashboardData?: any
  EdgeDetails?: any
  projectInfo?: (e: IEdgeNodeInfo) => void
}
