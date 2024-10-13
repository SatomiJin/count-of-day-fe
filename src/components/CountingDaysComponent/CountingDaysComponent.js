import { useTranslation } from "react-i18next";
import "./CountingDaysComponent.scss";
import { useEffect, useState } from "react";
import * as CountService from "../../Services/CountService";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function CountingDaysComponent() {
  let { t } = useTranslation();
  let [countDayInfo, setCountDayInfo] = useState({});
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let user = useSelector((state) => state.user);
  const handleGetDay = async () => {
    setIsLoading(true);
    let res = await CountService.getDay(user);
    if (res && res.status === "OK") {
      setIsLoading(false);
      setCountDayInfo({ ...res.count });
    } else {
      setIsLoading(false);
    }
  };
  const plusDay = async (data) => {
    if (user && user.email) {
      setIsLoading(true);
      let res = await CountService.plusCount(user);
      if (res && res.status === "OK") {
        toast.success(t("plusDaySuccess"));
        setIsLoading(false);

        handleGetDay();
      } else {
        setIsLoading(false);
        toast.error(t("plusDayError"));
      }
    } else {
      navigate("/sign-in");
    }
  };
  useEffect(() => {
    handleGetDay();
  }, []);
  return (
    <div className="counting-day_container max_height">
      <div className="container center_item">
        <div className="row">
          <div className="count-of-days">
            <div className="title">
              <i className="fa-solid fa-calendar-days"></i> {t("countOfDays")}
            </div>
            <div className="value">
              {isLoading ? (
                <LoadingComponent />
              ) : (
                <div>
                  {countDayInfo && countDayInfo?.countOfDay} {t("day")}
                </div>
              )}
            </div>
          </div>
          <div className="button_wrapper">
            <button onClick={() => plusDay()} type="button" className="btn btn_item">
              {isLoading ? <LoadingComponent /> : t("oneMoreDay")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountingDaysComponent;
