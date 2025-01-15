import { useState, useEffect } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
};

export function useTMDBAuth() {
  const [requestToken, setRequestToken] = useState(null);
  const [sessionId, setSessionId] = useState(() => {
    // Lấy sessionId từ localStorage nếu có
    return localStorage.getItem("sessionId") || null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequestToken = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/token/new`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch request token");

      const data = await response.json();
      setRequestToken(data.request_token);
      return data.request_token;
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createSessionId = async (token) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/session/new`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ request_token: token }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Error details:", data);
        setError(data.status_message || "Không thể tạo session.");
        return;
      }

      setSessionId(data.session_id);
      // Lưu sessionId vào localStorage
      localStorage.setItem("sessionId", data.session_id);
      console.log("Session ID created:", data.session_id);
      return data.session_id;
    } catch (err) {
      setError(err.message);
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    requestToken,
    sessionId,
    loading,
    error,
    fetchRequestToken,
    createSessionId,
  };
}

export function useAccountDetails(sessionId) {
  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchAccountDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.themoviedb.org/3/account`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
          params: {
            session_id: sessionId,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch account details");

        const data = await response.json();
        setAccountDetails(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching account details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountDetails();
  }, [sessionId]);

  return { accountDetails, loading, error };
}

export function useFavoriteList(
  accountId,
  sessionId,
  type = "movies",
  page = 1
) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/account/${accountId}/favorite/${type}?api_key=${
            import.meta.env.VITE_API_KEY
          }&session_id=${sessionId}&page=${page}`,
          options
        );

        if (!response.ok) {
          throw new Error("Failed to fetch favorite list");
        }

        const data = await response.json();
        setFavorites(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (accountId && sessionId) {
      fetchFavorites();
    }
  }, [accountId, sessionId, type, page]);
  // console.log(favorites)
  return { favorites, loading, error };
}

export const useFavoriteMovies = (sessionId, accountId) => {
  const [error,setError] = useState()
  const [favorites, setFavorites] = useState(new Set());

  // Kiểm tra danh sách yêu thích từ localStorage khi component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(new Set(storedFavorites));
  }, []);

  const handleFavoriteToggle = async (movieId) => {
    const isFavorite = favorites.has(movieId);

    try {
      // Gửi request tới TMDB API để thêm hoặc xóa khỏi yêu thích
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${
          import.meta.env.VITE_API_KEY
        }&session_id=${sessionId}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            media_type: "movie",
            media_id: movieId,
            favorite: !isFavorite, // Nếu đã yêu thích thì xóa, ngược lại thêm vào
          }),
        }
      );
      const data = await response.json();

      if (data.status_code === 1) {
        setFavorites((prevFavorites) => {
          const newFavorites = new Set(prevFavorites);
          if (isFavorite) {
            newFavorites.delete(movieId); // Xóa khỏi yêu thích
          } else {
            newFavorites.add(movieId); // Thêm vào yêu thích
          }
          localStorage.setItem(
            "favorites",
            JSON.stringify(Array.from(newFavorites))
          );
          return newFavorites;
        });
      } else if (
        data.status_message === "The item/record was deleted successfully."
      ) {
        // Xử lý khi xóa thành công (thông báo này xuất hiện khi bạn xóa khỏi yêu thích)
        setFavorites((prevFavorites) => {
          const newFavorites = new Set(prevFavorites);
          newFavorites.delete(movieId); // Xóa khỏi danh sách yêu thích
          localStorage.setItem(
            "favorites",
            JSON.stringify(Array.from(newFavorites))
          ); // Cập nhật localStorage
          return newFavorites;
        });
      } else {
        setError(data.status_message || "Có lỗi xảy ra.");
        console.error("Lỗi khi xử lý yêu thích:", data.status_message);
      }
    } catch (error) {
      console.error("Có lỗi khi gửi yêu cầu:", error);
    }
  };

  return {
    favorites,
    handleFavoriteToggle,
  };
};
