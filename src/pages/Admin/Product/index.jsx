import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box, Button, FormControl, MenuItem, Modal, Pagination, Select, Stack, Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, TextField, Typography
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import apiProduct from "../../../apis/apiProduct";
import "./Product.scss";

import { toast } from "react-toastify";

function Product() {
  
  const [price, setPrice] = React.useState("");
  const [products, setProducts] = React.useState();
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(10);

  const [searchText, setSearchText] = React.useState("");

  

  const onChangeSearch = (event) => {
    setSearchText(event.target.value);
  };


  const size = 4;
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  console.log(products);

  React.useEffect(() => {
    const getData = async () => {
      let param = {
        size:"100",
        sort: "",
      };

      switch (price) {
        case 1: {
          param = { ...param, sort: "price_asc" };
          break;
        }
        case 2: {
          param = { ...param, sort: "price_desc" };
          break;
        }
        default: {
          break;
        }
      }

      if (searchText == "") {
        apiProduct
          .getAllProduct(param)
          .then((res) => {
            setProducts(res.data.list);
            setTotalPage(Math.ceil(res.data.list.length / size));
          })
          .catch((error) => {
            setProducts(null);
          });
      } else {
        apiProduct
          .getProductsSearch(param, searchText)
          .then((res) => {
            setProducts(res.data.list);
            setTotalPage(Math.ceil(res.data.list.length / size));
          })
          .catch((error) => {
            setProducts(null);
          });
      }

      console.log("pp", param);
    };
    getData();
  }, [price, searchText]);

  const lastPostIndex = page * size;
  const firstPostIndex = lastPostIndex - size;

  const handleChangePage = (event, newValue) => {
    setPage(newValue);
  };



  const [itemdelete, setItemdelete] = React.useState(null);
  const [modalDelete, setModalDelete] = React.useState(false);
  const openModalDelete = (itemdelete) => {
    setItemdelete(itemdelete)
    console.log(itemdelete)
    setModalDelete(true)
  }
  const closeModalDelete = () => {
    setModalDelete(false)
  }

  const handleDeleteProduct = () => {
    const product = products.filter(item => {
      return itemdelete.id !== item.id
    }
    )
    setProducts(product);
    closeModalDelete();
    apiProduct.deleteProduct(itemdelete.id)
      .then(res => {
        toast.success("Xóa thành công")
      })
      .catch(error => {
        toast.error("Xóa không thành công!")
      })
  }

  return (
    <>
      <Box className="productAdmin">
        <Stack
          direction="row"
          mb={1}
          justifyContent="space-between"
          alignItems="center"
          sx={{ backgroundColor: "#FFF", height: "80px" }}
          px={2}
        >
          <Typography>Quản lý sản phẩm</Typography>
          {/* <Link to="/admin/product/create">
            <Button variant="outlined" pr={2}>
              Tạo sản phẩm
            </Button>
          </Link> */}
        </Stack>

        <Box sx={{ backgroundColor: "#fff" }} p={2}>
          <Stack direction="column" sx={{}}>
            <FormControl
              sx={{
                m: 1,
                minWidth: 120,
                maxWidth: 600,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                Sắp xếp giá bán:
              </Typography>
              <Select
                value={price}
                onChange={handleChangePrice}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                cursor="pointer"
                sx={{ minWidth: 400 }}
              >
                <MenuItem value={""}>Mặc định</MenuItem>
                <MenuItem value={1}>Thấp lên cao</MenuItem>
                <MenuItem value={2}>Cao xuống thấp</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2} pb={2}>
            <Stack
              direction="row"
              sx={{ width: "500px", position: "relative" }}
            >
              <TextField
                id="outlined-basic"
                label="Search"
                variant="outlined"
                value={searchText}
                onChange={onChangeSearch}
                sx={{ width: "100%" }}
                size="small"
              />
              <span className="order__iconSearch">
                <SearchIcon sx={{ fontSize: "28px" }} />
              </span>
            </Stack>
          </Stack>
          <Table
            className="productTable"
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Giá bán</TableCell>
                <TableCell>Danh mục</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.length >= 1 ? (
                products.slice(firstPostIndex, lastPostIndex).map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Stack>
                        <Typography>{item?.id}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack>
                        {item?.status ? <Typography sx={{ color: "#1890ff"}}>
                          {item?.name}
                        </Typography>: <Typography sx={{ color: "#1890ff",textDecoration:"line-through"}}>
                          {item?.name}
                        </Typography> }
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" justifyContent="center">
                        <Typography sx={{ margin: "auto 0" }}>
                          {item?.price}
                        </Typography>
                        <EditIcon sx={{ width: "12px" }} />
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{item?.productCategory?.name}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography>{item?.stock}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Stack spacing={1} justifyContent="center" py={1}>
                        <Link to={`/admin/product/edit/${item.id}`}>
                          <Button variant="contained" sx={{width:"100%"}}>Xem</Button>
                        </Link>

                        {/* <Button
                          onClick={() => openModalDelete(item)}
                          variant="outlined"
                          color="error"
                        >
                          Xóa
                        </Button> */}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <></>
              )}
            </TableBody>
          </Table>
          {totalPage >= 1 ? (
            <Stack spacing={2} mt="10px">
              <Pagination
                count={totalPage}
                page={page}
                defaultPage={1}
                onChange={handleChangePage}
                color="primary"
              />
            </Stack>
          ) : (
            <></>
          )}
          <Modal
            sx={{ overflowY: "scroll",justifyContent:"center" }}
            open={modalDelete}
            onClose={closeModalDelete}
            className="!flex !justify-center !items-center "
          >
            <Stack
              className="modal-info !bg-white !h-36 !rounded-md"
              direction="row"
              spacing={0}
              justifyContent="center"
              alignItems="center"
              width="18rem"
            >
             

              <Stack spacing={3} className="" >
                <Stack>
                  <Typography fontWeight="bold">
                    Bạn có chắc muốn xoá sản phẩm?
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                  <Button onClick={closeModalDelete} variant="outlined">
                    Hủy
                  </Button>
                  <Button variant="contained" onClick={handleDeleteProduct}>Xóa bỏ</Button>
                </Stack>
              </Stack>
            </Stack>
          </Modal>
        </Box>
      </Box>
    </>
  );
}

export default Product;
