import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function FindBtn({ setIsOpen, data, setFilteredData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState(data);
  const [originalData, setOriginalData] = useState(data);
  const [appliedFilters, setAppliedFilters] = useState([]);
  useEffect(() => {
    setOriginalData(data);
    setFilteredResults(data);
  }, [data]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast.warning("Please enter a search query.", { position: "top-center" });
      return;
    }

    const newFilteredResults = filteredResults.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (newFilteredResults.length === 0) {
      toast.info("No results found.", { position: "top-center" });
      return;
    }

    setAppliedFilters((prevFilters) => [...prevFilters, searchQuery]);
    setFilteredResults(newFilteredResults);
    setFilteredData(newFilteredResults);
    setSearchQuery(""); 
  };

  const handleReset = () => {
    console.log("Resetting filters, original data:", originalData);
    setFilteredResults(originalData); 
    setFilteredData(originalData);
    setAppliedFilters([]); 
    toast.success("Filters reset successfully!", { position: "top-center" });
  };
  

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Find Item</h2>
        <form onSubmit={handleSearch}>
          <div className="mb-4">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700">
              Search by P/N, Description, or Location
            </label>
            <input
              type="text"
              name="search"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {appliedFilters.length > 0 && (
            <div className="mb-4 p-2 bg-gray-100 rounded-md">
              <p className="text-sm font-medium text-gray-700">Applied Filters:</p>
              <ul className="text-xs text-gray-600">
                {appliedFilters.map((filter, index) => (
                  <li key={index}>🔍 {filter}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Close
            </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
              >
                Reset Filter
              </button>

            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
