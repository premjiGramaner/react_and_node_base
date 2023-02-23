export interface IPaginationInterface {
  onPageChange?: (e: any) => void
  totalCount?: number
  siblingCount?: number
  currentPage?: number
  paginationValue: (e: string) => void
  pageSize?: number
  className?: string
}
