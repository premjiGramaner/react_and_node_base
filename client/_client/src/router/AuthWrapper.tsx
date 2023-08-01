import React from 'react'

import { IDefaultPageProps } from '@Interface/index'

class AuthComponentWrapper extends React.Component<any, { hasError: boolean }> {
  private initialState: { hasError: boolean } = {
    hasError: false,
  }

  constructor(props: IDefaultPageProps) {
    super(props)
    this.state = this.initialState
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 className="main-state-global-error">
          Oops!!! Something went wrong.
        </h1>
      )
    }

    return (
      <React.Fragment>
        <div
          className={`auth-container ${this.props.color}`}
          data-testid="auth-container"
        >
          <div className="page-body-wrapper">
            {this.props?.children || null}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default AuthComponentWrapper
