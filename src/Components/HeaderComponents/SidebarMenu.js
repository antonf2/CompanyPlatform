import { Menu, Transition, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_LINKS } from "../../Consts/navigation";
import { HiMenu } from "react-icons/hi";
import { AuthContext } from "../../Consts/common";

export default function SidebarMenu() {
  const { user } = useContext(AuthContext);

  const filteredLinks = SIDEBAR_LINKS.filter(
    (item) => item.key !== "management" || user?.role === "Admin"
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium bg-transparent rounded-md hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <span className="text-xl">
          <HiMenu />
        </span>
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <MenuItems className="absolute left-0 mt-2 w-60 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {filteredLinks.map((item) => (
            <CustomMenuItem key={item.key} item={item} />
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
}

const CustomMenuItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <MenuItem>
      <div
        className="group flex items-center px-4 py-2 text-sm cursor-pointer rounded-md hover:bg-gray-100"
        onClick={() => navigate(item.path)}
      >
        <span className="text-xl mr-2">{item.icon}</span>
        {item.label}
      </div>
    </MenuItem>
  );
};
