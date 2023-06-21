import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import "./Register.scss";
import {
  Stack,
  IconButton,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import apiSeller from "../../apis/apiSeller";

function Register() {
  const onSubmit = async () => {
    apiSeller.CreateLicense().then((res) => {
      window.open(res.data.link);
    });
  };

  return (
    <Stack className="loginAdmin">
      <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:flex-shrink-0 border">
        <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
          <div className="mx-auto max-w-xs px-8">
            <p className="text-base font-semibold text-gray-600">
              Phí dịch vụ người bán
            </p>
            <p className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-gray-900">
                149.000
              </span>
              <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
                VND
              </span>
            </p>
            <Button
              type="submit"
              onClick={onSubmit}
              variant="contained"
              color="warning"
              sx={{ marginTop: "40px", backgroundColor: "rgb(79 70 229)" }}
            >
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </Stack>
  );
}

export default Register;
