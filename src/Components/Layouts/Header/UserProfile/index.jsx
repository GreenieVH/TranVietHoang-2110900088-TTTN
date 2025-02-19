import { useState, useEffect, useRef } from "react";
import img_user_default from "../../../../assets/Images/img_user_default.png";
import { Link } from "react-router-dom";

const UserProfile = ({ accountDetails }) => {
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef(null); // Ref cho chi tiết thông tin
  const avatarRef = useRef(null); // Ref cho avatar

  const handleAvatarClick = () => {
    setShowDetails((prev) => !prev); // Toggle hiển thị chi tiết khi click
  };

  // Đóng chi tiết khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setShowDetails(false); // Ẩn chi tiết khi click ra ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Lắng nghe sự kiện click ngoài

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Dọn dẹp sự kiện khi component bị unmount
    };
  }, []);

  return (
    <div className="relative">
      {/* Avatar và vùng chứa */}
      <div className="group relative">
        <img
          ref={avatarRef} // Gắn ref vào avatar
          src={
            accountDetails.avatar.tmdb?.avatar_path
              ? `https://image.tmdb.org/t/p/w200${accountDetails.avatar.tmdb.avatar_path}`
              : img_user_default
          }
          alt="user"
          className="w-[40px] h-[40px] rounded-full cursor-pointer border-2 border-gray-300"
          onClick={handleAvatarClick} // Thêm sự kiện click
        />

        {/* Khi hover, hiển thị "Hồ sơ và cài đặt" */}
        <div className="absolute right-0 top-full mt-2 p-2 bg-gray-800 text-white rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 z-20 w-max">
          <p className="cursor-pointer font-semibold whitespace-nowrap">
            Hồ sơ và cài đặt
          </p>
        </div>
      </div>

      {/* Chi tiết thông tin (chỉ hiển thị khi click vào avatar) */}
      {showDetails && (
        <div
          ref={detailsRef} // Gắn ref vào chi tiết thông tin
          className="absolute right-0 top-full mt-2 p-4 bg-[rgba(3,37,65)] text-white border border-gray-300 rounded-lg shadow-2xl opacity-100 visible transition-all duration-300 z-30 w-[300px] pointer-events-auto"
        >
          {/* Thông tin tài khoản */}
          <h2 className="text-lg font-bold mb-2 border-b border-white pb-1">
            Thông tin tài khoản
          </h2>
          {accountDetails.avatar.tmdb?.avatar_path && (
            <div className="flex justify-center mt-3">
              <img
                src={`https://image.tmdb.org/t/p/w200${accountDetails.avatar.tmdb.avatar_path}`}
                alt="Avatar"
                className="w-[80px] h-[80px] rounded-full border-2 border-white"
              />
            </div>
          )}
          <p className="mb-1 text-center font-semibold">
            {accountDetails.name || "Không có"}
          </p>
          <p className="mb-1 text-center">
            <strong>ID:</strong> {accountDetails.id}
          </p>
          <p className="cursor-pointer hover:bg-gray-700 p-2 rounded-md transition-all duration-300">
            <a
              href="https://www.themoviedb.org/settings/profile"
              className=" text-white hover:text-white"
            >
              Chỉnh sửa hồ sơ
            </a>
          </p>

          {/* Các lựa chọn */}
          <div className="">
            <p className="cursor-pointer hover:bg-gray-700 p-2 rounded-md transition-all duration-300">
              <Link to="" className="text-white hover:text-white">
                Thảo luận
              </Link>
            </p>
            <p className=" cursor-pointer hover:bg-gray-700 p-2 rounded-md transition-all duration-300">
              <Link to="follow-list" className="text-white hover:text-white">
                Danh sách theo dõi
              </Link>
            </p>
            <p className="cursor-pointer hover:bg-gray-700 p-2 rounded-md transition-all duration-300">
              <Link to="" className="text-white hover:text-white">
                Xếp hạng
              </Link>
            </p>
            <p className="cursor-pointer hover:bg-gray-700 p-2 rounded-md transition-all duration-300">
              <Link to="" className="text-white hover:text-white">
                Lịch sử
              </Link>
            </p>
            <p
              className="cursor-pointer hover:bg-red-700 p-2 rounded-md transition-all duration-300"
              onClick={() => {
                localStorage.removeItem("sessionId");
                localStorage.removeItem("accountId");
                window.location.reload(); // Reload lại trang nếu cần
              }}
            >
              Đăng xuất
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
