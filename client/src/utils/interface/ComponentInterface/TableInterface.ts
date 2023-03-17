export interface ITableInterface {
  column?: any[] | null
  rowContent?: any[] | null
  pageSize?: number
  className?: string
  navData?: (e: any) => void
  isDisplayNavPanel?: boolean
  navHeaderName?: string
  sortHandle?: () => void
  isPagination?: boolean
}
