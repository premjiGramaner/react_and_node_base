export interface IPaginationInterface {
  onPageChange?: (e: any) => void
  totalCount?: number
  siblingCount?: number
  currentPage?: number
  paginationSize?: (e: number) => void
  className?: string
}
