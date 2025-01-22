import InventoryButton from "../Components/IntentoryComponents/InventoryButton";
import InventoryList from "../Components/IntentoryComponents/InventoryList";
import { rowsData } from "../Components/IntentoryComponents/DatabaseDemo";
import CreateBtn from "../Components/IntentoryComponents/CreateButton";
import AddBtn from "../Components/IntentoryComponents/AddButton";
import MoveBtn from "../Components/IntentoryComponents/MoveButton";
import DeduceBtn from "../Components/IntentoryComponents/DeduceButton";
import FindBtn from "../Components/IntentoryComponents/FindButton";
import { useState } from "react";

export default function Inventory() {
  const [filteredData, setFilteredData] = useState(rowsData);

  const handleSearch = (query) => {
    const filteredResults = rowsData.filter(
      (item) =>
        item.pn.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row w-full justify-center">
        <InventoryButton
          color="bg-red-800"
          text="Create Item"
          data={filteredData}
          action={CreateBtn}
          setFilteredData={setFilteredData}
        />
        <InventoryButton
          color="bg-blue-800"
          text="Add Items"
          data={filteredData}
          action={AddBtn}
          setFilteredData={setFilteredData}
        />
        <InventoryButton
          color="bg-orange-500"
          text="Deduce Items"
          data={filteredData}
          action={DeduceBtn}
          setFilteredData={setFilteredData}
        />
        <InventoryButton
          color="bg-sky-600"
          text="Find Item"
          data={filteredData}
          action={FindBtn}
          handleSearch={handleSearch}
        />
        <InventoryButton
          color="bg-green-800"
          text="Move Item"
          data={filteredData}
          action={MoveBtn}
          setFilteredData={setFilteredData}
        />
      </div>
      <InventoryList data={filteredData} setFilteredData={setFilteredData} />
    </div>
  );
}
