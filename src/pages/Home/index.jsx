import { Box, Button, Card, CardMedia, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Home.scss";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper";

//import icons
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import DoneIcon from "@mui/icons-material/Done";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import StarIcon from "@mui/icons-material/Star";

//import component
import CardCategory from "../../components/CardCategory";
import CardProduct from "../../components/CardProduct";

import apiCategory from "../../apis/apiCategory";

//import img

// styles swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import apiMain from "../../apis/apiMain";

function Home() {

  return (
    <Stack spacing={2} className="home">
      <Box id="section1">
        <SlideBackGround />
      </Box>
      <Box id="section2">
        <SlideHome />
      </Box>
    </Stack>
  );
}

function SlideBackGround() {
  const navigate = useNavigate();

  return (
    <>
      <Swiper
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        slidesPerView={1}
        id="slider-home"
        className="mySwiper "
      >
        <SwiperSlide key={1}>
          <div className="bg bg1"></div>
          <div className="text-content">
            <h3 className="text-heading" style={{ textTransform: "uppercase" }}>
              Đàn Kalimba xinh xắn, giá rẻ và cực kỳ dễ chơi
            </h3>
            <h4 className="text-description">Giá chỉ từ 390,000đ</h4>
            <p style={{ margin: "25px 0" }}>
              <Box
                sx={{
                  margin: "0 40%",
                  alignItems: "center",
                }}
              >
                <Button
                  sx={{
                    border: "2px solid currentColor",
                    width: "100%",
                    color: "#ffffff",
                    // textTransform:"uppercase",
                    fontSize: "20px",
                    "&:hover": {
                      backgroundColor: "#fff",
                      borderColor: "#fff",
                      color: "#666",
                    },
                  }}
                  onClick={() => navigate("/")}
                >
                  Mua ngay
                </Button>
              </Box>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide key={2}>
          <div className="bg bg2"></div>
          <div className="text-content">
            <h2
              className="text-heading"
              style={{ lineHeight: "60px", textTransform: "uppercase" }}
            >
              Mua đàn guitar trực tuyến, uy tín, tiện lợi
            </h2>
            <p>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={3}
              >
                <Button
                  sx={{
                    border: "2px solid currentColor",
                    color: "#fff",
                    fontSize: "20px",
                    // textTransform: "uppercase",
                    "&:hover": {
                      backgroundColor: "#fff",
                      borderColor: "#fff",
                      color: "#666",
                    },
                  }}
                >
                  Hướng dẫn chọn đàn guitar
                </Button>
                <Button
                  sx={{
                    border: "2px solid currentColor",
                    color: "#fff",
                    fontSize: "20px",
                    // textTransform: "uppercase",
                    "&:hover": {
                      backgroundColor: "#fff",
                      borderColor: "#fff",
                      color: "#666",
                    },
                  }}
                >
                  Mua đàn guitar
                </Button>
              </Stack>
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

function SlideHome() {
  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    console.log(categories);
    const getData = async () => {
      apiCategory
        .showAllCategoryHeader()
        .then((res) => {
          setCategories(res.data.category);
        })
        .catch((error) => {
          setCategories([]);
        });
    };
    getData();
  }, []);

  useEffect(() => {
    let params = {
      page: 0,
      size: 20,
    };
    const getData = async () => {
      const response = await apiMain.getProducts(params);
      if (response) {
        setProducts(response.data.list.filter((item)=> item.status==true));
      }
    };
    getData();
  }, []);

  return (
    <>
      <section className="section" id="section_1">
        <div className="section-content">
          {/* introduce */}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0}
            sx={{
              maxWidth: "1170px",
              width: "100%",
              margin: "0 175px",
            }}
          >
            {/* Box1 */}
            <Box
              sx={{
                position: "relative",
                margin: "0",
                padding: "0 15px 30px",
                width: "100%",
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
              >
                <div
                  style={{
                    width: "42px",
                    height: "44px",
                    position: "relative",
                    marginBottom: "0",
                    maxWidth: "200px",
                  }}
                >
                  <div className="icon-box">
                    <LocalShippingIcon
                      sx={{
                        position: "absolute",
                        left: "0",
                        objectFit: "cover",
                        padding: "0",
                        top: "20%",
                        left: "20%",
                        margin: "0",
                      }}
                    ></LocalShippingIcon>
                  </div>
                </div>
                <div className="icon-text">
                  <p
                    style={{
                      lineHeight: "22px",
                      fontSize: "16px",
                    }}
                  >
                    {"Miễn phí vận chuyển toàn quốc cho đơn hàng phụ kiện từ "}
                    <strong>299,000đ</strong>
                  </p>
                </div>
              </Stack>
            </Box>

            {/* Box2 */}

            <Box
              sx={{
                position: "relative",
                margin: "0",
                padding: "0 15px 30px",
                width: "100%",
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
              >
                <div
                  style={{
                    width: "42px",
                    height: "44px",
                    position: "relative",
                    marginBottom: "0",
                    maxWidth: "200px",
                  }}
                >
                  <div className="icon-box">
                    <CardGiftcardIcon
                      sx={{
                        position: "absolute",
                        left: "0",
                        objectFit: "cover",
                        padding: "0",
                        top: "20%",
                        left: "20%",
                        margin: "0",
                      }}
                    ></CardGiftcardIcon>
                  </div>
                </div>
                <div className="icon-text">
                  <p
                    style={{
                      lineHeight: "22px",
                    }}
                  >
                    Tặng bộ phụ kiện hấp dẫn khi mua đàn guitar, bảo trì trọn
                    đời
                  </p>
                </div>
              </Stack>
            </Box>

            {/* Box3 */}

            <Box
              sx={{
                position: "relative",
                margin: "0",
                padding: "0 15px 30px",
                width: "100%",
              }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
              >
                <div
                  style={{
                    width: "42px",
                    height: "44px",
                    position: "relative",
                    marginBottom: "0",
                    maxWidth: "200px",
                  }}
                >
                  <div className="icon-box">
                    <PriceCheckIcon
                      sx={{
                        position: "absolute",
                        left: "0",
                        objectFit: "cover",
                        padding: "0",
                        top: "20%",
                        left: "20%",
                        margin: "0",
                      }}
                    ></PriceCheckIcon>
                  </div>
                </div>
                <div className="icon-text">
                  <p
                    style={{
                      lineHeight: "22px",
                    }}
                  >
                    Đặt hàng online nhanh chóng, tiện lợi, thanh toán sau khi
                    nhận hàng
                  </p>
                </div>
              </Stack>
            </Box>
          </Stack>

          {/* top product */}

          <Box
            sx={{
              maxWidth: "1170px",
              width: "100%",
              margin: "0 175px",
              padding: "0px 15px 30px",
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                marginBottom: "20px",
              }}
            >
              <h2 className="section-title">
                <b></b>
                <span className="section-title-main">
                  <StarIcon sx={{ marginRight: "12px" }}></StarIcon>
                  {"Top sản phẩm bán chạy"}
                </span>
                <b></b>
              </h2>
            </Stack>

            <Swiper
              slidesPerView={4}
              spaceBetween={0}
              slidesPerGroup={4}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {products
                .sort((a, b) => b.sellAmount - a.sellAmount)
                .map((item) => (
                  <SwiperSlide key={`${item.id}`}>
                    <CardProduct key={item.id} data={item} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </Box>

          {/* saleProduct */}

          <Box
            sx={{
              maxWidth: "1170px",
              width: "100%",
              margin: "0 175px",
              padding: "0px 15px 30px",
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                marginBottom: "20px",
              }}
            >
              <h2 className="section-title">
                <b></b>
                <span className="section-title-main">
                  <CardGiftcardIcon
                    sx={{ marginRight: "12px" }}
                  ></CardGiftcardIcon>
                  {"Sale hấp dẫn"}
                </span>
                <b></b>
              </h2>
            </Stack>

            <Swiper
              slidesPerView={4}
              spaceBetween={0}
              slidesPerGroup={4}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {products.map((item) => (
                <SwiperSlide key={`${item.id}`}>
                  <CardProduct key={item.id} data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>

          {/* Category */}
          <Box
            sx={{
              maxWidth: "1170px",
              width: "100%",
              margin: "0 175px",
              padding: "0px 15px 30px",
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                marginBottom: "20px",
              }}
            >
              <h2 className="section-title">
                <b></b>
                <span className="section-title-main">
                  <DoneIcon sx={{ marginRight: "12px" }}></DoneIcon>
                  {"Top danh mục"}
                </span>
                <b></b>
              </h2>
            </Stack>

            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              slidesPerGroup={4}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {categories?.map((item) => (
                <SwiperSlide key={`${item.id}`}>
                  <CardCategory key={item.id} data={item} />
                </SwiperSlide>
              ))}
              {/* <SwiperSlide>
                <CardCategory />
              </SwiperSlide>
              <SwiperSlide>
                <CardCategory />
              </SwiperSlide>
              <SwiperSlide>
                <CardCategory />
              </SwiperSlide>
              <SwiperSlide>
                <CardCategory />
              </SwiperSlide>
              <SwiperSlide>
                <CardCategory />
              </SwiperSlide>
              <SwiperSlide>
                <CardCategory />
              </SwiperSlide>
              <SwiperSlide>
                <CardCategory />
              </SwiperSlide>
              <SwiperSlide>
                <CardCategory />
              </SwiperSlide> */}
            </Swiper>
          </Box>

          {/* guide */}

          <Box
            sx={{
              maxWidth: "1170px",
              width: "100%",
              margin: "0 175px",
              padding: "0px 15px 30px",
            }}
          >
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                marginBottom: "20px",
              }}
            >
              <h2 className="section-title">
                <b></b>
                <span className="section-title-main">
                  {"Hướng dẫn chơi đàn"}
                </span>
                <b></b>
              </h2>
            </Stack>

            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              slidesPerGroup={3}
              loop={true}
              loopFillGroupWithBlank={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide key={10}>
                <a
                  href="https://guitar.station.vn/3-cach-chinh-day-dan-guitar/"
                  className="card__wrap"
                  style={{
                    width: "260px",
                  }}
                >
                  <Card className="card" sx={{ boxShadow: "none" }}>
                    <div className="card__category">
                      <div className="card__category_title">
                        <h5
                          style={{ fontWeight: "400", letterSpacing: ".05em" }}
                        >
                          3 Cách Chỉnh Dây Đàn Guitar Cho Người Mới Tập
                        </h5>
                      </div>
                    </div>
                    <CardMedia
                      component="img"
                      image="https://guitar.station.vn/wp-content/uploads/2017/03/tuning-guitar-to-CGCGCE-225x150.jpg"
                      sx={{ borderRadius: "2%", minHeight: "300px" }}
                    />
                  </Card>
                </a>
              </SwiperSlide>
              <SwiperSlide key={11}>
                <a
                  href="https://guitar.station.vn/3-meo-don-gian-nhat-de-hoc-hop-am-guitar/"
                  className="card__wrap"
                  to={`/`}
                  style={{
                    width: "260px",
                  }}
                >
                  <Card className="card" sx={{ boxShadow: "none" }}>
                    <div className="card__category">
                      <div className="card__category_title">
                        <h5
                          style={{ fontWeight: "400", letterSpacing: ".05em" }}
                        >
                          3 mẹo đơn giản khiến bạn học hợp âm guitar tiến bộ
                        </h5>
                      </div>
                    </div>
                    <CardMedia
                      component="img"
                      image="https://guitar.station.vn/wp-content/uploads/2016/06/meo-hoc-hop-am-guitar-500x282.jpg"
                      sx={{ borderRadius: "2%", minHeight: "300px" }}
                    />
                  </Card>
                </a>
              </SwiperSlide>
              <SwiperSlide key={12}>
                <a
                  href="https://guitar.station.vn/huong-dan-cach-chon-mot-cay-dan-guitar-acoustic-tot/"
                  className="card__wrap"
                  to={`/`}
                  style={{
                    width: "260px",
                  }}
                >
                  <Card className="card" sx={{ boxShadow: "none" }}>
                    <div className="card__category">
                      <div className="card__category_title">
                        <h5
                          style={{ fontWeight: "400", letterSpacing: ".05em" }}
                        >
                          Hướng dẫn cách chọn một cây guitar acoustic tốt
                        </h5>
                      </div>
                    </div>
                    <CardMedia
                      component="img"
                      image="https://guitar.station.vn/wp-content/uploads/2016/04/cach-chuyen-hop-am-nhanh-225x150.jpg"
                      sx={{ borderRadius: "2%", minHeight: "300px" }}
                    />
                  </Card>
                </a>
              </SwiperSlide>
              <SwiperSlide key={13}>
                <a
                  href="https://guitar.station.vn/nen-chon-mua-dan-guitar-go-nguyen-mieng-hay-go-ep/"
                  className="card__wrap"
                  to={`/`}
                  style={{
                    width: "260px",
                  }}
                >
                  <Card className="card" sx={{ boxShadow: "none" }}>
                    <div className="card__category">
                      <div className="card__category_title">
                        <h5
                          style={{ fontWeight: "400", letterSpacing: ".05em" }}
                        >
                          Có nên chọn đàn guitar gỗ ép ?
                        </h5>
                      </div>
                    </div>
                    <CardMedia
                      component="img"
                      image="https://guitar.station.vn/wp-content/uploads/2016/05/Best-Acoustic-Guitar-1024x677-227x150.jpg"
                      sx={{ borderRadius: "2%", minHeight: "300px" }}
                    />
                  </Card>
                </a>
              </SwiperSlide>
              <SwiperSlide key={14}>
                <a
                  href="https://guitar.station.vn/5-cach-tu-hoc-guitar-tai-nha-nhanh-tien-bo-nhat/"
                  className="card__wrap"
                  to={`/`}
                  style={{
                    width: "260px",
                  }}
                >
                  <Card className="card" sx={{ boxShadow: "none" }}>
                    <div className="card__category">
                      <div className="card__category_title">
                        <h5
                          style={{ fontWeight: "400", letterSpacing: ".05em" }}
                        >
                          5 cách tự học đàn guitar tại nhà nhanh tiến bộ
                        </h5>
                      </div>
                    </div>
                    <CardMedia
                      component="img"
                      image="https://guitar.station.vn/wp-content/uploads/2016/02/tu-hoc-dan-guitar-tai-nha-250x141.jpg"
                      sx={{ borderRadius: "2%", minHeight: "300px" }}
                    />
                  </Card>
                </a>
              </SwiperSlide>
            </Swiper>
          </Box>
        </div>
      </section>
    </>
  );
}

export default Home;
