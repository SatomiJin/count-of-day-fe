import HeaderComponent from "../components/HeaderComponent/HeaderComponent";

function DefaultLayout({ children }) {
  return (
    <div className="default-layout_container" style={{ paddingBottom: "1rem" }}>
      <HeaderComponent />

      {children}
    </div>
  );
}

export default DefaultLayout;
