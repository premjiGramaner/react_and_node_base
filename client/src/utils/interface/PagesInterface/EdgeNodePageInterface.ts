export interface IEdgeNodePageState {
  edgeNodeInfo: IEdgeNodeInfo
  deviceList?: IEdgeNodeDeviceList
  edgeSessionStatus?: string
  edgeNodeDataList?: any
  networkList?: any
  sessionPending?: boolean
  networkDataPending?: boolean
  edgeNodePending?: boolean
  edgeAppPending?: boolean
  statusPending?: boolean
  statusResult?: boolean
}

export interface IEdgeNodeInfo {
  title?: string
  edgeNodesCount?: number
}

export interface INetworkData {
  interfaces: []
}
export interface IEdgeData {
  name: string
  runState: boolean
  eveImageName: string
  location: string
  status: string
}

export interface IEdgePagination {
  totalPages: number
}
export interface IEdgeNodeDeviceList {
  list: IEdgeData[]
  device?: string
  totalCount: number
  next: IEdgePagination
}
