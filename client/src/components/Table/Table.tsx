import React, { useState, useMemo } from 'react'
import { ITableInterface } from '@Utils/interface/ComponentInterface/TableInterface'
import { IDefaultPageProps } from '@Interface/PagesInterface'
import { getValueFromObject } from '@Utils/utils'
import Pagination from '@Components/Pagination/Pagination'
import { SortIcon } from '@Assets/images'

const pageSize = 10

const Table: React.FC<ITableInterface & IDefaultPageProps> = props => {
  const {
    column,
    rowContent,
    navData,
    isDisplayNavPanel,
    navHeaderName,
    sortHandle,
    isPagination,
  } = props

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [active, setActive] = useState<number>(null)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    return rowContent?.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, rowContent])

  const statusValue = (status: string) => {
    return status == 'RUN_STATE_PROVISIONED'
      ? 'Provisioned'
      : status == 'RUN_STATE_ONLINE'
      ? 'Online'
      : status == 'RUN_STATE_ERROR'
      ? 'Error'
      : status == 'RUN_STATE_UNKNOWN'
      ? 'Unknown'
      : status == 'RUN_STATE_SUSPECT'
      ? 'Suspect'
      : status == 'RUN_STATE_UNPROVISIONED'
      ? 'Unprovisioned'
      : status == 'RUN_STATE_OFFLINE'
      ? 'Offline'
      : status == 'RUN_STATE_HALTED'
      ? 'Halted'
      : ''
  }

  const TableRowCell = ({ tabelData, tableHeader }) => {
    const value = getValueFromObject(tabelData, tableHeader.key)

    return (
      <td>
        <span className="table-data d-flex justify-content-center align-items-center">
          {tableHeader?.status ? (
            <>
              <i
                className={`fa fa-circle status-icon ${tabelData?.runState}`}
              ></i>
              {statusValue(value)}
            </>
          ) : tableHeader?.cell ? (
            <button
              className={`session-btn ${
                (tabelData?.runState === 'RUN_STATE_PROVISIONED' ||
                  tabelData?.runState === 'RUN_STATE_SUSPECT') &&
                'UNSPECIFIED'
              }
                `}
              data-toggle="modal"
              data-target="#myModal"
              onClick={() => tableHeader?.cell(tabelData)}
            >
              {tabelData?.status === 'INACTIVE'
                ? props.t('viewSession.activateSession')
                : props.t('viewSession.deactivateSession')}
            </button>
          ) : (
            value
          )}
        </span>
      </td>
    )
  }

  return (
    <div className={`w-100 ${props.className}`}>
      {(isPagination ? currentTableData : rowContent)?.length > 0 ? (
        <div className="d-flex">
          <div
            id="scrollableDiv"
            className="table-wrapper d-flex w-100 cm-scrollbar cm-table-w-scroll  table-area shadow-1"
          >
            <div className="w-100">
              <div className="zed-table h-100">
                <table className="table fs-12">
                  <thead>
                    <tr>
                      {isDisplayNavPanel === true && (
                        <>
                          <th className="zed-title">
                            {navHeaderName}
                            <img
                              src={SortIcon}
                              className="sort-icon"
                              onClick={() => sortHandle()}
                              alt=""
                              aria-hidden="true"
                            />
                          </th>
                          <th className="zed-empty"></th>
                        </>
                      )}

                      {column.map((_col, _colIdx) => (
                        <th scope="col" key={_colIdx}>
                          <span className="table-header d-flex align-items-center justify-content-center">
                            {_col.name}
                            {_col?.isSort && (
                              <img
                                src={SortIcon}
                                className="sort-icon"
                                alt=""
                              />
                            )}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(isPagination ? currentTableData : rowContent)?.map(
                      (_data, index) => (
                        <tr key={`table-body-${index}`}>
                          {isDisplayNavPanel === true && (
                            <>
                              <td
                                className={`nav-list ${
                                  active === index && 'active'
                                } ${isPagination && 'pe-none'}`}
                                onClick={() => {
                                  setActive(index)
                                  navData(_data)
                                }}
                                aria-hidden="true"
                              >
                                {_data.name}
                              </td>
                              <td className="zed-empty"></td>
                            </>
                          )}

                          {column.map((column, columnIndex) => (
                            <TableRowCell
                              key={`table-row-cell-${columnIndex}`}
                              tabelData={_data}
                              tableHeader={column}
                            />
                          ))}
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              {isPagination && (
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={rowContent.length}
                  pageSize={pageSize}
                  onPageChange={page => setCurrentPage(page)}
                  paginationValue={data => data}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center no-records-found">
          No Records Found
        </div>
      )}
    </div>
  )
}

export default Table
