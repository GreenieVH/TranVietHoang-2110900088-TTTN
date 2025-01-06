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
  console.log("dataPopular:", dataPopular);
  return { dataPopular };
}

export function useGetTrending() {
  const [dataTrending, setDataTrending] = useState([]);
  const url = "https://api.themoviedb.org/3/trending/movie/week?language=vi&page=1";

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
  console.log("dataTrending:", dataTrending);
  return { dataTrending };
}