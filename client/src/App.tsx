import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import '@Assets/styles/main.css'
import '@Assets/styles/style.scss'

import MainRouter from './router'

/* Main Router Injection */
export default function App(props: any) {
  return (
    <Router>
      <MainRouter {...props} />
    </Router>
  )
}
