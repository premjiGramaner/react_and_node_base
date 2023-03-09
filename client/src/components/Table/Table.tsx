import React, { FC, useState, useMemo } from 'react'
import { ITableInterface } from '@Utils/interface/ComponentInterface/TableInterface'
import { IDefaultPageProps } from '@Interface/PagesInterface'
import { getValueFromObject } from '@Utils/utils'
import Pagination from '@Components/Pagination/Pagination'
import { SortIcon } from '@Assets/images'

let pageSize = 10

const Table: React.FC<ITableInterface & IDefaultPageProps> = props => {
  const { column, rowContent } = props
  const [order, setOrder] = useState<string>('ASC')
  const [tableData, setTableData] = useState<any[]>(rowContent)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    return rowContent?.slice(firstPageIndex, lastPageIndex)
  }, [currentPage])

  const statusValue = (stauts: string) => {
    return stauts === 'RUN_STATE_ONLINE'
      ? 'Online'
      : 'RUN_STATE_PROVISIONED'
      ? 'Provisioned'
      : 'RUN_STATE_UNKNOWN'
      ? 'Unknown'
      : 'RUN_STATE_UNPROVISIONED'
      ? 'Unprovisioned'
      : 'RUN_STATE_SUSPECT'
      ? 'Suspect'
      : 'RUN_STATE_ERROR'
      ? 'Error'
      : ''
  }

  const [paginationData, setPaginationData] = useState<string>('')

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
              className={`session-btn ${tabelData?.status}`}
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

  const sorting = (col: string) => {
    if (order === 'ASC') {
      const sorted = [...rowContent].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      )
      setTableData(sorted)
      setOrder('DSC')
    }
    if (order === 'DSC') {
      const sorted = [...rowContent].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      )
      setTableData(sorted)
      setOrder('ASC')
    }
  }

  return (
    <div className={`w-100 ${props.className}`}>
      {rowContent?.length > 0 ? (
        <div>
          <div
            id="scrollableDiv"
            className="table-wrapper w-100 cm-scrollbar cm-table-w-scroll table-responsive table-area shadow-1"
          >
            <table className="table w-100 fs-12">
              <thead>
                <tr>
                  {column.map((_col, _colIdx) => (
                    <th
                      scope="col"
                      key={_colIdx}
                      onClick={() => sorting(_col.key)}
                    >
                      <span className="table-header d-flex align-items-center justify-content-center">
                        {_col.name}
                        {_col?.isSort && (
                          <img src={SortIcon} className="sort-icon" />
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rowContent?.map((_data, index) => (
                  <tr key={`table-body-${index}`}>
                    {column.map((column, columnIndex) => (
                      <TableRowCell
                        key={`table-row-cell-${columnIndex}`}
                        tabelData={_data}
                        tableHeader={column}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={rowContent.length}
              pageSize={pageSize}
              onPageChange={page => setCurrentPage(page)}
              paginationValue={data => setPaginationData(data)}
            />
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
