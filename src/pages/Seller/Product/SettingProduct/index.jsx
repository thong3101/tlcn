import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Switch,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import apiProduct from "../../../../apis/apiProduct";
import "./SettingProduct.scss";

import { toast } from "react-toastify";

function SettingProduct() {
  const [price, setPrice] = React.useState("");
  const [products, setProducts] = React.useState();
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(10);

  //Checked
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const size = 4;
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  console.log(products);

  const lastPostIndex = page * size;
  const firstPostIndex = lastPostIndex - size;

  const handleChangePage = (event, newValue) => {
    setPage(newValue);
  };

  const [itemdelete, setItemdelete] = React.useState(null);
  const [modalDelete, setModalDelete] = React.useState(false);
  const openModalDelete = (itemdelete) => {
    setItemdelete(itemdelete);
    console.log(itemdelete);
    setModalDelete(true);
  };
  const closeModalDelete = () => {
    setModalDelete(false);
  };

  const handleDeleteProduct = () => {
    const product = products.filter((item) => {
      return itemdelete.id !== item.id;
    });
    setProducts(product);
    closeModalDelete();
    apiProduct
      .deleteProduct(itemdelete.id)
      .then((res) => {
        toast.success("Xóa thành công");
      })
      .catch((error) => {
        toast.error("Xóa không thành công!");
      });
  };

  return (
    <>
      <Box className="productAdmin">
        <Box sx={{ backgroundColor: "#fff" }} p={2}>
          <Typography
            sx={{ fontSize: "20px", fontWeight: "bold", paddingBottom: "20px" }}
          >
            Cài đặt sản phẩm
          </Typography>
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
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Switch
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                        <Typography>Kích hoạt</Typography>
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
        </Box>
      </Box>
    </>
  );
}

export default SettingProduct;
