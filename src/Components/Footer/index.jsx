import React from "react";
import logo from "../../assets/Images/logo-gm.png"; // Đảm bảo bạn có một ảnh logo trong thư mục assets
import {Link} from "react-router-dom"
const Footer = () => {
  return (
    <footer className="relative mt-10 bg-gray-800 text-white py-8 z-50">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Cột 1: Logo và Button */}
        <div className="flex flex-col items-start">
          <img src={logo} alt="Logo" className="w-32 mb-4" />
          <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
            Đăng ký
          </Link>
        </div>

        {/* Cột 2: Khái niệm cơ bản */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Khái niệm cơ bản</h3>
          <ul>
            <li><a href="" className="hover:underline">Giới thiệu về TMDB</a></li>
            <li><a href="" className="hover:underline">Liên hệ với chúng tôi</a></li>
            <li><a href="" className="hover:underline">Diễn đàn hỗ trợ</a></li>
            <li><a href="" className="hover:underline">API</a></li>
            <li><a href="" className="hover:underline">Trạng thái hệ thống</a></li>
          </ul>
        </div>

        {/* Cột 3: Tham gia */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Tham gia</h3>
          <ul>
            <li><a href="" className="hover:underline">Kinh Thánh đóng góp</a></li>
            <li><a href="" className="hover:underline">Thêm mới phim</a></li>
            <li><a href="" className="hover:underline">Thêm chương trình TV mới</a></li>
          </ul>
        </div>

        {/* Cột 4: Cộng đồng */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Cộng đồng</h3>
          <ul>
            <li><a href="" className="hover:underline">Hướng dẫn</a></li>
            <li><a href="" className="hover:underline">Thảo luận</a></li>
            <li><a href="" className="hover:underline">Bảng xếp hạng</a></li>
          </ul>
        </div>

        {/* Cột 5: Hợp pháp */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Hợp pháp</h3>
          <ul>
            <li><a href="" className="hover:underline">Điều khoản sử dụng</a></li>
            <li><a href="" className="hover:underline">Điều khoản sử dụng API</a></li>
            <li><a href="" className="hover:underline">Chính sách bảo mật</a></li>
            <li><a href="" className="hover:underline">Chính sách DMCA</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8 text-sm">
        <p>© 2025 GMOVIE.</p>
      </div>
    </footer>
  );
};

export default Footer;
