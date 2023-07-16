import { Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SquareLoader } from "react-spinners";
import { toast } from "react-toastify";
import apiAuth from "../../apis/apiAuth";
import { loginSuccess } from "../../slices/authSlice";

function LoadingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location=useLocation();
  const callApiGetById = useCallback(async () => {
    await apiAuth.getUserById(searchParams.get("userId")).then(res => {
      let { accessToken, refreshToken, user } = res.data;
      dispatch(loginSuccess({ accessToken, refreshToken, ...user }));
      toast.success("Đăng ký người bán thành công !");
    })
    navigate("/seller");
  }, [dispatch, searchParams]);


  useEffect(() => {
    if(location.pathname.includes("paypal")){
      toast("Thanh toán thành công !")
      if (searchParams.get("userId")) {
        callApiGetById();
      }
      navigate("/home");
     
    }
    else
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
