import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import {
  Stack,
  IconButton,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import CloseIcon from "@mui/icons-material/Close";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { ErrorInput, ErrorAfterSubmit } from "../../components/ErrorHelper";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { useSelector } from "react-redux";
import apiShipper from "../../apis/apiShipper";

function Login() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/shipper/");
    }
  }, [user]);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShowPass, setIsShowPass] = React.useState(false);

  const [isNoAccount, setIsNoAccount] = useState(false);

  const [wrongPass, setWrongPass] = useState(false);

  const [loading, setLoading] = useState(false);

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

    apiShipper
      .postLogin(params)
      .then((res) => {
        let { accessToken, refreshToken, user } = res.data;
        dispatch(loginSuccess({ accessToken, refreshToken, ...user }));
        toast.success(`Đăng nhập thành công`);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        if (error.response.data.message === "No account found") {
          setIsNoAccount(true);
          setWrongPass(false);
        } else {
          setIsNoAccount(false);
          setWrongPass(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Stack className="loginAdmin">
      <Stack className="loginAdmin__wrap" spacing={4}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <AccountCircleIcon sx={{ fontSize: "45px" }} />
          <Typography conponent="h4" fontSize="24px">
            {" "}
            ĐĂNG NHẬP{" "}
          </Typography>
        </Stack>
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
          />
          {errors.pass && <ErrorInput message={errors.pass.message} />}
        </FormControl>

        {isNoAccount && <ErrorAfterSubmit message="Email chưa được đăng ký" />}

        {wrongPass && (
          <ErrorAfterSubmit message="Mật khẩu đăng nhập không chính xác" />
        )}
        <Typography fontSize="14px">
          Bạn chưa có tài khoản ? Đăng ký tại đây{" "}
          <a
            href="/shipper/register"
            style={{ color: "#1890ff", fontSize: "14px" }}
          >
            đây!
          </a>
        </Typography>
        <Button
          className="!mt-10"
          variant="contained"
          color="warning"
          onClick={handleSubmit(onSubmit)}
        >
          {loading && <Loading color="#fff" />}
          Đăng nhập
        </Button>
      </Stack>
    </Stack>
  );
}

export default Login;
