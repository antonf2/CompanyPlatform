import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import CreateBtn from "./CreateButton";


export default function InventoryButton({color,text,data,action:Action}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <button 
    className="flex flex-col w-full h-16 md:w-32 md:h-24 lg:w-48 lg:h-32 rounded overflow-hidden cursor-pointer border-none p-0 focus:outline-none active:opacity-90 hover:brightness-90 hover:scale-105 mb-2 md:mb-4 md:mr-8"
    onClick={() => setIsOpen(true)}
    >
      <div className={`h-4/6 w-full ${color} flex items-center justify-center border-b-2 border-neutral-100 text-white text-2xl`}>
      <HiMenu />
      </div>
      <div className="h-2/6 w-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold">
        {text}
      </div>
    </button>
    {isOpen && <Action setIsOpen={setIsOpen} data={data}/>}
    </>
  );
}