import React, { useEffect, useState } from "react";
import "./DetailOrder.scss";
import { Box, Stack, Typography, Button, Breadcrumbs } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiShipper from "../../../../apis/apiShipper";
import apiCart from "../../../../apis/apiCart";
import { toast } from "react-toastify";
import {
  formatJavaLocalDateTime,
  numWithCommas,
} from "../../../../constraints/Util";
import LoadingPage from "../../../../components/LoadingPage";
import { useSelector } from "react-redux";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../../../../firebase";
import { v4 as uuid } from "uuid";

function DetailOrder() {
  const id = useParams().id;
  const [order, setOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const currentUser = useSelector((state) => state.auth.user);
  const [loadingData, setLoadingData] = useState(false);
  const navigate = useNavigate();
  const handleStatus = (status) => {
    switch (status) {
      case "pending":
        return "Chưa thanh toán";
      case "processing":
        return "Đã thanh toán";
      case "shipping":
        return "Đang giao hàng";
      case "completed":
        return "Đã giao hàng";
      case "cancel":
        return "Đã hủy";
      default:
        return "Đang xử lý";
    }
  };
  useEffect(() => {
    const getData = () => {
      setLoadingData(true);
      apiShipper
        .getOrdersShipperById(id)
        .then((res) => {
          setOrder(res.data.data);
          setTotalPrice(
            res.data.data.orderDetails.reduce(
              (t, num) => t + num.price * num.quantity,
              0
            )
          );
        })
        .catch((error) => {
          setOrder(null);
          toast.warning("Không tìm thấy đơn hàng");
        })
        .finally(() => {
          setLoadingData(false);
        });
    };

    getData();
  }, [id]);

  console.log(order);

  const handleComfirm = () => {
    apiShipper
      .PickOrdersById(id)
      .then(async (res) => {
        const noti = await getDoc(doc(db, "noti", res.data.data.buyerId));

        if (!noti.exists()) {
          //create empty noti on firestore
          await setDoc(doc(db, "noti", res.data.data.buyerId), { noti: [] });
        }
        await updateDoc(doc(db, "noti", res.data.data.buyerId), {
          noti: arrayUnion({
            id: uuid(),
            text: "Đơn hàng của bạn đang được giao",
            senderId: currentUser.id,
            date: Timestamp.now(),
          }),
        });
        toast.success("Xác nhận thành công");
        navigate('/shipper/manage');
      })
      .catch((error) => {
        toast.error("Xác nhận không thành công");
      });
  };

  return (
    <>
      {loadingData ? (
        <LoadingPage />
      ) : (
        <Box>
          <Breadcrumbs>
            <Link
              to={"/shipper/order"}
              className="!text-sm"
            >{` < Trở lại`}</Link>
          </Breadcrumbs>
          <Typography mt={2.5} fontSize="19px" fontWeight={300}>
            Chi tiết đơn hàng #{order?.id} |{" "}
            <span className="!text-rose-400">
              {handleStatus(order?.status)}
            </span>
          </Typography>
          <Typography fontSize="13px" textAlign="end" className="!italic !mt-5">
            Ngày đặt hàng: {formatJavaLocalDateTime(order?.createdAt)}
          </Typography>
          <Stack
            direction="row"
            mt={1.25}
            mb={2.5}
            className="detailOrder"
            justifyContent="space-between"
          >
            <Box className="detailOrder__boxInfo">
              <Typography>ĐỊA CHỈ NHẬN HÀNG</Typography>
              <Box p={1.25} className="detailOrder__content">
                <Typography style={{ color: "#000", fontWeight: 500 }}>
                  {order?.address?.fullName}
                </Typography>
                <Typography>
                  Địa chỉ:{" "}
                  {order?.address
                    ? `${order?.address?.addressDetail}, ${order?.address?.commune?.name},
                                      ${order?.address?.district?.name},
                                      ${order?.address?.province?.name}`
                    : "Trống"}
                </Typography>
                <Typography>
                  Điện thoại: {order?.address?.phoneNumber}
                </Typography>
              </Box>
            </Box>

            <Box className="detailOrder__boxInfo"></Box>
            <Box className="detailOrder__boxInfo">
              <Typography>HÌNH THỨC THANH TOÁN</Typography>
              <Box p={1.25} className="detailOrder__content">
                <Typography>{order?.method}</Typography>
              </Box>
            </Box>
          </Stack>
          <Stack className="divide__line"></Stack>

          <Stack className="detailOrder-Table">
            <Stack direction="row" className="detailOrder-Table__heading">
              <Box>Sản phẩm</Box>
              <Box>Giá</Box>
              <Box>Số lượng</Box>
              <Box>Tạm tính</Box>
            </Stack>
            {order?.orderDetails?.map((item) => (
              <Stack
                key={item}
                direction="row"
                className="detailOrder-Table__row"
              >
                <Stack direction="row" className="orderDetail__item">
                  <Box mr={1.875}>
                    <img
                      height="60px"
                      width="60px"
                      src={item.productImage}
                      alt=""
                    />
                  </Box>
                  <Stack spacing={1.5}>
                    <Link to={`/product-category/${item.productId}`}>
                      <Typography fontSize="14px">
                        {item.productName}
                      </Typography>
                    </Link>
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        sx={{
                          fontSize: "12px",
                          width: "102px",
                          height: "30px",
                          padding: 0,
                        }}
                      >
                        Viết nhận xét
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{
                          fontSize: "12px",
                          width: "71px",
                          height: "30px",
                          padding: 0,
                        }}
                      >
                        Mua lại
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
                <Box>{numWithCommas(item.price || 0)}₫</Box>
                <Box className="!text-center">
                  Qty: {numWithCommas(item.quantity || 0)}
                </Box>
                <Box>{numWithCommas(item.price * item.quantity || 0)} ₫</Box>
              </Stack>
            ))}
          </Stack>
          {order && (
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-end"
              mt={3.5}
              className=""
            >
              <Stack py={0.625} direction="row">
                <Typography className="detailOrder__summary-label  ">
                  Tạm tính
                </Typography>
                <Typography className="detailOrder__summary-value  ">
                  {numWithCommas(totalPrice || 0)} ₫
                </Typography>
              </Stack>
              <Stack py={0.625} direction="row">
                <Typography className="detailOrder__summary-label  ">
                  Phí vận chuyển
                </Typography>
                <Typography className="detailOrder__summary-value  ">
                  {numWithCommas(order?.shipFee || 0)} ₫
                </Typography>
              </Stack>
              <Stack py={0.625} direction="row">
                <Typography className="detailOrder__summary-label  ">
                  Tổng cộng
                </Typography>
                <Typography className="detailOrder__summary-value detailOrder__summary-value--final  !text-xl">
                  {numWithCommas(totalPrice + order.shipFee || 0)} ₫
                </Typography>
              </Stack>
            </Stack>
          )}
          <Stack direction="row" spacing="16px" justifyContent="flex-end" p={2}>
            {order?.status == "processing" && (
              <>
                <Button variant="contained" onClick={handleComfirm}>
                  Nhận đơn
                </Button>
              </>
            )}
          </Stack>
        </Box>
      )}
    </>
  );
}

export default DetailOrder;
