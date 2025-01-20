export default function MoveBtn({ setIsOpen, data }) {
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const inventoryItem = {
        pn: formData.get("partNumber"),
        quantity: formData.get("quantity"),
        location: formData.get("location"),
        toLocation: formData.get("toLocation"),
      };
      data.push(inventoryItem); //replace with actual use for inventoryItem
      setIsOpen(false);
    };
  
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-md shadow-md w-96">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Add Items To Inventory
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="partNumber"
                className="block text-sm font-medium text-gray-700"
              >
                P/N
              </label>
              <input
                type="text"
                name="partNumber"
                id="partNumber"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                From Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="toLocation"
                className="block text-sm font-medium text-gray-700"
              >
                To Location
              </label>
              <input
                type="text"
                name="toLocation"
                id="toLocation"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  