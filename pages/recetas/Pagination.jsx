import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  const maxPagesToShow = 1;
  const totalVisiblePages = maxPagesToShow * 1 + 1;

  let startPage = Math.max(currentPage - maxPagesToShow, 1);
  let endPage = Math.min(currentPage + maxPagesToShow, totalPages);

  if (currentPage <= maxPagesToShow) {
    endPage = Math.min(totalVisiblePages, totalPages);
  } else if (currentPage + maxPagesToShow >= totalPages) {
    startPage = Math.max(totalPages - totalVisiblePages + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <ol className="flex mt-4 justify-center gap-1 text-xs font-medium">
      <li>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>

      {startPage > 1 && (
        <>
          <li>
            <button
              onClick={() => onPageChange(1)}
              className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
            >
              1
            </button>
          </li>
          {startPage > 2 && (
            <li className="flex items-center">
              <span className="mx-1">...</span>
            </li>
          )}
        </>
      )}

      {pageNumbers.map((number) => (
        <li key={number}>
          <button
            onClick={() => onPageChange(number)}
            className={`block size-8 rounded border ${
              number === currentPage
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-100 bg-white text-gray-900"
            } text-center leading-8`}
          >
            {number}
          </button>
        </li>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <li className="flex items-center">
              <span className="mx-1">...</span>
            </li>
          )}
          <li>
            <button
              onClick={() => onPageChange(totalPages)}
              className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
            >
              {totalPages}
            </button>
          </li>
        </>
      )}

      <li>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ol>
  );
};

export default Pagination;
