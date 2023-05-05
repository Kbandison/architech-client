import React from "react";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productsPerPage,
  products,
}) => {
  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex justify-center p-8">
      {currentPage > 1 && (
        <button className="button text-lg font-bold" onClick={previousPage}>
          Prev Page
        </button>
      )}
      <h3>
        Page: {currentPage} of {Math.ceil(products.length / productsPerPage)}
      </h3>
      {currentPage < products.length / productsPerPage && (
        <button
          className="button text-lg font-bold "
          onClick={nextPage}
          disabled={currentPage === products.length / productsPerPage}
        >
          Next Page
        </button>
      )}
    </div>
  );
};

export default Pagination;
