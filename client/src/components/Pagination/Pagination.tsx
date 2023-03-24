import React, { useState } from 'react'

import { IPaginationInterface } from '@Interface/ComponentInterface/PaginationInterface'
import {
  LeftArrowIcon,
  LeftArrowFirstIcon,
  RightArrowIcon,
  RightLastArrowIcon,
} from '@Assets/images'

import { usePagination } from './usePagination'

const Pagination: React.FC<IPaginationInterface> = props => {
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

  const handlePage = event => {
    setHandlePageCount(event.target.value)
  }

  let lastPage = paginationRange[paginationRange?.length - 1]

  return (
    <div className="pagination-wrapper d-flex justify-content-end align-items-center pt-3">
      <ul className={`pagination-container ${className}`}>
        <li className={`pagination-item `} onClick={onFirst}>
          <img src={LeftArrowFirstIcon} className="pagination-nav-arrow" />
        </li>
        <li
          className={`pagination-item ${currentPage === 1 && 'disabled'} `}
          onClick={onPrevious}
        >
          <img src={LeftArrowIcon} className="pagination-nav-arrow" />
        </li>
        {paginationRange.map((pageNumber: number) => {
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
          <img src={RightArrowIcon} className="pagination-nav-arrow" />
        </li>
        <li className={`pagination-item `} onClick={onLast}>
          <img src={RightLastArrowIcon} className="pagination-nav-arrow" />
        </li>
      </ul>
      <input
        type="number"
        className="page-count mx-3"
        value={handlePageCount}
        onChange={event => handlePage(event)}
      />
      <p className="pagination-total-count">{`${currentPage}-${pageSize} of ${totalCount}`}</p>
    </div>
  )
}

export default Pagination
