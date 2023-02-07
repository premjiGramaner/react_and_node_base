import React, { useState } from 'react'
import { usePagination, DOTS } from './usePagination'

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount,
    currentPage,
    pageSize,
    className,
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })
  const [handlePageCount, setHandlePageCount] = useState<number>(currentPage)

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }
  const onFirst = () => {
    onPageChange(1)
  }
  const onLast = () => {
    onPageChange(lastPage)
  }

  const handlePage = e => {
    setHandlePageCount(e.target.value)
  }

  let lastPage = paginationRange[paginationRange?.length - 1]
  return (
    <div className="pagination-wrapper d-flex justify-content-end align-items-center">
      <ul className={`pagination-container ${className}`}>
        <li className={`pagination-item `} onClick={onFirst}>
          <div className="arrow left" />
        </li>
        <li
          className={`pagination-item ${currentPage === 1 && 'disabled'} `}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
        {paginationRange.map(pageNumber => {
          if (pageNumber === DOTS) {
            return <li className="pagination-item dots">&#8230;</li>
          }

          return (
            <li
              className={`pagination-item ${
                pageNumber === currentPage && 'selected'
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          )
        })}
        <li
          className={`pagination-item ${
            currentPage === lastPage && 'disabled'
          }`}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
        <li className={`pagination-item `} onClick={onLast}>
          <div className="arrow right" />
        </li>
      </ul>
      <input
        type="number"
        className="page-count mx-3"
        value={handlePageCount}
        onChange={e => handlePage(e)}
      />
      <p className="pagination-total-count">{`${currentPage}-${pageSize} of ${totalCount}`}</p>
    </div>
  )
}

export default Pagination
