const rowsData = [
    { pn: "SDSSDA-2T00-G26", quantity: 45, description: "SANDISK SSD 2T" },
    { pn: "SDSSDA-1T00-G26", quantity: 27, description: "SANDISK SSD 1T" },
    { pn: "CT240BX200SSD1", quantity: 31, description: "CRUCIAL SSD 240G" },
    { pn: "CT2000MX500SSD1", quantity: 16, description: "CRUCIAL SSD 2T" },
    { pn: "SSDDSC2KW010T8", quantity: 46, description: "INTEL SSD 1T" },
  ];

  const TableRow = ({ pn, quantity, description }) => (
    <tr className="hover:bg-gray-100 dark:hover:bg-neutral-700">
      <td className="px-6 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {pn}
      </td>
      <td className="px-6 py-4 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
        {quantity}
      </td>
      <td className="px-6 py-4 hidden sm:table-cell whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
        {description}
      </td>
      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
        <button
          type="button"
          className="mr-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
        >
          Manage
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
        >
          Delete
        </button>
      </td>
    </tr>
  );


export default function InventoryList() {
  return (
    <div className="flex flex-col bg-white rounded-md border border-gray-200">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-white">
                  <th
                    scope="col"
                    className="px-6 sm:px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    P/N
                  </th>
                  <th
                    scope="col"
                    className="px-6 sm:px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="hidden sm:table-cell px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                {rowsData.map((row) => (
                  <TableRow key={row.name} {...row} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
