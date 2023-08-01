import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { IReducerState } from '@Utils/interface'
import { IDefaultPageProps } from '@Interface/PagesInterface'
import { IModalInterface } from '@Interface/ComponentInterface'

import { CloseIcon, DownloadIcon, RefreshIcon } from '@Assets/images'

const Modal: FC<IDefaultPageProps & IModalInterface> = props => {
  const edgeNodeStatus = useSelector(
    (state: IReducerState) => state.edgeNodeReducer
  )
  const [sessionState, setSessionState] = useState<string>('')
  const [edgeNodeStatusPending, setEdgeNodeStatusPending] =
    useState<boolean>(false)

  useEffect(() => {
    setEdgeNodeStatusPending(edgeNodeStatus?.statusPending)
  }, [edgeNodeStatus?.statusPending])

  useEffect(() => {
    setSessionState(props?.status)
  }, [props?.status])

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
                onClick={props.popupClose}
                alt=""
                aria-hidden="true"
              />
            </div>

            <div className="modal-body">
              {edgeNodeStatusPending ? (
                <div className="d-flex justify-content-center">
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <p className="sessionStatus">
                      {props.t('viewSession.sessionStatus')}
                    </p>
                    <i
                      className={`fa fa-circle status-icon ${sessionState}`}
                    ></i>
                    {sessionState === 'ACTIVATING'
                      ? props.t('viewSession.activating')
                      : sessionState === 'INACTIVE'
                      ? props.t('viewSession.inactive')
                      : sessionState === 'ACTIVE'
                      ? props.t('viewSession.active')
                      : sessionState === 'UNSPECIFIED'
                      ? props.t('viewSession.inactive')
                      : ''}
                  </div>

                  <div className="session-btn">
                    {sessionState === 'INACTIVE' ||
                    sessionState === 'UNSPECIFIED' ? (
                      <>
                        <button
                          className="inactive-session"
                          onClick={props.handleActivateSession}
                        >
                          {props.t('viewSession.activateSession')}
                        </button>
                        <button
                          className={`deactivate-session ${sessionState}`}
                          onClick={props.deActivateSession}
                        >
                          {props.t('viewSession.deactivateSession')}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className={`reactive-session ${sessionState}`}
                          onClick={props.reactiveSession}
                        >
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
                </>
              )}
              {sessionState === 'ACTIVATING' &&
                props.t('viewSession.activatingInfo')}
            </div>

            <div className="modal-footer">
              {sessionState === 'ACTIVE' && (
                <div
                  onClick={props.handleDownload}
                  className="download-file"
                  aria-hidden="true"
                >
                  <img src={DownloadIcon} className="download" alt="" />
                  {props.t('viewSession.downloadScript')}
                </div>
              )}
              <div
                className="refresh-panel"
                onClick={props.handleRefresh}
                aria-hidden="true"
              >
                <img src={RefreshIcon} className="refresh" alt="" />
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