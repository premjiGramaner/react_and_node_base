import React, { useState, useEffect } from 'react'

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
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    paginationValue,
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })
  const [handlePageCount, setHandlePageCount] = useState<number>(pageSize)

  useEffect(() => {
    const search = setTimeout(() => {
      paginationValue(
        `next.pageSize=${handlePageCount}&next.pageNum=${currentPage}`
      )
    }, 3000)
    return () => clearTimeout(search)
  }, [handlePageCount])

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
    paginationValue(
      `next.pageSize=${handlePageCount}&next.pageNum=${currentPage + 1}`
    )
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
    paginationValue(
      `prev.pageSize=${handlePageCount}&prev.pageNum=${currentPage - 1}`
    )
  }
  const onFirst = () => {
    onPageChange(1)
    paginationValue(`prev.pageSize=${handlePageCount}&prev.pageNum=${1}`)
  }
  const onLast = () => {
    onPageChange(lastPage)
    paginationValue(`next.pageSize=${handlePageCount}&next.pageNum=${lastPage}`)
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
              onClick={() => {
                onPageChange(pageNumber),
                  paginationValue(
                    `next.pageSize=${handlePageCount}&next.pageNum=${pageNumber}`
                  )
              }}
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
        onChange={event => {
          console.log('event', event)
          setHandlePageCount(parseInt(event.target.value))
        }}
      />
      <p className="pagination-total-count">{`${currentPage}-${handlePageCount} of ${totalCount}`}</p>
    </div>
  )
}

export default Pagination
