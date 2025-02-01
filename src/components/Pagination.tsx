import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxVisiblePages = 7;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const [gotoPage, setGotoPage] = useState<number | string>('');

  const handleGotoPage = () => {
    const page = Number(gotoPage);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setGotoPage(''); // Reset the input field
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}.`);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mt-6 mb-6">
      <div className="flex flex-wrap justify-center space-x-2">
        <button
          className={`px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-base bg-gray-200 rounded ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <FaAnglesLeft className="mr-1 text-blue-500" />
        </button>
        <button
          className={`px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-base bg-gray-200 rounded ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaAngleLeft className="mr-1 text-blue-500" />
        </button>
        {visiblePages.map((page) => (
          <button
            key={page}
            className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded ${
              page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className={`px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-base bg-gray-200 rounded ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaAngleRight className="mr-1 text-blue-500" />
        </button>
        <button
          className={`px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-base bg-gray-200 rounded ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <FaAnglesRight className="mr-1 text-blue-500" />
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="number"
          className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded w-24 "
          placeholder="Page #"
          value={gotoPage}
          onChange={(e) => {
            setGotoPage(e.target.value);
          }}
        />
        <button
          className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm bg-blue-500 text-white rounded"
          onClick={handleGotoPage}
        >
          Go to Page
        </button>
      </div>
    </div>
  );
};

export default Pagination;
