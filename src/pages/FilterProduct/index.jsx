import { useState, useEffect, useCallback } from "react";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Stack,
  Box,
  Button,
  Typography,
  Checkbox,
  FormGroup,
  Grid,
  Rating,
  Tab,
  RadioGroup,
  Tabs,
  Radio,
  Slider,
  FormControl,
  NativeSelect,
} from "@mui/material";
import "./FilterProduct.scss";
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { numWithCommas } from "../../constraints/Util";
import CardProduct from "../../components/CardProduct";
import apiProduct from "../../apis/apiProduct";
import apiCategory from "../../apis/apiCategory";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import SearchBar from "../../components/SearchBar";
import { fontSize } from "@mui/system";

function FilterProduct(props) {
  const idCategory = useParams().id;
  // const slugCategory = useParams().slug;
  // const [category, setCategory] = useState(null);

  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  // const [categoryChild, setCategoryChild] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [page, setPage] = useState(0);
  // const [test, setTest] = useState([1,2,3]);
  // const [filter, setFilter] = useState({});

  // const [productFilter, setProductFilter] = useState([]);

  // const navigate = useNavigate();
  // const size = 30;
  // const sort = "product_id";

  useEffect(() => {
    const getData = async () => {
      let param = {
        id: idCategory,
        page:0,
        sort:"product_id",
        min_price:0,
        max_price:10000000,
      }
      apiProduct
        .getProductsByCateId(param)
        .then((res) => {
          setProducts(res.data.list);
        })
        .catch((error) => {
          setProducts(null);
        });
    };
    getData();
  }, [idCategory]);

  useEffect(() => {
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

  // useEffect(() => {
  //   const getData = async () => {
  //     let params = {
  //       page: page,
  //       size: size,
  //       idCategory: idCategory,
  //       sort: sort,
  //     };
  //     if (category) {
  //       const response = await apiProduct.getProductByCategory(params);
  //       if (response) {
  //         setProducts(response.data.listProduct);
  //       }
  //     }
  //   };
  //   getData();
  // }, [page, category]);

  // useEffect(() => {
  //   const getData = async () => {
  //     let params = {
  //       parentId: idCategory,
  //     };
  //     if (category) {
  //       const response = await apiProduct.getCategoryChild(params);
  //       if (response) {
  //         setCategoryChild(response.data);
  //       }
  //     }
  //   };
  //   getData();
  // }, [page, category]);

  // useEffect(() => {
  //   const filterData = () => {
  //     if (!category) return;
  //     let data = [...products];
  //     switch (value) {
  //       case 1: {
  //         const getData = async () => {
  //           let param = {
  //             idCategory: idCategory,
  //             page: page,
  //             size: size,
  //             sort: "product_sell_amount",
  //           };
  //           apiProduct
  //             .getProductByCategory(param)
  //             .then((res) => {
  //               data = res.data.listProduct;
  //               setProductFilter(data);
  //               console.log("res data: ", data);
  //             })
  //             .catch((err) => console.log(err));
  //         };
  //         getData();
  //         break;
  //       }
  //       case 2: {
  //         const getData = async () => {
  //           let param = {
  //             idCategory: idCategory,
  //             page: page,
  //             size: size,
  //             sort: "create_at",
  //           };
  //           apiProduct
  //             .getProductByCategory(param)
  //             .then((res) => {
  //               data = res.data.listProduct;
  //               setProductFilter(data);
  //               console.log("res data: ", data);
  //             })
  //             .catch((err) => console.log(err));
  //         };
  //         getData();
  //         break;
  //       }
  //       case 3: {
  //         const getData = async () => {
  //           let param = {
  //             idCategory: idCategory,
  //             page: page,
  //             size: size,
  //             sort: "product_price_down",
  //           };
  //           apiProduct
  //             .getProductByCategory(param)
  //             .then((res) => {
  //               data = res.data.listProduct;
  //               setProductFilter(data);
  //               console.log("res data: ", data);
  //             })
  //             .catch((err) => console.log(err));
  //         };
  //         getData();
  //         break;
  //       }
  //       case 4: {
  //         const getData = async () => {
  //           let param = {
  //             idCategory: idCategory,
  //             page: page,
  //             size: size,
  //             sort: "product_price_up",
  //           };
  //           apiProduct
  //             .getProductByCategory(param)
  //             .then((res) => {
  //               data = res.data.listProduct;
  //               setProductFilter(data);
  //               console.log("res data: ", data);
  //             })
  //             .catch((err) => console.log(err));
  //         };
  //         getData();
  //         break;
  //       }
  //       default: {
  //         const getData = async () => {
  //           let param = {
  //             idCategory: idCategory,
  //             page: page,
  //             size: size,
  //             sort: "product_id",
  //           };
  //           apiProduct
  //             .getProductByCategory(param)
  //             .then((res) => {
  //               data = res.data.listProduct;
  //               setProductFilter(data);
  //               console.log("res data: ", data);
  //             })
  //             .catch((err) => console.log(err));
  //         };
  //         getData();
  //         break;
  //       }
  //     }
  //     setProductFilter(data);
  //   };

  //   filterData();
  // }, [products, filter, category, filterPrice, value]);

  //Filter change price
  const [valueFilterPrice, setValueFilterPrice] = React.useState([
    295000, 7500000,
  ]);

  const handleChangeFilterPrice = (event, newValue) => {
    setValueFilterPrice(newValue);
  };

  // const onSetFilterPrice = (value, index) => {
  //   setFilterPrice((pre) => {
  //     return {
  //       ...pre,
  //       option: index,
  //       value: value,
  //     };
  //   });
  // };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const onChangeFilter = useCallback(
  //   (e, propertyName) => {
  //     let property = filter[propertyName] || [];
  //     if (e.target.checked) {
  //       property = [...property, e.target.name];
  //     } else property = property.filter((item) => item !== e.target.name);

  //     setFilter((filter) => {
  //       return {
  //         ...filter,
  //         [propertyName]: [...property],
  //       };
  //     });

  //     console.log({
  //       ...filter,
  //       [propertyName]: [...property],
  //     });
  //   },
  //   [filter]
  // );
  // const onChangeCategory = (rate) => {
  //   if (filter.rate === rate) {
  //     const newFilter = delete filter.rate;
  //     setFilter(newFilter);
  //   } else {
  //     setFilter({ ...filter, rate });
  //   }
  // };

  return (
    <Stack className="filterProduct container" direction="row" spacing={1}>
      <Stack className="filterProduct__sidebar" direction="column">
        <Box className="filterProduct__form">
          <Typography className="filterProduct__title">TÌM KIẾM</Typography>
          <Box
            sx={{
              backgroundColor: "#F4BA36",
              border: 0,
              height: "3px",
              margin: "7px 0",
              maxWidth: "30px",
              width: "100%",
            }}
          />
          <Box>
            <SearchBar />
          </Box>
        </Box>
        <Box className="filterProduct__form">
          <Typography className="filterProduct__title">
            DANH MỤC SẢN PHẨM
          </Typography>
          <Box
            sx={{
              backgroundColor: "#F4BA36",
              border: 0,
              height: "3px",
              margin: "7px 0",
              maxWidth: "30px",
              width: "100%",
            }}
          />
          <FormGroup>
            {categories.map((item) => (
              <Box
                key={item.id}
                onClick={() => refreshPage()}
                sx={{ padding: "6px" }}
              >
                <Link to={`/product-category/${item.id}`}>
                  <Box fontSize="14px">{item.name}</Box>
                </Link>
              </Box>
            ))}
          </FormGroup>
        </Box>
        <Box className="filterProduct__form">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>
              <Slider
                value={valueFilterPrice}
                onChange={handleChangeFilterPrice}
                // valueLabelDisplay="auto"
                min={295000}
                max={7500000}
                sx={{ color: "#666" }}
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                color="info"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#666",
                  color: "white",
                }}
              >
                Lọc sản phẩm
              </Button>
              <Typography sx={{ fontSize: "12px" }}>
                Giá: {numWithCommas(valueFilterPrice[0])} đ - {numWithCommas(valueFilterPrice[1])} đ
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="filterProduct__form">
          <Typography className="filterProduct__title">THƯƠNG HIỆU</Typography>
          <Box
            sx={{
              backgroundColor: "#F4BA36",
              border: 0,
              height: "3px",
              margin: "7px 0",
              maxWidth: "30px",
              width: "100%",
            }}
          />
          <FormGroup>
            {/* {categories.map((item) => (
              <Box
                key={item.id}
                onClick={() => refreshPage()}
                sx={{ padding: "6px" }}
              >
                <Link to={`/product-category/${item.id}`}>
                  <Box fontSize="14px">{item.name}</Box>
                </Link>
              </Box>
            ))} */}
          </FormGroup>
        </Box>
      </Stack>
      <Box sx={{ flex: 1 }}>
        {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="basic tabs example"
          >
            {tabs.map((item) => (
              <Tab
                key={item.id}
                label={item.name}
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
            ))}
          </Tabs>
        </Box> */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                padding: "14px 0",
                fontWeight: "500 !important",
                textTransform: "uppercase",
              }}
            >
              Category
            </Typography>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <NativeSelect
                value={value}
                onChange={handleChange}
                inputProps={{
                  name: "tabs",
                }}
              >
                {tabs.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </NativeSelect>
            </FormControl>
          </Box>
        </Stack>
        <Box>
          {/* <Grid container spacing={2}>
            {productFilter.map((item) => (
              <Grid key={item.id} item xs={3}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid> */}
          <Grid container spacing={2}>
            {products?.map((item) => (
              <Grid key={item.id} item xs={3}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
}

const refreshPage = () => {
  window.location.reload();
};
const tabs = [
  {
    id: 1,
    name: "Phổ biến",
  },
  {
    id: 2,
    name: "Bán chạy",
  },
  {
    id: 3,
    name: "Hàng mới",
  },
  {
    id: 4,
    name: "Giá thấp",
  },
  {
    id: 5,
    name: "Giá cao",
  },
];
export default FilterProduct;
