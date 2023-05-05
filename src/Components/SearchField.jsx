const SearchField = ({ handleSearch, results, search, setSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="m-16 w-1/2">
      <div className=" flex justify-center gap-96 py-4">
        <h3>{results.length} items</h3>
        <div>
          <label htmlFor="sort" className="text-lg font-bold">
            Sort Products By:{" "}
          </label>
          <select
            name="sort"
            id="sort"
            className="input ml-4 text-center"
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
          className="w-4/5 border-b bg-inherit p-4 text-3xl input text-center"
        />
      </form>
    </div>
  );
};

export default SearchField;
