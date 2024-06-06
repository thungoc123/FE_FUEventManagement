import React from "react";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onPageSelect: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPageSelect,
}) => {
  return (
    <div className="flex justify-center items-center mt-8">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageSelect(index + 1)}
          className={`px-4 py-2 mx-1 ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
          } rounded`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
