import React, { useEffect, useState } from "react";
import "./DetailOrder.scss";
import { Box, Stack, Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import apiCart from "../../../../apis/apiCart";
import { toast } from "react-toastify";
import { formatJavaLocalDateTime,numWithCommas } from "../../../../constraints/Util";



function DetailOrder() {
  const id = useParams().id;
  const [order, setOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

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
      apiCart
        .getOrdersByIdAmin(id)
        .then((res) => {
          setOrder(res.data.order);
          setTotalPrice(
            res.data.order.orderDetails.reduce(
              (t, num) => t + num.price * num.quantity,
              0
            )
          );
        })
        .catch((error) => {
          setOrder(null);
          toast.warning("Không tìm thấy đơn hàng");
        });
    };
    getData();
  }, [id]);

  const handleComfirm = () => {
    let params = {
      status: "shipping",
    };
    apiCart
      .changeTypeOrder(params, id)
      .then((res) => {
        toast.success("Xác nhận thành công");
      })
      .catch((error) => {
        toast.error("Xác nhận không thành công");
      });
  };
  const handleCancel = () => {
    let params = {
      status: "cancel",
    };
    apiCart
      .changeTypeOrder(params, id)
      .then((res) => {
        toast.success("Hủy thành công");
      })
      .catch((error) => {
        toast.error("Hủy không thành công");
      });
  };

  return (
    <Box>
      <Stack bgcolor="white" p={2}>
        <Typography mt={2.5} fontSize="19px" fontWeight={300}>
          Chi tiết đơn hàng #{order?.id} |{" "}
          <span className="!text-rose-400">{handleStatus(order?.status)}</span>
        </Typography>
        <Typography fontSize="13px" textAlign="end" className="!italic !mt-5">
            Ngày đặt hàng: {formatJavaLocalDateTime(order?.createdAt)}
          </Typography>
      </Stack>
      <Stack
        direction="row"
        mt={1.25}
        mb={2.5}
        className="detailOrder"
        jutifyContent="space-between"
        mx={2}
      >
        <Stack className="detailOrder__boxInfo">
          <Typography>ĐỊA CHỈ NHẬN HÀNG</Typography>
          <Box p={1.25} className="detailOrder__content">
            <Typography style={{ color: "#000", fontWeight: 500 }}>
              {order?.address?.fullName}
            </Typography>
            <Typography>
              Địa chỉ:{" "}
              {`${order?.address?.addressDetail}, ${order?.address?.commune?.name},
                                  ${order?.address?.district?.name},
                                  ${order?.address?.province?.name}`}
            </Typography>
            <Typography>Điện thoại: {order?.address?.phoneNumber}</Typography>
          </Box>
        </Stack>

        <Stack className="detailOrder__boxInfo">
          <Typography>HÌNH THỨC GIAO HÀNG</Typography>
          <Box p={1.25} className="detailOrder__content">
            <Typography>
              <img
                width="56px"
                height="16px"
                src="https://salt.tikicdn.com/ts/upload/2a/47/46/0e038f5927f3af308b4500e5b243bcf6.png"
                alt=""
              />
              {order?.shipping?.display}
            </Typography>
            <Typography>Phí vận chuyển: {order?.shipFee}đ</Typography>
          </Box>
        </Stack>
        <Stack className="detailOrder__boxInfo">
          <Typography>HÌNH THỨC THANH TOÁN</Typography>
          <Box p={1.25} className="detailOrder__content">
            <Typography>{order?.method}</Typography>
          </Box>
        </Stack>
      </Stack>

      <Stack bgcolor="#fff" mx={2}>
        <Stack direction="row" className="detailOrder-Table__heading">
          <Box>Sản phẩm</Box>
          <Box>Giá</Box>
          <Box>Số lượng</Box>
          <Box>Tạm tính</Box>
        </Stack>
        {order?.orderDetails?.map((item) => (
          <Stack key={item} direction="row" className="detailOrder-Table__row">
            <Stack direction="row" className="orderDetail__item">
              <Box mr={1.875}>
                <img
                  height="60px"
                  width="60px"
                  src={item?.productImage}
                  alt=""
                />
              </Box>
              <Stack spacing={1.5}>
                <Link to={"/"}>
                  <Typography fontSize="14px">{item?.productName}</Typography>
                </Link>
              </Stack>
            </Stack>
            <Box>{numWithCommas(item?.price || 0)}₫</Box>
            <Box>{numWithCommas(item?.quantity || 0)}</Box>
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
        >
          <Stack py={0.625} direction="row">
            <Typography className="detailOrder__summary-label">
              Tạm tính
            </Typography>
            <Typography className="detailOrder__summary-value">
              {numWithCommas(totalPrice || 0)} ₫
            </Typography>
          </Stack>
          <Stack py={0.625} direction="row">
            <Typography className="detailOrder__summary-label">
              Phí vận chuyển
            </Typography>
            <Typography className="detailOrder__summary-value">
              {numWithCommas(order?.shipFee || 0)} ₫
            </Typography>
          </Stack>
          <Stack py={0.625} direction="row">
            <Typography className="detailOrder__summary-label">
              Phí tổng cộng
            </Typography>
            <Typography className="detailOrder__summary-value detailOrder__summary-value--final">
              {numWithCommas(order?.total || 0)} ₫
            </Typography>
          </Stack>
        </Stack>
      )}
      {/* <Stack direction="row" spacing="16px" justifyContent="flex-end" p={2}>
        {order?.status == "processing" && (
          <>
            <Button variant="contained" onClick={handleComfirm}>
              Xác nhận
            </Button>
            <Button variant="contained" color="error" onClick={handleCancel}>
              Hủy bỏ
            </Button>
          </>
        )}
      </Stack> */}
    </Box>
  );
}

export default DetailOrder;
