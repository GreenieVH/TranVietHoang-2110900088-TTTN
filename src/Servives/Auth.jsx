import { useState, useEffect, useCallback } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
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
            Authorization: `Bearer ${API_KEY}`,
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
            Authorization: `Bearer ${API_KEY}`,
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
    error,
    requestToken,
    sessionId,
    loading,

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
            Authorization: `Bearer ${API_KEY}`,
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
    // console.log(accountDetails)
    fetchAccountDetails();
  }, [sessionId]);
  return { accountDetails, loading, error };
}

export function useFavoriteList(
  accountId,
  sessionId,
  page = 1,
  favoritesUpdated
) {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId || !accountId) {
      return;
    }

    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);

      try {
        const validPage =
          isNaN(page) || page < 1 || page > 500 ? 1 : Math.floor(page);

        // Fetch movies
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}&page=${validPage}&language=vi`,
          options
        );
        if (!movieResponse.ok) {
          throw new Error("Failed to fetch favorite movies");
        }
        const movieData = await movieResponse.json();
        setMovies(movieData.results || []);

        // Fetch TV shows
        const tvResponse = await fetch(
          `https://api.themoviedb.org/3/account/${accountId}/favorite/tv?api_key=${API_KEY}&session_id=${sessionId}&page=${validPage}&language=vi`,
          options
        );
        if (!tvResponse.ok) {
          throw new Error("Failed to fetch favorite TV shows");
        }
        const tvData = await tvResponse.json();
        setTvShows(tvData.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    // console.log(tvShows)
    if (accountId && sessionId) {
      fetchFavorites();
    }
  }, [accountId, sessionId, page, favoritesUpdated]);

  return { movies, tvShows, loading, error };
}

export const useFavoriteMovies = (
  sessionId,
  accountId,
  mediaType = "movie"
) => {
  const [error, setError] = useState();
  const [favoritesUpdated, setFavoritesUpdated] = useState(false);

  const handleFavoriteToggle = async (movieId, isFavorite, activeTab) => {
    if (!sessionId || !accountId) {
      alert("Vui lòng đăng nhập để tiếp tục!");
      return;
    }
    if (activeTab === "tv") {
      mediaType = "tv";
    }
    try {
      // Gửi request tới TMDB API để thêm hoặc xóa khỏi yêu thích
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            media_type: mediaType,
            media_id: movieId,
            favorite: !isFavorite, // Nếu đã yêu thích thì xóa, ngược lại thêm vào
          }),
        }
      );
      const data = await response.json();

      if (data.success) {
        setFavoritesUpdated((prev) => !prev);
      } else {
        setError(data.status_message || "Có lỗi xảy ra.");
        console.error("Lỗi khi xử lý yêu thích:", data.status_message);
      }
    } catch (error) {
      console.error("Có lỗi khi gửi yêu cầu:", error);
    }
  };
  return {
    handleFavoriteToggle,
    favoritesUpdated,
  };
};

export const useFetchMovieLists = (sessionId, accountId) => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLists = async () => {
    if (!sessionId || !accountId) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${accountId}/lists?session_id=${sessionId}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // console.log("danh sach:",data)
      setLists(data.results || []);
    } catch (error) {
      console.error("Lỗi lấy danh sách phim:", error);
    } finally {
      setLoading(false);
    }
    
  };

  useEffect(() => {
    fetchLists();
  }, [accountId, sessionId]); // Chạy lại nếu sessionId hoặc accountId thay đổi

  return { lists, loading, setLists, refetch: fetchLists };
};

export const useManageMovieLists = (
  sessionId,
  lists,
  setLists,
  mediaType = "movie"
) => {
  // Hàm thêm phim vào danh sách
  const addToList = async (listId, movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/list/${listId}/add_item?session_id=${sessionId}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ media_id: movieId, media_type: mediaType }),
        }
      );
      const data = await response.json();
      if (data.success || data.status_code === 12) {
        alert("Phim đã được thêm vào danh sách!");
      } else if (data.status_code === 8) {
        alert("Đã có phim trong danh sách!");
      } else {
        console.error("Lỗi khi thêm phim:", data.status_message);
      }
    } catch (error) {
      console.error("Lỗi khi thêm phim vào danh sách:", error);
    }
  };

  // Hàm tạo danh sách mới
  const createNewList = async (name, description) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/list?session_id=${sessionId}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, description, language: "vi" }),
        }
      );
      const data = await response.json();
      if (data.success && data.list_id) {
        setLists([...lists, data]); // Cập nhật danh sách mới
        alert("Danh sách mới đã được tạo!");
      } else {
        console.log("message:", data.status_message);
      }
    } catch (error) {
      console.error("Lỗi khi tạo danh sách:", error);
    }
  };

  return { addToList, createNewList };
};

export const useFetchMoviesByList = (listId) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    if (!listId) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/list/${listId}?api_key=${API_KEY}&language=vi`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      const data = await response.json();
      // console.log("Danh sách phim:", data);
      setMovies(data || []);
    } catch (error) {
      console.error("Lỗi lấy danh sách phim:", error);
      setMovies([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [listId]);

  return { movies, loading, refetch: fetchMovies };
};

export function useFollowlist(mediaType = "tv") {
  const [follows, setFollowlist] = useState([]);
    const [loading, setLoading] = useState(false);
  const accountId = localStorage.getItem("accountId");
  const sessionId = localStorage.getItem("sessionId");

  // Lấy danh sách Watchlist
  const fetchFollowlist = async () => {
    if (!accountId || !sessionId) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${accountId}/watchlist/${mediaType}?session_id=${sessionId}&language=vi`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const data = await response.json();
      setFollowlist(data.results || []);
    } catch (error) {
      console.error("Lỗi khi lấy Watchlist:", error);
    } finally {
      setLoading(false);
    }
  };

  // Thêm hoặc xóa khỏi Watchlist
  const toggleFollowlist = async (mediaId, add = true) => {
    if (!accountId || !sessionId) {
      alert("Vui lòng đăng nhập để tiếp tục!");

      return;
    }
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${accountId}/watchlist?session_id=${sessionId}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            media_type: mediaType,
            media_id: mediaId,
            watchlist: add,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert(
          add
            ? `${
                mediaType === "movie" ? "Phim" : "TV Show"
              } đã được thêm vào danh sách theo dõi!`
            : "Đã xóa khỏi danh sách theo dõi!"
        );
        fetchFollowlist(); // Cập nhật lại danh sách
      } else {
        console.error("Lỗi khi cập nhật Watchlist:", data.status_message);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật Watchlist:", error);
    }
  };

  useEffect(() => {
    fetchFollowlist();
  }, [mediaType]);
  // console.log(follows)

  return { follows, loading, toggleFollowlist };
}

export const useRemoveMovieFromList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeMovie = useCallback(async (listId, movieId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/list/${listId}/remove_item`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ media_id: movieId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.status_message || "Xóa phim thất bại!");
      }

      return data; // Trả về dữ liệu phản hồi nếu cần
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { removeMovie, loading, error };
};

export const useDeleteList = (sessionId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteList = async (listId) => {
    if (!listId) {
      setError("List ID không hợp lệ.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/list/${listId}?api_key=${API_KEY}&session_id=${sessionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.status_message || "Xóa danh sách thất bại.");

      return data; // Trả về kết quả nếu cần xử lý
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteList, isLoading, error };
};

export function useRateMedia(sessionId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const rateMedia = async (id, mediaType, ratingValue) => {
    if (!sessionId) {
      setError("Vui lòng đăng nhập để đánh giá!");
      return;
    }
    
    if (!["movie", "tv"].includes(mediaType)) {
      setError("Loại phương tiện không hợp lệ!");
      return;
    }
    
    if (ratingValue < 0.5 || ratingValue > 10 || ratingValue % 0.5 !== 0) {
      setError("Điểm đánh giá phải từ 0.5 đến 10 và chia hết cho 0.5!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${id}/rating?api_key=${API_KEY}&session_id=${sessionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({ value: ratingValue }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert(`Đánh giá phim thành công!`);
      } else {
        setError(data.status_message || "Đánh giá thất bại");
      }
    } catch (error) {
      setError("Có lỗi xảy ra khi gửi đánh giá!");
    } finally {
      setLoading(false);
    }
  };

  return { rateMedia, loading, error };
}