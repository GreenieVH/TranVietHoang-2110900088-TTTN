import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchGmovie = () => {
  const [gmovie, setGmovie] = useState([]);
  const [loading, setLoading] = useState(true);
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

export const useFetchGmovieDetails = (slug) => {
  const [gmovie, setGmovie] = useState(null);
  const [loading, setLoading] = useState(true);
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
