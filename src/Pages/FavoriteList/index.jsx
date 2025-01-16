import React from "react";
import { useAccountDetails, useFavoriteList } from "../../Servives/Auth";
import { TailSpin } from "react-loader-spinner";

function FavoriteList() {
  const sessionId = localStorage.getItem("sessionId");
  const { accountDetails, loading: loadingAccount } =
    useAccountDetails(sessionId);

  const { favorites, loading, error } = useFavoriteList(
    accountDetails?.id,
    sessionId,
    "movies"
  );

  if (loading || loadingAccount)
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin height="80" width="80" color="#4A90E2" />
      </div>
    );
    
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Favorite Movies</h1>
      <ul>
        {favorites.map((item) => (
          <li key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
              style={{ width: "100px", height: "150px" }}
            />
            <p>{item.title || item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteList;
