import React, { createContext, useState } from "react";

export const AuthContextAPI = createContext();

function AuthContext({ children }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchLists = async ({accountId,sessionId}) => {
    // console.log(accountId,sessionId)
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/account/${accountId}/lists?session_id=${sessionId}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
    //   console.log("danh sach:", data);
    return data ;

    //   setLists(data.results || []);
    } catch (error) {
      console.error("Lỗi lấy danh sách phim:", error);
    }
    // setLoading(false);
  };

  return <AuthContextAPI.Provider value={{fetchLists}}>{children}</AuthContextAPI.Provider>;
}

export default AuthContext;
