import { Stack, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SquareLoader } from "react-spinners";

function LoadingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (searchParams.get("orderId")) {
      navigate(`/my-account/orders/detail/${searchParams.get("orderId")}`)


    }
   
  }, 
  [searchParams]);
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
        <SquareLoader className="!bg-teal-400" margin={10} size={50} />
      </div>
      <Typography align="center">Đang tải dữ liệu...</Typography>
    </Stack>
  );
}

export default LoadingPage;
