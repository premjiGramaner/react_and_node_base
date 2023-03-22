export interface IEdgeNodePageState {
  edgeNodeInfo: IEdgeNodeInfo
  deviceList?: IEdgeNodeDeviceList
  edgeSessionStatus?: string
  edgeNodeDataList?: any
  networkList?: INetworkData
  sessionPending?: boolean
  networkDataPending?: boolean
  edgeNodePending?: boolean
}

export interface IEdgeNodeInfo {
  title?: string
  edgeNodesCount?: number
}

export interface INetworkData {
  ipInfo: []
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
