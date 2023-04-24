import React, { FC, useState } from 'react'
import { IDefaultPageProps } from '@Interface/PagesInterface'

const Toast: FC<IDefaultPageProps> = props => {
  const [showToast, setShowToast] = useState<boolean>(true)

  return (
    showToast && (
      <div className="zed-toast">
        <div
          className="toast align-items-center text-white bg-primary border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              {props.t('toastError.errorMessage')}
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      </div>
    )
  )
}

export default Toast
