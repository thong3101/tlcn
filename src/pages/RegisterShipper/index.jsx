import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./Register.scss";
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
import { ErrorAfterSubmit, ErrorInput } from "../../components/ErrorHelper";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import apiShipper from "../../apis/apiShipper";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/shipper");
    }
  }, [user]);

  const [showPass, setShowPass] = React.useState(false);
  const [showPassConf, setShowPassConf] = React.useState(false);
  const [message, setMessage] = React.useState();
  const [isDiffPass, setIsDiffPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleReset = () => {
    setMessage();
    setIsDiffPass(false);
  };

  const handleCheckPass = () => {
    if (watch("pass") !== watch("passConf")) {
      setIsDiffPass(true);
    } else {
      setIsDiffPass(false);
      return true;
    }
  };

  const onSubmit = async () => {
    if (loading) {
      toast.warning(
        "Thao tác đang thực hiện. Vui lòng không thao tác quá nhanh"
      );
      return;
    }
    setLoading(true);
    if (handleCheckPass()) {
      if (isDiffPass === false) {
        let param = {
          password: watch("pass"),
          email: watch("email"),
        };

        apiShipper
          .postRegister(param)
          .then(async (res) => {
            setIsSuccess(true);
            console.log("a", res);

            //create empty noti on firestore
            await setDoc(doc(db, "noti", res.data.data.id), { noti: [] });
          })
          .catch((res) => {})
          .finally(() => setLoading(false));
      }
    }
  };

  return (
    <Stack className="loginAdmin">
      <Stack className="loginAdmin__wrap" spacing={4}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <AccountCircleIcon sx={{ fontSize: "45px" }} />
          <Typography conponent="h4" fontSize="24px">
            {" "}
            ĐĂNG KÝ{" "}
          </Typography>
        </Stack>
        <FormControl fullWidth>
          <InputLabel htmlFor="email-outlined-input">Email</InputLabel>
          <OutlinedInput
            {...register("email", {
              required: "Hãy nhập email",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email không hợp lệ",
              },
            })}
            className="!rounded-xl"
            label="Email"
            variant="standard"
            sx={{ flex: 1 }}
            onClick={handleReset}
          />

          {errors.email && <ErrorInput message={errors.email.message} />}
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            Nhập mật khẩu
          </InputLabel>
          <OutlinedInput
            className="!rounded-xl"
            {...register("pass", {
              required: "Hãy nhập mật khẩu",
              minLength: {
                value: 8,
                message: "Mật khẩu phải có ít nhất 8 ký tự",
              },
            })}
            variant="standard"
            id="outlined-adornment-password"
            label="Nhập mật khẩu"
            type={showPass ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPass(!showPass)} edge="end">
                  {showPass ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            onClick={handleReset}
          />

          {errors.pass && <ErrorInput message={errors.pass.message} />}
        </FormControl>

        <FormControl fullWidth>
          <InputLabel htmlFor="outlined2-adornment-password">
            Nhập lại mật khẩu
          </InputLabel>
          <OutlinedInput
            className="!rounded-xl"
            {...register("passConf", {
              required: "Hãy nhập lại mật khẩu",
              minLength: {
                value: 8,
                message: "Mật khẩu phải có ít nhất 8 ký tự",
              },
            })}
            label="Nhập lại mật khẩu"
            id="outlined2-adornment-password"
            type={showPassConf ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassConf(!showPassConf)}
                  edge="end"
                >
                  {showPassConf ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            onClick={handleReset}
          />

          {errors.passConf && <ErrorInput message={errors.passConf.message} />}
        </FormControl>

        <Stack sx={{ marginTop: "5rem" }}>
          {message && <ErrorAfterSubmit message={message} />}
          {isDiffPass ? (
            <ErrorAfterSubmit message="Nhập mật khẩu trùng nhau" />
          ) : null}
        </Stack>

        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="warning"
        >
          Đăng ký
        </Button>

        {isSuccess && (
          <Typography fontSize="14px">
            Đăng kí thành công ? Tiếp tục đăng nhập tại{" "}
            <a
              href="/shipper/login"
              style={{ color: "#1890ff", fontSize: "14px" }}
            >
              đây!
            </a>
          </Typography>
        )}

        <Typography fontSize="14px">
          Đã có tài khoản ? Đăng nhập tại{" "}
          <a
            href="/shipper/login"
            style={{ color: "#1890ff", fontSize: "14px" }}
          >
            đây!
          </a>
        </Typography>
      </Stack>
    </Stack>
  );
}

export default Register;
