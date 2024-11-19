import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
    return (
        <div className="flex flex-row bg-neutral-100 h-screen w-screen">
            <Sidebar />
            <div className="flex-1">
                <Header />
                <div className="p-4 min-h-screen overflow-y-auto lg:ml-[240px] mt-[60px]">{<Outlet />}</div>
            </div>
        </div>
    )
}