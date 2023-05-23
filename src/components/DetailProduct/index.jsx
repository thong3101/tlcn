import BookIcon from "@mui/icons-material/Book";
import FacebookIcon from "@mui/icons-material/Facebook";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StarIcon from "@mui/icons-material/Star";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { Box, Button, ButtonGroup, Typography, Rating } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { memo, React, useEffect } from "react";
import "./DetailProduct.scss";

import { useDispatch } from "react-redux";

//import store additem
import { addItem } from "../../slices/cartSlice";

//import img
import { useState } from "react";
import { toast } from "react-toastify";
import imgDefault from "../../assets/img/img_default.jpg";
import { numWithCommas } from "../../constraints/Util";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

function DetailProduct({ data, rating }) {
  const list_cities = () => [
    { label: "Ho Chi Minh", year: 1994 },
    { label: "Ha Noi", year: 1972 },
    { label: "Da Nang", year: 1974 },
    { label: "Can Tho", year: 2008 },
    { label: "Hai Phong", year: 1957 },
  ];


  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const [ratingProduct, setRatingProduct] = useState(0);

  console.log("r", rating);

  const handleRating = (rating) => {
    if (rating) {
      let sum = 0;
      for (const a of rating) {
        sum += a.rating;
      }
      return Math.round(sum / rating.length);
    }
  };

  console.log("rr", ratingProduct);

  const handleLoadImage = (img) => {
    if (img?.imageList) {
      return img.imageList[0]?.url;
    }
  };
  const handlePrice = (data) => {
    if (data) {
      return numWithCommas(data?.price);
    }
  };

  const handleClickAddItem = () => {
    dispatch(
      addItem({
        id: data.id,
        name: data.name,
        imageList: data.imageList,
        price: data.price,
        quantity,
      })
    );
    toast.success("Đã thêm vào giỏ hàng");
  };

  const handleMessage = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.id > data?.seller.id
        ? currentUser.id + data?.seller.id
        : data?.seller.id + currentUser.id;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.id), {
          [combinedId + ".userInfo"]: {
            uid: data?.seller.id,
            displayName: data?.seller.nickName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data?.seller.id), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.id,
            displayName: currentUser.nickName,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      navigate("/chat");
    } catch (err) {}
  };

  return (
    <Box className="detailProduct">
      <Box className="detailProduct__img">
        <div className="detailProduct__primary-img">
          <img
            alt=""
            src={handleLoadImage(data)}
            onError={(err) => (err.target.src = imgDefault)}
          ></img>
        </div>
        <div className="detailProduct__list-img !flex !justify-around">
          {data?.imageList?.slice(0, 6).map((item) => (
            <img
              className="detailProduct__item-img"
              alt=""
              src={item?.url}
            ></img>
          ))}
        </div>
      </Box>
      <Box className="detailProduct__general">
        <div className="detailProduct__info">
          <h3>{data?.name}</h3>
          <div className="detailProduct__info-underline-title"></div>
          <div className="detailProduct__info-price">
            <h4 className="detailProduct__info-price-original">
              {handlePrice(data)} đ
            </h4>
            <h4 className="detailProduct__info-price-sale">{data?.discount}</h4>
          </div>
          <div className="detailProduct__info-rate">
            <p> Đánh giá:</p>
            <div className="detailProduct__info-rate-star">
              <Rating readOnly value={handleRating(rating)} />
            </div>
            <p> | Đã bán {data?.sellAmount}</p>
          </div>
          <Typography sx={{ padding: "20px" }}>Mô tả</Typography>
          <Typography>{data?.description}</Typography>
          <div className="detailProduct__info-shipping">
            <p>
              <LocalShippingIcon sx={{ fontSize: 20 }} />
              <span> Bạn muốn vận chuyển đến?</span>
            </p>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={list_cities()}
              sx={{
                width: 220,
                fontSize: 18,
                my: 2,
              }}
              renderInput={(params) => (
                <TextField {...params} label="Chọn Tỉnh/ Thành phố" />
              )}
            />
          </div>
          <div className="detailProduct__quantity-info">
            {/* <QuantityButtons /> */}
            <ButtonGroup
              size="small"
              aria-label="small outline button group"
              className="quantity-buttons"
            >
              <Button
                onClick={() => {
                  quantity > 0 ? setQuantity(quantity - 1) : setQuantity(0);
                }}
              >
                -
              </Button>
              <Button>{quantity}</Button>
              <Button
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                +
              </Button>
            </ButtonGroup>
            <button
              className="detailProduct__add-to-cart"
              onClick={handleClickAddItem}
              style={{ fontWeight: 600, marginLeft:"20px" }}
            >
              THÊM VÀO GIỎ HÀNG
            </button>

            <button
              className="detailProduct__add-to-cart"
              onClick={handleMessage}
              style={{ fontWeight: 600, marginLeft:"20px" }}
            >
              Nhắn tin cho người bán
            </button>
          </div>
          <div className="detailProduct__info-guide">
            <div
              style={{ display: "flex", fontSize: "20px", lineHeight: "28px" }}
            >
              <InfoIcon sx={{ fontSize: "20px", marginRight: "2px" }} />
              <p>Hướng dẫn cách đặt hàng trực tuyến</p>
            </div>
            <div
              style={{ display: "flex", fontSize: "20px", lineHeight: "28px" }}
            >
              <BookIcon sx={{ fontSize: "20px", marginRight: "2px" }} />
              <p>Câu hỏi thường gặp khi mua hàng</p>
            </div>
            <FacebookIcon
              sx={{
                fontSize: "40px",
                marginTop: "20px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div className="detailProduct__support">
          <div className="detailProduct__support-box">
            <div className="detailProduct__support-box-item">
              <LocalShippingIcon
                sx={{
                  width: "50px",
                  height: "100%",
                  marginRight: "15px",
                }}
              />
              <p>Đặt hàng online, giao hàng COD toàn quốc</p>
            </div>
            <div className="detailProduct__support-box-item">
              <VolunteerActivismIcon
                sx={{
                  width: "50px",
                  height: "100%",
                  marginRight: "15px",
                }}
              />
              <p>Đặt hàng online, giao hàng COD toàn quốc</p>
            </div>
            <div className="detailProduct__support-box-item">
              <VolunteerActivismIcon
                sx={{
                  width: "50px",
                  height: "100%",
                  marginRight: "15px",
                }}
              />
              <p>Đặt hàng online, giao hàng COD toàn quốc</p>
            </div>
          </div>
          <div className="detailProduct__support-box">
            <div className="detailProduct__support-box-item">
              <VolunteerActivismIcon
                sx={{
                  width: "50px",
                  height: "100%",
                  marginRight: "15px",
                }}
              />
              <p>Đặt hàng online, giao hàng COD toàn quốc</p>
            </div>
            <div className="detailProduct__support-box-item">
              <VolunteerActivismIcon
                sx={{
                  width: "50px",
                  height: "100%",
                  marginRight: "15px",
                }}
              />
              <p>Đặt hàng online, giao hàng COD toàn quốc</p>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
}

export default memo(DetailProduct);
