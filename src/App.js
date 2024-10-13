import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import * as UserService from "./Services/UserService";
import * as NoteService from "./Services/NoteService";
import { updateMessageNote } from "./redux/NoteSlice/NoteSlice";
import { resetUser, updateUser } from "./redux/UserSlice/UserSlider";
function App() {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);

  const handleDecoded = () => {
    const access_token = user?.access_token || localStorage.getItem("access_token");
    const decoded = access_token && jwtDecode(JSON.parse(access_token));
    return { access_token, decoded };
  };

  const handleGetDetailUser = async (data) => {
    const refresh_token = JSON.parse(localStorage.getItem("refresh_token"));
    const res = await UserService.getDetailUser(data);
    dispatch(updateUser({ ...res.user, access_token: data.access_token, refresh_token: refresh_token }));
  };

  useEffect(() => {
    const { decoded, access_token } = handleDecoded();
    if (decoded?.email) handleGetDetailUser({ email: decoded.email, access_token });
  }, []);

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecoded();
      const refresh_token = JSON.parse(localStorage.getItem("refresh_token"));
      const decodedRefreshToken = jwtDecode(refresh_token);
      const currentTime = Date.now() / 1000;
      if (decoded?.exp < currentTime) {
        if (decodedRefreshToken?.exp > currentTime) {
          const data = await UserService.refreshToken({ email: decoded.email, token: refresh_token });
          config.headers["token"] = `Bearer ${data?.access_token}`;
        } else {
          dispatch(resetUser());
        }
      }
      return config;
    },
    (err) => Promise.reject(err)
  );

  // useEffect(() => getLanguage(), []);
  let { i18n } = useTranslation();
  useEffect(() => {
    let language = localStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    } else {
      i18n.changeLanguage(navigator.language.split("-")[0]);
      localStorage.setItem("language", navigator.language.split("-")[0]);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {routes &&
            routes.length > 0 &&
            routes.map((item, index) => {
              let Page = item.page;
              let isLogin = item.isLogin;
              let Layout = DefaultLayout;
              // let path = ;
              return (
                <Route
                  key={index}
                  path={isLogin ? (user && user?.email ? item.path : "") : item.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Zoom}
      />
    </div>
  );
}

export default App;
