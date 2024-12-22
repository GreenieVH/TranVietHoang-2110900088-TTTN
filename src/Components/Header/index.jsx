import React, { useState } from "react";
import {
  HiHome,
  HiMagnifyingGlass,
  HiStar,
  HiPlayCircle,
  HiTv,
} from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import img_user_default from "../../assets/Images/img_user_default.png";
import HeaderItem from "./HeaderItem";

function Header() {
  const [toggleShowMenu, settToggleShowMenu] = useState(false);
  const menu = [
    {
      name: "HOME",
      icon: HiHome,
    },
    {
      name: "SEARCH",
      icon: HiMagnifyingGlass,
    },
    {
      name: "WATCHLIST",
      icon: HiPlus,
    },
    {
      name: "MOVIES",
      icon: HiPlayCircle,
    },
    {
      name: "SERIES",
      icon: HiTv,
    },
    {
      name: "ORIGINALS",
      icon: HiStar,
    },
  ];
  return (
    <div className="flex p-6 items-center justify-between">
      <div className="flex gap-8">
        <div className="w-[80px] md:w-[115px] object-cover text-white">
          Logo
        </div>
        <div className="hidden md:flex gap-8">
          {menu.map((item) => (
            <HeaderItem name={item.name} Icon={item.icon} />
          ))}
        </div>
        <div className="flex md:hidden gap-8">
          {menu.map(
            (item, index) =>
              index < 3 && <HeaderItem name={""} Icon={item.icon} />
          )}
          <div className="flex relative" onClick={() => settToggleShowMenu(!toggleShowMenu)}>
            <HeaderItem name={""} Icon={HiDotsVertical} />
            {toggleShowMenu ? <div className="absolute bg-[#121212] top-8 border-[1px] border-gray-500 py-3 px-5 rounded-md flex flex-col gap-4">
              {menu.map(
                (item, index) =>
                  index > 2 && <HeaderItem name={item.name} Icon={item.icon} />
              )}
            </div> : null}
          </div>
        </div>
      </div>
      <img
        src={img_user_default}
        alt="user"
        className="w-[40px] rounded-full"
      />
    </div>
  );
}

export default Header;
