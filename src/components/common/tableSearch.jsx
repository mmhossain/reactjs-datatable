import React from "react";

const TableSearch = (props) => {
  return (
    <input
      type="search"
      className="search-input"
      id="searchText"
      placeholder="Search..."
      onChange={(event) => props.onSearchTextChanged(event.target.value)}
    />
  );
};

export default TableSearch;
