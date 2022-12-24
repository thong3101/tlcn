import {
  Box,
  Button, Collapse, FormControl, FormGroup,
  Grid, IconButton, Input, List, ListItemButton,
  ListItemText, NativeSelect, Slider, Stack, Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiCategory from "../../apis/apiCategory";
import apiProduct from "../../apis/apiProduct";
import CardProduct from "../../components/CardProduct";
import { numWithCommas } from "../../constraints/Util";
import "./FilterProductSearch.scss";

import { ExpandLess, ExpandMore } from "@mui/icons-material";

import LoadingPage from "../../components/LoadingPage";

import SearchIcon from "@mui/icons-material/Search";


function FilterProduct(props) {
  const search = useParams().key;

  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const [products, setProducts] = useState();
  const [categories, setCategories] = useState([]);

  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState();

  const [value, setValue] = useState(1);
  const [filter, setFilter] = useState({});
  const [filterPrice, setFilterPrice] = useState({
    minPrice: "",
    maxPrice: "",
    apply: false,
    value: "",
  });

  //Filter change price
  const [valueFilterPrice, setValueFilterPrice] = React.useState([
    295000, 7500000,
  ]);

  const [loadingData, setLoadingData] = useState(false);

  const onChangeSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleSubmitSearch = () => {
    // let obj = {
    //   text: searchText,
    //   slug: searchText.replace(/\s/g, "-"),
    // };
    // handleSaveSearch(obj);
    navigate(`/search/${searchText}`);
  };

  useEffect(() => {
    const getData = async () => {
      setLoadingData(true);
      let param = {
        page: 0,
        size: 6,
        min_price: 0,
        max_price: 10000000,
      };

      if (filterPrice.apply) {
        param = {
          ...param,
          min_price: filterPrice.minPrice,
          max_price: filterPrice.maxPrice,
        };
      }
      switch (value) {
        case 1: {
          break;
        }
        case 3: {
          param = { ...param, sort: "product_id" };
          break;
        }
        case 4: {
          param = { ...param, sort: "price_asc" };
          break;
        }
        case 5: {
          param = { ...param, sort: "price_desc" };
          break;
        }
        default: {
          break;
        }
      }

      apiProduct
        .getProductsSearch(param, search)
        .then((res) => {
          setProducts(res.data.list);
        })
        .catch((error) => {
          setProducts(null);
        })
        .finally(() => {
          setLoadingData(false);
        });

      console.log("111", param);
    };
    getData();
  }, [search, filter, filterPrice.apply, value]);

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

  const handleChangeFilterPrice = (event, newValue) => {
    setValueFilterPrice(newValue);
    setFilterPrice({
      ...filterPrice,
      minPrice: newValue[0],
      maxPrice: newValue[1],
    });
  };

  const handleOpen = (id) => {
    if(openId!==id){
      setOpenId(id);
      setOpen(true);
    }else{
      setOpen(!open);
    }
   
  };

  const handleClickCategory = (id) => {
    navigate(`/product-category/${id}`);
  };

  const handleChange = (event) => {
    setValue(Number(event.target.value));
  };

  const handleApplyFilterPrice = () => {
    setFilterPrice((pre) => {
      return { ...pre, apply: !pre.apply };
    });
  };

  console.log("33", products);

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
          <Box sx={{ flex: 1 }} className="header__search">
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                padding: "0",
                height: "40px",
                flex: 1,
                position: "relative",
              }}
            >
              <Input
                style={{ height: "100%", flex: 1 }}
                id="input-search"
                placeholder="Tìm kiếm ..."
                value={searchText}
                onChange={onChangeSearch}
                debounceTimeout={500}
              />
              <IconButton
                sx={{
                  height: "100%",
                  width: "2rem",
                  backgroundColor: "#f4ba36",
                  borderRadius: "0",
                }}
                variant="contained"
                onClick={() => handleSubmitSearch(searchText)}
              >
                <SearchIcon />
              </IconButton>
            </Stack>
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
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
          >
            {categories.map((item) => (
              <React.Fragment>
                <ListItemButton
                  onClick={()=>{
                    handleOpen(item?.id)
                  }}
                  key={item.id}
                  // onClick={()=>{handleClickCategory(item?.id)}}
                  // onClick={() => refreshPage()}
                  sx={{ padding: "6px" }} 
                >
                  <ListItemText primary={item?.name} onClick={()=>{
                    handleClickCategory(item?.id)
                  }} />
                  {openId===item?.id&&open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openId===item?.id&&open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item?.subCategories.map((item) => (
                      <ListItemButton sx={{ pl: 4 }} key={item?.id} 
                      onClick={()=>{
                        handleClickCategory(item?.id)
                      }}>
                        <ListItemText primary={item?.name} 
                        
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
            
          </List>
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
                disabled={filterPrice.apply}
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
                onClick={handleApplyFilterPrice}
              >
                {filterPrice.apply ? "Huỷ" : "Lọc sản phẩm"}
              </Button>
              <Typography sx={{ fontSize: "12px" }}>
                Giá: {numWithCommas(valueFilterPrice[0])} đ -{" "}
                {numWithCommas(valueFilterPrice[1])} đ
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
              Tìm kiếm với từ khóa : {search}
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
          {loadingData ? (
            <LoadingPage />
          ) : (
            <Grid container spacing={2}>
              {(value === 2
                ? products?.sort((a, b) => b.sellAmount - a.sellAmount)
                : products
              )?.map((item) => (
                <Grid key={item.id} item xs={3}>
                  <CardProduct data={item} />
                </Grid>
              ))}
            </Grid>
          )}
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
    name: "Mặc định",
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
