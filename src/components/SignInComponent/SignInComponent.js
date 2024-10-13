import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import * as UserService from "../../Services/UserService";
import "./SignInComponent.scss";
import { updateUser } from "../../redux/UserSlice/UserSlider";
import { useNavigate } from "react-router-dom";

function SignInComponent() {
  let [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  let { t } = useTranslation();

  const handleOnchange = (e) => {
    let copyState = { ...userInfo };
    copyState[e.target.name] = e.target.value;
    setUserInfo({ ...copyState });
  };
  const handleGetDetailUser = async (data) => {
    const storage = localStorage.getItem("refresh_token");
    const refresh_token = JSON.parse(storage);
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    let res = await UserService.getDetailUser({ email: data });
    dispatch(updateUser({ ...res.user, access_token: access_token, refresh_token: refresh_token }));
  };
  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let res = await UserService.signIn(userInfo);
    if (res && res.status === "OK") {
      localStorage.setItem("access_token", JSON.stringify(res && res.access_token));
      localStorage.setItem("refresh_token", JSON.stringify(res && res.refresh_token));
      if (res && res.access_token) {
        const decoded = res && jwtDecode(res.access_token);
        handleGetDetailUser(decoded.email);
        setIsLoading(false);
        navigate("/");
        toast.success(t("signInSuccess"));
      }
    } else {
      toast.error(t("signInError"));
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (user && user.email) {
  //   }
  // }, [user]);
  return (
    <div className="sign-in_container max_height">
      <form className="sign-in_form" onSubmit={handleSignIn}>
        <div className="container">
          <div className="row">
            <div className="form-group col-12 title">{t("signIn")}</div>
            <div className="form-group col-12">
              <label htmlFor="email">{t("mailAddress")}:</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={userInfo.email}
                onChange={(e) => handleOnchange(e)}
                placeholder={`${t("mailAddress")}...`}
                required
              />
            </div>
            <div className="form-group col col-12">
              <label htmlFor="password">Password:</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={userInfo.password}
                onChange={(e) => handleOnchange(e)}
                placeholder={`${t("password")}...`}
                required
              />
            </div>
            <div className="btn_wrapper col-12">
              <button type="submit" className="btn btn_sign-in">
                {isLoading ? <LoadingComponent /> : t("signIn")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignInComponent;
