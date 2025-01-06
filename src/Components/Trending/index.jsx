import React from "react";
import { useGetTrending } from "../../Servives/GlobalApi";
import TrendingItem from "./TrendingItem";

function Trending() {
  const { dataTrending } = useGetTrending();

  return (
    <div>
      <h3 className="text-[1.5rem] font-bold my-2">Trending</h3>
      <div className="flex gap-5">
          {!dataTrending ? (
            <div>Loading...</div>
          ) : (
            dataTrending
              .slice(0, 4)
              .map((item, index) => (
                <TrendingItem
                  key={index}
                  title={item.title}
                  backdrop_path={item.poster_path}
                />
              ))
          )}
      </div>
    </div>
  );
}

export default Trending;
