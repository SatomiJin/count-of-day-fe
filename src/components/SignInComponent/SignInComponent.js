import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { updateUser } from "../../redux/UserSlice/UserSlider";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as UserService from "../../Services/UserService";
import "./SignInComponent.scss";

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
  let signInMutation = useMutationHook((data) => UserService.signIn(data));
  let { data } = signInMutation;
  // function
  // let mutationSignIn = useMutation(
  //   async () => {
  //     let res = await UserService.signIn(userInfo);
  //     if (res && res.status === "OK") {
  //       localStorage.setItem("access_token", JSON.stringify(res && res.access_token));
  //       localStorage.setItem("refresh_token", JSON.stringify(res && res.refresh_token));
  //       return res.access_token; // Trả về access_token để sử dụng sau
  //     } else {
  //       throw new Error(t("signInError"));
  //     }
  //   },
  //   {
  //     onSuccess: async (access_token) => {
  //       const decoded = jwtDecode(access_token);
  //       //  call API
  //       let res = await UserService.getDetailUser({ email: decoded.email });
  //       if (res && res.status === "OK") {
  //         const storage = localStorage.getItem("refresh_token");
  //         const refresh_token = JSON.parse(storage);
  //         const access_token = JSON.parse(localStorage.getItem("access_token"));
  //         dispatch(updateUser({ ...res.user, access_token: access_token, refresh_token: refresh_token }));
  //         navigate("/");
  //         toast.success(t("signInSuccess"));
  //       }
  //     },
  //     onError: (e) => {
  //       console.log("Error:", e);
  //       toast.error(t("signInError"));
  //     },
  //   }
  // );
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
    await signInMutation.mutate(userInfo);
  };

  useEffect(() => {
    if (data && data.status === "OK") {
      if (data && data.access_token) {
        localStorage.setItem("access_token", JSON.stringify(data && data.access_token));
        localStorage.setItem("refresh_token", JSON.stringify(data && data.refresh_token));
        const decoded = data && jwtDecode(data.access_token);
        handleGetDetailUser(decoded.email);
      } else {
        toast.success(t("signInError"));
      }
    }
  }, [data]);

  useEffect(() => {
    if (user && user.firstName) {
      if (user && user.firstName) {
        setIsLoading(false);
        navigate("/");
        toast.success(t("signInSuccess"));
      }
    }
  }, [user]);
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
