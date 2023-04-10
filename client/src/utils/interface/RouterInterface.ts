/**
 *  --------------------- Router Interface ---------------------
 * The purpose of the page is to maintain the router related interfaces
 * Make sure we are placing the interface on the right place
 */

export interface IMenuItem {
  path: string
  routeName: string
  component: any
  icon?: string
  permissions: string[] // If you want to implement any permission needs to be started from here
  children: [] // Child routes declarations
}
