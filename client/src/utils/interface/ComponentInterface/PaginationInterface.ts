export interface IPaginationInterface {
  onPageChange?: (e: any) => void
  totalCount?: number
  siblingCount?: number
  currentPage?: number
  pageSize?: number
  className?: string
}
