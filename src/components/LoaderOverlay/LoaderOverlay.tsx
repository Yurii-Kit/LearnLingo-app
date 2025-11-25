import { ClipLoader } from "react-spinners";

const LoaderOverlay = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(3px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        gap: "16px",
      }}
    >
      <ClipLoader
        size={150}
        aria-label="Loading Spinner"
        color="#f4c550"
        speedMultiplier={0.8}
      />

      <strong>Loading, please wait...</strong>
    </div>
  );
};

export default LoaderOverlay;
