export interface IModalInterface {
  headerName: string
  statusColor: string
  status: string
  handleDownload: () => void
  handleRefresh: () => void
  deActivateSession: () => void
}
