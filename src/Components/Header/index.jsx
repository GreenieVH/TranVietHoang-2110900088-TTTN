import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiHome, HiMagnifyingGlass, HiStar, HiPlayCircle, HiTv } from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import { useAccountDetails } from "../../Servives/Auth";
import HeaderItem from "./HeaderItem";
import UserProfile from "./UserProfile"; // Import UserProfile
import { useGenres, useTvGenres } from "../../Servives/GlobalApi";
import GenresList from "../GenresList";

function Header() {
  const navigate = useNavigate(); // Dùng useNavigate từ React Router để điều hướng
  const sessionId = localStorage.getItem("sessionId");
  const [toggleShowMenu, setToggleShowMenu] = useState(false);
  const { accountDetails, loading } = useAccountDetails(sessionId);
  const { genres } = useGenres();
  const { tvGenres } = useTvGenres();
  const menuRef = useRef(null);

  const menu = [
    { name: "Trang chủ", icon: HiHome, link: "/" },
    { name: "Phim lẻ", icon: HiPlayCircle, link: "/movies", isGenres: true },
    { name: "Phim Bộ", icon: HiTv, link: "/tvseries", isGenres: true },
    { name: "Yêu thích", icon: HiStar, link: "/favoritelist" },
    { name: "WATCHLIST", icon: HiPlus, link: "/" },
    { name: "Tìm kiếm", icon: HiMagnifyingGlass, link: "/" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggleShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectGenre = (id, name) => {
    navigate(`/tvs/${id}`);
  };

  const handleSelectGenreMovie = (id, name) => {
    navigate(`/movies/${id}`);
  };

  const renderMenu = (menuItems) =>
    menuItems.map((item, index) => (
      <div key={index} className="group relative">
        <HeaderItem
          name={item.name}
          Icon={item.icon}
          link={item.link}
        />
        {item.isGenres && (
          <div
            className="absolute top-full mt-2 w-[400px] md:w-[700px] bg-gray-800 p-4 rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50"
          >
            {item.name === "Phim lẻ" ? (
              <GenresList genres={genres} onSelectGenre={handleSelectGenreMovie} />
            ) : (
              <GenresList genres={tvGenres} onSelectGenre={handleSelectGenre} />
            )}
          </div>
        )}
      </div>
    ));

  return (
    <div className="sticky top-0 z-50 bg-[#0c0f1b] flex p-6 items-center justify-between">
      <div className="flex gap-8">
        <div className="w-[80px] md:w-[115px] object-cover text-white">Logo</div>
        <div className="hidden md:flex gap-8">{renderMenu(menu)}</div>
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
      {accountDetails && <UserProfile accountDetails={accountDetails} />}
    </div>
  );
}

export default Header;
