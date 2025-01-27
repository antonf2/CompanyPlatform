import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_LINKS } from "../../Consts/navigation";
import ClassNames from "classnames";
import { linkCSS } from "../../Consts/common";
import { useContext } from "react";
import { AuthContext } from "../../Consts/common";

export default function Sidebar() {
  const { user, isAuthenticated } = useContext(AuthContext);

  const filteredLinks = SIDEBAR_LINKS.filter(
    (item) => item.key !== "management" || user?.role === "Admin"
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-neutral-900 w-60 p-3 lg:flex flex-col hidden text-white fixed h-screen z-10">
      <div className="flex items-baseline gap-2 px-1 py-3">
        <span className="font-bold text-5xl">WH</span>
        <span className="font-bold text-xl font-mono px-1">PLATFORM</span>
      </div>
      <div className="flex-1">
        {filteredLinks.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
    </nav>
  );
}

const SidebarLink = ({ item }) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={item.path}
      className={ClassNames(
        pathname === item.path ? "text-white font-semibold bg-neutral-700" : "text-neutral-300",
        linkCSS
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
};
