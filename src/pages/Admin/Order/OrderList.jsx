/* eslint-disable */
import React, { useState } from "react";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Link, Routes, Route } from "react-router-dom";
import "./Order.scss";
import {
  Stack,
  Button,
  Typography,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  InputBase,
  Pagination,
  Box,
  Tab,
  Tabs,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import DetailOrder from "./DetailOrder";
import apiCart from "../../../apis/apiCart";

import { orderTabs } from "../../../constraints/OrderItem";

import LoadingPage from "../../../components/LoadingPage";

import {
  formatJavaLocalDateTime,
  convertDate,
} from "../../../constraints/Util";

const listStatus = ["Mã đơn hàng", "SKU", "Thông tin khách hàng"];
const listOrderDate = [
  "Hôm nay",
  "7 ngày qua",
  "30 ngày qua",
  "Toàn thời gian",
];
const items = [
  { id: 0, label: "Tất cả" },
  { id: 2, label: "Đang xử lý" },
  { id: 3, label: "Đang giao hàng" },
  { id: 4, label: "Đã giao hàng" },
  { id: 5, label: "Đã hủy" },
];

function OrderList() {
  const theme = useTheme();

  const [selected, setSelected] = React.useState(0);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [query, setQuery] = useState("");

  const [value, setValue] = useState(0);

  const [loadingData, setLoadingData] = useState(false);

  const size = 6;

  useEffect(() => {
    setLoadingData(true);
    const getData = async () => {
      apiCart
        .getOrdersAdmin()
        .then((response) => {
          setOrders(response.data.orders);
          setTotalPage(Math.ceil(response.data.orders.length / size));
        })
        .catch(setOrders([]))
        .finally(() => {
          setLoadingData(false);
        });
    };
    getData();
  }, [page, selected]);

  // const handleClickTab = (i) => {
  //   if (i !== selected) setSelected(i);
  // };
  // const [status, setStatus] = useState(0);
  // const onChangeStatus = (e) => {
  //   setStatus(e.target.value);
  // };
  // const [orderDate, setOrderDate] = useState(0);
  // const onChangeOrderDate = (e) => {
  //   setOrderDate(e.target.value);
  // };

  const lastPostIndex = page * size;
  const firstPostIndex = lastPostIndex - size;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, newValue) => {
    setPage(newValue);
  };
  return (
    <>
      <Stack p={3} bgcolor="#fff">
        <Typography fontSize="26px">Danh sách đơn hàng</Typography>
        <Stack direction="row" spacing="2rem" p={2} alignItems="center">
          <Typography>Vui lòng xem hướng dẫn và gửi góp ý:</Typography>
          <a href="https://hocvien.tiki.vn/faq/gioi-thieu-giao-dien-quan-ly-don-hang-moi/">
            <Typography color="#1890FF" fontSize="14px">
              Hướng dẫn xử lý đơn hàng
            </Typography>
          </a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdbp82PL58iyly_85SGcml8NcDYQEt1dK97QOJMZedVU7aVMA/viewform">
            <Typography color="#1890FF" fontSize="14px">
              Gửi góp ý
            </Typography>
          </a>
        </Stack>


        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ margin: "20px 0px" }}
        >
          <Stack direction="row" sx={{ width: "500px", position: "relative" }}>
            <TextField
              id="outlined-basic"
              placeholder="Tìm theo mã đơn hàng"
              variant="outlined"
              sx={{ width: "100%" }}
              size="small"
              onChange={(event) => setQuery(event.target.value)}
            />
            <span className="order__iconSearch">
              <SearchIcon sx={{ fontSize: "28px" }} />
            </span>
          </Stack>
        </Stack>

        {loadingData ? (
          <LoadingPage />
        ) : (
          <Table
            className="tableCategory"
            sx={{ minWidth: "650px" }}
            stickyHeader
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "20%", top: "64px" }}>
                  Mã đơn hàng
                </TableCell>
                <TableCell sx={{ width: "15%", top: "64px" }}>
                  Trạng thái&nbsp;
                </TableCell>
                {/* <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Ngày xác nhận/hạn xác nhận&nbsp;
              </TableCell> */}
                <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                  Giá trị đơn hàng&nbsp;
                </TableCell>
                <TableCell sx={{ width: "15%", top: "64px" }}>
                Ngày đặt hàng&nbsp;
                </TableCell>
                <TableCell sx={{ width: "10%", top: "64px" }}>
                  Thao tác&nbsp;
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orders
                ?.filter((order) => order.id?.toLowerCase().includes(query))
                .slice(firstPostIndex, lastPostIndex)
                .map((row) => (
                  <TableRow
                    key={row?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row?.id} <br />
                    </TableCell>
                    <TableCell align="left">{row?.status}</TableCell>
                    <TableCell align="center">{row?.total}</TableCell>
                    <TableCell align="left">{formatJavaLocalDateTime(row?.createdAt)}</TableCell>
                    <TableCell align="center">
                      <Stack spacing={1} justifyContent="center" py={1}>
                        <Link to={`detail/${row?.id}`}>
                          <Button sx={{ width: "100px" }} variant="outlined">
                            Xem chi tiết
                          </Button>
                        </Link>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
        {totalPage > 1 ? (
          <Stack spacing={2} mt="10px">
            <Pagination
              count={totalPage}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Stack>
        ) : (
          <></>
        )}
      </Stack>
      <Routes>
        <Route path="detail" element={<DetailOrder />} />
      </Routes>
    </>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    boxSizing: "border-box",
    borderRadius: 4,
    position: "relative",
    border: "1px solid #888",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    height: "40px !important",
    padding: "4px 10px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),

    "&:focus": {
      borderRadius: 4,
      borderColor: "#1890ff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

const getOrderByType = (orders, slug) =>
  orders.filter((item) => item.status === slug);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default OrderList;
