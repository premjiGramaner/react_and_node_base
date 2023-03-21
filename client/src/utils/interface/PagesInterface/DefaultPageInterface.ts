/**
 *  --------------------- Default for All the Pages Interface ---------------------
 * Add a interface that is common for the pages will be Declared here
 */

import { Dispatch } from 'react'
import { NavigateOptions, To } from 'react-router-dom'
import { i18n, TFunction } from 'i18next'

import { IMenuItem } from '@Interface/index'

export interface IDefaultPageProps {
  children?: React.ReactNode
  navigate: (url: To, options?: NavigateOptions) => void
  location: Location
  dispatch: Dispatch<any>
  isUserAuthenticated: string | void
  routeInfo: IMenuItem
  changeColor: (color: string) => void
  color: string
  t: TFunction<'lang', undefined, 'lang'>
  i18n: i18n
}
