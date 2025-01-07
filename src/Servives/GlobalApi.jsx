import { useState, useEffect } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
};

export function useGetPopular() {
  const [dataPopular, setDataPopular] = useState([]);
  const url = "https://api.themoviedb.org/3/movie/popular?language=vi&page=1";

  const fetchPopular = async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDataPopular(data.results || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPopular();
  }, []);
  // console.log("dataPopular:", dataPopular);
  return { dataPopular };
}

export function useGetTrending() {
  const [dataTrending, setDataTrending] = useState([]);
  const url =
    "https://api.themoviedb.org/3/trending/movie/week?language=vi&page=1";

  const fetchTrending = async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDataTrending(data.results || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);
  // console.log("dataTrending:", dataTrending);
  return { dataTrending };
}

export function useGenres() {
  const [genres, setGenres] = useState([]);

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=vi",
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch genres");
      }
      const data = await response.json();
      setGenres(data.genres || []); // Lưu danh sách genres
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return { genres };
}

export function useMoviesByGenre(genreId) {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=vi&page=1`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    if (genreId) fetchMovies();
  }, [genreId]);
  // console.log("dataMovie:", movies);

  return { movies };
}

export function useMovieDetail(movieId) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieDetail = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?language=vi-VN`,
        options
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) fetchMovieDetail();
  }, [movieId]);
  // console.log("data movie detail:", movie);
  return { movie, loading };
}

export function useMovieTrailer(movieId) {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      );

      if (!response.ok) throw new Error("Failed to fetch movie trailer");

      const data = await response.json();
      // console.log("Movie Trailer API Response:", data);

      const trailer = data.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      // console.log("Trailer Key Found:", trailer?.key);

      setTrailerKey(trailer ? trailer.key : null);
    } catch (error) {
      console.error("Error fetching movie trailer:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) fetchMovieTrailer();
  }, [movieId]);

  return { trailerKey, loading };
}

