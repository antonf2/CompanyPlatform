import { useState, useEffect } from "react";
import { deleteItem } from "../../Services/useInventoryLogic";

const TableRow = ({
  itemId,
  pn,
  quantity,
  description,
  location,
  handleDelete,
  isMobile,
}) => {
  if (isMobile) {
    return (
      <div className="bg-white rounded-md border border-gray-200 p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-800">P/N:</span>
          <span>{pn}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-800">Quantity:</span>
          <span>{quantity}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-gray-800">Description:</span>
          <span>{description}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-800">Location:</span>
          <span>{location}</span>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 dark:text-red-500 dark:hover:text-red-400"
            onClick={() => handleDelete(itemId)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-neutral-700">
      <td className="px-4 py-2 text-sm font-medium text-gray-800 dark:text-neutral-200">
        {pn}
      </td>
      <td className="px-4 py-2 text-sm text-gray-800 dark:text-neutral-200">
        {quantity}
      </td>
      <td className="px-4 py-2 text-sm text-gray-800 dark:text-neutral-200">
        {description}
      </td>
      <td className="px-4 py-2 text-sm text-gray-800 dark:text-neutral-200">
        {location}
      </td>
      <td className="px-4 py-2 text-end text-sm font-medium">
        <button
          type="button"
          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 dark:text-red-500 dark:hover:text-red-400"
          onClick={() => handleDelete(itemId)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default function InventoryList({ data, setFilteredData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const paginatedData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleDeleteClick = (itemId) => {
    setItemIdToDelete(itemId);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!itemIdToDelete) return;

    try {
      await deleteItem(itemIdToDelete);
      setFilteredData((prevData) =>
        prevData.filter((item) => item.itemId !== itemIdToDelete)
      );
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col bg-white rounded-md border border-gray-200">
      <div className="overflow-x-auto">
        <div className="p-1.5">
          <div className="overflow-hidden">
            {isMobile ? (
              <div>
                {paginatedData.map((row) => (
                  <TableRow
                    key={row.itemId}
                    itemId={row.itemId}
                    pn={row.name}
                    quantity={row.quantity}
                    description={row.description}
                    location={row.location}
                    handleDelete={handleDeleteClick}
                    isMobile={isMobile}
                  />
                ))}
              </div>
            ) : (
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-white">
                    <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">
                      P/N
                    </th>
                    <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                    <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">
                      Location
                    </th>
                    <th className="px-4 py-2 text-end text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedData.map((row) => (
                    <TableRow
                      key={row.itemId}
                      itemId={row.itemId}
                      pn={row.name}
                      quantity={row.quantity}
                      description={row.description}
                      location={row.location}
                      handleDelete={handleDeleteClick}
                      isMobile={isMobile}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded mb-2 ml-2"
        >
          &lt; Prev
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              (prev + 1) * itemsPerPage < data.length ? prev + 1 : prev
            )
          }
          disabled={(currentPage + 1) * itemsPerPage >= data.length}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded mb-2 mr-2"
        >
          Next &gt;
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-lg max-w-[90%] sm:max-w-md mx-auto">
            <p className="text-lg font-semibold text-center">
              Are you sure you want to delete this item?
            </p>
            <div className="flex space-x-4 mt-4 justify-center">
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
