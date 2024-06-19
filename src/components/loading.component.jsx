export default function LoadingComponent({ text }) {
  return (
    <div style={{ minHeight: "100vh" }} className="d-flex bg-body flex-column justify-content-center">
      <div className="d-flex  bg-body justify-content-center">
        <div>
          <img
            style={{
              width: "40px",
              height: "45px",
            }}
            className="d-block mb-3 mx-auto"
            src={require("../assets/logo.png")}
            alt=""
          />

          <h4 className="fade show">{text}</h4>
        </div>
      </div>
    </div>
  );
}
