import React from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage, totalRecords }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1)
  }
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1)
  }
  return (
    <nav className="pagination-container d-flex justify-content-end align-items-center">
      <ul className="pagination justify-content-center ">
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={prevPage}
          >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {pageNumbers.map(pgNumber => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage == pgNumber ? 'active' : ''} `}
          >
            <a
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
              href="#"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={nextPage}
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
      <input type="number" className="page-count" value={nPages} />
      <p className="pagination-total-count">{`${currentPage}-${nPages} of ${totalRecords?.length}`}</p>
    </nav>
  )
}

export default Pagination
