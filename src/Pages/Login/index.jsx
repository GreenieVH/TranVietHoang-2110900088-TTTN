import React, { useState } from "react";
import { useTMDBAuth } from "../../Servives/Auth";
import { TEInput, TERipple } from "tw-elements-react";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/logo-gm.png";
import backgroundd from "../../assets/Images/backgroundd.jpg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Trạng thái để xác định tab hiện tại

  // Xử lý chuyển đổi giữa Login và Register
  const toggleTab = () => {
    setIsLogin(!isLogin);
  };

  const {
    error,
    requestToken,
    sessionId,
    loading: authLoading,
    fetchRequestToken,
    createSessionId,
  } = useTMDBAuth();

  const handleLogin = async () => {
    const token = await fetchRequestToken();
    if (token) {
      // Sau khi có token, chuyển hướng đến trang xác nhận
      window.open(`https://www.themoviedb.org/authenticate/${token}`, "_blank");
    }
  };

  const handleCreateSession = async () => {
    if (requestToken) {
      await createSessionId(requestToken);
    }
  };

  return (
    <>
      <section
        className="h-full w-full bg-neutral-200 dark:bg-neutral-700 max-w-screen-2xl mx-auto"
        style={{
          backgroundImage: `url(${backgroundd})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto h-full p-10">
          <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full">
              <div
                className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)", // Màu nền đen với độ mờ
                }}
              >
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* Left column container */}
                  <div className="px-4 md:px-0 lg:w-6/12">
                    <div className="md:mx-6 md:p-12">
                      {/* Logo */}
                      <div className="text-center">
                        <img className="mx-auto w-48" src={logo} alt="logo" />
                        
                      </div>

                      {/* Tab Switch */}
                      <div className="flex justify-center mb-4 gap-2">
                        <button
                          onClick={toggleTab}
                          className={`w-full px-6 py-2 text-sm font-semibold hover:border-[#245479] focus:outline-none rounded-t-lg ${
                            isLogin
                              ? "bg-[#3376AA] text-white"
                              : "bg-white text-black"
                          }`}
                        >
                          Login
                        </button>
                        <button
                          onClick={toggleTab}
                          className={`w-full px-6 py-2 text-sm font-semibold hover:border-[#245479] focus:outline-none rounded-t-lg ${
                            !isLogin
                              ? "bg-[#3376AA] text-white"
                              : "bg-white text-black"
                          }`}
                        >
                          Register
                        </button>
                      </div>

                      <form>
                        {isLogin ? (
                          <>
                            <p className="mb-4 font-semibold text-white">
                              Đăng nhập bằng tài khoản của bạn
                            </p>
                            <input
                              type="text"
                              placeholder="Username"
                              className="mb-4 w-full p-3 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-[#DB3655]"
                            />
                            <input
                              type="password"
                              placeholder="Password"
                              className="mb-4 w-full p-3 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-[#DB3655]"
                            />
                            <div className="mb-12 pb-1 pt-1 text-center">
                              <button
                                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                type="button"
                                style={{
                                  background:
                                    "linear-gradient(to right, #3376AA, #2B4E76, #001931, #000B2B)",
                                }}
                                onClick={handleLogin}
                              >
                                Log in
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="mb-4 font-semibold text-white">
                              Tạo tài khoản mới
                            </p>
                            <input
                              type="text"
                              placeholder="Full Name"
                              className="mb-4 w-full p-3 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-[#DB3655]"
                            />
                            <input
                              type="email"
                              placeholder="Email"
                              className="mb-4 w-full p-3 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-[#DB3655]"
                            />
                            <input
                              type="text"
                              placeholder="Username"
                              className="mb-4 w-full p-3 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-[#DB3655]"
                            />
                            <input
                              type="password"
                              placeholder="Password"
                              className="mb-4 w-full p-3 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-[#DB3655]"
                            />
                            <div className="mb-12 pb-1 pt-1 text-center">
                              <button
                                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                type="button"
                                style={{
                                  background:
                                    "linear-gradient(to right, #3376AA, #2B4E76, #001931, #031434)",
                                }}
                              >
                                Register
                              </button>
                            </div>
                          </>
                        )}
                      </form>

                      {/* Forgot password link */}
                      <a
                        href="#!"
                        className="text-sm font-semibold text-blue-300 hover:underline"
                      >
                        Quên mật khẩu?
                      </a>
                    </div>
                  </div>

                  {/* Right column container with background and description */}
                  <div
                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(51, 118, 170, 0.8),rgba(43, 78, 118, 0.8),rgba(0, 25, 49, 0.8),rgba(0, 11, 43, 0.8))",
                    }}
                  >
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <h2 className="mb-6 text-4xl font-semibold">
                        Đăng nhập bằng tài khoản TMDB
                      </h2>
                      <p className="text-sm mb-6">
                        Chào mừng bạn đến với trang web của chúng tôi! Đây là
                        một nền tảng giải trí trực tuyến được tích hợp API của
                        The Movie Database (TMDB), Để truy cập đầy đủ các tính
                        năng, bạn cần đăng nhập bằng tài khoản TMDB của mình.
                        Việc đăng nhập giúp chúng tôi cá nhân hóa trải nghiệm
                        của bạn, đồng thời cung cấp các thông tin và khuyến nghị
                        phù hợp với sở thích của bạn. Hãy đăng nhập ngay để bắt
                        đầu khám phá thế giới điện ảnh phong phú và hấp dẫn!
                      </p>
                      <div className="flex flex-col gap-2">
                        {authLoading ? (
                          <p>Đang xử lý...</p>
                        ) : !sessionId ? (
                          <>
                            <a
                              href={`https://www.themoviedb.org`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#FFA54F] hover:text-[#e08f43] mr-2"
                            >
                              Đăng nhập tài khoản trên Trang TMDB và
                            </a>
                            <button
                              className="text-black px-3 py-1"
                              onClick={handleLogin}
                            >
                              Gửi yêu cầu
                            </button>
                            {requestToken && (
                              <>
                                <p className="text-yellow-400 font-medium">
                                  Lưu ý xác nhận yêu cầu trước khi đăng nhập!
                                </p>
                                <button
                                  className="text-black px-3 py-1"
                                  onClick={handleCreateSession}
                                >
                                  Đăng nhập
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <div>
                            <h2 className="text-green-500 text-3xl mb-4">
                              Đã đăng nhập thành công !
                            </h2>
                            <Link to="/" className="bg-white text-black rounded-lg px-3 py-2 hover:text-green-500">
                              Trang chủ
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
