import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Link, useNavigate } from "react-router-dom";
import { useGenres, useTvGenres } from "../../../Servives/GlobalApi";
import { HiHome, HiStar, HiPlayCircle, HiTv } from "react-icons/hi2";
import { HiPlus, HiMenu, HiX } from "react-icons/hi";
import { useAccountDetails } from "../../../Servives/Auth";
import logo from "../../../assets/Images/logo-gm.png";
import HeaderItem from "./HeaderItem";
import UserProfile from "./UserProfile";
import GenresList from "../../ui/GenresList";
import SearchBar from "../../ui/SearchBar";

function Header() {
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId");
  const { accountDetails } = useAccountDetails(sessionId);
  const { genres } = useGenres();
  const { tvGenres } = useTvGenres();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const menu = [
    { name: "Trang chủ", icon: HiHome, link: "/" },
    { name: "Phim lẻ", icon: HiPlayCircle, link: "/movies/28", isGenres: true },
    { name: "Phim Bộ", icon: HiTv, link: "/tvs/10759", isGenres: true },
    { name: "Yêu thích", icon: HiStar, link: "/favoritelist" },
    { name: "Danh sách", icon: HiPlus, link: "/watch-list" },
  ];
  const dropdownAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scale(1)" : "scale(0.4)",
    config: { tension: 400, friction: 30, mass: 1.3 },
    immediate: !isOpen,
  });
  const renderMenu = (menuItems) =>
    menuItems.map((item, index) => (
      <div
        key={index}
        className="group relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <HeaderItem name={item.name} Icon={item.icon} link={item.link} />
        {item.isGenres && (
          <animated.div
            style={dropdownAnimation}
            className="absolute top-0 right-0 lg:top-12 lg:left-0 mt-2 w-[350px] md:w-[500px] bg-gray-800 p-2 pr-0 rounded-md  invisible group-hover:visible z-50  
                      before:content-[''] before:absolute before:top-[-4px] before:left-10 before:w-6 before:h-4 before:bg-gray-800 before:rotate-[30deg] before:z-[-1]"
          >
            <div className="scroll-vertical h-[220px] overflow-y-auto">
              {item.name === "Phim lẻ" ? (
                <GenresList
                  genres={genres}
                  onSelectGenre={(id) => navigate(`/movies/${id}`)}
                />
              ) : (
                <GenresList
                  genres={tvGenres}
                  onSelectGenre={(id) => navigate(`/tvs/${id}`)}
                />
              )}
            </div>
          </animated.div>
        )}
      </div>
    ));

  useEffect(() => {
    if (accountDetails?.id) {
      localStorage.setItem("accountId", accountDetails.id);
    }
  }, [accountDetails]);

  return (
    <div className="sticky top-0 z-50 bg-[#0c0f1b] flex p-2 px-4 items-center justify-between">
      {/* Logo */}
      <Link className="lg:flex items-center hidden" to="/">
        <img src={logo} alt="Logo" className="h-8 w-auto object-contain" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-2">{renderMenu(menu)}</div>

      {/* Mobile Menu Toggle */}
      <div className="lg:hidden flex items-center" ref={menuRef}>
        <button
          className="text-black focus:outline-none"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-900 p-4 flex flex-col gap-4 z-50">
          <div className="items-center">
            <img src={logo} alt="Logo" className="h-8 w-auto object-contain" />
          </div>
          {renderMenu(menu)}
        </div>
      )}

      {/* SearchBar */}
      <SearchBar />

      {/* Profile */}
      {!accountDetails && (
        <div className="">
          <div className="p-2 bg-gray-800 text-white rounded-md transition-all duration-300 z-20 w-max">
            <p className="cursor-pointer font-semibold whitespace-nowrap">
              <Link to="/login" className="text-white hover:text-green-500">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      )}
      {accountDetails && <UserProfile accountDetails={accountDetails} />}
    </div>
  );
}

export default Header;
