import InventoryButton from "../Components/IntentoryComponents/InventoryButton";
import InventoryList from "../Components/IntentoryComponents/InventoryList";
import {rowsData} from "../Components/IntentoryComponents/DatabaseDemo"
import CreateBtn from "../Components/IntentoryComponents/CreateButton";
import AddBtn from "../Components/IntentoryComponents/AddButton";
import MoveBtn from "../Components/IntentoryComponents/MoveButton";

export default function Inventory() {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col md:flex-row w-full justify-center">
            <InventoryButton color="bg-red-800" text="Create Item" data={rowsData} action={CreateBtn}/>
            <InventoryButton color="bg-blue-800" text="Add Items" data={rowsData} action={AddBtn}/>
            <InventoryButton color="bg-orange-500" text="Deduce Items" data={rowsData}/>
            <InventoryButton color="bg-sky-600" text="Find Item" data={rowsData}/>
            <InventoryButton color="bg-green-800" text="Move Item" data={rowsData} action={MoveBtn}/>
            </div>
            <InventoryList data={rowsData}/>
        </div>
    )
}