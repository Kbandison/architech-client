import { useState, useEffect } from "react";

const SearchField = ({ handleSearch, results, search, setSearch, sort }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="m-16 w-full">
      <div className=" flex justify-center gap-96 py-4">
        <h3>{results.length} items</h3>
        <div>
          <label htmlFor="sort" className="text-lg font-bold">
            Sort Products By:{" "}
          </label>
          <select
            name="sort"
            id="sort"
            className="input ml-4"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          >
            <option value="default">Default</option>
            <option value="price-ascending">Price: Ascending</option>
            <option value="price-descending">Price: Descending</option>
            <option value="name-ascending">Product Name: Ascending</option>
            <option value="name-descending">Product Name: Descending</option>
            <option value="sale">On Sale</option>
          </select>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex justify-center mt-8">
        <input
          type="text"
          id="search"
          placeholder="Search for a Product by SKU, Name, Manufacturer or Description"
          onChange={handleSearch}
          className="w-1/2 border-b bg-inherit p-4 text-3xl input"
        />
        {/* <div>
          <input type="checkbox" name="" id="samsung" />
          <label htmlFor="samsung">Samsung</label>
        </div> */}
      </form>
    </div>
  );
};

export default SearchField;
