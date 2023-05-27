/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
import { styled } from "@mui/material/styles";
import * as React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Notifies } from "../../constraints/AdminNotify";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import {
  Box,
  Button,
  ClickAwayListener,
  Collapse,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SwipeableDrawer,
  Toolbar,
  Typography
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";

import Dashboard from "./Dashboard";
import Order from "./Order";
import Product from "./Product";
import CreateDetailProduct from "./Product/CreateDetailProduct";
import InfringeProduct from "./Product/InfringeProduct";
import SettingProduct from "./Product/SettingProduct";

import { useSelector } from "react-redux";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% - calc(${theme.spacing(8)} + 1px))`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Seller() {
  const [openAccount, setOpenAccount] = React.useState(false);

  const user = useSelector((state) => state.auth.user);

  const [openSideBar1, setOpenSideBar1] = React.useState(false);
  const [openSideBar2, setOpenSideBar2] = React.useState(false);
  const [openSideBar3, setOpenSideBar3] = React.useState(false);

  const handleClickSideBar1 = () => {
    setOpenSideBar1(!openSideBar1);
  };

  const handleClickSideBar2 = () => {
    setOpenSideBar2(!openSideBar2);
  };

  const handleClickSideBar3 = () => {
    setOpenSideBar3(!openSideBar3);
  };

  const handleClickAccount = () => {
    setOpenAccount((prev) => !prev);
  };

  const handleClickAwayAccount = () => {
    setOpenAccount(false);
  };

  const [openNotify, setOpenNotify] = React.useState(false);

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
                Cập nhật nhà bán
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
                  Xem tất cả
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
                  Đã đọc tất cả
                </Button>
              </Stack>
            </Stack>
            <IconButton onClick={CloseNotify}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Divider light />
          <Stack sx={{ padding: "12px" }}>
            {Notifies.map((item) => (
              <Stack>
                <Stack direction="row" spacing={2} sx={{ padding: "12px" }}>
                  <Stack width="56px" height="56px">
                    <img
                      style={{ borderRadius: "8px" }}
                      src="https://salt.tikicdn.com/ts/sellercenterFE/bb/d5/88/7898a8f9179435d5cf3f28bb3d99a82c.jpeg"
                    />
                  </Stack>
                  <Stack sx={{ overflow: "auto" }}>
                    <Stack>
                      <a href={item.link}>
                        <Typography
                          sx={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          {item.title}
                        </Typography>
                        {item.info.map((itemI) => (
                          <Typography sx={{ fontSize: "14px" }}>
                            {itemI.text}
                          </Typography>
                        ))}
                      </a>
                    </Stack>
                    <Typography sx={{ fontSize: "12px" }}>
                      {item.datetime}
                    </Typography>
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

  const stylesAccount = {
    position: "absolute",
    top: 48,
    right: 0,
    zIndex: 1,
    border: "1px solid #333",
    bgcolor: "background.paper",
    width: "16rem",
    paddingTop: "4px",
  };

  const [selectedTabId, setSelectedTabId] = React.useState(0);

  const [open, setOpen] = React.useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Stack direction="row">
      <CssBaseline />

      <AppBar
        sx={{ backgroundColor: "white", color: "black" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <Stack
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Kênh Người Bán</Typography>

            <Stack direction="row" spacing={3} alignItems="center">
              <SwipeableDrawer
                anchor="right"
                open={openNotify}
                onClose={() => setOpenNotify(false)}
                onOpen={() => setOpenNotify(true)}
              >
                {formNotify()}
              </SwipeableDrawer>

              <ClickAwayListener onClickAway={handleClickAwayAccount}>
                <Stack
                  sx={{
                    border: "1px solid #d9d9d9",
                    borderRadius: "16px",
                    position: "relative",
                    height: "32px",
                    padding: "4px",
                    cursor: "pointer",
                  }}
                  className="admin__dropdown"
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  onClick={handleClickAccount}
                >
                  <Box
                    borderRadius="50%"
                    alt=""
                    component="img"
                    src="https://salt.tikicdn.com/cache/w32/ts/sellercenterFE/93/76/03/2a08fa4ae6a024a752fbba87d145bce8.png"
                    onClick={handleClickAccount}
                    sx={{ width: "24px", height: "24px" }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "14px",
                      paddingLeft: "6px",
                      fontWeight: "Light",
                    }}
                  >
                    {user.fullName}
                  </Typography>
                  <ExpandMoreOutlinedIcon />
                  {openAccount ? (
                    <Stack sx={stylesAccount}>
                      <Stack px={2} py={1} direction="row">
                        <Box
                          borderRadius="50%"
                          component="img"
                          src="https://salt.tikicdn.com/cache/w32/ts/sellercenterFE/93/76/03/2a08fa4ae6a024a752fbba87d145bce8.png"
                          sx={{ width: "40px", height: "40px" }}
                        />
                        <Stack sx={{ paddingLeft: "10px" }}>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {user.fullName}
                          </Typography>
                        </Stack>
                      </Stack>

                      <ListItem
                        disablePadding
                        sx={{
                          display: "block",
                          paddingX: "16px",
                          alignItems: "left",
                        }}
                      >
                        <Button
                          variant="text"
                          startIcon={<PersonOutlineIcon />}
                          sx={{ color: "#333" }}
                        >
                          Hồ sơ nhà bán
                        </Button>
                        <Button
                          variant="text"
                          startIcon={<DriveFileRenameOutlineOutlinedIcon />}
                          sx={{ color: "#333" }}
                        >
                          Thay đổi mật khẩu
                        </Button>
                      </ListItem>
                    </Stack>
                  ) : null}
                </Stack>
              </ClickAwayListener>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            <img
              src="https://salt.tikicdn.com/cache/w32/ts/sellercenterFE/93/76/03/2a08fa4ae6a024a752fbba87d145bce8.png"
              alt=""
            />
          </IconButton>

          <Typography sx={{ ml: "1rem", fontWeight: "bold" }} variant="h6">
            Senki
          </Typography>
        </DrawerHeader>

        <Divider />

        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            padding: "20px 0px",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClickSideBar1}>
            <ListItemIcon sx={{ minWidth: "32px" }}>
              <Inventory2OutlinedIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Vận chuyển" />
            {openSideBar1 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSideBar1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Quản lý vận chuyển" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickSideBar2}>
            <ListItemIcon sx={{ minWidth: "32px" }}>
              <ReceiptOutlinedIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Quản lý đơn hàng" />
            {openSideBar2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          
          <Link to={'/seller/order'}>
          <Collapse in={openSideBar2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Tất cả" />
              </ListItemButton>
            </List>
          </Collapse>
          </Link>

          <Collapse in={openSideBar2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Đơn hủy" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={handleClickSideBar3}>
            <ListItemIcon sx={{ minWidth: "32px" }}>
              <LocalMallOutlinedIcon sx={{ color: "black" }} />
            </ListItemIcon>
            <ListItemText primary="Quản lý sản phẩm" />
            {openSideBar3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Link to={'/seller/product'}>
          <Collapse in={openSideBar3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Tất cả sản phẩm" />
              </ListItemButton>
            </List>
          </Collapse>
          </Link>
          <Link to={'/seller/product/create'}>
          <Collapse in={openSideBar3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Thêm sản phẩm" />
              </ListItemButton>
            </List>
          </Collapse>
          </Link>
          <Link to={'/seller/product/infringe'}>
          <Collapse in={openSideBar3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Sản phẩm vi phạm" />
              </ListItemButton>
            </List>
          </Collapse>
          </Link>

          <Link to={'/seller/product/setting'}>
          <Collapse in={openSideBar3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Cài đặt sản phẩm" />
              </ListItemButton>
            </List>
          </Collapse>
          </Link>
        </List>
      </Drawer>

      <Box
        component="main"
        flexGrow={1}
        p={0}
        bgcolor="#f5f5fa"
        minHeight="40rem"
      >
        <DrawerHeader />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="order/*" element={<Order />} />
          <Route
            path="product/*"
            element={
              <Routes>
                <Route index element={<Product />} />
                <Route path="create" element={<CreateDetailProduct />} />
                <Route
                  path="edit/:id"
                  element={<CreateDetailProduct edit={true} />}
                />
                <Route path="infringe" element={<InfringeProduct />} />
                <Route path="setting" element={<SettingProduct />} />
              </Routes>
            }
          />
        </Routes>
      </Box>
    </Stack>
  );
}

export default Seller;
