import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorInput, ErrorAfterSubmit } from "../ErrorHelper";
import { loginSuccess } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import apiAuth from "../../apis/apiAuth";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Email from "@mui/icons-material/Email";

import {
  Stack,
  IconButton,
  Button,
  Box,
  TextField,
  OutlinedInput,
  FilledInput,
  Input,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import Loading from "../Loading";
import { toast } from "react-toastify";
import { getAnalytics, logEvent } from "firebase/analytics";
import AccountCircle from "@mui/icons-material/AccountCircle";

function Login(props) {
  const dispatch = useDispatch();
  // const client_url = "https://tiki-web.vercel.app/"
  const client_url = "http://localhost:3000/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShowPass, setIsShowPass] = React.useState(false);

  const [isNoAccount, setIsNoAccount] = useState(false);

  const [wrongPass, setWrongPass] = useState(false);

  const [loading, setLoading] = useState(false);

  const analytics = getAnalytics();

  const onSubmit = (data) => {
    if (loading) {
      toast.warning(
        "Thao tác đang thực hiện. Vui lòng không thao tác quá nhanh"
      );
      return;
    }
    setLoading(true);
    let params = {
      email: data.email,
      password: data.pass,
    };

    apiAuth
      .postLogin(params)
      .then((res) => {
        let { accessToken, refreshToken, user } = res.data;
        dispatch(loginSuccess({ accessToken, refreshToken, ...user }));
        toast.success(`Đăng nhập thành công`);
        props.closeModalLogin();
        logEvent(analytics, "user", {
          userId: res.data.user.id,
          userName: res.data.user.nickName,
        });
      })
      .catch((error) => {
        console.log(error.response.data.message);
        if (error.response.data.message === "No account found") {
          setIsNoAccount(true);
          setWrongPass(false);
        } else
        if(error.response.data.message.includes("suspended")){
          toast.warning("Tài khoản của bạn đã bị tạm khóa");
        } 
        else {
          setIsNoAccount(false);
          setWrongPass(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Stack direction="row">
      <Stack direction="column" sx={{ flex: 5 }} spacing={2}>
        <h4 style={{ fontSize: "24px", textAlign: "center" }}>Đăng nhập</h4>

        <form>
          <Stack spacing={2}>
            <FormControl fullWidth className="!bg-white">
              <InputLabel htmlFor="email-outlined-input">Email</InputLabel>
              <OutlinedInput
                className="!rounded-xl"
                focused
                {...register("email", {
                  required: "Hãy nhập email",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email không hợp lệ",
                  },
                })}
                id="email-outlined-input"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                label="Email"
              />
              {errors.email && (
                <ErrorInput
                  message={errors.email.message}
                  className="!text-red-500"
                />
              )}
            </FormControl>

            <FormControl fullWidth>
              <InputLabel htmlFor="pass-outlined-input">Mật khẩu</InputLabel>

              <OutlinedInput
                className="!rounded-xl"
                {...register("pass", {
                  required: "Hãy nhập mật khẩu",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                })}
                id="pass-outlined-input"
                type={isShowPass ? "text" : "password"}
                label="Mật khẩu"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsShowPass(!isShowPass)}
                      edge="end"
                    >
                      {isShowPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(onSubmit)();
                  }
                }}
              />
              {errors.pass && <ErrorInput message={errors.pass.message} />}
            </FormControl>

            {isNoAccount && (
              <ErrorAfterSubmit message="Email chưa được đăng ký" />
            )}

            {wrongPass && (
              <ErrorAfterSubmit message="Mật khẩu không chính xác" />
            )}

            <Button
              className="!mt-10"
              variant="contained"
              color="error"
              onClick={handleSubmit(onSubmit)}
            >
              {loading && <Loading color="#fff" />}
              Đăng nhập
            </Button>
          </Stack>
        </form>

        <Stack alignItems="center">
          <span
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={props.handleOpenForgetPwd}
          >
            {" "}
            Quên mật khẩu
          </span>
        </Stack>
        <p style={{ textAlign: "center" }}>
          Nếu bạn chưa có tài khoản?
          <span
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={props.handleOpenSignup}
          >
            {" "}
            Đăng ký
          </span>
        </p>
        {/* <p style={{ textAlign: "center", marginTop: "1rem" }}>Tiếp tục bằng</p> */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <a
            href={`https://nhom3-tiki.herokuapp.com/oauth2/authorization/facebook?redirect_uri=${client_url}oauth2/redirect`}
            className="hre"
          >
            <FacebookRoundedIcon
              sx={{
                cursor: "pointer",
                color: "#4267b2",
                fontSize: "3rem",
              }}
            />
          </a>

          <a
            href={`https://senki.me/oauth2/authorize/google?redirect_uri=${client_url}oauth2/redirect`}
            className="hre"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              style={{ fill: "#000000" }}
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
          </a>
        </Stack>
      </Stack>

      <span style={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={props.closeModalLogin}>
          <CloseIcon />
        </IconButton>
      </span>
    </Stack>
  );
}

export default Login;
