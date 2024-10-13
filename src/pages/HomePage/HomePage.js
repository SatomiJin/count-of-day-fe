import { useTranslation } from "react-i18next";
import "./HomePage.scss";
function HomePage() {
  let { t } = useTranslation();
  return (
    <div className="home-page_container">
      <div className="container">
        <div className="row">
          <div className="welcome_wrapper col col-12">
            <div className="title">{t("appName")}</div>
            <div className="content">
              Chào bé, Một người thân quen dẫu chưa gặp. <br />
              Một ngày nào đó trong tương lai gần, chúng ta sẽ gặp nhau.
              <br />
            </div>
            <div className="poem">
              "Xuân phong thổi khởi tơ vân,
              <br /> Tương phùng vị tri, hỷ bi trùng trùng.
              <br /> Thiên lý chi ngoại, tâm tương luyến, <br />
              Thời khắc tương ngộ, lòng thanh thản."
              {/* Gió xuân khơi dậy mây lụa, Gặp nhau chưa biết, vui buồn chất chứa.
              Ngoài ngàn dặm xa xôi, lòng vẫn gắn bó, Thời khắc gặp lại, trong lòng thanh thản.*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
