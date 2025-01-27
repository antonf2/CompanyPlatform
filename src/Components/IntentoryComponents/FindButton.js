import { getAllItems } from "../../Services/useInventoryLogic";

export default function FindBtn({ setIsOpen, setFilteredData }) {
  const handleFindClick = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchQuery = formData.get("search").toLowerCase();

    try {
      const allItems = await getAllItems();
      const filteredResults = allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery) ||
          item.description.toLowerCase().includes(searchQuery) ||
          item.location.toLowerCase().includes(searchQuery)
      );

      setFilteredData(filteredResults);
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to search items:", err);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Find Item</h2>
        <form onSubmit={handleFindClick}>
          <div className="mb-4">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              Search
            </label>
            <input
              type="text"
              name="search"
              id="search"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Find
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
