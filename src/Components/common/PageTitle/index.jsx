import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    let title = "Gmovie";
    const titleMap = {
      "/": "Trang chủ - Gmovie",
      "/favoritelist": "Danh sách yêu thích - Gmovie",
      "/watch-list": "Danh sách xem - Gmovie",
      "/search-results": "Kết quả tìm kiếm - Gmovie",
      "/follow-list": "Danh sách theo dõi - Gmovie",
      "/login": "Đăng nhập - Gmovie",
      "/gmovie": "Danh sách phim - Gmovie"
    };

    // Kiểm tra path có param (ID, slug)
    if (/^\/movies\/[^/]+$/.test(location.pathname)) {
      title = "Phim theo thể loại - Gmovie";
    } else if (/^\/tvs\/[^/]+$/.test(location.pathname)) {
      title = "TV Series theo thể loại - Gmovie";
    } else if (/^\/movie\/[^/]+$/.test(location.pathname)) {
      title = "Chi tiết phim - Gmovie";
    } else if (/^\/tvserie\/[^/]+$/.test(location.pathname)) {
      title = "Chi tiết TV Series - Gmovie";
    } else if (/^\/gmovie-detail\/[^/]+$/.test(location.pathname)) {
      title = "Chi tiết Gmovie - Gmovie";
    } else if (/^\/gmovie-play\/[^/]+\/[^/]+$/.test(location.pathname)) {
      title = "Xem phim Gmovie - Gmovie";
    } else {
      title = titleMap[location.pathname] || "Gmovie";
    }
    document.title = title;
  }, [location]);

  return null; // Không cần render gì
};

export default PageTitle;
