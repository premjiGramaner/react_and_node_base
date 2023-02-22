export interface ISearchData {
  title: string
  edgeNodeStatus: string
  enabled: boolean
  projectType: string
  edgeNodes: number
  edgeAppInstance: number
  info: string
}
export interface IDashboardCardInterface {
  dashboardData: ISearchData[]
}
