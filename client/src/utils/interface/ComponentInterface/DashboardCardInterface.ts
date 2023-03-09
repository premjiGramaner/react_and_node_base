import { IEdgeNodeInfo } from '@Utils/interface/PagesInterface'
export interface ISearchData {
  title?: string
  projectStatus?: string
  edgeViewStatus?: boolean
  edgeNodes?: number
  edgeAppInstance?: number
  info?: string
}
export interface IDashboardCardInterface {
  dashboardData?: any
  EdgeDetails?: any
  dashboardPending?: boolean
}
