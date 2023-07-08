import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";

import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Modal,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logoutSuccess } from "../../slices/authSlice";

import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import jwt_decode from "jwt-decode";
import apiCategory from "../../apis/apiCategory";
import ForgetPassword from "../ForgetPassword";
import Login from "../Login";
import SignUp from "../SignUp";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { doc, onSnapshot } from "firebase/firestore";
import moment from "moment";

import { db } from "../../firebase";
import { formatJavaLocalDate, formatJavaLocalDateTime } from "../../constraints/Util";

const privatePath = ["/my-account/", "/admin/", "/payment", "/chat"];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [modalLogin, setModalLogin] = useState(false);
  const openModalLogin = () => setModalLogin(true);

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgetPwd, setIsForgetPwd] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [categories, setCategories] = useState([]);

  const cart = useSelector((state) => state.cart.items); // get cart from store
  const user = useSelector((state) => state.auth.user); //get user from store

  const handleLogout = () => {

    dispatch(logoutSuccess());
    const isPrivate =
      privatePath.findIndex((e) => location.pathname.includes(e)) >= 0
        ? true
        : false;
    if (isPrivate) {
      navigate("/");
    }
    setNotifications([]);
  };

  const [openNotify, setOpenNotify] = React.useState(false);

  const [notifications, setNotifications] = useState([]);
  const tokenDecode = user? jwt_decode(user?.accessToken) : null; 

  useEffect(() => {
    if (user) {
      const unSub = onSnapshot(doc(db, "noti", user.id), (doc) => {
        doc.exists() && setNotifications(doc.data().noti.sort((a, b) => b.date - a.date));

        console.log("noti", doc.data().noti);
      });

      return () => {
        unSub();
      };
    }
  }, [user]);

  

  const CloseNotify = () => {
    setOpenNotify(false);
  };

  const formNotify = () => {
    return (
      <Box sx={{ zIndex: "10", width: "400px", mt: "5rem" }}>
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Stack sx={{ padding: "12px" }}>
              <Typography sx={{ fontSize: "16px", fontWeight: "600" }}>
                Thông báo
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  size="medium"
                  sx={{ fontWeight: "400" }}
                  startIcon={<FormatListBulletedIcon fontSize="small" />}
                >
                  Tất cả
                </Button>
                <Divider
                  orientation="vertical"
                  sx={{
                    height: "0.9rem",
                    marginRight: "6px",
                    marginLeft: "6px",
                  }}
                />
                <Button
                  size="medium"
                  sx={{ fontWeight: "400" }}
                  startIcon={<CheckCircleOutlineIcon fontSize="small" />}
                >
                  Chưa đọc
                </Button>
              </Stack>
            </Stack>
            <IconButton onClick={CloseNotify}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Divider light />
          <Stack sx={{ padding: "12px" }}>
            {notifications?.map((item) => (
              <Stack key={item.id}>
                <Stack direction="row" spacing={2} sx={{ padding: "12px" }}>
                  <Stack width="56px" height="56px">
                    <img
                      style={{
                        borderRadius: "8px",
                        backgroundColor: "black",
                        height: "100%",
                      }}
                      src="https://res.cloudinary.com/dddmdgm0w/image/upload/v1670075080/senki_avatar/senki_avatar/senki-high-resolution-logo-white-on-transparent-background_ouktxc.png"
                    />
                  </Stack>
                  <Stack sx={{ overflow: "auto" }}>
                    <Stack>
                      <div>
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          {item.title}
                        </Typography>
                        <Typography sx={{ fontSize: "14px" }}>
                          {item.text}
                        </Typography>
                      </div>
                    </Stack>
                    {item.date && (
                      <Typography sx={{ fontSize: "12px" }}>
                        {moment(item.date?.toDate()).fromNow()}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
                <Divider light />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>
    );
  };

  const onChangeSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmitSearch = () => {
    navigate(`/search/${searchText}`);
    setSearchText("");
  };

  const closeModalLogin = () => {
    setModalLogin(false);
    setIsLoginForm(true);
    setIsRegister(false);
    setIsForgetPwd(false);
  };

  const handleReturnLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsForgetPwd(false);
    setIsRegister(false);
  }, []);

  const handleOpenSignup = useCallback(() => {
    setIsRegister(true);
    setIsForgetPwd(false);
    setIsLoginForm(false);
  }, []);

  const handleOpenLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsRegister(false);
    setIsForgetPwd(false);
  }, []);

  const closeModalForgetPWD = () => {
    setIsForgetPwd(false);
    setModalLogin(false);
    setIsLoginForm(true);
    setIsRegister(false);
  };

  const handleOpenForgetPwd = useCallback(() => {
    setIsForgetPwd(true);
    setIsRegister(false);
    setIsLoginForm(false);
  }, []);
  const today=new Date();
  const isExpire=moment(formatJavaLocalDate(user?.sellExpireDate)).isAfter(today);

  useEffect(() => {
    const getData = async () => {
      apiCategory
        .showAllCategoryHeader()
        .then((res) => {
          console.log("a", res.data.category);
          setCategories(res.data.category);
        })
        .catch((error) => {
          setCategories([]);
        });
    };
    getData();
  }, []);

  return (
    <header id="header" className="header">
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        sx={{
          height: "100%",
          width: "100%",
          maxWidth: "1170px",
          margin: "0 175px",
        }}
      >
        {/* logo */}
        <Link className="header__logo" to={"/"}>
          <img
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src="https://res.cloudinary.com/dddmdgm0w/image/upload/v1670075080/senki_avatar/senki_avatar/senki-high-resolution-logo-white-on-transparent-background_ouktxc.png"
          />
        </Link>

        {/* Left Element */}

        <Box sx={{ flex: 1, maxWidth: "760px" }} className="header__search">
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              padding: "0",
              height: "40px",
              flex: 1,
              position: "relative",
            }}
          >
            <InputBase
              style={{
                height: "100%",
                flex: 1,
                border: "1px solid #f4ba36",
                backgroundColor: "#38383b",
                paddingLeft: "10px",
                color: "white",
              }}
              size="small"
              id="input-search"
              placeholder="Tìm kiếm ..."
              value={searchText}
              onChange={onChangeSearch}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmitSearch();
                }
              }}
              debounceTimeout={500}
            />
            <IconButton
              sx={{
                height: "100%",
                width: "2rem",
                backgroundColor: "#f4ba36",
                borderRadius: "0",
              }}
              variant="contained"
              onClick={() => handleSubmitSearch(searchText)}
            >
              <SearchIcon />
            </IconButton>
          </Stack>
        </Box>

        {/* Right Element */}
        <div className="element header_rightElement">
          <ul className="navbar">
            <li className="header__account">
              {user ? (
                <>
                  <Stack>
                    <Button
                      sx={{ color: "white", padding: "6px 0" }}
                      // endIcon={<ArrowDropDownOutlinedIcon />}
                    >
                      <Typography
                        className="text-overflow-1-lines"
                        sx={{
                          fontSize: "14px",
                          textAlign: "start",
                          color: "white",
                        }}
                      >
                        {/* Filter nickName without suffix email */}
                        <AccountCircle />
                      </Typography>
                    </Button>
                  </Stack>

                  <Box className="header__dropdown">
                    <Link
                      to={"/my-account/orders"}
                      style={{ padding: "8px 20px" }}
                    >
                      Đơn hàng của tôi
                    </Link>

                    <Link
                      to={"/my-account/wishlist"}
                      style={{ padding: "8px 20px" }}
                    >
                      Sản phẩm yêu thích
                    </Link>

                    <Link to={"/my-account"} style={{ padding: "8px 20px" }}>
                      Tài khoản của tôi
                    </Link>
                    <Divider variant="inset" component="li" />
                    {tokenDecode.roleNames.includes("SELLER") && isExpire ? (
                      <>
                        <Link to={"/seller"} style={{ padding: "8px 20px" }}>
                          Trang người bán
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to={"/license"} style={{ padding: "8px 20px" }}>
                          Đăng kí làm người bán
                        </Link>
                      </>
                    )}

                    <Divider variant="inset" component="li" />
                    <Box onClick={handleLogout} style={{ fontSize: "14px" }}>
                      Thoát tài khoản
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  <Button onClick={openModalLogin} sx={{ color: "white" }}>
                    <Typography sx={{ fontSize: "14px", color: "white" }}>
                      Đăng nhập / Đăng ký
                    </Typography>
                  </Button>
                </>
              )}
            </li>

            <li className="divider"></li>

            <li>
              <Link to="/cart">
                <Badge
                  color="warning"
                  badgeContent={cart?.length}
                  invisible={cart?.length === 0}
                  showZero
                >
                  <ShoppingBagIcon sx={{ fontSize: "25px" }} />
                </Badge>
              </Link>
            </li>

            <li className="divider"></li>

            <li>
              {user ? (
                <>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    onClick={() => setOpenNotify(true)}
                  >
                    <Badge
                      badgeContent={notifications?.length}
                      invisible={notifications?.length === 0}
                      color="warning"
                    >
                      <NotificationsIcon sx={{ color: "white" }} />
                    </Badge>
                  </IconButton>
                  <SwipeableDrawer
                    anchor="right"
                    open={openNotify}
                    onClose={() => setOpenNotify(false)}
                    onOpen={() => setOpenNotify(true)}
                  >
                    {formNotify()}
                  </SwipeableDrawer>
                </>
              ) : (
                <></>
              )}
            </li>
          </ul>
        </div>
      </Stack>

      {/* ModelLogin */}
      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalLogin}
        onClose={closeModalLogin}
      >
        <Box className="modal-login" sx={{ width: "600px" }}>
          {isLoginForm && (
            <Login
              handleOpenSignup={handleOpenSignup}
              closeModalLogin={closeModalLogin}
              handleOpenForgetPwd={handleOpenForgetPwd}
            />
          )}

          {isRegister && (
            <SignUp
              handleOpenLogin={handleOpenLogin}
              closeModalLogin={closeModalLogin}
            />
          )}

          {isForgetPwd && (
            <ForgetPassword
              closeModalForgetPWD={closeModalForgetPWD}
              handleReturnLogin={handleReturnLogin}
            />
          )}
        </Box>
      </Modal>
    </header>
  );
}

export default Header;
