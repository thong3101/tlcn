/* eslint-disable */
import {
  Box,
  Button,
  InputBase,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Modal,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import "./Order.scss";

import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

import LoadingPage from "../../../components/LoadingPage";

import {
  formatJavaLocalDateTime,
  numWithCommas,
  reduceUUIDDisplayLength,
} from "../../../constraints/Util";
import apiShipper from "../../../apis/apiShipper";

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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function OrderList() {
  const theme = useTheme();

  const [selected, setSelected] = React.useState(0);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [query, setQuery] = useState("");

  const [value, setValue] = useState(0);

  const [loadingData, setLoadingData] = useState(false);
  const [statuss, setStatuss] = React.useState("");

  const handleChangeStatuss = (event) => {
    setStatuss(event.target.value);
  };

  const [noteDetail, setNoteDetail] = useState("");

  const [openDelived, setOpenDelived] = useState(false);
  const handleOpenDelived = (itemId) => {
    setOrderId(itemId);
    setOpenDelived(true);
  };
  const handleCloseDelived = () => setOpenDelived(false);

  const [openCancel, setOpenCancel] = useState(false);
  const handleOpenCancel = (itemId) => {
    setOrderId(itemId);
    setOpenCancel(true);
  };
  const handleCloseCancel = () => setOpenCancel(false);

  const [orderId, setOrderId] = useState(null);

  const size = 6;

  useEffect(() => {
    let param = {
      status: "",
    };
    switch (statuss) {
      case 2: {
        param = { ...param, status: "shipping" };
        break;
      }
      case 3: {
        param = { ...param, status: "delivered" };
        break;
      }
      case 4: {
        param = { ...param, status: "cancel" };
        break;
      }
      default: {
        param = { ...param, status: "processing" };
        break;
      }
    }

    console.log(param);
    setLoadingData(true);
    const getData = async () => {
      apiShipper
        .getOrdersHistoryShipper(param)
        .then((response) => {
          setOrders(response.data.list);
          setTotalPage(Math.ceil(response.data.length / size));
        })
        .catch(setOrders([]))
        .finally(() => {
          setLoadingData(false);
        });
    };
    getData();
  }, [page, statuss]);

  console.log(statuss);

  const handleSubmitDelived = () => {
    let param = {
      status: "delivered",
      note: noteDetail,
    };
    handleCloseDelived();
    apiShipper
      .UpdateStatus(orderId, param)
      .then((res) => {
        setStatuss(3);
        toast.success("Cập nhật đơn hàng thành công");
      })
      .catch((error) => {
        toast.error("Cập nhật đơn hàng thất bại");
      });
  };

  const handleSubmitCancel = () => {
    let param = {
      status: "cancel",
      note: noteDetail,
    };
    handleCloseCancel();
    apiShipper
      .UpdateStatus(orderId, param)
      .then((res) => {
        setStatuss(4);
        toast.success("Cập nhật đơn hàng thành công");
      })
      .catch((error) => {
        toast.error("Cập nhật đơn hàng thất bại");
      });
  };

  const lastPostIndex = page * size;
  const firstPostIndex = lastPostIndex - size;
  const colorOnOrderStatus = (status) => {
    console.log(status);
    if (status) {
      switch (status) {
        case "cancel":
          return "!text-red-600 !bg-red-100";
        case "pending":
          return "!text-yellow-600 !bg-yellow-100";
        case "shipping":
          return "!text-violet-600 !bg-violet-100";
        case "processing":
          return "!text-sky-600 !bg-sky-100";
        case "delivered":
          return "!text-green-600 !bg-green-100";
        default:
          return "!text-black";
      }
    }
  };
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

        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            maxWidth: 600,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
            Sắp xếp giá bán:
          </Typography>
          <Select
            value={statuss}
            onChange={handleChangeStatuss}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            cursor="pointer"
            sx={{ minWidth: 400 }}
          >
            <MenuItem value={""}>Chưa giao</MenuItem>
            <MenuItem value={2}>Đang giao</MenuItem>
            <MenuItem value={3}>Đã giao</MenuItem>
            <MenuItem value={4}>Đơn hủy</MenuItem>
          </Select>
        </FormControl>

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
                <TableCell sx={{ width: "15%", top: "64px" }} align="center">
                  Trạng thái&nbsp;
                </TableCell>
                {/* <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Ngày xác nhận/hạn xác nhận&nbsp;
              </TableCell> */}
                <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                  Giá trị đơn hàng&nbsp;
                </TableCell>
                <TableCell sx={{ width: "15%", top: "64px" }} align="center">
                  Ngày đặt hàng&nbsp;
                </TableCell>
                <TableCell
                  sx={{ width: "10%", top: "64px" }}
                  className="!pl-10"
                >
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
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ fontSize: "1rem" }}
                    >
                      {reduceUUIDDisplayLength(row?.id)} <br />
                    </TableCell>
                    <TableCell
                      className={`uppercase ${colorOnOrderStatus(
                        row?.status
                      )} !text-center`}
                    >
                      {row?.status}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="!text-rose-500 !text-2xl"
                    >
                      {numWithCommas(row?.total)} đ
                    </TableCell>
                    <TableCell align="center">
                      {formatJavaLocalDateTime(row?.createdAt)}
                    </TableCell>
                    <TableCell align="left">
                      <Stack spacing={1} justifyContent="start" py={1}>
                        {row?.status == "shipping" ? (
                          <>
                            <Stack direction="row" spacing={2}>
                              <Button
                                sx={{ width: "100px" }}
                                variant="outlined"
                                onClick={() => {
                                  handleOpenDelived(row?.id);
                                }}
                              >
                                Đã nhận đơn
                              </Button>
                              <Button
                                sx={{ width: "100px" }}
                                variant="outlined"
                                onClick={() => {
                                  handleOpenCancel(row?.id);
                                }}
                              >
                                Hủy đơn
                              </Button>
                            </Stack>
                          </>
                        ) : (
                          <>
                            <Link to={`detail/${row?.id}`}>
                              <Button
                                sx={{ width: "100px" }}
                                variant="outlined"
                              >
                                Xem
                              </Button>
                            </Link>
                          </>
                        )}
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
        {openDelived && (
          <Modal
            open={openDelived}
            onClose={handleCloseDelived}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Xác nhận đơn hàng
              </Typography>

              <Typography
                className="create-address__label "
                sx={{ paddingTop: "10px" }}
              >
                Ghi chú
              </Typography>
              <Stack
                className="create-address__input"
                sx={{ padding: "10px 0px" }}
              >
                <TextField
                  value={noteDetail}
                  onChange={(event) => {
                    setNoteDetail(event.target.value);
                  }}
                  multiline
                  rows={4}
                  placeholder="Nhập ghi chú"
                ></TextField>
              </Stack>

              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <Button variant="outlined" onClick={handleCloseDelived}>
                  Hủy
                </Button>
                <Button variant="contained" onClick={handleSubmitDelived}>
                  Xác nhận
                </Button>
              </Stack>
            </Box>
          </Modal>
        )}
        {openCancel && (
          <Modal
            open={openCancel}
            onClose={handleCloseCancel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Xác nhận hủy đơn hàng
              </Typography>

              <Typography
                className="create-address__label "
                sx={{ paddingTop: "10px" }}
              >
                Ghi chú
              </Typography>
              <Stack
                className="create-address__input"
                sx={{ padding: "10px 0px" }}
              >
                <TextField
                  value={noteDetail}
                  onChange={(event) => {
                    setNoteDetail(event.target.value);
                  }}
                  multiline
                  rows={4}
                  placeholder="Nhập ghi chú"
                ></TextField>
              </Stack>

              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <Button variant="outlined" onClick={handleCloseCancel}>
                  Hủy
                </Button>
                <Button variant="contained" onClick={handleSubmitCancel}>
                  Xác nhận hủy đơn
                </Button>
              </Stack>
            </Box>
          </Modal>
        )}
      </Stack>
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
