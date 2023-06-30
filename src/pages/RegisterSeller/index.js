import React from "react";

import {
  Button,
  Stack
} from "@mui/material";
import apiSeller from "../../apis/apiSeller";
import "./Register.scss";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { AttachMoney } from "@mui/icons-material";

function Register() {
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async () => {
    setLoading(true);
    apiSeller.CreateLicense().then((res) => {
      window.open(res.data.link);
    }).catch((err) => {
      toast.error('Bạn cần là seller hoặc user để đăng ký dịch vụ này');
    }).finally(() => {
      setLoading(false);
    })
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
              startIcon={loading && <Loading />}
              endIcon={<AttachMoney />}
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
