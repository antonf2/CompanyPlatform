import { createItem } from "../../Services/useInventoryLogic";
import { toast } from "react-toastify";

export default function CreateBtn({ setIsOpen, setData, setFilteredData }) {
  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newItem = {
      name: formData.get("name"),
      description: formData.get("description"),
      quantity: parseInt(formData.get("quantity")),
      location: formData.get("location"),
    };

    try {
      const createdItem = await createItem(newItem);

      setData((prevData) => [...prevData, createdItem]);
      setFilteredData((prevData) => [...prevData, createdItem]);

      setIsOpen(false);
    } catch (err) {
      console.error("Failed to create item:", err.response?.data || err.message);
      toast.error("Failed to create item.", { position: "top-center" });
    }
  };


  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Create Item</h2>
        <form onSubmit={handleCreate}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              P/N
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              id="description"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              required
              min="1"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}