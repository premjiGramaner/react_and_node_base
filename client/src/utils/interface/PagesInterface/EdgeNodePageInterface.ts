export interface IEdgeNodePageState {
  edgeNodeInfo: IEdgeNodeInfo
  deviceList: IEdgeNodeDeviceList[]
  edgeNodeDataList: any[]
  networkList?: any[]
}

export interface IEdgeNodeInfo {
  projectName?: string
  edgeNodesCount?: number
}

export interface IEdgeNodeDeviceList {
  device?: string
}
