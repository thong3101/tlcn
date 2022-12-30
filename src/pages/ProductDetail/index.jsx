import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import { Box, Button, Rating } from "@mui/material";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import CardProduct from "../../components/CardProduct";
import "./ProductDetail.scss";
// styles swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import apiProduct from "../../apis/apiProduct";
// import required modules
import { Navigation, Pagination } from "swiper";
import apiComment from "../../apis/apiComment";
import apiMain from "../../apis/apiMain";
import Comment from "../../components/Comment";
import DetailProduct from "../../components/DetailProduct";

function ProductDetail() {
  const user = useSelector((state) => state.auth.user);
  const [product, setProduct] = useState();
  const { id } = useParams();

  const [listComment, setListComment] = useState([]);

  const [valueRating, setValueRating] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [isSave, setIsSave] = useState(false);

  const [comment, setComment] = useState();


  const [products, setProducts] = useState([]);

  useEffect(() => {
    let params = {
      page: 0,
      size: 8,
    };
    const getData = async () => {
      const response = await apiMain.getProducts(params);
      if (response) {
        setProducts(response.data.list);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getProduct = () => {
      apiProduct
        .getProductsById(id)
        .then((res) => {
          setProduct(res.data.product);
        })
        .catch((error) => {
          setProduct([]);
        });
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const getComment = () => {
      apiComment
        .getAllComment(id)
        .then((res) => {
          setListComment(res.data.rating);
        })
        .catch((error) => {
          setListComment([]);
        });
    };

    getComment();
  }, [id, isSave]);

  const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  };

  const handleSaveComment = () => {
    if (!user) {
      toast.warning("Vui lòng đăng nhập để đánh giá sản phẩm !!");
      return;
    }
    const params = {
      rating: valueRating,
      comment: comment,
    };

    if (!valueRating) {
      toast.warning("Vui lòng đánh giá sản phẩm !!");
      return;
    } else {
      apiComment
        .getSaveComment(id, params)
        .then((res) => {
          toast.success("Thêm đánh giá thành công");
          setIsSave(!isSave);
          setValueRating(0);
          setComment("");
        })
        .catch((error) => {
          toast.error("Thêm đánh giá thất bại!");
        });
    }
  };

  return (
    <Box className="container" style={{ backgroundColor: "#fff" }}>
      <DetailProduct data={product} rating={listComment} />

      <Box
        sx={{
          width: "100%",
          padding: "0px 15px 30px",
          borderTop: "1px solid #ECECEC",
        }}
      >
        <Box className="detailProduct__title">
          <h2>{"Top sản phẩm bán chạy"}</h2>
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
          {products
            .sort((a, b) => b.sellAmount - a.sellAmount)
            .map((item) => (
              <SwiperSlide key={`${item.id}`}>
                <CardProduct key={item.id} data={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
      <Comment data={listComment} />
      <Box className="textComment">
        <p>Đánh giá của bạn về sản phẩm </p>
        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
            margin: "10px 0px",
          }}
        >
          <Rating
            name="hover-feedback"
            value={valueRating}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValueRating(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {valueRating !== null && (
            <Box sx={{ ml: 2 }}>
              {labels[hover !== -1 ? hover : valueRating]}
            </Box>
          )}
        </Box>
        <TextField
          className="textComment__textarea"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
          multiline
          rows={4}
          placeholder="Nhập bình luận"
          sx={{ margin: "10px 0px" }}
        ></TextField>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            textTransform: "uppercase",
            fontWeight: "400",
          }}
          onClick={handleSaveComment}
        >
          GỬI
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          padding: "0px 15px 30px",
          borderTop: "1px solid #ECECEC",
        }}
      ></Box>
    </Box>
  );
}
export default ProductDetail;

const labels = {
  1: "Rất tệ",
  2: "Tệ",
  3: "Tốt",
  4: "Rất tốt",
  5: "Xuất sắc",
};
