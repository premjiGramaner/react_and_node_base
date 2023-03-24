export interface ILoginReducerState {
  pending: boolean
  userName: string
  token: string
  userId?: string
  statusCode?: number
}

export interface ILoginState {
  user?: string
  password?: string
  token?: string
}
