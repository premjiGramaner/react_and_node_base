import React, { FC, useState, useMemo } from 'react'
import { ITableInterface } from '@Utils/interface/ComponentsInterface'
import { getValueFromObject } from '@Utils/utils'
import { Pagination } from '@Components/index'

const Table: React.FC<ITableInterface> = props => {
  const { column, rowContent, pageSize } = props
  const [order, setOrder] = useState<string>('ASC')
  const [tableData, setTableData] = useState<any[]>(rowContent)
  const [currentPage, setCurrentPage] = useState(1)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    return rowContent.slice(firstPageIndex, lastPageIndex)
  }, [currentPage])

  const TableRowCell = ({ tabelData, tableHeader }) => {
    const value = getValueFromObject(tabelData, tableHeader.key)
    return (
      <td>
        <span className="table-data d-flex justify-content-center align-items-center">
          {value}
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
    <div>
      {currentTableData?.length > 0 ? (
        <div>
          <div
            id="scrollableDiv"
            className="table-wrapper w-100 cm-scrollbar cm-table-w-scroll table-responsive bg-white table-area shadow-1 rounded"
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
                        {_col.isSort && <i className="bi bi-sort-down-alt"></i>}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentTableData?.map((_data, index) => (
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
