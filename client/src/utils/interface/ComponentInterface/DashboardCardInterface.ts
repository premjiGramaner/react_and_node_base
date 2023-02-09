export interface ISearchData {
  projectName: string
  projectStatus: string
  projectType: string
  edgeNodes: number
  edgeAppInstance: number
  info: string
}
export interface IDashboardCardInterface {
  projectDetails: ISearchData[]
}
