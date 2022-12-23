import React from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  MenuItem,
  FormControl,
  Select,
  Modal,
} from "@mui/material";
import "./Product.scss";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";
import apiProduct from "../../../apis/apiProduct";

function Product() {
  const [modalDelete, setModalDelete] = React.useState(false);
  const [price, setPrice] = React.useState("");
  const [products, setProducts] = React.useState();
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);

  const [searchText, setSearchText] = React.useState("");

  const onChangeSearch = (event) => {
    setSearchText(event.target.value);
  };

  const openModalDelete = () => setModalDelete(true);
  const closeModalDelete = () => setModalDelete(false);

  const size = 6;
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  console.log(products);

  React.useEffect(() => {
    const getData = async () => {
      let param = {
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
          <Link to="/admin/product/create">
            <Button variant="outlined" pr={2}>
              Tạo sản phẩm
            </Button>
          </Link>
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
                        <Typography sx={{ color: "#1890ff" }}>
                          {item?.name}
                        </Typography>
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
                          <Button variant="contained" sx={{width:"100%"}}>Sửa</Button>
                        </Link>

                        <Button
                          onClick={openModalDelete}
                          variant="outlined"
                          color="error"
                        >
                          Xóa
                        </Button>
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
                onChange={handleChangePage}
                color="primary"
              />
            </Stack>
          ) : (
            <></>
          )}
          <Modal
            sx={{ overflowY: "scroll" }}
            open={modalDelete}
            onClose={closeModalDelete}
          >
            <Stack
              className="modal-info"
              direction="row"
              spacing={2}
              justifyContent="center"
              width="26rem"
            >
              <Stack>
                <InfoOutlinedIcon color="primary" />
              </Stack>

              <Stack spacing={3}>
                <Stack>
                  <Typography fontWeight="bold">
                    Bạn có chắc muốn xoá sản phẩm?
                  </Typography>
                </Stack>

                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                  <Button onClick={closeModalDelete} variant="outlined">
                    Hủy
                  </Button>
                  <Button variant="contained">Xóa bỏ</Button>
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
