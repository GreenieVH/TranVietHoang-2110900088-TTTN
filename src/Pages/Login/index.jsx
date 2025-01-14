import React, { useState } from "react";
import { useTMDBAuth } from "../../Servives/Auth";

const Login = () => {
  const {
    requestToken,
    sessionId,
    loading: authLoading,
    fetchRequestToken,
    createSessionId,
  } = useTMDBAuth();

  const [tk, setTk] = useState("");

  const handleLogin = async () => {
    const token = await fetchRequestToken();
    if (token) {
      setTk(token);
    }
  };

  const handleCreateSession = async () => {
    if (requestToken) {
      await createSessionId(requestToken);
    }
  };

  return (
    <div>
      <h1>TMDB Login</h1>
      <p>https://www.themoviedb.org/authenticate/{tk}</p>
      {authLoading ? (
        <p>Đang xử lý...</p>
      ) : !sessionId ? (
        <>
          <button className="text-black" onClick={handleLogin}>
            Lấy Request Token
          </button>
          {requestToken && (
            <button className="text-black" onClick={handleCreateSession}>
              Tạo Session ID
            </button>
          )}
        </>
      ) : (
        <h2>Đã đăng nhập thành công</h2>
      )}
    </div>
  );
};

export default Login;
