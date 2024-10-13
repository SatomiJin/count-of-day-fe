import { useTranslation } from "react-i18next";
import "./ProfileComponent.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as UserService from "../../Services/UserService";
import * as utils from "../../utils";
import { updateUser } from "../../redux/UserSlice/UserSlider";
import { toast } from "react-toastify";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
function ProfileComponent() {
  let user = useSelector((state) => state.user);
  let [userInfo, setUserInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    gender: "",
    image: "",
  });
  let { t } = useTranslation();
  let dispatch = useDispatch();
  let [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    let copyState = { ...userInfo };
    copyState[e.target.name] = e.target.value;

    setUserInfo({
      ...copyState,
    });
  };

  const handleChangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      const base64 = await utils.formatImageToBase64(file);
      setUserInfo({
        ...userInfo,
        image: base64,
      });
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    let res = await UserService.updateUser(userInfo);
    if (res && res.status === "OK") {
      dispatch(updateUser({ ...res.user, access_token: user.access_token, refresh_token: user.refresh_token }));
      toast.success(t("updateSuccess"));
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast.error(t("updateError"));
    }
  };
  // effect
  useEffect(() => {
    if (user && user.email) {
      setUserInfo({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        image: user.image,
      });
    }
  }, [user]);

  return (
    <div className="profile-component_container">
      <div className="container max_height">
        <div className="row">
          <div className="form-group title_wrapper col-12">
            <div className="title">{t("profile")}</div>
          </div>
          <div className="form-group avatar_wrapper col-12">
            {userInfo && userInfo.image ? (
              <img src={userInfo && userInfo.image} alt={t("image")} />
            ) : (
              <i className="fa-solid fa-user"></i>
            )}

            <label htmlFor="image" className="btn btn-danger" type="button">
              {t("changeImage")}
            </label>

            <input
              id="image"
              type="file"
              name="image"
              // value={userInfo.image}
              hidden
              onChange={(e) => handleChangeImage(e)}
            />
          </div>

          <div className="form-group col-12">
            <label>{t("mailAddress")}</label>
            <input
              type="email"
              name="email"
              disabled
              style={{ cursor: "not-allowed" }}
              className="form-control"
              value={userInfo.email}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group col-6">
            <label>{t("firstName")}</label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              value={userInfo.firstName}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group col-6">
            <label>{t("lastName")}</label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              value={userInfo.lastName}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group col-6">
            <label>{t("phoneNumber")}</label>
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              value={userInfo.phoneNumber}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form-group col-6">
            <label>{t("gender")}</label>
            <select
              type="text"
              name="gender"
              className="form-select"
              value={userInfo.gender}
              onChange={(e) => handleChange(e)}
            >
              <option value="male">{t("male")}</option>
              <option value="female"> {t("female")}</option>
            </select>
          </div>

          <div className="form-group col-12 btn_wrapper">
            <button onClick={() => handleUpdate()} className="btn btn-outline-success" type="button">
              {isLoading === false ? t("save") : <LoadingComponent />}
              {/* <LoadingComponent /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
