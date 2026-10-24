import { useRouter } from "next/router";
import React from "react";

const Pagination = ({ totalPages, currentPage }) => {
  const router = useRouter();

  const handlePrev = () => {
    if (currentPage > 1) {
      router.push(`?page=${currentPage - 1}`, undefined, { shallow: true });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      router.push(`?page=${currentPage + 1}`, undefined, { shallow: true });
    }
  };

  const handlePage = (value) => {
    router.push(`?page=${value}`, undefined, { shallow: true });
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item mx-1 ${currentPage <= 1 && "disabled"}`}>
          <button
            className={`page-link shadow-sm ${
              currentPage <= 1 && "bg-light shadow-none"
            }`}
            aria-label="Previous"
            onClick={handlePrev}
          >
            <span aria-hidden="true">«</span>
          </button>
        </li>
        {Array(totalPages)
          .fill(null)
          .map((_, i) => (
            <li
              key={i}
              className={`page-item mx-1 ${currentPage === i + 1 && "active"}`}
            >
              <button
                className="page-link shadow-sm"
                onClick={() => handlePage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        <li
          className={`page-item mx-1 ${
            currentPage >= totalPages && "disabled"
          }`}
        >
          <button
            className={`page-link shadow-sm ${
              currentPage >= totalPages && "bg-light shadow-none"
            }`}
            aria-label="Next"
            onClick={handleNext}
          >
            <span aria-hidden="true">»</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
