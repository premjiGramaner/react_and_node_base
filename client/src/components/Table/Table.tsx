import React, { FC } from 'react'
import { ITableInterface } from '@Utils/interface/ComponentsInterface'
import { getValueFromObject } from '@Utils/utils'

const Table: React.FC<ITableInterface> = props => {
  const { column, rowContent } = props
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
  return (
    <div>
      {rowContent?.length > 0 ? (
        <div
          id="scrollableDiv"
          className="table-wrapper w-100 cm-scrollbar cm-table-w-scroll table-responsive bg-white table-area shadow-1 rounded"
        >
          <table className="table w-100 fs-12">
            <thead>
              <tr>
                {column.map((_col, _colIdx) => (
                  <th scope="col" key={_colIdx}>
                    <span className="table-header d-flex align-items-center justify-content-center">
                      {_col.name}
                      {_col.isSort && <i className="bi bi-sort-down-alt"></i>}
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
