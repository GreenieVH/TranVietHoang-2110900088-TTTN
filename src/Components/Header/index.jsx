import React, { useState, useEffect, useRef } from "react";
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
  const [toggleShowMenu, setToggleShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Danh sách menu
  const menu = [
    { name: "HOME", icon: HiHome},
    { name: "SEARCH", icon: HiMagnifyingGlass },
    { name: "WATCHLIST", icon: HiPlus },
    { name: "MOVIES", icon: HiPlayCircle },
    { name: "SERIES", icon: HiTv },
    { name: "ORIGINALS", icon: HiStar },
  ];

  // Đóng menu khi nhấp bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggleShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Render menu
  const renderMenu = (menuItems) =>
    menuItems.map((item, index) => (
      <HeaderItem key={index} name={item.name} Icon={item.icon} />
    ));

  return (
    <div className="flex p-6 items-center justify-between">
      <div className="flex gap-8">
        <div className="w-[80px] md:w-[115px] object-cover text-white">Logo</div>

        {/* Menu đầy đủ trên màn hình lớn */}
        <div className="hidden md:flex gap-8">{renderMenu(menu)}</div>

        {/* Menu rút gọn trên màn hình nhỏ */}
        <div className="flex md:hidden gap-8 relative" ref={menuRef}>
          {renderMenu(menu.slice(0, 3))}
          <div
            className="flex relative cursor-pointer"
            onClick={() => setToggleShowMenu(!toggleShowMenu)}
          >
            <HeaderItem name={""} Icon={HiDotsVertical} />
            {toggleShowMenu && (
              <div
                className="absolute bg-[#121212] top-8 right-0 border-[1px] border-gray-500 py-3 px-5 rounded-md flex flex-col gap-4 
                transition-all duration-300 z-50"
              >
                {renderMenu(menu.slice(3))}
              </div>
            )}
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
