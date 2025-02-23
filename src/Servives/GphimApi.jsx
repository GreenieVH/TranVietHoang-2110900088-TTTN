import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchGmovie = () => {
  const [gmovie, setGmovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang

  useEffect(() => {
    const fetchGmovie = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${page}`
        );
        setGmovie(data.items || []);
        setTotalPages(data?.pagination?.totalPages || 1);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGmovie();
  }, [page]);

  // Hàm chuyển trang
  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  return { gmovie, loading, error, page, totalPages, nextPage, prevPage };
};

export const useFetchCategory = () => {
  const [cate, setCate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fectchCategory = async () => {
      setLoading(true);
      try {
        const data = await axios.get(" https://phimapi.com/the-loai");
        setCate(data.data || null);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCate(null);
      } finally {
        setLoading(false);
      }
    };

    fectchCategory();
  }, []);
  // console.log(cate)
  return { cate, loading, error };
};

export const useFetchGmovieDetails = (slug) => {
  const [gmovie, setGmovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`https://phimapi.com/phim/${slug}`);
        setGmovie(data || null);
        setError(null);
      } catch (err) {
        setError(err.message);
        setGmovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [slug]);
  //   console.log(gmovie);
  return { gmovie, loading, error };
};

export const useMovieByCategory = (defaultParams = {}) => {
  const [params, setParams] = useState({
    type_list: defaultParams.type_list || "hanh-dong",
    page: 1 ,
    sort_field: "modified.time",
    sort_type: "desc",
    sort_lang: "",
    country: "",
    year: "",
    limit: 16,
    ...defaultParams,
  });
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://phimapi.com/v1/api/the-loai/${params.type_list}`,
        { params }
      );
      setMovies(response?.data?.data || []);
      setTotalPages(response?.data?.data?.params?.pagination?.totalPages);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu");
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [params,params.type_list]);

  // Chuyển đến trang tiếp theo
  const nextPage = () => {
    if (params.page < totalPages) {
      setParams((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  // Chuyển đến trang trước
  const prevPage = () => {
    if (params.page > 1) {
      setParams((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };
  // console.log(movies)
  // console.log(params);
  return {
    movies,
    loading,
    error,
    setParams,
    nextPage,
    prevPage,
    params,
    totalPages,
  };
};

export const useMovieList = (defaultParams = {}) => {
  const [params, setParams] = useState({
    type_list: "phim-bo",
    page: 1,
    sort_field: "_id",
    sort_type: "asc",
    sort_lang: "",
    category: "",
    country: "",
    year: "",
    limit: 10,
    ...defaultParams, // Truyền giá trị mặc định nếu có
  });

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);

    const queryString = new URLSearchParams(params).toString();
    const url = `https://phimapi.com/v1/api/danh-sach/${params.type_list}?${queryString}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.items || []);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu");
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [params]);

  return { movies, loading, error, setParams };
};
