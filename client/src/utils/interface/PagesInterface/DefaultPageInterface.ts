import { Dispatch } from 'react'
import { NavigateOptions, To } from 'react-router-dom'
import { i18n, TFunction } from 'i18next'

import { IMenuItem } from '@Interface/index'

export interface IDefaultPageProps {
  children?: React.ReactNode
  navigate: (url: To, options?: NavigateOptions) => void
  location: Location
  dispatch: Dispatch<any>
  isuserauthenticated: string | void
  routeinfo: IMenuItem
  changecolor: (color: string) => void
  color: string
  t: TFunction<'lang', undefined, 'lang'>
  i18n: i18n
}
