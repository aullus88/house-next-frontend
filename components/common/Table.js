import React, { useState } from "react";

export default function Table(props) {
  const { root, title, data } = props;
  // console.log(data)

  const headers = Object.keys(data[0]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (column) => {
    if (sortColumn === column) {
      // If the same column is clicked, toggle the order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a new column is clicked, set the new column and default order to ascending
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = sortColumn ? a[sortColumn] : null;
    const bValue = sortColumn ? b[sortColumn] : null;

    if (aValue === bValue) return 0;

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  return (
    // <div className="container my-auto overflow-hidden overscroll-auto flex flex-col w-full ">
      <div class="container my-auto overflow-x-auto flex flex-col w-full shadow-md sm:rounded-lg">
      {/* <h1 className="m-2 text-center">{title}</h1> */}
      <table className="h-max-full w-max-screen text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr >
            <th scope="col" className="p-4 bg-gray-200 dark:bg-gray-700">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                ></input>
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th >
            {headers.map((header) => (
              <th key={header} scope="col" className="px-6 py-3" onClick={() => handleSort(header)}>
                {header} {sortColumn === header && (
                  <span>{sortOrder === "asc" ? " ↑" : " ↓"}</span>
                )}
              </th>
            ))}
            <th scope="col" className="px-6 py-3">
              Detalhes
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  ></input>
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              {headers.map((header) => (
                <td className="px-6 py-4" key={`${header}-${index}`}>
                  {item[header]}
                </td>
              ))}
              <td className="px-6 py-4">
                <a
                  href={`/${root}/${title}/${item.id}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
