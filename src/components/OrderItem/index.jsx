import { Box, Typography, Stack, Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import "./OrderItem.scss";
import { orderTabs } from "../../constraints/OrderItem";
import { formatJavaLocalDateTime, numWithCommas } from "../../constraints/Util";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import apiCart from "../../apis/apiCart";

function OrderItem(props) {
  const { order } = props;
  const state = getState(order);
  const [paying, setPaying] = useState(false);

  const handlePaying = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
    }, 2000);
    apiCart
    .makePaymentPaypal(order?.id)
    .then((res) => {
      window.open(res.data.link);
    });
  };

  return (
    <Box className="orderItem">
      <Stack direction="row" className="orderItem__heading">
        {state?.icon && (
          <>
            <state.icon />{" "}
            <Typography>
              Ngày đặt hàng: {formatJavaLocalDateTime(order?.createdAt)}
            </Typography>
          </>
        )}

        <Typography component="span" variant="h3" fontWeight={500} color="#888">
          {state?.display}
        </Typography>
      </Stack>
      {order?.orderDetails.slice(0, 2).map((item) => (
        <Stack
          key={item.id}
          className="orderItem__product"
          direction="row"
          justifyContent="space-between"
        >
          <Stack
            className="orderItem__img"
            direction="row"
            justifyContent="space-between"
          >
            <img alt="" src={item.productImage} />
            <span className="orderItem__quantity">x{item.quantity}</span>
          </Stack>
          <Stack flex={1} mx="12px">
            <Link
              to={item.productId ? `/product-detail/${item?.productId}` : ""}
            >
              <Typography className="text-overflow-2-lines" fontSize="13px">
                {item.productName}
              </Typography>
            </Link>
          </Stack>
          <Stack justifyContent="center">
            <Typography className="orderItem__price ">
              {numWithCommas(item.price * item.quantity)} ₫
            </Typography>
          </Stack>
        </Stack>
      ))}
      <Box>
        <Box className="orderItem__total">
          <Typography
            component="span"
            fontSize="17px"
            fontWeight="400"
            color="#888"
          >
            Tổng tiền
          </Typography>
          <Typography
            component="span"
            fontSize="17px"
            fontWeight="500"
            className="!text-rose-400"
          >
            {numWithCommas(order.total)} ₫
          </Typography>
        </Box>
        <Box className="orderItem__groupbtn">
          {order?.status === "pending" ? (
            <Button variant="outlined" onClick={handlePaying}>
              {paying && <Loading color="#1976D2" />}
              Thanh toán
            </Button>
          ) : (
            <Button variant="outlined">Mua lại</Button>
          )}
          <Link to={`detail/${order.id}`}>
            <Button variant="contained">Xem chi tiết</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

const getState = (state) =>
  orderTabs.find((item) => item.slug === state.status);

export default OrderItem;
