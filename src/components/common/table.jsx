import React from "react";
import TableSearch from "./tableSearch";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Pagination from "./pagination";

const Table = (props) => {
  const {
    columns,
    sortColumn,
    itemsCount,
    pageSize,
    currentPage,
    onSearchTextChanged,
    onSort,
    onPageChanged,
  } = props.settings;

  return (
    <React.Fragment>
      <TableSearch onSearchTextChanged={onSearchTextChanged} />
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={columns} data={props.data} />
      </table>
      <Pagination
        itemsCount={itemsCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
    </React.Fragment>
  );
};

export default Table;
