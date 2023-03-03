import React, { FC } from 'react'
import { IDefaultPageProps } from '@Interface/PagesInterface'
import { IModalInterface } from '@Interface/ComponentInterface'

import { CloseIcon, DownloadIcon, RefreshIcon } from '@Assets/images'

const Modal: FC<IDefaultPageProps & IModalInterface> = props => {
  return (
    <div className="modal-container">
      <div className="modal" id="myModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{props.headerName}</h4>

              <img
                src={CloseIcon}
                className="close close-icon"
                data-dismiss="modal"
              />
            </div>

            <div className="modal-body">
              <div>
                <p className="sessionStatus">
                  {props.t('viewSession.sessionStatus')}
                </p>
                <i className={`fa fa-circle status-icon ${props.status}`}></i>
                {props.status === 'INACTIVE'
                  ? props.t('viewSession.active')
                  : props.t('viewSession.inactive')}
              </div>
              <div className="session-btn">
                {props.status === 'INACTIVE' ? (
                  <button className="deactive-session">
                    {props.t('viewSession.activateSession')}
                  </button>
                ) : (
                  <>
                    <button className="reactive-session">
                      {props.t('viewSession.reactiveateSession')}
                    </button>
                    <button
                      className="reactive-session"
                      onClick={props.deActivateSession}
                    >
                      {props.t('viewSession.deactivateSession')}
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="modal-footer">
              {props.status !== 'INACTIVE' && (
                <div onClick={props.handleDownload} className="download-file">
                  <img src={DownloadIcon} className="download" />
                  {props.t('viewSession.downloadScript')}
                </div>
              )}
              <div className="refresh-panel" onClick={props.handleRefresh}>
                <img src={RefreshIcon} className="refresh" />
                {props.t('viewSession.refresh')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
