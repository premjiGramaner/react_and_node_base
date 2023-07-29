export interface ILoginReducerState {
  pending: boolean
  userName: string
  token: string
  userId?: string
  statusCode?: number
  message?:string
  logoutStatusCode?: number
  statusResult: boolean
}

export interface ILoginState {
  user?: string
  password?: string
  token?: string
  cluster?:string
}
