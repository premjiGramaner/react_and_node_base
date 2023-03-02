export interface INavPanelInterface {
  navigationList?: any[]
  navigationData?: any[]
  navigatePage?: boolean
  handleDeviceData?: (id: string) => void
  handleListCount?: () => void
}
