import { useState, useEffect } from "react";

const SearchField = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.filteredProducts(props.search);
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={props.search}
          placeholder="Search for a Product"
          onChange={props.searchProducts}
        />
      </form>
    </div>
  );
};

export default SearchField;
