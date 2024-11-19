import InventoryButton from "../Components/IntentoryComponents/InventoryButton";
import InventoryList from "../Components/IntentoryComponents/InventoryList";

export default function Inventory() {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col md:flex-row w-full justify-center">
            <InventoryButton color="bg-red-800" text="Create Item"/>
            <InventoryButton color="bg-blue-800" text="Add Items"/>
            <InventoryButton color="bg-orange-500" text="Deduce Items"/>
            <InventoryButton color="bg-sky-600" text="Find Item"/>
            </div>
            <InventoryList />
        </div>
    )
}