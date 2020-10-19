import React, { Component } from "react";
import { getApplications } from "../services/fakeApplicationService";
import _, { filter } from "lodash";
import { paginate } from "../utils/paginate";
import Table from "./common/table";

class Applications extends Component {
  state = {
    allData: [],
    filteredData: [],
    tableSettings: {
      searchText: "",
      sortColumn: { path: "company", order: "asc" },
      itemsCount: 0,
      pageSize: 10,
      currentPage: 1,
    },
  };

  columns = [
    {
      path: "company",
      label: "Company",
      isSortable: true,
      isSearchable: true,
    },
    {
      path: "position",
      label: "Position",
      isSortable: true,
      isSearchable: true,
    },
    {
      path: "location.country",
      label: "Country",
      isSortable: true,
      isSearchable: true,
    },
    {
      path: "location.state",
      label: "State",
      isSortable: true,
      isSearchable: true,
    },
    {
      path: "location.city",
      label: "City",
      isSortable: true,
      isSearchable: true,
    },
    {
      path: "dateApplied",
      label: "Date Applied",
      isSortable: true,
      isSearchable: true,
    },
    {
      path: "status",
      label: "Status",
      isSortable: true,
      isSearchable: true,
    },
    {
      key: "comment",
      label: "Comment",
      isSortable: false,
      isSearchable: true,
    },
  ];

  componentDidMount() {
    const data = getApplications();
    this.setState({ allData: data, filteredData: data });
  }

  hasSearchText = (searchText, row) => {
    const searchableColumns = this.columns.filter((c) => c.isSearchable);

    for (let column of searchableColumns) {
      const cellValue = _.get(row, column.path)?.toLowerCase();
      if (cellValue && cellValue.indexOf(searchText.trim().toLowerCase()) != -1)
        return true;
    }

    return false;
  };

  getFilteredData = () => {
    const allData = [...this.state.allData] || [];
    const { searchText } = this.state.tableSettings;

    if (!searchText) return allData;

    const filteredData = allData.filter((row) =>
      this.hasSearchText(searchText, row)
    );

    return filteredData;
  };

  handleSearch = (searchText) => {
    const { tableSettings } = this.state;
    tableSettings.searchText = searchText;
    tableSettings.currentPage = 1;

    this.setState({ tableSettings, filteredData: this.getFilteredData() });
  };

  handleSort = (sortColumn) => {
    const tableSettings = { ...this.state.tableSettings };
    tableSettings.sortColumn = sortColumn;

    this.setState({ tableSettings });
  };

  handlePageChange = (page) => {
    const tableSettings = { ...this.state.tableSettings };
    tableSettings.currentPage = page;

    this.setState({ tableSettings });
  };

  render() {
    const { allData, tableSettings } = this.state;
    const dataToOperate = tableSettings.searchText
      ? this.getFilteredData()
      : allData;

    const sortedData = _.orderBy(
      dataToOperate,
      [tableSettings.sortColumn.path],
      [tableSettings.sortColumn.order]
    );

    const settings = {
      columns: this.columns,
      itemsCount: sortedData.length,
      sortColumn: tableSettings.sortColumn,
      pageSize: tableSettings.pageSize,
      currentPage: tableSettings.currentPage,
      showSearchOption: true,
      showPagination: true,
      onSearchTextChanged: this.handleSearch,
      onSort: this.handleSort,
      onPageChanged: this.handlePageChange,
    };

    const filteredData = paginate(
      sortedData,
      tableSettings.currentPage,
      settings.showPagination ? tableSettings.pageSize : 0
    );

    return <Table settings={settings} data={filteredData} />;
  }
}

export default Applications;
