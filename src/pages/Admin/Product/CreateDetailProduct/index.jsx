/* eslint-disable */
import React from "react";
import { useEffect, useState } from "react";
// import apiBrand from "../../../../apis/apiBrand";
import "./CreateDetailProduct.scss";
import {
  Stack,
  Button,
  Typography,
  TextField,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  InputBase,
} from "@mui/material";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import rev from "../../../../assets/img/product_le_han_quoc.jpg";
import SelectBoxAddress from "../../../../components/SelectBoxAddress";
import { useParams, useNavigate } from "react-router-dom";
import { productBrand } from "../../../../constraints/Product";

import apiCategory from "../../../../apis/apiCategory";
import apiProduct from "../../../../apis/apiProduct";
import LoadingPage from "../../../../components/LoadingPage";

function CreateDetailProduct(props) {
  const [review, setReview] = React.useState();
  const [img, setImg] = React.useState();
  const [edit, setEdit] = useState(props.edit);
  const [product, setProduct] = useState();
  const [name, setName] = useState("");
  const [category, setCategory] = useState();
  const [listCategory, setListCategory] = useState([]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const idProduct = useParams().id;

  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const getData = () => {
      apiCategory.showAllCategory().then((res) => {
        setListCategory(res.data.category);
      });
    };
    getData();
  }, []);

  // Change value of select box

  const onChangeImg = (e) => {
    setImg(e.target.files);
    console.log("img", e.target.files);
    for (let i = 0; i < img.length; i++) {
      formData.append(`files`, img[i]);
    }
    // if (e.target.files.length > 0) {
    //   setReview(URL.createObjectURL(e.target.files[0]));

    // }
  };

  const handleInsert = async () => {
    setLoadingData(true);
    try {
      const params = {
        name: name,
        description: description,
        price: price,
        stock: quantity,
        cate_id: category,
        brand_id: brand.toString(),
      };

      console.log("pp", params);

      if (!(name && category && quantity && price && brand && description)) {
        toast.warning("Vui lòng nhập đầy đủ thông tin !!");
        return;
      } else {
        const idProductInsert = await apiProduct
          .insertProduct(params)
          .then((res) => {
            return res.data.product_id;
          });

        const formData = new FormData();
        if(img){
          for (let i = 0; i < img.length; i++) {
            formData.append(`files`, img[i]);
          }
          await apiProduct.uploadImg(formData, idProductInsert);
        }
        setName("");
        setCategory("");
        setQuantity("");
        setPrice("");
        setBrand("");
        setDescription("");
        setLoadingData(false);
        toast.success("Thêm sản phẩm thành công");
      }
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại!");
    }
  };

  const handleUpdate = async () => {
    setLoadingData(true);
    try {
      const params = {
        name: name,
        description: description,
        price: price,
        stock: quantity,
        cate_id: category,
        brand_id: brand.toString(),
      };
      if (!(name && category && quantity && price && brand && description)) {
        toast.warning("Vui lòng nhập đầy đủ thông tin !!");
        return;
      } else {
        await apiProduct.updateProduct(params, idProduct);

        const formData = new FormData();
       
        if (img) {
          for (let i = 0; i < img.length; i++) {
            formData.append(`files`, img[i]);
          }
          await apiProduct.uploadImg(formData, idProduct);
        }
        setLoadingData(false);
        toast.success("Sửa sản phẩm thành công");
      }
    } catch (error) {
      toast.error("Sửa sản phẩm thất bại!");
    }
  };

  // get data for a particular product

  // Set thông tin cho product detail
  useEffect(() => {
    const loaddata = () => {
      if (edit === true) {
        apiProduct.getProductsById(idProduct).then((res) => {
          const product = res.data.product;
          console.log("p", product);
          if (product) {
            setName(product.name);
            setPrice(product.price);
            setCategory(product.productCategory.id);
            setQuantity(product.stock);
            setDescription(product.description);
            setBrand(product.brand.id);
          }
        });
      }
    };
    loaddata();
  }, [edit]);

  return (
    <Box width={"100%"} bgcolor="#fff">
      {loadingData ? (
        <LoadingPage />
      ) : (
        <Stack
          className="cruBrand"
          p={3}
          justifyContent="center"
          width="700px"
          spacing={2}
          bgcolor="#fff"
        >
          <Stack direction="row">
            <Typography className="cruBrand__label">Tên sản phẩm</Typography>
            <TextField
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              size="small"
              id="outlined-basic"
              variant="outlined"
              sx={{ flex: "1" }}
            />
          </Stack>
          <Stack direction="row">
            <Typography className="cruBrand__label">Giá</Typography>
            <TextField
              value={price}
              onChange={(event) => {
                setPrice(Number(event.target.value));
              }}
              size="small"
              id="outlined-basic"
              variant="outlined"
              sx={{ flex: "1" }}
            />
          </Stack>
          <Stack direction="row">
            <Typography className="cruBrand__label">Danh mục</Typography>
            <FormControl className="create-address__input" sx={{ flex: "1" }}>
              <Select
                size="small"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={category}
                label="Age"
                onChange={(e) => setCategory(e.target.value)}
                input={<InputCustom placeholder="Chọn đơn vị" />}
              >
                {listCategory?.map((item) =>
                  item.subCategories.map((itemSub) => (
                    <MenuItem value={itemSub.id}>{itemSub.name}</MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row">
            <Typography className="cruBrand__label">Số lượng</Typography>
            <TextField
              value={quantity}
              onChange={(event) => {
                setQuantity(Number(event.target.value));
              }}
              size="small"
              id="outlined-basic"
              variant="outlined"
              sx={{ flex: "1" }}
            />
          </Stack>

          <Stack direction="row">
            <Typography className="cruBrand__label">Mô Tả</Typography>
            <TextField
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              size="small"
              id="outlined-basic"
              variant="outlined"
              sx={{ flex: "1" }}
            />
          </Stack>

          <Stack direction="row">
            <Typography className="cruBrand__label">Thương hiệu:</Typography>
            <FormControl className="create-address__input" sx={{ flex: "1" }}>
              <Select
                size="small"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={brand}
                label="Age"
                onChange={(e) => setBrand(e.target.value)}
                input={<InputCustom placeholder="Chọn đơn vị" />}
              >
                {productBrand?.map((item) => (
                  <MenuItem value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" p={2}>
            <Typography className="cruBrand__label">Thêm ảnh</Typography>
            <Stack>
              <img src={review} width="210px" height="210px" alt="" />
              <input
                multiple
                type="file"
                id="myfile"
                name="myfile"
                onChange={onChangeImg}
              ></input>
            </Stack>
          </Stack>

          <Stack justifyContent="center">
            <Button
              width="450px"
              variant="contained"
              onClick={edit ? handleUpdate : handleInsert}
            >
              {edit ? "Cập nhật" : "Thêm"}
            </Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}

const InputCustom = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    boxSizing: "border-box",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    display: "flex",
    height: "40px !important",
    padding: "0px 26px 0px 12px",
    alignItems: "center",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#1890ff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

export default CreateDetailProduct;
