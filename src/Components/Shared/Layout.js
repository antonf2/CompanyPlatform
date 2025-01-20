import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex flex-row bg-neutral-100 h-full w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-4 min-h-lvh overflow-y-auto lg:ml-[240px] pt-20">
          {<Outlet />}
        </div>
      </div>
    </div>
  );
}
