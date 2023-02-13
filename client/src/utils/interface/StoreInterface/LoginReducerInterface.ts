export interface ILoginReducerState {
  pending: boolean
  userName: string
  token: string
}

export interface ILoginState {
  user?: string
  password?: string
  token?: string
}
