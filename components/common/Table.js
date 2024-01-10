export default function Table(props) {
  const {
    root,
    title,
    data,
  } = props;

  const headers = Object.keys(data[0]);

  return (
    <div className="p-4">
      {/* <h1 className="m-2 text-center">{title}</h1> */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="p-4">
              <div class="flex items-center">
                <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                <label for="checkbox-all-search" class="sr-only">checkbox</label>
              </div>
            </th>
            {headers.map(header => (
              <th key={header} scope="col" class="px-6 py-3">
                {header}
              </th>
            ))}
            <th scope="col" class="px-6 py-3">
              Detalhes
            </th>

          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="w-4 p-4">
                <div class="flex items-center">
                  <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                  <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                </div>
              </td>
              {headers.map(header => (
                <td className="px-6 py-4" key={`${header}-${index}`}>{item[header]}</td>
              ))}
              <td className="px-6 py-4">
                <a href={`/${root}/${title}/${item.id}`} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
