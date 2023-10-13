import { Typography } from "@mui/material";

interface ErrorProps {
  error: string;
}

const Error = ({ error }: ErrorProps) => {
  return (
    <Typography
      variant="subtitle1"
      sx={{ fontStyle: "italic", color: "red" }}
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {error}
      <br />
      Please Try Again Later
    </Typography>
  );
};

export default Error;
