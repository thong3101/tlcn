/* eslint-disable */
import React, { useEffect, useState } from "react";
// import apiBrand from "../../../../apis/apiBrand";
import {
  Autocomplete, Box, Button, FormControl, ImageList,
  ImageListItem, InputBase, MenuItem, Select, Stack, TextField, Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { productBrand } from "../../../../constraints/Product";
import "./CreateDetailProduct.scss";

import apiCategory from "../../../../apis/apiCategory";
import apiProductSeller from "../../../../apis/apiProductSeller";
import apiProduct from "../../../../apis/apiProduct";
import LoadingPage from "../../../../components/LoadingPage";

import { useSelector } from "react-redux";

function CreateDetailProduct(props) {
  const [review, setReview] = React.useState([]);
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

  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const getData = () => {
      apiProductSeller.showCategory().then((res) => {
        setListCategory(res.data.category);
      });
    };
    getData();
  }, []);

  console.log("1",listCategory)

  // Change value of select box

  const onChangeImg = (e) => {
    setImg(e.target.files);
   
    if (e.target.files.length > 0) {
      setReview([...review,URL.createObjectURL(e.target.files[0])]);
      console.log("REVIEW",review[0])
    }
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
        seller_id: currentUser.id,
      };

      console.log("pp", params);

      if (!(name && category && quantity && price && brand && description)) {
        toast.warning("Vui lòng nhập đầy đủ thông tin !!");
        return;
      } else {
        const idProductInsert = await apiProductSeller
          .insertProductSeller(params)
          .then((res) => {
            return res.data.product_id;
          });

        const formData = new FormData();
        if (img) {
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
      setLoadingData(false);
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
        cate_id: category?.id?category.id:category,
        brand_id: brand.toString(),
        seller_id: currentUser.id,
      };
      if (!(name && category && quantity && price && brand && description)) {
        toast.warning("Vui lòng nhập đầy đủ thông tin !!");
        return;
      } else {
        await apiProductSeller.updateProduct(params, idProduct).then((res) => {
          console.log("res", res);
        });

        const formData = new FormData();

        if (img) {
          for (let i = 0; i < img.length; i++) {
            formData.append(`files`, img[i]);
          }
          await apiProduct.uploadImg(formData, idProduct);
        }
        setLoadingData(false);
        toast.success("Sửa sản phẩm thành công");
        navigate("/seller/product");
      }
    } catch (error) {
      setLoadingData(false);
      toast.error("Sửa sản phẩm thất bại!");
    }
  };

  // get data for a particular product

  // Set thông tin cho product detail
  useEffect(() => {
    const loaddata = () => {
      if (edit === true) {
        setLoadingData(true);
        apiProduct.getProductsById(idProduct).then((res) => {
          setLoadingData(false);
          const product = res.data.product;
          console.log("p", product);
          if (product) {
            setName(product.name);
            setPrice(product.price);
            setCategory(product.productCategory);
            setQuantity(product.stock);
            setDescription(product.description);
            setBrand(product.brand.id);
            setReview(product.imageList);
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
              {/* <Select
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
              </Select> */}
              <Autocomplete
                // value={category||null}
                defaultValue={category||null}
                size="small"
                id="combo-box"
                disablePortal
                options={listCategory?.map((item) => item.subCategories.sort((itemSub) => itemSub)).flat()}
                
                getOptionLabel={(option) => `${option.name}`}
                onChange={(event, newValue) => {
                  setCategory(newValue.id);
                }}
              
                renderInput={(params) => (
                  <TextField
                    {...params}
                  />
                )}
              />
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
              {/* {review?.map((item) => {
                <img src={item.url} width="210px" height="210px" alt="" />;
              })} */}
              <ImageList
                sx={{ width: 500, height: 200 }}
                cols={3}
                rowHeight={164}
              >
                {review?.map((item) => (
                  <ImageListItem key={item.id}>
                    <img
                      src={item}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
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
