export interface IUserEventLogInterface {
  userEventLogData: IUserEventLogData[]
}

export interface IUserEventLogData {
  dateTime?: string
  severity?: string
  edgeNode?: string
  appInstance?: string
  project?: string
  description?: string
}
