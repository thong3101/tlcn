import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import imgDefault from '../../assets/img/img_default.jpg'

import {
  Rating,
  Button,
  Grid,
  Box,
  Stack,
  Typography,
  Modal,
  FormControlLabel,
  IconButton,
  Tooltip,
  Skeleton,

} from "@mui/material";
import {Pagination as PaginationMui} from "@mui/material";
import "./ProductDetail.scss";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import StarIcon from '@mui/icons-material/Star';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ButtonGroup from '@mui/material/ButtonGroup';
import { toast } from "react-toastify";
import QuantityButtons from "../../components/QuantityButtons";
import InfoIcon from '@mui/icons-material/Info';
import BookIcon from '@mui/icons-material/Book';
import FacebookIcon from '@mui/icons-material/Facebook';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Swiper, SwiperSlide } from "swiper/react";
import CardProduct from "../../components/CardProduct";
// styles swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import apiMain from "../../apis/apiMain";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";

function ProductDetail() {
    const list_cities = () => [
        { label: 'Ho Chi Minh', year: 1994 },
        { label: 'Ha Noi', year: 1972 },
        { label: 'Da Nang', year: 1974 },
        { label: 'Can Tho', year: 2008 },
        { label: 'Hai Phong', year: 1957 },
    ]
    return (
        <Box className= "container" style={{ backgroundColor: "#fff"}}>
            <Box className="detailProduct">
                <Box className="detailProduct__img">
                    <div className="detailProduct__primary-img">
                        <img alt="" src={imgDefault}></img>
                    </div>
                    <div className="detailProduct__list-img">
                        <img className="detailProduct__item-img" alt="" src={imgDefault}></img>
                        <img className="detailProduct__item-img" alt="" src={imgDefault}></img>
                        <img className="detailProduct__item-img" alt="" src={imgDefault}></img>
                        <img className="detailProduct__item-img" alt="" src={imgDefault}></img>
                    </div>
                </Box>
                <Box className="detailProduct__general">
                    <div className="detailProduct__info">
                        <h3>Capo Musedo – MC1</h3>
                        <div className="detailProduct__info-underline-title"></div>
                        <div className="detailProduct__info-price">
                            <h4 className="detailProduct__info-price-original">140,000 ₫</h4>
                            <h4 className="detailProduct__info-price-sale">119,000 ₫</h4>
                        </div>
                        <div className="detailProduct__info-rate">
                            <div className="detailProduct__info-rate-star">
                                <StarIcon sx={{ fontSize: 18 }}/>
                                <StarIcon sx={{ fontSize: 18 }}/>
                                <StarIcon sx={{ fontSize: 18 }}/>
                                <StarIcon sx={{ fontSize: 18 }}/>
                                <StarIcon sx={{ fontSize: 18 }}/>
                            </div>
                            <p> (5 đánh giá)  |  Đã bán 235</p>
                        </div>
                        <div className="detailProduct__info-shipping">
                            <p>
                                <LocalShippingIcon sx={{ fontSize: 20}}/>
                                <span> Bạn muốn vận chuyển đến?</span>
                            </p>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={list_cities()}
                                sx={{
                                    width: 220,
                                    fontSize: 18,
                                    my: 2
                                }}
                                renderInput={(params) => <TextField {...params} label="Chọn Tỉnh/ Thành phố" />}
                                />
                        </div>
                        <div className="detailProduct__quantity-info">
                            <QuantityButtons/>
                            <button className="detailProduct__add-to-cart" style={{ fontWeight: 600}}>THÊM VÀO GIỎ HÀNG</button>
                        </div>
                        <div className="detailProduct__info-guide">
                            <div style={{display: "flex", fontSize: "20px", lineHeight: "28px"}}>
                                <InfoIcon sx={{ fontSize: "20px", marginRight: "2px"}}/>
                                <p>Hướng dẫn cách đặt hàng trực tuyến</p>
                            </div>
                            <div style={{display: "flex", fontSize: "20px", lineHeight: "28px"}}>
                                <BookIcon sx={{ fontSize: "20px", marginRight: "2px"}}/>
                                <p>Câu hỏi thường gặp khi mua hàng</p>
                            </div>
                            <FacebookIcon sx={{
                                fontSize: "40px", 
                                marginTop: "20px",
                                cursor: "pointer"
                            }}/>
                        </div>
                    </div>
                    <div className="detailProduct__support">
                        <div className="detailProduct__support-box">
                            <div className="detailProduct__support-box-item">
                                <LocalShippingIcon sx={{
                                    width: "50px",
                                    height: "100%",
                                    marginRight: "15px"
                                }}/>
                                <p>Đặt hàng online, giao hàng COD toàn quốc</p>
                            </div>
                            <div className="detailProduct__support-box-item">
                                <VolunteerActivismIcon sx={{
                                    width: "50px",
                                    height: "100%",
                                    marginRight: "15px"
                                }}/>
                                <p>Đặt hàng online, giao hàng COD toàn quốc</p>
                            </div>
                            <div className="detailProduct__support-box-item">
                                <VolunteerActivismIcon sx={{
                                    width: "50px",
                                    height: "100%",
                                    marginRight: "15px"
                                }}/>
                                <p>Đặt hàng online, giao hàng COD toàn quốc</p>
                            </div>
                        </div>
                        <div className="detailProduct__support-box">
                        <div className="detailProduct__support-box-item">
                                <VolunteerActivismIcon sx={{
                                    width: "50px",
                                    height: "100%",
                                    marginRight: "15px"
                                }}/>
                                <p>Đặt hàng online, giao hàng COD toàn quốc</p>
                            </div>
                            <div className="detailProduct__support-box-item">
                                <VolunteerActivismIcon sx={{
                                    width: "50px",
                                    height: "100%",
                                    marginRight: "15px"
                                }}/>
                                <p>Đặt hàng online, giao hàng COD toàn quốc</p>
                            </div>
                        </div>
                    </div>
                </Box>
            </Box>

            <Box sx={{
              width: "100%",
              padding: "0px 15px 30px",
              borderTop: "1px solid #ECECEC"
            }}>
                <Box className="detailProduct__title">
                  <h2>
                      {"Top sản phẩm bán chạy"}
                  </h2>
                </Box>
              <Swiper
                slidesPerView={4}
                spaceBetween={0}
                slidesPerGroup={4}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                style={{ borderTop: "1px solid #ECECEC" }}
              >
                <SwiperSlide>
                  {/* <CardProduct data={item} /> */}
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
              </Swiper>
            </Box>
            <Box className="detailProduct__comment">
                <Box className="detailProduct__title">
                  <h2>
                      {"Top sản phẩm bán chạy"}
                  </h2>
                </Box>
                <Box className="detailProduct__comment-card">
                  <div className="detailProduct__comment-card-user">
                    <img src="https://secure.gravatar.com/avatar/f7c6b77bf377de274f6a06b9cf79fa95?s=60&d=mm&r=g" alt="" />
                    <div className="detailProduct__comment-card-user-info">
                      <h3>Nguyễn Ích Đạt</h3>
                      <h4>24/12/2017</h4>
                      <p>ad ơi phí ship đến Đan Phượng – Hà Nội là bao nhiêu đấy ad ???</p>
                    </div>
                  </div>
                  <div className="detailProduct__comment-card-user" style={{ padding: "0 15px 15px 15px", backgroundColor: "#F2F2F2", marginBottom: "22.5px" }}>
                    <img src="https://secure.gravatar.com/avatar/f7c6b77bf377de274f6a06b9cf79fa95?s=60&d=mm&r=g" alt="" />
                    <div className="detailProduct__comment-card-user-info">
                      <h3>Nguyễn Ích Đạt</h3>
                      <h4>24/12/2017</h4>
                      <p>ad ơi phí ship đến Đan Phượng – Hà Nội là bao nhiêu đấy ad ???</p>
                    </div>
                  </div>
                </Box>
                <Box className="detailProduct__comment-pagination">
                  <PaginationMui count={2} shape="rounded" sx={{ justifyContent: "center" }}/>
                </Box>
            </Box>
            <Box className="textComment">
                <p>Đánh giá của bạn về sản phẩm </p>
                <Box className="textComment__stars">
                  <Box className="textComment__stars-one">
                    <StarIcon sx={{ fontSize: 18 }}/>
                  </Box>
                  <Box className="textComment__stars-two">
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                  </Box>
                  <Box className="textComment__stars-three">
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                  </Box>
                  <Box className="textComment__stars-four">
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                  </Box>
                  <Box className="textComment__stars-five">
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                    <StarIcon sx={{ fontSize: 18 }}/>
                  </Box>
                </Box>
                <textarea className="textComment__textarea"/>
                <Button variant="contained" sx={{ backgroundColor: "black", textTransform: "uppercase", fontWeight: "400"}}>GỬI</Button>
            </Box>

            <Box sx={{
              width: "100%",
              padding: "0px 15px 30px",
              borderTop: "1px solid #ECECEC"
            }}>
                <Box className="detailProduct__title">
                  <h2>
                      {"Top sản phẩm bán chạy"}
                  </h2>
                </Box>
              <Swiper
                slidesPerView={4}
                spaceBetween={0}
                slidesPerGroup={4}
                loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                  clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                style={{ borderTop: "1px solid #ECECEC" }}
              >
                <SwiperSlide>
                  {/* <CardProduct data={item} /> */}
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
                <SwiperSlide>
                  <CardProduct />
                </SwiperSlide>
              </Swiper>
            </Box>
        </Box>
    );
}
export default ProductDetail;