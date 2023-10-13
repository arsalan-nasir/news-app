import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    </>
  );
};

export default Loading;
