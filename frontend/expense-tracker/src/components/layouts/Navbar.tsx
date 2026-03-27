import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }: { activeMenu: string }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const toggleSideMenu = () => {
    setOpenSideMenu((prev) => !prev);
  };
  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] px-7 py-4 sticky top-0 z-30">
      <button
        onClick={toggleSideMenu}
        className="block lg:hidden text-black text-2xl"
      >
        {openSideMenu ? <HiOutlineX /> : <HiOutlineMenu />}
      </button>
      <h2 className="text-lg font-medium text-black">你的记账本</h2>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
