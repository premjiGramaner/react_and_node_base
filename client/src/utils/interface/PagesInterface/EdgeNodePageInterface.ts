export interface IEdgeNodePageState {
  edgeNodeInfo: IEdgeNodeInfo
  deviceList: IEdgeNodeDeviceList[]
  edgeSessionStatus?: string
  edgeNodeDataList?: any
  networkList?: any[]
  sessionPending?: boolean
  networkDataPending?: boolean
  edgeNodePending?: boolean
}

export interface IEdgeNodeInfo {
  title?: string
  edgeNodesCount?: number
}

export interface IEdgeNodeDeviceList {
  device?: string
}
