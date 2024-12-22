import { useState, useEffect } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
};

export function useGetPopular() {
  const [dataPopular, setDataPopular] = useState();
  const url = "https://api.themoviedb.org/3/movie/popular?language=vi&page=1";
  const fetchPopular = async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDataPopular(data.results);
    } catch (error) {
        console.log(error);
    }
};

  useEffect(() => {
    fetchPopular();
  }, []);
  console.log("State Data:", dataPopular);
  return { dataPopular };
}
