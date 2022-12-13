import { Stack, Typography } from "@mui/material";
import React from "react";
import { SyncLoader } from "react-spinners";

function LoadingPage() {
  return (
    <Stack
      sx={{ position: "relative" }}
      width="100%"
      minWidth="500px"
      height="100%"
      minHeight="200px"
      justifyContent="center"
      alignItems="center"
    >
      <div className="sweet-loading">
        <SyncLoader color="#252121" margin={10} size={50} />
      </div>
      <Typography align="center">Đang tải dữ liệu...</Typography>
    </Stack>
  );
}

export default LoadingPage;
