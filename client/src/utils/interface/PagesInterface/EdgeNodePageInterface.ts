export interface IEdgeNodePageState {
  edgeNodeInfo: IEdgeNodeInfo
  deviceList: IEdgeNodeDeviceList[]
  edgeSessionStatus: string
  networkList?: any[]
  sessionPending?: boolean
}

export interface IEdgeNodeInfo {
  title?: string
  edgeNodesCount?: number
}

export interface IEdgeNodeDeviceList {
  device?: string
}
