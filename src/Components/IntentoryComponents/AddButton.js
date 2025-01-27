import { updateItem } from "../../Services/useInventoryLogic";

export default function AddBtn({ setIsOpen, data, setData }) {
  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const pn = formData.get("pn");
    const quantityToAdd = parseInt(formData.get("quantity"));

    const itemToUpdate = data.find((item) => item.name === pn);
    if (!itemToUpdate) {
      alert("Item not found!");
      return;
    }

    const updatedItem = {
      ...itemToUpdate,
      quantity: itemToUpdate.quantity + quantityToAdd,
    };

    try {
      await updateItem(itemToUpdate.itemId, updatedItem);
      setData((prevData) =>
        prevData.map((item) =>
          item.itemId === itemToUpdate.itemId ? updatedItem : item
        )
      );
      setIsOpen(false);
    } catch (err) {
      console.error("Failed to update item quantity:", err);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Add Items</h2>
        <form onSubmit={handleAdd}>
          <div className="mb-4">
            <label htmlFor="pn" className="block text-sm font-medium text-gray-700">
              Part Number
            </label>
            <input
              type="text"
              name="pn"
              id="pn"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Quantity to Add
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
