import React from 'react'

import { IDefaultPageProps } from '@Utils/interface'

const pageNotFound: React.FC<IDefaultPageProps> = () => {
  return (
    <div className="page-not-found-main-container">
      <h2>Oops!!!</h2>
      <h3>The page you were looking is not found</h3>
    </div>
  )
}

export default pageNotFound
