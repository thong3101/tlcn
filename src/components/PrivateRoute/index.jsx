import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { logoutSuccess } from "../../slices/authSlice";
import { useEffect, useState } from "react";
import apiAuth from "../../apis/apiAuth";
import apiMain from "../../apis/apiMain";

//Component tạo một định tuyến an toàn, khi muốn truy cập các đường dẫn cần có xác thực thì phải đi qua route này
const PrivateRoute = ({ roles }) => {
  const [auth, setAuth] = useState(null);
  let location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const verify = async () => {
      if (!user) {
        toast.warning("Bạn chưa đăng nhập", {
          autoClose: 1000,
          pauseOnHover: false,
        });
        setAuth(false);
        return <Navigate to="/" state={{ from: location }} />;
      } else {
        if (!user.refreshToken) {
          toast.warning(
            "Phiên làm việc của bạn đã hết. Vui lòng đăng nhập lại"
          );
          setAuth(false);
          dispatch(logoutSuccess());
          return;
        }
        const tokenDecode = jwt_decode(user?.refreshToken);
        console.log("1",tokenDecode);
        console.log("2",tokenDecode.roleNames.includes("SELLER"));
        let date = new Date();
        if (tokenDecode.exp < date.getTime() / 1000) {
          toast.warning(
            "Phiên làm việc của bạn đã hết. Vui lòng đăng nhập lại"
          );
          setAuth(false);
          dispatch(logoutSuccess());
          return;
        }
        const userHasRequiredRole = roles.includes(tokenDecode.roleNames[0])
        // const userHasRequiredRole = roles.includes(tokenDecode.roleNames[0])
          ? true
          : false;
        if (!userHasRequiredRole) {
          toast.warning("Bạn không có quyền truy cập", {
            autoClose: 1000,
            pauseOnHover: false,
            hideProgressBar: true,
          });
          setAuth(false);
          return;
        }

        setAuth(true);
      }
    };
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (auth === null) return <></>;
  return auth === true ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

export default PrivateRoute;
