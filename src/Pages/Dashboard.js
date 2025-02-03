import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMovements } from "../Services/useMovementsLogic";

const Dashboard = () => {
  const [movements, setMovements] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const data = await getMovements();
        setMovements(data);
      } catch (error) {
        toast.error("Error loading inventory movements.");
      }
    };
    fetchMovements();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const paginatedMovements = movements.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="p-4 sm:p-6 bg-white shadow-lg rounded-lg w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-500 text-white rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Total Movements</h3>
          <p className="text-2xl font-bold">{movements.length}</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Recent Additions</h3>
          <p className="text-2xl font-bold">
            {movements.filter((m) => m.action === "Added").length}
          </p>
        </div>
        <div className="p-4 bg-red-500 text-white rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Recent Removals</h3>
          <p className="text-2xl font-bold">
            {movements.filter((m) => m.action === "Removed").length}
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        Inventory Movements
      </h3>
      {isMobile ? (
        <div className="flex flex-col gap-4">
          {paginatedMovements.length > 0 ? (
            paginatedMovements.map((movement) => (
              <div
                key={movement.movementId}
                className="bg-white rounded-md border border-gray-200 p-4 shadow-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">Item ID:</span>
                  <span>{movement.itemId}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">User ID:</span>
                  <span>{movement.userId}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">Action:</span>
                  <span
                    className={`font-semibold ${
                      movement.action === "Added"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {movement.action}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">
                    Quantity Changed:
                  </span>
                  <span>{movement.quantityChanged}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800">Notes:</span>
                  <span>{movement.notes || "-"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800">
                    Timestamp:
                  </span>
                  <span>{new Date(movement.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700">No movements found.</p>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-max border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 sm:px-4 py-2">Item ID</th>
                <th className="border px-2 sm:px-4 py-2">User ID</th>
                <th className="border px-2 sm:px-4 py-2">Action</th>
                <th className="border px-2 sm:px-4 py-2">Quantity Changed</th>
                <th className="border px-2 sm:px-4 py-2">Notes</th>
                <th className="border px-2 sm:px-4 py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMovements.length > 0 ? (
                paginatedMovements.map((movement) => (
                  <tr
                    key={movement.movementId}
                    className="border hover:bg-gray-50"
                  >
                    <td className="border px-2 sm:px-4 py-2">
                      {movement.itemId}
                    </td>
                    <td className="border px-2 sm:px-4 py-2">
                      {movement.userId}
                    </td>
                    <td
                      className={`border px-2 sm:px-4 py-2 font-semibold ${
                        movement.action === "Added"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {movement.action}
                    </td>
                    <td className="border px-2 sm:px-4 py-2">
                      {movement.quantityChanged}
                    </td>
                    <td className="border px-2 sm:px-4 py-2">
                      {movement.notes || "-"}
                    </td>
                    <td className="border px-2 sm:px-4 py-2">
                      {new Date(movement.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center px-4 py-2">
                    No movements found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          &lt; Prev
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              (prev + 1) * itemsPerPage < movements.length ? prev + 1 : prev
            )
          }
          disabled={(currentPage + 1) * itemsPerPage >= movements.length}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
