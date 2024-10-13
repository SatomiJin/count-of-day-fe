import { useTranslation } from "react-i18next";
import "./HeaderComponent.scss";
import LanguageComponent from "../LanguageComponent/LanguageComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import * as utils from "../../utils";
import { resetMessageNote } from "../../redux/NoteSlice/NoteSlice";
import { resetUser } from "../../redux/UserSlice/UserSlider";
function HeaderComponent() {
  let { t, i18n } = useTranslation();
  let [isLoading, setIsLoading] = useState(false);
  let [userInfo, setUserInfo] = useState({});
  let navigate = useNavigate();
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  const handleLogOut = () => {
    utils.logout();
    dispatch(resetUser());
    dispatch(resetMessageNote());
    // setUserInfo({});
    navigate("/");
  };

  useEffect(() => {
    setIsLoading(true);
    if (user) {
      setUserInfo({ ...user });
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <div className="header-component_container">
      <div className="container">
        <div className="pc-header row">
          <div className="app_name col col-4 center_item">{t("appName")}</div>
          <div className="app_options col col-5">
            <div className="options_menu-item center_item" onClick={() => navigate("/count-days")}>
              {t("countDay")}
            </div>
            <div className="options_menu-item center_item" onClick={() => navigate("/notes")}>
              {t("note")}
            </div>
          </div>
          <div className="app_user-option col col-3">
            <div className="user-option_item language center_item">
              <LanguageComponent />
            </div>
            <div className="user-option_item user btn center_item">
              {isLoading === false ? (
                userInfo && userInfo?.email ? (
                  <div className="dropdown">
                    <div type="button" id="dropdownMenuUser" data-bs-toggle="dropdown" aria-expanded="false">
                      <div title={`${userInfo.firstName} ${userInfo.lastName}`} className="username">
                        {userInfo && userInfo.email !== "" && userInfo.image === "" ? (
                          <i className="fa-solid fa-user"></i>
                        ) : (
                          <img alt="avatar" src={userInfo && userInfo.image} />
                        )}
                        <div
                          style={{ width: "100px", overflow: "hidden", textOverflow: "ellipsis", textWrap: "nowrap" }}
                        >{`${userInfo.firstName} ${userInfo.lastName}`}</div>
                      </div>
                    </div>

                    <ul className="dropdown-menu dropdown-menu_bg" aria-labelledby="dropdownMenuUser">
                      <li className="dropdown-item" onClick={() => navigate("/profile")}>
                        {t("profile")}
                      </li>
                      <li onClick={() => handleLogOut()} className="dropdown-item">
                        {t("logout")}
                      </li>
                    </ul>
                  </div>
                ) : (
                  <i
                    title={t("signIn")}
                    onClick={() => navigate("/sign-in")}
                    className="fa-solid fa-right-to-bracket"
                  ></i>
                )
              ) : (
                <LoadingComponent />
              )}
            </div>
          </div>
        </div>
        <div className="mobile-header">
          <div className="row">
            <div className="mobile-header_menu">
              <div className="dropdown">
                <i
                  title={t("menu")}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className="bx bx-menu-alt-left mobile_menu"
                ></i>

                <ul className="dropdown-menu" aria-labelledby="mobile_menu">
                  <li className="dropdown-item" onClick={() => navigate("/count-days")}>
                    {t("countDay")}
                  </li>
                  <li
                    className="dropdown-item"
                    onClick={() => {
                      if (userInfo && userInfo?.email) {
                        navigate("/notes");
                      } else {
                        navigate("/sign-in");
                      }
                    }}
                  >
                    {t("note")}
                  </li>
                  {userInfo && userInfo?.email && (
                    <>
                      {" "}
                      s
                      <li className="dropdown-item" onClick={() => navigate("/profile")}>
                        {t("profile")}
                      </li>
                      <li className="dropdown-item" onClick={() => navigate("/profile")}>
                        {t("logout")}
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className="mobile-header_name center_item">{t("appName")}</div>
            <div className="mobile-header_language">
              <LanguageComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
