import { useTranslation } from "react-i18next";
import { LANGUAGES } from "../../languages/language";
import vnFlag from "../../assets/images/VN_flag.png";
import USFlag from "../../assets/images/US_flag.png";
import "./LanguageComponent.scss";
function LanguageComponent() {
  let { t, i18n } = useTranslation();
  const changeLanguage = (item) => {
    i18n.changeLanguage(item.code);
    localStorage.setItem("language", item.code);
  };
  return (
    <div className="language-component_container center_item">
      <div className="dropdown">
        <div
          className="dropdown_button"
          id="languageMenu"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          type="button"
          title={t("language")}
        >
          {i18n.language === "vi" ? (
            <div className="language_flag" style={{ backgroundImage: `url(${vnFlag})` }}></div>
          ) : (
            <div className="language_flag" style={{ backgroundImage: `url(${USFlag})` }}></div>
          )}
        </div>
        <ul className="dropdown-menu" aria-labelledby="languageMenu">
          {LANGUAGES.map((item, index) => {
            return (
              <li key={index} className="dropdown-item" onClick={() => changeLanguage(item)}>
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default LanguageComponent;
