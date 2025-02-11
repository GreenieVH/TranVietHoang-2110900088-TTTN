import React from "react";
import logo from "../../assets/Images/logo-gm.png"; // Đảm bảo bạn có một ảnh logo trong thư mục assets
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="relative z-10 mt-10 bg-gray-900 text-gray-400 py-8 px-16 max-w-screen-2xl mx-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-start">
          <img src={logo} alt="Logo" className="w-32 mb-4" />
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Đăng ký
          </Link>
        </div>
        {/* Cột 1: Giới thiệu */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Về Chúng Tôi
          </h3>
          <p className="text-sm">
            Trang web xem phim chất lượng cao, cập nhật nhanh nhất. Chúng tôi
            mang đến trải nghiệm giải trí tuyệt vời với kho phim đa dạng.
          </p>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Liên Kết Nhanh
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Phim Mới
              </a>
            </li>
            <li>
              <Link to='/movies/28' className="hover:text-white">
                Phim Lẻ
              </Link>
            </li>
            <li>
              <Link to='/tvs/10759' className="hover:text-white">
                Phim Bộ
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Liên Hệ
              </a>
            </li>
          </ul>
        </div>

        {/* Cột 3: Liên hệ */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Liên Hệ</h3>
          <ul className="space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:tranhoangth1979@gmail.com"
                className="hover:text-white"
              >
                tranhoangth1979@gmail.com
              </a>
            </li>
            <li>
              Hotline:{" "}
              <a href="tel:+84123456789" className="hover:text-white">
                +84 563 255 494
              </a>
            </li>
            <li>
              Mạng Xã Hội:
              <div className="flex space-x-4 mt-2">
                <a href="https://www.facebook.com/green07.me/" className="hover:text-white">
                  <i className="fab fa-facebook"></i> Facebook
                </a>
                <a href="#" className="hover:text-white">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Dòng bản quyền */}
      <div className="text-center mt-8 text-sm text-gray-500">
        © 2025 GMovie. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
