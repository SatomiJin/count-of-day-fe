import "./LoadingComponent.scss";
function LoadingComponent() {
  return (
    <div className="loading-component_container">
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingComponent;
