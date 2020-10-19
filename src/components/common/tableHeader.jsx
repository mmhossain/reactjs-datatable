import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (column) => {
    if (!column.path) return;

    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === column.path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = column.path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;

    return <i className="fa fa-sort-desc" />;
  };

  getClickableClass = (column) => {
    return column.path && column.isSortable ? "clickable" : "";
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              className={this.getClickableClass(column)}
              onClick={() => this.raiseSort(column)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
