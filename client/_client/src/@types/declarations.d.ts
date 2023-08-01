declare module '*.css'
declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}

declare module '*.less' {
  const content: { [className: string]: string }
  export = content
}
declare module '*.png'
declare module '*.jpg'
declare module '*.svg' {
  import React = require('react')
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

declare module '*'

declare const IS_PROD: boolean
declare const IS_DEV: boolean
declare const IS_DEV_SERVER: boolean
