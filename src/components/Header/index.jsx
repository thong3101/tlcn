import "./Header.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";

import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Stack, Button, Typography, Badge, Box, Modal,Divider } from "@mui/material";


import { logoutSuccess } from "../../slices/authSlice";

import Login from "../Login";
import SignUp from "../SignUp";
import ForgetPassword from "../ForgetPassword";
import { Add, Info, PermContactCalendar, VerticalAlignCenter } from "@mui/icons-material";
import apiCategory from "../../apis/apiCategory";

const privatePath = ["/my-account/", "/admin/", "/payment"];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [modalLogin, setModalLogin] = useState(false);
  const openModalLogin = () => setModalLogin(true);

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgetPwd, setIsForgetPwd] = useState(false);

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
            style={{ width: "100%", height: "100%",objectFit:"cover" }}
            src="https://res.cloudinary.com/dddmdgm0w/image/upload/v1670075080/senki_avatar/senki_avatar/senki-high-resolution-logo-white-on-transparent-background_ouktxc.png"
          />
        </Link>

        {/* Left Element */}
        <div className="element header__leftElement">
          <ul className="navbar">
            <li>
              <Link
                to={"product-category/d98667d1-c9a3-4f64-8c7b-4ef83d0fac48"}
              >
                <Typography sx={{ fontSize: "14px", paddingBottom: "6px" }} >
                  Đàn Guitar
                  <ArrowDropDownOutlinedIcon />
                </Typography>
                {/* <FontAwesomeIcon icon="fa-light fa-chevron-down" /> */}
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link to={"product-category/da2e6e42-7321-489c-9a82-7f726c27b235"}>Đàn Guitar Classic</Link>
                </li>
                <li>
                  <Link to={"product-category/ee0f24bb-6a8d-4c9e-bc3e-90313c2d6852"}>Đàn Guitar Acoustic</Link>
                </li>
                <li>
                  <Link to={"product-category/7bc16cfe-1ad4-4f7a-aba2-5b067591e90f"}>Đàn Guitar EQ</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to={"#"}>
                <Typography sx={{ fontSize: "14px", paddingBottom: "6px" }}>
                  Nhạc Cụ Khác
                  <ArrowDropDownOutlinedIcon />
                </Typography>
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link
                    to={"product-category/0b4020de-ef99-4fca-83ee-92fc62e0b6d9"}
                  >
                    Đàn Ukulele
                  </Link>
                </li>
                <li>
                  <Link
                    to={"product-category/9b1e2a20-c19c-44e2-abab-9412343b4e1f"}
                  >
                    Kèn harmonica
                  </Link>
                </li>
                <li>
                  <Link
                    to={"product-category/ccefc41e-1e12-45f7-a8e5-98c8db8227f5"}
                  >
                    Rollup Piano
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link to={"product-category/ab9b9251-8f67-4250-8b36-4106841b46e8"}>
                <Typography sx={{ fontSize: "14px", paddingBottom: "6px" }}>
                  Đàn Piano
                  <ArrowDropDownOutlinedIcon />
                </Typography>
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link to={"product-category/4ca00442-e1f8-40c0-9c0a-ac753780ad2b"}>Grand Piano</Link>
                </li>
                <li>
                  <Link to={"product-category/c0bb734a-76c8-41b3-ac60-9c34d5f12201"}>Digital Piano</Link>
                </li>
                <li>
                  <Link to={"product-category/37d1b49b-69b4-4866-b81c-cc3389196883"}>Silent Piano</Link>
                </li>
              </ul>
            </li>
            

            <li>
              <Link to={"product-category/75bba741-2720-4ce3-8d24-7fb6bd3a2aa0"}>
                <Typography sx={{ fontSize: "14px", paddingBottom: "6px" }}>
                  Phụ Kiện Guitar
                  <ArrowDropDownOutlinedIcon />
                </Typography>
              </Link>
              <ul className="subnav subnav__dropdown">
                <li>
                  <Link to={"product-category/fb320d77-73e1-490a-8f37-d9718448fc3c"}>Dây đàn guitar</Link>
                </li>
                <li>
                  <Link to={"product-category/3fd314f0-219d-4233-99f4-f91b20c80a8b"}>Khóa đàn Guitar</Link>
                </li>
                <li>
                  <Link to={"product-category/ae53d467-c176-4a94-8e27-6fd3de971ba3"}>Giá đỡ, chân đàn</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Right Element */}
        <div className="element header_rightElement">
          <ul className="navbar">
            <li className="header__account">
              {user ? (
                <>
                  <Stack>
                    <Button
                      sx={{ color: "white", padding: "6px 0" }}
                      endIcon={<ArrowDropDownOutlinedIcon />}
                    >
                      <Typography
                        className="text-overflow-1-lines"
                        sx={{
                          fontSize: "14px",
                          textAlign: "start",
                          color: "white",
                        }}
                      >
                        {user.nickName}
                      </Typography>
                    </Button>
                  </Stack>

                  <Box className="header__dropdown" >
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


                    <Link
                      to={"/my-account"}
                      style={{ padding: "8px 20px" }}
                    >
                      Tài khoản của tôi
                    </Link>
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
                <Badge color="warning" badgeContent={cart.length} invisible={cart.length===0} showZero>
                  <ShoppingBagIcon sx={{ fontSize: "25px" }} />
                </Badge>
              </Link>
            </li>

            <li className="divider"></li>

            <li>
              <div className="buttonSearch">
                <Link
                  to={"/"}
                  className="icon"
                  aria-label="Tìm Kiếm"
                  data-open="#search-lightbox"
                  data-focus="input.search-field"
                >
                  <SearchIcon
                    sx={{ fontSize: "20px", color: "#ffffff", margin: "1px" }}
                  />
                </Link>
              </div>
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
