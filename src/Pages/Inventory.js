import CreateBtn from "../Components/IntentoryComponents/CreateButton";
import AddBtn from "../Components/IntentoryComponents/AddButton";
import DeduceBtn from "../Components/IntentoryComponents/DeduceButton";
import FindBtn from "../Components/IntentoryComponents/FindButton";
import { useState, useEffect } from "react";
import InventoryButton from "../Components/IntentoryComponents/InventoryButton";
import InventoryList from "../Components/IntentoryComponents/InventoryList";
import { getAllItems } from "../Services/useInventoryLogic";

export default function Inventory() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getAllItems();
        setData(items);
        setFilteredData(items);
      } catch (err) {
        setError("Failed to fetch inventory data.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    const filteredResults = data.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  return (
    <div className="flex flex-col">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col md:flex-row w-full justify-center">
        <InventoryButton
          color="bg-red-800"
          text="Create Item"
          data={data}
          action={(props) => (
            <CreateBtn
              {...props}
              setData={setData}
              setFilteredData={setFilteredData}
            />
          )}
          setFilteredData={setFilteredData}
        />
        <InventoryButton
          color="bg-blue-800"
          text="Add Items"
          data={data}
          action={(props) => (
            <AddBtn
              {...props}
              setData={setData}
              setFilteredData={setFilteredData}
            />
          )}
          setFilteredData={setFilteredData}
        />
        <InventoryButton
          color="bg-orange-500"
          text="Deduce Items"
          data={data}
          action={(props) => (
            <DeduceBtn
              {...props}
              setData={setData}
              setFilteredData={setFilteredData}
            />
          )}
          setFilteredData={setFilteredData}
        />
        <InventoryButton
          color="bg-sky-600"
          text="Find Item"
          data={filteredData}
          action={(props) => (
            <FindBtn {...props} setFilteredData={setFilteredData} />
          )}
          setFilteredData={setFilteredData}
        />
        ;
      </div>
      <InventoryList
        data={filteredData}
        setFilteredData={setFilteredData}
        setData={setData}
      />
    </div>
  );
}
