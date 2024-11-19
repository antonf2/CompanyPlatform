import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import classNames from "classnames";
import React, { Fragment } from "react";
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../HeaderComponents/SidebarMenu";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200 w-screen fixed z-1">
      <div className="block lg:hidden">
        <SidebarMenu />
      </div>
      <div className="relative hidden md:block lg:ml-[240px]">
        <HiOutlineSearch
          fontSize={20}
          className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
        />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-300 rounded-sm px-4 pl-11"
        />
      </div>
      <div className="flex items-center gap-2 mr-2 ">
        <PopoverItem
          icon={HiOutlineChatAlt}
          panelContent={
            <>
              <strong className="text-gray-700 font-medium">Messages</strong>
              <div className="mt-2 py-1 text-sm">This is Messages panel</div>
            </>
          }
        />
        <PopoverItem
          icon={HiOutlineBell}
          panelContent={
            <>
              <strong className="text-gray-700 font-medium">
                Notifications
              </strong>
              <div className="mt-2 py-1 text-sm">
                This is Notifications panel
              </div>
            </>
          }
        />
        <Menu as="div" className="relative">
          <MenuButton className="ml-2 inline-flex rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
            <span className="sr-only">Open User Menu</span>
            <div
              className="h-10 w-10 rounded-full bg-sky-300 bg-cover bg-no-repeat bg-center"
              style={{ backgroundImage: 'url("https://picsum.photos/80")' }}
            >
              <span className="sr-only">Username</span>
            </div>
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
            <MenuItems className="origin-top-right z-10 absolute right-8 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem>
                <div
                  className="group flex items-center px-4 py-2 text-sm cursor-pointer rounded-md data-[focus]:bg-gray-100 data-[hover]:bg-gray-100"
                  onClick={() => navigate("/profile")}
                >
                  My Profile
                </div>
              </MenuItem>
              <MenuItem>
                <div
                  className="group flex items-center px-4 py-2 text-sm cursor-pointer rounded-md data-[focus]:bg-gray-100 data-[hover]:bg-gray-100"
                  onClick={() => navigate("/login")}
                >
                  Logout
                </div>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </header>
  );
}

const PopoverItem = ({ icon: Icon, panelContent }) => {
  return (
    <Popover>
      {({ open }) => (
        <>
          <PopoverButton
            className={classNames(
              open && "bg-gray-100",
              "p-1.5 rounded inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
            )}
          >
            <Icon fontSize={24} />
          </PopoverButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel className="absolute sm:w-80 sm:right-0 w-full max-w-full z-10 mt-2.5 sm:left-auto left-0 sm:mr-2.5">
              <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                {panelContent}
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
